"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DashboardHeader from "../_components/DashboardHeader";
import {
  LayoutDashboard,
  ClipboardList,
  Route,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

type Props = { children: React.ReactNode };

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const NAV: NavItem[] = [
  { href: "/dashboard", label: "Overzicht", icon: LayoutDashboard },
  { href: "/dashboard/bookings", label: "Boekingen", icon: ClipboardList },
  { href: "/dashboard/dispatch", label: "Dispatch", icon: Route },
  { href: "/dashboard/settings", label: "Instellingen", icon: Settings },
];

export default function DashboardLayout({ children }: Props) {
  const pathname = usePathname();

  // Desktop collapsible + mobile drawer
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close the mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Active helper
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  // Render single nav link
  const NavLink = ({ item }: { item: NavItem }) => {
    const Icon = item.icon;
    const active = isActive(item.href);
    return (
      <Link
        href={item.href}
        className={[
          "group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium outline-none transition",
          active
            ? "bg-gray-900 text-white shadow-sm"
            : "text-gray-700 hover:bg-gray-100",
          "focus-visible:ring-2 focus-visible:ring-gray-900/20",
        ].join(" ")}
        title={collapsed ? item.label : undefined}
      >
        <Icon
          className={[
            "h-5 w-5 shrink-0",
            active ? "text-white" : "text-gray-500 group-hover:text-gray-700",
          ].join(" ")}
        />
        {!collapsed && <span className="truncate">{item.label}</span>}
      </Link>
    );
  };

  // Sidebar component (shared mobile/desktop)
  const Sidebar = useMemo(
    () => (
      <nav className="flex h-full flex-col">
        <div className="px-3 pb-2 pt-4">
          {!collapsed && (
            <p className="px-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Navigatie
            </p>
          )}
        </div>

        <ul className="flex-1 space-y-1 px-2">
          {NAV.map((item) => (
            <li key={item.href}>
              <NavLink item={item} />
            </li>
          ))}
        </ul>

        <div className="border-t border-gray-200 p-3 text-[11px] text-gray-500">
          {!collapsed && <span>v1.0 · Premium Taxi Dashboard</span>}
        </div>
      </nav>
    ),
    [collapsed, pathname]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 text-gray-900">
      {/* Topbar */}
      <DashboardHeader />

      {/* Mobile top row: menu button */}
      <div className="mx-auto block w-full max-w-7xl px-4 pt-4 md:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/20"
          aria-label="Open navigatie"
        >
          <Menu className="h-4 w-4" />
          Menu
        </button>
      </div>

      <div className="mx-auto flex max-w-7xl gap-6 px-4 pb-10 pt-4 md:px-6">
        {/* Desktop sidebar */}
        <aside
          className={[
            "relative hidden h-[calc(100vh-6.5rem)] shrink-0 rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 md:block",
            collapsed ? "w-16" : "w-64",
          ].join(" ")}
        >
          {/* Collapse button (desktop) */}
          <button
            onClick={() => setCollapsed((s) => !s)}
            className="absolute -right-3 top-6 z-10 grid h-7 w-7 place-items-center rounded-full border bg-white shadow-sm transition hover:bg-gray-50"
            aria-label={collapsed ? "Sidebar uitklappen" : "Sidebar inklappen"}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>

          {Sidebar}
        </aside>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
            role="presentation"
            onClick={() => setMobileOpen(false)}
          />
        )}
        <div
          className={[
            "fixed inset-y-0 left-0 z-50 w-72 border-r border-gray-200 bg-white shadow-xl transition-transform duration-300 md:hidden",
            mobileOpen ? "translate-x-0" : "-translate-x-full",
          ].join(" ")}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between border-b px-4 py-3">
            <span className="text-sm font-semibold">Navigatie</span>
            <button
              onClick={() => setMobileOpen(false)}
              className="grid h-8 w-8 place-items-center rounded-lg border bg-white hover:bg-gray-50"
              aria-label="Sluiten"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="h-[calc(100vh-3rem)]">{Sidebar}</div>
        </div>

        {/* Main content */}
        <main className="min-w-0 flex-1">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            {/* Optional: page heading slot via children */}
            <div className="p-4 sm:p-6">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
