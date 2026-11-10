#!/usr/bin/env bash
# Builds the web content of the Snakkespil app (iOS and Android, dk.snakkespil.app) into out/:
# the Danish app shell in out/da/, the English one (Goodtalk) in out/en/, and out/index.html,
# which opens one of them (src/lib/appLang.ts). Each half is its own Next export with its own
# basePath (next.config.ts). The 18+ app is not built here (APP_VARIANT=voksen npm run build).
set -euo pipefail
cd "$(dirname "$0")/.."
tmp=.app-build
rm -rf out "$tmp"
mkdir -p "$tmp"
for lang in da en; do
  echo "== app, $lang"
  APP_BUILD=1 SITE_LOCALE="$lang" npx next build
  mv out "$tmp/$lang"
done
mkdir out
mv "$tmp/da" out/da
mv "$tmp/en" out/en
rmdir "$tmp"
node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON scripts/app-index.mjs out/index.html
echo "app export ready: out/index.html, out/da/, out/en/"
