import React from "react";
import type { PremiumVehiclesData } from "./types";

export default function PremiumVehicles({ data }: { data: PremiumVehiclesData }) {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-1">{data.title}</h2>
      <p className="text-sm text-slate-600 mb-3">{data.subtitle}</p>
      <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
        {data.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
