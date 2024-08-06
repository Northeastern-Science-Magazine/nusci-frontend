import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
        <div className={styles.container}>
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}

const styles = {
  container: "mx-3 mt-2",
};
