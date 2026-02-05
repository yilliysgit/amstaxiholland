// client/types/forms/bookingsForm/step3.type.ts

/* -------------------- Extra Option -------------------- */

// Zonder icon — die hoort bij de data/constants
export interface ExtraOptionType {
  id: string;
  name: string;
  description: string;
  price: number;
}

/* -------------------- Step3 Form Data -------------------- */

export interface BookingStep3FormData {
  extraOptions: string[];        // ["child_seat", "wifi"]
  specialRequests: string;
  flightNumber?: string;         // "KL1234"
  meetingPoint?: string;         // "Arrivals hal, uitgang 3"
  contactPhone?: string;         // "06 12345678"
}

/* -------------------- Errors -------------------- */

export type Step3ErrorKeys =
  | "extraOptions"
  | "flightNumber"
  | "contactPhone";

export type Step3Errors = Partial<Record<Step3ErrorKeys, string>>;

/* -------------------- Constants -------------------- */

export const defaultStep3: BookingStep3FormData = {
  extraOptions: [],
  specialRequests: "",
  flightNumber: undefined,
  meetingPoint: undefined,
  contactPhone: undefined,
};