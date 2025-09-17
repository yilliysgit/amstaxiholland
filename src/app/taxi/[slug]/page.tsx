import { notFound } from "next/navigation";
import { getSlugs, getCity } from "@/data/cities/city.data";
import CityHero from "@/app/components/heros/CityHero";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const s = getSlugs();
  return s.map((slug) => ({ slug }));
}

// ✅ params is een Promise in Next 15-typings
export default async function Page(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <CityHero hero={city.hero} phone={city.phone} cityName={city.name} />
    </main>
  );
}
