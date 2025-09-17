// ./middleware.ts
export { auth as middleware } from "@/auth";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/api/dashboard/:path*",   // ⬅️ beveilig de dashboard-API
  ],
};
