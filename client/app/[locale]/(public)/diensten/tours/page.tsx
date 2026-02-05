// app/[locale]/diensten/tours/page.tsx
import { getAllTours } from '@/sanity/queries/tourServicePageQueries'
import { ToursGridOverViewPage } from '@/app/components/tours/ToursGridOverViewPage'

type Props = {
  params: Promise<{ locale: 'nl' | 'en' }>
}

export default async function ToursOverviewPage({ params }: Props) {
  const { locale } = await params
  const tours = await getAllTours()

  console.log('🔍 Tours fetched:', tours?.length, tours)

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Tours
          </h1>
          <p className="text-xl text-gray-600">
            {locale === 'nl'
              ? 'Ontdek de unieke attracties die Nederland heeft te bieden'
              : 'Discover the unique attractions the Netherlands has to offer'}
          </p>
        </div>

        {/* Debug info */}
        <div className="mb-8 p-4 bg-blue-50 rounded-lg">
          <p className="font-bold">Debug:</p>
          <p>Tours found: {tours?.length || 0}</p>
          <details className="mt-2">
            <summary className="cursor-pointer text-blue-600">Show raw data</summary>
            <pre className="text-xs mt-2 overflow-auto max-h-96">
              {JSON.stringify(tours, null, 2)}
            </pre>
          </details>
        </div>

        {/* Tours Grid Component */}
        <ToursGridOverViewPage tours={tours || []} locale={locale} />
      </div>
    </div>
  )
}