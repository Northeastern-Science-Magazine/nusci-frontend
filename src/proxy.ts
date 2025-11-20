import { NextRequest, NextResponse } from "next/server";
import { LoggedIn } from "./design-system/components/Header/Header.stories";

export async function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // No cookie, user not logged in
  if (!token) {
    return NextResponse.json({ LoggedIn: false });
  }

  try {
    // Call backend to validate token (using getRoles)
    // TODO: Backend route must be created
    const res = await fetch("http://backend:9999/internal/get-user", {
      method: "GET",
      // since there are two ports, cookies are not passed.
      // allow cookie to be passed on
      credentials: "include",
    });

    const role = await res.json();
    return NextResponse.json({
      LoggedIn: true,
      roles: role,
    });
  } catch (e) {
    return NextResponse.json({
      LoggedIn: false,
      message: (e as any).message,
    });
  }
}

// change to correct path when specifc cases
// set to running before all routes
export const config = {
  matcher: "/api/:path*",
};
