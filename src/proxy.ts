import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { apiGetUserRoles } from "./lib/api/users";
import { redirect, RedirectType } from "next/navigation";

/**
 * Proxy function
 *
 * @param request
 * @returns NextResponse with x-user-roles header
 */
export async function proxy(request: NextRequest): Promise<NextResponse> {
  const token = request.cookies.get("token")?.value;
  let roles: string[] = [];

  if (token) {
    const result = await apiGetUserRoles();
    if (result.ok) {
      roles = [...result.data.roles];
    }
  }

  // if accessing internal page as unauthorized, redirect to login
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
