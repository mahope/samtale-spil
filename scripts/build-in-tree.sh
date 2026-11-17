#!/usr/bin/env bash
# Runs one `next build` in a private copy of the source tree, so several builds with different
# environments (SITE_LOCALE, APP_BUILD, APP_VARIANT) can run side by side. They would otherwise
# share .next/ and out/. The finished export is moved to <dest>.
#
#   bash scripts/build-in-tree.sh <name> <dest> [VAR=value ...]
#
# node_modules is hard-linked into the copy (copied, if the copy lives on another filesystem), so
# the copy costs about a second.
set -euo pipefail
[ $# -ge 2 ] || { echo "usage: $0 <name> <dest> [VAR=value ...]"; exit 2; }
name=$1; dest=$2; shift 2
root=$(cd "$(dirname "$0")/.." && pwd)
case "$dest" in /*) ;; *) dest="$PWD/$dest" ;; esac
base="$(dirname "$root")/.snakkespil-trees"
mkdir -p "$base" 2>/dev/null || base=$(mktemp -d "${TMPDIR:-/tmp}/snakkespil-trees.XXXXXX")
mkdir -p "$base"
work=$(mktemp -d "$base/$name.XXXXXX")
trap 'rm -rf "$work"' EXIT
(cd "$root" && tar -cf - --exclude=./.git --exclude=./node_modules --exclude=./android --exclude=./ios \
  --exclude=./out --exclude=./.next --exclude=./.app-build .) | tar -xf - -C "$work"
if ! cp -al "$root/node_modules" "$work/node_modules" 2>/dev/null; then
  # Another filesystem: the failed link attempt leaves a partial directory, which must go before the real copy
  rm -rf "$work/node_modules"
  cp -a "$root/node_modules" "$work/node_modules"
fi
cd "$work"
env "$@" ./node_modules/.bin/next build 2>&1 | sed -u "s/^/[$name] /"
test -f out/index.html
rm -rf "$dest"; mkdir -p "$(dirname "$dest")"; mv out "$dest"
