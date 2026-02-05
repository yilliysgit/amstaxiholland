import React from "react";
import { Plane, Users, Car, Clock } from "lucide-react";

const services = [
  {
    icon: <Plane className="w-6 h-6 text-sky-600" />,
    title: "Airport Transfers",
    text: "Effortless travel to and from all major airports."
  },
  {
    icon: <Users className="w-6 h-6 text-green-600" />,
    title: "Group Transport",
    text: "Ideal for families, delegations or travel groups."
  },
  {
    icon: <Car className="w-6 h-6 text-purple-600" />,
    title: "City Transport",
    text: "Reliable hotel pickup for meetings, events or sightseeing."
  },
  {
    icon: <Clock className="w-6 h-6 text-pink-600" />,
    title: "Hourly Chauffeur",
    text: "A driver at your disposal for flexible schedules."
  }
];

export default function HotelServiceOverview() {
  return (
    <section className="py-24 bg-gray-50 px-6">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">Your journey, perfectly arranged</h2>
        <p className="text-gray-600">Premium hotel transportation for every situation.</p>
      </div>

      <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {services.map((service, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <div className="mb-4">{service.icon}</div>
            <h3 className="font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600 text-sm">{service.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
