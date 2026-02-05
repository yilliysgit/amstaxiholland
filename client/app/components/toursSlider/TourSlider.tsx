// client/app/components/tours/TourSlider.tsx
'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Clock, MapPin, Star, ArrowRight } from 'lucide-react';
import type { Tour, TourCategory } from '@/types/tourSlider/tourSlider.type';
import { formatPriceEUR, formatDuration } from '@/types/tourSlider/tourSlider.type';

interface TourSliderProps {
  tours: Tour[];
  vehicle: 'sedan' | 'van';
}

export default function TourSlider({ tours, vehicle }: TourSliderProps) {
  const t = useTranslations('Tours');
  const locale = useLocale() as 'nl' | 'en';
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleBookTour = (tourSlug: string) => {
    console.log(`Booking tour: ${tourSlug} with vehicle: ${vehicle}`);
  };

  // Helper om category te vertalen
  const translateCategory = (category: TourCategory) => {
    return t(`categories.${category}`);
  };

  return (
    <section className="relative bg-gradient-mercedes-subtle overflow-hidden py-12 sm:py-16 lg:py-20">
      {/* Subtle pattern overlay */}
      <div className="pattern-overlay pointer-events-none absolute inset-0 opacity-50" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="px-4 sm:px-6 lg:px-12 mb-10 sm:mb-12">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-4">
              {/* Kleine overline badge */}
              <div className="inline-flex items-center glass-effect px-4 py-1.5 rounded-full border border-gray-200/80 shadow-sm mb-1">
                <span className="text-[11px] tracking-[0.22em] font-semibold text-gray-700 uppercase">
                  Premium Tours
                </span>
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-2 tracking-tight">
                  {t('sectionTitle')}{' '}
                  <span className="text-gray-700">
                    {t('sectionTitleAccent')}
                  </span>
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl">
                  {t('sectionSubtitle')}
                </p>
              </div>
            </div>

            {/* Navigation Arrows (desktop) */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => swiper?.slidePrev()}
                className="
                  w-11 h-11 lg:w-12 lg:h-12 rounded-full
                  glass-effect bg-white/85
                  border border-gray-200/80
                  flex items-center justify-center
                  hover:-translate-y-0.5 hover:shadow-luxury
                  transition-all duration-200
                "
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5 text-gray-800" />
              </button>
              <button
                onClick={() => swiper?.slideNext()}
                className="
                  w-11 h-11 lg:w-12 lg:h-12 rounded-full
                  glass-effect bg-white/85
                  border border-gray-200/80
                  flex items-center justify-center
                  hover:-translate-y-0.5 hover:shadow-luxury
                  transition-all duration-200
                "
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 text-gray-800" />
              </button>
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1.1}
            centeredSlides={false}
            onSwiper={setSwiper}
            onSlideChange={(swiperInstance) => setCurrentSlide(swiperInstance.activeIndex)}
            className="tour-slider pb-4"
            breakpoints={{
              640: { slidesPerView: 1.4, spaceBetween: 20 },
              768: { slidesPerView: 2.1, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 28, centeredSlides: false },
              1280: { slidesPerView: 3.2, spaceBetween: 32 },
            }}
            style={{
              paddingLeft: '24px',
              paddingRight: '24px',
            }}
          >
            {tours.map((tour) => {
              const firstCategory = Array.isArray(tour.category)
                ? tour.category[0]
                : tour.category;

              return (
                <SwiperSlide key={tour.id}>
                  <div className="group h-full">
                    <div
                      className="
                        bg-gradient-premium-card glass-effect
                        rounded-3xl overflow-hidden
                        shadow-luxury border border-gray-200/80
                        transition-all duration-500
                        hover:-translate-y-1 hover:shadow-2xl
                      "
                    >
                      {/* Image Container */}
                      <div className="relative w-full h-64 lg:h-72 overflow-hidden">
                        <Image
                            src={tour.imageSrc}
                            alt={tour.imageAlt}   // 👈 hier uit je data
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-900 border border-white/60 shadow-sm">
                            {translateCategory(firstCategory)}
                          </span>
                        </div>

                        {/* Seasonal Badge */}
                        {tour.isSeasonal && (
                          <div className="absolute top-4 right-4">
                            <span className="px-3 py-1.5 bg-yellow-400/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-900 border border-yellow-300/60 shadow-sm">
                              {t('seasonal')}
                            </span>
                          </div>
                        )}

                        {/* Price Tag */}
                        <div className="absolute bottom-4 right-4">
                          <div className="bg-gray-950/80 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/10 shadow-md">
                            <span className="text-xs text-gray-300 block mb-0.5">
                              {t('from')} {/* bestaand key bij jou */}
                            </span>
                            <span className="text-white font-semibold text-lg tracking-tight">
                              {formatPriceEUR(tour.basePrice?.[vehicle] ?? 0, locale)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-4">
                        <div>
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1.5 group-hover:text-gray-800 transition-colors line-clamp-2">
                            {t(`tours.${tour.slug}.name`)}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                            {t(`tours.${tour.slug}.description`)}
                          </p>
                        </div>

                        {/* Tour Details */}
                        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-600">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            <span>{formatDuration(tour.durationHours, locale)}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            <span>{t(`country.${tour.cardData.country}`)}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">
                              {tour.cardData.rating.score}
                            </span>
                          </div>
                        </div>

                        {/* Book Button */}
                        <button
                          onClick={() => handleBookTour(tour.slug)}
                          className="btn-gradient-primary w-full mt-1 flex items-center justify-center gap-2 text-sm sm:text-base"
                        >
                          {t('bookNow')}
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-6 gap-2">
            {tours.map((_, index) => {
              const isActive = Math.floor(currentSlide) === index;
              return (
                <button
                  key={index}
                  onClick={() => swiper?.slideTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={
                    'h-2 rounded-full transition-all duration-300 ' +
                    (isActive ? 'bg-gray-900 w-7' : 'bg-gray-300 w-2 hover:bg-gray-400')
                  }
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
