import Image from "next/image";
import type { TaxiSingleCity } from "@/types/cities/city.type";


type Props = { hero: any; phone?: string; cityName: string };

export default function CityHero({ hero, phone, cityName }: Props) {
  const { title, intro, image } = hero;

  return (
    <section className="rounded-2xl bg-gray-100 p-8 shadow-sm">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold">{title}</h1>
          {intro && <p className="mt-3 text-gray-700">{intro}</p>}
          {phone && (
            <a href={`tel:${phone}`} className="mt-6 inline-block rounded-xl bg-black px-6 py-3 text-white">
              Bel {phone}
            </a>
          )}
        </div>
        {image && (
          <div className="h-48 w-full overflow-hidden rounded-xl bg-white shadow md:h-56 md:w-80">
            <Image
              src={image.src}
              alt={image.alt ?? `Taxi ${cityName}`}
              width={640}
              height={360}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        )}
      </div>
    </section>
  );
}
