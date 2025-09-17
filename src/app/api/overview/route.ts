// src/app/(dashboard)/overview/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb"; // ✅ named
import { auth } from "@/auth";         // ✅ alias


const fmtAddr = (a: any) =>
  a ? `${a.address ?? ""} ${a.houseNumber ?? ""}`.trim() : "";

export async function GET() {
  // ✅ vereis login
  const session = await auth();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const db = await getDb();
    const col = db.collection("formdata");

    const since = new Date();
    since.setDate(since.getDate() - 7);

    const [activeCount, revenueAgg, recent] = await Promise.all([
      col.countDocuments({ status: { $in: ["pending_payment", "assigned", "on_route"] } }),
      col.aggregate([
        { $match: { createdAt: { $gte: since } } },
        { $group: { _id: null, sum: { $sum: { $ifNull: ["$computed.grandTotal", 0] } } } },
      ]).toArray(),
      col.find({}, { projection: { step1: 1, step4: 1, status: 1, createdAt: 1, computed: 1 } })
         .sort({ createdAt: -1 })
         .limit(10)
         .toArray(),
    ]);

    const totalRevenue = revenueAgg[0]?.sum ?? 0;

    const stats = [
      { label: "Actieve Ritten", value: String(activeCount), change: "+0%", icon: "Car", color: "bg-blue-500" },
      { label: "Totale Omzet (7d)", value: new Intl.NumberFormat("nl-NL",{style:"currency",currency:"EUR"}).format(totalRevenue), change: "+0%", icon: "DollarSign", color: "bg-green-500" },
      { label: "Beschikbare Chauffeurs", value: "0", change: "+0", icon: "Users", color: "bg-purple-500" },
      { label: "Gemiddelde Rating", value: "4.8", change: "+0.0", icon: "Star", color: "bg-yellow-500" },
    ];

    const recentBookings = recent.map((d: any) => ({
      id: String(d._id),
      from: fmtAddr(d.step1?.fromAddress),
      to: fmtAddr(d.step1?.toAddress),
      time: d.step1?.time ?? "",
      status: d.status ?? "pending_payment",
      total: d.computed?.grandTotal ?? null,
      createdAt: d.createdAt,
      customer: `${d.step4?.firstName ?? ""} ${d.step4?.lastName ?? ""}`.trim(),
    }));

    return NextResponse.json({ ok: true, stats, recentBookings });
  } catch (e: any) {
    console.error("/api/dashboard/overview error:", e);
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
