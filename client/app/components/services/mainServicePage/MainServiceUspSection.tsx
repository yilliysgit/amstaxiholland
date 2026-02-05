"use client"

import { useInView } from "@/hooks/pages/useInView"
import { CheckCircle2 } from "lucide-react"

type UspSectionProps = {
  title?: string
  usps?: string[]
}

export function MainServiceUspSection({ title, usps }: UspSectionProps) {
  if (!title && (!usps || usps.length === 0)) return null

  const { ref, inView } = useInView({ threshold: 0.15 })

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
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

          {/* USPs Grid */}
          {usps && usps.length > 0 && (
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {usps.map((usp, i) => (
                <div
                  key={i}
                  style={{ transitionDelay: `${400 + (i * 100)}ms` }}
                  className={[
                    "flex items-start gap-4 p-6 glass-effect rounded-xl shadow-sm hover:shadow-md",
                    "transition-all duration-1000",
                    inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  ].join(" ")}
                >
                  {/* Icon */}
                  <div className="flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-6 h-6 text-gray-800" />
                  </div>

                  {/* Text */}
                  <span className="text-lg text-gray-700 leading-relaxed font-light">
                    {usp}
                  </span>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  )
}