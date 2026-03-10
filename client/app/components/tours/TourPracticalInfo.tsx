import { Info } from "lucide-react"

type Locale = "nl" | "en"

type PracticalInfoProps = {
  title?: { nl?: string; en?: string }
  content?: { nl?: string; en?: string }
  tip?: { nl?: string; en?: string }
  locale: Locale
}

export default function TourPracticalInfo({
  title,
  content,
  tip,
  locale,
}: PracticalInfoProps) {
  const sectionTitle = title?.[locale]
  const sectionContent = content?.[locale]
  const sectionTip = tip?.[locale]

  // Als er niks is, render niets
  if (!sectionTitle && !sectionContent && !sectionTip) return null

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
        {sectionTitle && (
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            {sectionTitle}
          </h2>
        )}

        {sectionContent && (
          <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
            {sectionContent}
          </div>
        )}

        {sectionTip && (
          <div className="mt-10 rounded-2xl border bg-gray-50 p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Info className="w-5 h-5 text-green-700" />
              </div>

              <div>
                <div className="text-sm font-semibold text-gray-900 mb-1">
                  {locale === "nl" ? "Tip" : "Tip"}
                </div>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {sectionTip}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}