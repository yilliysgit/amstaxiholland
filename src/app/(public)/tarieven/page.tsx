"use client";
import React, { useEffect, useMemo, useState } from "react";

export type Rit = { van: string; naar: string; max: number | null; bedrag: number | null };

const formatEuro = (n: number | null) =>
  n == null ? "—" : new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

function clsx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
function useDebounced<T>(value: T, delay = 250) {
  const [v, setV] = useState(value);
  useEffect(() => { const t = setTimeout(() => setV(value), delay); return () => clearTimeout(t); }, [value, delay]);
  return v;
}

// ✅ paden naar je *_clean.json (LET OP: amsshi met 2 x 's')
const DATASETS: { key: string; title: string; path: string }[] = [

 { key: "ams-schiphol", title: "Amsterdam → Schiphol", path: "/locaties/amsall-final.json" },
 { key: "schiphol-nl",  title: "Schiphol ↔ Nederland", path: "/locaties/amsshi-final.json" },
 { key: "ams-nl",       title: "Amsterdam ↔ Nederland", path: "/locaties/amsint-final.json" },
 { key: "ams-eu",       title: "Amsterdam ↔ Europa", path: "/locaties/amsshiall-final.json" },
];

export default function TarievenTabel() {
  const [activeKey, setActiveKey] = useState<string>(DATASETS[0].key);
  const [data, setData] = useState<Rit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const q = useDebounced(query, 250);
  const [sortBy, setSortBy] = useState<keyof Rit>("naar");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const [page, setPage] = useState(1);
  const pageSize = 15;

  useEffect(() => {
    const ds = DATASETS.find((d) => d.key === activeKey)!;
    setLoading(true); setError(null); setData([]);
    fetch(ds.path)
      .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then((json: Rit[]) => {
        setData(json.map((r) => ({ van: r.van?.trim() ?? "", naar: r.naar?.trim() ?? "", max: r.max ?? null, bedrag: r.bedrag ?? null })));
        setPage(1);
      })
      .catch((e) => { console.error("Fetch error", ds.path, e); setError(e.message); })
      .finally(() => setLoading(false));
  }, [activeKey]);

  const filtered = useMemo(() => {
    const needle = q.toLowerCase();
    const base = !needle ? data :
      data.filter((r) => [r.van, r.naar].some((s) => s?.toLowerCase().includes(needle)) || (r.bedrag != null && String(r.bedrag).includes(needle)));
    const sorted = [...base].sort((a, b) => {
      const A = a[sortBy], B = b[sortBy];
      let cmp = 0;
      if (A == null && B == null) cmp = 0;
      else if (A == null) cmp = 1;
      else if (B == null) cmp = -1;
      else if (typeof A === "number" && typeof B === "number") cmp = A - B;
      else cmp = String(A).localeCompare(String(B), "nl");
      return sortDir === "asc" ? cmp : -cmp;
    });
    return sorted;
  }, [data, q, sortBy, sortDir]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageSlice = filtered.slice((page - 1) * pageSize, page * pageSize);

  function toggleSort(col: keyof Rit) {
    if (sortBy === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortBy(col); setSortDir("asc"); }
  }
  function bestelLink(r: Rit) {
    const p = new URLSearchParams({ van: r.van, naar: r.naar, prijs: String(r.bedrag ?? "") });
    return `/bestellen?${p.toString()}`;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Onze ritten</h2>

      <div className="flex gap-2 mb-4 overflow-x-auto">
        {DATASETS.map((d) => (
          <button key={d.key} onClick={() => setActiveKey(d.key)}
            className={clsx("px-4 py-2 rounded-full border",
              activeKey === d.key ? "bg-black text-white border-black" : "bg-white text-gray-700 border-gray-300 hover:border-gray-400")}>
            {d.title}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mb-3 gap-3">
        <div className="text-sm text-gray-600">
          {loading ? "Laden…" : error ? `Fout: ${error}` : `${filtered.length} resultaten`}
        </div>
        <input value={query} onChange={(e) => setQuery(e.target.value)}
          placeholder="Zoeken op plaats of prijs…"
          className="w-72 max-w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
      </div>

      <div className="overflow-x-auto rounded-2xl shadow-sm ring-1 ring-gray-200">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-700">
              <Th label="Van"    onClick={() => toggleSort("van")}    active={sortBy === "van"}    dir={sortDir} />
              <Th label="Naar"   onClick={() => toggleSort("naar")}   active={sortBy === "naar"}   dir={sortDir} />
              <Th label="Max"    onClick={() => toggleSort("max")}    active={sortBy === "max"}    dir={sortDir} />
              <Th label="Tarief" onClick={() => toggleSort("bedrag")} active={sortBy === "bedrag"} dir={sortDir} />
              <th className="text-right px-4 py-3">Actie</th>
            </tr>
          </thead>
          <tbody>
            {pageSlice.map((r, i) => (
              <tr key={`${r.van}-${r.naar}-${i}`} className={i % 2 ? "bg-white" : "bg-gray-50"}>
                <td className="px-4 py-3 whitespace-nowrap">{r.van || "—"}</td>
                <td className="px-4 py-3 whitespace-nowrap">{r.naar || "—"}</td>
                <td className="px-4 py-3 text-center">{r.max ?? "—"}</td>
                <td className="px-4 py-3 font-medium">{formatEuro(r.bedrag)}</td>
                <td className="px-4 py-3 text-right">
                  <a href={bestelLink(r)} className="inline-flex items-center px-3 py-2 rounded-lg bg-black text-white hover:bg-gray-900 active:scale-[0.98] transition">
                    Bestel nu
                  </a>
                </td>
              </tr>
            ))}
            {pageSlice.length === 0 && !loading && (
              <tr><td colSpan={5} className="px-4 py-10 text-center text-gray-500">Geen resultaten.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4 text-sm">
        <div>Pagina {page} / {pageCount}</div>
        <div className="flex gap-2">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className={clsx("px-3 py-1 rounded border", page === 1 ? "opacity-50 cursor-not-allowed" : "hover:border-gray-400")}>Vorige</button>
          <button onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            disabled={page === pageCount}
            className={clsx("px-3 py-1 rounded border", page === pageCount ? "opacity-50 cursor-not-allowed" : "hover:border-gray-400")}>Volgende</button>
        </div>
      </div>
    </div>
  );
}

function Th({ label, onClick, active, dir }: { label: string; onClick: () => void; active: boolean; dir: "asc" | "desc" }) {
  return (
    <th className="px-4 py-3 text-left select-none">
      <button onClick={onClick} className="inline-flex items-center gap-1 hover:underline">
        <span>{label}</span>
        <span className={clsx("text-xs", active ? "opacity-100" : "opacity-30")}>{dir === "asc" ? "▲" : "▼"}</span>
      </button>
    </th>
  );
}
