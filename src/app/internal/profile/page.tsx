import { apiGetMyProfile } from '@/lib/api/users';
import ProfileForm from './ProfileForm';

export default async function ProfilePage() {
  const response = await apiGetMyProfile();
  const user = response.ok ? response.data : null;

  return <ProfileForm user={user} />;
}
