import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  const origin = url.origin;

  const expiredUrl = new URL(`${process.env.NEXT_PUBLIC_URL}/otp/link-expired`);

  if (!token) {
    return NextResponse.redirect(expiredUrl);
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    console.error("NEXT_PUBLIC_API_URL is not set");
    return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_URL}`));
  }

  const backendRes = await fetch(`${apiUrl}/user/verify-otp?token=${encodeURIComponent(token)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (!backendRes.ok) {
    return NextResponse.redirect(expiredUrl);
  }

  const redirect = NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_URL}/internal/article-submission`));

  const headers = backendRes.headers as Headers & { getSetCookie?: () => string[] };
  const setCookies = typeof headers.getSetCookie === "function" ? headers.getSetCookie() : [];
  for (const cookie of setCookies) {
    redirect.headers.append("Set-Cookie", cookie);
  }

  return redirect;
}
