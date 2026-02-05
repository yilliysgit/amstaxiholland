import React from "react";
import type { NationwideData } from "./types";

export default function Nationwide({ data }: { data: NationwideData }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-2">{data.title}</h2>
      <p className="text-sm text-slate-700 max-w-3xl">{data.text}</p>
    </section>
  );
}
