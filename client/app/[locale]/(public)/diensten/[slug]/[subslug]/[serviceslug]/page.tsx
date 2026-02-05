// app/[locale]/(public)/diensten/[slug]/[subslug]/[serviceslug]/page.tsx

import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

/**
 * NIVEAU 3: Service Detail Page
 * Deze pagina valideert of de service:
 * 1. Bestaat
 * 2. Gekoppeld is aan de subservice
 * 3. Die subservice onder de hoofdcategorie valt
 */
const servicePageQuery = groq`
  *[
    _type == "servicePage" && 
    (slug.nl.current == $serviceslug || slug.en.current == $serviceslug)
  ][0] {
    _id,

    "title": { "nl": title.nl, "en": title.en },
    "description": { "nl": description.nl, "en": description.en },
    "slug": { "nl": slug.nl.current, "en": slug.en.current },

    // ⚠️ BELANGRIJK: We halen ALLE gekoppelde subcategories op
    // En checken of één daarvan matcht met de URL parameters
    subcategories[]-> {
      _id,
      "title": { "nl": title.nl, "en": title.en },
      "slug": { "nl": slug.nl.current, "en": slug.en.current },
      mainCategory-> {
        _id,
        "title": { "nl": title.nl, "en": title.en },
        "slug": { "nl": slug.nl.current, "en": slug.en.current }
      }
    },

    hero {
      titleOverride { "nl": nl, "en": en },
      subtitle { "nl": nl, "en": en },
      image {
        asset,
        "alt": { "nl": alt.nl, "en": alt.en }
      },
      cta {
        label { "nl": nl, "en": en },
        link,
        style
      }
    },

    "longDescription": { "nl": longDescription.nl, "en": longDescription.en },

    gallery[] {
      asset,
      "alt": { "nl": alt.nl, "en": alt.en },
      caption { "nl": caption.nl, "en": caption.en }
    },

    specifications {
      duration { "nl": duration.nl, "en": duration.en },
      distance { "nl": distance.nl, "en": distance.en },
      maxPersons,
      vehicleType { "nl": vehicleType.nl, "en": vehicleType.en }
    },

    pricing {
      priceFrom,
      priceNote { "nl": priceNote.nl, "en": priceNote.en },
      includesTickets
    },

    highlights { "nl": highlights.nl, "en": highlights.en },
    includes { "nl": includes.nl, "en": includes.en },

    showGallery,
    showMap,
    showReviews,
    showFAQ,
    showCalculator,

    theme
  }
`

