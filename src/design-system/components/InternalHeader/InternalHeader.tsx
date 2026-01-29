"use client";

import React, { useState, useEffect } from "react";
import Box from "@/design-system/primitives/Box";
import Button from "@/design-system/primitives/Button";
import Link from "@/design-system/primitives/Link";
import Image from "@/design-system/primitives/Image";
import { DropdownInput, DropdownItem } from "@/design-system/primitives/DropdownInput";
import Icon from "@/design-system/primitives/Icon";

interface InternalHeaderProps {
  userProfile: {
    name: string;
    avatar?: string;
    role?: string;
  };
}

export default function InternalHeader({ userProfile }: InternalHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Navigation items - public site links
  const navigationItems: { label: string; href: string }[] = [
    { label: "Home", href: "/" },
    { label: "Print Articles", href: "/articles" },
  ];

  const categories = [
    { value: "biology", label: "Biology" },
    { value: "chemistry", label: "Chemistry" },
    { value: "environment", label: "Environment" },
    { value: "health", label: "Health" },
    { value: "newsletter", label: "Newsletter" },
    { value: "opinion", label: "Opinion" },
    { value: "physics", label: "Physics" },
    { value: "psychology", label: "Psychology" },
    { value: "space", label: "Space" },
    { value: "technology", label: "Technology" },
    { value: "world", label: "World" },
  ];

  const handleLogout = async () => {
    document.cookie = 'auth_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.href = '/';
  };

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      width="full"
      color="white"
      className={`
        z-50 transition-all duration-300 ease-in-out
        h-16
        ${isScrolled ? "shadow-lg" : ""}
        border-b border-black
      `}
    >
      <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        {/* Main Navigation */}
        <Box className="flex items-center justify-between h-full">
          {/* Logo */}
          <Box className="flex-shrink-0">
            <Link href="/internal/dashboard" newWindow={false} className="flex items-center">
              <Box className="transition-all duration-300 w-10">
                <Image 
                  src="/logo.png" 
                  alt="NU Sci Magazine" 
                  width="w-10" 
                  ratio={1} 
                  borderColor="black" 
                  borderWidth={2} 
                />
              </Box>
              <span className="ml-3 font-semibold text-gray-800 text-sm">Internal Portal</span>
            </Link>
          </Box>

          {/* Desktop Navigation */}
          <Box className="hidden lg:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                newWindow={false}
                className="text-gray-700 hover:text-black transition-colors duration-200 font-medium text-sm"
              >
                {item.label}
              </Link>
            ))}

            {/* About Us Dropdown */}
            <Box className="relative">
              <DropdownInput
                placeholder="About Us"
                onChange={(value) => {
                  if (value === "about") {
                    window.location.href = "/about-us";
                  } else if (value === "eboard") {
                    window.location.href = "/teams/eboard";
                  }
                }}
              >
                <DropdownItem value="about">Teams</DropdownItem>
                <DropdownItem value="eboard">Eboard & Editors</DropdownItem>
              </DropdownInput>
            </Box>

            {/* Categories Dropdown */}
            <Box className="relative">
              <DropdownInput
                placeholder="Categories"
                onChange={(value) => {
                  window.location.href = `/${value}`;
                }}
              >
                {categories.map((category) => (
                  <DropdownItem key={category.value} value={category.value}>
                    {category.label}
                  </DropdownItem>
                ))}
              </DropdownInput>
            </Box>

            {/* Search Articles Button */}
            <Button
              variant="outline"
              size="sm"
              color="black"
              onClick={() => (window.location.href = "/search")}
              className="flex items-center h-[35px]"
            >
              <Icon icon="search" size="sm" className="mr-1" />
              Search
            </Button>

            {/* Profile Dropdown */}
            <Box className="relative flex items-center">
              <Icon icon="user" size="sm" className="mr-2" />
              <DropdownInput
                placeholder={userProfile.name}
                onChange={(value) => {
                  if (value === "profile") {
                    window.location.href = "/internal/private-profile";
                  } else if (value === "logout") {
                    handleLogout();
                  }
                }}
              >
                <DropdownItem value="profile">Profile</DropdownItem>
                <DropdownItem value="logout">Logout</DropdownItem>
              </DropdownInput>
            </Box>
          </Box>

          {/* Mobile Menu Button */}
          <Box className="lg:hidden">
            <Button 
              variant="outline" 
              size="sm" 
              color="black" 
              onClick={toggleMobileMenu} 
              className="p-2"
            >
              {isMobileMenuOpen ? <Icon icon="x" size="sm" /> : <Icon icon="menu" size="sm" />}
            </Button>
          </Box>
        </Box>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <Box className="lg:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <Box className="flex flex-col space-y-2 p-4">
              {/* User Info */}
              <Box className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg mb-2">
                <Icon icon="user" size="md" />
                <Box>
                  <div className="font-semibold text-gray-900">{userProfile.name}</div>
                  {userProfile.role && (
                    <div className="text-sm text-gray-600">{userProfile.role}</div>
                  )}
                </Box>
              </Box>

              {/* Navigation Items */}
              {navigationItems.map((item) => (
                <div key={item.label} onClick={() => setIsMobileMenuOpen(false)}>
                  <Link
                    href={item.href}
                    newWindow={false}
                    className="text-gray-700 hover:text-black transition-colors duration-200 font-medium p-2 hover:bg-gray-50 rounded block"
                  >
                    {item.label}
                  </Link>
                </div>
              ))}

              {/* Mobile About Us Dropdown */}
              <Box className="w-full">
                <DropdownInput
                  placeholder="About Us"
                  className="w-full"
                  onChange={(value) => {
                    if (value === "about") {
                      window.location.href = "/about-us";
                    } else if (value === "eboard") {
                      window.location.href = "/teams/eboard";
                    }
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <DropdownItem value="about">Teams</DropdownItem>
                  <DropdownItem value="eboard">Eboard & Editors</DropdownItem>
                </DropdownInput>
              </Box>

              {/* Mobile Categories Dropdown */}
              <Box className="w-full">
                <DropdownInput
                  placeholder="Categories"
                  className="w-full"
                  onChange={(value) => {
                    window.location.href = `/${value}`;
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {categories.map((category) => (
                    <DropdownItem key={category.value} value={category.value}>
                      {category.label}
                    </DropdownItem>
                  ))}
                </DropdownInput>
              </Box>

              {/* Mobile Search Button */}
              <Button
                variant="outline"
                size="sm"
                color="black"
                onClick={() => {
                  window.location.href = "/search";
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-center w-full"
              >
                <Icon icon="search" size="sm" className="mr-1" />
                Search Articles
              </Button>

              {/* Profile Actions */}
              <Box className="pt-2 border-t border-gray-200 space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  color="black"
                  onClick={() => {
                    window.location.href = "/internal/profile";
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full justify-center"
                >
                  My Profile
                </Button>
                <Button
                  size="sm"
                  color="black"
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full justify-center"
                >
                  Logout
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}