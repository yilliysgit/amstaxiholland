// client/types/forms/bookingsForm/step4.type.ts

/* -------------------- Extra Option -------------------- */

export interface ExtraOptionType {
  id: string;
  name: string;
  description: string;
  price: number;
}

/* -------------------- Step4 Form Data -------------------- */

export interface BookingStep4FormData {
  extraOptions: string[];
  specialRequests: string;
  flightNumber?: string;
  meetingPoint?: string;
  contactPhone?: string;
}

/* -------------------- Errors -------------------- */

export type Step4ErrorKeys =
  | "extraOptions"
  | "flightNumber"
  | "contactPhone";

export type Step4Errors = Partial<Record<Step4ErrorKeys, string>>;

/* -------------------- Constants -------------------- */

export const defaultStep4: BookingStep4FormData = {
  extraOptions: [],
  specialRequests: "",
  flightNumber: undefined,
  meetingPoint: undefined,
  contactPhone: undefined,
};