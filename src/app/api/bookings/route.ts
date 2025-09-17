// /src/app/api/bookings/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json(); // jouw step1–4 payload

    if (!body?.step4?.email || !body?.step2?.totalPrice) {
      return NextResponse.json({ ok:false, error:"Missing required fields" }, { status: 400 });
    }

    const db = await getDb();
    const result = await db.collection("formdata").insertOne({
      ...body,
      status: "pending_payment",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ ok:true, id: result.insertedId });
  } catch (err: any) {
    console.error("POST /api/bookings error:", err);
    return NextResponse.json({ ok:false, error:String(err) }, { status: 500 });
  }
}
