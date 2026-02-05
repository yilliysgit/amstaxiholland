// client/components/bookingsForm/BookingsFormStep1.tsx
"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import { useTranslations } from "next-intl";

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

// Types
import type { AddressFields, Step1Errors } from "@/types/forms/bookingsForm/step1.type";
import type { Step1Api } from "@/hooks/bookingsForm/useBookingStep1";

// Validators
import { validateAddress, validateStep1, isAddressComplete, sameAddress } from "@/validators/bookingsForm/bookingsFormStep1.valid";

// Pickers
import DatePicker from "@/datePicker/DatePicker";
import TimePicker from "@/datePicker/TimePicker";

// Google Places
import { attachGooglePlaces } from "@/utils/googlePlaces/googlePlaces";

/* -------------------- Props -------------------- */
type Props = Step1Api & { onNext: () => void };

/* -------------------- Component -------------------- */
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
  const t  = useTranslations("forms.bookingsForm.step1");
  const tc = useTranslations("forms.bookingsForm.common");
  const ts = useTranslations("forms.bookingsForm.steps");

  const [errors, setErrors] = useState<Step1Errors>({});
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => { setIsLoaded(true); }, []);

  /* -------------------- Refs -------------------- */
  const fromAddressRef = useRef<HTMLInputElement>(null);
  const toAddressRef   = useRef<HTMLInputElement>(null);

  /* -------------------- i18n error helper -------------------- */
  // Vertaal een i18n-key uit de validator naar tekst
  const tv = (key: string | undefined, field?: string): string | undefined => {
    if (!key) return undefined;
    return t(key as any, { field: field ?? "" });
  };

  /* -------------------- onBlur validators -------------------- */
  const markFromErrors = () => {
    const errs = validateAddress(formData.fromAddress);
    setErrors(prev => ({
      ...prev,
      "fromAddress.address":     errs.address,
      "fromAddress.houseNumber": errs.houseNumber,
      "fromAddress.addition":    errs.addition,
    }));
  };
  const markToErrors = () => {
    const errs = validateAddress(formData.toAddress);
    setErrors(prev => ({
      ...prev,
      "toAddress.address":     errs.address,
      "toAddress.houseNumber": errs.houseNumber,
      "toAddress.addition":    errs.addition,
    }));
  };
  const markRetourFromErrors = () => {
    if (!(formData.isRetour && formData.retourType === "different")) return;
    const errs = validateAddress(formData.retourFromAddress);
    setErrors(prev => ({
      ...prev,
      "retourFromAddress.address":     errs.address,
      "retourFromAddress.houseNumber": errs.houseNumber,
      "retourFromAddress.addition":    errs.addition,
    }));
  };
  const markStopErrors = (index: number) => {
    const errs = validateAddress(formData.stops[index]);
    setErrors(prev => ({
      ...prev,
      [`stops.${index}.address`]:     errs.address,
      [`stops.${index}.houseNumber`]: errs.houseNumber,
      [`stops.${index}.addition`]:    errs.addition,
    } as Step1Errors));
  };
  const markMetaErrors = () => {
    setErrors(prev => ({
      ...prev,
      date:       formData.date       ? undefined : "validation.required",
      time:       formData.time       ? undefined : "validation.required",
      hasLuggage: formData.hasLuggage === null ? "validation.selectLuggage" : undefined,
      returnDate: formData.isRetour && !formData.returnDate ? "validation.required" : undefined,
      returnTime: formData.isRetour && !formData.returnTime ? "validation.required" : undefined,
    }));
  };

  /* -------------------- Cross-field: from ≠ to -------------------- */
  useEffect(() => {
    const bothComplete =
      isAddressComplete(formData.fromAddress) &&
      isAddressComplete(formData.toAddress);

    if (bothComplete && sameAddress(formData.fromAddress, formData.toAddress)) {
      setErrors(prev => ({
        ...prev,
        "fromAddress.address": "validation.sameAddress",
        "toAddress.address":   "validation.sameAddress",
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        "fromAddress.address": prev["fromAddress.address"] === "validation.sameAddress" ? undefined : prev["fromAddress.address"],
        "toAddress.address":   prev["toAddress.address"]   === "validation.sameAddress" ? undefined : prev["toAddress.address"],
      }));
    }
  }, [formData.fromAddress, formData.toAddress]);

  /* -------------------- Cross-field: retour > heen -------------------- */
  useEffect(() => {
    const clear = (v?: string) => (v === "validation.returnAfterDeparture" ? undefined : v);

    if (!formData.isRetour) {
      setErrors(prev => ({ ...prev, returnDate: clear(prev.returnDate), returnTime: clear(prev.returnTime) }));
      return;
    }

    const { date, time } = formData;
    const retDate = formData.returnDate;
    const retTime = formData.returnTime;

    if (date && time && retDate && retTime) {
      const out = new Date(`${date}T${time}:00`);
      const ret = new Date(`${retDate}T${retTime}:00`);
      const bad = Number.isFinite(out.getTime()) && Number.isFinite(ret.getTime()) && ret <= out;

      setErrors(prev => ({
        ...prev,
        returnDate: bad ? "validation.returnAfterDeparture" : clear(prev.returnDate),
        returnTime: bad ? "validation.returnAfterDeparture" : clear(prev.returnTime),
      }));
    } else {
      setErrors(prev => ({ ...prev, returnDate: clear(prev.returnDate), returnTime: clear(prev.returnTime) }));
    }
  }, [
    formData.isRetour,
    formData.date,
    formData.time,
    formData.isRetour ? formData.returnDate : null,
    formData.isRetour ? formData.returnTime : null,
  ]);

  /* -------------------- Zelfde dag: retour-tijd resetten -------------------- */
  useEffect(() => {
    if (!formData.isRetour) return;
    const retDate = formData.returnDate;
    const retTime = formData.returnTime;
    if (!formData.date || !retDate || retDate !== formData.date || !formData.time || !retTime) return;

    const toMin = (t: string) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
    if (toMin(retTime) < toMin(formData.time)) setReturnTime("");
  }, [
    formData.isRetour,
    formData.date,
    formData.time,
    formData.isRetour ? formData.returnDate : null,
    formData.isRetour ? formData.returnTime : null,
    setReturnTime,
  ]);

  /* -------------------- Google Places -------------------- */
  useEffect(() => {
    const setup = () => {
      if (fromAddressRef.current) {
        attachGooglePlaces(fromAddressRef.current, (data) =>
          updateFormData("fromAddress", { ...formData.fromAddress, ...data })
        );
      }
      if (toAddressRef.current) {
        attachGooglePlaces(toAddressRef.current, (data) =>
          updateFormData("toAddress", { ...formData.toAddress, ...data })
        );
      }
      formData.stops.forEach((_, i) => {
        const el = document.querySelector(`[data-stop-index="${i}"]`) as HTMLInputElement | null;
        if (el) attachGooglePlaces(el, (data) =>
          updateFormData("stops", formData.stops.map((s, idx) => idx === i ? { ...s, ...data } : s))
        );
      });
      if (formData.isRetour && formData.retourType === "different") {
        const el = document.querySelector("[data-retour-address]") as HTMLInputElement | null;
        if (el) attachGooglePlaces(el, (data) =>
          setRetourFromAddress({ ...formData.retourFromAddress, ...data })
        );
      }
    };

    setup();
    const interval = setInterval(() => {
      if ((window as any).google?.maps?.places) { setup(); clearInterval(interval); }
    }, 100);
    return () => clearInterval(interval);
  }, [formData.stops.length, formData.isRetour, formData.isRetour && "retourType" in formData ? formData.retourType : null]);

  /* -------------------- Clear helpers -------------------- */
  const clearErr = (key: keyof Step1Errors) =>
    setErrors(prev => ({ ...prev, [key]: undefined }));

  /* -------------------- Handlers -------------------- */
  const handleFromChange = (field: keyof AddressFields, value: string) => {
    updateFormData("fromAddress", { 
      ...formData.fromAddress, 
      [field]: value,
      // Reset placeId als straat handmatig getypt wordt (niet verified meer)
      ...(field === "address" ? { placeId: undefined } : {})
    });
    clearErr(`fromAddress.${field}` as keyof Step1Errors);
  };
  const handleToChange = (field: keyof AddressFields, value: string) => {
    updateFormData("toAddress", { 
      ...formData.toAddress, 
      [field]: value,
      // Reset placeId als straat handmatig getypt wordt (niet verified meer)
      ...(field === "address" ? { placeId: undefined } : {})
    });
    clearErr(`toAddress.${field}` as keyof Step1Errors);
  };
  const handleStopChange = (index: number, field: keyof AddressFields, value: string) => {
    updateFormData("stops", formData.stops.map((s, i) => 
      i === index 
        ? { 
            ...s, 
            [field]: value,
            // Reset placeId als straat handmatig getypt wordt
            ...(field === "address" ? { placeId: undefined } : {})
          } 
        : s
    ));
    clearErr(`stops.${index}.${field}` as keyof Step1Errors);
  };
  const handleRetourFromChange = (field: keyof AddressFields, value: string) => {
    if (!(formData.isRetour && formData.retourType === "different")) return;
    setRetourFromAddress({ 
      ...formData.retourFromAddress, 
      [field]: value,
      // Reset placeId als straat handmatig getypt wordt
      ...(field === "address" ? { placeId: undefined } : {})
    });
    clearErr(`retourFromAddress.${field}` as keyof Step1Errors);
  };

  const handleAddStop = () => {
    updateFormData("stops", [...formData.stops, { address: "", houseNumber: "", addition: "" }]);
  };
  const handleRemoveStop = (index: number) => {
    updateFormData("stops", formData.stops.filter((_, i) => i !== index));
  };

  const handleRetourToggle = (checked: boolean) => {
    if (checked) {
      enableReturnSame();
    } else {
      disableReturn();
      setErrors(prev => ({
        ...prev,
        returnDate: undefined,
        returnTime: undefined,
        "retourFromAddress.address": undefined,
        "retourFromAddress.houseNumber": undefined,
        "retourFromAddress.addition": undefined,
      }));
    }
  };

  /* -------------------- Derived -------------------- */
  const startOfDay = (d: Date) => { const x = new Date(d); x.setHours(0,0,0,0); return x; };

  const today = useMemo(() => startOfDay(new Date()), []);
  const maxDate = useMemo(() => { const d = new Date(today); d.setFullYear(d.getFullYear() + 1); return d; }, [today]);

  const minReturnDate = useMemo(() => {
    if (formData.date) {
      const out = startOfDay(new Date(formData.date));
      return out > today ? out : today;
    }
    return today;
  }, [formData.date, today]);

  const sameDay = useMemo(() => {
    if (!formData.isRetour) return false;
    return Boolean(formData.date && formData.returnDate && formData.returnDate === formData.date);
  }, [formData.isRetour, formData.date, formData.isRetour ? formData.returnDate : null]);

  const isValid = useMemo(() => Object.keys(validateStep1(formData)).length === 0, [formData]);

  /* -------------------- Steps bar -------------------- */
  const steps = [
    { id: 1, title: ts("step1"),  isActive: true,  isCompleted: false },
    { id: 2, title: ts("step2"),  isActive: false, isCompleted: false },
    { id: 3, title: ts("step3"),  isActive: false, isCompleted: false },
  ];

  /* -------------------- UI helpers -------------------- */
  const inputCls = "w-full px-3 py-2 glass-effect border border-gray-200/50 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all text-gray-800 placeholder-gray-400 text-sm";
  const errCls  = (has: boolean) => has ? " border-red-400 focus:ring-red-400" : "";

  /* -------------------- Retour pickers (herbruikbaar voor same + different) -------------------- */
  const RetourPickers = () => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 mt-3">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">{t("return.date")} {tc("required")}</label>
        <DatePicker
          value={formData.isRetour ? (formData.returnDate ?? "") : ""}
          onChange={d => { if (formData.isRetour) { setReturnDate(d as any); clearErr("returnDate"); } }}
          minDate={minReturnDate}
          maxDate={maxDate}
        />
        {errors.returnDate && <p className="mt-1 text-xs text-red-600">{tv(errors.returnDate, t("return.date"))}</p>}
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">{t("return.time")} {tc("required")}</label>
        <TimePicker
          value={formData.isRetour ? (formData.returnTime ?? "") : ""}
          onChange={v => { if (formData.isRetour) { setReturnTime(v as any); clearErr("returnTime"); } }}
          selectedDate={formData.isRetour ? (formData.returnDate || null) : null}
          step={5}
          min={sameDay ? (formData.time || undefined) : undefined}
        />
        {errors.returnTime && <p className="mt-1 text-xs text-red-600">{tv(errors.returnTime, t("return.time"))}</p>}
      </div>
    </div>
  );

  /* -------------------- JSX -------------------- */
  return (
    <div className="min-h-screen bg-gradient-mercedes-premium py-6 px-3">
      <div className="max-w-4xl mx-auto">

        {/* Steps bar */}
        <div className={`mb-8 transform transition-all duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs transition-all ${
                    step.isCompleted ? "bg-gray-800 text-white" : step.isActive ? "bg-gray-700 text-white" : "glass-effect text-gray-500 border border-gray-200/50"
                  }`}>
                    {step.isCompleted ? <Check className="w-4 h-4" /> : step.id}
                  </div>
                  <span className={`mt-1 text-xs ${step.isActive ? "text-gray-800" : "text-gray-500"}`}>{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-px mx-3 ${step.isCompleted ? "bg-gray-600" : "bg-gray-200"}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Main card */}
        <div className={`glass-effect rounded-2xl p-5 border border-gray-200/30 backdrop-blur-md shadow-md transform transition-all duration-300 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 glass-effect rounded-full mb-2 border border-gray-200/50">
              <MapPin className="w-6 h-6 text-gray-700" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">{t("title")}</h1>
            <p className="text-gray-600 text-sm">{t("subtitle")}</p>
          </div>

          <div className="space-y-6">

            {/* 1 — Vertrekadres */}
            <div className={`space-y-3 ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity`}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-gray-700 text-white text-xs flex items-center justify-center">1</div>
                <h2 className="text-lg font-semibold text-gray-800">{t("from.title")}</h2>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-12 ml-8">
                {/* straat */}
                <div className="sm:col-span-6">
                  <label className="block text-xs font-medium text-gray-700 mb-1">{t("from.street")} {tc("required")}</label>
                  <input
                    ref={fromAddressRef}
                    value={formData.fromAddress.address}
                    onChange={e => handleFromChange("address", e.target.value)}
                    onBlur={markFromErrors}
                    aria-invalid={!!errors["fromAddress.address"]}
                    aria-describedby="err-from-address"
                    placeholder={t("from.streetPlaceholder")}
                    className={`${inputCls}${errCls(!!errors["fromAddress.address"])}`}
                  />
                  {errors["fromAddress.address"] && <p id="err-from-address" className="mt-1 text-xs text-red-600">{tv(errors["fromAddress.address"], t("from.title"))}</p>}
                </div>
                {/* huisnummer */}
                <div className="sm:col-span-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">{t("from.houseNumber")} {tc("required")}</label>
                  <input
                    value={formData.fromAddress.houseNumber}
                    onChange={e => handleFromChange("houseNumber", e.target.value.replace(/\D/g, ""))}
                    onBlur={markFromErrors}
                    inputMode="numeric"
                    aria-invalid={!!errors["fromAddress.houseNumber"]}
                    aria-describedby="err-from-houseNumber"
                    placeholder={t("from.houseNumberPlaceholder")}
                    className={`${inputCls}${errCls(!!errors["fromAddress.houseNumber"])}`}
                  />
                  {errors["fromAddress.houseNumber"] && <p id="err-from-houseNumber" className="mt-1 text-xs text-red-600">{tv(errors["fromAddress.houseNumber"], t("from.houseNumber"))}</p>}
                </div>
                {/* toevoeging */}
                <div className="sm:col-span-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">{t("from.addition")}</label>
                  <input
                    value={formData.fromAddress.addition || ""}
                    onChange={e => handleFromChange("addition", e.target.value.toUpperCase())}
                    onBlur={markFromErrors}
                    aria-invalid={!!errors["fromAddress.addition"]}
                    aria-describedby="err-from-addition"
                    placeholder={t("from.additionPlaceholder")}
                    className={`${inputCls}${errCls(!!errors["fromAddress.addition"])}`}
                  />
                  {errors["fromAddress.addition"] && <p id="err-from-addition" className="mt-1 text-xs text-red-600">{tv(errors["fromAddress.addition"], t("from.addition"))}</p>}
                </div>
              </div>
            </div>

            {/* Tussenstops */}
            {formData.stops.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center"><Plus className="w-3 h-3" /></div>
                  <h3 className="text-base font-semibold text-gray-800">{t("stops.title")}</h3>
                </div>
                <div className="ml-8 space-y-3">
                  {formData.stops.map((stop, index) => (
                    <div key={index} className="glass-effect p-4 rounded-xl border border-gray-200/30">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium text-gray-800 text-sm">{t("stops.label")} {index + 1}</span>
                        <button type="button" onClick={() => handleRemoveStop(index)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors" aria-label={t("stops.remove")}>
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-12">
                        <div className="sm:col-span-6">
                          <input
                            data-stop-index={index}
                            value={stop.address}
                            onChange={e => handleStopChange(index, "address", e.target.value)}
                            onBlur={() => markStopErrors(index)}
                            aria-invalid={!!errors[`stops.${index}.address` as keyof Step1Errors]}
                            placeholder={t("stops.streetPlaceholder")}
                            className={`${inputCls}${errCls(!!errors[`stops.${index}.address` as keyof Step1Errors])}`}
                          />
                          {errors[`stops.${index}.address` as keyof Step1Errors] && <p className="mt-1 text-xs text-red-600">{tv(errors[`stops.${index}.address` as keyof Step1Errors], `${t("stops.label")} ${index + 1}`)}</p>}
                        </div>
                        <div className="sm:col-span-3">
                          <input
                            value={stop.houseNumber}
                            onChange={e => handleStopChange(index, "houseNumber", e.target.value.replace(/\D/g, ""))}
                            onBlur={() => markStopErrors(index)}
                            inputMode="numeric"
                            aria-invalid={!!errors[`stops.${index}.houseNumber` as keyof Step1Errors]}
                            placeholder={t("stops.houseNumberPlaceholder")}
                            className={`${inputCls}${errCls(!!errors[`stops.${index}.houseNumber` as keyof Step1Errors])}`}
                          />
                          {errors[`stops.${index}.houseNumber` as keyof Step1Errors] && <p className="mt-1 text-xs text-red-600">{tv(errors[`stops.${index}.houseNumber` as keyof Step1Errors], `${t("stops.label")} ${index + 1}`)}</p>}
                        </div>
                        <div className="sm:col-span-3">
                          <input
                            value={stop.addition || ""}
                            onChange={e => handleStopChange(index, "addition", e.target.value.toUpperCase())}
                            onBlur={() => markStopErrors(index)}
                            aria-invalid={!!errors[`stops.${index}.addition` as keyof Step1Errors]}
                            placeholder={t("stops.additionPlaceholder")}
                            className={`${inputCls}${errCls(!!errors[`stops.${index}.addition` as keyof Step1Errors])}`}
                          />
                          {errors[`stops.${index}.addition` as keyof Step1Errors] && <p className="mt-1 text-xs text-red-600">{tv(errors[`stops.${index}.addition` as keyof Step1Errors], `${t("stops.label")} ${index + 1}`)}</p>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tussenstop toevoegen */}
            <div className="ml-8">
              <button type="button" onClick={handleAddStop} className="flex items-center gap-1.5 text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors group">
                <Plus className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                {t("stops.add")}
              </button>
            </div>

            {/* 2 — Afleveradres */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-gray-700 text-white text-xs flex items-center justify-center">2</div>
                <h2 className="text-lg font-semibold text-gray-800">{t("to.title")}</h2>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-12 ml-8">
                <div className="sm:col-span-6">
                  <label className="block text-xs font-medium text-gray-700 mb-1">{t("to.street")} {tc("required")}</label>
                  <input
                    ref={toAddressRef}
                    value={formData.toAddress.address}
                    onChange={e => handleToChange("address", e.target.value)}
                    onBlur={markToErrors}
                    aria-invalid={!!errors["toAddress.address"]}
                    aria-describedby="err-to-address"
                    placeholder={t("to.streetPlaceholder")}
                    className={`${inputCls}${errCls(!!errors["toAddress.address"])}`}
                  />
                  {errors["toAddress.address"] && <p id="err-to-address" className="mt-1 text-xs text-red-600">{tv(errors["toAddress.address"], t("to.title"))}</p>}
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">{t("to.houseNumber")} {tc("required")}</label>
                  <input
                    value={formData.toAddress.houseNumber}
                    onChange={e => handleToChange("houseNumber", e.target.value.replace(/\D/g, ""))}
                    onBlur={markToErrors}
                    inputMode="numeric"
                    aria-invalid={!!errors["toAddress.houseNumber"]}
                    aria-describedby="err-to-houseNumber"
                    placeholder={t("to.houseNumberPlaceholder")}
                    className={`${inputCls}${errCls(!!errors["toAddress.houseNumber"])}`}
                  />
                  {errors["toAddress.houseNumber"] && <p id="err-to-houseNumber" className="mt-1 text-xs text-red-600">{tv(errors["toAddress.houseNumber"], t("to.houseNumber"))}</p>}
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">{t("to.addition")}</label>
                  <input
                    value={formData.toAddress.addition || ""}
                    onChange={e => handleToChange("addition", e.target.value.toUpperCase())}
                    onBlur={markToErrors}
                    aria-invalid={!!errors["toAddress.addition"]}
                    aria-describedby="err-to-addition"
                    placeholder={t("to.additionPlaceholder")}
                    className={`${inputCls}${errCls(!!errors["toAddress.addition"])}`}
                  />
                  {errors["toAddress.addition"] && <p id="err-to-addition" className="mt-1 text-xs text-red-600">{tv(errors["toAddress.addition"], t("to.addition"))}</p>}
                </div>
              </div>
            </div>

            {/* Wanneer */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center"><Calendar className="w-3.5 h-3.5" /></div>
                <h2 className="text-lg font-semibold text-gray-800">{t("when.title")}</h2>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 ml-8">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">{t("when.date")} {tc("required")}</label>
                  <DatePicker value={formData.date ?? ""} onChange={d => { updateFormData("date", d as any); clearErr("date"); }} minDate={today} maxDate={maxDate} />
                  {errors.date && <p className="mt-1 text-xs text-red-600">{tv(errors.date, t("when.date"))}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">{t("when.time")} {tc("required")}</label>
                  <TimePicker value={formData.time ?? ""} onChange={v => { updateFormData("time", v as any); clearErr("time"); }} selectedDate={formData.date || null} step={5} />
                  {errors.time && <p className="mt-1 text-xs text-red-600">{tv(errors.time, t("when.time"))}</p>}
                </div>
              </div>
            </div>

            {/* Retour */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center"><RefreshCcw className="w-3.5 h-3.5" /></div>
                <h2 className="text-lg font-semibold text-gray-800">{t("return.title")}</h2>
              </div>
              <div className="ml-8">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.isRetour} onChange={e => handleRetourToggle(e.target.checked)} className="w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-400" />
                  <span className="text-gray-800 text-sm">{t("return.checkbox")}</span>
                </label>

                {formData.isRetour && (
                  <div className="mt-4 glass-effect p-4 rounded-xl border border-gray-200/30">
                    <p className="text-xs font-medium text-gray-700 mb-3">{t("return.whereFrom")}</p>
                    <div className="space-y-2 mb-4">
                      <label className="flex items-center gap-2 cursor-pointer text-sm">
                        <input type="radio" name="retourType" value="same" checked={formData.retourType === "same"} onChange={() => setRetourType("same")} className="w-4 h-4 text-gray-600 border-gray-300" />
                        {t("return.sameLocation")}
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-sm">
                        <input type="radio" name="retourType" value="different" checked={formData.retourType === "different"} onChange={() => setRetourType("different")} className="w-4 h-4 text-gray-600 border-gray-300" />
                        {t("return.differentLocation")}
                      </label>
                    </div>

                    {/* same */}
                    {formData.retourType === "same" && (
                      <div>
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200/50">
                          <p className="text-xs font-medium text-gray-600 mb-1">{t("return.fromAddress")}</p>
                          <p className="text-sm text-gray-800">
                            {formData.toAddress.address} {formData.toAddress.houseNumber}{formData.toAddress.addition ? ` ${formData.toAddress.addition}` : ""}
                          </p>
                        </div>
                        <RetourPickers />
                      </div>
                    )}

                    {/* different */}
                    {formData.retourType === "different" && (
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-800 text-sm">{t("return.addressTitle")}</h4>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-12">
                          <div className="sm:col-span-6">
                            <input
                              data-retour-address
                              value={formData.retourFromAddress.address}
                              onChange={e => handleRetourFromChange("address", e.target.value)}
                              onBlur={markRetourFromErrors}
                              aria-invalid={!!errors["retourFromAddress.address"]}
                              placeholder={t("stops.streetPlaceholder")}
                              className={`${inputCls}${errCls(!!errors["retourFromAddress.address"])}`}
                            />
                            {errors["retourFromAddress.address"] && <p className="mt-1 text-xs text-red-600">{tv(errors["retourFromAddress.address"], t("return.addressTitle"))}</p>}
                          </div>
                          <div className="sm:col-span-3">
                            <input
                              value={formData.retourFromAddress.houseNumber}
                              onChange={e => handleRetourFromChange("houseNumber", e.target.value.replace(/\D/g, ""))}
                              onBlur={markRetourFromErrors}
                              inputMode="numeric"
                              aria-invalid={!!errors["retourFromAddress.houseNumber"]}
                              placeholder={t("stops.houseNumberPlaceholder")}
                              className={`${inputCls}${errCls(!!errors["retourFromAddress.houseNumber"])}`}
                            />
                            {errors["retourFromAddress.houseNumber"] && <p className="mt-1 text-xs text-red-600">{tv(errors["retourFromAddress.houseNumber"], t("return.addressTitle"))}</p>}
                          </div>
                          <div className="sm:col-span-3">
                            <input
                              value={formData.retourFromAddress.addition || ""}
                              onChange={e => handleRetourFromChange("addition", e.target.value.toUpperCase())}
                              onBlur={markRetourFromErrors}
                              aria-invalid={!!errors["retourFromAddress.addition"]}
                              placeholder={t("stops.additionPlaceholder")}
                              className={`${inputCls}${errCls(!!errors["retourFromAddress.addition"])}`}
                            />
                            {errors["retourFromAddress.addition"] && <p className="mt-1 text-xs text-red-600">{tv(errors["retourFromAddress.addition"], t("return.addressTitle"))}</p>}
                          </div>
                        </div>
                        <RetourPickers />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Passagiers */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center"><Users className="w-3.5 h-3.5" /></div>
                <h2 className="text-lg font-semibold text-gray-800">{t("passengers.title")}</h2>
              </div>
              <div className="ml-8 flex items-center gap-3">
                <button type="button" onClick={() => updateFormData("passengers", Math.max(1, formData.passengers - 1))} disabled={formData.passengers <= 1} className="w-10 h-10 glass-effect border border-gray-200/50 rounded-lg disabled:text-gray-300 disabled:cursor-not-allowed hover:bg-gray-50 transition-all flex items-center justify-center">−</button>
                <div className="px-4 py-2 glass-effect rounded-lg border border-gray-200/50">
                  <span className="text-gray-800 font-semibold text-sm">{t("passengers.label", { count: formData.passengers, s: formData.passengers === 1 ? "" : "s" })}</span>
                </div>
                <button type="button" onClick={() => updateFormData("passengers", Math.min(8, formData.passengers + 1))} disabled={formData.passengers >= 8} className="w-10 h-10 glass-effect border border-gray-200/50 rounded-lg disabled:text-gray-300 disabled:cursor-not-allowed hover:bg-gray-50 transition-all flex items-center justify-center">+</button>
              </div>
            </div>

            {/* Bagage */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center"><Luggage className="w-3.5 h-3.5" /></div>
                <h2 className="text-lg font-semibold text-gray-800">{t("luggage.title")}</h2>
              </div>
              <div className="ml-8 space-y-1.5">
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input type="radio" name="luggage" checked={formData.hasLuggage === true} onChange={() => { updateFormData("hasLuggage", true); clearErr("hasLuggage"); }} className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-400" />
                  <span className="text-gray-800">{t("luggage.yes")}</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input type="radio" name="luggage" checked={formData.hasLuggage === false} onChange={() => { updateFormData("hasLuggage", false); clearErr("hasLuggage"); }} className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-400" />
                  <span className="text-gray-800">{t("luggage.no")}</span>
                </label>
                {errors.hasLuggage && <p className="mt-1 text-xs text-red-600">{tv(errors.hasLuggage)}</p>}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                type="button"
                disabled={!isValid}
                onClick={() => {
                  markFromErrors();
                  markToErrors();
                  if (formData.isRetour && formData.retourType === "different") markRetourFromErrors();
                  formData.stops.forEach((_, i) => markStopErrors(i));
                  markMetaErrors();
                  if (isValid) onNext();
                }}
                className={`group w-full py-4 px-6 rounded-xl font-bold text-base transition-all duration-200 ${isValid ? "bg-gray-800 text-white hover:bg-gray-700 cursor-pointer" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
              >
                <span className="flex items-center justify-center gap-2">
                  <span>{t("cta")}</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className={`mt-6 text-center ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}>
          <div className="flex items-center justify-center gap-6 text-xs text-gray-600">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span>{t("trustIndicators.safe")}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{t("trustIndicators.available")}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse" />
              <span>{t("trustIndicators.premium")}</span>
            </div>
          </div>
        </div>

        {/* Live debug */}
        <div className="mt-4">
          <details className="glass-effect rounded-lg border border-gray-200/50 p-3">
            <summary className="cursor-pointer text-sm font-medium text-gray-700">Live debug</summary>
            <div className="mt-3 space-y-3">
              <div>
                <div className="text-xs font-semibold text-gray-700 mb-1">Is geldig?</div>
                <div className="text-sm">{isValid ? "✅ Ja" : "❌ Nee"}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-700 mb-1">Errors</div>
                <pre className="text-xs bg-gray-50 p-2 rounded border border-gray-200/60 overflow-auto">{JSON.stringify(errors, null, 2)}</pre>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-700 mb-1">formData</div>
                <pre className="text-xs bg-gray-50 p-2 rounded border border-gray-200/60 overflow-auto">{JSON.stringify(formData, null, 2)}</pre>
              </div>
            </div>
          </details>
        </div>

      </div>
    </div>
  );
};