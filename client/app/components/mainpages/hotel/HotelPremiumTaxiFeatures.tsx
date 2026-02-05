import React from "react";

export default function HotelPremiumTaxiFeatures() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-3xl p-10">
        <h3 className="text-2xl font-bold mb-6">Premium Taxi</h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">Pick-up Info</h4>
            <input type="text" placeholder="Hotel name" className="w-full mb-4 p-3 border rounded-xl" />
            <input type="text" placeholder="Destination" className="w-full mb-4 p-3 border rounded-xl" />
          </div>

          <div>
            <h4 className="font-semibold mb-3">Features</h4>
            <ul className="text-gray-600 space-y-2">
              <li>• Professional chauffeur</li>
              <li>• Free water</li>
              <li>• Assistance with luggage</li>
              <li>• Real-time tracking</li>
            </ul>
          </div>
        </div>

        <button className="mt-8 px-8 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800">
          Book Now
        </button>
      </div>
    </section>
  );
}
