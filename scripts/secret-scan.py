#!/usr/bin/env python3
"""Look for secrets in the repository without ever printing them.

Prints one line per finding as path:line:rule and nothing from the matched text.
Exit code 1 when there are findings, 0 when the scan is clean.

  python3 scripts/secret-scan.py            # tracked files in the working tree (what CI runs)
  python3 scripts/secret-scan.py --history  # every blob reachable from any ref (all branches and tags)

Harmless matches (examples, test data) are allowlisted in .gitleaks.toml with the gitleaks
schema ([[allowlists]] with paths and targetRules), so gitleaks and this script share one list.
"""

from __future__ import annotations

import argparse
import math
import re
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path

# Values that are clearly not secrets: env references, placeholders and template variables.
PLACEHOLDER = re.compile(
    r"^(\$|\{\{|<|%|process\.env|env\.|secrets\.)"
    r"|(x{4,}|\*{4,}|changeme|change-me|example|placeholder|your[-_]|dummy|redacted|fake|test)",
    re.IGNORECASE,
)

RULES: dict[str, re.Pattern[str]] = {
    "aws-access-key": re.compile(r"\b(?:AKIA|ASIA|AGPA|AIDA|AROA)[0-9A-Z]{16}\b"),
    "anthropic-api-key": re.compile(r"\bsk-ant-[A-Za-z0-9_-]{20,}"),
    "openai-api-key": re.compile(r"\bsk-(?!ant-)(?:proj-|svcacct-|admin-)?[A-Za-z0-9_-]{20,}"),
    "private-key": re.compile(r"-----BEGIN (?:[A-Z0-9]+ )*PRIVATE KEY(?: BLOCK)?-----"),
    "jwt": re.compile(r"\beyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}"),
    "database-url-with-password": re.compile(
        r"\b(?:postgres(?:ql)?|mysql|mariadb|mongodb(?:\+srv)?|rediss?|amqps?|mssql)://"
        r"[^\s:/@'\"]+:(?P<value>[^\s@/'\"]+)@"
    ),
    # password = "value", "apiToken": "value", SECRET_KEY: 'value'
    "generic-secret-assignment": re.compile(
        r"(?i)[\w.-]*(?:password|passwd|pwd|secret|token|api[_-]?key)[\w.-]*['\"]?\s*(?::|=|:=)\s*"
        r"['\"](?P<value>[^'\"\s]{8,})['\"]"
    ),
    # apiKey = "high-entropy value", like gitleaks' generic-api-key (entropy checked in scan_text)
    "generic-api-key": re.compile(
        r"(?i)[\w.-]*(?:key|secret|token|auth|credential)[\w.-]*['\"]?\s*(?::|=|:=)\s*"
        r"['\"`](?P<value>[A-Za-z0-9_+/=.-]{16,})['\"`]"
    ),
    # SOME_SECRET=value in .env-style files and shell scripts (unquoted)
    "generic-secret-env": re.compile(
        r"^\s*(?:export\s+)?[A-Z0-9_]*(?:PASSWORD|PASSWD|SECRET|TOKEN|API_KEY)[A-Z0-9_]*\s*=\s*"
        r"(?P<value>[^\s'\"$#][^\s'\"#]{7,})\s*$"
    ),
}

MAX_BYTES = 2_000_000
# Shannon entropy (bits per character) a generic-api-key value needs; words and paths stay below it.
MIN_ENTROPY = 3.5
KEBAB_NAME = re.compile(r"^[a-z0-9]+(?:[-_][a-z0-9]+)+$")


@dataclass(frozen=True)
class Allow:
    paths: tuple[re.Pattern[str], ...]
    rules: frozenset[str]

    def covers(self, path: str, rule: str) -> bool:
        if self.rules and rule not in self.rules:
            return False
        return any(p.search(path) for p in self.paths)


def parse_toml(text: str) -> dict:
    """tomllib on Python 3.11+; older runners get a parser for the subset .gitleaks.toml uses."""
    try:
        import tomllib
    except ImportError:
        pass
    else:
        return tomllib.loads(text)
    return parse_allowlist_subset(text)


def parse_allowlist_subset(text: str) -> dict:
    data: dict = {"allowlists": []}
    current: dict | None = None
    for line in text.splitlines():
        line = line.strip()
        if line == "[[allowlists]]":
            current = {}
            data["allowlists"].append(current)
        elif line.startswith("["):
            current = None
        elif current is not None and re.match(r"(paths|targetRules)\s*=", line):
            key, _, value = line.partition("=")
            current[key.strip()] = re.findall(r"'''(.*?)'''|\"((?:[^\"\\]|\\.)*)\"", value)
            current[key.strip()] = [a or b for a, b in current[key.strip()]]
    return data


