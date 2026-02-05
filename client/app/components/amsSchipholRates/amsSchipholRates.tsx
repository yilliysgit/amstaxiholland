'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { AmsterdamLocations } from '@/data/amsSchipholRates/AmsSchipholRates.data';
import SchipholLogo from '@/app/assets/icons/SchipholIcon';
import VehicleToggle from './VehicleToggle';
import AmsSchipholRateItem from './AmsSchipholRateItem';
import HighlightCard from './AmsSchipholHighlightCard';
import { ChevronUp, ChevronDown, ArrowRight } from 'lucide-react';

const ROTATE_MS = 2000;

const AmsSchipholRates = () => {
  const t = useTranslations('HomePage.amsSchipholRates');
  const [selectedCarType, setSelectedCarType] = useState<'sedan' | 'van'>('sedan');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  const next = () => setCurrentIndex((i) => (i + 1) % AmsterdamLocations.length);
  const prev = () =>
    setCurrentIndex((i) => (i - 1 + AmsterdamLocations.length) % AmsterdamLocations.length);

  // Auto-advance met pauze
  useEffect(() => {
    if (paused) return;
    timerRef.current = window.setInterval(next, ROTATE_MS);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [paused]);

  // Pauzeer bij keyboard interactie
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        setPaused(true);
        prev();
      } else if (e.key === 'ArrowDown') {
        setPaused(true);
        next();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // 3 zichtbare items per groep
  const getVisibleItems = () => {
    const items = [];
    const groupStart = Math.floor(currentIndex / 3) * 3;
    
    for (let i = 0; i < 3; i++) {
      const index = (groupStart + i) % AmsterdamLocations.length;
      items.push({
        location: AmsterdamLocations[index],
        index,
        isSelected: index === currentIndex,
      });
    }
    return items;
  };

  const groupKey = Math.floor(currentIndex / 3);
  const visibleItems = getVisibleItems();
  const selectedLocation = AmsterdamLocations[currentIndex];

  return (
    <div className="relative bg-gradient-mercedes-subtle">
      <div className="pattern-overlay pointer-events-none absolute inset-0 opacity-60" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-20">
        {/* Header - Verschillende layout voor mobiel vs desktop */}
        <header className="mb-10 lg:mb-12">
          {/* Mobile Layout */}
          <div className="lg:hidden flex flex-col gap-6">
            {/* Titel met icon horizontaal - bovenaan */}
            <div className="flex items-center gap-3 glass-effect bg-gradient-premium-card text-gray-900 px-5 py-4 rounded-2xl border border-gray-200/80 shadow-luxury">
              <SchipholLogo className="w-10 h-10 text-gray-700 flex-shrink-0" />
              <div className="text-left">
                <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
                  {t('title')}
                </h2>
                <p className="text-sm text-gray-600">
                  {t('subtitle')}
                </p>
              </div>
            </div>

            {/* Vehicle Toggle onder de titel */}
            <div className="flex justify-center">
              <VehicleToggle
                isVan={selectedCarType === 'van'}
                onToggle={(val) => setSelectedCarType(val ? 'van' : 'sedan')}
              />
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-between gap-4 glass-effect bg-gradient-premium-card text-gray-900 px-6 py-5 rounded-2xl border border-gray-200/80 shadow-luxury">
            <div className="flex items-center gap-3">
              <SchipholLogo className="w-10 h-10 text-gray-700" />
              <div className="text-left">
                <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
                  {t('title')}
                </h2>
                <p className="text-sm text-gray-600">
                  {t('subtitle')}
                </p>
              </div>
            </div>

            <VehicleToggle
              isVan={selectedCarType === 'van'}
              onToggle={(val) => setSelectedCarType(val ? 'van' : 'sedan')}
            />
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Tarievenlijst - zichtbaar op mobiel en desktop */}
          <div
            className="glass-effect bg-gradient-premium-card rounded-2xl shadow-luxury border border-gray-200/80 p-6 sm:p-7 lg:p-8"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
                {t('ratesOverview')}
              </h2>

              {/* Pijltjes - alleen desktop */}
              <div className="hidden lg:flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setPaused(true);
                    prev();
                  }}
                  aria-label={t('previous')}
                  className="p-2 rounded-lg border border-gray-200/80 bg-white/80 hover:bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-1"
                >
                  <ChevronUp className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPaused(true);
                    next();
                  }}
                  aria-label={t('next')}
                  className="p-2 rounded-lg border border-gray-200/80 bg-white/80 hover:bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-1"
                >
                  <ChevronDown className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>

            {/* List met fade animatie bij groepswisseling */}
            <div 
              key={groupKey}
              className="flex flex-col gap-4 animate-fade-in"
            >
              {visibleItems.map(({ location, index, isSelected }) => (
                <div
                  key={`${location.name}-${index}`}
                  onClick={() => {
                    setPaused(true);
                    setCurrentIndex(index);
                  }}
                  className={[
                    'cursor-pointer transition-all duration-300 rounded-xl',
                    isSelected
                      ? 'ring-2 ring-gray-900 bg-gray-50/90 shadow-luxury'
                      : 'opacity-85 hover:opacity-100 hover:bg-gray-50/70'
                  ].join(' ')}
                >
                  <AmsSchipholRateItem
                    location={location}
                    isVan={selectedCarType === 'van'}
                    isSelected={isSelected}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Highlight Card - alleen desktop */}
          <div className="hidden lg:block transition-opacity duration-300">
            <HighlightCard 
              location={selectedLocation} 
              isVan={selectedCarType === 'van'} 
            />
          </div>
        </div>

        {/* Reserveer Nu button - alleen mobiel, onder de grid */}
        <div className="lg:hidden mt-6">
          <button className="btn-gradient-primary w-full flex items-center justify-center gap-2">
            {t('bookNow')}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AmsSchipholRates;
