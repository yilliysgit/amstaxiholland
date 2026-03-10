// components/tours/TourSeoContentSection.tsx
type Props = {
  title?: { nl?: string; en?: string } | null
  content?: { nl?: string; en?: string } | null
  locale: "nl" | "en"
}

export default function TourSeoContentSection({ title, content, locale }: Props) {
  const t = title?.[locale]
  const body = content?.[locale]

  if (!t && !body) return null

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
        {t && (
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
            {t}
          </h2>
        )}
        {body && (
          <div className="text-gray-600 leading-relaxed whitespace-pre-line space-y-4">
            {body.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}