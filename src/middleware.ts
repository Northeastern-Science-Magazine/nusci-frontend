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

  // if accessing internal page as unauthenticated, redirect to login page
  // commented out for internal page testing
  if (request.url.includes("/internal/") && roles.length == 0) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Create new request headers and add the x-user-roles header
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("X-User-Roles", JSON.stringify({ roles }));

  // Block pages from access for maintenance
  const blockedURLs = [
    "/signup",
    "/teams/writing",
    "/teams/design",
    "/teams/photography",
    "/teams/web-and-software",
    "/issue/",
    "/about-us", //something is up here
    "/create-account",
    "/invalid-invite",
  ];

  if (blockedURLs.some((url) => request.url.includes(url))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

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
