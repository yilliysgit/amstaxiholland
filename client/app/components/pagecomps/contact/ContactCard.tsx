// client/app/components/pagecomps/contact/ContactCard.tsx

import React from "react";

type ContactCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  children?: React.ReactNode;
};

export default function ContactCard({
  icon,
  title,
  description,
  children,
}: ContactCardProps) {
  return (
    <div className="h-full rounded-3xl bg-white/90 p-5 shadow-[0_18px_55px_rgba(15,23,42,0.10)] ring-1 ring-slate-100 backdrop-blur-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white text-xs">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 text-xs text-slate-500">{description}</p>
        </div>
      </div>

      {children}
    </div>
  );
}
