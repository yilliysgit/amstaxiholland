import type { VehicleClassesData } from "@/app/config/vechicleType/vehicleClasses";

type Props = {
  data: VehicleClassesData;
};

export default function CTA({ data }: Props) {
  const { label } = data;

  return (
    <section className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Klaar om te boeken?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
          Boek nu jouw {label} en ervaar comfortabel, betrouwbaar vervoer.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            className="rounded-full bg-white px-8 py-4 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition"
          >
            Boek nu
          </button>

          <a
            href="tel:+31000000000"
            className="text-sm font-medium text-gray-300 hover:text-white transition"
          >
            Of bel ons direct
          </a>
        </div>
      </div>
    </section>
  );
}
