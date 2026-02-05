// @/datePicker/TimePicker.tsx

"use client";
import { Clock } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Time24 } from "@/types/dateTime/DateTime.type";

type Props = {
  value: Time24 | "";
  onChange: (next: Time24 | "") => void;
  step?: number;
  className?: string;
  placeholder?: string;
  /** De datum waarop de tijd geldt (YYYY-MM-DD). Nodig voor 'vandaag' regel. */
  selectedDate?: string | null;
  /** Nieuw: minimale toegestane tijd (HH:mm). */
  min?: Time24;
};

const ALL_HOURS = [
  "00","01","02","03","04","05","06","07","08","09",
  "10","11","12","13","14","15","16","17","18","19",
  "20","21","22","23"
];

const ALL_MINUTES = [
  "00","01","02","03","04","05","06","07","08","09",
  "10","11","12","13","14","15","16","17","18","19",
  "20","21","22","23","24","25","26","27","28","29",
  "30","31","32","33","34","35","36","37","38","39",
  "40","41","42","43","44","45","46","47","48","49",
  "50","51","52","53","54","55","56","57","58","59"
];

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
const pad2 = (n: number) => String(n).padStart(2, "0");

export default function TimePicker({
  value,
  onChange,
  step = 5,
  className = "",
  placeholder = "--:--",
  selectedDate,
  min,
}: Props) {
  const [openField, setOpenField] = useState<"hour" | "minute" | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpenField(null);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const [hStr, mStr] = value ? value.split(":") : ["", ""];
  const isEmpty = !value;

  // Is de gekozen dag vandaag?
  const isToday = useMemo(() => {
    if (!selectedDate) return false;
    const today = new Date().toISOString().slice(0, 10);
    return selectedDate === today;
  }, [selectedDate]);

  // “Nu” → eerste mogelijke tijdstap: +10 min, afgerond op 'step'
  const now = useMemo(() => {
    const current = new Date();
    const minutes = current.getMinutes();
    const nextStep = Math.ceil((minutes + 10) / step) * step;
    return {
      hour: current.getHours() + (nextStep >= 60 ? 1 : 0),
      minute: nextStep >= 60 ? nextStep - 60 : nextStep,
    };
  }, [step]);

  // Bepaal effectieve minimumtijd in minuten:
  // - als het vandaag is → vandaag-minuut
  // - als 'min' is meegegeven → die ook meenemen
  // → neem de strengste (max)
  const todayLimit = isToday ? now.hour * 60 + now.minute : -1;
  const propLimit  = min ? toMin(min) : -1;
  const effectiveMin = Math.max(todayLimit, propLimit); // -1 betekent: geen limiet

  const minHour = effectiveMin >= 0 ? Math.floor(effectiveMin / 60) : -1;
  const minMinuteRaw = effectiveMin >= 0 ? effectiveMin % 60 : 0;
  const minMinuteAligned = effectiveMin >= 0
    ? Math.ceil(minMinuteRaw / step) * step
    : 0;

  // Mag het 'minHour' uur nog gekozen worden? (alleen als er nog een geldige minuut bestaat binnen dat uur)
  const allowMinHour = !(effectiveMin >= 0 && minMinuteAligned >= 60);

  // Urenlijst filteren
  const hours = useMemo(() => {
    if (effectiveMin < 0) return ALL_HOURS;
    return ALL_HOURS.filter(h => {
      const hour = parseInt(h, 10);
      if (hour > minHour) return true;
      if (hour === minHour) return allowMinHour; // alleen tonen als er nog minuten over zijn
      return false;
    });
  }, [effectiveMin, minHour, allowMinHour]);

  // Minuten op basis van geselecteerd uur & minimum
  const minutes = useMemo(() => {
    const stepMinutes = ALL_MINUTES.filter(m => parseInt(m, 10) % step === 0);

    // Geen uur gekozen? Laat gewoon de stap-minuten zien
    if (!hStr) return stepMinutes;

    const hour = parseInt(hStr, 10);

    // Als uur lager is dan minHour → geen minuten beschikbaar
    if (effectiveMin >= 0 && hour < minHour) return [];

    // Als gelijk aan minHour → filter op aligned minimum
    if (effectiveMin >= 0 && hour === minHour) {
      return stepMinutes.filter(m => parseInt(m, 10) >= minMinuteAligned);
    }

    // Anders: alle stap-minuten
    return stepMinutes;
  }, [step, hStr, effectiveMin, minHour, minMinuteAligned]);

  const setHour = (h: string) => {
    let nextMinute = mStr || "00";
    // Als je het minimumuur kiest en de huidige minuut te laag is → optillen
    if (effectiveMin >= 0 && parseInt(h, 10) === minHour) {
      const curMin = parseInt(nextMinute, 10);
      if (curMin < minMinuteAligned) {
        nextMinute = pad2(Math.min(59, minMinuteAligned));
      }
    }
    onChange(`${h}:${nextMinute}` as Time24);
    setOpenField(null);
  };

  const setMinute = (m: string) => {
    const hourStr = hStr || "00";
    // Block klik als deze minuut onder de effectieve minimumtijd valt
    if (effectiveMin >= 0 && parseInt(hourStr, 10) === minHour) {
      if (parseInt(m, 10) < minMinuteAligned) return;
    }
    onChange(`${hourStr}:${m}` as Time24);
    setOpenField(null);
  };

  const displayHour = hStr || placeholder.slice(0, 2);
  const displayMinute = mStr || placeholder.slice(3, 5);

  return (
    <div className={`relative ${className}`} ref={ref}>
      <div className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 text-sm flex items-center justify-between focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setOpenField(openField === "hour" ? null : "hour")}
            className={`px-2 py-1 rounded hover:bg-gray-100 transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
              isEmpty ? "text-gray-400" : "text-gray-800"
            } ${openField === "hour" ? "bg-gray-100" : ""}`}
          >
            {displayHour}
          </button>

          <span className="text-gray-400 select-none">:</span>

          <button
            type="button"
            onClick={() => setOpenField(openField === "minute" ? null : "minute")}
            className={`px-2 py-1 rounded hover:bg-gray-100 transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
              isEmpty ? "text-gray-400" : "text-gray-800"
            } ${openField === "minute" ? "bg-gray-100" : ""}`}
          >
            {displayMinute}
          </button>
        </div>

        <Clock className="w-4 h-4 text-gray-500" />
      </div>

      {openField === "hour" && (
        <div className="absolute z-50 mt-1 left-3 w-20 max-h-48 overflow-y-auto rounded-lg shadow-lg border border-gray-200 bg-white">
          {hours.length === 0 ? (
            <div className="px-3 py-2 text-gray-400 text-sm">Geen beschikbare uren</div>
          ) : (
            hours.map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => setHour(h)}
                className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-100 ${
                  hStr === h ? "bg-gray-100 font-medium" : ""
                }`}
              >
                {h}
              </button>
            ))
          )}
        </div>
      )}

      {openField === "minute" && (
        <div className="absolute z-50 mt-1 left-16 w-20 max-h-48 overflow-y-auto rounded-lg shadow-lg border border-gray-200 bg-white">
          {minutes.length === 0 ? (
            <div className="px-3 py-2 text-gray-400 text-sm">Geen beschikbare minuten</div>
          ) : (
            minutes.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMinute(m)}
                className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-100 ${
                  mStr === m ? "bg-gray-100 font-medium" : ""
                }`}
              >
                {m}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
