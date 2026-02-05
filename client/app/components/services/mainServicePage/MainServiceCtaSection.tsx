"use client"

import { useInView } from "@/hooks/pages/useInView"
import Link from "next/link"
import { ArrowRight, Phone, Check } from "lucide-react"

type CtaSectionProps = {
  title?: string
  subtitle?: string
  buttonLabel?: string
  buttonLink?: string
  trustIndicators?: string[]
  locale?: 'nl' | 'en'
}

export function MainServiceCtaSection({
  title,
  subtitle,
  buttonLabel,
  buttonLink,
  trustIndicators,
  locale = 'nl'
}: CtaSectionProps) {
  if (!title && !subtitle && !buttonLabel) return null

  const { ref, inView } = useInView({ threshold: 0.2 })

  // Fallback trust indicators als er geen zijn opgegeven
  const defaultTrustIndicators = locale === 'nl' 
    ? ['Gratis offerte', 'Geen verplichtingen', '24/7 bereikbaar']
    : ['Free quote', 'No obligations', '24/7 available']

  const displayTrustIndicators = trustIndicators && trustIndicators.length > 0 
    ? trustIndicators 
    : defaultTrustIndicators

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-gradient-mercedes-premium">
      
      {/* Background accents - matching home */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-white/10 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-gray-100/5 to-transparent blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center">
          
          {/* Title */}
          {title && (
            <h2 
              className={[
                "text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 tracking-tight mb-6",
                "transition-all duration-1000 delay-200",
                inView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              ].join(" ")}
            >
              {title}
            </h2>
          )}

          {/* Subtitle */}
          {subtitle && (
            <p 
              className={[
                "text-xl sm:text-2xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto mb-12",
                "transition-all duration-1000 delay-400",
                inView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              ].join(" ")}
            >
              {subtitle}
            </p>
          )}

          {/* CTA Buttons */}
          {buttonLabel && buttonLink && (
            <div 
              className={[
                "flex flex-col sm:flex-row items-center justify-center gap-4",
                "transition-all duration-1000 delay-600",
                inView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              ].join(" ")}
            >
              {/* Primary CTA */}
              <Link
                href={buttonLink}
                className="btn-gradient-primary flex items-center gap-2 group"
              >
                {buttonLabel}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Secondary CTA - Contact */}
              
                <a href="tel:+31645014704"
                className="btn-gradient-secondary flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                {locale === 'nl' ? 'Direct bellen' : 'Call now'}
              </a>
            </div>
          )}

          {/* Trust indicators */}
          {displayTrustIndicators && displayTrustIndicators.length > 0 && (
            <div 
              className={[
                "mt-16 pt-12 border-t border-gray-200 flex flex-wrap items-center justify-center gap-8",
                "transition-all duration-1000 delay-800",
                inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              ].join(" ")}
            >
              {displayTrustIndicators.map((indicator, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">{indicator}</span>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  )
}