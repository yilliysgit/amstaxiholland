import Logo from "@/app/assets/Logo/Logo";
import { LogoSvg } from "@/app/assets/Logo/Logo";
import Link from "next/link";

export default function page() {
  return (
    <>
    <Logo href="/dashboard" className="w-auto h-12" variant="default" label="Logo" />

      <LogoSvg className="w-auto h-12" variant="default" label="Logo" />
        // of zelf wrappen:
        <Link href="/dashboard">
            <LogoSvg className="w-auto h-12" variant="default" label="Logo" />
        </Link>
    </>
  )
}



