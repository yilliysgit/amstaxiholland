import type { VehicleClassesData } from "@/app/config/vechicleType/vehicleClasses";

type Props = {
  data: VehicleClassesData;
};

export default function Facilities({ data }: Props) {
  const { facilities } = data;
  const { included, exclusive } = facilities;

  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Voorzieningen
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* Included */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Inbegrepen
            </h3>
            <ul className="mt-4 space-y-3">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white"
                  >
                    ✓
                  </span>
                  <span className="text-gray-800">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Exclusive */}
          {exclusive && exclusive.length > 0 ? (
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Exclusief
              </h3>
              <ul className="mt-4 space-y-3">
                {exclusive.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-300 text-xs font-bold text-gray-700"
                    >
                      •
                    </span>
                    <span className="text-gray-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
