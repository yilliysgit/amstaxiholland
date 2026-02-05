import React from "react";
import type { ExtraServicesData } from "./types";

export default function ExtraServices({ data }: { data: ExtraServicesData }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-3">{data.title}</h2>
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {data.items.map((item, i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
