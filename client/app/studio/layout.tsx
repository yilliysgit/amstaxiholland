// app/studio/layout.tsx
import type { ReactNode } from 'react'

export default function StudioLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  )
}