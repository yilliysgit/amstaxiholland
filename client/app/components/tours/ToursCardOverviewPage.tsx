// client/app/components/tours/ToursCardOverviewPage.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import { Clock, MapPin, Users, Star } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'

type Locale = 'nl' | 'en'

interface SanityTourCardProps {
  tour: {
    _id: string
    title: { nl?: string; en?: string }
    subtitle?: { nl?: string; en?: string }
    slug?: { nl?: string; en?: string }
    cardImage?: {
      asset?: { _ref: string }
      alt?: { nl?: string; en?: string }
    }
    badges?: Array<{
      label?: { nl?: string; en?: string }
      tone?: string
    }>
    routeInfo?: {
      duration?: { nl?: string; en?: string }
      distance?: { nl?: string; en?: string }
      sedanPrice?: number
      sedanMaxPersons?: number
    }
    rating?: number
    reviewCount?: number
  }
  locale: Locale
  onBookNow: () => void
}

export default function ToursCardOverviewPage({
  tour,
  locale,
  onBookNow,
}: SanityTourCardProps) {
  const imageUrl = tour.cardImage?.asset
    ? urlFor(tour.cardImage.asset).width(800).height(500).url()
    : '/placeholder-tour.jpg'

  const title =
    tour.title?.[locale] || tour.title?.nl || tour.title?.en || 'Tour'

  const subtitle =
    tour.subtitle?.[locale] || tour.subtitle?.nl || tour.subtitle?.en || null

  const slug =
    tour.slug?.[locale] ??
    tour.slug?.nl ??
    tour.slug?.en ??
    null

  const category =
    tour.badges?.[0]?.label?.[locale] ||
    tour.badges?.[0]?.label?.nl ||
    null

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] h-full flex flex-col">
      
      {/* Image */}
      <div className="relative h-64 bg-gray-100 overflow-hidden">
        <img
          src={imageUrl}
          alt={tour.cardImage?.alt?.[locale] || title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {typeof tour.rating === 'number' &&
          typeof tour.reviewCount === 'number' && (
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center shadow-lg">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="text-gray-900">{tour.rating}</span>
              <span className="ml-1 text-gray-500">
                ({tour.reviewCount})
              </span>
            </div>
          )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {category && (
          <div className="mb-3">
            <span className="inline-block bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full font-medium">
              {category}
            </span>
          </div>
        )}

        <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
          {title}
        </h3>

        {subtitle && (
          <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2 flex-grow">
            {subtitle}
          </p>
        )}

        <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-5 pb-5 border-b border-gray-100">
          {tour.routeInfo?.duration?.[locale] && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="font-medium">
                {tour.routeInfo.duration[locale]}
              </span>
            </div>
          )}

          {tour.routeInfo?.distance?.[locale] && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="font-medium">
                {tour.routeInfo.distance[locale]}
              </span>
            </div>
          )}

          {tour.routeInfo?.sedanMaxPersons && (
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="font-medium">
                Max {tour.routeInfo.sedanMaxPersons}-8
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium">
              {locale === 'nl' ? 'Vanaf' : 'From'}
            </span>
            <span className="text-2xl font-bold text-gray-900">
              €{tour.routeInfo?.sedanPrice ?? 0}
            </span>
          </div>

          <div className="flex gap-2">
            {slug && (
              <Link
                href={`/${locale}/diensten/tours/${slug}`}
                className="bg-gray-50 hover:bg-gray-100 text-gray-700 py-2.5 px-4 rounded-xl font-semibold transition-all duration-300 text-sm hover:scale-[1.02] shadow-sm"
              >
                {locale === 'nl' ? 'Meer info' : 'More info'}
              </Link>
            )}

            <button
              onClick={onBookNow}
              className="bg-gray-900 hover:bg-gray-800 text-white py-2.5 px-5 rounded-xl font-semibold transition-all duration-300 text-sm shadow-md hover:shadow-lg hover:scale-[1.02]"
            >
              {locale === 'nl' ? 'Boek direct' : 'Book now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
