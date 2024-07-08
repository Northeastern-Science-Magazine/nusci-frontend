import React from "react";
import { Stack } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <Stack direction="horizontal" gap={3} className="mb-4">
      <Image
        className={styles.logo}
        src="/logo.png"
        alt="logo"
        width={150}
        height={150}
      />
      <Stack style={{ marginTop: 15 }} gap={1}>
        <h1 className={styles.title}>NU Sci Magazine</h1>
        <h3>Northeastern University’s Student-Run Science Magazine</h3>
        <Stack direction="horizontal" gap={3}>
          <Link className={styles.pageTitle} href={"/../"}>
            <p>Home</p>
          </Link>
          <Link className={styles.pageTitle} href={"/../print"}>
            <p>Print Issues</p>
          </Link>
          <Link className={styles.pageTitle} href={"/../archive"}>
            <p>Web Archive</p>
          </Link>
          <Link className={styles.pageTitle} href={"/../about"}>
            <p>About Us</p>
          </Link>
          <Link className={styles.pageTitle} href={"/../contact"}>
            <p>Contact</p>
          </Link>
        </Stack>
      </Stack>
    </Stack>
  );
}

const styles = {
  logo: "border border-black",
  title: "text-uppercase",
  pageTitle: "text-black",
};
