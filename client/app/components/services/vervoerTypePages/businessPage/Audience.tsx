import React from "react";
import type { AudienceData } from "./types";

export default function Audience({ data }: { data: AudienceData }) {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">{data.title}</h2>
      <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
        {data.list.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
