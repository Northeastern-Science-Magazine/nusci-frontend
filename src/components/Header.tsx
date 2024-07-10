import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className={styles.container}>
      <Image
        className={styles.logo}
        src="/logo.png"
        alt="logo"
        width={150}
        height={150}
      />
      <div className={styles.textContainer}>
        <h1 className={styles.title}>NU Sci Magazine</h1>
        <h2>Northeastern University’s Student-Run Science Magazine</h2>
        <div className={styles.pageContainer}>
          <Link href={"/../"}>
            <p className={styles.pageTitle}>Home</p>
          </Link>
          <Link href={"/../print"}>
            <p className={styles.pageTitle}>Print Issues</p>
          </Link>
          <Link href={"/../archive"}>
            <p className={styles.pageTitle}>Web Archive</p>
          </Link>
          <Link href={"/../about"}>
            <p className={styles.pageTitle}>About Us</p>
          </Link>
          <Link href={"/../contact"}>
            <p className={styles.pageTitle}>Contact</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: "flex items-center w-full py-4",
  logo: "border-2 border-black",
  textContainer: "ml-16",
  pageContainer: "flex mt-2",
  title: "uppercase text-5xl py-2",
  pageTitle:
    "mr-10 text-black text-lg border-b-2 border-black hover:border-b-2 hover:border-gray-200 hover:ease-in hover:duration-500",
};
