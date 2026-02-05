import { useEffect, useRef } from 'react';
import { attachGooglePlaces } from '@/utils/googlePlaces/googlePlaces';
import type { TourBookingStep1 } from '@/types/tours/tourBooking.type';

export const useGooglePlacesTourForm = (
  formData: TourBookingStep1,
  onChange: (data: TourBookingStep1) => void
) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) return;

const cleanup = attachGooglePlaces(inputRef.current, (addressData) => {
  onChange({
    ...formData,
    pickup: addressData.address || formData.pickup,
    houseNumber: addressData.houseNumber || formData.houseNumber || '',
    lat: addressData.lat ?? undefined,        // <- Converteer null naar undefined
    lng: addressData.lng ?? undefined,        // <- Converteer null naar undefined
    placeId: addressData.placeId ?? undefined,
    postalCode: addressData.postalCode ?? undefined,
    city: addressData.city ?? undefined
  });
});


    return cleanup;
  }, []);

  return inputRef;
};