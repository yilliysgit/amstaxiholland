"use client";

import { useState, useRef, useEffect } from "react";
import { signIn } from "next-auth/react";
import { X, Eye, EyeOff, ArrowRight } from "lucide-react";

import { useRouter } from "next/navigation";



interface LoginPopOverProps {
  isOpen: boolean;
  onClose: () => void;
  id?: string;
  /** Waarheen na succesvol inloggen; valt terug op ?next=... of "/" */
  callbackUrl?: string;
}

export default function LoginPopOver({
  isOpen,
  onClose,
  id,
  callbackUrl,
}: LoginPopOverProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const router = useRouter();


  // callbackUrl: ?next=.. > prop > "/"
  const [nextUrl, setNextUrl] = useState("/");
  useEffect(() => {
    const sp = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
    setNextUrl(callbackUrl ?? sp?.get("next") ?? "/dashboard");
  }, [callbackUrl]);

  // buitenklik + Escape
useEffect(() => {
  if (!isOpen) return;
  const onDown = (e: MouseEvent | KeyboardEvent) => {
    if (e instanceof KeyboardEvent && e.key === "Escape") onClose();
    if (
      e instanceof MouseEvent &&
      popoverRef.current &&
      !popoverRef.current.contains(e.target as Node)
    ) {
      onClose();
    }
  };
  document.addEventListener("click", onDown);
  document.addEventListener("keydown", onDown);
  return () => {
    document.removeEventListener("click", onDown);
    document.removeEventListener("keydown", onDown);
  };
}, [isOpen, onClose]);



  // vriendelijke foutmelding
  const explain = (code?: string | null) => {
    switch (code) {
      case "CredentialsSignin":
        return "Onjuiste inloggegevens.";
      case "OAuthSignin":
      case "OAuthCallback":
        return "Inloggen via provider is mislukt.";
      default:
        return "Inloggen mislukt. Probeer het opnieuw.";
    }
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setErr(null);
  setIsLoading(true);

  const res = await signIn("credentials", {
    email,
    password,
    redirect: false,    // wij handelen redirect zelf af
    callbackUrl: nextUrl,
  });

  setIsLoading(false);

if (res?.ok) {
  onClose();                  // popover dicht
  router.push(res.url ?? nextUrl);
  router.refresh();           // forceer nieuwe server tree (andere layout/header)
  return;
}

  setErr(explain(res?.error));
};

  const loginWith = async (provider: "google" | "facebook") => {
    setErr(null);
    setIsLoading(true);
    // Let op: werkt pas als je provider hebt geconfigureerd
    await signIn(provider, { callbackUrl: nextUrl });
    // bij OAuth laten we redirect door NextAuth afhandelen
  };

  if (!isOpen) return null;

  return (
    <div
      ref={popoverRef}
      id={id}
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-title"
      className="absolute right-36 top-full mt-2 w-[380px] bg-navy-800 rounded-xl shadow-luxury border border-navy-700/60 p-7 z-50 animate-fade-in"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 id="login-title" className="text-lg font-semibold text-white">
          Inloggen Premium Taxi
        </h3>
        <button
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-navy-700 transition-colors"
          aria-label="Sluit login"
        >
          <X className="h-5 w-5 text-gray-300 hover:text-white" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            id="email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-navy-600 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all bg-navy-700/50 text-sm"
            placeholder="Loginnaam of e-mailadres"
            required
          />
        </div>

        <div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-navy-600 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all bg-navy-700/50 pr-11 text-sm"
              placeholder="Wachtwoord"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-navy-600 transition-colors"
              aria-label={showPassword ? "Verberg wachtwoord" : "Toon wachtwoord"}
              aria-pressed={showPassword}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-300" />
              ) : (
                <Eye className="h-4 w-4 text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Errors */}
        <p aria-live="polite" className="min-h-[1rem] text-xs text-red-400">
          {err}
        </p>

        {/* Login Button Row */}
        <div className="flex items-center gap-3 mt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-5 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md flex items-center justify-center gap-2 text-sm"
          >
            {isLoading ? "Bezig..." : (
              <>
                <ArrowRight className="h-4 w-4" />
                Inloggen
              </>
            )}
          </button>

          <button
            type="button"
            className="text-xs text-blue-300 hover:text-blue-200 font-medium transition-colors hover:underline underline-offset-2 whitespace-nowrap"
          >
            Wachtwoord vergeten?
          </button>
        </div>
      </form>

      {/* Divider */}
      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-navy-600"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-3 bg-navy-800 text-gray-300">Of log in met</span>
        </div>
      </div>

      {/* Social Login */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => loginWith("google")}
          disabled={isLoading}
          className="flex items-center justify-center px-4 py-2.5 border border-navy-600 rounded-lg hover:bg-navy-700 transition-colors disabled:opacity-50"
        >
          {/* Google icoon */}
          <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span className="ml-2 text-white font-medium text-xs">Google</span>
        </button>

        <button
          onClick={() => loginWith("facebook")}
          disabled={isLoading}
          className="flex items-center justify-center px-4 py-2.5 border border-navy-600 rounded-lg hover:bg-navy-700 transition-colors disabled:opacity-50"
        >
          {/* Facebook icoon */}
          <svg className="h-4 w-4" fill="#1877F2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <span className="ml-2 text-white font-medium text-xs">Facebook</span>
        </button>
      </div>

      {/* Bottom Text */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-300">
          Nog geen account?{" "}
          <button className="text-blue-300 hover:text-blue-200 font-medium transition-colors hover:underline underline-offset-2">
            Registreer hier
          </button>
        </p>
      </div>
    </div>
  );
}
