import { NextRequest } from "next/server";
import { proxy } from "@/proxy";

export async function GET(req: NextRequest) {
  return proxy(req, "/user/me");
}
