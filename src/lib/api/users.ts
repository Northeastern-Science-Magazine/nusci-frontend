"use server";

import { api, ApiResponse } from "./api";
import { ProfileData } from "@/app/profile/[emailPrefix]/page";

/**
 * Gets the login status along with the roles of the
 * currently signed in user by hitting the backend API.
 * If there are no roles "[]" the user is not logged in.
 *
 * Should NOT be used clientside anywhere.
 */
type Roles = {
  roles: string[];
};

export async function apiGetUserRoles(): Promise<ApiResponse<Roles>> {
  return api("GET", "/user/roles");
}

export async function apiLogin(data: {
  email: string;
  password: string;
}): Promise<ApiResponse<void>> {
  return api("POST", "/user/login", data);
}

export async function apiGetProfile(): Promise<ApiResponse<ProfileData>> {
  return api("GET", "/user/me");
}
