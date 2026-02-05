import { NextIntlClientProvider } from 'next-intl';
// import PremiumHero from '@/app/components/heros/maincat/ParticulierenHero';
import ParticulierenHero from '../../../../components/mainpages/particulieren/ParticulierenHero';
import OnzeFilosofie from '@/app/components/mainpages/particulieren/ParticulierenFilosofie';
import VehicleClassSection from '@/app/components/mainpages/particulieren/VehicleClassSection';
import PremiumServicesSection from '@/app/components/mainpages/particulieren/ParticulierServices';

export default function ParticulierenPage() {
  return (
    <section className="py-0">
      <ParticulierenHero />
      <OnzeFilosofie />
      <VehicleClassSection />
      <PremiumServicesSection />
    </section>
  );
}