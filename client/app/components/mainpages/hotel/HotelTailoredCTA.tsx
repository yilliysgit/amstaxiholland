import React from "react";

export default function HotelTailoredCTA() {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-blue-900 to-blue-700 text-white rounded-3xl mt-10">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-3xl font-bold mb-4">Tailored to your journey</h3>
        <p className="opacity-90 mb-8">
          Let us know your destination and preferences — we will arrange everything.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <input
            type="text"
            placeholder="Hotel name or pick-up location"
            className="px-4 py-3 rounded-xl text-gray-900 w-full md:w-80"
          />
          <button className="bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100">
            Continue
          </button>
        </div>
      </div>
    </section>
  );
}
