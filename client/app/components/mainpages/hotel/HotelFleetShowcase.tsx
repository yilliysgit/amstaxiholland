"use client";
import React, { useState } from "react";

const cars = {
  economy: {
    name: "Economy Car",
    features: ["Affordable", "Clean interior", "Air conditioning"],
  },
  business: {
    name: "Business Sedan",
    features: ["Leather seats", "Extra legroom", "Phone charger"],
  },
  suv: {
    name: "Luxury SUV",
    features: ["Spacious", "Premium comfort", "Tinted windows"],
  },
} as const;

type CarType = keyof typeof cars;

export default function HotelFleetShowcase() {
  const [selected, setSelected] = useState<CarType>("business");
  const car = cars[selected];

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold text-center mb-10">
          Choose your comfort level
        </h3>

        <div className="flex justify-center gap-4 mb-8">
          {(["economy", "business", "suv"] as CarType[]).map((type) => (
            <button
              key={type}
              onClick={() => setSelected(type)}
              className={`px-4 py-2 rounded-xl border ${
                selected === type ? "bg-gray-900 text-white" : "bg-white"
              }`}
            >
              {type.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-10 shadow-lg flex flex-col md:flex-row gap-10">
          <div className="flex-1 flex items-center justify-center">
            <div className="w-40 h-20 bg-gray-200 rounded-xl" />
          </div>

          <div className="flex-1">
            <h4 className="text-xl font-bold mb-4">{car.name}</h4>
            <ul className="space-y-2 text-gray-600">
              {car.features.map((f, i) => (
                <li key={i}>• {f}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
