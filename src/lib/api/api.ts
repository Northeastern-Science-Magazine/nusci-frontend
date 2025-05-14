"use server";

import { cookies } from "next/headers";

type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export async function api(method: HttpMethod, endpoint: string, body?: any) {
  const cookieStore = cookies();
  const cookieString = cookieStore.toString();

  const headers: HeadersInit = {};
  headers["Content-Type"] = "application/json";
  if (cookieString) headers["Cookie"] = cookieString;

  const options: RequestInit = {
    method,
    headers,
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, options);
  const rawText = await response.text();

  let parsedData: any = rawText;

  try {
    parsedData = JSON.parse(rawText);
  } catch {
    // If it's not valid JSON, we leave parsedData as the raw text (HTML string or plain text)
  }

  return {
    response,
    data: parsedData,
    ok: response.ok,
    status: response.status,
  };
}
