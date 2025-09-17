// /components/services/ServicesSlider.tsx
"use client";
import React, { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import type { TaxiService } from "@/types/services/services.type";
import ServiceCard from "./ServiceCard";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Props = {
  services: TaxiService[];
  title?: string;
  autoplay?: boolean;
  interval?: number;
  gap?: number;
  peek?: number;
  maxCard?: number;
  cardHeight?: number;
  hoverMaxSpeed?: number; // px/s bij extreme hover
  hoverDeadZone?: number; // 0..0.5: dode zone rond midden
};

const CLONES = 2;

export default function ServicesCardSlider({
  services,
  title = "Onze Services",
  autoplay = true,
  interval = 4000,
  gap = 20,
  peek = 16,
  maxCard = 420,
  cardHeight = 520,
  hoverMaxSpeed = 700, // snelheid bij rand
  hoverDeadZone = 0.12, // geen beweging in de middelste 12%
}: Props) {
  if (!services?.length) return null;

  // DOM refs
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // layout refs (geen rerenders)
  const slideEls = useRef<HTMLElement[]>([]);
  const slideDist = useRef(0);
  const maxOffset = useRef(0);
  const offset = useRef(0);

  // interactie refs
  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);

  // autoplay + hover-glide
  const autoId = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false); // alleen voor UI/pijlen
  const hoverActive = useRef(false);
  const hoverX01 = useRef(0.5);
  const rafId = useRef<number | null>(null);
  const lastTs = useRef<number | null>(null);

  // state alleen voor toegankelijkheid/labels
  const [indexState, setIndexState] = useState(CLONES);

  // samengestelde slides met clones
  const slides: TaxiService[] = [
    ...services.slice(-CLONES),
    ...services,
    ...services.slice(0, CLONES),
  ];

  // helpers
  const setTransform = (x: number, withTransition = false) => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transition = withTransition ? "transform 520ms cubic-bezier(.22,.8,.2,1)" : "none";
    track.style.transform = `translate3d(${-x}px,0,0)`;
    offset.current = x;
  };

  const getIndexFromOffset = () =>
    slideDist.current > 0 ? Math.round(offset.current / slideDist.current) : CLONES;

  const measure = () => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    // vaste hoogte (voorkomt bounce)
    wrap.style.height = `${cardHeight}px`;
    track.style.height = `${cardHeight}px`;

    // elementen + vaste breedtes/hoogtes
    slideEls.current = Array.from(track.querySelectorAll<HTMLElement>("[data-slide]"));
    const containerW = wrap.getBoundingClientRect().width;
    const spv = containerW >= 1280 ? 3.2 : containerW >= 1024 ? 2.3 : containerW >= 640 ? 1.6 : 1.15;
    const inner = containerW - 2 * peek - gap * (spv - 1);
    const cardW = Math.min(maxCard, inner / spv);

    track.style.paddingLeft = `${peek}px`;
    track.style.paddingRight = `${peek}px`;

    slideEls.current.forEach((el, i) => {
      el.style.width = `${cardW}px`;
      el.style.height = `${cardHeight}px`;
      el.style.marginRight = i === slideEls.current.length - 1 ? "0px" : `${gap}px`;
    });

    const a = slideEls.current[0];
    const b = slideEls.current[1];
    slideDist.current = b && a ? b.offsetLeft - a.offsetLeft : cardW + gap;

    const totalW = slideEls.current.length * (cardW + gap) - gap + 2 * peek;
    maxOffset.current = Math.max(0, totalW - containerW);

    // align keep
    setTransform(Math.min(getIndexFromOffset() * slideDist.current, maxOffset.current), false);
  };

  const handleInfiniteEdges = (virtualIndex: number) => {
    const firstReal = CLONES;
    const lastReal = CLONES + services.length - 1;
    if (virtualIndex > lastReal) {
      const newIndex = virtualIndex - services.length;
      setIndexState(newIndex);
      setTransform(newIndex * slideDist.current, false);
      return newIndex;
    }
    if (virtualIndex < firstReal) {
      const newIndex = virtualIndex + services.length;
      setIndexState(newIndex);
      setTransform(newIndex * slideDist.current, false);
      return newIndex;
    }
    setIndexState(virtualIndex);
    return virtualIndex;
  };

  const goToIndex = useCallback((i: number, animate = true) => {
    const clamped = Math.max(0, Math.min(i, slides.length - 1));
    const x = Math.min(clamped * slideDist.current, maxOffset.current);
    setIndexState(clamped);
    setTransform(x, animate);
  }, [slides.length]);

  const prev = useCallback(() => {
    const i = getIndexFromOffset();
    goToIndex(i - 1, true);
  }, [goToIndex]);

  const next = useCallback(() => {
    const i = getIndexFromOffset();
    goToIndex(i + 1, true);
  }, [goToIndex]);

  // --- hover glide (muiskracht → snelheid)
  const startHoverGlide = () => {
    if (rafId.current) return;
    lastTs.current = null;
    const tick = (ts: number) => {
      rafId.current = requestAnimationFrame(tick);
      if (!hoverActive.current || dragging.current) return;
      if (lastTs.current == null) { lastTs.current = ts; return; }
      const dt = (ts - lastTs.current) / 1000;
      lastTs.current = ts;

      // snelheid op basis van muispositie t.o.v. midden
      const dx = hoverX01.current - 0.5;
      const ax = Math.abs(dx) - hoverDeadZone;
      if (ax <= 0) return; // in dode zone → geen beweging

      const dir = dx > 0 ? 1 : -1;
      const norm = Math.min(1, ax / (0.5 - hoverDeadZone));
      const vx = dir * hoverMaxSpeed * norm; // px/s

      // verplaatsing
      let raw = offset.current + vx * dt;
      raw = Math.max(0, Math.min(raw, maxOffset.current));
      setTransform(raw, false);

      // update virtuele index + seamless edges
      const vi = getIndexFromOffset();
      handleInfiniteEdges(vi);
    };
    rafId.current = requestAnimationFrame(tick);
  };

  const stopHoverGlide = () => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = null;
    lastTs.current = null;
    // netjes snappen naar dichtstbijzijnde slide
    const nearest = getIndexFromOffset();
    goToIndex(nearest, true);
  };

  // --- effects
  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    wrapRef.current && ro.observe(wrapRef.current);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [services.length, cardHeight, maxCard, gap, peek]);

  // Na transitions (pijlen/autoplay) alsnog seamless maken
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onEnd = () => handleInfiniteEdges(getIndexFromOffset());
    track.addEventListener("transitionend", onEnd);
    return () => track.removeEventListener("transitionend", onEnd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [services.length]);

  // autoplay
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    if (!autoplay) return;
    autoId.current && clearInterval(autoId.current);
    autoId.current = window.setInterval(() => {
      if (!pausedRef.current && !dragging.current && !hoverActive.current) next();
    }, interval);
    return () => {
      if (autoId.current) clearInterval(autoId.current);
      autoId.current = null;
    };
  }, [autoplay, interval, next]);

  // drag/swipe
  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    e.currentTarget.setPointerCapture?.(e.pointerId);
    dragging.current = true;
    dragStartX.current = e.clientX;
    dragStartOffset.current = offset.current;
    setTransform(offset.current, false);
    setPaused(true);
  };
  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (dragging.current) {
      const dx = dragStartX.current - e.clientX;
      const raw = dragStartOffset.current + dx;
      const clamped = Math.max(0, Math.min(raw, maxOffset.current));
      setTransform(clamped, false);
    } else if (hoverActive.current) {
      // update hoverX terwijl we bewegen
      const rect = wrapRef.current!.getBoundingClientRect();
      hoverX01.current = (e.clientX - rect.left) / rect.width;
    }
  };
  const onPointerUp: React.PointerEventHandler<HTMLDivElement> = () => {
    if (!dragging.current) return;
    dragging.current = false;
    const i = getIndexFromOffset();
    goToIndex(i, true);
    setPaused(false);
  };

  // hover enter/leave
  const onMouseEnter = (e: React.MouseEvent) => {
    setPaused(true);
    pausedRef.current = true;
    hoverActive.current = true;
    // init hoverX
    const rect = wrapRef.current!.getBoundingClientRect();
    hoverX01.current = (e.clientX - rect.left) / rect.width;
    startHoverGlide();
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!hoverActive.current) return;
    const rect = wrapRef.current!.getBoundingClientRect();
    hoverX01.current = (e.clientX - rect.left) / rect.width;
  };
  const onMouseLeave = () => {
    hoverActive.current = false;
    stopHoverGlide();
    setPaused(false);
    pausedRef.current = false;
  };

  return (
    <section className="py-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="mb-1 text-3xl font-bold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-600">Hover om te bewegen • Swipe • Pijlen</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            aria-label="Vorige"
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            aria-label="Volgende"
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Geen native horizontale scroll → geen scrollbar */}
      <div
        ref={wrapRef}
        className="relative overflow-hidden select-none [contain:layout_paint_size_style]"
        style={{ height: `${cardHeight}px` }}
        onMouseEnter={onMouseEnter}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <div
          ref={trackRef}
          className="flex touch-pan-y"
          style={{
            transform: "translate3d(0,0,0)",
            willChange: "transform",
            height: `${cardHeight}px`,
            cursor: hoverActive.current ? "ew-resize" : "default",
            backfaceVisibility: "hidden",
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          {/* head clones */}
          {services.slice(-CLONES).map((s, i) => (
            <div key={`clone-head-${i}`} data-slide className="flex-none" style={{ height: cardHeight }}>
              <ServiceCard service={s} />
            </div>
          ))}
          {/* real slides */}
          {services.map((s) => (
            <div key={s.id} data-slide className="flex-none" style={{ height: cardHeight }}>
              <ServiceCard service={s} />
            </div>
          ))}
          {/* tail clones */}
          {services.slice(0, CLONES).map((s, i) => (
            <div key={`clone-tail-${i}`} data-slide className="flex-none" style={{ height: cardHeight }}>
              <ServiceCard service={s} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
