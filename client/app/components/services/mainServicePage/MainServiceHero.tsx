"use client"

import Link from "next/link"
import { useInView } from "@/hooks/pages/useInView"

type MainServiceHeroProps = {
  title: string
  subtitle: string
  imageUrl?: string
  imageAlt?: string
  trustHints?: string[]
  cta?: {
    label: string
    link: string
  }
  stats?: {
    value: string
    label: string
  }[]
}

export function MainServiceHero({ 
  title, 
  subtitle,
  imageUrl,
  imageAlt,
  trustHints,
  cta,
  stats
}: MainServiceHeroProps) {
  const { ref, inView } = useInView({ threshold: 0.1 })


  return (
    <section className="relative overflow-hidden bg-slate-50">
      
      {/* Background image met sterke gradient */}
      {imageUrl && (
        <div className="absolute inset-0">
          <img
            src={imageUrl}
            alt={imageAlt || ""}
            className="w-full h-full object-cover"
          />
          {/* Sterke gradient overlay - links wit, rechts transparanter */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/60" />
        </div>
      )}

      {/* Content */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
          <div ref={ref} className="max-w-2xl">

            {/* Small eyebrow tag */}
            <div
              style={{ transitionDelay: '0ms' }}
              className={[
                "mb-6 inline-block text-xs font-medium uppercase tracking-wider text-slate-600",
                "transition-all duration-700 ease-out",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              ].join(" ")}
            >
              Premium Taxi Amsterdam
            </div>

            {/* Title */}
            <h1 
              style={{ transitionDelay: '100ms' }}
              className={[
                "text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]",
                "transition-all duration-700 ease-out",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              ].join(" ")}
            >
              {title}
            </h1>

            {/* Subtitle */}
            <p 
              style={{ transitionDelay: '200ms' }}
              className={[
                "text-xl lg:text-2xl text-slate-600 leading-relaxed mb-10",
                "transition-all duration-700 ease-out",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              ].join(" ")}
            >
              {subtitle}
            </p>

            {/* Trust hints - horizontaal met bullets */}
            {trustHints && trustHints.length > 0 && (
              <div 
                style={{ transitionDelay: '300ms' }}
                className={[
                  "flex flex-wrap items-center gap-x-6 gap-y-2 mb-10 text-sm text-slate-600",
                  "transition-all duration-700 ease-out",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                ].join(" ")}
              >
                {trustHints.map((hint, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{hint}</span>
                  </div>
                ))}
              </div>
            )}

            {/* CTA button - home page style */}
            {cta && (
              <div 
                style={{ transitionDelay: '400ms' }}
                className={[
                  "flex items-center gap-4",
                  "transition-all duration-700 ease-out",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                ].join(" ")}
              >
                <Link
                  href={cta.link}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-8 py-4 text-base font-semibold text-white hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10"
                >
                  {cta.label}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            )}

            {/* Stats - onderaan zoals op home */}
            {stats && stats.length > 0 && (
              <div 
                style={{ transitionDelay: '500ms' }}
                className={[
                  "mt-16 flex flex-wrap gap-12 pt-8 border-t border-slate-200",
                  "transition-all duration-700 ease-out",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                ].join(" ")}
              >
                {stats.map((stat, i) => (
                  <div key={i}>
                    <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-slate-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  )
}