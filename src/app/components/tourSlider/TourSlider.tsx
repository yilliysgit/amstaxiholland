'use client';

import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Clock, MapPin, Star, ArrowRight } from 'lucide-react';
import type { Tour } from '@/types/tours/tours.type';
import { formatPriceEUR, formatDuration } from '@/types/tours/tours.type';

interface TourSliderProps {
  tours: Tour[];
  vehicle: 'sedan' | 'van';
}

export default function TourSlider({ tours, vehicle }: TourSliderProps) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleBookTour = (tourSlug: string) => {
    // Hier kun je de booking logica implementeren
    console.log(`Booking tour: ${tourSlug} with vehicle: ${vehicle}`);
    // Bijvoorbeeld: router.push(`/booking/${tourSlug}?vehicle=${vehicle}`);
  };

  return (
    <div className="relative py-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
              Premium <span className="text-gray-600">Tours</span>
            </h2>
            <p className="text-lg text-gray-600">Ontdek Nederland in absolute luxe</p>
          </div>
          
          {/* Navigation Arrows */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => swiper?.slidePrev()}
              className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center hover:bg-white hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={() => swiper?.slideNext()}
              className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center hover:bg-white hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Slider */}
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1.2}
          centeredSlides={false}
          onSwiper={setSwiper}
          onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
          className="tour-slider"
          breakpoints={{
            640: { slidesPerView: 1.5, spaceBetween: 20 },
            768: { slidesPerView: 2.2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 32, centeredSlides: false },
            1280: { slidesPerView: 3.2, spaceBetween: 32 },
          }}
          style={{
            paddingLeft: '24px',
            paddingRight: '24px',
          }}
        >
          {tours.map((tour, index) => (
            <SwiperSlide key={tour.id}>
              <div className="group">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100/50 hover:scale-[1.02]">
                  {/* Image Container */}
                  <div className="relative w-full h-64 overflow-hidden">
                    <Image
                      src={tour.imageSrc}
                      alt={tour.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-800 border border-white/20">
                        {tour.category}
                      </span>
                    </div>

                    {/* Seasonal Badge */}
                    {tour.isSeasonal && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1.5 bg-yellow-400/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-800 border border-yellow-300/20">
                          Seizoen
                        </span>
                      </div>
                    )}

                    {/* Price Tag */}
                    <div className="absolute bottom-4 right-4">
                      <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/10">
                        <span className="text-white font-bold text-lg">
                          {formatPriceEUR(tour.basePrice[vehicle])}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-gray-700 transition-colors">
                        {tour.name}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                        {tour.description}
                      </p>
                    </div>

                    {/* Tour Details */}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatDuration(tour.durationHours)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>Nederland</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>9.3</span>
                      </div>
                    </div>

                    {/* Book Button */}
                    <button
                      onClick={() => handleBookTour(tour.slug)}
                      className="w-full mt-4 bg-gradient-to-r from-gray-800 to-gray-700 text-white py-3 px-6 rounded-2xl font-semibold hover:from-gray-700 hover:to-gray-600 transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-lg hover:shadow-xl"
                    >
                      Boek nu
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-8 gap-2">
          {tours.map((_, index) => (
            <button
              key={index}
              onClick={() => swiper?.slideTo(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                Math.floor(currentSlide) === index
                  ? 'bg-gray-800 w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        .tour-slider .swiper-slide {
          height: auto;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}