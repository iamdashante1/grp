'use client';

import Link from 'next/link';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Footer() {
  const { isAuthenticated } = useAuth();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" fill="currentColor" />
              </div>
              <div>
                <div className="text-xl font-bold">BloodBridge</div>
                <div className="text-sm text-gray-400">Save Lives Together</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-6">
              Connecting Jamaican blood donors with those in need. Our mission is to ensure that no life is lost due to blood shortage by creating a seamless bridge between donors and recipients across the island.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              {!isAuthenticated && (
                <>
                  <li>
                    <Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-200">
                      About Us
                    </Link>
                  </li>
                </>
              )}
              {isAuthenticated && (
                <>
                  <li>
                    <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors duration-200">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/profile" className="text-gray-400 hover:text-white transition-colors duration-200">
                      Profile
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link href="/blood-availability" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Blood Availability
                </Link>
              </li>
              {!isAuthenticated && (
                <>
                  <li>
                    <Link href="/donate" className="text-gray-400 hover:text-white transition-colors duration-200">
                      Donate Blood
                    </Link>
                  </li>
                  <li>
                    <Link href="/request" className="text-gray-400 hover:text-white transition-colors duration-200">
                      Request Blood
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-200">
                      Contact Us
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Donation Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Health & Safety
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <div className="text-gray-400 text-sm">
                  1 Devon Road<br />
                  National Blood Transfusion Service<br />
                  Kingston 10, Jamaica
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <a href="tel:+1876567890" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  +1 (876) 567-8900
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <a href="mailto:info@bloodbridge.jm" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  info@bloodbridge.jm
                </a>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="mt-6 p-4 bg-red-900/20 border border-red-800 rounded-lg">
              <div className="text-red-400 font-semibold text-sm mb-1">Emergency Blood Request</div>
              <div className="text-red-300 text-sm">24/7 Hotline: +1 (876) BLOOD-911</div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 BloodBridge. All rights reserved. | Saving lives through blood donation.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Terms of Service
              </a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
