#!/bin/sh
# Build phase "Localize the name" (App target): dk.snakkespil.app speaks every language in
# src/locales/appLocales.ts (src/lib/appLang.ts), so it gets a <code>.lproj with its home screen
# name for each (Snakkespil, Goodtalk, Pratspel, ...) and CFBundleLocalizations with the same codes.
# The languages are the Sprog/*.lproj folders next to this script; src/__tests__/appLocales.test.ts
# keeps them in step with appLocales.ts. The 18+ app (dk.snakkespil.voksen) is built from the same
# project and keeps its one name and language, so it gets neither. The files are copied in here
# instead of being project resources for exactly that reason.
set -eu
[ "${PRODUCT_BUNDLE_IDENTIFIER:-}" = "dk.snakkespil.app" ] || exit 0
app="${TARGET_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}"
plist="${TARGET_BUILD_DIR}/${INFOPLIST_PATH}"
/usr/libexec/PlistBuddy -c "Delete :CFBundleLocalizations" "$plist" >/dev/null 2>&1 || true
/usr/libexec/PlistBuddy -c "Add :CFBundleLocalizations array" "$plist"
i=0
langs=""
for dir in "${SRCROOT}"/Sprog/*.lproj; do
  lang=$(basename "$dir" .lproj)
  mkdir -p "$app/$lang.lproj"
  cp "$dir/InfoPlist.strings" "$app/$lang.lproj/InfoPlist.strings"
  /usr/libexec/PlistBuddy -c "Add :CFBundleLocalizations:$i string $lang" "$plist"
  i=$((i + 1))
  langs="$langs $lang"
done
[ "$i" -gt 0 ] || { echo "no Sprog/*.lproj folders" >&2; exit 1; }
echo "localized name and CFBundleLocalizations ($langs ) added to $app"
