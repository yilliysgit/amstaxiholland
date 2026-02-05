"use client"

import { useInView } from "@/hooks/pages/useInView"

type IntroSectionProps = {
  title?: string
  content?: string
}

export function MainServiceIntroSection({ title, content }: IntroSectionProps) {
  if (!title && !content) return null

  const { ref, inView } = useInView({ threshold: 0.15 })
  const paragraphs = content ? content.split("\n\n") : []

  return (
<section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center">
          
          {/* Decorative element - centered */}


          {/* Title - centered & larger */}
          {title && (
            <h2 
              className={[
                "text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 tracking-tight leading-tight mb-12",
                "transition-all duration-1000 delay-200",
                inView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              ].join(" ")}
            >
              {title}
            </h2>
          )}

          {/* Content - centered met max-width */}
          <div className="max-w-3xl mx-auto space-y-8">
            {paragraphs.map((paragraph, i) => (
              <p
                key={i}
                style={{ transitionDelay: `${400 + (i * 150)}ms` }}
                className={[
                  "text-xl sm:text-2xl text-gray-600 leading-relaxed font-light",
                  "transition-all duration-1000",
                  inView ? "translate-y-0 opacity-100 blur-0" : "translate-y-12 opacity-0 blur-sm"
                ].join(" ")}
              >
                {paragraph}
              </p>
            ))}
          </div>

       

        </div>
      </div>
    </section>
  )
}