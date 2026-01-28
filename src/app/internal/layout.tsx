import { InternalHeader } from "@/design-system/components/InternalHeader";

export default function InternalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userProfile = {
    name: "John Doe",
    role: "Writer",
  };

  return (
    <>
      {/* This replaces the Header from root layout */}
      <InternalHeader userProfile={userProfile} />
      <div className="h-16" />
      {children}
      {/* Footer stays the same */}
    </>
  );
}