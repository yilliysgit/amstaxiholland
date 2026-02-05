import React from "react";
import type { FAQData } from "./types";

export default function FAQ({ data }: { data: FAQData }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">{data.title}</h2>

      <div className="space-y-4">
        {data.items.map((item, i) => (
          <details
            key={i}
            className="group border border-slate-200 rounded-lg p-4 bg-white"
          >
            <summary className="cursor-pointer text-sm font-semibold text-slate-900 flex justify-between items-center">
              {item.question}
              <span className="text-slate-400 group-open:rotate-180 transition-transform">
                ▼
              </span>
            </summary>

            <p className="mt-2 text-sm text-slate-700 leading-relaxed">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
