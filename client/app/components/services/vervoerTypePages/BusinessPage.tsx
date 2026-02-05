// app/components/services/vervoerTypePages/BusinessPage.tsx
import React from "react";

import Hero from "./businessPage/Hero";
import BookingCard from "./businessPage/BookingCard";
import Rates from "./businessPage/Rates";
import WhyBusiness from "./businessPage/WhyBusiness";
import Audience from "./businessPage/Audience";
import PremiumVehicles from "./businessPage/PremiumVehicles";
import Nationwide from "./businessPage/Nationwide";
import ExtraServices from "./businessPage/ExtraServices";
import HowItWorks from "./businessPage/HowItWorks";
import Pricing from "./businessPage/Pricing";
import FAQ from "./businessPage/FAQ";
import FooterCTA from "./businessPage/FooterCTA";

import type { BusinessPageData } from "./businessPage/types";

interface BusinessPageProps {
  data: BusinessPageData;
  locale: string;
}

export default function BusinessPage({ data, locale }: BusinessPageProps) {
  return (
    <div className="text-white">

      {/* HERO */}
      {data.hero && <Hero data={data.hero} />}

      {/* BOOKING CARD */}
      {data.bookingCard && <BookingCard data={data.bookingCard} />}

      {/* RATES */}
      {data.ratesSection && <Rates data={data.ratesSection} />}

      {/* WHY BUSINESS */}
      {data.whyBusiness && <WhyBusiness data={data.whyBusiness} />}

      {/* AUDIENCE */}
      {data.audience && <Audience data={data.audience} />}

      {/* PREMIUM VEHICLES */}
      {data.premiumVehicles && <PremiumVehicles data={data.premiumVehicles} />}

      {/* HOW IT WORKS */}
      {data.howItWorks && <HowItWorks data={data.howItWorks} />}

      {/* EXTRA SERVICES */}
      {data.extraServices && <ExtraServices data={data.extraServices} />}

      {/* NATIONWIDE */}
      {data.nationwide && <Nationwide data={data.nationwide} />}

      {/* FAQ */}
      {data.faq && <FAQ data={data.faq} />}

      {/* FOOTER CTA */}
      {data.footerCTA && <FooterCTA data={data.footerCTA} />}
    </div>
  );
}
