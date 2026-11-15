// Build gate: refuses to build if any published allocation file is younger than the
// embargo, is missing from the ledger, or does not match its recorded SHA-256.
// Runs before `astro build` (see package.json), so a bad export cannot ship.

import { createHash } from "node:crypto";
import { readFileSync, readdirSync, statSync } from "node:fs";

const EMBARGO_DAYS = 14; // keep in sync with SITE.embargoDays in src/data/site.ts
const LEDGER_DIR = "src/data/ledger";
const ALLOC_DIR = "public/allocations";

const today = new Date();
const todayUtc = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
const errors = [];
let published = 0;
let sealed = 0;

const books = readdirSync(LEDGER_DIR)
  .filter((f) => f.endsWith(".json"))
  .map((f) => f.slice(0, -5));

for (const name of readdirSync(ALLOC_DIR)) {
  if (name.startsWith(".")) continue;
  if (!statSync(`${ALLOC_DIR}/${name}`).isDirectory() || !books.includes(name)) {
    errors.push(`${ALLOC_DIR}/${name}: not a directory belonging to a ledger in ${LEDGER_DIR}/`);
  }
}

for (const book of books) {
  const ledger = JSON.parse(readFileSync(`${LEDGER_DIR}/${book}.json`, "utf8"));
  const byFile = new Map(ledger.records.filter((r) => r.file).map((r) => [r.file, r]));
  published += byFile.size;
  sealed += ledger.records.length - byFile.size;
  let files = [];
  try {
    files = readdirSync(`${ALLOC_DIR}/${book}`);
  } catch {
    // no published files yet
  }
  for (const name of files) {
    if (name.startsWith(".")) continue;
    const path = `/allocations/${book}/${name}`;
    const rec = byFile.get(path);
    if (!rec) {
      errors.push(`${path}: on disk but not in ${LEDGER_DIR}/${book}.json`);
      continue;
    }
    const ageDays = (todayUtc - Date.parse(`${rec.date}T00:00:00Z`)) / 86_400_000;
    if (ageDays < EMBARGO_DAYS) {
      errors.push(`${path}: dated ${rec.date}, only ${ageDays} days old (embargo ${EMBARGO_DAYS})`);
    }
    const sha = createHash("sha256").update(readFileSync(`public${path}`)).digest("hex");
    if (sha !== rec.sha256) errors.push(`${path}: sha256 ${sha} does not match ledger ${rec.sha256}`);
  }
  for (const path of byFile.keys()) {
    if (!path.startsWith(`/allocations/${book}/`)) errors.push(`${path}: outside /allocations/${book}/`);
    try {
      readFileSync(`public${path}`);
    } catch {
      errors.push(`${path}: listed in ${LEDGER_DIR}/${book}.json but missing on disk`);
    }
  }
}

if (errors.length) {
  console.error(`check-embargo: ${errors.length} problem(s)\n  ` + errors.join("\n  "));
  process.exit(1);
}
console.log(`check-embargo: ${books.length} ledger(s), ${published} published file(s) OK, ${sealed} sealed`);
