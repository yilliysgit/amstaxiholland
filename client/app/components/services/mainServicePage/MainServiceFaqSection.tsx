"use client"

import { useInView } from "@/hooks/pages/useInView"
import { useState } from "react"

type FaqItem = {
  question?: string
  answer?: string
}

type FaqSectionProps = {
  title?: string
  items?: FaqItem[]
}

export function MainServiceFaqSection({ title, items }: FaqSectionProps) {
  const cleanedItems = (items || []).filter((i) => i?.question || i?.answer)
  if (!title && cleanedItems.length === 0) return null

  const { ref, inView } = useInView({ threshold: 0.1 })
  const [openIndex, setOpenIndex] = useState<number | null>(0) // First item open by default

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref}>
          
          {/* Title */}
          {title && (
            <h2 
              className={[
                "text-4xl sm:text-5xl font-light text-gray-900 tracking-tight mb-12 text-center",
                "transition-all duration-1000 delay-200",
                inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              ].join(" ")}
            >
              {title}
            </h2>
          )}

          {/* FAQ Items */}
          <div className="space-y-4">
            {cleanedItems.map((item, i) => (
              <div
                key={i}
                style={{ transitionDelay: `${400 + (i * 100)}ms` }}
                className={[
                  "glass-effect rounded-2xl overflow-hidden shadow-sm",
                  "transition-all duration-1000",
                  inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                ].join(" ")}
              >
                <button
                  onClick={() => toggleItem(i)}
                  className="w-full text-left p-6 sm:p-8 flex items-start justify-between gap-4 hover:bg-gray-50/50 transition-colors"
                >
                  {/* Question */}
                  <h3 className="text-lg sm:text-xl font-medium text-gray-900 pr-4">
                    {item.question}
                  </h3>

                  {/* Icon */}
                  <svg
                    className={[
                      "w-6 h-6 text-gray-600 flex-shrink-0 transition-transform duration-300",
                      openIndex === i ? "rotate-180" : ""
                    ].join(" ")}
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
                </button>

                {/* Answer - Collapsible */}
                <div
                  className={[
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    openIndex === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  ].join(" ")}
                >
                  {item.answer && (
                    <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                      <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-light whitespace-pre-line">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}