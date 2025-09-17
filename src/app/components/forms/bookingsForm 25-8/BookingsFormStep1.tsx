// src/app/components/forms/bookingsForm/BookingsFormStep1.tsx
"use client";

import { useState } from "react";
import type React from "react";
import { MapPin, Calendar, Timer } from "lucide-react";

import type {
  BookingStep1Props,
  BookingStep1FormData,
  AddressFields,
  Step1Errors,
} from "@/types/forms/bookingsForm/bookingsFormStep1.type";

import {
  reverseRoute,
  addEmptyStop,
  removeStop,
  updateStop,
} from "@/types/forms/bookingsForm/bookingsFormStep1.type";

import {
  validateStep1Extended,
  validateSingleField,
  isFormCompleteExtended,
} from "@/validators/bookingsForm/BookingsFormStep1.valid";

import CustomDatePicker from "@/datePicker/DatePicker";

export default function BookingsFormStep1(props: BookingStep1Props) {
  const { formData, updateFormData, onNext } = props;

  const today = new Date();
  const sixMonthsFromNow = new Date();
  sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);

  const minDateStr = today.toISOString().slice(0, 10);
  const maxDateStr = sixMonthsFromNow.toISOString().slice(0, 10);

  const [errors, setErrors] = useState<Step1Errors>({});

  const clearError = (k: keyof Step1Errors) =>
    setErrors((prev) => ({ ...prev, [k]: undefined }));

  const runFieldValidation = (key: keyof Step1Errors) => {
    const msg = validateSingleField(formData, key, {
      minDate: minDateStr,
      maxDate: maxDateStr,
      allowEmptyStops: false,
    });
    setErrors((prev) => ({ ...prev, [key]: msg || undefined }));
  };

  const handleFieldChange = <K extends keyof BookingStep1FormData>(
    field: K,
    value: BookingStep1FormData[K]
  ) => {
    updateFormData(field, value);
    if (errors[field as keyof Step1Errors]) clearError(field as keyof Step1Errors);
  };

  // Address field handlers (controlled updates)
  const handleFromAddressChange = <T extends keyof AddressFields>(
    field: T,
    value: AddressFields[T]
  ) => {
    updateFormData("from", { ...formData.from, [field]: value } as any);
    clearError(`from.${field}` as keyof Step1Errors);
  };

  const handleToAddressChange = <T extends keyof AddressFields>(
    field: T,
    value: AddressFields[T]
  ) => {
    updateFormData("to", { ...formData.to, [field]: value } as any);
    clearError(`to.${field}` as keyof Step1Errors);
  };

  // Stops
  const handleStopChange = (
    index: number,
    field: keyof AddressFields,
    value: string
  ) => {
    const next = updateStop(formData, index, { [field]: value });
    updateFormData("stops", next.stops as any);
    clearError(`stops.${index}.${field}` as keyof Step1Errors);
  };

  const handleAddStop = () => {
    const next = addEmptyStop(formData);
    updateFormData("stops", next.stops as any);
  };

  const handleRemoveStop = (index: number) => {
    const next = removeStop(formData, index);
    updateFormData("stops", next.stops as any);
  };

  // Route omkeren
  const handleReverseRoute = () => {
    const next = reverseRoute(formData);
    updateFormData("from", next.from as any);
    updateFormData("to", next.to as any);
  };

  // Passagiers
  const handlePassengersChange = (inc: number) => {
    const newCount = Math.max(1, Math.min(8, formData.passengers + inc));
    handleFieldChange("passengers", newCount as any);
    runFieldValidation("passengers");
  };

  // Heen: datum/tijd
  const handleDateChange = (dateISO: string) => {
    const dateValue = dateISO === "" ? null : (dateISO as any);
    handleFieldChange("date", dateValue as any);
    runFieldValidation("date");
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const timeValue = e.target.value === "" ? null : (e.target.value as any);
    handleFieldChange("time", timeValue as any);
    runFieldValidation("time");
  };

  // Retour
  const handleRetourToggle = (checked: boolean) => {
    handleFieldChange("isRetour", checked as any);
    // fouten voor retourvelden opruimen bij uitzetten
    if (!checked) {
      clearError("returnDate");
      clearError("returnTime");
    }
  };

  const handleReturnDateChange = (dateISO: string) => {
    if (!formData.isRetour) return;
    const dateValue = dateISO === "" ? null : (dateISO as any);
    handleFieldChange("returnDate", dateValue as any);
    runFieldValidation("returnDate");
  };

  const handleReturnTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData.isRetour) return;
    const timeValue = e.target.value === "" ? null : (e.target.value as any);
    handleFieldChange("returnTime", timeValue as any);
    runFieldValidation("returnTime");
  };

  // Bagage
  const handleLuggageChange = (has: boolean) => {
    handleFieldChange("hasLuggage", has as any);
    runFieldValidation("hasLuggage");
  };

  // Submit
  const handleSubmit = () => {
    const { errors: validationErrors, isValid } = validateStep1Extended(formData, {
      minDate: minDateStr,
      maxDate: maxDateStr,
      allowEmptyStops: false,
    });

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    onNext();
  };

  const getError = (path: keyof Step1Errors) => errors[path];

  return (
    <div className="glass-effect rounded-3xl p-6 lg:p-8 border border-gray-200/30 backdrop-blur-xl shadow-2xl max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-1">
          <MapPin className="w-6 h-6 text-gray-700" />
          <h3 className="text-xl font-bold text-gray-800">Reserveer Uw Rit</h3>
        </div>
        <p className="text-gray-600 text-sm">Premium service wacht op u</p>
      </div>

      <div className="space-y-4">
        {/* Ophaallocatie */}
        <div className="space-y-3">
          <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
            Ophaallocatie
          </label>

          <div className="space-y-2">
            <input
              type="text"
              value={formData.from.address}
              onChange={(e) =>
                handleFromAddressChange("address", e.target.value)
              }
              onBlur={() => runFieldValidation("from.address")}
              placeholder="Straat/adres"
              className={`w-full px-3 py-3 glass-effect border ${
                getError("from.address") ? "border-red-300" : "border-gray-200/50"
              } rounded-lg`}
            />
            {getError("from.address") && (
              <p className="text-red-500 text-xs">{getError("from.address")}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <input
                type="text"
                value={formData.from.houseNumber}
                onChange={(e) =>
                  handleFromAddressChange("houseNumber", e.target.value)
                }
                onBlur={() => runFieldValidation("from.houseNumber")}
                placeholder="Huisnummer"
                className={`w-full px-3 py-3 glass-effect border ${
                  getError("from.houseNumber")
                    ? "border-red-300"
                    : "border-gray-200/50"
                } rounded-lg`}
              />
              {getError("from.houseNumber") && (
                <p className="text-red-500 text-xs">
                  {getError("from.houseNumber")}
                </p>
              )}
            </div>
            <input
              type="text"
              value={formData.from.addition}
              onChange={(e) =>
                handleFromAddressChange("addition", e.target.value)
              }
              onBlur={() => runFieldValidation("from.addition")}
              placeholder="Toevoeging"
              className="px-3 py-3 glass-effect border border-gray-200/50 rounded-lg"
            />
          </div>
        </div>

        {/* Tussenstops */}
        {formData.stops.map((stop, index) => (
          <div
            key={index}
            className="space-y-3 p-3 bg-gray-50/30 rounded-lg border border-gray-200/20"
          >
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide">
                Tussenstop {index + 1}
              </label>
              <button
                type="button"
                onClick={() => handleRemoveStop(index)}
                className="px-2 py-1 text-gray-500 hover:text-red-500 transition-colors text-sm"
              >
                × Verwijder
              </button>
            </div>

            <input
              type="text"
              value={stop.address}
              onChange={(e) =>
                handleStopChange(index, "address", e.target.value)
              }
              onBlur={() =>
                runFieldValidation(`stops.${index}.address` as keyof Step1Errors)
              }
              placeholder="Straat/adres"
              className="w-full px-3 py-3 glass-effect border border-gray-200/50 rounded-lg"
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={stop.houseNumber}
                onChange={(e) =>
                  handleStopChange(index, "houseNumber", e.target.value)
                }
                onBlur={() =>
                  runFieldValidation(
                    `stops.${index}.houseNumber` as keyof Step1Errors
                  )
                }
                placeholder="Huisnummer"
                className="px-3 py-3 glass-effect border border-gray-200/50 rounded-lg"
              />
              <input
                type="text"
                value={stop.addition}
                onChange={(e) =>
                  handleStopChange(index, "addition", e.target.value)
                }
                onBlur={() =>
                  runFieldValidation(
                    `stops.${index}.addition` as keyof Step1Errors
                  )
                }
                placeholder="Toevoeging"
                className="px-3 py-3 glass-effect border border-gray-200/50 rounded-lg"
              />
            </div>
          </div>
        ))}

        {/* Tussenstop toevoegen */}
        <button
          type="button"
          onClick={handleAddStop}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors text-sm"
        >
          <span className="text-lg">+</span>
          Tussenstop toevoegen
        </button>

        {/* Bestemming */}
        <div className="space-y-3">
          <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
            Bestemming
          </label>

          <div className="space-y-2">
            <input
              type="text"
              value={formData.to.address}
              onChange={(e) => handleToAddressChange("address", e.target.value)}
              onBlur={() => runFieldValidation("to.address")}
              placeholder="Straat/adres"
              className={`w-full px-3 py-3 glass-effect border ${
                getError("to.address") ? "border-red-300" : "border-gray-200/50"
              } rounded-lg`}
            />
            {getError("to.address") && (
              <p className="text-red-500 text-xs">{getError("to.address")}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <input
                type="text"
                value={formData.to.houseNumber}
                onChange={(e) =>
                  handleToAddressChange("houseNumber", e.target.value)
                }
                onBlur={() => runFieldValidation("to.houseNumber")}
                placeholder="Huisnummer"
                className={`w-full px-3 py-3 glass-effect border ${
                  getError("to.houseNumber")
                    ? "border-red-300"
                    : "border-gray-200/50"
                } rounded-lg`}
              />
              {getError("to.houseNumber") && (
                <p className="text-red-500 text-xs">
                  {getError("to.houseNumber")}
                </p>
              )}
            </div>
            <input
              type="text"
              value={formData.to.addition}
              onChange={(e) => handleToAddressChange("addition", e.target.value)}
              onBlur={() => runFieldValidation("to.addition")}
              placeholder="Toevoeging"
              className="px-3 py-3 glass-effect border border-gray-200/50 rounded-lg"
            />
          </div>
        </div>

        {/* Route omkeren */}
        <button
          type="button"
          onClick={handleReverseRoute}
          className="flex items-center gap-2 px-4 py-2 glass-effect border border-gray-200/50 rounded-lg hover:border-gray-300/70 transition-all duration-300 text-gray-700 text-sm"
        >
          <span className="text-base">↻</span>
          Route omkeren
        </button>

        {/* Heen: datum/tijd */}
        <div className="grid grid-cols-2 gap-3">
          <div className="relative group space-y-2">
            <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
              <Calendar className="w-3 h-3 inline mr-1" />
              Datum
            </label>
            <CustomDatePicker
              value={formData.date || ""}
              onChange={handleDateChange}
              minDate={today}
              maxDate={sixMonthsFromNow}
              placeholder="dd/mm/jjjj"
              className={`group-hover:border-gray-300/70 ${
                getError("date") ? "border-red-300" : ""
              }`}
            />
            {getError("date") && (
              <p className="text-red-500 text-xs">{getError("date")}</p>
            )}
          </div>

          <div className="relative group space-y-2">
            <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
              <Timer className="w-3 h-3 inline mr-1" />
              Tijd
            </label>
            <input
              type="time"
              value={formData.time || ""}
              onChange={handleTimeChange}
              onBlur={() => runFieldValidation("time")}
              className={`w-full px-3 py-3 glass-effect border ${
                getError("time") ? "border-red-300" : "border-gray-200/50"
              } rounded-lg text-gray-800 text-sm`}
            />
            {getError("time") && (
              <p className="text-red-500 text-xs">{getError("time")}</p>
            )}
          </div>
        </div>

        {/* Retour checkbox */}
        <div className="relative group">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isRetour}
              onChange={(e) => handleRetourToggle(e.target.checked)}
              className="w-4 h-4 text-gray-800 border-gray-300 rounded focus:ring-gray-400 focus:ring-2"
            />
            <span className="text-gray-800 text-sm">
              Ik wil een retourrit boeken
            </span>
          </label>
        </div>

        {/* Retour datum/tijd */}
        {formData.isRetour && (
          <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50/50 rounded-lg border border-gray-200/30">
            <div className="relative group space-y-2">
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                <Calendar className="w-3 h-3 inline mr-1" />
                Retourdatum
              </label>
              <CustomDatePicker
                value={formData.returnDate || ""}
                onChange={handleReturnDateChange}
                minDate={today}
                maxDate={sixMonthsFromNow}
                placeholder="dd/mm/jjjj"
                className={`group-hover:border-gray-300/70 ${
                  getError("returnDate") ? "border-red-300" : ""
                }`}
              />
              {getError("returnDate") && (
                <p className="text-red-500 text-xs">
                  {getError("returnDate")}
                </p>
              )}
            </div>

            <div className="relative group space-y-2">
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                <Timer className="w-3 h-3 inline mr-1" />
                Retourtijd
              </label>
              <input
                type="time"
                value={formData.returnTime || ""}
                onChange={handleReturnTimeChange}
                onBlur={() => runFieldValidation("returnTime")}
                className={`w-full px-3 py-3 glass-effect border ${
                  getError("returnTime")
                    ? "border-red-300"
                    : "border-gray-200/50"
                } rounded-lg text-gray-800 text-sm`}
              />
              {getError("returnTime") && (
                <p className="text-red-500 text-xs">
                  {getError("returnTime")}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Passagiers */}
        <div className="relative group space-y-2">
          <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
            Aantal passagiers
          </label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => handlePassengersChange(-1)}
              disabled={formData.passengers <= 1}
              className="w-10 h-10 glass-effect border border-gray-200/50 rounded-lg disabled:text-gray-300 disabled:cursor-not-allowed"
            >
              −
            </button>
            <span className="px-4 py-2 text-gray-800 font-medium">
              {formData.passengers} passagier
              {formData.passengers !== 1 ? "s" : ""}
            </span>
            <button
              type="button"
              onClick={() => handlePassengersChange(1)}
              disabled={formData.passengers >= 8}
              className="w-10 h-10 glass-effect border border-gray-200/50 rounded-lg disabled:text-gray-300 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>
          {getError("passengers") && (
            <p className="text-red-500 text-xs">{getError("passengers")}</p>
          )}
        </div>

        {/* Bagage */}
        <div className="relative group">
          <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
            Reist u met bagage?
          </label>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="luggage"
                checked={formData.hasLuggage === true}
                onChange={() => handleLuggageChange(true)}
                className="w-4 h-4 text-gray-800 border-gray-300 focus:ring-gray-400 focus:ring-2"
              />
              <span className="text-gray-800 text-sm">Ja, ik heb bagage</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="luggage"
                checked={formData.hasLuggage === false}
                onChange={() => handleLuggageChange(false)}
                className="w-4 h-4 text-gray-800 border-gray-300 focus:ring-gray-400 focus:ring-2"
              />
              <span className="text-gray-800 text-sm">Nee, geen bagage</span>
            </label>
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={
            !isFormCompleteExtended(formData, {
              minDate: minDateStr,
              maxDate: maxDateStr,
              allowEmptyStops: false,
            })
          }
          className="group relative w-full py-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white rounded-xl font-bold text-base mt-6 disabled:opacity-50"
        >
          Ga Verder
        </button>
      </div>
    </div>
  );
}
