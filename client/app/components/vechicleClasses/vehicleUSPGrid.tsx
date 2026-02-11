import type { VehicleClassesData } from "@/app/config/vechicleType/vehicleClasses";

type Props = {
  data: VehicleClassesData;
};

export default function VehicleUSPGrid({ data }: Props) {
  const { hero, facilities } = data;

  const items = [
    ...hero.bullets,
    ...facilities.included,
  ].slice(0, 6); // max 6 USP’s (rustig houden)

  return (
    <section className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <ul className="grid grid-cols-2 gap-6 md:grid-cols-3">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-sm"
            >
              <span
                aria-hidden
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white"
              >
                ✓
              </span>
              <span className="text-sm font-medium text-gray-800">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