def load_allowlist(config: Path) -> list[Allow]:
    if not config.exists():
        return []
    data = parse_toml(config.read_text(encoding="utf-8"))
    out = []
    for entry in data.get("allowlists", []):
        paths = tuple(re.compile(p) for p in entry.get("paths", []))
        if not paths:
            raise SystemExit(f"{config}: every allowlist needs exact paths (no path-less allowlists)")
        out.append(Allow(paths, frozenset(entry.get("targetRules", []))))
    return out


def is_placeholder(value: str) -> bool:
    return bool(PLACEHOLDER.search(value))


def entropy(value: str) -> float:
    counts = {c: value.count(c) for c in set(value)}
    return -sum(n / len(value) * math.log2(n / len(value)) for n in counts.values())


def scan_text(text: str) -> list[tuple[int, str]]:
    """Return (line number, rule) for every finding. Never returns matched text."""
    found = []
    for lineno, line in enumerate(text.splitlines(), start=1):
        for rule, pattern in RULES.items():
            for m in pattern.finditer(line):
                value = m.groupdict().get("value")
                if value is not None and is_placeholder(value):
                    continue
                if rule == "generic-api-key" and (
                    entropy(value) < MIN_ENTROPY
                    or not re.search(r"\d", value)
                    or KEBAB_NAME.match(value)  # a name such as a storage key, not a credential
                ):
                    continue
                found.append((lineno, rule))
                break
    return found


def decode(data: bytes) -> str | None:
    if len(data) > MAX_BYTES or b"\0" in data[:8000]:
        return None
    return data.decode("utf-8", errors="replace")


def git(repo: Path, *args: str) -> bytes:
    return subprocess.run(["git", "-C", str(repo), *args], check=True, capture_output=True).stdout


def tracked_files(repo: Path):
    for raw in git(repo, "ls-files", "-z").split(b"\0"):
        if not raw:
            continue
        path = raw.decode("utf-8", errors="replace")
        f = repo / path
        if f.is_file() and not f.is_symlink():
            yield path, f.read_bytes()


def history_blobs(repo: Path):
    """Every (path, blob) pair reachable from any ref, each blob scanned once per path."""
    seen: set[tuple[str, str]] = set()
    listing = git(repo, "rev-list", "--all", "--objects").decode("utf-8", errors="replace")
    pairs = []
    for line in listing.splitlines():
        sha, _, path = line.partition(" ")
        if path and (sha, path) not in seen:
            seen.add((sha, path))
            pairs.append((sha, path))
    if not pairs:
        return
    types = subprocess.run(
        ["git", "-C", str(repo), "cat-file", "--batch-check=%(objectname) %(objecttype) %(objectsize)"],
        input="\n".join(s for s, _ in pairs).encode(), check=True, capture_output=True,
    ).stdout.decode().splitlines()
    blobs = [(s, p) for (s, p), t in zip(pairs, types) if t.split()[1] == "blob" and int(t.split()[2]) <= MAX_BYTES]
    proc = subprocess.Popen(["git", "-C", str(repo), "cat-file", "--batch"], stdin=subprocess.PIPE, stdout=subprocess.PIPE)
    assert proc.stdin and proc.stdout
    for sha, path in blobs:
        proc.stdin.write(sha.encode() + b"\n")
        proc.stdin.flush()
        size = int(proc.stdout.readline().split()[2])
        data = proc.stdout.read(size)
        proc.stdout.read(1)
        yield path, data
    proc.stdin.close()
    proc.wait()


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--history", action="store_true", help="scan every blob in all branches and tags")
    ap.add_argument("--repo", type=Path, default=Path("."), help="repository root (default: .)")
    ap.add_argument("--config", type=Path, help="allowlist file (default: <repo>/.gitleaks.toml)")
    args = ap.parse_args(argv)

    repo = args.repo.resolve()
    allow = load_allowlist(args.config or repo / ".gitleaks.toml")
    source = history_blobs(repo) if args.history else tracked_files(repo)

    findings: set[tuple[str, int, str]] = set()
    allowed = 0
    for path, data in source:
        text = decode(data)
        if text is None:
            continue
        for lineno, rule in scan_text(text):
            if any(a.covers(path, rule) for a in allow):
                allowed += 1
            else:
                findings.add((path, lineno, rule))

    for path, lineno, rule in sorted(findings):
        print(f"{path}:{lineno}:{rule}")
    scope = "history (all refs)" if args.history else "working tree"
    print(f"secret-scan: {len(findings)} finding(s), {allowed} allowlisted, in the {scope}", file=sys.stderr)
    return 1 if findings else 0


if __name__ == "__main__":
    sys.exit(main())
