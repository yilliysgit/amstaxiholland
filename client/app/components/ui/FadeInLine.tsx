"use client"

import { useInView } from "@/hooks/pages/useInView"

type FadeInLineProps = {
  children: React.ReactNode
  delay?: number
}

export function FadeInLine({ children, delay = 0 }: FadeInLineProps) {
  const { ref, inView } = useInView({ threshold: 0.3 })

  return (
    <p
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={[
        "text-lg lg:text-xl text-slate-600 leading-relaxed",
        "transition-all duration-700 ease-out",
        inView
          ? "opacity-100 translate-y-0"
          : "opacity-50 translate-y-2",
      ].join(" ")}
    >
      {children}
    </p>
  )
}
