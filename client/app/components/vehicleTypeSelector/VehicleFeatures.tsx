// client/app/components/vehicleTypeSelector/VehicleFeatures.tsx
'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { VehicleService } from '@/types/vehicleTypeSelector/vehicleTypeSelector.type';

interface Props {
  service: VehicleService;
}

export default function VehicleFeatures({ service }: Props) {
  const t = useTranslations('HomePage.vehicleTypeSelector');

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-b-3xl p-12 shadow-lg">
      <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-gray-700"></span>
        {t(`services.${service.id}.title`)} {t('premiumFeatures')}
      </h4>

      <div className="grid grid-cols-2 gap-5 mb-10">
        {t.raw(`services.${service.id}.features`).map((feature: string, index: number) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-gray-100 rounded-xl p-4 hover:bg-gray-200 transition"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-700 flex-shrink-0"></span>
            <span className="text-gray-700">{feature}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-4 justify-center">
        <button className="px-10 py-4 rounded-2xl text-white font-semibold inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gray-700 to-gray-900 hover:scale-105 transition shadow-lg">
          {t('bookService')} {t(`services.${service.id}.title`)}
          <ArrowRight className="w-5 h-5" />
        </button>
        
        {/* ✅ GEFIXT: String href in plaats van object syntax */}
       <Link
  href={{
    pathname: '/vervoerstype/[slug]',
    params: { slug: service.slug }
  }}
  className="px-10 py-4 rounded-2xl text-gray-800 font-semibold inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 transition shadow-md"
>
  {t('moreInfo')}
</Link>
      </div>
    </div>
  );
}