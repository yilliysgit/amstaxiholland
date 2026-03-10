import { ArrowRight } from "lucide-react"

type Locale = "nl" | "en"

type TourCtaSectionProps = {
  title?: { nl?: string; en?: string }
  subtitle?: { nl?: string; en?: string }
  buttonLabel?: { nl?: string; en?: string }
  buttonHref?: string
  locale: "nl" | "en"
}

export default function TourCtaSection({
  title,
  subtitle,
  buttonLabel,
  buttonHref,
  locale,
}: TourCtaSectionProps) {
  const t = title?.[locale]
  const body = subtitle?.[locale]
  const btn = buttonLabel?.[locale]

  if (!t && !body && !btn) return null

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="rounded-3xl bg-white/10 border border-white/15 p-8 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            {t && (
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                {t}
              </h2>
            )}
            {body && (
              <p className="text-lg text-white/80 leading-relaxed whitespace-pre-line">
                {body}
              </p>
            )}
          </div>

          {btn && buttonHref && (
            <a
              href={buttonHref}
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-xl transition group w-full lg:w-auto"
            >
              {btn}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          )}
        </div>
      </div>
    </section>
  )
}