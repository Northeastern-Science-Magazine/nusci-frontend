import { InternalHeader } from "@/design-system/components/InternalHeader";
import { getMyProfile } from "@/lib/api/users";

export default async function InternalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await getMyProfile();
  const emailPrefix = profile.email.split("@")[0];

  const userProfile = {
    name: profile.name,
    avatar: profile.avatarUrl,
    role: profile.roles[0],
  };

  return (
    <>
      {/* This replaces the Header from root layout */}
      <InternalHeader userProfile={userProfile} emailPrefix={emailPrefix} />
      <div className="h-16" />
      {children}
      {/* Footer stays the same */}
    </>
  );
}