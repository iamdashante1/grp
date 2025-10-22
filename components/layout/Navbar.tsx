'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Bell, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  
  const { user, isAuthenticated, logout } = useAuth();
  const isAdmin = user?.role?.name === 'admin';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const isActive = pathname === href;
    
    return (
      <Link
        href={href}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
          isActive
            ? 'bg-primary-600 text-white'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
      >
        {children}
      </Link>
    );
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary-600 p-2 rounded-lg">
              <Heart className="h-6 w-6 text-white" fill="currentColor" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                BloodBridge
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                Save Lives Together
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="/">Home</NavLink>
            {isAuthenticated && (
              <NavLink href="/blood-availability">Blood Bank</NavLink>
            )}
            {isAuthenticated ? (
              <>
                <NavLink href="/dashboard">Dashboard</NavLink>
                {(user?.role?.name === 'donor' || isAdmin) && (
                  <NavLink href="/donate">Donate</NavLink>
                )}
                {(user?.role?.name === 'hospital' || user?.role?.name === 'recipient' || isAdmin) && (
                  <NavLink href="/request">Request</NavLink>
                )}
                {isAdmin && (
                  <NavLink href="/admin">Admin</NavLink>
                )}
              </>
            ) : (
              <>
                <NavLink href="/about">About</NavLink>
                <NavLink href="/contact">Contact</NavLink>
              </>
            )}
          </div>

          {/* Right side items */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    3
                  </span>
                </button>

                {/* Profile Dropdown */}
                <div className="relative" ref={profileDropdownRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 cursor-pointer"
                  >
                    <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center overflow-hidden">
                      {user?.profileImage ? (
                        <img 
                          src={user.profileImage} 
                          alt={user.fullName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white text-sm font-medium">
                          {user?.fullName?.charAt(0) || 'U'}
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-medium">{user?.fullName || 'User'}</span>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                      <Link
                        href="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          logout();
                          window.location.href = '/';
                        }}
                        className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 cursor-pointer"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-medium bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 cursor-pointer"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-800">
            <Link
              href="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === '/'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Home
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === '/dashboard'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/blood-availability"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === '/blood-availability'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Blood Bank
                </Link>
                <Link
                  href="/donate"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === '/donate'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Donate
                </Link>
                <Link
                  href="/request"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === '/request'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Request
                </Link>
                <Link
                  href="/profile"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === '/profile'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    logout();
                    window.location.href = '/';
                  }}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/about"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === '/about'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === '/contact'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Contact
                </Link>
                <Link
                  href="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-primary-600 text-white hover:bg-primary-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
