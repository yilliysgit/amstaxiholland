import React from "react";

export default function HeroHotelTransfer() {
  return (
    <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-24 px-6 rounded-b-3xl">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Stress-free hotel transfers
        </h1>
        <p className="text-lg opacity-90 mb-8">
          Premium chauffeur service from your hotel to any destination. Fixed pricing, luxury comfort.
        </p>

        <div className="flex justify-center gap-4">
          <button className="bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100">
            Book Now
          </button>
          <button className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20">
            View Pricing
          </button>
        </div>
      </div>
    </section>
  );
}
