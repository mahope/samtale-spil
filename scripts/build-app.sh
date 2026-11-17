#!/usr/bin/env bash
# Builds the web content of the Snakkespil app (iOS and Android, dk.snakkespil.app) into out/:
# one app shell per language in src/locales/appLocales.ts (out/da/, out/en/ = Goodtalk, out/sv/, ...)
# and out/index.html, which opens one of them (src/lib/appLang.ts). Each language is its own Next
# export with its own basePath (next.config.ts). The 18+ app is not built here (APP_VARIANT=voksen bun run build).
set -euo pipefail
cd "$(dirname "$0")/.."
langs=$(node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --input-type=module \
  -e 'import { APP_LOCALE_CODES } from "./src/locales/appLocales.ts"; console.log(APP_LOCALE_CODES.join(" "))')
[ -n "$langs" ] || { echo "no app languages in src/locales/appLocales.ts"; exit 1; }
tmp=.app-build
rm -rf out "$tmp"
mkdir -p "$tmp"
# APP_BUILD_JOBS=N builds up to N languages at once, each in its own copy of the tree
# (scripts/build-in-tree.sh); the default, 1, builds them one after the other in this tree.
jobs=${APP_BUILD_JOBS:-1}
if [ "$jobs" -gt 1 ]; then
  printf '%s\n' $langs | xargs -P "$jobs" -I{} bash scripts/build-in-tree.sh "app-{}" "$tmp/{}" APP_BUILD=1 SITE_LOCALE={}
else
  for lang in $langs; do
    echo "== app, $lang"
    APP_BUILD=1 SITE_LOCALE="$lang" bun x next build
    mv out "$tmp/$lang"
  done
fi
for lang in $langs; do test -f "$tmp/$lang/index.html" || { echo "no export for $lang"; exit 1; }; done
mkdir out
for lang in $langs; do mv "$tmp/$lang" "out/$lang"; done
rmdir "$tmp"
node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON scripts/app-index.mjs out/index.html
echo "app export ready: out/index.html and out/{${langs// /,}}/"
