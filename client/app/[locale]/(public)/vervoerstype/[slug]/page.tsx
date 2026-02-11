// client/app/[locale]/(public)/vervoerstype/[slug]/page.tsx

import { notFound } from "next/navigation";

import { vehicleClasses, type VehicleClassesSlug } from "@/app/config/vechicleType/vehicleClasses";

import VehicleHero from "@/app/components/vechicleClasses/vechicleHeo";
import VehicleUSPGrid from "@/app/components/vechicleClasses/vehicleUSPGrid";
import VehicleBookingBar from "@/app/components/vechicleClasses/vechicleBookingBar";
import Description from "@/app/components/vechicleClasses/Description";
import Facilities from "@/app/components/vechicleClasses/Facilities";
import UseCases from "@/app/components/vechicleClasses/UseCases";
import Pricing from "@/app/components/vechicleClasses/Pricing";
import FAQ from "@/app/components/vechicleClasses/FAQ";
import CTA from "@/app/components/vechicleClasses/CTA";

type Props = {
  params: Promise<{  // ← Promise toegevoegd
    locale: string;
    slug: string;
  }>;
};

export default async function VehicleTypePage({ params }: Props) {  // ← async toegevoegd
  const { slug, locale } = await params;  // ← await toegevoegd
  
  const vehicleSlug = slug as VehicleClassesSlug;
  const data = vehicleClasses[vehicleSlug];

  if (!data) notFound();

  return (
    <>
      <VehicleHero data={data} />
      <VehicleUSPGrid data={data} />
      <VehicleBookingBar data={data} />
      <Description data={data} />
      <Facilities data={data} />
      <UseCases data={data} />
      <Pricing data={data} />
      <FAQ data={data} />
      <CTA data={data} />
    </>
  );
}

/**
 * SEO metadata per voertuigtype
 */
export async function generateMetadata({ params }: Props) {  // ← async toegevoegd
  const { slug } = await params;  // ← await toegevoegd
  const vehicleSlug = slug as VehicleClassesSlug;
  const data = vehicleClasses[vehicleSlug];

  if (!data) return {};

  return {
    title: `${data.label} | Taxi`,
    description: data.hero.subtitle,
  };
}

/**
 * Static params voor alle locales + vehicle slugs
 */
export async function generateStaticParams() {  // ← async toegevoegd (optioneel hier maar consistent)
  const locales = ["nl", "en"];
  
  return locales.flatMap((locale) =>
    Object.keys(vehicleClasses).map((slug) => ({
      locale,
      slug,
    }))
  );
}
