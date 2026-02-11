// client/types/vehicleTypeSelector/vehicleTypeSelector.type.ts
import { LucideIcon } from 'lucide-react';

export type VehicleTypeSlug = 
  | 'business-class' 
  | 'vip-class' 
  | 'minivan-luxury' 
  | 'ladies-taxi';

export type VehicleService = {
  id: string;
  slug: VehicleTypeSlug;
  icon: LucideIcon;
  gradient: string;
};