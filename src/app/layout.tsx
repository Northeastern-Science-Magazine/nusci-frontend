import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";
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
        <Header forceFullMenu />
        <div className={styles.container}>{children}</div>
        <Footer />
      </body>
    </html>
  );
}

const styles = {
  container: "mx-3 mt-2",
};
