"use server";


import { Roles } from "../types/types";
import { api, ApiResponse } from "./api";
import { ProfileData } from "@/app/profile/[emailPrefix]/page";

/**
 * Gets the login status along with the roles of the
 * currently signed in user by hitting the backend API.
 * If there are no roles "[]" the user is not logged in.
 *
 * Should NOT be used clientside anywhere.
 */
type RolesString = {
  roles: string[];
};


type PublicUser = {
  firstName: string;
  lastName: string;
  pronouns?: string[],
  graduationYear: number,
  major?: string,
  location?: string,
  profileImage?: string,
  bannerImage?: string,
  bio: string,
  email: string,
  roles: string[],
  creationTime: string;
  modificationTime: string;
}

const FALLBACK_PROFILE_USER: ProfileData = {
  name: "Unknown User",
  pronouns: "",
  graduationYear: 0,
  major: "",
  location: "",
  email: "",
  roles: [],
  avatarUrl: "",
  bannerUrl: "",
  bio: "",
};

function mapRolesToEnum(roleStrings: string[]): Roles[] {
  return roleStrings
    .map((role) => Roles[role as keyof typeof Roles])
    .filter(Boolean);
}

function mapPublicUserToProfile(user: PublicUser): ProfileData {
  return {
    name: `${user.firstName} ${user.lastName}`,
    pronouns: user.pronouns?.join(" / ") ?? "",
    graduationYear: user.graduationYear,
    major: user.major ?? "",
    location: user.location ?? "",
    email: user.email,
    roles: mapRolesToEnum(user.roles),
    avatarUrl: user.profileImage ?? "",
    bannerUrl: user.bannerImage ?? "",
    bio: user.bio,
  };
}

export async function getPublicUserByEmail(
  email: string
): Promise<ProfileData> {
  try {
    const newEmail = email.concat("@northeastern.edu");
    const response = await apiGetPublicUserByEmail(newEmail);

    if (!response.ok) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "Get public user by email endpoint failed, using fallback user"
        );
      }
      return FALLBACK_PROFILE_USER;
    }

    if (response.data) {
      return mapPublicUserToProfile(response.data);
    }

    return FALLBACK_PROFILE_USER;
  } catch (error) {
    console.error("Error fetching public user:", error);
    return FALLBACK_PROFILE_USER;
  }
}

export async function apiGetUserRoles(): Promise<ApiResponse<RolesString>> {
  return api("GET", "/user/roles");
}

export async function apiLogin(data: { email: string; password: string }): Promise<ApiResponse<void>> {
  return api("POST", "/user/login", data);
}

export async function apiGetPublicUserByEmail(
  email: string
): Promise<ApiResponse<PublicUser>> {
  return api<PublicUser>("GET", `/user/email/${email}`);
}
