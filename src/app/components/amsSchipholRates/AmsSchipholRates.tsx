'use client';

import { useState } from 'react';
import { AmsterdamLocations } from '@/data/AmsSchipholRates/AmsSchipholRates.data';
import SchipholLogo from '@/app/assets/icons/SchipholIcon';
import VehicleToggle from '@/types/ui/VehicleToggle';
import AmsSchipholRateItem from './AmsSchipholRateItem';

const AmsSchipholRates = () => {
  const [selectedCarType, setSelectedCarType] = useState<'sedan' | 'van'>('sedan');

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Header */}
      <header className="flex flex-col items-center text-center gap-4 mb-10">
        <SchipholLogo className="w-16 h-16 text-gray-700" />
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Schiphol Taxi Tarieven</h2>
          <p className="text-sm text-gray-600">
            Vaste prijzen van Amsterdam naar Schiphol.
          </p>
        </div>

        {/* Toggle */}
        <VehicleToggle
          isVan={selectedCarType === 'van'}
          onToggle={(val) => setSelectedCarType(val ? 'van' : 'sedan')}
        />
      </header>

      {/* Rates */}
      <div className="flex flex-col gap-6">
        {AmsterdamLocations.slice(0, 3).map((location) => (
          <div key={location.name} className="hover:shadow-md transition-shadow rounded-xl">
            <AmsSchipholRateItem
              location={location}
              isVan={selectedCarType === 'van'}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AmsSchipholRates;
