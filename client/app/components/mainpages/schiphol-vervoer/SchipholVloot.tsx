// /app/components/mainpages/schiphol-vervoer/SchipholVloot.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  Car,
  Crown,
  Users,
  Sparkles,
  Wifi,
  Receipt,
  VolumeX,
  Snowflake,
  BatteryCharging,
  Luggage,
} from 'lucide-react';

export default function SchipholVloot() {
  const t = useTranslations('SchipholPage.fleet');
  const [active, setActive] = React.useState(0);

  const categories = t.raw('categories');
  const count = categories.length;

  // refs voor focus management
  const tabsRef = React.useRef<(HTMLButtonElement | null)[]>([]);
  const assignTabRef = (i: number): React.RefCallback<HTMLButtonElement> => (el) => {
    tabsRef.current[i] = el;
  };

  // clamp index bij (hot) reloads of dynamische wijzigingen
  React.useEffect(() => {
    if (count === 0) return;
    setActive((prev) => Math.min(Math.max(prev, 0), count - 1));
  }, [count]);

  // keyboard-navigatie (← → Home End)
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (count === 0) return;
    let next = active;

    switch (e.key) {
      case 'ArrowRight':
        next = (active + 1) % count;
        break;
      case 'ArrowLeft':
        next = (active - 1 + count) % count;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = count - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    if (next !== active) {
      setActive(next);
      requestAnimationFrame(() => tabsRef.current[next]?.focus());
    }
  };

  // Icon mapping
  const iconMap: Record<string, React.ReactNode> = {
    'business': <Car className="w-6 h-6" aria-hidden />,
    'vip': <Crown className="w-6 h-6" aria-hidden />,
    'van': <Users className="w-6 h-6" aria-hidden />,
    'ladies': <Sparkles className="w-6 h-6" aria-hidden />,
  };

  const featureIconMap: Record<string, React.ReactNode> = {
    'Luxe Mercedes-Benz': <Car className="w-4 h-4" aria-hidden />,
    'Luxury Mercedes-Benz': <Car className="w-4 h-4" aria-hidden />,
    'WiFi & USB-C': <Wifi className="w-4 h-4" aria-hidden />,
    'Zakelijke factuur': <Receipt className="w-4 h-4" aria-hidden />,
    'Business invoice': <Receipt className="w-4 h-4" aria-hidden />,
    'Stille rit': <VolumeX className="w-4 h-4" aria-hidden />,
    'Quiet ride': <VolumeX className="w-4 h-4" aria-hidden />,
    'Klimaatregeling': <Snowflake className="w-4 h-4" aria-hidden />,
    'Climate control': <Snowflake className="w-4 h-4" aria-hidden />,
    'S-Klasse / Model S': <Car className="w-4 h-4" aria-hidden />,
    'V-Klasse (tot 8p)': <Users className="w-4 h-4" aria-hidden />,
    'V-Class (up to 8p)': <Users className="w-4 h-4" aria-hidden />,
    'Zones-airco': <Snowflake className="w-4 h-4" aria-hidden />,
    'Zone air conditioning': <Snowflake className="w-4 h-4" aria-hidden />,
    'Veel bagage': <Luggage className="w-4 h-4" aria-hidden />,
    'Lots of luggage space': <Luggage className="w-4 h-4" aria-hidden />,
    'USB-C laden': <BatteryCharging className="w-4 h-4" aria-hidden />,
    'USB-C charging': <BatteryCharging className="w-4 h-4" aria-hidden />,
  };

  // guard: geen categorieën
  if (count === 0) return null;

  const safeIndex = Math.min(Math.max(active, 0), count - 1);
  const cat = categories[safeIndex];

  return (
    <section className="py-16 lg:py-20 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Titel */}
        <header className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            {t('sectionHeader.title')}
          </h2>
          <p className="mt-3 text-gray-600 text-lg">
            {t('sectionHeader.description')} <span className="font-semibold">{t('sectionHeader.highlight')}</span>, {t('sectionHeader.suffix')}
          </p>
        </header>

        {/* Kaart */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Tabs */}
          <div
            role="tablist"
            aria-label={t('tabsLabel')}
            className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100"
            onKeyDown={onKeyDown}
          >
            {categories.map((c: any, i: number) => {
              const selected = i === safeIndex;
              return (
                <button
                  key={c.key}
                  type="button"
                  role="tab"
                  ref={assignTabRef(i)}
                  aria-selected={selected}
                  aria-controls={`panel-${c.key}`}
                  id={`tab-${c.key}`}
                  onClick={() => setActive(i)}
                  className={[
                    'group relative flex flex-col items-center justify-center gap-1.5 py-6 md:py-7',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60',
                    selected ? 'bg-gray-50' : 'bg-white hover:bg-gray-50',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'w-11 h-11 rounded-xl flex items-center justify-center',
                      selected ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-700',
                    ].join(' ')}
                  >
                    {iconMap[c.key]}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">{c.name}</span>
                  <span className="text-xs text-gray-500">{c.subtitle}</span>
                  <span
                    aria-hidden
                    className={[
                      'absolute bottom-0 left-0 right-0 h-1',
                      selected ? 'bg-gray-900' : 'bg-transparent group-hover:bg-gray-200',
                    ].join(' ')}
                  />
                </button>
              );
            })}
          </div>

          {/* Panel */}
          <div
            role="tabpanel"
            id={`panel-${cat.key}`}
            aria-labelledby={`tab-${cat.key}`}
            className="p-6 md:p-8 lg:p-10"
          >
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
              {cat.name} {cat.featuresTitle}
            </h3>

            {/* Chips */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {cat.features.map((f: any, idx: number) => (
                <div
                  key={idx}
                  className="rounded-xl bg-gray-50 border border-gray-100 px-4 py-3 flex items-center gap-2"
                >
                  {featureIconMap[f.label] && (
                    <span className="text-gray-700" aria-hidden>
                      {featureIconMap[f.label]}
                    </span>
                  )}
                  <span className="text-gray-800">{f.label}</span>
                </div>
              ))}
            </div>

            {/* Extra bullets (optioneel) */}
            {cat.bullets?.length ? (
              <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-8">
                {cat.bullets.map((b: string, i: number) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            ) : null}

            {/* CTA */}
            {cat.cta && (
              <div className="flex">
                <Link
                  href="#offerte"
                  className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold transition-transform hover:scale-[1.02] shadow-md"
                >
                  {cat.cta}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}