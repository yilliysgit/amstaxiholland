import { getTourServicePage } from '@/sanity/queries/tourServicePageQueries'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { TourHero } from '@/app/components/tours/ToursHero'
import { urlFor } from '@/sanity/lib/image'
import TourInfoGrid from '@/app/components/tours/TourInfoGrid'
import TourComparison from '@/app/components/tours/TourComparison'
import TourBookingSteps from '@/app/components/tours/TourBookingSteps'

type Props = {
  params: Promise<{ 
    locale: 'nl' | 'en'
    slug: string
  }>
}

export default async function TourDetailPage({ params }: Props) {
  const { locale, slug } = await params
  const tour = await getTourServicePage(slug)

  if (!tour) notFound()

  // Format prijs op basis van beschikbare data
  const formatPrice = () => {
    if (!tour.routeInfo) return undefined
    
    const { sedanPrice, vanPrice, sedanMaxPersons, vanMaxPersons } = tour.routeInfo
    
    // Als beide prijzen er zijn, toon range
    if (sedanPrice && vanPrice) {
      return `€${sedanPrice} - €${vanPrice}`
    }
    // Anders toon de beschikbare prijs
    return sedanPrice ? `€${sedanPrice}` : vanPrice ? `€${vanPrice}` : undefined
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href={`/${locale}/diensten`} className="hover:text-blue-600">
              {locale === 'nl' ? 'Diensten' : 'Services'}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/diensten/tours`} className="hover:text-blue-600">
              Tours
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">
              {tour.title[locale]}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <TourHero
        title={tour.hero?.title?.[locale] || tour.title[locale]}
        subtitle={tour.hero?.subtitle?.[locale] || tour.subtitle?.[locale]}
        imageUrl={
          tour.hero?.image?.asset
            ? urlFor(tour.hero.image.asset).width(1920).url()
            : undefined
        }
        imageAlt={tour.hero?.image?.alt?.[locale]}
        usps={tour.hero?.usps?.[locale]}
        primaryCta={
          tour.hero?.primaryCta?.label?.[locale]
            ? {
                label: tour.hero.primaryCta.label[locale],
                link: tour.hero.primaryCta.link,
              }
            : undefined
        }
        secondaryCta={
          tour.hero?.secondaryCta?.label?.[locale]
            ? {
                label: tour.hero.secondaryCta.label[locale],
                link: tour.hero.secondaryCta.link,
              }
            : undefined
        }
        trustIndicators={tour.hero?.trustIndicators?.[locale]}
        badges={tour.badges?.map((badge: any) => ({
          label: badge.label?.[locale],
          tone: badge.tone,
          icon: badge.icon,
        }))}
        bookingCard={
          tour.hero?.bookingCard
            ? {
                title: tour.hero.bookingCard.title?.[locale],
                primaryButtonLabel: tour.hero.bookingCard.primaryButtonLabel?.[locale],
                primaryButtonLink: tour.hero.bookingCard.primaryButtonLink,
                secondaryButtonLabel: tour.hero.bookingCard.secondaryButtonLabel?.[locale],
                secondaryButtonPhone: tour.hero.bookingCard.secondaryButtonPhone,
              }
            : undefined
        }
     
routeInfo={
  tour.routeInfo
    ? {
        destination: tour.routeInfo.destination?.[locale],
        distance: tour.routeInfo.distance?.[locale],
        duration: tour.routeInfo.duration?.[locale],
        sedanPrice: tour.routeInfo.sedanPrice,
        vanPrice: tour.routeInfo.vanPrice,
        sedanMaxPersons: tour.routeInfo.sedanMaxPersons,
        vanMaxPersons: tour.routeInfo.vanMaxPersons,
        note: tour.routeInfo.note?.[locale],
      }
    : undefined
}

        locale={locale}
      />

<TourInfoGrid tour={tour} locale={locale} />

{/* Comparison */}
{tour.comparison && (
  <TourComparison comparison={tour.comparison} locale={locale} />
)}


{/* Booking Steps */}
<TourBookingSteps locale={locale} />



      {/* Debug */}
      <details className="max-w-7xl mx-auto px-4 py-8">
        <summary className="cursor-pointer text-blue-600 font-medium">
          🔍 Debug data
        </summary>
        <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded overflow-auto mt-2">
          {JSON.stringify(tour, null, 2)}
        </pre>
      </details>
    </div>
  )
}