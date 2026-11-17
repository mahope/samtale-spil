#!/usr/bin/env bash
# Runs independent CI commands at the same time and fails if any of them fails.
#
#   bash scripts/ci-parallel.sh "name::command" "name::command" ...
#
# Every command runs in its own bash with the output kept apart; when all have finished, each log is
# printed in its own group with its exit code and duration, so a red check shows exactly its own
# output. Nothing is retried or hidden: the exit code is 1 if any command exited non-zero.
set -uo pipefail
[ $# -ge 1 ] || { echo "usage: $0 \"name::command\" ..."; exit 2; }
dir=$(mktemp -d)
names=()
pids=()
print_logs() {
  status=0
  for name in "${names[@]}"; do
    if [ -f "$dir/$name.done" ]; then
      read -r rc secs <"$dir/$name.done"
      echo "::group::$name (exit $rc, ${secs}s)"
    else
      rc=143
      echo "::group::$name (interrupted, no exit code)"
    fi
    cat "$dir/$name.log" 2>/dev/null
    echo "::endgroup::"
    if [ "$rc" -ne 0 ]; then echo "FAILED: $name (exit $rc)"; status=1; fi
  done
}
# On timeout or cancel: stop the children, then print what each check had written so far
on_signal() {
  trap '' TERM INT
  for pid in "${pids[@]}"; do pkill -TERM -P "$pid" 2>/dev/null; kill -TERM "$pid" 2>/dev/null; done
  sleep 1
  for pid in "${pids[@]}"; do pkill -KILL -P "$pid" 2>/dev/null; kill -KILL "$pid" 2>/dev/null; done
  print_logs
  rm -rf "$dir"
  exit 143
}
trap on_signal TERM INT
trap 'rm -rf "$dir"' EXIT
for spec in "$@"; do
  name=${spec%%::*}; cmd=${spec#*::}
  names+=("$name")
  (
    start=$(date +%s)
    bash -c "set -euo pipefail; $cmd" >"$dir/$name.log" 2>&1
    rc=$?
    echo "$rc $(( $(date +%s) - start ))" >"$dir/$name.done"
  ) &
  pids+=($!)
done
wait
print_logs
exit $status
