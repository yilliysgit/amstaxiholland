// client/app/components/vehicleTypeSelector/VehicleCard.tsx
'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { VehicleService } from '@/types/vehicleTypeSelector/vehicleTypeSelector.type';

interface Props {
  service: VehicleService;
  isActive: boolean;
  onToggle: () => void;
}

export default function VehicleCard({ service, isActive, onToggle }: Props) {
  const t = useTranslations('HomePage.vehicleTypeSelector');
  const IconComponent = service.icon;

  return (
    <div
      className={`rounded-2xl overflow-hidden transition-all ${
        isActive 
          ? 'bg-white shadow-lg ring-2 ring-gray-800' 
          : 'bg-white/70 shadow-sm'
      }`}
    >
      {/* Accordion Header */}
      <button
        onClick={onToggle}
        className="w-full p-5 flex items-center gap-4"
      >
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
          isActive ? 'bg-gray-800' : 'bg-gray-200'
        }`}>
          <IconComponent className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-700'}`} />
        </div>
        <div className="text-left flex-1">
          <h3 className="text-gray-800 font-bold text-base">{t(`services.${service.id}.title`)}</h3>
          <p className="text-gray-500 text-sm">{t(`services.${service.id}.subtitle`)}</p>
        </div>
        <svg 
          className={`w-5 h-5 text-gray-600 transition-transform ${isActive ? 'rotate-180' : ''}`}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Accordion Content */}
      {isActive && (
        <div className="px-5 pb-5 border-t border-gray-200 animate-fadeIn">
          <div className="pt-4 space-y-3">
            <h4 className="text-sm font-semibold text-gray-800 mb-3">
              {t(`services.${service.id}.title`)} {t('premiumFeatures')}
            </h4>
            
            {/* Features */}
            {t.raw(`services.${service.id}.features`).map((feature: string, index: number) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-gray-100 rounded-xl p-3"
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-700 flex-shrink-0"></span>
                <span className="text-gray-700 text-sm">{feature}</span>
              </div>
            ))}
            
            {/* Buttons */}
            <div className="flex flex-col gap-2 mt-4">
              <button className="w-full px-6 py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2 bg-gradient-to-r from-gray-700 to-gray-900 hover:scale-105 transition shadow-lg">
                {t('bookService')} {t(`services.${service.id}.title`)}
                <ArrowRight className="w-4 h-4" />
              </button>
              
              {/* ✅ GEFIXT: String href in plaats van object syntax */}
              <Link 
                href={`/vervoerstype/${service.slug}`}
                className="w-full px-6 py-3 rounded-xl text-gray-800 font-semibold flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 transition"
              >
                {t('moreInfo')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}