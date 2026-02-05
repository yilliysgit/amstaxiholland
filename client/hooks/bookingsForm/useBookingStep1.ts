// src/hooks/bookingsForm/useBookingStep1.ts

import { useCallback, useState } from "react";
import type {
  AddressFields,
  BookingStep1FormData,
  Step1Common,
  Step1OneWay,
  Step1ReturnSame,
  Step1ReturnDifferent,
} from "@/types/forms/bookingsForm/step1.type";
import {
  defaultStep1,
  emptyAddress,
} from "@/types/forms/bookingsForm/step1.type";

/**
 * State + helpers voor Stap 1 (one-way / retour, varianten-veilig).
 */
export function useBookingStep1() {
  const [formData, setFormData] = useState<BookingStep1FormData>(defaultStep1);

  /** Update alleen velden die in alle varianten bestaan (common). */
  const updateFormData = useCallback(
    <K extends keyof Step1Common>(field: K, value: Step1Common[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value } as BookingStep1FormData));
    },
    []
  );

  /** Reset alles naar defaults. */
  const reset = useCallback(() => setFormData(defaultStep1), []);

  // ---------------- Variant helpers ----------------

  const baseOf = (p: BookingStep1FormData) => ({
    fromAddress: p.fromAddress,
    toAddress: p.toAddress,
    stops: p.stops,
    date: p.date,
    time: p.time,
    passengers: p.passengers,
    hasLuggage: p.hasLuggage,
  });

  /** Maak het een enkele rit. */
  const disableReturn = useCallback(() => {
    setFormData((prev) => {
      const base = baseOf(prev);
      const next: Step1OneWay = { ...base, isRetour: false };
      return next;
    });
  }, []);

  /** Retour met zelfde vertrek (same). */
  const enableReturnSame = useCallback(() => {
    setFormData((prev) => {
      const base = baseOf(prev);
      const next: Step1ReturnSame = {
        ...base,
        isRetour: true,
        retourType: "same",
        returnDate: null,
        returnTime: null,
      };
      return next;
    });
  }, []);

  /** Retour met ander vertrek (different). */
  const enableReturnDifferent = useCallback(() => {
    setFormData((prev) => {
      const base = baseOf(prev);
      const next: Step1ReturnDifferent = {
        ...base,
        isRetour: true,
        retourType: "different",
        returnDate: null,
        returnTime: null,
        retourFromAddress:
          prev.isRetour &&
          prev.retourType === "different" &&
          prev.retourFromAddress
            ? { ...prev.retourFromAddress }
            : ({ ...emptyAddress } as AddressFields),
      };
      return next;
    });
  }, []);

  /** Zet het retourtype (roept de juiste helper aan). */
  const setRetourType = useCallback(
    (t: "same" | "different") =>
      t === "same" ? enableReturnSame() : enableReturnDifferent(),
    [enableReturnSame, enableReturnDifferent]
  );

  /** Alleen geldig bij retour/different. */
  const setRetourFromAddress = useCallback((addr: AddressFields) => {
    setFormData((prev) =>
      prev.isRetour && prev.retourType === "different"
        ? ({ ...prev, retourFromAddress: addr } as Step1ReturnDifferent)
        : prev
    );
  }, []);

  /** Geldig bij beide retour-varianten. */
  const setReturnDate = useCallback((d: Step1ReturnSame["returnDate"]) => {
    setFormData((prev) =>
      prev.isRetour
        ? ({ ...prev, returnDate: d } as Exclude<BookingStep1FormData, Step1OneWay>)
        : prev
    );
  }, []);

  /** Geldig bij beide retour-varianten. */
  const setReturnTime = useCallback((t: Step1ReturnSame["returnTime"]) => {
    setFormData((prev) =>
      prev.isRetour
        ? ({ ...prev, returnTime: t } as Exclude<BookingStep1FormData, Step1OneWay>)
        : prev
    );
  }, []);

  // --------------------------------------------------

  return {
    formData,
    updateFormData,
    reset,
    disableReturn,
    enableReturnSame,
    enableReturnDifferent,
    setRetourType,
    setRetourFromAddress,
    setReturnDate,
    setReturnTime,
  };
}

/** Handig om props te typen in Step1 (niet de hook hier nogmaals aanroepen). */
export type Step1Api = ReturnType<typeof useBookingStep1>;