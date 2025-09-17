// src/app/(public)/layout.tsx  — PUBLIC LAYOUT (hier komt je bestaande header)
import Header from "../components/layout/header/Header";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
