"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

type FAQItem = {
  question: {
    nl?: string
    en?: string
  }
  answer: {
    nl?: string
    en?: string
  }
}

type TourFaqProps = {
  title?: {
    nl?: string
    en?: string
  }
  items?: FAQItem[]
  locale: "nl" | "en"
}

export default function TourFaq({ title, items = [], locale }: TourFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (!items.length) return null

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* Title */}
        {title?.[locale] && (
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            {title[locale]}
          </h2>
        )}

        {/* FAQ items */}
        <div className="space-y-4">
          {items.map((item, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={index}
                className="bg-white border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="w-full flex items-center justify-between text-left px-6 py-5 font-semibold text-lg"
                >
                  {item.question?.[locale]}

                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                    {item.answer?.[locale]}
                  </div>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}