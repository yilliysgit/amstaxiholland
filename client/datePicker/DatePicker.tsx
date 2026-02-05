// @/datePicker/DatePicker

"use client";
import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import { nl } from "date-fns/locale";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import "react-day-picker/dist/style.css";

const toLocalISO = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const fromISO = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
};

type Props = {
  value: string;
  onChange: (next: string) => void;
  minDate: Date;
  maxDate: Date;
  placeholder?: string;
  className?: string;
};

export default function DatePicker({
  value,
  onChange,
  minDate,
  maxDate,
  placeholder = "dd/mm/jjjj",
  className = "",
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const selected = value ? fromISO(value) : undefined;
 const display = selected ? format(selected, "dd/MM/yyyy") : "";

  return (
    <div className="relative" ref={ref}>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="w-full px-3 py-3 glass-effect border border-gray-200/50 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-300 group-hover:border-gray-300/70 text-gray-800 text-sm text-left"
        >
          {display || <span className="text-gray-400">{placeholder}</span>}
        </button>
        
        {/* Calendar icon - exact zoals Timer icon bij tijd */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <Calendar className="w-4 h-4 text-gray-500" />
        </div>
      </div>

      {open && (
        <div className="absolute z-50 mt-2 p-4 rounded-2xl shadow-2xl border border-gray-200/60 glass-effect">
          <DayPicker
  mode="single"
  locale={nl}
  selected={selected}
  fromDate={minDate}
  toDate={maxDate}
disabled={(date) => {
  const norm = (d: Date) => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; };
  const d0   = norm(date);
  const min0 = norm(minDate);
  const max0 = norm(maxDate);
  return d0 < min0 || d0 > max0;
}}

  startMonth={minDate}
  endMonth={maxDate}
  captionLayout="dropdown"  // ← GEFIXTE VERSIE
onSelect={(d) => {
  if (!d) return onChange("");

  const norm = (x: Date) => { const y = new Date(x); y.setHours(0,0,0,0); return y; };
  const d0   = norm(d);
  const min0 = norm(minDate);
  const max0 = norm(maxDate);

  if (d0 < min0 || d0 > max0) return; // buiten bereik -> negeren

  onChange(toLocalISO(d));
  setOpen(false);
}}

  className="text-gray-800"
/>
        </div>
      )}
    </div>
  );
}



