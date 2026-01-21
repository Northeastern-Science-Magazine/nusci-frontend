import { InternalHeader } from "@/design-system/components/InternalHeader";
import { Footer } from "@/design-system/components/Footer";

/**
 * Layout for internal pages (/internal/*)
 * This layout REPLACES the root layout's Header+Footer for /internal/* pages
 * 
 * IMPORTANT: Your root layout (app/layout.tsx) must still have Header+Footer!
 * This nested layout overrides that for internal pages only.
 */
export default function InternalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // TODO: Get actual user data from your auth system
  // For now, using placeholder data
  const userProfile = {
    name: "John Doe",
    role: "Writer",
  };

  return (
    <>
      {/* This replaces the Header from root layout */}
      <InternalHeader userProfile={userProfile} />
      <div className="h-16" /> {/* Spacer */}
      {children}
      {/* Footer stays the same */}
    </>
  );
}