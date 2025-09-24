'use client';

import React, { useState, useEffect } from 'react';
import Box from '@/design-system/primitives/Box';
import Button from '@/design-system/primitives/Button';
import Link from '@/design-system/primitives/Link';
import Image from '@/design-system/primitives/Image';
import { DropdownInput, DropdownItem } from '@/design-system/primitives/DropdownInput';
import { Menu, X, Search, User } from 'lucide-react';

interface HeaderProps {
  isLoggedIn?: boolean;
  userProfile?: {
    name: string;
    avatar?: string;
  };
}

export default function Header({ isLoggedIn = false, userProfile }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigationItems = [
    { label: 'Print Articles', href: '/articles' },
    { label: 'About Us', href: '/about-us' },
  ];

  const categories = [
    { value: 'science', label: 'Science' },
    { value: 'technology', label: 'Technology' },
    { value: 'health', label: 'Health' },
    { value: 'environment', label: 'Environment' },
    { value: 'research', label: 'Research' },
  ];

  return (
    <Box
      position='fixed'
      top={0}
      left={0}
      right={0}
      width='full'
      color='white'
      className={`
        z-50 transition-all duration-300 ease-in-out
        ${isScrolled ? 'shadow-lg py-2' : 'py-4'}
        border-b border-gray-200
      `}
    >
      <Box className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Main Navigation */}
        <Box className='flex items-center justify-between'>
          {/* Logo */}
          <Box className='flex-shrink-0'>
            <Link href='/' newWindow={false} className='flex items-center'>
              <Box className={`transition-all duration-300 ${isScrolled ? 'h-8 w-8' : 'h-12 w-12'}`}>
                <Image src='/logo.png' alt='NU Sci Magazine' width='w-12' ratio={1} />
              </Box>
              <Box className={`ml-3 ${isScrolled ? 'hidden sm:block' : ''}`}>
                <Box className='text-xl font-bold text-black'>NU Sci</Box>
                <Box className='text-sm text-gray-600'>Magazine</Box>
              </Box>
            </Link>
          </Box>

          {/* Desktop Navigation */}
          <Box className='hidden lg:flex items-center space-x-8'>
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                newWindow={false}
                className='text-gray-700 hover:text-black transition-colors duration-200 font-medium'
              >
                {item.label}
              </Link>
            ))}

            {/* Categories Dropdown */}
            <DropdownInput
              placeholder='Categories'
              onChange={(value) => {
                // Handle category selection
                console.log('Selected category:', value);
              }}
            >
              {categories.map((category) => (
                <DropdownItem key={category.value} value={category.value}>
                  {category.label}
                </DropdownItem>
              ))}
            </DropdownInput>

            {/* Search Link */}
            <Link
              href='/search'
              newWindow={false}
              className='flex items-center text-gray-700 hover:text-black transition-colors duration-200'
            >
              <Search className='h-5 w-5' />
              <span className='ml-1'>Search</span>
            </Link>

            {/* Profile - Conditionally Rendered */}
            {isLoggedIn && userProfile ? (
              <Link
                href='/internal/profile'
                newWindow={false}
                className='flex items-center text-gray-700 hover:text-black transition-colors duration-200'
              >
                <User className='h-5 w-5' />
                <span className='ml-1'>{userProfile.name}</span>
              </Link>
            ) : (
              <Box className='flex items-center space-x-2'>
                <Button variant='outline' size='sm' color='black' onClick={() => (window.location.href = '/login')}>
                  Login
                </Button>
                <Button size='sm' color='black' onClick={() => (window.location.href = '/signup')}>
                  Sign Up
                </Button>
              </Box>
            )}
          </Box>

          {/* Mobile Menu Button */}
          <Box className='lg:hidden'>
            <Button variant='outline' size='sm' color='black' onClick={toggleMobileMenu} className='p-2'>
              {isMobileMenuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
            </Button>
          </Box>
        </Box>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <Box className='lg:hidden mt-4 pb-4 border-t border-gray-200'>
            <Box className='flex flex-col space-y-4 pt-4'>
              {navigationItems.map((item) => (
                <Box onClick={() => setIsMobileMenuOpen(false)}>
                  <Link
                    key={item.label}
                    href={item.href}
                    newWindow={false}
                    className='text-gray-700 hover:text-black transition-colors duration-200 font-medium'
                  >
                    {item.label}
                  </Link>
                </Box>
              ))}

              {/* Mobile Categories Dropdown */}
              <Box className='w-full'>
                <DropdownInput
                  placeholder='Categories'
                  onChange={(value) => {
                    console.log('Selected category:', value);
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

              {/* Mobile Search Link */}
              <Box onClick={() => setIsMobileMenuOpen(false)}>
                <Link
                  href='/search'
                  newWindow={false}
                  className='flex items-center text-gray-700 hover:text-black transition-colors duration-200'
                >
                  <Search className='h-5 w-5' />
                  <span className='ml-1'>Search</span>
                </Link>
              </Box>

              {/* Mobile Profile Section */}
              {isLoggedIn && userProfile ? (
                <Box onClick={() => setIsMobileMenuOpen(false)}>
                  <Link
                    href='/internal/profile'
                    newWindow={false}
                    className='flex items-center text-gray-700 hover:text-black transition-colors duration-200'
                  >
                    <User className='h-5 w-5' />
                    <span className='ml-1'>{userProfile.name}</span>
                  </Link>
                </Box>
              ) : (
                <Box className='flex flex-col space-y-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    color='black'
                    onClick={() => {
                      window.location.href = '/login';
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    size='sm'
                    color='black'
                    onClick={() => {
                      window.location.href = '/signup';
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Sign Up
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
