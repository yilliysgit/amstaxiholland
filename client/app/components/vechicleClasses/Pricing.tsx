import type { VehicleClassesData } from "@/app/config/vechicleType/vehicleClasses";

type Props = {
  data: VehicleClassesData;
};

export default function Pricing({ data }: Props) {
  const { pricing, label } = data;

  if (!pricing) return null;

  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Tarieven
          </h2>
          <p className="mt-2 text-gray-700">
            Transparante prijzen voor {label}.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Basisrit */}
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
            <p className="text-sm font-medium text-gray-600">
              Basisrit vanaf
            </p>

            <div className="mt-4 flex items-end gap-2">
              <span className="text-4xl font-bold text-gray-900">
                €{pricing.base}
              </span>
              <span className="text-sm text-gray-600">
                incl. btw
              </span>
            </div>

            <ul className="mt-6 space-y-3 text-sm text-gray-700">
              <li>✓ Vaste prijs</li>
              <li>✓ Geen verborgen kosten</li>
              <li>✓ Professionele chauffeur</li>
            </ul>
          </div>

          {/* Airport */}
          {pricing.airport ? (
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
              <p className="text-sm font-medium text-gray-600">
                Luchthavenvervoer
              </p>

              <div className="mt-4 flex items-end gap-2">
                <span className="text-4xl font-bold text-gray-900">
                  €{pricing.airport}
                </span>
                <span className="text-sm text-gray-600">
                  incl. btw
                </span>
              </div>

              <ul className="mt-6 space-y-3 text-sm text-gray-700">
                <li>✓ Vaste ophaaltijd</li>
                <li>✓ Vluchtmonitoring</li>
                <li>✓ Inclusief bagage</li>
              </ul>
            </div>
          ) : null}
        </div>

        {pricing.note ? (
          <p className="mt-6 max-w-2xl text-sm text-gray-600">
            {pricing.note}
          </p>
        ) : null}
      </div>
    </section>
  );
}
