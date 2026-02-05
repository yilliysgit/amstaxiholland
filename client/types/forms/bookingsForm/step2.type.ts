// client/types/forms/bookingsForm/step2.type.ts

/* -------------------- Baggage -------------------- */

export type BaggageType = "none" | "handluggage" | "suitcases";

/* -------------------- Vehicle -------------------- */

// Zonder icon — die hoort bij de data/constants
export interface VehicleType {
  id: string;
  name: string;
  description: string;
  capacity: number;
  luggage: string;
  image: string;
  basePrice: number;
  pricePerKm: number;
  features: string[];
}

/* -------------------- Step2 Form Data -------------------- */

export interface BookingStep2FormData {
  selectedVehicle: string;
  finalPassengerCount: number;
  baggageType: BaggageType;
  totalPrice: number;
  vehicleData?: VehicleType;
}

/* -------------------- Errors -------------------- */

export type Step2ErrorKeys = "selectedVehicle";

export type Step2Errors = Partial<Record<Step2ErrorKeys, string>>;

/* -------------------- Constants -------------------- */

export const defaultStep2: BookingStep2FormData = {
  selectedVehicle: "",
  finalPassengerCount: 1,
  baggageType: "none",
  totalPrice: 0,
  vehicleData: undefined,
};