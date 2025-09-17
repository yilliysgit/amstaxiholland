"use client";
import { useState } from "react";
import Logo from "@/app/assets/Logo/Logo"; // ✅ default import

import {
  LayoutDashboard,
  ClipboardList,
  Route,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  User,
  Car,
  MapPin,
  Clock,
  DollarSign,
  TrendingUp,
  Users,
  Calendar,
  Phone,
  Navigation,
  Star,
  Activity
} from "lucide-react";

const NAV = [
  { href: "/dashboard", label: "Overzicht", icon: LayoutDashboard },
  { href: "/dashboard/bookings", label: "Boekingen", icon: ClipboardList },
  { href: "/dashboard/dispatch", label: "Dispatch", icon: Route },
  { href: "/dashboard/settings", label: "Instellingen", icon: Settings },
];

const MOCK_DATA = {
  stats: [
    { label: "Actieve Ritten", value: "24", change: "+12%", icon: Car, color: "bg-blue-500" },
    { label: "Totale Omzet", value: "€2,847", change: "+8%", icon: DollarSign, color: "bg-green-500" },
    { label: "Beschikbare Chauffeurs", value: "18", change: "-2", icon: Users, color: "bg-purple-500" },
    { label: "Gemiddelde Rating", value: "4.8", change: "+0.1", icon: Star, color: "bg-yellow-500" }
  ],
  recentBookings: [
    { id: "B001", from: "Centraal Station", to: "Schiphol", time: "14:30", status: "onderweg", driver: "Jan van der Berg" },
    { id: "B002", from: "Dam Square", to: "RAI", time: "14:45", status: "wachtend", driver: "Maria Santos" },
    { id: "B003", from: "Vondelpark", to: "Zuidoost", time: "15:00", status: "voltooid", driver: "Ahmed Hassan" },
    { id: "B004", from: "Leidseplein", to: "Noord", time: "15:15", status: "toegewezen", driver: "Lisa de Wit" }
  ],
  activeDrivers: [
    { name: "Jan van der Berg", status: "onderweg", location: "A10 West", rating: 4.9, trips: 8 },
    { name: "Maria Santos", status: "beschikbaar", location: "Centrum", rating: 4.8, trips: 6 },
    { name: "Ahmed Hassan", status: "pauze", location: "Zuid", rating: 4.7, trips: 12 },
    { name: "Lisa de Wit", status: "onderweg", location: "Oost", rating: 4.9, trips: 5 }
  ]
};

