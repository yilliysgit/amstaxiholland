// src/app/components/forms/toursform/ToursFormBooking.tsx
"use client";
import React from 'react';
import { MapPin, Calendar, Clock, Users, ArrowRight, X, User, Mail, Phone, MessageSquare } from 'lucide-react';
import type { Tour } from '@/types/tours/tours.type';
import type {
  TourBookingStep1,
  TourBookingStep2,
  TourBookingStep1Errors,
  TourBookingStep2Errors
} from '@/types/tours/tourBooking.type';
import { useGooglePlacesTourForm } from '@/hooks/useGooglePlacesTourForm/useGooglePlacesTourForm';
import DatePicker from '@/datePicker/DatePicker';
import TimePicker from '@/datePicker/TimePicker';

interface BookingFormProps {
  tour: Tour;
  currentStep: 1 | 2;
  formDataStep1: TourBookingStep1;
  formDataStep2: TourBookingStep2;
  onStep1Change: (data: TourBookingStep1) => void;
  onStep2Change: (data: TourBookingStep2) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
  onClose: () => void;
  onSubmit: () => void;
  step1Errors: TourBookingStep1Errors;
  step2Errors: TourBookingStep2Errors;
  attemptedNext: boolean;
  attemptedSubmit: boolean;
}

const ToursFormBooking: React.FC<BookingFormProps> = ({
  tour,
  currentStep,
  formDataStep1,
  formDataStep2,
  onStep1Change,
  onStep2Change,
  onNextStep,
  onPrevStep,
  onClose,
  onSubmit,
  step1Errors,
  step2Errors,
  attemptedNext,
  attemptedSubmit
}) => {
  const pickupInputRef = useGooglePlacesTourForm(formDataStep1, onStep1Change);

  return (
    <div className="col-span-full mt-8">
      {/* Form Container - Premium Glass Effect */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-luxury border border-gray-200/50 overflow-hidden">
        
        {/* Header met gradient */}
        <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 px-6 sm:px-8 py-6">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 pattern-overlay opacity-5"></div>
          
          <div className="relative flex items-center justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
              </h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${currentStep === 1 ? 'bg-white' : 'bg-white/40'}`}></div>
                  <div className={`w-2 h-2 rounded-full ${currentStep === 2 ? 'bg-white' : 'bg-white/40'}`}></div>
                </div>
                <span className="text-sm text-white/80 font-medium">
                  Stap {currentStep} van 2
                </span>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300 group"
              aria-label="Sluit formulier"
            >
              <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 sm:p-8">
          {/* Step 1 - Rit Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Rit details</h4>
                <p className="text-sm text-gray-600">Vul je ophaallocatie en gewenste tijd in</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                {/* Ophaallocatie - spans 3 columns */}
                <div className="md:col-span-3">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1.5 text-gray-600" />
                    Ophaallocatie
                  </label>
                  <input
                    ref={pickupInputRef as React.RefObject<HTMLInputElement>}
                    type="text"
                    value={formDataStep1.pickup}
                    onChange={(e) => onStep1Change({ ...formDataStep1, pickup: e.target.value })}
                    className={`w-full px-4 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200 ${
                      step1Errors.pickup ? 'border-red-400 bg-red-50/50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="Straatnaam"
                  />
                  {step1Errors.pickup && (
                    <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                      {step1Errors.pickup}
                    </p>
                  )}
                </div>

                {/* Huisnummer - spans 2 columns */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Huisnummer
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    value={formDataStep1.houseNumber}
                    onChange={(e) => onStep1Change({ ...formDataStep1, houseNumber: e.target.value })}
                    className={`w-full px-4 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200 ${
                      step1Errors.houseNumber ? 'border-red-400 bg-red-50/50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="123"
                  />
                  {step1Errors.houseNumber && (
                    <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                      {step1Errors.houseNumber}
                    </p>
                  )}
                </div>

                {/* Passagiers - spans 1 column */}
                <div className="md:col-span-1">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <Users className="w-4 h-4 inline mr-1.5 text-gray-600" />
                    Aantal
                  </label>
                  <select
                    value={formDataStep1.passengers}
                    onChange={(e) => onStep1Change({ ...formDataStep1, passengers: Number(e.target.value) })}
                    className="w-full px-4 py-3 bg-white border border-gray-300 hover:border-gray-400 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
                  >
                    {[1,2,3,4,5,6,7,8].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                  {step1Errors.passengers && (
                    <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                      {step1Errors.passengers}
                    </p>
                  )}
                </div>

                {/* Datum - spans 3 columns */}
                <div className="md:col-span-3">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1.5 text-gray-600" />
                    Datum
                  </label>
                  <DatePicker
                    value={formDataStep1.date}
                    onChange={(date) => onStep1Change({ ...formDataStep1, date })}
                    minDate={new Date()}
                    maxDate={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)}
                    placeholder="dd/mm/jjjj"
                  />
                  {step1Errors.date && (
                    <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                      {step1Errors.date}
                    </p>
                  )}
                </div>

                {/* Tijd - spans 3 columns */}
                <div className="md:col-span-3">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <Clock className="w-4 h-4 inline mr-1.5 text-gray-600" />
                    Tijd
                  </label>
                  <TimePicker
                    value={formDataStep1.time}
                    onChange={(time) => onStep1Change({ ...formDataStep1, time })}
                    selectedDate={formDataStep1.date || null}
                    step={15}
                    placeholder="--:--"
                  />
                  {step1Errors.time && (
                    <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                      {step1Errors.time}
                    </p>
                  )}
                </div>
              </div>

              {/* Next Button */}
              <div className="pt-4">
                <button
                  onClick={onNextStep}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] shadow-md hover:shadow-lg flex items-center justify-center group"
                >
                  Volgende: Contactgegevens
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2 - Contact Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Contactgegevens</h4>
                <p className="text-sm text-gray-600">Vul je persoonlijke gegevens in voor de boeking</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Voornaam */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <User className="w-4 h-4 inline mr-1.5 text-gray-600" />
                    Voornaam
                  </label>
                  <input
                    type="text"
                    value={formDataStep2.firstName}
                    onChange={(e) => onStep2Change({ ...formDataStep2, firstName: e.target.value })}
                    className={`w-full px-4 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200 ${
                      step2Errors.firstName ? 'border-red-400 bg-red-50/50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="Jan"
                  />
                  {step2Errors.firstName && (
                    <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                      {step2Errors.firstName}
                    </p>
                  )}
                </div>

                {/* Achternaam */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <User className="w-4 h-4 inline mr-1.5 text-gray-600" />
                    Achternaam
                  </label>
                  <input
                    type="text"
                    value={formDataStep2.lastName}
                    onChange={(e) => onStep2Change({ ...formDataStep2, lastName: e.target.value })}
                    className={`w-full px-4 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200 ${
                      step2Errors.lastName ? 'border-red-400 bg-red-50/50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="de Vries"
                  />
                  {step2Errors.lastName && (
                    <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                      {step2Errors.lastName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <Mail className="w-4 h-4 inline mr-1.5 text-gray-600" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={formDataStep2.email}
                    onChange={(e) => onStep2Change({ ...formDataStep2, email: e.target.value })}
                    className={`w-full px-4 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200 ${
                      step2Errors.email ? 'border-red-400 bg-red-50/50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="jouw@email.nl"
                  />
                  {step2Errors.email && (
                    <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                      {step2Errors.email}
                    </p>
                  )}
                </div>

                {/* Telefoon */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <Phone className="w-4 h-4 inline mr-1.5 text-gray-600" />
                    Telefoonnummer
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="\d*"
                    value={formDataStep2.phone}
                    onChange={(e) => onStep2Change({ ...formDataStep2, phone: e.target.value })}
                    className={`w-full px-4 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200 ${
                      step2Errors.phone ? 'border-red-400 bg-red-50/50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="0612345678"
                  />
                  {step2Errors.phone && (
                    <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                      {step2Errors.phone}
                    </p>
                  )}
                </div>

                {/* Opmerkingen */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-1.5 text-gray-600" />
                    Opmerkingen <span className="text-gray-500 font-normal">(optioneel)</span>
                  </label>
                  <textarea
                    value={formDataStep2.notes}
                    onChange={(e) => onStep2Change({ ...formDataStep2, notes: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-300 hover:border-gray-400 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200 resize-none"
                    rows={4}
                    placeholder="Speciale wensen of opmerkingen voor de chauffeur..."
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={onPrevStep}
                  className="sm:flex-1 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 py-4 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:border-gray-400"
                >
                  Vorige
                </button>
                <button
                  onClick={onSubmit}
                  className="sm:flex-1 bg-gray-900 hover:bg-gray-800 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] shadow-md hover:shadow-lg flex items-center justify-center group"
                >
                  Bevestig Boeking
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToursFormBooking;