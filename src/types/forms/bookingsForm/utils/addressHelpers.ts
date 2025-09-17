//types/forms/bookingsForm/utils/addressHelpers.ts

import {
 BookingStep1FormData,
 AddressFields,
 emptyAddress,
 inBounds,
 normalize,
 Step1Common,
 AddressTarget  
} from "../BookingsFormStep1.type";

/* -------------------- Helpers: route & stops -------------------- */

export const reverseRoute = (data: BookingStep1FormData): BookingStep1FormData => ({
 ...data, 
 from: { ...data.to }, 
 to: { ...data.from }
});

export const addEmptyStop = (data: BookingStep1FormData): BookingStep1FormData => ({
 ...data, 
 stops: [...data.stops, { ...emptyAddress }]
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

export const toggleRetour = (data: BookingStep1FormData, isRetour: boolean): BookingStep1FormData => {
 if (isRetour && !data.isRetour) {
   return { ...data, isRetour: true, returnDate: null, returnTime: null };
 }
 
 if (!isRetour && data.isRetour) {
   const { returnDate, returnTime, ...rest } = data;
   return { ...(rest as Step1Common), isRetour: false };
 }
 
 return data;
};

/* -------------------- Helpers: address fields -------------------- */

export const updateAddressField = <T extends keyof AddressFields>(
 data: BookingStep1FormData,
 addressType: "from" | "to",
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

 if (target.kind === "stop") {
   const { index } = target;
   if (!inBounds(index, data.stops.length)) return data;
   
   return {
     ...data,
     stops: data.stops.map((stop, i) => 
       i === index ? { ...stop, [field]: nextValue } : stop
     ),
   };
 }

 return {
   ...data,
   [target.kind]: {
     ...data[target.kind],
     [field]: nextValue,
   },
 } as BookingStep1FormData;
};