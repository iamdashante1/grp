"use client";

import Link from "next/link";
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/components/providers/I18nProvider";

export default function Footer() {
  const { isAuthenticated } = useAuth();
  const { t } = useI18n();

  return (
    <footer className="bg-gray-900 text-white footer-gradient-top">
      <div className="container-app py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" fill="currentColor" />
              </div>
              <div>
                <div className="text-xl font-bold">BloodBridge</div>
                <div className="text-sm text-gray-400">{t('nav.tagline')}</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-6">
              {t('footer.mission')}
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

          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors duration-200">{t('nav.home')}</Link>
              </li>
              {!isAuthenticated && (
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-200">{t('nav.about')}</Link>
                </li>
              )}
              {isAuthenticated && (
                <>
                  <li>
                    <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors duration-200">{t('nav.dashboard')}</Link>
                  </li>
                  <li>
                    <Link href="/profile" className="text-gray-400 hover:text-white transition-colors duration-200">{t('nav.profile')}</Link>
                  </li>
                </>
              )}
              <li>
                <Link href="/blood-availability" className="text-gray-400 hover:text-white transition-colors duration-200">{t('blood.title')}</Link>
              </li>
              {!isAuthenticated && (
                <>
                  <li>
                  <Link href="/donate" className="text-gray-400 hover:text-white transition-colors duration-200">{t('nav.donate')}</Link>
                  </li>
                  <li>
                  <Link href="/request" className="text-gray-400 hover:text-white transition-colors duration-200">{t('nav.request')}</Link>
                  </li>
                  <li>
                  <Link href="/support" className="text-gray-400 hover:text-white transition-colors duration-200">{t('nav.contact')}</Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.resources')}</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">{t('footer.links.donationGuidelines')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">{t('footer.links.healthSafety')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">{t('footer.links.faq')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">{t('footer.links.privacy')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">{t('footer.links.terms')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">{t('footer.links.help')}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contact.title')}</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <div className="text-gray-400 text-sm">
                  {t('footer.contact.address')}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <a href="tel:+1876567890" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">+1 (876) 567-8900</a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <a href="mailto:info@bloodbridge.jm" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">info@bloodbridge.jm</a>
              </div>
            </div>

            <div className="mt-6 p-4 bg-red-900/20 border border-red-800 rounded-lg">
              <div className="text-red-400 font-semibold text-sm mb-1">{t('footer.emergency.title')}</div>
              <div className="text-red-300 text-sm">{t('footer.emergency.hotline')}</div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">{t('footer.copyright')}</div>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">{t('footer.links.privacy')}</a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">{t('footer.links.terms')}</a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">{t('footer.links.cookie')}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

