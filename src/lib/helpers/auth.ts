"use server";

import { cookies, headers } from "next/headers";
import { apiLogin } from "../api/users";

/**
 * Returns the roles of the currently signed in user.
 * [] for logged out.
 *
 * @returns Promise<string[]>
 */
export async function getUserRoles(): Promise<string[]> {
  const headersList = headers();
  const userRolesHeader = headersList.get("X-User-Roles");

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

/**
 * Handles login. Sends
 *
 * @param data
 */
export async function handleLogin(data: { email: string; password: string }) {
  const result = await apiLogin(data);
  if (result.ok) {
    const cookiesStore = await cookies();
    const setCookieHeader = result?.headers?.get("set-cookie");
    if (setCookieHeader) {
      const [cookieName, cookieValue] = setCookieHeader.split(";")[0].split("=");
      cookiesStore.set(cookieName, cookieValue);
    }
  } else {
    // error logging in - display message to user somehow
  }
}
