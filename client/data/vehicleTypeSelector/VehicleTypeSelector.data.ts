// client/data/vehicleTypeSelector/VehicleTypeSelector.data.ts
import { Car, Users, Crown, Sparkles } from 'lucide-react';
import { VehicleService } from '@/types/vehicleTypeSelector/vehicleTypeSelector.type';

export const vehicleServices: VehicleService[] = [
  {
    id: 'business',
    slug: 'business-class',
    icon: Car,
    gradient: 'from-gray-700 via-gray-800 to-gray-900',
  },
  {
    id: 'vip',
    slug: 'vip-class',
    icon: Crown,
    gradient: 'from-gray-800 via-gray-900 to-gray-950',
  },
  {
    id: 'minivan',
    slug: 'minivan-luxury',
    icon: Users,
    gradient: 'from-gray-700 via-gray-800 to-gray-900',
  },
  {
    id: 'ladiestaxi',
    slug: 'ladies-taxi',
    icon: Sparkles,
    gradient: 'from-gray-700 via-gray-800 to-gray-900',
  }
];