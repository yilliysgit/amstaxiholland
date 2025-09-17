"use client";

import React, { useState } from "react";
import BookingStep1 from "./BookingsFormStep1";

// ✅ types & defaults uit het TS-bestand (geen .type in het pad)
import { defaultStep1, toggleRetour } from "@/types/forms/bookingsForm/bookingsFormStep1.type";
import type {
  BookingStep1FormData,
  BookingStep1Props,
} from "@/types/forms/bookingsForm/bookingsFormStep1.type";

const BookingsForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  // ✅ juiste state type + nette defaults
  const [formData, setFormData] = useState<BookingStep1FormData>(defaultStep1);

  // ✅ typeveilige updater
  const updateFormData: BookingStep1Props["updateFormData"] = (field, value) => {
    setFormData(prev => {
      if (field === "isRetour") {
        // Gebruik de helper om returnDate/returnTime correct toe te voegen/verwijderen
        return toggleRetour(prev, value as boolean);
      }
      // generieke update voor overige velden
      return { ...prev, [field]: value } as BookingStep1FormData;
    });
  };

  const nextStep = () => setCurrentStep(s => s + 1);
  const prevStep = () => setCurrentStep(s => Math.max(1, s - 1));

  return (
    <div>
      <h1>Taxi Booking - Stap {currentStep}</h1>

      {currentStep === 1 && (
        <BookingStep1
          formData={formData}
          updateFormData={updateFormData}
          onNext={nextStep}
          onPrev={prevStep}
        />
      )}
    </div>
  );
};

export default BookingsForm;
