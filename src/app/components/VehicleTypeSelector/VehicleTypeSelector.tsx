"use client";

import { useState, useEffect } from "react";
import { Car, Users, Crown, Star, Clock, Shield, ArrowRight, Sparkles } from "lucide-react";

export default function VehicleTypeSelector() {
  const [selectedService, setSelectedService] = useState('business');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const services = [
    {
      id: 'business',
      title: 'Business Class',
      subtitle: 'Premium comfort voor zakelijke ritten',
      icon: Car,
      features: ['Luxe Mercedes-Benz', 'WiFi & USB-C', 'Stille rit gegarandeerd', 'Zakelijke factuur'],
      gradient: 'from-gray-700 via-gray-800 to-gray-900',
    },
    {
      id: 'vip',
      title: 'VIP Class',
      subtitle: 'Exclusieve ervaring met topservice',
      icon: Crown,
      features: ['Tesla Model S / BMW 7-serie', 'Persoonlijke butler-service', 'Champagne & snacks', 'Red carpet ontvangst'],
      gradient: 'from-gray-800 via-gray-900 to-gray-950',
    },
    {
      id: 'minivan',
      title: 'Minivan Luxury',
      subtitle: 'Ruime oplossing voor groepen',
      icon: Users,
      features: ['Mercedes V-Class (8 pers)', 'Panoramadak', 'Entertainment systeem', 'Premium leder interieur'],
      gradient: 'from-gray-700 via-gray-800 to-gray-900',
    }
  ];

  const selectedServiceData = services.find(s => s.id === selectedService);

  return (
    <div className="min-h-screen bg-gradient-mercedes-premium">
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className={`transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 bg-white/70 glass-effect rounded-full px-4 py-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="font-bold text-gray-800">9.3</span>
              <span className="text-gray-500">• Amsterdam #1 Taxi</span>
            </div>
            <div className="hidden md:flex items-center gap-5 text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>24/7 Service</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>Volledig verzekerd</span>
              </div>
            </div>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-800 mb-3 tracking-tight">Premium Taxi</h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto font-light">
              Exclusief vervoer dat Amsterdam's elite vertrouwt. 
              <span className="text-gray-800 font-medium"> Altijd op tijd, altijd in absolute luxe.</span>
            </p>
          </div>
        </div>

        {/* Main Card */}
        <div className={`transition-all duration-700 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative glass-effect rounded-3xl overflow-hidden">
            {/* Service Tabs */}
            <div className="flex border-b border-gray-200">
              {services.map((service) => {
                const IconComponent = service.icon;
                const isActive = selectedService === service.id;

                return (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`flex-1 p-6 md:p-8 transition-all ${
                      isActive ? 'bg-gray-100' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <div className={`w-14 h-14 mb-4 rounded-xl flex items-center justify-center ${
                        isActive
                          ? 'bg-gray-800'
                          : 'bg-gray-200'
                      }`}>
                        <IconComponent className={`w-7 h-7 ${isActive ? 'text-white' : 'text-gray-700'}`} />
                      </div>
                      <h3 className="text-gray-800 font-bold mb-1">{service.title}</h3>
                      <p className="text-gray-500 text-sm">{service.subtitle}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Details */}
            <div className="p-8 md:p-12">
              <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-gray-700"></span>
                {selectedServiceData?.title} Premium Features
              </h4>

              <div className="grid md:grid-cols-2 gap-5 mb-10">
                {selectedServiceData?.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-gray-100 rounded-xl p-4 hover:bg-gray-200 transition"
                  >
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-700"></span>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <button
                  className="px-10 py-4 rounded-2xl text-white font-semibold inline-flex items-center gap-2 bg-gradient-to-r from-navy-700 to-gray-700 hover:scale-105 transition"
                >
                  Reserveer {selectedServiceData?.title}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
