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
trap 'rm -rf "$dir"' EXIT
names=()
for spec in "$@"; do
  name=${spec%%::*}; cmd=${spec#*::}
  names+=("$name")
  (
    start=$(date +%s)
    bash -c "set -euo pipefail; $cmd" >"$dir/$name.log" 2>&1
    rc=$?
    echo "$rc $(( $(date +%s) - start ))" >"$dir/$name.done"
  ) &
done
wait
status=0
for name in "${names[@]}"; do
  read -r rc secs <"$dir/$name.done"
  echo "::group::$name (exit $rc, ${secs}s)"
  cat "$dir/$name.log"
  echo "::endgroup::"
  if [ "$rc" -ne 0 ]; then echo "FAILED: $name (exit $rc)"; status=1; fi
done
exit $status
