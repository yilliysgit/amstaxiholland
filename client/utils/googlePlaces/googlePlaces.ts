// client/utils/googlePlaces/googlePlaces.ts

import type { AddressFields } from "../../types/forms/bookingsForm/step1.type";

type AddressUpdateCallback = (updatedAddress: Partial<AddressFields>) => void;

/**
 * Splits huisnummer + toevoeging
 * "123"    → { number: "123", addition: "" }
 * "123A"   → { number: "123", addition: "A" }
 * "123-bis" → { number: "123", addition: "bis" }
 */
const splitHouseNumber = (raw: string): { number: string; addition: string } => {
  if (!raw) return { number: "", addition: "" };

  // Match: cijfers, dan optioneel streepje/spatie, dan letters/tekens
  const match = raw.match(/^(\d+)[\s-]?(.*)$/);
  if (match) {
    return {
      number: match[1],
      addition: match[2].trim().toUpperCase(),
    };
  }

  // Fallback: als geen cijfers, alles is het nummer
  return { number: raw, addition: "" };
};

/**
 * Hecht een Google Places Autocomplete aan een input-element.
 * SSR-safe: doet niets op de server en wacht tot Google geladen is.
 */
export const attachGooglePlaces = (
  inputElement: HTMLInputElement,
  onAddressUpdate: AddressUpdateCallback
): (() => void) => {
  // SSR-guard
  if (typeof window === "undefined") {
    return () => {};
  }

  // Als Google Places nog niet klaar is, wacht en probeer opnieuw
  if (!(window as any).google?.maps?.places?.Autocomplete) {
    console.warn("[attachGooglePlaces] Google Places not yet available — will retry.");

    const interval = setInterval(() => {
      if ((window as any).google?.maps?.places?.Autocomplete) {
        clearInterval(interval);
        attachGooglePlaces(inputElement, onAddressUpdate);
      }
    }, 250);

    return () => clearInterval(interval);
  }

  const autocomplete = new (window as any).google.maps.places.Autocomplete(inputElement, {
    types: ["address"],
    componentRestrictions: { country: "NL" },
    fields: ["formatted_address", "geometry", "address_components", "place_id"],
  });

  const handlePlaceChanged = () => {
    const place = autocomplete.getPlace();

    if (!place?.geometry?.location || !place.address_components) {
      console.warn("[attachGooglePlaces] Invalid place selected");
      return;
    }

    const getAddressComponent = (types: string[]): string =>
      place.address_components?.find((component: any) =>
        types.some((type) => component.types.includes(type))
      )?.long_name || "";

    // Straatnaam + huisnummer ophalen
    const route = getAddressComponent(["route"]);
    const streetNumber = getAddressComponent(["street_number"]);

    let streetName = route;
    let rawHouseNumber = streetNumber;

    // Fallback: als Google geen route/street_number heeft, parse formatted_address
    if (!route && !streetNumber) {
      const firstPart = place.formatted_address?.split(",")[0] || inputElement.value;
      const match = firstPart.match(/^(.+?)\s+(\d+.*)$/);
      if (match) {
        streetName = match[1].trim();
        rawHouseNumber = match[2].trim();
      } else {
        streetName = firstPart;
        rawHouseNumber = "";
      }
    }

    // Split huisnummer + toevoeging
    const { number, addition } = splitHouseNumber(rawHouseNumber);

    const addressData: Partial<AddressFields> = {
      address: streetName || "",
      houseNumber: number,
      addition: addition || undefined, // undefined als leeg, zodat het niet "A" → "" overschrijft
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      placeId: place.place_id,
      postalCode: getAddressComponent(["postal_code"]),
      city: getAddressComponent(["locality", "administrative_area_level_2"]),
      country: getAddressComponent(["country"]),
    };

    console.log("📍 Google Places selected:", addressData);
    onAddressUpdate(addressData);
  };

  autocomplete.addListener("place_changed", handlePlaceChanged);

  // Cleanup
  return () => {
    (window as any).google?.maps?.event?.clearInstanceListeners(autocomplete);
  };
};