// scripts/clean-table.ts
import fs from "fs";
import path from "path";

type Rit = { van: string; naar: string; max: number | null; bedrag: number | null };

// ---------- helpers ----------
const norm = (s: unknown) =>
  String(s ?? "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[.;:]/g, "")
    .trim();

function parseNumber(val: unknown): number | null {
  if (val == null) return null;
  let s = String(val).trim()
    .replace(/[€\s]/g, "")
    .replace(/euro/gi, "")
    .replace(/\beur\b/gi, "")
    .replace(/\./g, "")
    .replace(/,-?$/g, "")
    .replace(/[;]+$/g, "")
    .replace(",", ".");
  if (s === "" || s === "-" || s === "—") return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

// ---------- core ----------
function cleanMatrix(matrix: unknown, opts?: { defaultNaar?: string; defaultVan?: string }): Rit[] {
  if (!Array.isArray(matrix) || !matrix.length || !Array.isArray((matrix as any)[0])) {
    throw new Error("Verwacht { data: string[][] } of direct een string[][].");
  }

  const [headers, ...rows] = matrix as (string | number | null)[][];
  const H = (headers ?? []).map(norm);

  // kolomdetectie
  const findAll = (re: RegExp) =>
    H.map((h, i) => (re.test(h) ? i : -1)).filter((i) => i !== -1);

  const vanIdxs  = findAll(/^(van|from|vertrek|vanaf locatie|van of naar)$/);
  const naarIdxs = findAll(/(naar|to|bestemming|internationale bestemming|van of naar)/);

  const idxVan  = vanIdxs[0] ?? 0;
  // kies 'naar' dat anders is dan idxVan; evt. 2e 'van of naar'
  const idxNaar = (naarIdxs.find((i) => i !== idxVan) ?? (vanIdxs.length > 1 ? vanIdxs[1] : null));

  const idxMax   = H.findIndex((h) => /(max|personen|pax)/.test(h));
  const idxPrice = (() => {
    const i = H.findIndex((h) => /(tarief|bedrag|prijs|cost|fare|vaste prijzen?)/.test(h));
    return i === -1 ? 3 : i;
  })();

  return rows
    .filter((r) => Array.isArray(r) && r.some((c) => String(c ?? "").trim() !== ""))
    .map((r) => {
      const van = String(r[idxVan] ?? opts?.defaultVan ?? "").trim().replace(/;$/, "");
      const naarRaw = idxNaar != null ? String(r[idxNaar] ?? "").trim().replace(/;$/, "") : "";
      const naar = (naarRaw || opts?.defaultNaar || "").trim();
const max = idxMax === -1 ? 4 : (parseNumber(r[idxMax]) ?? 4);
      const bedrag = parseNumber(r[idxPrice] ?? null);
      return { van, naar, max, bedrag };
    });
}

function cleanFile(inPath: string, outPath: string) {
  const raw = JSON.parse(fs.readFileSync(inPath, "utf8"));
  const matrix = Array.isArray((raw as any)?.data) ? (raw as any).data : raw;

  const lower = inPath.toLowerCase();
  // Bestandsnamen die Schiphol-lijsten representeren
  const looksSchiphol =
    lower.includes("schiphol") || lower.includes("amsall") || lower.includes("amsshi");
  const looksAmsterdam = lower.includes("ams") || lower.includes("amsterdam");

  const opts: { defaultNaar?: string; defaultVan?: string } = {};
  if (looksSchiphol) opts.defaultNaar = "Schiphol";      // “Vanaf locatie / Vaste prijzen”
  if (!looksSchiphol && looksAmsterdam) opts.defaultVan = "Amsterdam";

  const cleaned = cleanMatrix(matrix, opts);

  fs.writeFileSync(outPath, JSON.stringify(cleaned, null, 2), "utf8");

  console.log(`✅ ${path.basename(inPath)} → ${path.basename(outPath)} (${cleaned.length} rijen)`);
  const missing = cleaned.filter((r) => r.bedrag == null).length;
  if (missing) console.warn(`   ⚠️  ${missing} rijen zonder bedrag na parse.`);
}

// ---------- CLI ----------
const args = process.argv.slice(2);

if (args.length === 0) {
  const dir = "public/locaties";
  const candidates = fs.readdirSync(dir).filter((f) => f.endsWith("-data.json"));
  if (!candidates.length) {
    console.log("Geen *-data.json gevonden in", dir);
    process.exit(0);
  }
  for (const f of candidates) {
    const inPath = path.join(dir, f);
    const outPath = path.join(dir, f.replace(/-data\.json$/, "-clean.json"));
    try {
      cleanFile(inPath, outPath);
    } catch (e: any) {
      console.error(`❌ Fout bij ${f}:`, e?.message ?? e);
    }
  }
  console.log("Klaar.");
} else {
  if (args.length % 2 !== 0) {
    console.error("Gebruik: ts-node scripts/clean-table.ts <input.json> <output.json> [meer paren...]");
    process.exit(1);
  }
  for (let i = 0; i < args.length; i += 2) {
    const inPath = args[i];
    const outPath = args[i + 1];
    try {
      cleanFile(inPath, outPath);
    } catch (e: any) {
      console.error(`❌ Fout bij ${inPath}:`, e?.message ?? e);
    }
  }
}
