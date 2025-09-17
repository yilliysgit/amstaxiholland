// src/components/bookingsForm/BookingsFormStep1.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Luggage,
  ArrowRight,
  Check,
  Plus,
  X,
  RefreshCcw,
} from "lucide-react";

// Validators
import {
  validateAddress,
  validateStep1Form,
  isAddressComplete,
  sameAddress,
} from "@/validators/bookingsForm/BookingsFormStep1.valid";

// Types
import type { AddressFields } from "@/types/forms/bookingsForm/bookingsFormStep1.type";
// type van de hook-return (NIET de hook hier aanroepen)
import type { Step1Api } from "@/hooks/bookingsForm/useBookingData";

// Pickers
import DatePicker from "@/datePicker/DatePicker";
import TimePicker from "@/datePicker/TimePicker";

/* -------------------- Field error state types -------------------- */
type AddressFieldErrors = Partial<Record<keyof AddressFields, string>>;
type FieldErrorsState = {
  from?: AddressFieldErrors;
  to?: AddressFieldErrors;
  retourFrom?: AddressFieldErrors;
  stops?: AddressFieldErrors[];
  date?: string;
  time?: string;
  returnDate?: string;
  returnTime?: string;
  luggage?: string;
};

type Props = Step1Api & { onNext: () => void };

