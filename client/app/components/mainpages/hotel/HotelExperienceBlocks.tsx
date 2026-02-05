import React from "react";

const blocks = [
  {
    title: "First Class Experience",
    text: "Luxury sedans with premium comfort and amenities.",
    color: "from-yellow-400 to-orange-500"
  },
  {
    title: "Group & Family Transfer",
    text: "Spacious vans perfect for families or business groups.",
    color: "from-purple-500 to-indigo-600"
  },
  {
    title: "Chauffeur by the Hour",
    text: "Ultimate flexibility with your own private driver.",
    color: "from-pink-500 to-red-500"
  }
];

export default function HotelExperienceBlocks() {
  return (
    <section className="py-20 px-6">
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {blocks.map((block, i) => (
          <div
            key={i}
            className={`p-8 rounded-2xl text-white bg-gradient-to-br ${block.color} shadow-lg`}
          >
            <h3 className="text-xl font-bold mb-3">{block.title}</h3>
            <p className="opacity-90">{block.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
