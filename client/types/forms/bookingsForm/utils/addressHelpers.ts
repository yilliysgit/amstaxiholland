// client/types/forms/bookingsForm/utils/addressHelpers.ts

import {
  BookingStep1FormData,
  AddressFields,
  emptyAddress,
  inBounds,
  normalize,
  Step1OneWay,
  Step1ReturnSame,
  Step1ReturnDifferent,
  AddressTarget,
} from "../step1.type";

/* -------------------- Helpers: route & stops -------------------- */

export const reverseRoute = (data: BookingStep1FormData): BookingStep1FormData => ({
  ...data,
  fromAddress: { ...data.toAddress },
  toAddress: { ...data.fromAddress },
});

export const addEmptyStop = (data: BookingStep1FormData): BookingStep1FormData => ({
  ...data,
  stops: [...data.stops, { ...emptyAddress }],
});

export const removeStop = (data: BookingStep1FormData, index: number): BookingStep1FormData => {
  if (!inBounds(index, data.stops.length)) return data;
  return { ...data, stops: data.stops.filter((_, i) => i !== index) };
};

export const updateStop = (
  data: BookingStep1FormData,
  index: number,
  stopData: Partial<AddressFields>
): BookingStep1FormData => {
  if (!inBounds(index, data.stops.length)) return data;

  return {
    ...data,
    stops: data.stops.map((stop, i) =>
      i === index
        ? {
            ...stop,
            ...Object.fromEntries(
              Object.entries(stopData).map(([key, value]) => [
                key,
                typeof value === "string" ? normalize(value) : value,
              ])
            ),
          }
        : stop
    ),
  };
};

/* -------------------- Helpers: retour toggle -------------------- */

export const toggleRetour = (
  data: BookingStep1FormData,
  isRetour: boolean
): BookingStep1FormData => {
  // Inschakelen → standaard naar "same"
  if (isRetour && !data.isRetour) {
    const next: Step1ReturnSame = {
      ...data,
      isRetour: true,
      retourType: "same",
      returnDate: null,
      returnTime: null,
    };
    return next;
  }

  // Uitschakelen → terug naar one-way
  if (!isRetour && data.isRetour) {
    const next: Step1OneWay = {
      fromAddress: data.fromAddress,
      toAddress: data.toAddress,
      stops: data.stops,
      date: data.date,
      time: data.time,
      passengers: data.passengers,
      hasLuggage: data.hasLuggage,
      isRetour: false,
    };
    return next;
  }

  return data;
};

/* -------------------- Helpers: address fields -------------------- */

export const updateAddressField = <T extends keyof AddressFields>(
  data: BookingStep1FormData,
  addressType: "fromAddress" | "toAddress",
  field: T,
  value: AddressFields[T]
): BookingStep1FormData => {
  const nextValue = typeof value === "string" ? normalize(value) : value;
  return {
    ...data,
    [addressType]: {
      ...data[addressType],
      [field]: nextValue,
    },
  } as BookingStep1FormData;
};

export const updateAnyAddressField = <T extends keyof AddressFields>(
  data: BookingStep1FormData,
  target: AddressTarget,
  field: T,
  value: AddressFields[T]
): BookingStep1FormData => {
  const nextValue = typeof value === "string" ? normalize(value) : value;

  // Stop → index in de array
  if (target.kind === "stop") {
    if (!inBounds(target.index, data.stops.length)) return data;

    return {
      ...data,
      stops: data.stops.map((stop, i) =>
        i === target.index ? { ...stop, [field]: nextValue } : stop
      ),
    };
  }

  // fromAddress of toAddress → altijd beschikbaar
  if (target.kind === "fromAddress" || target.kind === "toAddress") {
    return {
      ...data,
      [target.kind]: {
        ...data[target.kind],
        [field]: nextValue,
      },
    };
  }

  // retourFromAddress → alleen bij "different"
  if (target.kind === "retourFromAddress" && data.isRetour && data.retourType === "different") {
    return {
      ...data,
      retourFromAddress: {
        ...(data as Step1ReturnDifferent).retourFromAddress,
        [field]: nextValue,
      },
    } as Step1ReturnDifferent;
  }

  return data;
};