'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Bell, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import { useI18n } from '@/components/providers/I18nProvider';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  
  const { user, isAuthenticated, logout } = useAuth();
  const isAdmin = user?.role?.name === 'admin';
  const { t } = useI18n();
  const displayName = (user?.fullName || user?.name || 'User');
  const firstName = displayName.split(' ')[0];

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
                {t('nav.tagline')}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="/">{t('nav.home')}</NavLink>
            {isAuthenticated && (
              <NavLink href="/blood-availability">{t('nav.bloodBank')}</NavLink>
            )}
            {isAuthenticated ? (
              <>
                <NavLink href="/dashboard">{t('nav.dashboard')}</NavLink>
                {(user?.role?.name === 'donor' || isAdmin) && (
                  <NavLink href="/donate">{t('nav.donate')}</NavLink>
                )}
                {(user?.role?.name === 'hospital' || user?.role?.name === 'recipient' || isAdmin) && (
                  <NavLink href="/request">{t('nav.request')}</NavLink>
                )}
                {isAdmin && (
                  <NavLink href="/admin">{t('nav.admin')}</NavLink>
                )}
              </>
            ) : (
              <>
                <NavLink href="/about">{t('nav.about')}</NavLink>
                <NavLink href="/contact">{t('nav.contact')}</NavLink>
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
                          alt={user.fullName || user?.name || 'User'}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white text-sm font-medium">
                          {(user?.fullName || user?.name || 'U').charAt(0)}
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-medium">{user?.fullName || user?.name || 'User'}</span>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50 animate-scale-in">
                      <Link
                        href="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      >
                        <User className="h-4 w-4 mr-2" />
                        {t('nav.profile')}
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
                        {t('nav.logout')}
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button href="/auth/login" variant="ghost" size="sm">{t('nav.login')}</Button>
                <Button href="/auth/register" variant="primary" size="sm">{t('nav.signup')}</Button>
              </div>
            )}
          </div>

          {/* Mobile: show user name/avatar when authenticated */}
          {isAuthenticated && (
            <Link href="/profile" className="md:hidden mr-2 flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center overflow-hidden">
                {user?.profileImage ? (
                  <img src={user.profileImage} alt={displayName} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white text-sm font-medium">{firstName.charAt(0)}</span>
                )}
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{firstName}</span>
            </Link>
          )}

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
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 animate-slide-down">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-800">
            {isAuthenticated && (
              <div className="flex items-center space-x-3 px-3 py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="w-9 h-9 bg-primary-600 rounded-full flex items-center justify-center overflow-hidden">
                  {user?.profileImage ? (
                    <img src={user.profileImage} alt={user.fullName || user?.name || 'User'} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white text-sm font-medium">{(user?.fullName || user?.name || 'U').charAt(0)}</span>
                  )}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-gray-900 dark:text-white truncate">{user?.fullName || user?.name || 'User'}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</div>
                </div>
              </div>
            )}
            <Link
              href="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === '/'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {t('nav.home')}
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
                  {t('nav.dashboard')}
                </Link>
                <Link
                  href="/blood-availability"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === '/blood-availability'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {t('nav.bloodBank')}
                </Link>
                <Link
                  href="/donate"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === '/donate'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {t('nav.donate')}
                </Link>
                <Link
                  href="/request"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === '/request'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {t('nav.request')}
                </Link>
                <Link
                  href="/profile"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === '/profile'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {t('nav.profile')}
                </Link>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    logout();
                    window.location.href = '/';
                  }}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                  {t('nav.logout')}
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
                  {t('nav.about')}
                </Link>
                <Link
                  href="/contact"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === '/contact'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {t('nav.contact')}
                </Link>
                <Button href="/auth/login" variant="ghost" size="md" className="w-full justify-start">{t('nav.login')}</Button>
                <Button href="/auth/register" variant="primary" size="md" className="w-full justify-start">{t('nav.signup')}</Button>
              </>
            )}
            
          </div>
        </div>
      )}
    </nav>
  );
}
