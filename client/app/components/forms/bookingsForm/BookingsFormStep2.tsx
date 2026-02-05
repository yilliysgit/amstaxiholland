// src/app/components/forms/bookingsForm/BookingsFormStep2.tsx
"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  Users,
  Car,
  Crown,
  Star,
  Check,
  ArrowRight,
  Luggage,
} from "lucide-react";

// Types
import type {
  BookingStep1FormData,
  AddressFields,
} from "@/types/forms/bookingsForm/bookingsFormStep1.type";

type BaggageType = "none" | "handluggage" | "suitcases";

type VehicleType = {
  id: string;
  name: string;
  description: string;
  capacity: number;
  luggage: string;
  image: string;
  basePrice: number;
  pricePerKm: number;
  features: string[];
  icon: React.ComponentType<{ className?: string }>;
};

type Props = {
  step1: BookingStep1FormData;
  onPrev: () => void;
  onNext: (data: Step2Data) => void;  // ← verplicht en met data
};

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


// 👇 Extra type om `any` te vermijden voor velden die we hier gebruiken
// (past gewoon bovenop je bestaande BookingStep1FormData)
type Step1Like = BookingStep1FormData & {
  fromAddress: AddressFields;
  toAddress: AddressFields;
  stops?: AddressFields[];
  date: string;
  time: string;
  passengers: number;
  hasLuggage?: boolean;
  isRetour?: boolean;
  retourType?: "same" | "different";
  returnDate?: string;
  returnTime?: string;
  retourFromAddress?: AddressFields;
};

const vehicles: VehicleType[] = [
  {
    id: "sedan",
    name: "Mercedes E-Klasse",
    description: "Elegante sedan voor comfort en stijl",
    capacity: 4,
    luggage: "2 grote koffers",
    image: "/vehicles/mercedes-e-class.jpg",
    basePrice: 45,
    pricePerKm: 2.2,
    features: ["Leder interieur", "Airco", "WiFi", "Telefoonlader"],
    icon: Car,
  },
  {
    id: "suv",
    name: "Mercedes GLE",
    description: "Ruime SUV voor grotere groepen",
    capacity: 6,
    luggage: "4 grote koffers",
    image: "/vehicles/mercedes-gle.jpg",
    basePrice: 65,
    pricePerKm: 2.8,
    features: [
      "Extra beenruimte",
      "Panoramadak",
      "Premium sound",
      "Klimaatregeling",
    ],
    icon: Car,
  },
  {
    id: "luxury",
    name: "Mercedes S-Klasse",
    description: "Ultieme luxe voor speciale gelegenheden",
    capacity: 4,
    luggage: "3 grote koffers",
    image: "/vehicles/mercedes-s-class.jpg",
    basePrice: 85,
    pricePerKm: 3.5,
    features: [
      "Massage stoelen",
      "Champagne service",
      "Privacy glas",
      "Chauffeur in pak",
    ],
    icon: Crown,
  },
];

const formatAddress = (a: AddressFields) => {
  const streetPart = `${a.address} ${a.houseNumber}${a.addition ? ` ${a.addition}` : ""}`.trim();
  const parts = [streetPart];
  if (a.city) parts.push(a.city);
  if (a.country) parts.push(a.country);
  return parts.join(', ');
};


const formatCurrency = (n: number) =>
  new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(n);

