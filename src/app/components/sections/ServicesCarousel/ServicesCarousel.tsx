// @/components/sections/ServicesCarousel.tsx
"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ServiceCard from "../../ui/cards/ServiceCard/ServiceCard";
import { taxiServicesData } from "@/data/services/services.data";

export default function ServicesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  // Responsive cards per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, taxiServicesData.length - cardsPerView);

  const goToNext = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const goToPrev = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  return (
    <section className="section-spacing-md bg-gray-50">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Onze Diensten
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professioneel taxi vervoer voor elke gelegenheid in Amsterdam en omgeving
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Cards Container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out gap-6"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
                width: `${(taxiServicesData.length / cardsPerView) * 100}%`
              }}
            >
              {taxiServicesData.map((service) => (
                <div 
                  key={service.id} 
                  className="flex-shrink-0"
                  style={{ width: `${100 / taxiServicesData.length}%` }}
                >
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            disabled={currentIndex === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
          >
            <ChevronLeft className="h-6 w-6 text-navy-700" />
          </button>

          <button
            onClick={goToNext}
            disabled={currentIndex >= maxIndex}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
          >
            <ChevronRight className="h-6 w-6 text-navy-700" />
          </button>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-navy-700 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}