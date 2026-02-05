
import { MainServiceHero } from '@/app/components/services/mainServicePage/MainServiceHero'
import { getMainServicePage } from '@/sanity/queries/mainServicePageQueries'
import { notFound } from 'next/navigation'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'
import { MainServiceIntroSection } from '@/app/components/services/mainServicePage/MainServiceIntroSection'
import { MainSubServicesGrid } from '@/app/components/services/mainServicePage/MainSubServicesGrid'
import { MainServiceUspSection } from '@/app/components/services/mainServicePage/MainServiceUspSection'
import { MainServiceGallerySection } from '@/app/components/services/mainServicePage/MainServiceGallerySection'
import { MainServiceFaqSection } from '@/app/components/services/mainServicePage/MainServiceFaqSection'
import { MainServiceCtaSection } from '@/app/components/services/mainServicePage/MainServiceCtaSection'

type Props = {
  params: Promise<{ locale: 'nl' | 'en'; slug: string }>
}

export default async function MainServicePage({ params }: Props) {
  const { locale, slug } = await params
  const service = await getMainServicePage(slug)

  if (!service) notFound()

    // Debug: log de data
  console.log('Service data:', JSON.stringify(service, null, 2))
  console.log('Gallery section:', service.gallerySection)

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

      <span className="text-gray-900 font-medium">
        {service.title[locale]}
      </span>
    </nav>
  </div>
</div>

      <MainServiceHero
        title={service.hero?.title?.[locale] || service.title?.[locale]}
        subtitle={service.hero?.subtitle?.[locale] || service.subtitle?.[locale]}
        imageUrl={
          service.hero?.image?.asset
            ? urlFor(service.hero.image.asset).width(1920).url()
            : undefined
        }
        imageAlt={
          service.hero?.image?.alt?.[locale] ||
          service.hero?.image?.alt?.nl ||
          ''
        }
        trustHints={service.hero?.trustHints?.[locale]}
        stats={service.hero?.stats?.map((s: any) => ({
          value: s.value?.[locale],
          label: s.label?.[locale]
        }))}
        cta={
          service.hero?.cta
            ? {
                label: service.hero.cta.label?.[locale],
                link: service.hero.cta.link
              }
            : undefined
        }
      />

      <MainServiceIntroSection
  title={service.introSection?.title?.[locale]}
  content={service.introSection?.content?.[locale]}
/>


<MainSubServicesGrid
  title={service.gridSection?.title?.[locale]}
  subtitle={service.gridSection?.subtitle?.[locale]}
  items={(service.gridSection?.gridType === 'subservices' 
    ? service.gridSection?.subcategories 
    : service.gridSection?.services
  )?.filter((item: any) => item !== null)
    ?.map((item: any) => ({
      _id: item._id,
      title: item.title?.[locale],
      subtitle: item.subtitle?.[locale],
      slug: item.slug?.[locale],
      imageUrl: item.hero?.image?.asset ? urlFor(item.hero.image.asset).url() : undefined,
      imageAlt: item.hero?.image?.alt?.[locale]
    })) || []}
  locale={locale}
  parentSlug={service.slug[locale]}
/>

<MainServiceUspSection
  title={service.uspSection?.title?.[locale]}
  usps={service.uspSection?.usps?.[locale]}
/>

<MainServiceGallerySection
  title={service.gallerySection?.title?.[locale]}
  subtitle={service.gallerySection?.subtitle?.[locale]}
  items={service.gallerySection?.images?.map((img: any) => ({
    asset: urlFor(img.asset).width(900).url(),
    alt: img.alt?.[locale] || img.alt?.nl || ''
  }))}
/>

<MainServiceFaqSection
  title={service.faqSection?.title?.[locale]}
  items={service.faqSection?.items?.map((f: any) => ({
    question: f.question?.[locale] || f.question?.nl || '',
    answer: f.answer?.[locale] || f.answer?.nl || ''
  }))}
/>

<MainServiceCtaSection
  title={service.ctaSection?.title?.[locale]}
  subtitle={service.ctaSection?.subtitle?.[locale]}
  buttonLabel={service.ctaSection?.buttonLabel?.[locale]}
  buttonLink={service.ctaSection?.buttonLink}
  trustIndicators={service.ctaSection?.trustIndicators?.[locale]}
  locale={locale}
/>

      {/* Rest... */}
    </div>
  )
}
