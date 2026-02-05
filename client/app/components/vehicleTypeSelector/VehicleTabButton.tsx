// client/app/components/vehicleTypeSelector/VehicleTabButton.tsx
'use client';

import { useTranslations } from 'next-intl';
import { VehicleService } from '@/types/vehicleTypeSelector/vehicleTypeSelector.type';

interface Props {
  service: VehicleService;
  isActive: boolean;
  onClick: () => void;
}

export default function VehicleTabButton({ service, isActive, onClick }: Props) {
  const t = useTranslations('HomePage.vehicleTypeSelector');
  const IconComponent = service.icon;

  return (
    <button
      onClick={onClick}
      className={`
        group flex-1 px-6 lg:px-10 py-5 lg:py-7
        transition-all duration-300 text-center
        border-b-2
        ${isActive
          ? 'bg-white border-gray-900 shadow-sm'
          : 'bg-transparent border-transparent hover:bg-white/70'
        }
      `}
    >
      <div className="flex flex-col items-center">
        <div
          className={`
            w-14 h-14 mb-3 rounded-xl flex items-center justify-center
            shadow-md transition-all duration-300
            ${isActive ? 'bg-gradient-button-primary' : 'bg-gray-100 group-hover:bg-gray-200'}
          `}
        >
          <IconComponent
            className={`w-7 h-7 ${
              isActive ? 'text-white' : 'text-gray-700'
            }`}
          />
        </div>
        <h3 className="text-gray-900 font-semibold mb-1 tracking-tight">
          {t(`services.${service.id}.title`)}
        </h3>
        <p className="text-gray-600 text-xs sm:text-sm max-w-xs">
          {t(`services.${service.id}.subtitle`)}
        </p>
      </div>
    </button>
  );
}
