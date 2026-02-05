import React from "react";
import type { WhyBusinessData } from "./types";

export default function WhyBusiness({ data }: { data: WhyBusinessData }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">{data.title}</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {data.items.map((item, i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200 p-4 bg-white"
          >
            <h3 className="font-semibold mb-1">{item.title}</h3>
            <p className="text-sm text-slate-600">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
