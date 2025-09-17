// /components/services/ServiceCard.tsx

import React, { useState } from "react";
import { 
  ArrowRight, 
  CheckCircle, 
  Crown, 
  Sparkles, 
  Zap,
  Plane,
  Briefcase,
  Camera,
  Heart,
  Users,
  Moon,
  Ship
} from "lucide-react";
import { TaxiService } from '@/types/services/services.type';

const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

// Icon mapping
const iconMap = {
  'Plane': Plane,
  'Briefcase': Briefcase,
  'Crown': Crown,
  'Camera': Camera,
  'Heart': Heart,
  'Users': Users,
  'Moon': Moon,
  'Ship': Ship,
};

function ServiceCard({ service }: { service: TaxiService }) {
  const [hover, setHover] = useState(false);
  
  // Get the icon component
  const IconComponent = iconMap[service.icon as keyof typeof iconMap];
  
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

        {/* Icon - Top Left */}
        {IconComponent && (
          <div className="absolute top-3 left-3 z-10">
            <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-white/60 flex items-center justify-center shadow-lg">
              <IconComponent className="w-5 h-5 text-gray-700" />
            </div>
          </div>
        )}

        {/* Badge - Top Right */}
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

        {/* Price - Bottom Left */}
        <div className="absolute bottom-3 left-3 bg-white/95 text-gray-900 px-3 py-1.5 rounded-full text-xs font-semibold shadow border border-white/60">
          {service.price}
        </div>
      </div>

      {/* Content */}
      <div className="relative p-6 bg-gradient-to-br from-white/80 to-white/60">
        <h3 className="text-xl font-extrabold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent leading-tight mb-2">
          {service.title}
        </h3>
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
          className="relative inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 font-semibold bg-gradient-to-r from-blue-600 to-blue-700 text-white overflow-hidden group hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
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

export default ServiceCard;