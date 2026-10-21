'use server';

import { Roles } from '../types/types';
import { api, ApiResponse } from './api';
import { ProfileData } from '@/app/profile/[emailPrefix]/page';
import { TeamMemberProps } from '@/design-system/components/TeamMember';

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

export type PublicUser = {
  firstName: string;
  lastName: string;
  pronouns?: string[];
  graduationYear: number;
  major?: string;
  location?: string;
  profileImage?: string;
  bannerImage?: string;
  bio: string;
  email: string;
  phone?: string;
  roles: string[];
  creationTime: string;
  modificationTime: string;
};

const FALLBACK_PROFILE_USER: ProfileData = {
  name: 'Unknown User',
  pronouns: '',
  graduationYear: 0,
  major: '',
  location: '',
  email: '',
  roles: [],
  avatarUrl: '',
  bannerUrl: '',
  bio: '',
};

function mapRolesToEnum(roleStrings: string[]): Roles[] {
  return roleStrings
    .map((role) => Roles[role as keyof typeof Roles])
    .filter(Boolean);
}

function mapPublicUserToProfile(user: PublicUser): ProfileData {
  return {
    name: `${user.firstName} ${user.lastName}`,
    pronouns: user.pronouns?.join(' / ') ?? '',
    graduationYear: user.graduationYear,
    major: user.major ?? '',
    location: user.location ?? '',
    email: user.email,
    roles: mapRolesToEnum(user.roles),
    avatarUrl: user.profileImage ?? '',
    bannerUrl: user.bannerImage ?? '',
    bio: user.bio,
  };
}

function mapPublicUserToTeamMember(user: PublicUser): TeamMemberProps {
  return {
    name: `${user.firstName} ${user.lastName}`,
    pronouns: user.pronouns?.join(' / ') ?? '',
    bio: user.bio,
    graduationYear: user.graduationYear,
    major: user.major ?? '',
    email: user.email,
    avatarUrl: user.profileImage ?? '',
  };
}

export type BasicUser = {
  name: string;
  email: string;
};

export async function getPublicUserByEmail(
  email: string,
): Promise<ProfileData> {
  try {
    const newEmail = email.concat('@northeastern.edu');
    const response = await apiGetPublicUserByEmail(newEmail);

    if (!response.ok) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(
          'Get public user by email endpoint failed, using fallback user',
        );
      }
      return FALLBACK_PROFILE_USER;
    }

    if (response.data) {
      return mapPublicUserToProfile(response.data);
    }

    return FALLBACK_PROFILE_USER;
  } catch (error) {
    console.error('Error fetching public user:', error);
    return FALLBACK_PROFILE_USER;
  }
}

export type TeamMembersResult =
  { ok: true; members: TeamMemberProps[] } | { ok: false; error: string };

export async function getTeamMembersByRole(
  role: Roles,
): Promise<TeamMembersResult> {
  const response = await apiGetUsersByRole(role);

  if (!response.ok) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Get users by role endpoint failed for role "${role}"`);
    }
    return { ok: false, error: response.error };
  }

  return { ok: true, members: response.data.map(mapPublicUserToTeamMember) };
}

export async function getMyProfile(): Promise<ProfileData> {
  try {
    const response = await apiGetMyProfile();

    if (!response.ok) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Get my profile endpoint failed, using fallback user');
      }
      return FALLBACK_PROFILE_USER;
    }

    if (response.data) {
      return mapPublicUserToProfile(response.data);
    }

    return FALLBACK_PROFILE_USER;
  } catch (error) {
    console.error('Error fetching my profile:', error);
    return FALLBACK_PROFILE_USER;
  }
}

export type ProfileUpdate = {
  firstName?: string;
  lastName?: string;
  pronouns?: string[];
  graduationYear?: number;
  major?: string;
  location?: string;
  bio?: string;
  email?: string;
  phone?: string;
};

export async function apiGetUserRoles(): Promise<ApiResponse<RolesString>> {
  return api('GET', '/user/roles');
}

export async function apiGetMyProfile(): Promise<ApiResponse<PublicUser>> {
  return api('GET', '/user/me');
}

export async function apiUpdateMyProfile(
  update: ProfileUpdate,
): Promise<ApiResponse<PublicUser>> {
  return api('PATCH', '/user/me', update);
}

export async function apiLogin(data: {
  email: string;
  password: string;
}): Promise<ApiResponse<void>> {
  return api('POST', '/user/login', data);
}

export async function apiGetPublicUserByEmail(
  email: string,
): Promise<ApiResponse<PublicUser>> {
  return api<PublicUser>('GET', `/user/email/${email}`);
}

export async function apiGetUsersByRole(
  role: Roles,
): Promise<ApiResponse<PublicUser[]>> {
  return api<PublicUser[]>('GET', `/user/role/${role}`);
}

export async function apiVerifyOTPToken(
  token: string,
): Promise<ApiResponse<void>> {
  return api<void>('POST', `/user/verify-otp?token=${token}`);
}

export async function apiGetBasicUserList(): Promise<ApiResponse<BasicUser[]>> {
  return api<BasicUser[]>('GET', '/user/list/basic');
}
