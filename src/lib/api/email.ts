import { Email } from "../types/types";
import { api, ApiResponse } from "./api";

export async function apiSendEmail(data: Email): Promise<ApiResponse<void>> {
  return api<void>("POST", "/email/send", data);
}
