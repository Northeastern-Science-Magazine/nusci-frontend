import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { apiGetUserRoles } from "./lib/api/users";

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
