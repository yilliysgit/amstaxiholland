// src/types/forms/bookingsForm/BookingsFormStep2.type.ts

export interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface BookingStep2FormData {
  contact: ContactInfo;
  specialRequests: string;
  newsletter: boolean;
  terms: boolean;
}

export type Step2ErrorKeys =
  | "contact.firstName" | "contact.lastName" 
  | "contact.email" | "contact.phone"
  | "specialRequests" | "terms";

export type Step2Errors = Partial<Record<Step2ErrorKeys, string>>;

export interface BookingStep2Props {
  step1Data: import("./bookingsFormStep1.type").BookingStep1FormData; // Data van stap 1
  formData: BookingStep2FormData;
  updateFormData: <K extends keyof BookingStep2FormData>(
    field: K,
    value: BookingStep2FormData[K]
  ) => void;
  onNext: () => void;
  onPrev: () => void;
  errors?: Step2Errors;
  isLoading?: boolean;
}

export const defaultStep2: BookingStep2FormData = {
  contact: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  },
  specialRequests: "",
  newsletter: false,
  terms: false,
};