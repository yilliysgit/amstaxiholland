"use client"
import Link from 'next/link'
import { useInView } from '@/hooks/pages/useInView'

type SubService = {
  _id: string
  title: string
  subtitle?: string
  slug: string
  imageUrl?: string
  imageAlt?: string
}

type SubServicesGridProps = {
  title?: string
  subtitle?: string
  items: SubService[]
  locale: 'nl' | 'en'
  parentSlug: string
}

export function MainSubServicesGrid({ title, subtitle, items, locale, parentSlug }: SubServicesGridProps) {
  if (!items?.length) return null

  const { ref, inView } = useInView({ threshold: 0.1 })

  // Fallback teksten als er geen title/subtitle is opgegeven
  const displayTitle = title || (locale === 'nl' ? 'Onze diensten' : 'Our services')
  const displaySubtitle = subtitle || (locale === 'nl' 
    ? 'Kies de service die bij uw behoeften past' 
    : 'Choose the service that fits your needs')

  return (
    <section className="pt-8 pb-20 lg:pt-12 lg:pb-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Section Header */}
        <div ref={ref} className="mb-16 text-center">
          <h2 
            className={[
              "text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 tracking-tight mb-4",
              "transition-all duration-1000 delay-200",
              inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            ].join(" ")}
          >
            {displayTitle}
          </h2>
          <p 
            className={[
              "text-lg sm:text-xl text-gray-600 font-light",
              "transition-all duration-1000 delay-400",
              inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            ].join(" ")}
          >
            {displaySubtitle}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item, i) => (
            <Link
              key={item._id}
              href={`/${locale}/diensten/${parentSlug}/${item.slug}`}
              style={{ transitionDelay: `${600 + (i * 100)}ms` }}
              className={[
                "group glass-effect rounded-2xl overflow-hidden shadow-luxury hover:shadow-xl",
                "transition-all duration-1000",
                inView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              ].join(" ")}
            >
              {/* Image */}
              {item.imageUrl && (
                <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
                  <img
                    src={item.imageUrl}
                    alt={item.imageAlt || item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              )}

              {/* Content */}
              <div className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 tracking-tight mb-3 group-hover:text-gray-700 transition-colors">
                  {item.title}
                </h3>

                {item.subtitle && (
                  <p className="text-base text-gray-600 leading-relaxed mb-4 font-light">
                    {item.subtitle}
                  </p>
                )}

                {/* Read more indicator */}
                <div className="flex items-center gap-2 text-sm font-medium text-gray-800 group-hover:gap-3 transition-all">
                  <span>{locale === 'nl' ? 'Meer informatie' : 'Learn more'}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}