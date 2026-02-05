// client/app/components/tours/TourCard.tsx

import React from 'react'
import Link from 'next/link'
import { Clock, MapPin, Users, Star } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'

type Locale = 'nl' | 'en'

interface TourCardProps {
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

export function TourCard({ tour, locale, onBookNow }: TourCardProps) {
  const imageUrl = tour.cardImage?.asset
    ? urlFor(tour.cardImage.asset).width(800).height(500).url()
    : '/placeholder-tour.jpg'

  const title =
    tour.title?.[locale] ||
    tour.title?.nl ||
    tour.title?.en ||
    'Tour'

  const subtitle =
    tour.subtitle?.[locale] ||
    tour.subtitle?.nl ||
    tour.subtitle?.en ||
    null

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
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
      
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={imageUrl}
          alt={tour.cardImage?.alt?.[locale] || title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {typeof tour.rating === 'number' &&
          typeof tour.reviewCount === 'number' && (
            <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1.5 shadow-lg flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-sm">{tour.rating}</span>
              <span className="text-gray-500 text-sm">
                ({tour.reviewCount})
              </span>
            </div>
          )}
      </div>

      {/* Content */}
      <div className="p-6">
        
        {/* Category */}
        {category && (
          <div className="inline-block mb-3">
            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              {category}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
          {title}
        </h3>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-gray-600 mb-4 line-clamp-2">
            {subtitle}
          </p>
        )}

        {/* Meta */}
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
          {tour.routeInfo?.duration?.[locale] && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{tour.routeInfo.duration[locale]}</span>
            </div>
          )}

          {tour.routeInfo?.distance?.[locale] && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{tour.routeInfo.distance[locale]}</span>
            </div>
          )}

          {tour.routeInfo?.sedanMaxPersons && (
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>Max {tour.routeInfo.sedanMaxPersons}-8</span>
            </div>
          )}
        </div>

        {/* Pickup */}
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
          <span>
            {locale === 'nl' ? 'Ophalen mogelijk' : 'Pickup available'}
          </span>
        </div>

        {/* Price & Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div>
            <div className="text-sm text-gray-500">
              {locale === 'nl' ? 'Vanaf' : 'From'}
            </div>
            <div className="text-3xl font-bold text-gray-900">
              €{tour.routeInfo?.sedanPrice ?? 0}
            </div>
          </div>

          <div className="flex gap-3">
            {slug && (
              <Link
                href={`/${locale}/diensten/tours/${slug}`}
                className="px-6 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-xl hover:bg-gray-900 hover:text-white transition-all"
              >
                {locale === 'nl' ? 'Meer info' : 'More info'}
              </Link>
            )}

            <button
              onClick={onBookNow}
              className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all"
            >
              {locale === 'nl' ? 'Boek direct' : 'Book now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
