import React from "react";
import type { RatesSectionData } from "./types";

export default function Rates({ data }: { data: RatesSectionData }) {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-2">{data.title}</h2>
      <p className="text-sm text-slate-700 mb-2">{data.description}</p>
      <p className="text-xs text-slate-500 italic">{data.note}</p>
    </section>
  );
}
