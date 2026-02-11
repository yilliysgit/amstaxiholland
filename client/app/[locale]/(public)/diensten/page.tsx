// app/[locale]/diensten/page.tsx

import { ServicesOverview } from "@/app/components/ServicesOverview"

type Props = {
  params: Promise<{ locale: 'nl' | 'en' }>
}

export default async function DienstenPage({ params }: Props) {
  const { locale } = await params

  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-10">
        {locale === 'nl' ? 'Onze Diensten' : 'Our Services'}
      </h1>

      <ServicesOverview locale={locale} />
    </main>
  )
}