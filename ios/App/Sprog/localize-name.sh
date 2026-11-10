#!/bin/sh
# Build phase "Localize the name" (App target): dk.snakkespil.app speaks Danish and English
# (src/lib/appLang.ts), so it gets da.lproj and en.lproj with its home screen name (Snakkespil /
# Goodtalk) and CFBundleLocalizations da, en. The 18+ app (dk.snakkespil.voksen) is built from the
# same project and keeps its one name and language, so it gets neither. The files are copied in here
# instead of being project resources for exactly that reason.
set -eu
[ "${PRODUCT_BUNDLE_IDENTIFIER:-}" = "dk.snakkespil.app" ] || exit 0
app="${TARGET_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}"
for lang in da en; do
  mkdir -p "$app/$lang.lproj"
  cp "${SRCROOT}/Sprog/$lang.lproj/InfoPlist.strings" "$app/$lang.lproj/InfoPlist.strings"
done
plist="${TARGET_BUILD_DIR}/${INFOPLIST_PATH}"
/usr/libexec/PlistBuddy -c "Delete :CFBundleLocalizations" "$plist" >/dev/null 2>&1 || true
/usr/libexec/PlistBuddy -c "Add :CFBundleLocalizations array" -c "Add :CFBundleLocalizations:0 string da" -c "Add :CFBundleLocalizations:1 string en" "$plist"
echo "localized name and CFBundleLocalizations (da, en) added to $app"
