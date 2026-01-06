import { NextRequest, NextResponse } from "next/server";
import { apiGetUserRoles } from "./lib/api/users";

/**
 * NEXT.JS 16+ MIDDLEWARE DEPRECATED -- USE PROXY.TS
 */

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  let roles: string[] = [];

  if (token) {
    const result = await apiGetUserRoles();
    if (result.ok) {
      roles = [...result.data.roles];
    }
  }

  // Create new request headers and add the x-user-roles header
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("X-User-Roles", JSON.stringify({ roles }));

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