export default function TaxiDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");

  const DashboardHeader = () => (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg">
              <Logo className="h-8 w-8" />
            </div>
            <h1 className="text-lg font-bold text-gray-900">AmsTaxiHolland - Dashboard</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Zoek ritten, chauffeurs..."
              className="h-10 w-80 rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          
          <button className="relative grid h-10 w-10 place-items-center rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></span>
          </button>
          
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2">
            <User className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );

  const StatCard = ({ stat }) => (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{stat.label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
          <div className="flex items-center mt-2 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">{stat.change}</span>
            <span className="text-gray-500 ml-1">vs vorige week</span>
          </div>
        </div>
        <div className={`${stat.color} h-12 w-12 rounded-xl grid place-items-center shadow-lg`}>
          <stat.icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  const BookingRow = ({ booking }) => {
    const statusColors = {
      onderweg: "bg-blue-100 text-blue-800",
      wachtend: "bg-yellow-100 text-yellow-800",
      voltooid: "bg-green-100 text-green-800",
      toegewezen: "bg-purple-100 text-purple-800"
    };

    return (
      <tr className="border-b border-gray-100 hover:bg-gray-50">
        <td className="px-4 py-3 font-medium text-gray-900">#{booking.id}</td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            {booking.from} → {booking.to}
          </div>
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            {booking.time}
          </div>
        </td>
        <td className="px-4 py-3">
          <span className={`px-2 py-1 rounded-lg text-xs font-medium ${statusColors[booking.status]}`}>
            {booking.status}
          </span>
        </td>
        <td className="px-4 py-3 text-sm text-gray-600">{booking.driver}</td>
        <td className="px-4 py-3">
          <div className="flex gap-1">
            <button className="p-1 rounded hover:bg-gray-100">
              <Phone className="h-4 w-4 text-gray-500" />
            </button>
            <button className="p-1 rounded hover:bg-gray-100">
              <Navigation className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        </td>
      </tr>
    );
  };

  const DriverCard = ({ driver }) => {
    const statusColors = {
      onderweg: "bg-blue-500",
      beschikbaar: "bg-green-500",
      pauze: "bg-yellow-500",
      offline: "bg-gray-500"
    };

    return (
      <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:shadow-sm transition-shadow">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 grid place-items-center text-white font-medium">
              {driver.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className={`absolute -bottom-0.5 -right-0.5 h-4 w-4 ${statusColors[driver.status]} rounded-full border-2 border-white`}></div>
          </div>
          <div>
            <p className="font-medium text-gray-900">{driver.name}</p>
            <p className="text-sm text-gray-500">{driver.location}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 mb-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{driver.rating}</span>
          </div>
          <p className="text-xs text-gray-500">{driver.trips} ritten</p>
        </div>
      </div>
    );
  };

  const DashboardContent = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overzicht</h2>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {MOCK_DATA.stats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>

        {/* Recent Bookings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Recente Boekingen</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">ID</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Route</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Tijd</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Chauffeur</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Acties</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_DATA.recentBookings.map((booking) => (
                      <BookingRow key={booking.id} booking={booking} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Active Drivers */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Actieve Chauffeurs</h3>
            </div>
            <div className="p-6 space-y-4">
              {MOCK_DATA.activeDrivers.map((driver, index) => (
                <DriverCard key={index} driver={driver} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 text-gray-900">
      <DashboardHeader />
      
      <div className="mx-auto flex max-w-7xl gap-6 px-4 pb-10 pt-6 md:px-6">
        {/* Sidebar */}
        <aside className={`relative h-[calc(100vh-5.5rem)] shrink-0 rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}>
          {/* Collapse button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-3 top-6 z-10 grid h-7 w-7 place-items-center rounded-full border bg-white shadow-md hover:bg-gray-50 hover:shadow-lg transition-all"
            aria-label={collapsed ? "Sidebar uitklappen" : "Sidebar inklappen"}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4 text-gray-600" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-gray-600" />
            )}
          </button>
          
          <nav className="flex h-full flex-col">
            <div className="px-3 pb-2 pt-4">
              {!collapsed && (
                <p className="px-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Navigatie
                </p>
              )}
            </div>
            
            <ul className="flex-1 space-y-2 px-3">
              {NAV.map(({ href, label, icon: Icon }) => {
                const active = currentView === href.split('/').pop() || (href === '/dashboard' && currentView === 'dashboard');
                return (
                  <li key={href}>
                    <button
                      onClick={() => setCurrentView(href.split('/').pop() || 'dashboard')}
                      className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                        active
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                      title={collapsed ? label : undefined}
                    >
                      <Icon className={`h-5 w-5 ${active ? "text-white" : "text-gray-500 group-hover:text-gray-700"}`} />
                      {!collapsed && <span>{label}</span>}
                      {active && !collapsed && (
                        <div className="ml-auto h-2 w-2 rounded-full bg-white/30"></div>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
            
            {/* Footer */}
            <div className="border-t border-gray-200 p-4 text-center">
              {!collapsed && (
                <div className="space-y-1">
                  <div className="text-xs font-medium text-gray-700">TaxiPro Dashboard</div>
                  <div className="text-xs text-gray-500">v1.0 · Premium</div>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <Activity className="h-3 w-3 text-green-500" />
                    <span className="text-xs text-green-600">Systeem Online</span>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="p-6">
              {currentView === 'dashboard' && <DashboardContent />}
              {currentView === 'bookings' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Alle Boekingen</h2>
                  <p className="text-gray-600">Beheer en bekijk alle taxi boekingen in real-time.</p>
                </div>
              )}
              {currentView === 'dispatch' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Dispatch Centrum</h2>
                  <p className="text-gray-600">Wijs chauffeurs toe en optimaliseer routes.</p>
                </div>
              )}
              {currentView === 'settings' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Instellingen</h2>
                  <p className="text-gray-600">Configureer uw dashboard en accountinstellingen.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}