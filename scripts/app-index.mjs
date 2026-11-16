#!/usr/bin/env node
// Writes out/index.html for the Snakkespil app: it opens one of its languages, out/da/, out/en/, out/sv/ ... (src/lib/appLang.ts).
// Node 24 strips the types from the .ts import. Usage: node scripts/app-index.mjs [out/index.html]
import { writeFileSync } from "node:fs";
import { appIndexHtml } from "../src/lib/appLang.ts";

writeFileSync(process.argv[2] ?? "out/index.html", appIndexHtml());
