"use client";
import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle, Crown, Sparkles, Zap } from "lucide-react";

// =============================================
// ServicesSlider.tsx – Standalone slider component (no libs)
// =============================================
// • Pure React + Tailwind; geen externe carousel-lib nodig
// • Autoplay (pauze bij hover), swipe/scroll, pijlen, progress bar
// • Sluit visueel aan op jouw glass/gradient-stijl

export type TaxiService = {
  id: string;
  title: string;
  description: string;
  image: string;
  thumb: string;
  price: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  category: "airport" | "business" | "luxury" | "medical" | "events" | "tours";
  icon: string;
  badge?: string;
};

const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

function ServiceCard({ service }: { service: TaxiService }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="group relative h-full overflow-hidden rounded-3xl border border-white/20 bg-white/65 backdrop-blur-xl shadow-lg shadow-slate-900/5"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <div
          className={cx(
            "absolute inset-0 bg-cover bg-center transition-transform duration-700",
            hover && "scale-110"
          )}
          style={{ backgroundImage: `url(${service.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />

        {/* Badge */}
        {service.badge && (
          <div className="absolute top-3 right-3 z-10">
            <div
              className={cx(
                "px-3 py-1 rounded-full text-[11px] font-bold text-white shadow-lg border border-white/20",
                service.badge === "Populair" && "bg-gradient-to-r from-orange-500 to-orange-600",
                service.badge === "Premium" && "bg-gradient-to-r from-purple-500 to-purple-600",
                service.badge === "Nieuw" && "bg-gradient-to-r from-green-500 to-green-600"
              )}
            >
              <span className="inline-flex items-center gap-1">
                {service.badge === "Premium" && <Crown className="w-3 h-3" />}
                {service.badge === "Populair" && <Sparkles className="w-3 h-3" />}
                {service.badge === "Nieuw" && <Zap className="w-3 h-3" />}
                {service.badge}
              </span>
            </div>
          </div>
        )}

        {/* Price */}
        <div className="absolute bottom-3 left-3 bg-white/95 text-gray-900 px-3 py-1.5 rounded-full text-xs font-semibold shadow border border-white/60">
          {service.price}
        </div>
      </div>

      {/* Content */}
      <div className="relative p-6 bg-gradient-mercedes-premium">
        <h3 className="text-xl font-extrabold text-gradient-hero leading-tight mb-2">{service.title}</h3>
        <p className="text-gray-700 text-sm leading-relaxed mb-4 min-h-[3.25rem]">{service.description}</p>

        <ul className="space-y-2 mb-5">
          {service.features.slice(0, 3).map((f, i) => (
            <li key={i} className="flex items-center text-[13px] text-gray-800">
              <span className="mr-2 grid h-5 w-5 place-items-center rounded-full bg-gradient-to-r from-green-400 to-green-500 shadow-sm">
                <CheckCircle className="h-3.5 w-3.5 text-white" />
              </span>
              <span className="font-medium">{f}</span>
            </li>
          ))}
        </ul>

        <a
          href={service.ctaLink}
          className="relative inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 font-semibold btn-gradient-primary overflow-hidden group"
        >
          <span className="relative z-10">{service.ctaText}</span>
          <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-0" />
        </a>

        {/* decor blobs */}
        <span className="pointer-events-none absolute -top-6 -right-6 h-24 w-24 rounded-full bg-white/40" />
        <span className="pointer-events-none absolute -bottom-6 -left-6 h-16 w-16 rounded-full bg-white/40" />
      </div>
    </div>
  );
}

export default function ServicesSlider({
  services,
  autoplay = true,
  interval = 3500,
  title = "Onze Premium Diensten",
}: {
  services: TaxiService[];
  autoplay?: boolean;
  interval?: number;
  title?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  // Scroll helper
  const scrollBySlide = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const firstSlide = track.querySelector<HTMLElement>(".slide");
    const gap = 16; // pl-4
    const amount = (firstSlide?.offsetWidth || 300) + gap;
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  // Autoplay
  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(() => {
      if (paused) return;
      scrollBySlide(1);
      const track = trackRef.current;
      if (!track) return;
      // wrap to start wanneer aan het eind
      if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 4) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, interval);
    return () => clearInterval(id);
  }, [autoplay, interval, paused]);

  // Progress bar
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const max = track.scrollWidth - track.clientWidth;
      setProgress(max > 0 ? track.scrollLeft / max : 0);
    };
    onScroll();
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gradient-hero">{title}</h2>
          <p className="text-sm text-slate-600">Swipe, sleep of gebruik de pijlen</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollBySlide(-1)}
            aria-label="Vorige"
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scrollBySlide(1)}
            aria-label="Volgende"
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Track */}
      <div
        ref={wrapRef}
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          ref={trackRef}
          className="-ml-4 flex snap-x snap-mandatory overflow-x-auto scroll-smooth pb-2 no-scrollbar"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {services.map((s) => (
            <div
              key={s.id}
              className="slide pl-4 snap-start flex-[0_0_85%] sm:flex-[0_0_55%] lg:flex-[0_0_33%] xl:flex-[0_0_28%]"
            >
              <ServiceCard service={s} />
            </div>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-slate-700 to-slate-900"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      {/* Global CSS for hiding scrollbar */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar{display:none}
        .no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}
      `}</style>
    </section>
  );
}

