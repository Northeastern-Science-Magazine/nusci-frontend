import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function SimpleHeader() {
return (
    <div className={styles.container}>
        <Link href="/">
                <Image
                    className={styles.logo}
                    src="/logo.png"
                    alt="logo"
                    width={100}
                    height={100}
                />
        </Link>
    </div>
);
}

const styles = {
  container: "flex items-center w-full py-4",
  logo: "border-0",
};
