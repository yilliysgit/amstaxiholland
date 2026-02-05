// client/app/components/vehicleTypeSelector/VehicleTypeSelector.tsx
'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Star, Clock, Shield } from 'lucide-react';
import { vehicleServices } from '@/data/vehicleTypeSelector/VehicleTypeSelector.data';
import VehicleCard from './VehicleCard';
import VehicleTabButton from './VehicleTabButton';
import VehicleFeatures from './VehicleFeatures';

export default function VehicleTypeSelector() {
  const t = useTranslations('HomePage.vehicleTypeSelector');
  const [selectedService, setSelectedService] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    // Set default for desktop only
    if (window.innerWidth >= 1024) {
      setSelectedService('business');
    }
  }, []);

  const selectedServiceData = vehicleServices.find(s => s.id === selectedService);

  return (
    <section className="relative bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617]">
      {/* Subtle overlay */}
      <div className="pattern-overlay pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
        {/* Header */}
        <div
          className={`
            transition-all duration-700 mb-8 sm:mb-12
            ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
          `}
        >
          {/* Rating Badge */}
          <div className="flex items-center justify-center mb-6">
            <div className="glass-effect-dark flex items-center gap-2 rounded-full px-4 py-2 shadow-luxury border border-white/10">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="font-semibold text-gray-50 text-sm sm:text-base">9.3</span>
              <span className="text-gray-300 text-xs sm:text-sm hidden sm:inline">
                • {t('rating')}
              </span>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-50 mb-3 tracking-tight">
              {t('sectionTitle')}
            </h2>
            <p className="text-sm sm:text-lg lg:text-xl text-gray-300 max-w-xl mx-auto font-light px-2">
              {t('sectionSubtitle')}
              <span className="text-gray-100 font-medium block sm:inline">
                {' '}
                {t('sectionSubtitleHighlight')}
              </span>
            </p>
          </div>

          {/* Trust indicators - Desktop only */}
          <div className="hidden lg:flex items-center justify-center gap-8 mb-4 text-gray-200">
            <div className="flex items-center gap-2 glass-effect-dark px-4 py-2 rounded-full border border-white/10">
              <Clock className="w-5 h-5" />
              <span className="text-sm">{t('service247')}</span>
            </div>
            <div className="flex items-center gap-2 glass-effect-dark px-4 py-2 rounded-full border border-white/10">
              <Shield className="w-5 h-5" />
              <span className="text-sm">{t('fullyInsured')}</span>
            </div>
          </div>
        </div>

        {/* Service Selection */}
        <div
          className={`
            transition-all duration-700 delay-200
            ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
          `}
        >
          {/* Mobile: Accordion */}
          <div className="lg:hidden space-y-3 mb-8">
            {vehicleServices.map((service) => (
              <VehicleCard
                key={service.id}
                service={service}
                isActive={selectedService === service.id}
                onToggle={() =>
                  setSelectedService(selectedService === service.id ? '' : service.id)
                }
              />
            ))}
          </div>

          {/* Desktop: Horizontal Tabs */}
          <div className="hidden lg:block">
            <div className="glass-effect bg-gradient-premium-card/80 rounded-3xl overflow-hidden shadow-luxury border border-gray-200/70">
              {/* Service Tabs */}
              <div className="flex border-b border-gray-200/80 bg-white/70">
                {vehicleServices.map((service) => (
                  <VehicleTabButton
                    key={service.id}
                    service={service}
                    isActive={selectedService === service.id}
                    onClick={() => setSelectedService(service.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Features Details - Desktop Only */}
          {selectedServiceData && (
            <div className="hidden lg:block">
              <VehicleFeatures service={selectedServiceData} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
