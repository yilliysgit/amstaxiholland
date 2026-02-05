import React from "react";

const pricing = [
  {
    title: "Flex",
    price: "From €35",
    features: ["Free cancellation", "Economy vehicle", "Standard comfort"]
  },
  {
    title: "Standard",
    price: "From €42",
    features: ["Business sedan", "Professional chauffeur", "Free water"]
  },
  {
    title: "Corporate",
    price: "Custom",
    features: ["Billing options", "Multiple vehicles", "Priority support"]
  }
];

export default function HotelPricingSection() {
  return (
    <section className="py-24 bg-gray-50 px-6">
      <h3 className="text-3xl text-center font-bold mb-12">Transparent Pricing</h3>
      
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {pricing.map((p, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl shadow">
            <h4 className="text-xl font-bold mb-2">{p.title}</h4>
            <p className="text-gray-800 font-semibold mb-4">{p.price}</p>
            <ul className="space-y-2 text-gray-600">
              {p.features.map((f, idx) => (
                <li key={idx}>• {f}</li>
              ))}
            </ul>
            <button className="w-full mt-6 py-3 rounded-xl bg-gray-900 text-white hover:bg-gray-800">
              Select
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
