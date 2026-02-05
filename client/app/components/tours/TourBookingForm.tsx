// components/tours/TourBooking.tsx
'use client'
import React, { useState } from 'react'
import { Calendar, MapPin, Users, Clock, ArrowRight } from 'lucide-react'

type Locale = 'nl' | 'en'

interface TourBookingProps {
  tourTitle: string
  sedanPrice?: number
  vanPrice?: number
  locale: Locale
}

export function TourBookingForm({ tourTitle, sedanPrice, vanPrice, locale }: TourBookingProps) {
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

  const currentPrice = vehicleType === 'sedan' ? sedanPrice : vanPrice

  const handleNext = () => {
    // Validatie
    if (!pickup || !date || !time) {
      alert(locale === 'nl' ? 'Vul alle verplichte velden in' : 'Fill in all required fields')
      return
    }
    setStep(2)
  }

  const handleSubmit = async () => {
    // Validatie
    if (!firstName || !lastName || !email || !phone) {
      alert(locale === 'nl' ? 'Vul alle verplichte velden in' : 'Fill in all required fields')
      return
    }

    // Submit booking
    const bookingData = {
      tour: tourTitle,
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
        // Reset form
      } else {
        alert(locale === 'nl' ? 'Er ging iets mis' : 'Something went wrong')
      }
    } catch (error) {
      alert(locale === 'nl' ? 'Netwerkfout' : 'Network error')
    }
  }

  return (
    <div className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
          {/* Progress indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step === 1 ? 'bg-gray-900 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                1
              </div>
              <div className="w-16 h-0.5 bg-gray-300" />
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step === 2 ? 'bg-gray-900 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                2
              </div>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {locale === 'nl' ? 'Rit details' : 'Ride details'}
              </h2>

              {/* Vehicle type selector */}
              {sedanPrice && vanPrice && (
                <div className="flex gap-4 mb-6">
                  <button
                    onClick={() => setVehicleType('sedan')}
                    className={`flex-1 p-4 rounded-xl border-2 transition ${
                      vehicleType === 'sedan'
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-bold">Sedan (1-4 {locale === 'nl' ? 'personen' : 'persons'})</div>
                    <div className="text-2xl font-bold text-gray-900">€{sedanPrice}</div>
                  </button>
                  <button
                    onClick={() => setVehicleType('van')}
                    className={`flex-1 p-4 rounded-xl border-2 transition ${
                      vehicleType === 'van'
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-bold">Van (1-8 {locale === 'nl' ? 'personen' : 'persons'})</div>
                    <div className="text-2xl font-bold text-gray-900">€{vanPrice}</div>
                  </button>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                {/* Pickup */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    {locale === 'nl' ? 'Ophaaladres' : 'Pickup address'}
                  </label>
                  <input
                    type="text"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder={locale === 'nl' ? 'Straat + huisnummer, plaats' : 'Street + number, city'}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Passengers */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="w-4 h-4 inline mr-1" />
                    {locale === 'nl' ? 'Aantal personen' : 'Number of passengers'}
                  </label>
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
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
                    {locale === 'nl' ? 'Datum' : 'Date'}
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    {locale === 'nl' ? 'Tijd' : 'Time'}
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {locale === 'nl' ? 'Contactgegevens' : 'Contact details'}
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {locale === 'nl' ? 'Voornaam' : 'First name'}
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {locale === 'nl' ? 'Achternaam' : 'Last name'}
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {locale === 'nl' ? 'Telefoonnummer' : 'Phone number'}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+31..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
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
                  placeholder={locale === 'nl' ? 'Bijv. kinderzitje, veel bagage, retourtijd...' : 'E.g. child seat, lots of luggage, return time...'}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
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