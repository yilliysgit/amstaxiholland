import type { VehicleClassesData } from "@/app/config/vechicleType/vehicleClasses";

type Props = {
  data: VehicleClassesData;
};

export default function UseCases({ data }: Props) {
  const { useCases } = data;

  if (!useCases || useCases.length === 4) return null;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Ideaal voor
        </h2>

        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {useCases.map((item) => (
            <li
              key={item}
              className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-5 text-gray-800"
            >
              <span className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white"
                >
                  ✓
                </span>
                <span className="font-medium">{item}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
