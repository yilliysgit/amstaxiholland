"use client"

import { useInView } from "@/hooks/pages/useInView"
import { useState } from "react"

type GalleryItem = {
  asset: any
  alt?: string
}

type GallerySectionProps = {
  title?: string
  subtitle?: string
  items?: GalleryItem[]
}

export function MainServiceGallerySection({ title, subtitle, items }: GallerySectionProps) {
  if (!items || items.length === 0) return null

  const { ref, inView } = useInView({ threshold: 0.1 })
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div ref={ref}>
          
          {/* Title */}
          {title && (
            <h2 
              className={[
                "text-4xl sm:text-5xl font-light text-gray-900 tracking-tight mb-4 text-center",
                "transition-all duration-1000 delay-200",
                inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              ].join(" ")}
            >
              {title}
            </h2>
          )}

          {/* Subtitle */}
          {subtitle && (
            <p 
              className={[
                "text-lg sm:text-xl text-gray-600 font-light text-center mb-12 max-w-3xl mx-auto",
                "transition-all duration-1000 delay-400",
                inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              ].join(" ")}
            >
              {subtitle}
            </p>
          )}

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {items.map((item, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                style={{ transitionDelay: `${600 + (i * 80)}ms` }}
                className={[
                  "group relative overflow-hidden rounded-2xl bg-gray-100 cursor-pointer",
                  "transition-all duration-1000 hover:scale-[1.02]",
                  inView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                ].join(" ")}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.asset}
                    alt={item.alt || ''}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Zoom icon on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="glass-effect rounded-full p-3">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <img
            src={items[selectedImage].asset}
            alt={items[selectedImage].alt || ''}
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}