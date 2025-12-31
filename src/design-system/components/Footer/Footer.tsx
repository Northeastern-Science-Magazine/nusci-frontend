import React from "react";
import Link from "@/primitives/Link";
import Icon from "@/primitives/Icon";
import Image from "@/design-system/primitives/Image";
import Box from "@/design-system/primitives/Box";

export interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = "" }) => {
  const currentYear = new Date().getFullYear();

  //Making the links to each social media correspond to their logos.
  const socialLinks = [
    {
      label: "Instagram",
      href: "https://www.instagram.com/nuscimag/",
      icon: (
        <Icon icon="instagram" size="md" className="text-black-400 group-hover:text-black-500 transition-colors duration-200" />
      ),
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/nu-sci-magazine/",
      icon: (
        <Icon icon="linkedin" size="md" className="text-black-400 group-hover:text-black-500 transition-colors duration-200" />
      ),
    },
    {
      label: "Email",
      href: "mailto:northeasternsciencemagazine@gmail.com",
      icon: <Icon icon="email" size="md" className="text-black-400 group-hover:text-black-500 transition-colors duration-200" />,
    },
  ];

  return (
    <Box className="bg-gray shadow-md-top">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Image src="/logo.png" alt="NU Sci Magazine" width="w-10" ratio={1} />
            </div>

            {/* Social media icons */}
            <div className="flex items-center space-x-6">
              {socialLinks.map((social) => (
                <Link key={social.label} href={social.href} newWindow={true} className="group">
                  {social.icon}
                  <span className="sr-only">{social.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Copyright section */}
          <div className="text-sm text-black-400 text-center md:text-right">
            Built and maintained by the NU Sci web team. {currentYear}.
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Footer;
