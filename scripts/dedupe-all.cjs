// scripts/dedupe-all.cjs
const fs = require("fs");
const path = require("path");

const LOC_DIR = "public/locaties";

// Normaliseer plaatsnamen robuust: spaties, quotes, accenten, hoofdletters
function normPlace(s) {
  return String(s ?? "")
    .normalize("NFKD")                      // decompose accents
    .replace(/[\u0300-\u036f]/g, "")        // strip combining marks
    .replace(/[’'`´]/g, "'")                // unify quotes
    .replace(/[^a-z0-9'()+/&.-]+/gi, " ")   // keep common chars, collapse rest to space
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function normalizeMax(max) {
  if (max == null || max === 0 || max === 8) return 4;
  return max;
}

// kies preferent: niet-nul, daarna de laagste
function pickBestPrice(a, b) {
  const az = a == null || a === 0;
  const bz = b == null || b === 0;
  if (az && !bz) return b;
  if (!az && bz) return a;
  // beide nul of beide > 0: neem de laagste (of b als a null is)
  if (a == null) return b;
  if (b == null) return a;
  return Math.min(a, b);
}

function dedupeFile(inFile, outFile) {
  const raw = fs.readFileSync(inFile, "utf8");
  /** @type {{van:string; naar:string; max:number|null; bedrag:number|null}[]} */
  const rows = JSON.parse(raw);

  // 1) normaliseer velden en max => 4
  const fixed = rows.map((r) => ({
    van: String(r.van ?? "").trim(),
    naar: String(r.naar ?? "").trim(),
    max: normalizeMax(r.max),
    bedrag: r.bedrag,
  }));

  // 2) groepeer op (van, naar) met genormaliseerde sleutel
  const groups = new Map();
  for (const r of fixed) {
    const key = `${normPlace(r.van)}|${normPlace(r.naar)}`;
    const prev = groups.get(key);
    if (!prev) {
      groups.set(key, { ...r });
    } else {
      // houd max op 4, kies beste prijs
      prev.max = 4;
      prev.bedrag = pickBestPrice(prev.bedrag, r.bedrag);
    }
  }

  const deduped = Array.from(groups.values());

  // 3) sorteer netjes
  deduped.sort((a, b) =>
    a.van.localeCompare(b.van, "nl") ||
    a.naar.localeCompare(b.naar, "nl") ||
    ((a.bedrag ?? 0) - (b.bedrag ?? 0))
  );

  fs.writeFileSync(outFile, JSON.stringify(deduped, null, 2), "utf8");
  console.log(`✅ ${path.basename(inFile)} → ${path.basename(outFile)} (${deduped.length} unieke ritten)`);
}

(function runAll() {
  const files = fs.readdirSync(LOC_DIR).filter((f) => f.endsWith("-clean.json") || f.endsWith("-final.json"));
  if (!files.length) {
    console.log("Geen *-clean.json of *-final.json gevonden in", LOC_DIR);
    return;
  }
  for (const f of files) {
    const inPath = path.join(LOC_DIR, f);
    const outPath = path.join(
      LOC_DIR,
      f.replace(/-(clean|final)\.json$/, "-final.json")
    );
    dedupeFile(inPath, outPath);
  }
  console.log("Klaar.");
})();
