// client/utils/pricing/quoteHelpers.ts

import type { BookingStep1FormData, AddressFields } from "../../types/forms/bookingsForm/step1.type";
import type { QuoteInput, Place } from "../../types/forms/bookingsForm/pricing/bookingQuote.type";

/** AddressFields → Place (addition optioneel → verplicht) */
const toPlace = (a: AddressFields): Place => ({
  address: a.address,
  houseNumber: a.houseNumber,
  addition: a.addition ?? "",
  lat: a.lat ?? undefined,
  lng: a.lng ?? undefined,
});

export const formDataToQuoteInput = (
  formData: BookingStep1FormData
): QuoteInput => ({
  from: toPlace(formData.fromAddress),
  to: toPlace(formData.toAddress),
  stops: formData.stops.map(toPlace),
  isRetour: formData.isRetour,
  passengers: formData.passengers,
  hasLuggage: formData.hasLuggage,
  outwardAt: formData.date && formData.time
    ? `${formData.date}T${formData.time}:00`
    : undefined,
  returnAt: formData.isRetour && formData.returnDate && formData.returnTime
    ? `${formData.returnDate}T${formData.returnTime}:00`
    : undefined,
});