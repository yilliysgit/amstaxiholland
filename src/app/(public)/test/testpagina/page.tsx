"use client";
import React from "react";
import TaxiHero from "./TaxiHero";
import PremiumRouteSection from "@/app/taxi/cityRoutePricing/CityRoutePricing";
import ValueCard from "@/app/taxi/premiumValue/premiumValue";

import PremiumAccessibilitySection from "@/app/taxi/PremiumAccessibilitySection/PremiumAccessibilitySection";
import PremiumHowItWorks from "@/app/taxi/PremiumHowItWorks/PremiumHowItWorks"
import ServicesCardSlider from "@/app/components/services/services/ServicesCardSlider";
import { services } from "@/data/services/services.data";

export default function page() {
  return (
    <>
    <TaxiHero 
  cityName="Rotterdam" 
  destinationCity="Amsterdam"
  tagline="Exclusief vervoer tussen de grote steden"
  rating={9.8}
/>

<PremiumRouteSection />
<ValueCard />
<PremiumAccessibilitySection />
<PremiumHowItWorks />



<ServicesCardSlider services={services} />

*/
</>


  )
}