type Props = {
  params: Promise<{ 
    locale: 'nl' | 'en'
    slug: string        // hoofdcategorie (bijv. "zakelijk-vervoer")
    subslug: string     // subservice (bijv. "directievervoer")
    serviceslug: string // service (bijv. "vip-luchthaven-transfer")
  }>
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug, subslug, serviceslug } = await params
  
  // Haal de service op
  const service = await client.fetch(servicePageQuery, { serviceslug })

  if (!service) {
    console.error(`❌ Service niet gevonden: ${serviceslug}`)
    notFound()
  }

  // ⚠️ VALIDATIE: Check of deze service gekoppeld is aan de subservice + hoofdcategorie
  const matchingSubcategory = service.subcategories?.find((sub: any) => {
    const subSlugMatches = sub.slug.nl === subslug || sub.slug.en === subslug
    const mainSlugMatches = sub.mainCategory?.slug.nl === slug || sub.mainCategory?.slug.en === slug
    return subSlugMatches && mainSlugMatches
  })

  if (!matchingSubcategory) {
    console.error(`❌ Service bestaat, maar valt niet onder de juiste hiërarchie:`)
    console.error(`   Verwachte hoofdcategorie: ${slug}`)
    console.error(`   Verwachte subservice: ${subslug}`)
    console.error(`   Gevonden subcategories:`, service.subcategories?.map((s: any) => ({
      subSlug: s.slug,
      mainSlug: s.mainCategory?.slug
    })))
    notFound()
  }

  // ✅ Success! De service valt onder de juiste hiërarchie
  console.log(`✅ Service gevonden onder correcte hiërarchie:`)
  console.log(`   Hoofdcategorie: ${matchingSubcategory.mainCategory.title[locale]}`)
  console.log(`   Subservice: ${matchingSubcategory.title[locale]}`)
  console.log(`   Service: ${service.title[locale]}`)

  const heroImageUrl = service.hero?.image?.asset 
    ? urlFor(service.hero.image.asset).width(1920).height(800).url()
    : null

  const heroTitle = service.hero?.titleOverride?.[locale] || service.title?.[locale]
  const heroSubtitle = service.hero?.subtitle?.[locale]

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href={`/${locale}/diensten`} className="hover:text-blue-600">
              {locale === 'nl' ? 'Diensten' : 'Services'}
            </Link>
            <span>/</span>
            
            <Link 
              href={`/${locale}/diensten/${matchingSubcategory.mainCategory.slug[locale]}`}
              className="hover:text-blue-600"
            >
              {matchingSubcategory.mainCategory.title[locale]}
            </Link>
            <span>/</span>
            
            <Link 
              href={`/${locale}/diensten/${matchingSubcategory.mainCategory.slug[locale]}/${matchingSubcategory.slug[locale]}`}
              className="hover:text-blue-600"
            >
              {matchingSubcategory.title[locale]}
            </Link>
            <span>/</span>
            
            <span className="text-gray-900 font-medium">{service.title[locale]}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      {heroImageUrl ? (
        <div className="relative h-[600px] w-full">
          <Image
            src={heroImageUrl}
            alt={service.hero?.image?.alt?.[locale] || heroTitle || ''}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4 max-w-5xl">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                {heroTitle}
              </h1>
              {heroSubtitle && (
                <p className="text-2xl md:text-3xl text-white/90 mb-10">
                  {heroSubtitle}
                </p>
              )}
              {service.hero?.cta?.label?.[locale] && (
                <Link
                  href={service.hero.cta.link || '/contact'}
                  className={`inline-block px-10 py-5 rounded-lg font-bold text-xl transition ${
                    service.hero.cta.style === 'primary'
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-white text-blue-600 hover:bg-gray-100'
                  }`}
                >
                  {service.hero.cta.label[locale]}
                </Link>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-24">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              {heroTitle}
            </h1>
            {heroSubtitle && (
              <p className="text-2xl text-white/90">
                {heroSubtitle}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Description */}
      {service.description?.[locale] && (
        <div className="bg-white py-16">
          <div className="max-w-5xl mx-auto px-4">
            <p className="text-xl text-gray-700 leading-relaxed">
              {service.description[locale]}
            </p>
          </div>
        </div>
      )}

      {/* Specifications */}
      {service.specifications && (
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">
              {locale === 'nl' ? 'Specificaties' : 'Specifications'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.specifications.duration?.[locale] && (
                <div className="bg-white p-6 rounded-lg">
                  <div className="text-blue-600 font-semibold mb-2">
                    {locale === 'nl' ? 'Duur' : 'Duration'}
                  </div>
                  <div className="text-2xl font-bold">
                    {service.specifications.duration[locale]}
                  </div>
                </div>
              )}
              {service.specifications.distance?.[locale] && (
                <div className="bg-white p-6 rounded-lg">
                  <div className="text-blue-600 font-semibold mb-2">
                    {locale === 'nl' ? 'Afstand' : 'Distance'}
                  </div>
                  <div className="text-2xl font-bold">
                    {service.specifications.distance[locale]}
                  </div>
                </div>
              )}
              {service.specifications.maxPersons && (
                <div className="bg-white p-6 rounded-lg">
                  <div className="text-blue-600 font-semibold mb-2">
                    {locale === 'nl' ? 'Max. Personen' : 'Max. Persons'}
                  </div>
                  <div className="text-2xl font-bold">
                    {service.specifications.maxPersons}
                  </div>
                </div>
              )}
              {service.specifications.vehicleType?.[locale] && (
                <div className="bg-white p-6 rounded-lg">
                  <div className="text-blue-600 font-semibold mb-2">
                    {locale === 'nl' ? 'Voertuig' : 'Vehicle'}
                  </div>
                  <div className="text-2xl font-bold">
                    {service.specifications.vehicleType[locale]}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Highlights & Includes in 2 columns */}
      {(service.highlights?.[locale]?.length > 0 || service.includes?.[locale]?.length > 0) && (
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {service.highlights?.[locale]?.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold mb-6">
                    {locale === 'nl' ? 'Hoogtepunten' : 'Highlights'}
                  </h2>
                  <ul className="space-y-3">
                    {service.highlights[locale].map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-blue-600 mt-1">✓</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {service.includes?.[locale]?.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold mb-6">
                    {locale === 'nl' ? 'Inbegrepen' : 'Included'}
                  </h2>
                  <ul className="space-y-3">
                    {service.includes[locale].map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-green-600 mt-1">✓</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Gallery */}
      {service.showGallery && service.gallery?.length > 0 && (
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">
              {locale === 'nl' ? 'Fotogalerij' : 'Photo Gallery'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {service.gallery.map((img: any, i: number) => (
                <div key={i} className="relative aspect-video rounded-lg overflow-hidden group">
                  <Image
                    src={urlFor(img.asset).width(800).url()}
                    alt={img.alt?.[locale] || img.caption?.[locale] || ''}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {img.caption?.[locale] && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3">
                      <p className="text-sm">{img.caption[locale]}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Pricing CTA */}
      {service.pricing && (
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              {locale === 'nl' ? 'Klaar om te boeken?' : 'Ready to book?'}
            </h2>
            {service.pricing.priceFrom && (
              <p className="text-3xl font-bold text-white mb-2">
                {locale === 'nl' ? 'Vanaf' : 'From'} €{service.pricing.priceFrom}
              </p>
            )}
            {service.pricing.priceNote?.[locale] && (
              <p className="text-blue-100 mb-8">
                {service.pricing.priceNote[locale]}
              </p>
            )}
            <Link
              href="/contact"
              className="inline-block bg-white text-blue-600 px-10 py-5 rounded-lg font-bold text-xl hover:bg-gray-100 transition"
            >
              {locale === 'nl' ? 'Vraag offerte aan' : 'Request quote'}
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}