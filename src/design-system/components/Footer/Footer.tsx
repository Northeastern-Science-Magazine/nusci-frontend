import React from 'react';
import Link from '@/primitives/Link';
import Icon from '@/primitives/Icon';

export interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/nuscimag/',
      icon: <Icon icon="instagram" size="md" className="text-black-400 group-hover:text-black-500 transition-colors duration-200" />,
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/company/nu-sci-magazine/',
      icon: <Icon icon="linkedin" size="md" className="text-black-400 group-hover:text-black-500 transition-colors duration-200" />,
    },
    {
      label: 'Email',
      href: 'mailto:northeasternsciencemagazine@gmail.com',
      icon: <Icon icon="email" size="md" className="text-black-400 group-hover:text-black-500 transition-colors duration-200" />,
    },
  ];

  return (
    <footer className={`bg-black-900 text-black ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center space-y-8">
          {/* NU Sci Logo */}
          <div className="text-center">
            <h3 className="text-4xl font-bold text-black-500">NU Sci</h3>
          </div>

          {/* Social Links */}
          <div className="flex space-x-6">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                newWindow={true}
                className="group"
              >
                {social.icon}
                <span className="sr-only">{social.label}</span>
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center space-y-2">
            <p className="text-sm text-black-400">
              © {currentYear} NU Sci. All rights reserved.
            </p>
            <p className="text-sm text-black-400">
              This website is built and maintained by the NU Sci web and software team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;