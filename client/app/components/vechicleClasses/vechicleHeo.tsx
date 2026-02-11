import Image from "next/image";
import type { VehicleClassesData } from "@/app/config/vechicleType/vehicleClasses";

type Props = {
  data: VehicleClassesData;
};

export default function VehicleHero({ data }: Props) {
  const { hero, label } = data;

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-2">
        {/* Content */}
        <div>
          <span className="inline-block rounded-full bg-gray-100 px-4 py-1 text-sm font-medium text-gray-700">
            {label}
          </span>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {hero.title}
          </h1>

          <p className="mt-6 max-w-xl text-lg text-gray-700">
            {hero.subtitle}
          </p>

          <ul className="mt-8 space-y-3">
            {hero.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white"
                >
                  ✓
                </span>
                <span className="text-gray-800">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Visual */}
        <div className="relative">
          <Image
  src={hero.image}
  alt={hero.title}
  width={640}
  height={480}
  priority
  className="rounded-3xl object-cover shadow-xl"
/>
        </div>
      </div>
    </section>
  );
}
