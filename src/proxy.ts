import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { apiGetUserRoles } from "./lib/api/users";

/**
 * Proxy function
 *
 * @param request
 * @returns NextResponse with x-user-roles header
 */
export async function proxy(
  request: NextRequest,
  backendPath?: string,
): Promise<NextResponse> {
  const token = request.cookies.get("token")?.value;
  let roles: string[] = [];

  if (token) {
    const result = await apiGetUserRoles();
    if (result.ok) {
      roles = [...result.data.roles];
    }
  }

  // use url if it is the same as backendpath
  const url = new URL(request.url);
  const path = backendPath || url.pathname;

  // Create new request headers and add the x-user-roles header
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("X-User-Roles", JSON.stringify({ roles }));

  const backendResponse = await fetch("http://localhost:9999" + path, {
    method: request.method,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "X-User-Roles": JSON.stringify({ roles }),
    },
    body:
      // make sure req is not GET/HEAD. GET/HEAD cannot have a body
      request.method !== "GET" && request.method !== "HEAD"
        ? await request.text()
        : undefined,
  });

  const data = await backendResponse.json();

  // Return NextResponse with proper typing
  const response: NextResponse = NextResponse.json(data, {
    status: backendResponse.status,
  });

  return response;
}
