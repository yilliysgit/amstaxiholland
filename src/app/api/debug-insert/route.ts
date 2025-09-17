import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

// Zorg dat dit NIET op Edge draait (Mongo driver vereist Node.js)
export const runtime = "nodejs";

export async function POST() {
  try {
    const db = await getDb();
    const result = await db.collection("formdata").insertOne({
      _test: true,
      message: "hello from debug-insert",
      createdAt: new Date(),
    });
    return NextResponse.json({ ok: true, id: result.insertedId });
  } catch (err: any) {
    console.error("debug-insert error:", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
