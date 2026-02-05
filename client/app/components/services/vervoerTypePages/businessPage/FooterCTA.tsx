import React from "react";
import type { FooterCTAData } from "./types";

export default function FooterCTA({ data }: { data: FooterCTAData }) {
  return (
    <section className="py-16 text-center bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <h2 className="text-3xl font-semibold mb-4">{data.title}</h2>
      <p className="text-slate-300 mb-6">{data.subtitle}</p>

      <div className="flex justify-center gap-4">
        <button className="px-8 py-3 bg-amber-500 text-black rounded-xl">
          {data.ctaPrimary}
        </button>

        <a
          href={`tel:${data.phone}`}
          className="px-8 py-3 bg-white/10 border border-white/20 rounded-xl"
        >
          {data.ctaSecondary}
        </a>
      </div>
    </section>
  );
}