export const BookingsFormStep1: React.FC<Props> = ({
  formData,
  updateFormData,
  disableReturn,
  enableReturnSame,
  enableReturnDifferent,
  setRetourType,
  setRetourFromAddress,
  setReturnDate,
  setReturnTime,
  onNext,
}) => {
  const [fieldErrors, setFieldErrors] = useState<FieldErrorsState>({});
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  /* -------------------- Validation helpers -------------------- */
  const markFromErrors = () => {
    const r = validateAddress(formData.fromAddress, "Vertrek");
    setFieldErrors((prev) => ({ ...prev, from: r.fieldErrors }));
    return r;
  };
  const markToErrors = () => {
    const r = validateAddress(formData.toAddress, "Bestemming");
    setFieldErrors((prev) => ({ ...prev, to: r.fieldErrors }));
    return r;
  };
  const markRetourFromErrors = () => {
    if (!(formData.isRetour && formData.retourType === "different")) return;
    const r = validateAddress(formData.retourFromAddress, "Retour vertrekadres");
    setFieldErrors((prev) => ({ ...prev, retourFrom: r.fieldErrors }));
  };
  const markStopErrors = (index: number) => {
    const stop = formData.stops[index];
    const r = validateAddress(stop, `Tussenstop ${index + 1}`);
    setFieldErrors((prev) => {
      const arr = [...(prev.stops ?? [])];
      arr[index] = r.fieldErrors;
      return { ...prev, stops: arr };
    });
  };
  const validateMeta = () => {
    setFieldErrors((prev) => ({
      ...prev,
      date: formData.date ? undefined : "Vertrekdatum is verplicht",
      time: formData.time ? undefined : "Vertrektijd is verplicht",
      returnDate: formData.isRetour
        ? formData.returnDate
          ? undefined
          : "Retourdatum is verplicht"
        : undefined,
      returnTime: formData.isRetour
        ? formData.returnTime
          ? undefined
          : "Retourtijd is verplicht"
        : undefined,
      luggage:
        formData.hasLuggage === null
          ? "Selecteer of u bagage heeft"
          : undefined,
    }));
  };


  /* -------------------- Cross-field: from & to niet gelijk -------------------- */
  useEffect(() => {
    const MSG = "Vertrek- en afleveradres mogen niet hetzelfde zijn";
    const bothComplete =
      isAddressComplete(formData.fromAddress) &&
      isAddressComplete(formData.toAddress);

    if (bothComplete && sameAddress(formData.fromAddress, formData.toAddress)) {
      setFieldErrors((prev) => ({
        ...prev,
        from: { ...(prev.from || {}), address: MSG },
        to: { ...(prev.to || {}), address: MSG },
      }));
    } else {
      // Haal alleen de cross-field melding weg, laat andere mogelijke from/to errors staan
      setFieldErrors((prev) => ({
        ...prev,
        from: {
          ...(prev.from || {}),
          address:
            prev.from?.address === MSG ? undefined : prev.from?.address,
        },
        to: {
          ...(prev.to || {}),
          address: prev.to?.address === MSG ? undefined : prev.to?.address,
        },
      }));
    }
  }, [formData.fromAddress, formData.toAddress]);


    const startOfDay = (d: Date) => { const x = new Date(d); x.setHours(0,0,0,0); return x; };

  /* -------------------- Cross-field: retour > heen -------------------- */
  useEffect(() => {
    const MSG = "Retourdatum/-tijd moet na de heenreis liggen";
    const clearIfCross = (v?: string) => (v === MSG ? undefined : v);

    // Niet in retour-modus? cross-field melding weghalen
    if (!formData.isRetour) {
      setFieldErrors((prev) => ({
        ...prev,
        returnDate: clearIfCross(prev.returnDate),
        returnTime: clearIfCross(prev.returnTime),
      }));
      return;
    }

    const { date, time } = formData;
    const retDate = formData.isRetour ? formData.returnDate : null;
    const retTime = formData.isRetour ? formData.returnTime : null;

    if (date && time && retDate && retTime) {
      const out = new Date(`${date}T${time}:00`);
      const ret = new Date(`${retDate}T${retTime}:00`);
      const bad =
        Number.isFinite(out.getTime()) &&
        Number.isFinite(ret.getTime()) &&
        ret <= out;

      setFieldErrors((prev) => ({
        ...prev,
        returnDate: bad ? MSG : clearIfCross(prev.returnDate),
        returnTime: bad ? MSG : clearIfCross(prev.returnTime),
      }));
    } else {
      setFieldErrors((prev) => ({
        ...prev,
        returnDate: clearIfCross(prev.returnDate),
        returnTime: clearIfCross(prev.returnTime),
      }));
    }
  }, [
    formData.isRetour,
    formData.date,
    formData.time,
    // conditionele deps: zo accepteert TS het bij union type
    formData.isRetour ? formData.returnDate : null,
    formData.isRetour ? formData.returnTime : null,
  ]);

  // Zelfde dag: als retourtijd eerder is dan heentijd → resetten
  useEffect(() => {
    if (!formData.isRetour) return;

    const retDate = formData.isRetour ? formData.returnDate : null;
    const retTime = formData.isRetour ? formData.returnTime : null;

    if (
      !formData.date ||
      !retDate ||
      retDate !== formData.date ||
      !formData.time ||
      !retTime
    ) {
      return;
    }

    const toMin = (t: string) => {
      const [h, m] = t.split(":").map(Number);
      return h * 60 + m;
    };

    if (toMin(retTime) < toMin(formData.time)) {
      setReturnTime(""); // of setReturnTime(formData.time)
    }
  }, [
    formData.isRetour,
    formData.date,
    formData.time,
    formData.isRetour ? formData.returnDate : null,
    formData.isRetour ? formData.returnTime : null,
    setReturnTime,
  ]);

  /* -------------------- Clear helpers -------------------- */
  const clearFieldError = (
    scope: "from" | "to" | "retourFrom",
    key: keyof AddressFields
  ) => {
    setFieldErrors((prev) => ({
      ...prev,
      [scope]: { ...(prev[scope] || {}), [key]: undefined },
    }));
  };
  const clearStopFieldError = (index: number, key: keyof AddressFields) => {
    setFieldErrors((prev) => {
      const arr = [
        ...(prev.stops ?? formData.stops.map(() => ({} as AddressFieldErrors))),
      ];
      arr[index] = { ...(arr[index] || {}), [key]: undefined };
      return { ...prev, stops: arr };
    });
  };

  /* -------------------- Handlers -------------------- */
  const handleFromFieldChange = (field: keyof AddressFields, value: string) => {
    updateFormData("fromAddress", {
      ...formData.fromAddress,
      [field]: value,
    });
    if (fieldErrors.from?.[field]) clearFieldError("from", field);
  };
  const handleToFieldChange = (field: keyof AddressFields, value: string) => {
    updateFormData("toAddress", { ...formData.toAddress, [field]: value });
    if (fieldErrors.to?.[field]) clearFieldError("to", field);
  };

  const handleAddStop = () => {
    const newStop: AddressFields = {
      address: "",
      houseNumber: "",
      addition: "",
    };
    updateFormData("stops", [...formData.stops, newStop]);
    setFieldErrors((prev) => ({ ...prev, stops: [...(prev.stops ?? []), {}] }));
  };
  const handleRemoveStop = (index: number) => {
    updateFormData(
      "stops",
      formData.stops.filter((_, i) => i !== index)
    );
    setFieldErrors((prev) => ({
      ...prev,
      stops: (prev.stops ?? []).filter((_, i) => i !== index),
    }));
  };
  const handleStopChange = (
    index: number,
    field: keyof AddressFields,
    value: string
  ) => {
    updateFormData(
      "stops",
      formData.stops.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    );
    if (fieldErrors.stops?.[index]?.[field])
      clearStopFieldError(index, field);
  };

  const handleRetourToggle = (checked: boolean) => {
    if (checked) {
      enableReturnSame();
    } else {
      disableReturn();
      setFieldErrors((prev) => ({
        ...prev,
        retourFrom: undefined,
        returnDate: undefined,
        returnTime: undefined,
      }));
    }
  };
  const handleRetourTypeChange = (value: "same" | "different") => {
    setRetourType(value);
    if (value === "same")
      setFieldErrors((prev) => ({ ...prev, retourFrom: undefined }));
  };

  const handleRetourFromFieldChange = (
    field: keyof AddressFields,
    value: string
  ) => {
    if (!(formData.isRetour && formData.retourType === "different")) return;
    setRetourFromAddress({ ...formData.retourFromAddress, [field]: value });
    if (fieldErrors.retourFrom?.[field]) clearFieldError("retourFrom", field);
  };

  const handleDateChange = (date: string) => {
    updateFormData("date", date as any);
    if (fieldErrors.date)
      setFieldErrors((prev) => ({ ...prev, date: undefined }));
  };
  const handleTimeChange = (time: string) => {
    updateFormData("time", time as any);
    if (fieldErrors.time)
      setFieldErrors((prev) => ({ ...prev, time: undefined }));
  };

  const handleRetourDateChange = (date: string) => {
    if (!formData.isRetour) return;
    setReturnDate(date as any);
    if (fieldErrors.returnDate)
      setFieldErrors((prev) => ({ ...prev, returnDate: undefined }));
  };
  const handleRetourTimeChange = (time: string) => {
    if (!formData.isRetour) return;
    setReturnTime(time as any);
    if (fieldErrors.returnTime)
      setFieldErrors((prev) => ({ ...prev, returnTime: undefined }));
  };

  const handlePassengersChange = (increment: number) => {
    const next = Math.max(1, Math.min(8, formData.passengers + increment));
    updateFormData("passengers", next);
  };
  const handleLuggageChange = (value: boolean) => {
    updateFormData("hasLuggage", value);
    if (fieldErrors.luggage)
      setFieldErrors((prev) => ({ ...prev, luggage: undefined }));
  };

  /* -------------------- UI helpers -------------------- */
  const inputClasses =
    "w-full px-3 py-2 glass-effect border border-gray-200/50 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all text-gray-800 placeholder-gray-400 text-sm";

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const maxDate = new Date(today);
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const steps = [
    { id: 1, title: "Reis Details", isActive: true, isCompleted: false },
    { id: 2, title: "Voertuig Keuze", isActive: false, isCompleted: false },
    { id: 3, title: "Bevestiging", isActive: false, isCompleted: false },
  ];

  // Disable CTA tot alles geldig is
  const isValid = useMemo(
    () => validateStep1Form(formData).length === 0,
    [formData]
  );


const minReturnDate = useMemo(() => {
  // vandaag 00:00
  const today0 = startOfDay(new Date());
  // als heenreisdatum is gekozen, gebruik die dag (>= vandaag)
  if (formData.date) {
    const out = startOfDay(new Date(formData.date));
    return out > today0 ? out : today0;
  }
  return today0;
}, [formData.date]);




  // zelfde-dag helper voor retour-minimumtijd
 const sameDay = useMemo(() => {
  if (!formData.isRetour) return false; // narrow naar retour-variant
  return Boolean(
    formData.date &&
    formData.returnDate &&
    formData.returnDate === formData.date
  );
}, [
  formData.isRetour,
  formData.date,
  formData.isRetour ? formData.returnDate : null,
]);

  return (
    <div className="min-h-screen bg-gradient-mercedes-premium py-6 px-3">
      <div className="max-w-4xl mx-auto">
        {/* Steps */}
        <div
          className={`mb-8 transform transition-all duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs transition-all ${
                      step.isCompleted
                        ? "bg-gray-800 text-white"
                        : step.isActive
                        ? "bg-gray-700 text-white"
                        : "glass-effect text-gray-500 border border-gray-200/50"
                    }`}
                  >
                    {step.isCompleted ? <Check className="w-4 h-4" /> : step.id}
                  </div>
                  <span
                    className={`mt-1 text-xs ${
                      step.isActive ? "text-gray-800" : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-px mx-3 ${
                      step.isCompleted ? "bg-gray-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Main Form */}
        <div
          className={`glass-effect rounded-2xl p-5 border border-gray-200/30 backdrop-blur-md shadow-md transform transition-all duration-300 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 glass-effect rounded-full mb-2 border border-gray-200/50">
              <MapPin className="w-6 h-6 text-gray-700" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              Reserveer Uw Premium Rit
            </h1>
            <p className="text-gray-600 text-sm">
              Luxe vervoer, op tijd en in stijl
            </p>
          </div>

          <div className="space-y-6">
            {/* Vertrekadres */}
            <div
              className={`space-y-3 ${
                isLoaded ? "opacity-100" : "opacity-0"
              } transition-opacity`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-gray-700 text-white text-xs flex items-center justify-center">
                  1
                </div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Vertrekadres
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-12 ml-8">
                <div className="sm:col-span-6">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Straat/Adres *
                  </label>
                  <input
                    value={formData.fromAddress.address}
                    onChange={(e) =>
                      handleFromFieldChange("address", e.target.value)
                    }
                    onBlur={markFromErrors}
                    aria-invalid={!!fieldErrors.from?.address}
                    aria-describedby="err-from-address"
                    placeholder="Bijv. Hoofdstraat"
                    className={`${inputClasses} ${
                      fieldErrors.from?.address
                        ? "border-red-400 focus:ring-red-400"
                        : ""
                    }`}
                  />
                  {fieldErrors.from?.address && (
                    <p
                      id="err-from-address"
                      className="mt-1 text-xs text-red-600"
                    >
                      {fieldErrors.from.address}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Huisnummer *
                  </label>
                  <input
                    value={formData.fromAddress.houseNumber}
                    onChange={(e) =>
                      handleFromFieldChange(
                        "houseNumber",
                        e.target.value.replace(/\D/g, "")
                      )
                    }
                    onBlur={markFromErrors}
                    inputMode="numeric"
                    aria-invalid={!!fieldErrors.from?.houseNumber}
                    aria-describedby="err-from-houseNumber"
                    placeholder="123"
                    className={`${inputClasses} ${
                      fieldErrors.from?.houseNumber
                        ? "border-red-400 focus:ring-red-400"
                        : ""
                    }`}
                  />
                  {fieldErrors.from?.houseNumber && (
                    <p
                      id="err-from-houseNumber"
                      className="mt-1 text-xs text-red-600"
                    >
                      {fieldErrors.from.houseNumber}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Toevoeging
                  </label>
                  <input
                    value={formData.fromAddress.addition || ""}
                    onChange={(e) =>
                      handleFromFieldChange("addition", e.target.value.toUpperCase())
                    }
                    onBlur={markFromErrors}
                    aria-invalid={!!fieldErrors.from?.addition}
                    aria-describedby="err-from-addition"
                    placeholder="A, B, etc."
                    className={`${inputClasses} ${
                      fieldErrors.from?.addition
                        ? "border-red-400 focus:ring-red-400"
                        : ""
                    }`}
                  />
                  {fieldErrors.from?.addition && (
                    <p
                      id="err-from-addition"
                      className="mt-1 text-xs text-red-600"
                    >
                      {fieldErrors.from.addition}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Tussenstops */}
            {formData.stops.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center">
                    <Plus className="w-3 h-3" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-800">
                    Tussenstops
                  </h3>
                </div>

                <div className="ml-8 space-y-3">
                  {formData.stops.map((stop, index) => (
                    <div
                      key={index}
                      className="glass-effect p-4 rounded-xl border border-gray-200/30"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium text-gray-800 text-sm">
                          Tussenstop {index + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveStop(index)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                          aria-label="Verwijder tussenstop"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-12">
                        <div className="sm:col-span-6">
                          <input
                            value={stop.address}
                            onChange={(e) =>
                              handleStopChange(index, "address", e.target.value)
                            }
                            onBlur={() => markStopErrors(index)}
                            aria-invalid={!!fieldErrors.stops?.[index]?.address}
                            aria-describedby={`err-stop-${index}-address`}
                            placeholder="Straat/adres"
                            className={`${inputClasses} ${
                              fieldErrors.stops?.[index]?.address
                                ? "border-red-400 focus:ring-red-400"
                                : ""
                            }`}
                          />
                          {fieldErrors.stops?.[index]?.address && (
                            <p
                              id={`err-stop-${index}-address`}
                              className="mt-1 text-xs text-red-600"
                            >
                              {fieldErrors.stops[index]!.address}
                            </p>
                          )}
                        </div>
                        <div className="sm:col-span-3">
                          <input
                            value={stop.houseNumber}
                            onChange={(e) =>
                              handleStopChange(
                                index,
                                "houseNumber",
                                e.target.value.replace(/\D/g, "")
                              )
                            }
                            onBlur={() => markStopErrors(index)}
                            inputMode="numeric"
                            aria-invalid={
                              !!fieldErrors.stops?.[index]?.houseNumber
                            }
                            aria-describedby={`err-stop-${index}-houseNumber`}
                            placeholder="Nr."
                            className={`${inputClasses} ${
                              fieldErrors.stops?.[index]?.houseNumber
                                ? "border-red-400 focus:ring-red-400"
                                : ""
                            }`}
                          />
                          {fieldErrors.stops?.[index]?.houseNumber && (
                            <p
                              id={`err-stop-${index}-houseNumber`}
                              className="mt-1 text-xs text-red-600"
                            >
                              {fieldErrors.stops[index]!.houseNumber}
                            </p>
                          )}
                        </div>
                        <div className="sm:col-span-3">
                          <input
                            value={stop.addition || ""}
                            onChange={(e) =>
                              handleStopChange(
                                index,
                                "addition",
                                e.target.value.toUpperCase()
                              )
                            }
                            onBlur={() => markStopErrors(index)}
                            aria-invalid={!!fieldErrors.stops?.[index]?.addition}
                            aria-describedby={`err-stop-${index}-addition`}
                            placeholder="Toev."
                            className={`${inputClasses} ${
                              fieldErrors.stops?.[index]?.addition
                                ? "border-red-400 focus:ring-red-400"
                                : ""
                            }`}
                          />
                          {fieldErrors.stops?.[index]?.addition && (
                            <p
                              id={`err-stop-${index}-addition`}
                              className="mt-1 text-xs text-red-600"
                            >
                              {fieldErrors.stops[index]!.addition}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tussenstop toevoegen */}
            <div className="ml-8">
              <button
                type="button"
                onClick={handleAddStop}
                className="flex items-center gap-1.5 text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors group"
              >
                <Plus className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                Tussenstop toevoegen
              </button>
            </div>

            {/* Afleveradres */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-gray-700 text-white text-xs flex items-center justify-center">
                  2
                </div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Afleveradres
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-12 ml-8">
                <div className="sm:col-span-6">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Straat/Adres *
                  </label>
                  <input
                    value={formData.toAddress.address}
                    onChange={(e) =>
                      handleToFieldChange("address", e.target.value)
                    }
                    onBlur={markToErrors}
                    aria-invalid={!!fieldErrors.to?.address}
                    aria-describedby="err-to-address"
                    placeholder="Bijv. Stationsplein"
                    className={`${inputClasses} ${
                      fieldErrors.to?.address
                        ? "border-red-400 focus:ring-red-400"
                        : ""
                    }`}
                  />
                  {fieldErrors.to?.address && (
                    <p id="err-to-address" className="mt-1 text-xs text-red-600">
                      {fieldErrors.to.address}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Huisnummer *
                  </label>
                  <input
                    value={formData.toAddress.houseNumber}
                    onChange={(e) =>
                      handleToFieldChange(
                        "houseNumber",
                        e.target.value.replace(/\D/g, "")
                      )
                    }
                    onBlur={markToErrors}
                    inputMode="numeric"
                    aria-invalid={!!fieldErrors.to?.houseNumber}
                    aria-describedby="err-to-houseNumber"
                    placeholder="15"
                    className={`${inputClasses} ${
                      fieldErrors.to?.houseNumber
                        ? "border-red-400 focus:ring-red-400"
                        : ""
                    }`}
                  />
                  {fieldErrors.to?.houseNumber && (
                    <p
                      id="err-to-houseNumber"
                      className="mt-1 text-xs text-red-600"
                    >
                      {fieldErrors.to.houseNumber}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Toevoeging
                  </label>
                  <input
                    value={formData.toAddress.addition || ""}
                    onChange={(e) =>
                      handleToFieldChange("addition", e.target.value.toUpperCase())
                    }
                    onBlur={markToErrors}
                    aria-invalid={!!fieldErrors.to?.addition}
                    aria-describedby="err-to-addition"
                    placeholder="B, C, etc."
                    className={`${inputClasses} ${
                      fieldErrors.to?.addition
                        ? "border-red-400 focus:ring-red-400"
                        : ""
                    }`}
                  />
                  {fieldErrors.to?.addition && (
                    <p
                      id="err-to-addition"
                      className="mt-1 text-xs text-red-600"
                    >
                      {fieldErrors.to.addition}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Datum en tijd (heen) */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Wanneer
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 ml-8">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Vertrekdatum *
                  </label>
                  <DatePicker
                    value={formData.date ?? ""}
                    onChange={handleDateChange}
                    minDate={today}
                    maxDate={maxDate}
                  />
                  {fieldErrors.date && (
                    <p className="mt-1 text-xs text-red-600">
                      {fieldErrors.date}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Vertrektijd *
                  </label>
                  <TimePicker
                    value={formData.time ?? ""}
                    onChange={handleTimeChange as any}
                    selectedDate={formData.date || null}
                    step={5}
                  />
                  {fieldErrors.time && (
                    <p className="mt-1 text-xs text-red-600">
                      {fieldErrors.time}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Retour */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center">
                  <RefreshCcw className="w-3.5 h-3.5" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Retour</h2>
              </div>

              <div className="ml-8">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.isRetour}
                    onChange={(e) => handleRetourToggle(e.target.checked)}
                    className="w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-400 transition-colors"
                  />
                  <span className="text-gray-800 text-sm">
                    Boek uw retour en ontvang 10% korting
                  </span>
                </label>

                {formData.isRetour && (
                  <div className="mt-4 glass-effect p-4 rounded-xl border border-gray-200/30">
                    <p className="text-xs font-medium text-gray-700 mb-3">
                      Waar wilt u vertrekken voor de retourrit?
                    </p>

                    <div className="space-y-2 mb-4">
                      <label className="flex items-center gap-2 cursor-pointer text-sm">
                        <input
                          type="radio"
                          name="retourType"
                          value="same"
                          checked={formData.retourType === "same"}
                          onChange={() => setRetourType("same")}
                          className="w-4 h-4 text-gray-600 border-gray-300"
                        />
                        Zelfde locatie als eindbestemming
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer text-sm">
                        <input
                          type="radio"
                          name="retourType"
                          value="different"
                          checked={formData.retourType === "different"}
                          onChange={() => setRetourType("different")}
                          className="w-4 h-4 text-gray-600 border-gray-300"
                        />
                        Ander vertrekadres
                      </label>
                    </div>

                    {/* same: toon toAddress + pickers */}
                    {formData.retourType === "same" && (
                      <div>
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200/50">
                          <p className="text-xs font-medium text-gray-600 mb-1">
                            Retour vertrekadres:
                          </p>
                          <p className="text-sm text-gray-800">
                            {formData.toAddress.address}{" "}
                            {formData.toAddress.houseNumber}
                            {formData.toAddress.addition &&
                              ` ${formData.toAddress.addition}`}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 mt-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Retourdatum *
                            </label>
                           <DatePicker
  value={formData.returnDate ?? ""}
  onChange={handleRetourDateChange}
  minDate={minReturnDate}   // ← i.p.v. today
  maxDate={maxDate}
/>
                            {fieldErrors.returnDate && (
                              <p className="mt-1 text-xs text-red-600">
                                {fieldErrors.returnDate}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Retourtijd *
                            </label>
                            <TimePicker
                              value={formData.returnTime ?? ""}
                              onChange={handleRetourTimeChange as any}
                              selectedDate={formData.returnDate || null}
                              step={5}
                              min={sameDay ? (formData.time || undefined) : undefined}
                            />
                            {fieldErrors.returnTime && (
                              <p className="mt-1 text-xs text-red-600">
                                {fieldErrors.returnTime}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* different: eigen retour-adres + pickers */}
                    {formData.retourType === "different" && (
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-800 text-sm">
                          Retour vertrekadres
                        </h4>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-12">
                          <div className="sm:col-span-6">
                            <input
                              value={formData.retourFromAddress.address}
                              onChange={(e) =>
                                handleRetourFromFieldChange(
                                  "address",
                                  e.target.value
                                )
                              }
                              onBlur={markRetourFromErrors}
                              aria-invalid={!!fieldErrors.retourFrom?.address}
                              aria-describedby="err-retour-address"
                              placeholder="Straat/adres"
                              className={`${inputClasses} ${
                                fieldErrors.retourFrom?.address
                                  ? "border-red-400 focus:ring-red-400"
                                  : ""
                              }`}
                            />
                            {fieldErrors.retourFrom?.address && (
                              <p
                                id="err-retour-address"
                                className="mt-1 text-xs text-red-600"
                              >
                                {fieldErrors.retourFrom.address}
                              </p>
                            )}
                          </div>
                          <div className="sm:col-span-3">
                            <input
                              value={formData.retourFromAddress.houseNumber}
                              onChange={(e) =>
                                handleRetourFromFieldChange(
                                  "houseNumber",
                                  e.target.value.replace(/\D/g, "")
                                )
                              }
                              onBlur={markRetourFromErrors}
                              inputMode="numeric"
                              aria-invalid={
                                !!fieldErrors.retourFrom?.houseNumber
                              }
                              aria-describedby="err-retour-houseNumber"
                              placeholder="Nr."
                              className={`${inputClasses} ${
                                fieldErrors.retourFrom?.houseNumber
                                  ? "border-red-400 focus:ring-red-400"
                                  : ""
                              }`}
                            />
                            {fieldErrors.retourFrom?.houseNumber && (
                              <p
                                id="err-retour-houseNumber"
                                className="mt-1 text-xs text-red-600"
                              >
                                {fieldErrors.retourFrom.houseNumber}
                              </p>
                            )}
                          </div>
                          <div className="sm:col-span-3">
                            <input
                              value={formData.retourFromAddress.addition || ""}
                              onChange={(e) =>
                                handleRetourFromFieldChange(
                                  "addition",
                                  e.target.value.toUpperCase()
                                )
                              }
                              onBlur={markRetourFromErrors}
                              aria-invalid={
                                !!fieldErrors.retourFrom?.addition
                              }
                              aria-describedby="err-retour-addition"
                              placeholder="Toev."
                              className={`${inputClasses} ${
                                fieldErrors.retourFrom?.addition
                                  ? "border-red-400 focus:ring-red-400"
                                  : ""
                              }`}
                            />
                            {fieldErrors.retourFrom?.addition && (
                              <p
                                id="err-retour-addition"
                                className="mt-1 text-xs text-red-600"
                              >
                                {fieldErrors.retourFrom.addition}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Retourdatum *
                            </label>
                           <DatePicker
  value={formData.returnDate ?? ""}
  onChange={handleRetourDateChange}
  minDate={minReturnDate}   // ← i.p.v. today
  maxDate={maxDate}
/>
                            {fieldErrors.returnDate && (
                              <p className="mt-1 text-xs text-red-600">
                                {fieldErrors.returnDate}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Retourtijd *
                            </label>
                            <TimePicker
                              value={formData.returnTime ?? ""}
                              onChange={handleRetourTimeChange as any}
                              selectedDate={formData.returnDate || null}
                              step={5}
                              min={sameDay ? (formData.time || undefined) : undefined}
                            />
                            {fieldErrors.returnTime && (
                              <p className="mt-1 text-xs text-red-600">
                                {fieldErrors.returnTime}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Passagiers */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Passagiers
                </h2>
              </div>

              <div className="ml-8">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handlePassengersChange(-1)}
                    disabled={formData.passengers <= 1}
                    className="w-10 h-10 glass-effect border border-gray-200/50 rounded-lg disabled:text-gray-300 disabled:cursor-not-allowed hover:bg-gray-50 transition-all flex items-center justify-center"
                  >
                    −
                  </button>
                  <div className="px-4 py-2 glass-effect rounded-lg border border-gray-200/50">
                    <span className="text-gray-800 font-semibold text-sm">
                      {formData.passengers} passagier
                      {formData.passengers !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handlePassengersChange(1)}
                    disabled={formData.passengers >= 8}
                    className="w-10 h-10 glass-effect border border-gray-200/50 rounded-lg disabled:text-gray-300 disabled:cursor-not-allowed hover:bg-gray-50 transition-all flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Bagage */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center">
                  <Luggage className="w-3.5 h-3.5" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Bagage</h2>
              </div>

              <div className="ml-8">
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 cursor-pointer group text-sm">
                    <input
                      type="radio"
                      name="luggage"
                      checked={formData.hasLuggage === true}
                      onChange={() => handleLuggageChange(true)}
                      className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-400"
                    />
                    <span className="text-gray-800">Ja, ik heb bagage</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group text-sm">
                    <input
                      type="radio"
                      name="luggage"
                      checked={formData.hasLuggage === false}
                      onChange={() => handleLuggageChange(false)}
                      className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-400"
                    />
                    <span className="text-gray-800">Nee, geen bagage</span>
                  </label>
                  {fieldErrors.luggage && (
                    <p className="mt-1 text-xs text-red-600">
                      {fieldErrors.luggage}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="button"
                disabled={!isValid}
                onClick={() => {
                  // per-veld feedback
                  markFromErrors();
                  markToErrors();
                  if (formData.isRetour && formData.retourType === "different")
                    markRetourFromErrors();
                  formData.stops.forEach((_, i) => markStopErrors(i));
                  validateMeta();

                  const errs = validateStep1Form(formData); // bevat ook “zelfde adres”-fout

                  if (errs.length === 0) {
                    console.log("✅ submit payload:", formData);
                    onNext();
                  } else {
                    console.warn("❌ validation errors:", errs);
                  }
                }}
                className={`group relative w-full py-4 px-6 rounded-xl font-bold text-base transition-all duration-200 ${
                  isValid
                    ? "bg-gray-800 text-white hover:bg-gray-700 cursor-pointer"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>Naar Voertuigkeuze</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Live debug (optioneel laten staan tijdens dev) */}
        <div className="mt-4">
          <details className="glass-effect rounded-lg border border-gray-200/50 p-3">
            <summary className="cursor-pointer text-sm font-medium text-gray-700">
              Live debug (formData & validatie)
            </summary>
            <div className="mt-3 space-y-3">
              <div>
                <div className="text-xs font-semibold text-gray-700 mb-1">
                  Is geldig?
                </div>
                <div className="text-sm">
                  {validateStep1Form(formData).length === 0 ? "✅ Ja" : "❌ Nee"}
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-gray-700 mb-1">
                  Validatiefouten
                </div>
                <pre className="text-xs bg-gray-50 p-2 rounded border border-gray-200/60 overflow-auto">
                  {JSON.stringify(validateStep1Form(formData), null, 2)}
                </pre>
              </div>

              <div>
                <div className="text-xs font-semibold text-gray-700 mb-1">
                  formData
                </div>
                <pre className="text-xs bg-gray-50 p-2 rounded border border-gray-200/60 overflow-auto">
                  {JSON.stringify(formData, null, 2)}
                </pre>
              </div>
            </div>
          </details>
        </div>

        {/* Trust Indicators */}
        <div
          className={`mt-6 text-center ${
            isLoaded ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
        >
          <div className="flex items-center justify-center gap-6 text-xs text-gray-600">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span>Veilig &amp; Betrouwbaar</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>24/7 Beschikbaar</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse" />
              <span>Premium Service</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
