'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { reviews } from '@/data/reviews/reviews.data';

export default function Reviews() {
  const t = useTranslations('Reviews');
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-[#F8F9FA] via-[#ECEFF1] to-[#E8EAED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Header */}
        <div className={`text-center mb-12 lg:mb-16 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} transition-all duration-700`}>
          {/* Overline */}
          <p className="text-[#667085] text-sm sm:text-base font-medium tracking-[0.25em] uppercase mb-4">
            {t('overline')}
          </p>
          
          {/* Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1D1F] leading-tight tracking-tight mb-4">
            {t('title')}
          </h2>

          {/* Rating summary */}
          <div className="flex items-center justify-center gap-2 text-[#4A5568] text-sm sm:text-base">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="font-semibold text-[#2C3135]">{t('ratingScore')}</span>
            <span className="hidden sm:inline">• {t('ratingCount')}</span>
          </div>
        </div>

        {/* Mobile Slider */}
        <div className="lg:hidden relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {reviews.map((review, index) => (
                <div
                  key={review.id}
                  className="w-full flex-shrink-0 px-2"
                >
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                    {/* Quote icon */}
                    <Quote className="w-10 h-10 text-[#2C3135]/20 mb-4" />
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>

                    {/* Review text */}
                    <p className="text-[#4A5568] leading-relaxed mb-6 text-base">
                      "{t(`reviews.${review.slug}.text`)}"
                    </p>

                    {/* Author info */}
                    <div className="pt-4 border-t border-gray-200/50">
                      <div className="font-semibold text-[#2C3135]">{review.name}</div>
                      <div className="text-sm text-[#667085]">{review.company}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-[#2C3135] flex items-center justify-center hover:bg-[#1A1D1F] transition-all duration-200 shadow-lg"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            
            {/* Dots */}
            <div className="flex items-center gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? 'bg-[#2C3135] w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-[#2C3135] flex items-center justify-center hover:bg-[#1A1D1F] transition-all duration-200 shadow-lg"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className={`bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:bg-white hover:border-gray-300/70 hover:shadow-lg transition-all duration-300 flex flex-col ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-[#2C3135]/20 mb-4" />
              
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Review text */}
              <p className="text-[#4A5568] leading-relaxed mb-6 flex-grow text-sm">
                "{t(`reviews.${review.slug}.text`)}"
              </p>

              {/* Author info */}
              <div className="pt-4 border-t border-gray-200/50">
                <div className="font-semibold text-[#2C3135]">{review.name}</div>
                <div className="text-sm text-[#667085]">{review.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}