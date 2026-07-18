import { NextResponse } from "next/server";

/**
 * Next.js 16 — proxy (replaces deprecated middleware).
 * Protects all routes under /(protected) group at the network edge,
 * before any Server Component even renders.
 */

const PROTECTED = [
  "/dashboard",
  "/my-kit",
  "/favorites",
  "/orders",
  "/profile",
];

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED.some((p) => pathname.startsWith(p));

  if (isProtected) {
    const session = request.cookies.get("ft_session");
    if (!session?.value) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/my-kit/:path*",
    "/favorites/:path*",
    "/orders/:path*",
    "/profile/:path*",
  ],
};
