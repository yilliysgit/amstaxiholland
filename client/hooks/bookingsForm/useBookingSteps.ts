// src/hooks/bookingsForm/useBookingSteps.ts

import { useCallback, useState } from "react";
import type { BookingStep2FormData } from "@/types/forms/bookingsForm/step2.type";
import type { BookingStep3FormData } from "@/types/forms/bookingsForm/step3.type";
import type { BookingStep4FormData } from "@/types/forms/bookingsForm/step4.type";

/**
 * State + helpers voor Stap 2, 3 en 4.
 */
export function useBookingSteps() {
  const [step2Data, setStep2Data] = useState<BookingStep2FormData | null>(null);
  const [step3Data, setStep3Data] = useState<BookingStep3FormData | null>(null);
  const [step4Data, setStep4Data] = useState<BookingStep4FormData | null>(null);

  /** Reset alle stappen naar null. */
  const reset = useCallback(() => {
    setStep2Data(null);
    setStep3Data(null);
    setStep4Data(null);
  }, []);

  return {
    step2Data,
    setStep2Data,
    step3Data,
    setStep3Data,
    step4Data,
    setStep4Data,
    reset,
  };
}

/** Handig om props te typen (niet de hook hier nogmaals aanroepen). */
export type BookingStepsApi = ReturnType<typeof useBookingSteps>;