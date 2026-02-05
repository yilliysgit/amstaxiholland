// src/app/components/zakelijk/ZakelijkVloot.tsx
'use client';

import React from 'react';
import Link from 'next/link';
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

type Feature = { label: string; icon?: React.ReactNode };
type Category = {
  key: string;
  name: string;
  subtitle: string;
  icon: React.ReactNode;
  features: Feature[];
  bullets?: string[];
  ctaHref?: string;
  ctaLabel?: string;
};

const CATEGORIES: Category[] = [
  {
    key: 'business',
    name: 'Business Class',
    subtitle: 'Premium comfort voor zakelijke ritten',
    icon: <Car className="w-6 h-6" aria-hidden />,
    features: [
      { label: 'Luxe Mercedes-Benz', icon: <Car className="w-4 h-4" aria-hidden /> },
      { label: 'WiFi & USB-C', icon: <Wifi className="w-4 h-4" aria-hidden /> },
      { label: 'Zakelijke factuur', icon: <Receipt className="w-4 h-4" aria-hidden /> },
      { label: 'Stille rit', icon: <VolumeX className="w-4 h-4" aria-hidden /> },
      { label: 'Klimaatregeling', icon: <Snowflake className="w-4 h-4" aria-hidden /> },
    ],
    bullets: ['1–3 passagiers', '2–3 koffers', 'Professionele chauffeur'],
    ctaHref: '#offerte',
    ctaLabel: 'Boek Business',
  },
  {
    key: 'vip',
    name: 'VIP Class',
    subtitle: 'Exclusieve ervaring met topservice',
    icon: <Crown className="w-6 h-6" aria-hidden />,
    features: [
      { label: 'S-Klasse / Model S', icon: <Car className="w-4 h-4" aria-hidden /> },
      { label: 'Privacy & discreet' },
      { label: 'Champagne & refreshments' },
      { label: 'Butler-service' },
      { label: 'Fast-lane pickup' },
    ],
    bullets: ['1–3 passagiers', '2–3 koffers', 'Absolute discretie'],
    ctaHref: '#contact',
    ctaLabel: 'Plan VIP',
  },
  {
    key: 'van',
    name: 'Minivan Luxury',
    subtitle: 'Ruime oplossing voor groepen',
    icon: <Users className="w-6 h-6" aria-hidden />,
    features: [
      { label: 'V-Klasse (tot 8p)', icon: <Users className="w-4 h-4" aria-hidden /> },
      { label: 'Panorama dak' },
      { label: 'Zones-airco', icon: <Snowflake className="w-4 h-4" aria-hidden /> },
      { label: 'Veel bagage', icon: <Luggage className="w-4 h-4" aria-hidden /> },
      { label: 'USB-C laden', icon: <BatteryCharging className="w-4 h-4" aria-hidden /> },
    ],
    bullets: ['Tot 8 passagiers', '6–8 koffers', 'Ideaal voor events'],
    ctaHref: '#offerte',
    ctaLabel: 'Vraag groepsrit aan',
  },
  {
    key: 'ladies',
    name: 'Ladies Taxi',
    subtitle: 'Veilig vervoer voor vrouwen',
    icon: <Sparkles className="w-6 h-6" aria-hidden />,
    features: [
      { label: 'Vrouwelijke chauffeur' },
      { label: 'Extra veiligheidscheck' },
      { label: 'Live tracking' },
      { label: '24/7 beschikbaar' },
      { label: 'Discreet & betrouwbaar' },
    ],
    bullets: ['1–3 passagiers', '2–3 koffers', 'Preferente chauffeurs'],
    ctaHref: '#contact',
    ctaLabel: 'Plan Ladies Taxi',
  },
];

export default function ZakelijkVloot() {
  const [active, setActive] = React.useState(0);

  // refs voor focus management
  const tabsRef = React.useRef<(HTMLButtonElement | null)[]>([]);
  const assignTabRef = (i: number): React.RefCallback<HTMLButtonElement> => (el) => {
    tabsRef.current[i] = el;
  };

  // lengte van de tabs
  const count = CATEGORIES.length;

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

  // guard: geen categorieën
  if (count === 0) return null;

  const safeIndex = Math.min(Math.max(active, 0), count - 1);
  const cat = CATEGORIES[safeIndex];

  return (
    <section className="py-16 lg:py-20 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Titel */}
        <header className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Premium Taxi</h2>
          <p className="mt-3 text-gray-600 text-lg">
            Exclusief vervoer dat Amsterdam’s elite vertrouwt. <span className="font-semibold">Altijd op tijd</span>, altijd in absolute luxe.
          </p>
        </header>

        {/* Kaart */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Tabs */}
          <div
            role="tablist"
            aria-label="Voertuigcategorieën"
            className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100"
            onKeyDown={onKeyDown}
          >
            {CATEGORIES.map((c, i) => {
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
                    {c.icon}
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
              {cat.name} Premium Features
            </h3>

            {/* Chips */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {cat.features.map((f, idx) => (
                <div
                  key={idx}
                  className="rounded-xl bg-gray-50 border border-gray-100 px-4 py-3 flex items-center gap-2"
                >
                  {f.icon && (
                    <span className="text-gray-700" aria-hidden>
                      {f.icon}
                    </span>
                  )}
                  <span className="text-gray-800">{f.label}</span>
                </div>
              ))}
            </div>

            {/* Extra bullets (optioneel) */}
            {cat.bullets?.length ? (
              <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-8">
                {cat.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            ) : null}

            {/* CTA */}
            {cat.ctaHref && (
              <div className="flex">
                <Link
                  href={cat.ctaHref}
                  className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold transition-transform hover:scale-[1.02] shadow-md"
                >
                  {cat.ctaLabel ?? 'Reserveren'}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
