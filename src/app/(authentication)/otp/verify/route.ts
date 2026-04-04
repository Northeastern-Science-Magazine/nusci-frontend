import { NextResponse } from "next/server";

/** Public site origin for redirects. Prefer NEXT_PUBLIC_URL in env; otherwise same origin as this request (avoids 500 if env is missing in production). */
function getSiteOrigin(request: Request): string {
  const raw = process.env.NEXT_PUBLIC_URL?.trim();
  if (raw) {
    try {
      return new URL(raw.endsWith("/") ? raw.slice(0, -1) : raw).origin;
    } catch {
      console.error("NEXT_PUBLIC_URL is set but invalid:", raw);
    }
  }
  return new URL(request.url).origin;
}

export async function GET(request: Request) {
  const siteOrigin = getSiteOrigin(request);
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  const expiredUrl = new URL("/otp/link-expired", siteOrigin);

  if (!token) {
    return NextResponse.redirect(expiredUrl);
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (!apiUrl) {
    console.error("NEXT_PUBLIC_API_URL is not set");
    return NextResponse.redirect(new URL("/", siteOrigin));
  }

  let backendRes: Response;
  try {
    backendRes = await fetch(`${apiUrl}/user/verify-otp?token=${encodeURIComponent(token)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("OTP verify fetch failed:", err);
    return NextResponse.redirect(expiredUrl);
  }

  if (!backendRes.ok) {
    return NextResponse.redirect(expiredUrl);
  }

  const redirect = NextResponse.redirect(new URL("/internal/article-submission", siteOrigin));

  const headers = backendRes.headers as Headers & { getSetCookie?: () => string[] };
  const setCookies = typeof headers.getSetCookie === "function" ? headers.getSetCookie() : [];
  for (const cookie of setCookies) {
    redirect.headers.append("Set-Cookie", cookie);
  }

  return redirect;
}
