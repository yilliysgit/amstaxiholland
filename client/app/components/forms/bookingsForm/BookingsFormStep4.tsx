// src/app/components/forms/bookingsForm/BookingsFormStep4.tsx
"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  Check,
  User,
  Mail,
  Phone,
  Shield,
  CreditCard,
  MapPin,
  Calendar,
  Users,
  Car,
  Plus,
  Clock,
  CheckCircle,
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
  onPrev: () => void;
  onSubmit: (contactInfo: ContactInfo) => void;
};

// Extra opties voor display (moet synchroon zijn met Step3)
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

export const BookingsFormStep4: React.FC<Props> = ({ step1, step2, step3, onPrev, onSubmit }) => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    specialRequests: "",
  });

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactInfo>>({});

  const s1 = step1 as any;

  // Bereken totale prijs inclusief extra opties
  const extraOptionsCost = step3.extraOptions.reduce((total, optionId) => {
    return total + (extraOptionsMap[optionId]?.price || 0);
  }, 0);
  const totalPrice = step2.totalPrice + extraOptionsCost;

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactInfo> = {};

    if (!contactInfo.firstName.trim()) newErrors.firstName = "Voornaam is verplicht";
    if (!contactInfo.lastName.trim()) newErrors.lastName = "Achternaam is verplicht";
    
    if (!contactInfo.email.trim()) {
      newErrors.email = "E-mailadres is verplicht";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo.email)) {
      newErrors.email = "Ongeldig e-mailadres";
    }
    
    if (!contactInfo.phone.trim()) {
      newErrors.phone = "Telefoonnummer is verplicht";
    } else if (!/^[\d\s\-\+\(\)]{10,}$/.test(contactInfo.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Ongeldig telefoonnummer";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ContactInfo, value: string) => {
    setContactInfo(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    if (!agreedToTerms) {
      alert("Accepteer de algemene voorwaarden om door te gaan");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const finalContactInfo = {
        ...contactInfo,
        specialRequests: step3.specialRequests || contactInfo.specialRequests,
      };
      
      onSubmit(finalContactInfo);
    } catch (error) {
      console.error("Booking submission failed:", error);
      alert("Er ging iets mis bij het verwerken van uw reservering. Probeer opnieuw.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full px-4 py-3 glass-effect border border-gray-200/50 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all text-gray-800 placeholder-gray-400";

  const steps = [
    { id: 1, title: "Reis Details", isActive: false, isCompleted: true },
    { id: 2, title: "Voertuig Keuze", isActive: false, isCompleted: true },
    { id: 3, title: "Extra Opties", isActive: false, isCompleted: true },
    { id: 4, title: "Bevestiging", isActive: true, isCompleted: false },
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
            <Shield className="w-6 h-6 text-gray-700" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Bevestig Uw Reservering
          </h1>
          <p className="text-gray-600 text-sm">
            Controleer uw gegevens en rond uw boeking af
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-effect rounded-2xl p-6 border border-gray-200/30">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <User className="w-5 h-5" />
                Uw Contactgegevens
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Voornaam *
                  </label>
                  <input
                    type="text"
                    value={contactInfo.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    placeholder="Bijv. Jan"
                    className={`${inputClasses} ${errors.firstName ? 'border-red-400' : ''}`}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Achternaam *
                  </label>
                  <input
                    type="text"
                    value={contactInfo.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    placeholder="Bijv. de Vries"
                    className={`${inputClasses} ${errors.lastName ? 'border-red-400' : ''}`}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-mailadres *
                  </label>
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="jan@voorbeeld.nl"
                    className={`${inputClasses} ${errors.email ? 'border-red-400' : ''}`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefoonnummer *
                  </label>
                  <input
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="06 12345678"
                    className={`${inputClasses} ${errors.phone ? 'border-red-400' : ''}`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bedrijf (optioneel)
                </label>
                <input
                  type="text"
                  value={contactInfo.company || ""}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  placeholder="Bijv. ABC Consultancy"
                  className={inputClasses}
                />
              </div>

              {step3.specialRequests && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Uw bijzondere wensen
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200/50">
                    <p className="text-sm text-gray-800">{step3.specialRequests}</p>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Aanvullende opmerkingen (optioneel)
                </label>
                <textarea
                  value={contactInfo.specialRequests || ""}
                  onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                  placeholder="Eventuele laatste opmerkingen of verzoeken..."
                  rows={3}
                  className={`${inputClasses} resize-none`}
                />
              </div>

              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="w-4 h-4 text-gray-600 border-gray-300 rounded mt-0.5"
                  />
                  <div className="text-sm">
                    <span className="text-gray-800">
                      Ik ga akkoord met de{" "}
                      <a href="/terms" className="text-gray-600 underline hover:text-gray-800">
                        algemene voorwaarden
                      </a>{" "}
                      en{" "}
                      <a href="/privacy" className="text-gray-600 underline hover:text-gray-800">
                        privacyverklaring
                      </a>
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="glass-effect rounded-2xl p-5 border border-gray-200/30 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Reservering Overzicht</h3>
              
              {/* Trip Details */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                  <div className="text-sm">
                    <div className="font-medium text-gray-800">Route</div>
                    <div className="text-gray-600">
                      {fmtAddr(s1.fromAddress)} → {fmtAddr(s1.toAddress)}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-gray-500 mt-0.5" />
                  <div className="text-sm">
                    <div className="font-medium text-gray-800">Datum & Tijd</div>
                    <div className="text-gray-600">
                      {formatDate(s1.date)} om {s1.time}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Car className="w-4 h-4 text-gray-500 mt-0.5" />
                  <div className="text-sm">
                    <div className="font-medium text-gray-800">Voertuig</div>
                    <div className="text-gray-600">{step2.vehicleData?.name}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-4 h-4 text-gray-500 mt-0.5" />
                  <div className="text-sm">
                    <div className="font-medium text-gray-800">Passagiers</div>
                    <div className="text-gray-600">{step2.finalPassengerCount}</div>
                  </div>
                </div>

                {s1.isRetour && (
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-gray-500 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium text-gray-800">Retour</div>
                      <div className="text-gray-600">
                        {formatDate(s1.returnDate)} om {s1.returnTime}
                      </div>
                    </div>
                  </div>
                )}

                {step3.flightNumber && (
                  <div className="flex items-start gap-3">
                    <div className="w-4 h-4 text-gray-500 mt-0.5">✈️</div>
                    <div className="text-sm">
                      <div className="font-medium text-gray-800">Vluchtnummer</div>
                      <div className="text-gray-600">{step3.flightNumber}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Extra Services */}
              {step3.extraOptions.length > 0 && (
                <div className="mb-6 pb-4 border-b border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Extra Services
                  </h4>
                  <div className="space-y-1">
                    {step3.extraOptions.map(optionId => {
                      const option = extraOptionsMap[optionId];
                      return option ? (
                        <div key={optionId} className="flex justify-between text-sm">
                          <span className="text-gray-600">{option.name}</span>
                          <span className="text-gray-800">{formatCurrency(option.price)}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-2 mb-6">
                <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Totaal Overzicht
                </h4>
                
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vervoer</span>
                    <span className="text-gray-800">{formatCurrency(step2.totalPrice)}</span>
                  </div>
                  
                  {extraOptionsCost > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Extra services</span>
                      <span className="text-gray-800">{formatCurrency(extraOptionsCost)}</span>
                    </div>
                  )}
                  
                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-gray-800">Totaal</span>
                      <span className="text-gray-800">{formatCurrency(totalPrice)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Betaling bij chauffeur
                  </span>
                </div>
                <p className="text-xs text-green-600 mt-1">
                  U kunt contant of per pin betalen
                </p>
              </div>
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
            Terug naar extra opties
          </button>

          <button
            type="button"
            disabled={!agreedToTerms || isSubmitting}
            onClick={handleSubmit}
            className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all ${
              agreedToTerms && !isSubmitting
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Reservering versturen...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>Reservering Bevestigen</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};