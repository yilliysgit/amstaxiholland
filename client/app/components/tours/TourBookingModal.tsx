// components/tours/TourBookingModal.tsx
'use client'

import React, { useState } from 'react'
import { X, MapPin, Calendar, Clock, Users, ArrowRight } from 'lucide-react'

type Locale = 'nl' | 'en'

interface TourBookingModalProps {
  tour: {
    _id: string
    title: { nl?: string; en?: string }
    routeInfo?: {
      sedanPrice?: number
      vanPrice?: number
      sedanMaxPersons?: number
      vanMaxPersons?: number
    }
  }
  locale: Locale
  onClose: () => void
}

export function TourBookingModal({ tour, locale, onClose }: TourBookingModalProps) {
  const [step, setStep] = useState<1 | 2>(1)
  const [vehicleType, setVehicleType] = useState<'sedan' | 'van'>('sedan')

  // Step 1 data
  const [pickup, setPickup] = useState('')
  const [houseNumber, setHouseNumber] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [passengers, setPassengers] = useState(1)

  // Step 2 data
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')

  const title = tour.title[locale] || tour.title.nl || tour.title.en
  const currentPrice = vehicleType === 'sedan' ? tour.routeInfo?.sedanPrice : tour.routeInfo?.vanPrice
  const hasBothVehicles = tour.routeInfo?.sedanPrice && tour.routeInfo?.vanPrice

  const handleNext = () => {
    if (!pickup || !date || !time) {
      alert(locale === 'nl' ? 'Vul alle verplichte velden in' : 'Fill in all required fields')
      return
    }
    setStep(2)
  }

  const handleSubmit = async () => {
    if (!firstName || !lastName || !email || !phone) {
      alert(locale === 'nl' ? 'Vul alle verplichte velden in' : 'Fill in all required fields')
      return
    }

    const bookingData = {
      tour: title,
      tourId: tour._id,
      vehicleType,
      pickup,
      houseNumber,
      date,
      time,
      passengers,
      firstName,
      lastName,
      email,
      phone,
      notes,
      price: currentPrice
    }

    try {
      const res = await fetch('/api/bookings/tours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      })

      if (res.ok) {
        alert(locale === 'nl' ? 'Boeking succesvol!' : 'Booking successful!')
        onClose()
      } else {
        alert(locale === 'nl' ? 'Er ging iets mis' : 'Something went wrong')
      }
    } catch (error) {
      alert(locale === 'nl' ? 'Netwerkfout' : 'Network error')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 text-white p-6 rounded-t-2xl flex items-center justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-gray-300 text-sm mt-1">
              {locale === 'nl' ? `Stap ${step} van 2` : `Step ${step} of 2`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="px-6 pt-4">
          <div className="flex items-center gap-2">
            <div className={`flex-1 h-2 rounded-full ${step >= 1 ? 'bg-green-600' : 'bg-gray-200'}`} />
            <div className={`flex-1 h-2 rounded-full ${step >= 2 ? 'bg-green-600' : 'bg-gray-200'}`} />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">
                {locale === 'nl' ? 'Rit details' : 'Ride details'}
              </h3>

              {/* Vehicle selector */}
              {hasBothVehicles && (
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setVehicleType('sedan')}
                    className={`p-4 rounded-xl border-2 transition ${
                      vehicleType === 'sedan'
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-sm text-gray-600 mb-1">
                      Sedan (1-{tour.routeInfo?.sedanMaxPersons || 4})
                    </div>
                    <div className="text-2xl font-bold">€{tour.routeInfo?.sedanPrice}</div>
                  </button>
                  <button
                    onClick={() => setVehicleType('van')}
                    className={`p-4 rounded-xl border-2 transition ${
                      vehicleType === 'van'
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-sm text-gray-600 mb-1">
                      Van (1-{tour.routeInfo?.vanMaxPersons || 8})
                    </div>
                    <div className="text-2xl font-bold">€{tour.routeInfo?.vanPrice}</div>
                  </button>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                {/* Pickup */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    {locale === 'nl' ? 'Ophaaladres *' : 'Pickup address *'}
                  </label>
                  <input
                    type="text"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder={locale === 'nl' ? 'Straatnaam' : 'Street name'}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* House number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {locale === 'nl' ? 'Huisnummer' : 'House number'}
                  </label>
                  <input
                    type="text"
                    value={houseNumber}
                    onChange={(e) => setHouseNumber(e.target.value)}
                    placeholder="123"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Passengers */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="w-4 h-4 inline mr-1" />
                    {locale === 'nl' ? 'Aantal personen *' : 'Passengers *'}
                  </label>
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    {locale === 'nl' ? 'Datum *' : 'Date *'}
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    {locale === 'nl' ? 'Tijd *' : 'Time *'}
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                onClick={handleNext}
                className="w-full bg-gray-900 text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition flex items-center justify-center gap-2"
              >
                {locale === 'nl' ? 'Volgende: Contactgegevens' : 'Next: Contact details'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">
                {locale === 'nl' ? 'Contactgegevens' : 'Contact details'}
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {locale === 'nl' ? 'Voornaam *' : 'First name *'}
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {locale === 'nl' ? 'Achternaam *' : 'Last name *'}
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {locale === 'nl' ? 'Telefoonnummer *' : 'Phone *'}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+31..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {locale === 'nl' ? 'Opmerkingen (optioneel)' : 'Notes (optional)'}
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder={locale === 'nl' ? 'Bijv. kinderzitje, bagage, retour...' : 'E.g. child seat, luggage, return...'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-50 transition"
                >
                  {locale === 'nl' ? 'Vorige' : 'Previous'}
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 transition"
                >
                  {locale === 'nl' ? 'Bevestig Booking' : 'Confirm Booking'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}