export const BookingsFormStep2: React.FC<Props> = ({ step1, onPrev, onNext }) => {
  const s = step1 as Step1Like;

  const [passengers, setPassengers] = useState<number>(Math.max(1, s.passengers ?? 1));
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");
  const [baggageType, setBaggageType] = useState<BaggageType>(
    s.hasLuggage ? "suitcases" : "none"
  );

  const {
    fromAddress,
    toAddress,
    stops,
    date,
    time,
    isRetour,
    retourType,
    returnDate,
    returnTime,
    retourFromAddress,
  } = s;

  // TODO: vervang door echte afstand op basis van adressen (API)
  const estimatedDistance = 25; // km

  // Filter voertuigen op basis van passagiers
  const availableVehicles = vehicles.filter((v) => v.capacity >= passengers);

  const handlePassengersChange = (increment: number) => {
    const next = Math.max(1, Math.min(8, passengers + increment));
    setPassengers(next);

    // Reset selectie als huidig voertuig te klein wordt
    if (selectedVehicle) {
      const currentVehicle = vehicles.find((v) => v.id === selectedVehicle);
      if (currentVehicle && currentVehicle.capacity < next) {
        setSelectedVehicle("");
      }
    }
  };

  const selectedVehicleData = vehicles.find((v) => v.id === selectedVehicle);
  const basePrice = selectedVehicleData?.basePrice ?? 0;
  const distancePrice = selectedVehicleData
    ? estimatedDistance * selectedVehicleData.pricePerKm
    : 0;
  const subtotal = basePrice + distancePrice;
  const returnDiscount = isRetour ? subtotal * 0.1 : 0;
  const returnPrice = isRetour ? subtotal - returnDiscount : 0;
  const totalPrice = subtotal + returnPrice;

  const canProceed = Boolean(selectedVehicle);


const vehicleTypeMapping: { [key: string]: string } = {
  "sedan": "6825e3acaddd55c738d065d9",
  "suv": "6825e3baaddd55c738d065e1", 
  "luxury": "6825e3d5addd55c738d065e4",
  "wagon": "6825e3e4addd55c738d065e7"
};

const testDistance = async () => {
  if (!selectedVehicle) {
    console.log("Selecteer eerst een voertuig");
    return;
  }

  const fromAddress = step1.fromAddress;
  const toAddress = step1.toAddress;
  
  const locationFrom = `${fromAddress.address} ${fromAddress.houseNumber}, Netherlands`;
  const locationTo = `${toAddress.address} ${toAddress.houseNumber}, Netherlands`;
  
  const carTypeId = vehicleTypeMapping[selectedVehicle];
  
  console.log("Testing met:", { locationFrom, locationTo, carTypeId, passengers });
  
  try {
    const response = await fetch('https://api.idispatch.nl/api/admin/calculate_price/68066dccf26472a24298af2d?lang=en', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        locationFrom,
        locationTo, 
        car_type_id: carTypeId,
        number_of_person: passengers
      })
    });
    
    const result = await response.json();
    console.log('API Result:', result);
  } catch (error) {
    console.error('Error:', error);
  }
};



  return (
    <div className="min-h-screen bg-gradient-mercedes-premium py-6 px-3">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Kies Uw Voertuig</h2>
          <p className="text-gray-600 text-sm">
            Selecteer het perfecte voertuig voor uw reis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Linker kolom: Voertuigkeuze */}
          <div className="lg:col-span-2 space-y-6">
            {/* Passagiers aanpassen */}
            <div className="glass-effect rounded-2xl p-5 border border-gray-200/30">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Aantal Passagiers</h3>
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => handlePassengersChange(-1)}
                  disabled={passengers <= 1}
                  aria-label="Minder passagiers"
                  className="w-12 h-12 glass-effect border border-gray-200/50 rounded-lg disabled:text-gray-300 disabled:cursor-not-allowed hover:bg-gray-50 transition-all flex items-center justify-center text-lg font-semibold"
                >
                  –
                </button>

                <div className="px-6 py-3 glass-effect rounded-lg border border-gray-200/50 min-w-[120px] text-center">
                  <span className="text-gray-800 font-semibold">
                    {passengers} passagier{passengers !== 1 ? "s" : ""}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handlePassengersChange(1)}
                  disabled={passengers >= 8}
                  aria-label="Meer passagiers"
                  className="w-12 h-12 glass-effect border border-gray-200/50 rounded-lg disabled:text-gray-300 disabled:cursor-not-allowed hover:bg-gray-50 transition-all flex items-center justify-center text-lg font-semibold"
                >
                  +
                </button>
              </div>

              {passengers > s.passengers && (
                <p className="mt-3 text-sm text-orange-600">
                  Let op: u heeft meer passagiers geselecteerd dan in stap 1
                </p>
              )}
            </div>

            {/* Bagage specificatie */}
            {s.hasLuggage && (
              <div className="glass-effect rounded-2xl p-5 border border-gray-200/30">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center">
                    <Luggage className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Type Bagage</h3>
                </div>

                <p className="text-sm text-gray-600 mb-3">
                  Specificeer het type bagage voor de beste voertuigkeuze
                </p>

                <div className="space-y-2">
                  <label className="flex items-start gap-3 cursor-pointer group p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="baggageType"
                      value="handluggage"
                      checked={baggageType === "handluggage"}
                      onChange={(e) => setBaggageType(e.target.value as BaggageType)}
                      className="w-4 h-4 text-gray-600 border-gray-300 mt-0.5"
                    />
                    <div>
                      <span className="text-gray-800 font-medium text-sm">Alleen handbagage</span>
                      <p className="text-xs text-gray-500 mt-1">
                        Kleine tassen, rugzakken, laptoptassen die op schoot kunnen
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="baggageType"
                      value="suitcases"
                      checked={baggageType === "suitcases"}
                      onChange={(e) => setBaggageType(e.target.value as BaggageType)}
                      className="w-4 h-4 text-gray-600 border-gray-300 mt-0.5"
                    />
                    <div>
                      <span className="text-gray-800 font-medium text-sm">Koffers/grote bagage</span>
                      <p className="text-xs text-gray-500 mt-1">
                        Koffers, sporttassen, grote rugzakken die in de kofferbak moeten
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Voertuigkeuze */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Beschikbare Voertuigen</h3>

              {availableVehicles.map((vehicle) => {
                const isSelected = selectedVehicle === vehicle.id;
                const IconComponent = vehicle.icon;

                return (
                  <button
                    key={vehicle.id}
                    type="button"
                    onClick={() => setSelectedVehicle(vehicle.id)}
                    aria-pressed={isSelected}
                    className={`w-full text-left cursor-pointer glass-effect rounded-2xl p-5 border transition-all focus:outline-none focus:ring-2 focus:ring-gray-300 ${
                      isSelected
                        ? "border-gray-600 bg-gray-50/50 shadow-md"
                        : "border-gray-200/30 hover:border-gray-400/50"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Vehicle Icon */}
                      <div
                        className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                          isSelected ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        <IconComponent className="w-8 h-8" />
                      </div>

                      {/* Vehicle Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                              {vehicle.name}
                              {vehicle.id === "luxury" && (
                                <Star aria-hidden className="w-4 h-4 text-yellow-500" />
                              )}
                            </h4>
                            <p className="text-sm text-gray-600 mb-1">{vehicle.description}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>Tot {vehicle.capacity} passagiers</span>
                              <span>•</span>
                              <span>{vehicle.luggage}</span>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-800">
                              {formatCurrency(
                                vehicle.basePrice + estimatedDistance * vehicle.pricePerKm
                              )}
                            </div>
                            <div className="text-xs text-gray-500">
                              {formatCurrency(vehicle.basePrice)} basis + {" "}
                              {formatCurrency(estimatedDistance * vehicle.pricePerKm)}
                            </div>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="flex flex-wrap gap-1 mt-3">
                          {vehicle.features.map((feature, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Selection indicator */}
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? "border-gray-600 bg-gray-600" : "border-gray-300"
                        }`}
                        aria-hidden
                      >
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                  </button>
                );
              })}

              {availableVehicles.length === 0 && (
                <div className="glass-effect rounded-2xl p-8 border border-orange-200/50 text-center">
                  <p className="text-orange-600 font-medium mb-2">
                    Geen voertuigen beschikbaar voor {passengers} passagiers
                  </p>
                  <p className="text-sm text-gray-600">
                    Verminder het aantal passagiers of neem contact met ons op voor aangepaste oplossingen.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Rechter kolom: Prijsoverzicht */}
          <div className="lg:col-span-1">
            <div className="glass-effect rounded-2xl p-5 border border-gray-200/30 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Reservering Overzicht</h3>

              {/* Trip details */}
              <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                <div className="text-sm">
                  <div className="text-gray-600 mb-1">Route</div>
                  <div className="text-gray-800 font-medium">
                    {formatAddress(fromAddress)} → {formatAddress(toAddress)}
                  </div>
                </div>

                {!!stops?.length && (
                  <div className="text-sm">
                    <div className="text-gray-600 mb-1">Tussenstops</div>
                    <div className="text-gray-800">
                      {stops.map(formatAddress).join(" • ")}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-gray-600">Datum</div>
                    <div className="text-gray-800 font-medium">{date}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Tijd</div>
                    <div className="text-gray-800 font-medium">{time}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-gray-600">Passagiers</div>
                    <div className="text-gray-800 font-medium">{passengers}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Bagage</div>
                    <div className="text-gray-800 font-medium">
                      {!s.hasLuggage ? "Geen bagage" : 
                       baggageType === "handluggage" ? "Handbagage" : 
                       baggageType === "suitcases" ? "Koffers" : "Ja"}
                    </div>
                  </div>
                </div>

                {isRetour && (
                  <div className="text-sm pt-2 border-t border-gray-100">
                    <div className="text-gray-600 mb-1">Retour</div>
                    <div className="text-gray-800">{returnDate} om {returnTime}</div>
                    {retourType === "different" && retourFromAddress && (
                      <div className="text-gray-600 text-xs mt-1">
                        Vertrek: {formatAddress(retourFromAddress)}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Price breakdown */}
              {selectedVehicleData && (
                <div className="space-y-2 mb-4">
                  <h4 className="font-semibold text-gray-800">Prijsberekening</h4>
                  
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{selectedVehicleData.name}</span>
                      <span className="text-gray-800">{formatCurrency(basePrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Afstand ({estimatedDistance} km)</span>
                      <span className="text-gray-800">{formatCurrency(distancePrice)}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span className="text-gray-800">Heenreis totaal</span>
                      <span className="text-gray-800">{formatCurrency(subtotal)}</span>
                    </div>
                    
                    {isRetour && (
                      <>
                        <div className="flex justify-between text-green-600">
                          <span>Retour korting (10%)</span>
                          <span>-{formatCurrency(returnDiscount)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Retour prijs</span>
                          <span className="text-gray-800">{formatCurrency(returnPrice)}</span>
                        </div>
                      </>
                    )}
                    
                    <div className="pt-2 border-t border-gray-200">
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-gray-800">Totaal</span>
                        <span className="text-gray-800">{formatCurrency(totalPrice)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {!selectedVehicleData && (
                <div className="text-center py-8 text-gray-500">
                  <Car className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Selecteer een voertuig om de prijs te zien</p>
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
            Terug naar reis details
          </button>

          <button
            type="button"
            disabled={!canProceed}

            
            onClick={() => {
  if (onNext) {
    const step2Data: Step2Data = {
      selectedVehicle,
      finalPassengerCount: passengers,
      baggageType,
      totalPrice,
      vehicleData: selectedVehicleData ? {
        id: selectedVehicleData.id,
        name: selectedVehicleData.name,
        description: selectedVehicleData.description,
        capacity: selectedVehicleData.capacity,
        luggage: selectedVehicleData.luggage,
        basePrice: selectedVehicleData.basePrice,
        pricePerKm: selectedVehicleData.pricePerKm,
        features: selectedVehicleData.features,
      } : undefined
    };
    onNext(step2Data);
  }
}}


            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              canProceed
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <span>Naar bevestiging</span>
            <ArrowRight className="w-4 h-4" />
          </button>

<button
  type="button"
  onClick={testDistance}
  className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
>
  Test API Afstand
</button>




        </div>
      </div>
    </div>
  );
};