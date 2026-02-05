import React from "react";
import type { HowItWorksData } from "./types";

export default function HowItWorks({ data }: { data: HowItWorksData }) {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">{data.title}</h2>
      <ol className="space-y-3 text-sm text-slate-700">
        {data.steps.map((step, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-bold">
              {i + 1}
            </span>
            <div>
              <h3 className="font-semibold text-slate-900">{step.title}</h3>
              <p>{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
