"use server";

import { cookies } from "next/headers";

export type ApiResponse<T> =
  | { ok: true; data: T; headers?: Response["headers"]; setCookieHeaders?: string[] }
  | { ok: false; error: string; headers?: Response["headers"]; setCookieHeaders?: string[] };

type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export async function api<T>(method: HttpMethod, endpoint: string, body?: any, isFormData?: boolean): Promise<ApiResponse<T>> {
  try {
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();

    const headers: HeadersInit = {};
    if (!isFormData) headers["Content-Type"] = "application/json";
    if (cookieString) headers["Cookie"] = cookieString;

    const options: RequestInit = {
      method,
      headers,
      credentials: "include",
      body: isFormData ? body : body ? JSON.stringify(body) : undefined,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, options);
    const rawText = await res.text();

    let parsed: any = rawText;
    try {
      parsed = JSON.parse(rawText);
    } catch {}

    // Extract Set-Cookie headers
    const setCookieHeaders = res.headers.getSetCookie();

    if (!res.ok) {
      const message = typeof parsed === "string" ? parsed : parsed?.message || "Request failed";

      return {
        ok: false,
        error: message,
        headers: res.headers,
        setCookieHeaders,
      };
    }

    return {
      ok: true,
      data: parsed as T,
      headers: res.headers,
      setCookieHeaders,
    };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Unknown error",
    };
  }
}
