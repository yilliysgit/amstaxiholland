import { BookingStep1FormData, Step1OneWay, Step1Return } from "../BookingsFormStep1.type";

/* -------------------- Type Guards -------------------- */

export function isOneWayTrip(data: BookingStep1FormData): data is Step1OneWay {
  return data.isRetour === false;
}

export function isRetourTrip(data: BookingStep1FormData): data is Step1Return {
  return data.isRetour === true;
}