// app/[locale]/(public)/diensten/[slug]/[subslug]/page.tsx
import { getSubServicePage } from '@/sanity/queries/subServicePageQueries'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

type Props = {
  params: Promise<{ locale: 'nl' | 'en'; slug: string; subslug: string }>
}

export default async function SubServicePage({ params }: Props) {
  const { locale, slug, subslug } = await params
  
  console.log(`\n🔍 Loading page: /diensten/${slug}/${subslug}`)
  
  // Haal de subservice page op
  const page = await getSubServicePage(slug, subslug)
  
  if (!page) {
    console.error(`❌ Geen pagina gevonden voor: ${slug}/${subslug}`)
    notFound()
  }
  
  console.log(`✅ SubServicePage gevonden: ${page.title?.[locale]}`)
  
  const heroImageUrl = page.hero?.image?.asset 
    ? urlFor(page.hero.image.asset).width(1920).height(800).url()
    : null

  const heroTitle = page.hero?.title?.[locale] || page.title?.[locale]
  const heroSubtitle = page.hero?.subtitle?.[locale] || page.subtitle?.[locale]

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
            {page.mainCategory && (
              <>
                <Link 
                  href={`/${locale}/diensten/${page.mainCategory.slug[locale]}`}
                  className="hover:text-blue-600"
                >
                  {page.mainCategory.title[locale]}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-gray-900 font-medium">{page.title[locale]}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      {heroImageUrl ? (
        <div className="relative h-[500px] w-full">
          <Image
            src={heroImageUrl}
            alt={page.hero?.image?.alt?.[locale] || heroTitle || ''}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4 max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {heroTitle}
              </h1>
              {heroSubtitle && (
                <p className="text-xl md:text-2xl text-white/90 mb-8">
                  {heroSubtitle}
                </p>
              )}
              {page.hero?.cta?.label?.[locale] && (
                <Link
                  href={page.hero.cta.link || '/contact'}
                  className={`inline-block px-8 py-4 rounded-lg font-semibold text-lg transition ${
                    page.hero.cta.style === 'primary'
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-white text-blue-600 hover:bg-gray-100'
                  }`}
                >
                  {page.hero.cta.label[locale]}
                </Link>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {heroTitle}
            </h1>
            {heroSubtitle && (
              <p className="text-xl text-white/90">
                {heroSubtitle}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Intro */}
      {page.intro?.[locale] && (
        <div className="bg-gray-50 py-16">
          <div className="max-w-5xl mx-auto px-4">
            <p className="text-xl text-gray-700 leading-relaxed whitespace-pre-line">
              {page.intro[locale]}
            </p>
          </div>
        </div>
      )}

      {/* Page Builder Sections */}
      {page.sections?.map((section: any) => {
        if (section._type === 'voordelenSection') {
          return (
            <div key={section._key} className="py-16">
              <div className="max-w-7xl mx-auto px-4">
                {section.title?.[locale] && (
                  <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">
                    {section.title[locale]}
                  </h2>
                )}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.voordelen?.map((voordeel: any, i: number) => (
                    <div key={i} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition">
                      {voordeel.icon && (
                        <div className="text-4xl mb-4">{voordeel.icon}</div>
                      )}
                      <h3 className="text-xl font-bold mb-2">{voordeel.title?.[locale]}</h3>
                      <p className="text-gray-600">{voordeel.description?.[locale]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        }

        if (section._type === 'ctaSection') {
          return (
            <div key={section._key} className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
              <div className="max-w-4xl mx-auto px-4 text-center">
                {section.title?.[locale] && (
                  <h3 className="text-3xl font-bold text-white mb-4">
                    {section.title[locale]}
                  </h3>
                )}
                {section.subtitle?.[locale] && (
                  <p className="text-blue-100 mb-8 text-lg">
                    {section.subtitle[locale]}
                  </p>
                )}
                {section.buttonText?.[locale] && section.buttonLink && (
                  <Link
                    href={section.buttonLink}
                    className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition text-lg"
                  >
                    {section.buttonText[locale]}
                  </Link>
                )}
              </div>
            </div>
          )
        }

        if (section._type === 'faqSection') {
          return (
            <div key={section._key} className="py-16 bg-gray-50">
              <div className="max-w-4xl mx-auto px-4">
                {section.title?.[locale] && (
                  <h2 className="text-3xl font-bold mb-8 text-gray-900">
                    {section.title[locale]}
                  </h2>
                )}
                <div className="space-y-4">
                  {section.faqs?.map((faq: any, i: number) => (
                    <details
                      key={i}
                      className="bg-white rounded-lg shadow-sm p-6 group"
                    >
                      <summary className="font-semibold text-lg cursor-pointer list-none flex items-center justify-between">
                        <span>{faq.question?.[locale]}</span>
                        <svg
                          className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </summary>
                      <p className="mt-4 text-gray-600 leading-relaxed whitespace-pre-line">
                        {faq.answer?.[locale]}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          )
        }

        return null
      })}
    </div>
  )
}