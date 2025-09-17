import { notFound } from "next/navigation";
import { getSlugs, getCity } from "@/data/cities/city.data";
import CityHero from "@/app/components/heros/CityHero";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const s = getSlugs();
  console.log("SSG slugs:", s); // ⬅ zie terminal
  return s.map((slug) => ({ slug }));
}

export default function Page({ params }: { params: { slug: string } }) {
  console.log("params.slug:", params.slug); // ⬅ zie terminal
  const city = getCity(params.slug);
  if (!city) notFound();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <CityHero hero={city.hero} phone={city.phone} cityName={city.name} />
    </main>
  );
}
