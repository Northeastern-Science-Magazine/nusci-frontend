import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <div className={style.overall_container}>
            <div className={style.top_line}>
                <Image
                    className={style.logo}
                    src="/logo.png"
                    alt="logo"
                    width={60}
                    height={60}
                />
                <div className={style.link_container}>
                    <Link href={"/../about"}>
                        <p className={style.link}>About Us</p>
                    </Link>
                    <Link href={"/../login"}>
                        <p className={style.link}>Log In</p>
                    </Link>
                    <Link href={"/../contact"}>
                        <p className={style.link}>Contact Us</p>
                    </Link>
                </div>
                <div className={style.social_container}>
                    <a href="https://www.instagram.com/nuscimag?igsh=cnZsM2tiNWJ0ejBk">
                        <Image
                            src="/insta.png"
                            alt="Instagram logo"
                            width={30}
                            height={30}
                        />
                    </a>
                    <a href="https://www.tiktok.com/@nuscimag?_t=8oBpgx2idTi&_r=1">
                        <Image
                            src="/tiktok.png"
                            alt="TikTok logo"
                            width={30}
                            height={30}
                        />
                    </a>
                    <a href="https://www.linkedin.com/company/nu-sci-magazine/">
                        <Image
                            src="/linkedin.png"
                            alt="LinkedIn logo"
                            width={30}
                            height={30}
                        />
                    </a>
                </div>
            </div>
        </div>
    )
}

const style = {
    overall_container: "flex items-center w-full py-5",
    logo: "border-0",
    copy: "text-sm text-gray m-3",
    top_line: "flex space-x-10",
    link_container: "flex space-x-4",
    link: "text-lg hover:text-green",
    social_container: "flex space-x-4"
};