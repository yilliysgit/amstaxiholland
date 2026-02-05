// src/app/components/forms/bookingsForm/BookingsFormStep3.tsx
"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Plus,
  Plane,
  Coffee,
  Wifi,
  Newspaper,
  Car,
  MapPin,
  Phone,
  MessageSquare,
  Euro,
} from "lucide-react";

// Types
import type {
  BookingStep1FormData,
  AddressFields,
} from "@/types/forms/bookingsForm/step1.type";

type Step2Data = {
  selectedVehicle: string;
  finalPassengerCount: number;
  baggageType: "none" | "handluggage" | "suitcases";
  totalPrice: number;
  vehicleData?: {
    id: string;
    name: string;
    description: string;
    capacity: number;
    luggage: string;
    basePrice: number;
    pricePerKm: number;
    features: string[];
  };
};

type Step3Data = {
  extraOptions: string[];
  specialRequests: string;
  flightNumber?: string;
  meetingPoint?: string;
  contactPhone?: string;
};

type Props = {
  step1: BookingStep1FormData;
  step2: Step2Data;
  onPrev: () => void;
  onNext: (data: Step3Data) => void;
};

// Extra opties met prijzen
const extraOptions = [
  {
    id: "child_seat",
    name: "Kinderzitje",
    description: "Veilig kinderzitje voor kinderen tot 12 jaar",
    price: 15,
    icon: Car,
  },
  {
    id: "meet_greet",
    name: "Meet & Greet Service",
    description: "Chauffeur wacht u op met naambordje",
    price: 25,
    icon: MapPin,
  },
  {
    id: "refreshments",
    name: "Verfrissingen",
    description: "Water, koffie en snacks aan boord",
    price: 12,
    icon: Coffee,
  },
  {
    id: "wifi",
    name: "Premium WiFi",
    description: "Snelle internetverbinding tijdens de rit",
    price: 8,
    icon: Wifi,
  },
  {
    id: "newspapers",
    name: "Dagbladen",
    description: "Nederlandse en internationale kranten",
    price: 5,
    icon: Newspaper,
  },
  {
    id: "flight_tracking",
    name: "Vlucht Monitoring",
    description: "We volgen uw vlucht voor eventuele vertragingen",
    price: 10,
    icon: Plane,
  },
];

// Utility functions
const fmtAddr = (a: AddressFields) =>
  `${a.address} ${a.houseNumber}${a.addition ? ` ${a.addition}` : ""}`.trim();

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(n);

