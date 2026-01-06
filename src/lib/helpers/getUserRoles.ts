import { headers } from "next/headers";

/**
 * Gets the user roles from the x-user-roles header set by the proxy middleware.
 *
 * ⚠️ Server-only: This function uses headers() from next/headers and can only be used in
 * Server Components, Server Actions, Route Handlers, and Middleware. It will throw an
 * error if used in Client Components.
 *
 * @returns Promise<string[]> Array of user role strings, empty array if no roles found
 */
export async function getUserRoles(): Promise<string[]> {
  const headersList = await headers();
  const userRolesHeader = headersList.get("x-user-roles");

  if (!userRolesHeader) {
    return [];
  }

  try {
    const parsed = JSON.parse(userRolesHeader);
    return Array.isArray(parsed.roles) ? parsed.roles : [];
  } catch (e) {
    console.error("Failed to parse x-user-roles header:", e);
    return [];
  }
}
