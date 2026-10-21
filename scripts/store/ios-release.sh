#!/bin/bash
# Signed App Store build of one app variant, uploaded to App Store Connect. Runs on the mahope-mac runner
# after `npm run build` and `npx cap sync ios`.
#   scripts/store/ios-release.sh <bundle_id> <display_name> <locale> <build_number>
# Needs env: ASC_KEY_ID, ASC_ISSUER_ID, ASC_KEY_P8_B64, IOS_DIST_P12_B64, IOS_DIST_P12_PASSWORD.
# An app without an App Store Connect record is skipped (records are created by hand once). Prints no secrets.
set -euo pipefail
BUNDLE="$1"; NAME="$2"; LOCALE="$3"; BUILD="$4"
TEAM=P7698GU4AV
# the team's Apple Distribution certificate (Bitwarden "Apple Distribution-certifikat Mads Holst Jensen")
CERT_ID="${IOS_DIST_CERT_ID:-2UUXQDN955}"
export PATH="/opt/homebrew/bin:$PATH"
WORK="$(mktemp -d)"
trap 'security delete-keychain "$WORK/ci.keychain-db" 2>/dev/null || true; rm -rf "$WORK"' EXIT INT TERM

(umask 077; echo "$ASC_KEY_P8_B64" | base64 -d > "$WORK/AuthKey.p8")
export ASC_PRIVATE_KEY_PATH="$WORK/AuthKey.p8"

APP_ID=$(asc apps list --bundle-id "$BUNDLE" --output json | python3 -c "import json,sys;d=json.load(sys.stdin).get('data',[]);print(d[0]['id'] if d else '')")
if [ -z "$APP_ID" ]; then echo "$BUNDLE har ingen app i App Store Connect endnu, springer over"; exit 0; fi

# signing identity in a throwaway keychain
KC="$WORK/ci.keychain-db"; KP=$(openssl rand -hex 16)
security create-keychain -p "$KP" "$KC"
security set-keychain-settings -t 3600 -l "$KC"
security unlock-keychain -p "$KP" "$KC"
(umask 077; echo "$IOS_DIST_P12_B64" | base64 -d > "$WORK/dist.p12")
security import "$WORK/dist.p12" -k "$KC" -P "$IOS_DIST_P12_PASSWORD" -T /usr/bin/codesign -T /usr/bin/security >/dev/null
security set-key-partition-list -S apple-tool:,apple:,codesign: -s -k "$KP" "$KC" >/dev/null
security list-keychains -d user -s "$KC" $(security list-keychains -d user | tr -d '"')
CERT_SHA=$(security find-identity -v -p codesigning "$KC" | awk '/Apple Distribution/ {print $2; exit}')

# App Store profile for this bundle with exactly this certificate (created once, then reused)
PROFILE_NAME="$NAME App Store $CERT_ID"
asc profiles list --output json --paginate > "$WORK/profiles.json"
PROF_ID=$(python3 -c "
import json,sys
d=json.load(open(sys.argv[1]))
print(next((p['id'] for p in d['data'] if p['attributes']['name']==sys.argv[2] and p['attributes'].get('profileState')=='ACTIVE'),''))" "$WORK/profiles.json" "$PROFILE_NAME")
if [ -z "$PROF_ID" ]; then
  BUNDLE_RES=$(asc bundle-ids list --output json --paginate | python3 -c "
import json,sys
print(next((b['id'] for b in json.load(sys.stdin)['data'] if b['attributes']['identifier']==sys.argv[1]),''))" "$BUNDLE")
  [ -n "$BUNDLE_RES" ] || { echo "bundle-id $BUNDLE er ikke registreret"; exit 1; }
  asc profiles create --name "$PROFILE_NAME" --profile-type IOS_APP_STORE --bundle "$BUNDLE_RES" --certificate "$CERT_ID" --output json > /dev/null
  asc profiles list --output json --paginate > "$WORK/profiles.json"
fi
UUID=$(python3 -c "
import json,sys,base64,os
d=json.load(open(sys.argv[1]))
a=next(p['attributes'] for p in d['data'] if p['attributes']['name']==sys.argv[2] and p['attributes'].get('profileState')=='ACTIVE')
raw=base64.b64decode(a['profileContent'])
for dst in ('~/Library/MobileDevice/Provisioning Profiles','~/Library/Developer/Xcode/UserData/Provisioning Profiles'):
    dst=os.path.expanduser(dst); os.makedirs(dst,exist_ok=True)
    open(os.path.join(dst,a['uuid']+'.mobileprovision'),'wb').write(raw)
print(a['uuid'])" "$WORK/profiles.json" "$PROFILE_NAME")

cd ios/App
xcodebuild -project App.xcodeproj -scheme App -configuration Release -sdk iphoneos \
  -destination 'generic/platform=iOS' -archivePath "$WORK/App.xcarchive" \
  PRODUCT_BUNDLE_IDENTIFIER="$BUNDLE" APP_DISPLAY_NAME="$NAME" APP_DEV_REGION="$LOCALE" \
  CURRENT_PROJECT_VERSION="$BUILD" DEVELOPMENT_TEAM="$TEAM" CODE_SIGN_STYLE=Manual \
  CODE_SIGN_IDENTITY="$CERT_SHA" PROVISIONING_PROFILE_SPECIFIER="$UUID" OTHER_CODE_SIGN_FLAGS="--keychain $KC" \
  archive > "$WORK/archive.log" 2>&1 || { tail -40 "$WORK/archive.log"; exit 1; }
cat > "$WORK/ExportOptions.plist" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>method</key><string>app-store-connect</string>
  <key>teamID</key><string>$TEAM</string>
  <key>signingStyle</key><string>manual</string>
  <key>signingCertificate</key><string>$CERT_SHA</string>
  <key>provisioningProfiles</key><dict><key>$BUNDLE</key><string>$UUID</string></dict>
</dict></plist>
EOF
xcodebuild -exportArchive -archivePath "$WORK/App.xcarchive" -exportPath "$WORK/export" \
  -exportOptionsPlist "$WORK/ExportOptions.plist" > "$WORK/export.log" 2>&1 || { tail -30 "$WORK/export.log"; exit 1; }
asc builds upload --app "$APP_ID" --ipa "$WORK"/export/*.ipa --verify-timeout 120s
echo "$BUNDLE build $BUILD uploadet til App Store Connect"
