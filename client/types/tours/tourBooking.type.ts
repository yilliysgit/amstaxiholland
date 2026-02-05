// src/types/tours/tourBooking.type.ts
import type { ISODate, Time24 } from '@/types/dateTime/DateTime.type';


// Stap 1: Tour details
export interface TourBookingStep1 {
  pickup: string;
  houseNumber: string;
  date: ISODate | '';  // <- Was string, nu ISODate | ''
  time: Time24 | '';   // <- Was string, nu Time24 | ''
  passengers: number;
  // Google Places extra data
  lat?: number;
  lng?: number;
  placeId?: string;
  postalCode?: string;
  city?: string;
}

// Stap 2: Persoonlijke gegevens
export interface TourBookingStep2 {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes?: string;
}

// Errors per stap
export interface TourBookingStep1Errors {
  pickup?: string;
  houseNumber?: string;
  date?: string;
  time?: string;
  passengers?: string;
}

export interface TourBookingStep2Errors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}