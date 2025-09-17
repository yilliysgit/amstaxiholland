"use client"; // Corrected typo from "cllient" to "client "
// page.tsx
import HomeHeroSection from "@/app/components/heros/HomeHeroSection";
// In je page.tsx of hero component
import { IconTextBadgeRow } from "@/app/components/common/iconTextBadge/IconTextBadgeRow";
import { homeBadges } from "@/data/tours/iconBadges/iconBadges.data";
//import { ServicesSection } from "./components/services/services";
import AmsSchipholRates from "@/app/components/amsSchipholRates/AmsSchipholRates";
import VehicleTypeSelector from "@/app/components/VehicleTypeSelector/VehicleTypeSelector";
import PromoSection from "@/app/components/PromoSection/PromoSection";
import TourSlider from "@/app/components/tourSlider/TourSlider";
import { tours } from "@/data/tours/tours.data";
import EventSection from "@/app/components/sections/EventSection";
import ReviewSlider from "@/app/components/reviews/ReviewSlider";
import FAQSection from "@/app/components/faq/Faq";
import DualCTASection from "@/app/components/ui/buttons/dualCTASection/DualCTASection";

// In je JSX:
<IconTextBadgeRow badges={homeBadges} className="mt-8" />
export default function HomeHeron() { // ✅ Normale function syntax
  return (
  
   <>
  <HomeHeroSection />
  <IconTextBadgeRow badges={homeBadges} />
  <AmsSchipholRates />
  <VehicleTypeSelector />
  <PromoSection
  title="Altijd verzekerd van een taxi voor zakelijke - of particuliere diensten"
  intro="Moet u zich voor uw werk of privé veel verplaatsen met de auto? In de drukke stad bent u veel tijd kwijt door oponthoud in het verkeer en het zoeken naar een parkeerplaats. Dat kan makkelijker."
  description="Door een samenwerkingsverband aan te gaan met AmstaxiHolland, kunt u er zeker van zijn dat er altijd een taxi Amsterdam voor u klaarstaat op het moment dat u er een nodig heeft."
  benefits={[
    "Geen oponthoud meer in het drukke stadsverkeer",
    "U hoeft geen parkeerplek meer te zoeken",
    "Altijd een taxi in de buurt, altijd beschikbaar",
    "Extra voordelige prijzen bij contractueel samenwerkingsverband"
  ]}
  ctaLabel="Vraag vrijblijvend een offerte aan"
  imageSrc="/images/business-taxi.jpg"
  imageAlt="Zakelijke taxi"
  reverse={false}
/>


<section className="bg-[#F1F4F9] py-12">
  <div className="max-w-7xl mx-auto px-4">
     <TourSlider tours={tours} vehicle="sedan" />
  </div>
</section>
<EventSection />
<ReviewSlider />
<FAQSection />
<DualCTASection />
</>
  
  );
}
