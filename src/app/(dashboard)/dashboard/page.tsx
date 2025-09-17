import { auth } from "@/auth";
import { redirect } from "next/navigation";
import DashboardClient from "./_client/DashboardClient"; // ✅ voeg 'from' + pad toe

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/login?next=/dashboard");

  return <DashboardClient />;
}