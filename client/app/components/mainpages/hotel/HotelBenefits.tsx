import React from "react";
import { Shield, Clock, MapPin } from "lucide-react";

const features = [
  {
    icon: <Shield className="w-6 h-6 text-blue-600" />,
    title: "Professional Chauffeurs",
    text: "Experienced, multilingual and trained for hospitality-level service."
  },
  {
    icon: <Clock className="w-6 h-6 text-blue-600" />,
    title: "Punctual & Reliable",
    text: "Always on time — your schedule is our priority."
  },
  {
    icon: <MapPin className="w-6 h-6 text-blue-600" />,
    title: "Any Destination",
    text: "From your hotel to airports, business meetings or tourist hotspots."
  }
];

export default function HotelBenefits() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {features.map((item, index) => (
          <div key={index} className="p-8 rounded-2xl shadow-md bg-white hover:shadow-lg transition">
            <div className="mb-4">{item.icon}</div>
            <h3 className="font-bold text-lg mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
