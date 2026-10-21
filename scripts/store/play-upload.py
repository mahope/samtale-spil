#!/usr/bin/env python3
"""Upload an Android App Bundle to a Google Play track (Android Publisher API v3).

  PLAY_SERVICE_ACCOUNT_JSON_B64=... python3 scripts/store/play-upload.py <package> <aab> <track> "<release name>" ["<notes>"] [lang, default da-DK]

Standard library plus the openssl CLI (for the RS256 signature), so CI needs no pip install.
- An app that does not exist in Play Console yet is skipped (exit 0): apps are created by hand once.
- While an app is still a draft in Play, Google only accepts draft releases, so the upload falls back to
  status "draft"; after the first review the same call rolls the release out as "completed".
Prints no secrets.
"""
import base64, json, os, subprocess, sys, tempfile, time, urllib.error, urllib.request

pkg, aab, track, name = sys.argv[1:5]
notes = sys.argv[5] if len(sys.argv) > 5 else ""
lang = sys.argv[6] if len(sys.argv) > 6 else "da-DK"
key = json.loads(base64.b64decode(os.environ["PLAY_SERVICE_ACCOUNT_JSON_B64"]))
API = "https://androidpublisher.googleapis.com/androidpublisher/v3/applications"
UP = "https://androidpublisher.googleapis.com/upload/androidpublisher/v3/applications"


def b64url(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode()


def token() -> str:
    now = int(time.time())
    head = b64url(json.dumps({"alg": "RS256", "typ": "JWT"}).encode())
    claims = b64url(json.dumps({"iss": key["client_email"], "scope": "https://www.googleapis.com/auth/androidpublisher",
                                "aud": key["token_uri"], "iat": now, "exp": now + 3000}).encode())
    with tempfile.NamedTemporaryFile("w", delete=False, suffix=".pem") as f:
        f.write(key["private_key"])
        pem = f.name
    try:
        sig = subprocess.run(["openssl", "dgst", "-sha256", "-sign", pem], input=f"{head}.{claims}".encode(),
                             capture_output=True, check=True).stdout
    finally:
        os.remove(pem)
    body = f"grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion={head}.{claims}.{b64url(sig)}"
    req = urllib.request.Request(key["token_uri"], data=body.encode(), headers={"Content-Type": "application/x-www-form-urlencoded"})
    return json.load(urllib.request.urlopen(req, timeout=30))["access_token"]


TOKEN = token()


def call(method, url, data=None, ctype="application/json"):
    body = json.dumps(data).encode() if isinstance(data, (dict, list)) else data
    req = urllib.request.Request(url, data=body, method=method,
                                 headers={"Authorization": "Bearer " + TOKEN, "Content-Type": ctype})
    try:
        with urllib.request.urlopen(req, timeout=600) as r:
            text = r.read()
            return json.loads(text) if text else {}
    except urllib.error.HTTPError as e:
        raise RuntimeError(f"{e.code} {e.read().decode()[:400]}")


def new_edit():
    try:
        return call("POST", f"{API}/{pkg}/edits")["id"]
    except RuntimeError as e:
        if str(e).startswith("404"):
            # only the app itself missing is a skip; every other 404 fails the build
            print(f"::warning::{pkg} findes ikke i Play Console (eller service-kontoen mangler adgang), springer over")
            sys.exit(0)
        raise


def release(status: str):
    edit = new_edit()
    bundle = call("POST", f"{UP}/{pkg}/edits/{edit}/bundles?uploadType=media", open(aab, "rb").read(), "application/octet-stream")
    rel = {"name": name, "versionCodes": [str(bundle["versionCode"])], "status": status}
    if notes:
        rel["releaseNotes"] = [{"language": lang, "text": notes}]
    call("PUT", f"{API}/{pkg}/edits/{edit}/tracks/{track}", {"track": track, "releases": [rel]})
    call("POST", f"{API}/{pkg}/edits/{edit}:commit")
    print(f"{pkg}: versionCode {bundle['versionCode']} -> {track} ({status})")


try:
    release("completed")
except RuntimeError as e:
    msg = str(e)
    if "draft app" in msg:
        release("draft")
    else:
        sys.exit(f"{pkg}: upload fejlede: {msg}")
