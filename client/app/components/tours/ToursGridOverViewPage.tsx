// components/tours/ToursGrid.tsx
'use client'

import React, { useState } from 'react'
import ToursCardOverviewPage from './ToursCardOverviewPage'
import { TourBookingModal } from './TourBookingModal'

type Locale = 'nl' | 'en'

interface ToursGridProps {
  tours: any[]
  locale: Locale
}

export function ToursGridOverViewPage({ tours, locale }: ToursGridProps) {
  const [selectedTour, setSelectedTour] = useState<any | null>(null)

  if (!tours || tours.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-gray-600">
          {locale === 'nl' ? 'Geen tours gevonden' : 'No tours found'}
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tours.map((tour) => (
          <ToursCardOverviewPage
            key={tour._id}
            tour={tour}
            locale={locale}
            onBookNow={() => setSelectedTour(tour)}
          />
        ))}
      </div>

      {/* Booking Modal */}
      {selectedTour && (
        <TourBookingModal
          tour={selectedTour}
          locale={locale}
          onClose={() => setSelectedTour(null)}
        />
      )}
    </>
  )
}