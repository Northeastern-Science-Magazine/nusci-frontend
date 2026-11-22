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
  graduationYear?: number | null;
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
  graduationYear: null,
  major: '',
  location: '',
  email: '',
  roles: [],
  avatarUrl: '',
  bannerUrl: '',
  bio: '',
};

function mapRolesToEnum(roleStrings: string[]): Roles[] {
  const validRoles = Object.values(Roles) as string[];
  return roleStrings.filter((role): role is Roles => validRoles.includes(role));
}

function mapPublicUserToProfile(user: PublicUser): ProfileData {
  return {
    name: `${user.firstName} ${user.lastName}`,
    pronouns: user.pronouns?.join(' / ') ?? '',
    graduationYear: user.graduationYear ?? null,
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

/**
 * Gets a public profile by email.
 *
 * @param email the full email, see emailFromProfileParam for route params
 */
export async function getPublicUserByEmail(
  email: string,
): Promise<ProfileData> {
  try {
    const response = await apiGetPublicUserByEmail(email);

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
  profileImage?: string; // a mediaPath, see lib/helpers/media
  bannerImage?: string; // a mediaPath, see lib/helpers/media
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

/**
 * Looks up the email an invite belongs to. Does not use up the invite.
 */
export async function apiGetInvite(token: string): Promise<
  ApiResponse<{
    email: string;
    // Set when an editor added this person as an author before they signed up
    firstName?: string;
    lastName?: string;
  }>
> {
  return api('GET', `/user/invite?token=${encodeURIComponent(token)}`);
}

/**
 * Creates an account from an invite and logs the new user in.
 * Email and roles come from the invite, so they are not sent.
 */
export async function apiSignup(data: {
  token: string;
  password: string;
  firstName: string;
  lastName: string;
  graduationYear: number;
}): Promise<ApiResponse<{ message: string }>> {
  return api('POST', '/user/signup', data);
}

export async function apiGetPublicUserByEmail(
  email: string,
): Promise<ApiResponse<PublicUser>> {
  return api<PublicUser>('GET', `/user/email/${encodeURIComponent(email)}`);
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

export type CreatedAuthor = BasicUser & {
  /** false if the account was made but the invite email failed to send */
  invited: boolean;
};

/**
 * Adds an author who has no account yet, so they can be credited on an
 * article right away, and emails them an invite to finish signing up.
 * Admins and editors only. Fails if the email already has an account.
 */
export async function apiCreateAuthor(author: {
  firstName: string;
  lastName: string;
  email: string;
}): Promise<ApiResponse<CreatedAuthor>> {
  return api('POST', '/user/author', author);
}

type InviteResult = {
  invited: string[];
  skipped: string[];
  failed: string[];
};

/**
 * Invites each address in `emails` with `roles`; the backend creates a separate one-time signup link per address.
 */
export async function apiInviteUser(
  emails: string[],
  roles: string[],
): Promise<ApiResponse<InviteResult>> {
  return api('POST', '/user/invite', { to: emails, roles });
}