export const BookingsFormStep3: React.FC<Props> = ({ step1, step2, onPrev, onNext }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [specialRequests, setSpecialRequests] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [meetingPoint, setMeetingPoint] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const s1 = step1 as any;

  const toggleOption = (optionId: string) => {
    setSelectedOptions(prev => 
      prev.includes(optionId) 
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const calculateExtraCosts = () => {
    return selectedOptions.reduce((total, optionId) => {
      const option = extraOptions.find(opt => opt.id === optionId);
      return total + (option?.price || 0);
    }, 0);
  };

  const totalWithExtras = step2.totalPrice + calculateExtraCosts();

  const handleNext = () => {
    const step3Data: Step3Data = {
      extraOptions: selectedOptions,
      specialRequests,
      flightNumber: flightNumber || undefined,
      meetingPoint: meetingPoint || undefined,
      contactPhone: contactPhone || undefined,
    };

    onNext(step3Data);
  };

  const inputClasses = "w-full px-4 py-3 glass-effect border border-gray-200/50 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all text-gray-800 placeholder-gray-400";

  const steps = [
    { id: 1, title: "Reis Details", isActive: false, isCompleted: true },
    { id: 2, title: "Voertuig Keuze", isActive: false, isCompleted: true },
    { id: 3, title: "Extra Opties", isActive: true, isCompleted: false },
    { id: 4, title: "Bevestiging", isActive: false, isCompleted: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-mercedes-premium py-6 px-3">
      <div className="max-w-6xl mx-auto">
        {/* Steps Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs transition-all ${
                      step.isCompleted
                        ? "bg-gray-800 text-white"
                        : step.isActive
                        ? "bg-gray-700 text-white"
                        : "glass-effect text-gray-500 border border-gray-200/50"
                    }`}
                  >
                    {step.isCompleted ? <Check className="w-4 h-4" /> : step.id}
                  </div>
                  <span
                    className={`mt-1 text-xs ${
                      step.isActive ? "text-gray-800" : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-px mx-3 ${
                      step.isCompleted ? "bg-gray-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 glass-effect rounded-full mb-3 border border-gray-200/50">
            <Plus className="w-6 h-6 text-gray-700" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Extra Services & Wensen
          </h1>
          <p className="text-gray-600 text-sm">
            Maak uw reis nog comfortabeler met extra services
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Extra Opties */}
            <div className="glass-effect rounded-2xl p-6 border border-gray-200/30">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Extra Services
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {extraOptions.map((option) => {
                  const isSelected = selectedOptions.includes(option.id);
                  const IconComponent = option.icon;
                  
                  return (
                    <div
                      key={option.id}
                      onClick={() => toggleOption(option.id)}
                      className={`cursor-pointer glass-effect rounded-xl p-4 border transition-all hover:shadow-md ${
                        isSelected
                          ? "border-gray-600 bg-gray-50/50 shadow-sm"
                          : "border-gray-200/50 hover:border-gray-400/50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isSelected ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-600"
                        }`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-gray-800 text-sm">
                              {option.name}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-gray-800">
                                {formatCurrency(option.price)}
                              </span>
                              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                                isSelected ? "border-gray-600 bg-gray-600" : "border-gray-300"
                              }`}>
                                {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 leading-tight">
                            {option.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Vluchtinformatie */}
            <div className="glass-effect rounded-2xl p-6 border border-gray-200/30">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <Plane className="w-5 h-5" />
                Vluchtinformatie (optioneel)
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vluchtnummer
                  </label>
                  <input
                    type="text"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value.toUpperCase())}
                    placeholder="Bijv. KL1234"
                    className={inputClasses}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Voor luchthaven transfers - we volgen uw vlucht
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ontmoetingspunt
                  </label>
                  <input
                    type="text"
                    value={meetingPoint}
                    onChange={(e) => setMeetingPoint(e.target.value)}
                    placeholder="Bijv. Arrivals hal, uitgang 3"
                    className={inputClasses}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Waar kunnen we u het best ontmoeten?
                  </p>
                </div>
              </div>
            </div>

            {/* Contact & Opmerkingen */}
            <div className="glass-effect rounded-2xl p-6 border border-gray-200/30">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Contact & Bijzondere Wensen
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contactnummer tijdens reis (optioneel)
                  </label>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="06 12345678"
                    className={inputClasses}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Voor belangrijke updates tijdens uw reis
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bijzondere wensen of opmerkingen
                  </label>
                  <textarea
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Bijvoorbeeld: allergieën, muziekvoorkeur, route-wensen, etc."
                    rows={4}
                    className={`${inputClasses} resize-none`}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Laat ons weten hoe we uw reis perfect kunnen maken
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Prijsoverzicht Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-effect rounded-2xl p-5 border border-gray-200/30 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Prijsoverzicht</h3>
              
              {/* Basisgegevens */}
              <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                <div className="text-sm">
                  <div className="text-gray-600 mb-1">Route</div>
                  <div className="text-gray-800 font-medium">
                    {fmtAddr(s1.fromAddress)} → {fmtAddr(s1.toAddress)}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-gray-600">Voertuig</div>
                    <div className="text-gray-800 font-medium">{step2.vehicleData?.name}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Passagiers</div>
                    <div className="text-gray-800 font-medium">{step2.finalPassengerCount}</div>
                  </div>
                </div>
              </div>

              {/* Prijsberekening */}
              <div className="space-y-2 mb-4">
                <h4 className="font-semibold text-gray-800">Kosten</h4>
                
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Basis vervoer</span>
                    <span className="text-gray-800">{formatCurrency(step2.totalPrice)}</span>
                  </div>
                  
                  {selectedOptions.length > 0 && (
                    <>
                      <div className="pt-1 text-xs font-medium text-gray-700">Extra services:</div>
                      {selectedOptions.map(optionId => {
                        const option = extraOptions.find(opt => opt.id === optionId);
                        return option ? (
                          <div key={optionId} className="flex justify-between text-xs">
                            <span className="text-gray-600">• {option.name}</span>
                            <span className="text-gray-800">{formatCurrency(option.price)}</span>
                          </div>
                        ) : null;
                      })}
                    </>
                  )}
                  
                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-gray-800">Totaal</span>
                      <span className="text-gray-800">{formatCurrency(totalWithExtras)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {calculateExtraCosts() > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2 text-green-700">
                    <Euro className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      Extra services: {formatCurrency(calculateExtraCosts())}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 max-w-4xl mx-auto">
          <button
            type="button"
            onClick={onPrev}
            className="inline-flex items-center gap-2 px-6 py-3 glass-effect rounded-xl border border-gray-200/50 hover:bg-gray-50 transition-all text-gray-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Terug naar voertuigkeuze
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-700 transition-all"
          >
            <span>Naar overzicht</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};