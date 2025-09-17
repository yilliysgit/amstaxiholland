import React from 'react';
import { TaxiService } from '@/types/services/services.type';
import { services } from '@/data/services/services.data';
import ServicesCardSlider from '../components/services/services/ServicesCardSlider';
import CatHero from '../components/heros/CatHero';

export default function DienstenPage() {
  return (
    <>
    <h1>Hello</h1>
    <div className="min-h-screen bg-gray-50">
      <ServicesCardSlider services={services} />
    </div>
  
    </>
  );
}