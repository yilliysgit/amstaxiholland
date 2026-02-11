import type { VehicleClassesData } from "@/app/config/vechicleType/vehicleClasses";

type DescriptionData = {
  title: string;
  intro: string;
  points?: string[];
};

type Props = {
  data: VehicleClassesData & {
    description?: DescriptionData;
  };
};

export default function Description({ data }: Props) {
  const description = data.description;

  if (!description) return null;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          {description.title}
        </h2>

        <p className="mt-4 text-lg text-gray-700">
          {description.intro}
        </p>

        {description.points && description.points.length > 0 ? (
          <ul className="mt-8 space-y-4">
            {description.points.map((point) => (
              <li key={point} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white"
                >
                  ✓
                </span>
                <span className="text-gray-800">{point}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
