import { cookies } from "next/headers";
import setCookieParser, { Cookie } from "set-cookie-parser";

/**
 * Function that takes in a response headers and
 * sets all headers on the given cookiestore.
 *
 * @param headers
 * @param cookieStore
 * @returns
 */
export default function applySetCookieHeaders(headers: Response["headers"], cookieStore: Awaited<ReturnType<typeof cookies>>) {
  const setCookieHeaders =
    typeof (headers as any).getSetCookie === "function" ? ((headers as any).getSetCookie() as string[]) : undefined;

  if (!setCookieHeaders || setCookieHeaders.length === 0) return;

  const parsedCookies = setCookieParser(setCookieHeaders, { map: false }) as Cookie[];

  parsedCookies.forEach((cookie) => {
    if (!cookie.name) return;
    cookieStore.set(cookie.name, cookie.value ?? "", {
      path: cookie.path,
      httpOnly: cookie.httpOnly,
      secure: cookie.secure,
      sameSite: cookie.sameSite as any,
      expires: cookie.expires,
      maxAge: cookie.maxAge,
    });
  });
}
