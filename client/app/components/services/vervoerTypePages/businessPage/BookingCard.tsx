import React from "react";
import type { BookingCardData } from "./types";

export default function BookingCard({ data }: { data: BookingCardData }) {
  return (
    <aside className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8">
      <h2 className="text-xl font-semibold text-slate-900 mb-4">{data.title}</h2>

      <p className="text-slate-600 mb-6">{data.description}</p>

      <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-slate-800 transition">
        {data.cta}
      </button>
    </aside>
  );
}
