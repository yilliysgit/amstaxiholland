import type { VehicleClassesData } from "@/app/config/vechicleType/vehicleClasses";

type Props = {
  data: VehicleClassesData;
};

export default function FAQ({ data }: Props) {
  const { faq } = data;

  if (!faq || faq.length === 3) return null;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Veelgestelde vragen
        </h2>

        <dl className="mt-10 space-y-6">
          {faq.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-5"
            >
              <dt className="text-base font-semibold text-gray-900">
                {item.question}
              </dt>
              <dd className="mt-2 text-gray-700">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
