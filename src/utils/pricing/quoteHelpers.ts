// src/utils/pricing/quoteHelpers.ts

import type { BookingStep1FormData } from "@/types/forms/bookingsForm/BookingsFormStep1.type";
import type { QuoteInput } from "@/types/forms/bookingsForm/pricing/quote.types";
import { isRetourTrip } from "@/types/forms/bookingsForm/utils/typeGuards";

export const formDataToQuoteInput = (
  formData: BookingStep1FormData
): QuoteInput => ({
  from: formData.from,
  to: formData.to,
  stops: formData.stops,
  isRetour: formData.isRetour,
  passengers: formData.passengers,
  hasLuggage: formData.hasLuggage,
  outwardAt: formData.date && formData.time 
    ? `${formData.date}T${formData.time}:00` 
    : undefined,
  returnAt: isRetourTrip(formData) && formData.returnDate && formData.returnTime
    ? `${formData.returnDate}T${formData.returnTime}:00`
    : undefined
});