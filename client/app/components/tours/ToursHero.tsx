"use client"

import { useInView } from '@/hooks/pages/useInView'
import { Check, Phone, ArrowRight, Car, Users } from 'lucide-react'
import { useState } from 'react'

type Badge = {
  label?: string
  tone?: string
  icon?: string
}

type HeroProps = {
  title: string
  subtitle?: string
  imageUrl?: string
  imageAlt?: string
  usps?: string[]
  primaryCta?: {
    label?: string
    link?: string
  }
  secondaryCta?: {
    label?: string
    link?: string
  }
  trustIndicators?: string[]
  badges?: Badge[]
  bookingCard?: {
    title?: string
    primaryButtonLabel?: string
    primaryButtonLink?: string
    secondaryButtonLabel?: string
    secondaryButtonPhone?: string
  }
  routeInfo?: {
    destination?: string
    distance?: string
    duration?: string
    sedanPrice?: number
    vanPrice?: number
    sedanMaxPersons?: number
    vanMaxPersons?: number
    note?: string
  }
  locale: 'nl' | 'en'
}

export function TourHero({ 
  title, 
  subtitle, 
  imageUrl,
  imageAlt,
  usps,
  primaryCta,
  secondaryCta,
  trustIndicators,
  badges,
  bookingCard,
  routeInfo,
  locale
}: HeroProps) {
  const { ref, inView } = useInView({ threshold: 0.1 })
  const [selectedVehicle, setSelectedVehicle] = useState<'sedan' | 'van'>('sedan')

  const hasMultipleVehicles = routeInfo?.sedanPrice && routeInfo?.vanPrice
  const currentPrice = selectedVehicle === 'sedan' ? routeInfo?.sedanPrice : routeInfo?.vanPrice
  const currentMaxPersons = selectedVehicle === 'sedan' ? routeInfo?.sedanMaxPersons : routeInfo?.vanMaxPersons

  return (
    <section className="relative bg-gray-900 text-white overflow-hidden">
      {/* Background Image */}
      {imageUrl && (
        <div className="absolute inset-0">
          <img
            src={imageUrl}
            alt={imageAlt || ''}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/70" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12" ref={ref}>
          
          {/* Left: Main Content (2/3) */}
          <div className="lg:col-span-2">
            {/* Badges */}
            {badges && badges.length > 0 && (
              <div 
                className={[
                  "flex gap-2 mb-6 flex-wrap",
                  "transition-all duration-1000 delay-200",
                  inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                ].join(" ")}
              >
                {badges.map((badge, i) => (
                  <span 
                    key={i} 
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      badge.tone === 'success' ? 'bg-green-500 text-white' :
                      badge.tone === 'info' ? 'bg-blue-500 text-white' :
                      badge.tone === 'orange' ? 'bg-orange-500 text-white' :
                      'bg-gray-700 text-white'
                    }`}
                  >
                    {badge.label}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 
              className={[
                "text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight",
                "transition-all duration-1000 delay-300",
                inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              ].join(" ")}
            >
              {title}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <p 
                className={[
                  "text-xl text-gray-200 mb-8 leading-relaxed",
                  "transition-all duration-1000 delay-400",
                  inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                ].join(" ")}
              >
                {subtitle}
              </p>
            )}

            {/* USPs */}
            {usps && usps.length > 0 && (
              <ul 
                className={[
                  "space-y-3 mb-8",
                  "transition-all duration-1000 delay-500",
                  inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                ].join(" ")}
              >
                {usps.map((usp, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-lg text-gray-100">{usp}</span>
                  </li>
                ))}
              </ul>
            )}

{/* CTAs */}
<div 
  className={[
    "flex flex-col sm:flex-row gap-4 mb-8",
    "transition-all duration-1000 delay-600",
    inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
  ].join(" ")}
>
  {primaryCta?.label && primaryCta?.link && (
    <a href={primaryCta.link}
      className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-xl transition group"
    >
      {primaryCta.label}
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </a>
  )}
  
  {secondaryCta?.label && secondaryCta?.link && (
    <a href={secondaryCta.link}
      className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur text-white font-semibold px-8 py-4 rounded-xl border border-white/30 transition"
    >
      {secondaryCta.label}
    </a>
  )}
</div>

{/* Trust Indicators - DIRECT NA CTAs */}
{trustIndicators && trustIndicators.length > 0 && (
  <div 
    className={[
      "flex flex-wrap items-center gap-6 text-sm",
      "transition-all duration-1000 delay-700",
      inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
    ].join(" ")}
  >
    {trustIndicators.map((indicator, i) => (
      <div key={i} className="flex items-center gap-2">
        <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
        <span className="text-gray-200 font-medium">{indicator}</span>
      </div>
    ))}
  </div>
)}
          </div>

          {/* Right: Booking Card (1/3) - Met toggle */}
          <div className="lg:col-span-1">
            <div 
              className={[
                "bg-white rounded-2xl shadow-2xl p-8 text-gray-900 sticky top-8",
                "transition-all duration-1000 delay-800",
                inView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              ].join(" ")}
            >
              {/* Header */}
              <h3 className="text-2xl font-bold mb-6 text-center uppercase tracking-wide">
                {routeInfo?.destination || (locale === 'nl' ? 'Bestemming' : 'Destination')}
              </h3>

              {/* Route Info */}
              <div className="space-y-4 mb-6 pb-6 border-b">
                {routeInfo?.destination && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Car className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 uppercase tracking-wide">
                        {locale === 'nl' ? 'Land' : 'Country'}
                      </div>
                      <div className="font-semibold">{routeInfo.destination}</div>
                    </div>
                  </div>
                )}

                {routeInfo?.distance && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 uppercase tracking-wide">
                        {locale === 'nl' ? 'Afstand' : 'Discance'}
                      </div>
                      <div className="font-semibold">{routeInfo.distance}</div>
                    </div>
                  </div>
                )}

                {routeInfo?.duration && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 uppercase tracking-wide">
                        {locale === 'nl' ? 'Duur' : 'Duration'}
                      </div>
                      <div className="font-semibold">{routeInfo.duration}</div>
                    </div>
                  </div>
                )}

                {currentMaxPersons && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 uppercase tracking-wide">
                        {locale === 'nl' ? 'Personen' : 'Persons'}
                      </div>
                      <div className="font-semibold">{currentMaxPersons}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Vehicle Toggle - alleen tonen als beide prijzen beschikbaar zijn */}
              {hasMultipleVehicles && (
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={() => setSelectedVehicle('sedan')}
                    className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                      selectedVehicle === 'sedan'
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Car className="w-5 h-5 mx-auto mb-1" />
                    Sedan
                  </button>
                  <button
                    onClick={() => setSelectedVehicle('van')}
                    className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                      selectedVehicle === 'van'
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <svg className="w-5 h-5 mx-auto mb-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6,6H18V7H19A2,2 0 0,1 21,9V15A1,1 0 0,1 20,16H17V19A1,1 0 0,1 16,20H15A1,1 0 0,1 14,19V16H10V19A1,1 0 0,1 9,20H8A1,1 0 0,1 7,19V16H4A1,1 0 0,1 3,15V9A2,2 0 0,1 5,7H6V6M6.5,9.5A1.5,1.5 0 0,0 5,11A1.5,1.5 0 0,0 6.5,12.5A1.5,1.5 0 0,0 8,11A1.5,1.5 0 0,0 6.5,9.5M17.5,9.5A1.5,1.5 0 0,0 16,11A1.5,1.5 0 0,0 17.5,12.5A1.5,1.5 0 0,0 19,11A1.5,1.5 0 0,0 17.5,9.5Z" />
                    </svg>
                    Van
                  </button>
                </div>
              )}

              {/* Prijs */}
              {currentPrice && (
                <div className="text-center py-4">
                  <div className="text-5xl font-bold text-gray-900 mb-1">
                    €{currentPrice}
                  </div>
                  {routeInfo?.note && (
                    <div className="text-sm text-gray-500">{routeInfo.note}</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}