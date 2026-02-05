import React from "react";
import type { PricingData } from "./types";

export default function Pricing({ data }: { data: PricingData }) {
  return (
    <section className="bg-slate-50 border-y border-slate-200 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold mb-6">{data.title}</h2>

        <div className="grid gap-6 md:grid-cols-3">
          {data.cards.map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col"
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-1">{card.title}</h3>
                <p className="text-xl font-bold text-slate-900">
                  {card.price}
                </p>
              </div>

              <ul className="space-y-2 text-sm text-slate-600 mb-6">
                {card.details.map((d, j) => (
                  <li key={j}>• {d}</li>
                ))}
              </ul>

              <button className="mt-auto w-full text-sm font-semibold rounded-lg border border-slate-900 py-2 hover:bg-slate-900 hover:text-white transition">
                Reserveer deze optie
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
