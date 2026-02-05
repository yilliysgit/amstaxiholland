// src/app/components/forms/bookingsForm/BookingsFormStep5.tsx
"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  Check,
  CreditCard,
  MapPin,
  Calendar,
  Users,
  Car,
  Plus,
  Clock,
  User,
  Phone,
  Mail,
  Building,
  MessageSquare,
  Plane,
  Star,
  Shield,
  CheckCircle,
  Edit,
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

type ContactInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  specialRequests?: string;
};

type Props = {
  step1: BookingStep1FormData;
  step2: Step2Data;
  step3: Step3Data;
  step4: ContactInfo;
  onPrev: () => void;
  onPayment: () => Promise<void> | void; // ← mag async zijn
  onEdit?: (step: number) => void;
};

// Extra opties mapping
const extraOptionsMap: Record<string, { name: string; price: number }> = {
  child_seat: { name: "Kinderzitje", price: 15 },
  meet_greet: { name: "Meet & Greet Service", price: 25 },
  refreshments: { name: "Verfrissingen", price: 12 },
  wifi: { name: "Premium WiFi", price: 8 },
  newspapers: { name: "Dagbladen", price: 5 },
  flight_tracking: { name: "Vlucht Monitoring", price: 10 },
};

// Utility functions
const fmtAddr = (a: AddressFields) =>
  `${a.address} ${a.houseNumber}${a.addition ? ` ${a.addition}` : ""}`.trim();

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(n);

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("nl-NL", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

export const BookingsFormStep5: React.FC<Props> = ({ 
  step1, 
  step2, 
  step3, 
  step4, 
  onPrev, 
  onPayment,
  onEdit 
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const s1 = step1 as any;

  // Bereken totale prijs
  const extraOptionsCost = step3.extraOptions.reduce((total, optionId) => {
    return total + (extraOptionsMap[optionId]?.price || 0);
  }, 0);
  const totalPrice = step2.totalPrice + extraOptionsCost;

  const handleClick = async () => {
  try {
    setIsProcessing(true);
    await onPayment(); // parent doet de fetch naar /api/bookings
  } finally {
    setIsProcessing(false);
  }
};

  const steps = [
    { id: 1, title: "Reis Details", isActive: false, isCompleted: true },
    { id: 2, title: "Voertuig Keuze", isActive: false, isCompleted: true },
    { id: 3, title: "Extra Opties", isActive: false, isCompleted: true },
    { id: 4, title: "Contactgegevens", isActive: false, isCompleted: true },
    { id: 5, title: "Overzicht", isActive: true, isCompleted: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-mercedes-premium py-6 px-3">
      <div className="max-w-5xl mx-auto">
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
            <CheckCircle className="w-6 h-6 text-gray-700" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Controleer Uw Reservering
          </h1>
          <p className="text-gray-600 text-sm">
            Laatste controle voordat u naar de betaling gaat
          </p>
        </div>

        <div className="space-y-6">
          {/* Reis Details */}
          <div className="glass-effect rounded-2xl p-6 border border-gray-200/30">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Reis Details
              </h2>
              {onEdit && (
                <button
                  onClick={() => onEdit(1)}
                  className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
                >
                  <Edit className="w-3 h-3" />
                  Wijzigen
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Route</div>
                  <div className="text-gray-800">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>{fmtAddr(s1.fromAddress)}</span>
                    </div>
                    <div className="ml-4 my-1 border-l-2 border-gray-200 h-4"></div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>{fmtAddr(s1.toAddress)}</span>
                    </div>
                  </div>
                </div>

                {s1.stops?.length > 0 && (
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-1">Tussenstops</div>
                    <div className="text-gray-800">
                      {s1.stops.map((stop: AddressFields, idx: number) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>{fmtAddr(stop)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-1">Datum</div>
                    <div className="text-gray-800">{formatDate(s1.date)}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-1">Tijd</div>
                    <div className="text-gray-800">{s1.time}</div>
                  </div>
                </div>

                {s1.isRetour && (
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-1">Retour</div>
                    <div className="text-gray-800">
                      {formatDate(s1.returnDate)} om {s1.returnTime}
                      {s1.retourType === "different" && s1.retourFromAddress && (
                        <div className="text-sm text-gray-600 mt-1">
                          Vertrek: {fmtAddr(s1.retourFromAddress)}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Voertuig & Passagiers */}
          <div className="glass-effect rounded-2xl p-6 border border-gray-200/30">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Car className="w-5 h-5" />
                Voertuig & Passagiers
              </h2>
              {onEdit && (
                <button
                  onClick={() => onEdit(2)}
                  className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
                >
                  <Edit className="w-3 h-3" />
                  Wijzigen
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Voertuig</div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      {step2.vehicleData?.id === "luxury" ? (
                        <Star className="w-6 h-6 text-yellow-500" />
                      ) : (
                        <Car className="w-6 h-6 text-gray-600" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{step2.vehicleData?.name}</div>
                      <div className="text-sm text-gray-600">{step2.vehicleData?.description}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-1">Passagiers</div>
                    <div className="text-gray-800">{step2.finalPassengerCount}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-1">Bagage</div>
                    <div className="text-gray-800">
                      {step2.baggageType === "none" ? "Geen bagage" :
                       step2.baggageType === "handluggage" ? "Handbagage" : "Koffers"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Extra Services */}
          {step3.extraOptions.length > 0 && (
            <div className="glass-effect rounded-2xl p-6 border border-gray-200/30">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Extra Services
                </h2>
                {onEdit && (
                  <button
                    onClick={() => onEdit(3)}
                    className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
                  >
                    <Edit className="w-3 h-3" />
                    Wijzigen
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {step3.extraOptions.map(optionId => {
                  const option = extraOptionsMap[optionId];
                  return option ? (
                    <div key={optionId} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-800">{option.name}</span>
                      <span className="font-medium text-gray-800">{formatCurrency(option.price)}</span>
                    </div>
                  ) : null;
                })}
              </div>

              {(step3.flightNumber || step3.meetingPoint || step3.specialRequests) && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {step3.flightNumber && (
                      <div>
                        <span className="text-gray-600">Vluchtnummer: </span>
                        <span className="text-gray-800">{step3.flightNumber}</span>
                      </div>
                    )}
                    {step3.meetingPoint && (
                      <div>
                        <span className="text-gray-600">Ontmoetingspunt: </span>
                        <span className="text-gray-800">{step3.meetingPoint}</span>
                      </div>
                    )}
                  </div>
                  {step3.specialRequests && (
                    <div className="mt-2">
                      <div className="text-gray-600 text-sm mb-1">Bijzondere wensen:</div>
                      <div className="text-gray-800 text-sm">{step3.specialRequests}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Contactgegevens */}
          <div className="glass-effect rounded-2xl p-6 border border-gray-200/30">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <User className="w-5 h-5" />
                Contactgegevens
              </h2>
              {onEdit && (
                <button
                  onClick={() => onEdit(4)}
                  className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
                >
                  <Edit className="w-3 h-3" />
                  Wijzigen
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-800">{step4.firstName} {step4.lastName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-800">{step4.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-800">{step4.phone}</span>
                </div>
              </div>

              <div className="space-y-3">
                {step4.company && (
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-800">{step4.company}</span>
                  </div>
                )}
                {step3.contactPhone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-800">{step3.contactPhone} (tijdens reis)</span>
                  </div>
                )}
                {step4.specialRequests && (
                  <div className="flex items-start gap-2">
                    <MessageSquare className="w-4 h-4 text-gray-500 mt-0.5" />
                    <span className="text-gray-800 text-sm">{step4.specialRequests}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Prijsoverzicht */}
          <div className="glass-effect rounded-2xl p-6 border border-gray-200/30">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Prijsoverzicht
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between text-gray-800">
                <span>Vervoer ({step2.vehicleData?.name})</span>
                <span>{formatCurrency(step2.totalPrice)}</span>
              </div>

              {step3.extraOptions.length > 0 && (
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700">Extra services:</div>
                  {step3.extraOptions.map(optionId => {
                    const option = extraOptionsMap[optionId];
                    return option ? (
                      <div key={optionId} className="flex justify-between text-gray-600 text-sm">
                        <span>• {option.name}</span>
                        <span>{formatCurrency(option.price)}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              )}

              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between text-xl font-bold text-gray-800">
                  <span>Totaal</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 text-blue-700">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">Veilig betalen</span>
              </div>
              <p className="text-xs text-blue-600 mt-1">
                Uw betaling wordt veilig verwerkt via onze beveiligde betaalomgeving
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            type="button"
            onClick={onPrev}
            className="inline-flex items-center gap-2 px-6 py-3 glass-effect rounded-xl border border-gray-200/50 hover:bg-gray-50 transition-all text-gray-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Terug naar contactgegevens
          </button>

<button
  type="button"
  disabled={isProcessing}
  onClick={handleClick}  
  className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all ${
    !isProcessing ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-gray-400 text-gray-200 cursor-not-allowed"
  }`}
>
  {isProcessing ? (
    <>
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      <span>Doorsturen naar betaling...</span>
    </>
  ) : (
    <>
      <CreditCard className="w-5 h-5" />
      <span>Doorgaan naar Betaling ({formatCurrency(totalPrice)})</span>
    </>
  )}
</button>



        </div>
      </div>
    </div>
  );
};