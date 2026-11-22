"""Tests for scripts/secret-scan.py. Run: python3 -m unittest discover -s scripts -p 'test_*.py'

Every "secret" here is obviously fake and assembled at runtime from repeated characters,
so this file itself never contains anything in a real key format.
"""

import importlib.util
import io
import subprocess
import sys
import tempfile
import unittest
from contextlib import redirect_stderr, redirect_stdout
from pathlib import Path

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("secret_scan", HERE / "secret-scan.py")
scan = importlib.util.module_from_spec(spec)
sys.modules["secret_scan"] = scan
spec.loader.exec_module(scan)

# Fake values built in the test (never typed in as a whole)
FAKE_AWS = "AK" + "IA" + "Q" * 16
FAKE_ANTHROPIC = "sk-" + "ant-" + "api03-" + "Zz9" * 10
FAKE_OPENAI = "sk-" + "proj-" + "Zz9" * 10
FAKE_PEM = "-" * 5 + "BEGIN " + "RSA PRIVATE" + " KEY" + "-" * 5
FAKE_JWT = ".".join(["ey" + "J" + "Zm9vYmFyYmF6cXV4"] * 2 + ["c2lnbmF0dXJlc2ln"])
FAKE_PW = "Q7w" + "Rt5Yu9Lp2"
FAKE_DB = "postgres" + "://app:" + FAKE_PW + "@db.internal:5432/app"
FAKE_KEY = "0x4" + "AbCdEf123456" + "GhIjKl7890"


def rules(text):
    return [rule for _, rule in scan.scan_text(text)]


class RuleTests(unittest.TestCase):
    def test_each_rule_finds_its_format(self):
        cases = {
            "aws-access-key": f"aws_id = {FAKE_AWS}",
            "anthropic-api-key": f"key: {FAKE_ANTHROPIC}",
            "openai-api-key": f"key: {FAKE_OPENAI}",
            "private-key": FAKE_PEM,
            "jwt": f"auth {FAKE_JWT}",
            "database-url-with-password": f"url {FAKE_DB}",
            "generic-secret-assignment": f'password = "{FAKE_PW}"',
            "generic-secret-env": f"API_TOKEN={FAKE_PW}",
            "generic-api-key": f'const SITE_KEY = "{FAKE_KEY}"',
        }
        for rule, text in cases.items():
            with self.subTest(rule=rule):
                self.assertIn(rule, rules(text))

    def test_anthropic_key_is_not_also_an_openai_key(self):
        self.assertNotIn("openai-api-key", rules(FAKE_ANTHROPIC))

    def test_placeholders_and_env_references_are_not_findings(self):
        for text in [
            'password = "${DB_PASSWORD}"',
            'token: "{{ secrets.TOKEN }}"',
            'secret = "your-secret-here"',
            "API_TOKEN=$API_TOKEN",
            "postgres://app:${PGPASSWORD}@db/app",
            'storePassword System.getenv("ANDROID_KEYSTORE_PASSWORD")',
            'export const AGE_KEY = "samtale-spil-voksen-18"',
            'const key = "short"',
            'cacheKey: "ordinaryidentifierwithoutdigits"',
        ]:
            with self.subTest(text=text):
                self.assertEqual(rules(text), [])

    def test_fallback_toml_parser_reads_the_repo_allowlist_like_tomllib(self):
        try:
            import tomllib
        except ImportError:
            self.skipTest("tomllib needs Python 3.11")
        text = (HERE.parent / ".gitleaks.toml").read_text(encoding="utf-8")
        expected = [{k: e[k] for k in ("paths", "targetRules")} for e in tomllib.loads(text)["allowlists"]]
        got = [{k: e[k] for k in ("paths", "targetRules")} for e in scan.parse_allowlist_subset(text)["allowlists"]]
        self.assertEqual(got, expected)
        self.assertTrue(got)

    def test_line_numbers_are_reported(self):
        self.assertEqual(scan.scan_text(f"a\nb\n{FAKE_PEM}\n"), [(3, "private-key")])


class CliTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.repo = Path(self.tmp.name)
        self.git("init", "-q")
        self.git("config", "user.email", "t@example.invalid")
        self.git("config", "user.name", "t")

    def tearDown(self):
        self.tmp.cleanup()

    def git(self, *args):
        subprocess.run(["git", "-C", str(self.repo), *args], check=True, capture_output=True)

    def commit(self, path, text):
        (self.repo / path).parent.mkdir(parents=True, exist_ok=True)
        (self.repo / path).write_text(text)
        self.git("add", "-A")
        self.git("commit", "-qm", "c")

    def run_scan(self, *args):
        out, err = io.StringIO(), io.StringIO()
        with redirect_stdout(out), redirect_stderr(err):
            code = scan.main(["--repo", str(self.repo), *args])
        return code, out.getvalue()

    def test_output_never_contains_the_value(self):
        self.commit("conf.py", f'password = "{FAKE_PW}"\n')
        code, out = self.run_scan()
        self.assertEqual(code, 1)
        self.assertEqual(out.strip(), "conf.py:1:generic-secret-assignment")
        self.assertNotIn(FAKE_PW, out)

    def test_history_finds_a_value_removed_from_head(self):
        self.commit("conf.py", f'password = "{FAKE_PW}"\n')
        self.commit("conf.py", "password = os.environ['DB_PASSWORD']\n")
        self.assertEqual(self.run_scan()[0], 0)
        code, out = self.run_scan("--history")
        self.assertEqual(code, 1)
        self.assertIn("conf.py:1:generic-secret-assignment", out)
        self.assertNotIn(FAKE_PW, out)

    def test_allowlist_is_limited_to_its_path_and_rule(self):
        (self.repo / ".gitleaks.toml").write_text(
            "[[allowlists]]\npaths = ['''^public\\.ts$''']\ntargetRules = [\"generic-api-key\"]\n"
        )
        self.commit("public.ts", f'const SITE_KEY = "{FAKE_KEY}"\n')
        self.assertEqual(self.run_scan()[0], 0)
        # same value in another file, or another rule in the allowlisted file, still fails
        self.commit("other.ts", f'const SITE_KEY = "{FAKE_KEY}"\n')
        self.commit("public.ts", f'const SITE_KEY = "{FAKE_KEY}"\n{FAKE_PEM}\n')
        code, out = self.run_scan()
        self.assertEqual(code, 1)
        self.assertEqual(sorted(out.split()), ["other.ts:1:generic-api-key", "public.ts:2:private-key"])

    def test_allowlist_without_paths_is_rejected(self):
        (self.repo / ".gitleaks.toml").write_text('[[allowlists]]\ntargetRules = ["jwt"]\n')
        self.commit("a.txt", "x\n")
        with self.assertRaises(SystemExit):
            self.run_scan()


if __name__ == "__main__":
    unittest.main()
