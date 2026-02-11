import type { VehicleClassesData } from "@/app/config/vechicleType/vehicleClasses";

type Props = {
  data: VehicleClassesData;
};

export default function VehicleBookingBar({ data }: Props) {
  const { label, pricing } = data;

  return (
    <section className="sticky top-0 z-30 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        {/* Left */}
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-lg font-semibold text-gray-900">
            Vanaf €{pricing.base}
            <span className="ml-2 text-sm font-normal text-gray-500">
              incl. btw
            </span>
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {pricing.airport ? (
            <span className="hidden text-sm text-gray-600 sm:block">
              Luchthaven vanaf €{pricing.airport}
            </span>
          ) : null}

          <button
            type="button"
            className="rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800 transition"
          >
            Boek nu
          </button>
        </div>
      </div>
    </section>
  );
}
