import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";
import { Header } from "@/design-system/components/Header";
import { Footer } from "@/design-system/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NU Sci Magazine",
  description: "Northeastern's student-run science magazine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className="h-16" /> {/* Spacer */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
