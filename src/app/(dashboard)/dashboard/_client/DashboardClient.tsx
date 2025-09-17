"use client";

import useSWR from "swr";
import { Car, DollarSign, Users, Star, TrendingUp, MapPin, Clock } from "lucide-react";

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((r) => {
    if (!r.ok) throw new Error("Unauthorized");
    return r.json();
  });

const iconMap: Record<string, any> = { Car, DollarSign, Users, Star };

export default function DashboardClient() {
  const { data, error, isLoading } = useSWR("/api/dashboard/overview", fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 15000,
  });

  if (isLoading) return <div className="p-4">Laden…</div>;
  if (error || !data?.ok) return <div className="p-4 text-red-600">Kon data niet laden.</div>;

  return (
    <div className="space-y-8">
      {/* KPI's */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {data.stats.map((s: any) => {
          const Icon = iconMap[s.icon] ?? Car;
          return (
            <div key={s.label} className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{s.label}</p>
                  <p className="mt-1 text-3xl font-bold text-gray-900">{s.value}</p>
                  <div className="mt-2 flex items-center text-sm">
                    <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                    <span className="font-medium text-green-600">{s.change}</span>
                    <span className="ml-1 text-gray-500">vs vorige week</span>
                  </div>
                </div>
                <div className={`${s.color} grid h-12 w-12 place-items-center rounded-xl shadow-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recente boekingen */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900">Recente Boekingen</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Klant</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Route</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Tijd</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Totaal</th>
              </tr>
            </thead>
            <tbody>
              {data.recentBookings.map((b: any) => (
                <tr key={b.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">#{b.id.slice(-6)}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{b.customer || "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      {b.from || "?"} → {b.to || "?"}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      {b.time || "—"}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{b.status}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {b.total != null
                      ? new Intl.NumberFormat("nl-NL",{style:"currency",currency:"EUR"}).format(b.total)
                      : "—"}
                  </td>
                </tr>
              ))}
              {data.recentBookings.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-sm text-gray-500">
                    Nog geen boekingen gevonden.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
