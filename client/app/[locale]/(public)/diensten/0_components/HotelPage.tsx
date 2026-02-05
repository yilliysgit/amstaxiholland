import React from "react";
import { HeroHotelTransfer } from "@/app/components/mainpages/hotel";
import HotelBenefits from "@/app/components/mainpages/hotel/HotelBenefits";
import HotelExperienceBlocks from "@/app/components/mainpages/hotel/HotelExperienceBlocks";
import HotelFleetShowcase from "@/app/components/mainpages/hotel/HotelFleetShowcase";
import HotelPricingSection from "@/app/components/mainpages/hotel/HotelPricingSection";
//import HotelFAQ from "@/app/components/mainpages/hotel/HotelFAQ";
import HotelTailoredCTA from "@/app/components/mainpages/hotel/HotelTailoredCTA";

export default function HotelTransferPage() {
  return (
    <main className="w-full min-h-screen">
      {/* HERO */}
      <HeroHotelTransfer />

      {/* Benefits */}
      <HotelBenefits />

      {/* Experience blocks */}
      <HotelExperienceBlocks />

      {/* Fleet showcase */}
      <HotelFleetShowcase />

      {/* Pricing Section */}
      <HotelPricingSection />

      {/* FAQ */}

      {/* CTA       <HotelFAQ />
 */}
      <HotelTailoredCTA />
    </main>
  );
}
