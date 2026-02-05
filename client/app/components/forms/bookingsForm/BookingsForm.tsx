// client/app/components/forms/bookingsForm/BookingsForm.tsx

"use client";
import { useState } from "react";
import { BookingsFormStep1 } from "./BookingsFormStep1";
import { BookingsFormStep2 } from "./BookingsFormStep2";
import { BookingsFormStep3 } from "./BookingsFormStep3";
import { BookingsFormStep4 } from "./BookingsFormStep4";
import { BookingsFormStep5 } from "./BookingsFormStep5";
import { useBookingStep1 } from "@/hooks/bookingsForm/useBookingStep1";

// Type voor Step 2 data
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

// Type voor Step 3 data
type Step3Data = {
  extraOptions: string[];
  specialRequests: string;
  flightNumber?: string;
  meetingPoint?: string;
  contactPhone?: string;
};

// Type voor contactgegevens
type ContactInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  specialRequests?: string;
};

export default function BookingsForm() {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [step2Data, setStep2Data] = useState<Step2Data | null>(null);
  const [step3Data, setStep3Data] = useState<Step3Data | null>(null);
  const [step4Data, setStep4Data] = useState<ContactInfo | null>(null);
  const booking = useBookingStep1();

  // Extra opties mapping voor prijsberekening
  const extraOptionsMap: Record<string, { name: string; price: number }> = {
    child_seat: { name: "Kinderzitje", price: 15 },
    meet_greet: { name: "Meet & Greet Service", price: 25 },
    refreshments: { name: "Verfrissingen", price: 12 },
    wifi: { name: "Premium WiFi", price: 8 },
    newspapers: { name: "Dagbladen", price: 5 },
    flight_tracking: { name: "Vlucht Monitoring", price: 10 },
  };

  const handleStep2Next = (data: Step2Data) => {
    setStep2Data(data);
    setStep(3);
  };

  const handleStep3Next = (data: Step3Data) => {
    setStep3Data(data);
    setStep(4);
  };

  const handleStep4Submit = (contactInfo: ContactInfo) => {
    setStep4Data(contactInfo);
    setStep(5);
  };

  // ⬇️ Opslaan in MongoDB + daarna door naar betaling
  const handlePayment = async () => {
    if (!step2Data || !step3Data || !step4Data) return;

    try {
      // kosten berekenen
      const extraOptionsCost = step3Data.extraOptions.reduce((total, optionId) => {
        return total + (extraOptionsMap[optionId]?.price || 0);
      }, 0);
      const grandTotal = step2Data.totalPrice + extraOptionsCost;

      // payload voor de API
      const payload = {
        step1: booking.formData,
        step2: step2Data,
        step3: step3Data,
        step4: step4Data,
        computed: { extraOptionsCost, grandTotal },
      };

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Opslaan mislukt");
      }

      // handig voor bevestigingspagina
      localStorage.setItem("bookingId", data.id);

      // hier je echte betaalflow/redirect
      alert(`Doorsturen naar betaling van €${grandTotal.toFixed(2)}. Booking ID: ${data.id}`);
    } catch (e: any) {
      console.error("handlePayment error:", e);
      alert(e.message ?? "Er ging iets mis bij het opslaan.");
    }
  };

  const handleEdit = (stepNumber: number) => {
    setStep(stepNumber as 1 | 2 | 3 | 4 | 5);
  };

  return (
    <>
      {step === 1 && (
        <BookingsFormStep1 {...booking} onNext={() => setStep(2)} />
      )}

      {step === 2 && (
        <BookingsFormStep2
          step1={booking.formData}
          onPrev={() => setStep(1)}
          onNext={handleStep2Next}
        />
      )}

      {step === 3 && step2Data && (
        <BookingsFormStep3
          step1={booking.formData}
          step2={step2Data}
          onPrev={() => setStep(2)}
          onNext={handleStep3Next}
        />
      )}

      {step === 4 && step2Data && step3Data && (
        <BookingsFormStep4
          step1={booking.formData}
          step2={step2Data}
          step3={step3Data}
          onPrev={() => setStep(3)}
          onSubmit={handleStep4Submit}
        />
      )}

      {step === 5 && step2Data && step3Data && step4Data && (
        <BookingsFormStep5
          step1={booking.formData}
          step2={step2Data}
          step3={step3Data}
          step4={step4Data}
          onPrev={() => setStep(4)}
          onPayment={handlePayment} // ⬅️ parent doet de POST
          onEdit={handleEdit}
        />
      )}
    </>
  );
}
