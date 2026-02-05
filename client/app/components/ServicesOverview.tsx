// components/services/ServicesOverview.tsx

import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'
import Image from 'next/image'

// Query voor mainServicePage
// Let op: !(_id in path("drafts.**")) filtert automatisch drafts eruit
const servicesQuery = `
  *[_type == "mainServicePage" && !(_id in path("drafts.**"))] | order(sortOrder asc) {
    _id,
    slug,
    title,
    subtitle,
    cardImage {
      asset,
      alt
    },
    hero {
      image {
        asset,
        alt
      },
      title,
      subtitle
    },
    theme,
    gridType,
    subcategories[]-> {
      _id,
      slug,
      title
    }
  }
`

type Locale = 'nl' | 'en'

export async function ServicesOverview({ locale }: { locale: Locale }) {
  const services = await client.fetch(servicesQuery)

  if (!services || services.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">
          {locale === 'nl' 
            ? 'Nog geen diensten beschikbaar. Voeg ze toe in Sanity Studio.' 
            : 'No services available yet. Add them in Sanity Studio.'}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {services.map((service: any) => {
        // Get localized content
        const title = service.title?.[locale] || service.title?.nl
        const subtitle = service.subtitle?.[locale] || service.subtitle?.nl
        const slug = service.slug?.[locale]?.current || service.slug?.nl?.current

        // Use cardImage for overview, fallback to hero image
        const imageUrl = service.cardImage?.asset
          ? urlFor(service.cardImage.asset).width(800).height(600).url()
          : service.hero?.image?.asset
            ? urlFor(service.hero.image.asset).width(800).height(600).url()
            : null

        // Get alt text
        const imageAlt = service.cardImage?.alt || service.hero?.image?.alt || title || 'Service image'

        // Theme colors
        const themeColors = {
          blue: 'from-blue-600 to-blue-700',
          pink: 'from-pink-600 to-pink-700',
          purple: 'from-purple-600 to-purple-700',
          orange: 'from-orange-600 to-orange-700',
          green: 'from-green-600 to-green-700',
        }
        const gradientClass = themeColors[service.theme as keyof typeof themeColors] || themeColors.blue

        return (
          <Link
            key={service._id}
            href={`/${locale}/diensten/${slug}`}
            className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100"
          >
            {/* Image with gradient overlay */}
            {imageUrl ? (
              <div className="relative h-56 overflow-hidden bg-gray-100">
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${gradientClass} opacity-30 group-hover:opacity-20 transition-opacity`} />
              </div>
            ) : (
              // Fallback gradient if no image
              <div className={`h-56 bg-gradient-to-br ${gradientClass}`} />
            )}

            {/* Content */}
            <div className="p-6 lg:p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {title}
              </h3>

              {subtitle && (
                <p className="text-gray-600 text-base leading-relaxed mb-6">
                  {subtitle}
                </p>
              )}

              {/* Subcategories count (optional) */}
              {service.gridType === 'subservices' && service.subcategories?.length > 0 && (
                <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <span>
                    {service.subcategories.length} {locale === 'nl' ? 'opties' : 'options'}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-blue-600 font-semibold text-base group-hover:text-blue-700 transition-colors">
                  {locale === 'nl' ? 'Bekijk dienst' : 'View service'}
                </span>
                <svg
                  className="w-5 h-5 text-blue-600 group-hover:translate-x-2 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}