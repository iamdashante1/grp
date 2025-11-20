'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useI18n } from '@/components/providers/I18nProvider';
import HomeHero from '@/components/sections/home/HomeHero';
import UrgentNeeds from '@/components/sections/home/UrgentNeeds';
import { 
  Heart, 
  Users, 
  Droplet, 
  Clock, 
  Shield, 
  Award,
  ArrowRight,
  CheckCircle,
  Activity,
  Calendar,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import DashboardFeatures from '@/components/dashboard/DashboardFeatures';

export default function Home() {
  const { isAuthenticated, user } = useAuth();
  const { t } = useI18n();
  const stats = [
    { icon: Users, label: t('home.stats.activeDonors'), value: '12,547', color: 'text-blue-600' },
    { icon: Droplet, label: t('home.stats.livesSaved'), value: '8,932', color: 'text-red-600' },
    { icon: Activity, label: t('home.stats.bloodUnits'), value: '23,651', color: 'text-green-600' },
    { icon: Clock, label: t('home.stats.responseTime'), value: '< 2 hrs', color: 'text-purple-600' },
  ];

  const features = [
    {
      icon: Shield,
      title: t('home.features.safe.title'),
      description: t('home.features.safe.desc')
    },
    {
      icon: Clock,
      title: t('home.features.quick.title'),
      description: t('home.features.quick.desc')
    },
    {
      icon: Users,
      title: t('home.features.verified.title'),
      description: t('home.features.verified.desc')
    },
    {
      icon: Award,
      title: t('home.features.trusted.title'),
      description: t('home.features.trusted.desc')
    }
  ];

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  // If user is authenticated, show personalized dashboard-style home
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Welcome Hero for Authenticated Users */}
        <section className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 dark:from-red-700 dark:via-red-800 dark:to-red-900 text-white py-12">
          <div className="container-app">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2 animate-fade-in-up">
                  {t('home.auth.welcome', { name: user?.fullName || user?.name || '' })}
                </h1>
                <p className="text-red-100 dark:text-red-200 text-lg">
                  {t('home.auth.ready')}
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-lg px-6 py-3 text-center">
                  <div className="text-2xl font-bold">5</div>
                  <div className="text-sm text-red-100">{t('home.auth.donations')}</div>
                </div>
                <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-lg px-6 py-3 text-center">
                  <div className="text-2xl font-bold">15</div>
                  <div className="text-sm text-red-100">{t('home.stats.livesSaved')}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-8 container-app">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
            <Link
              href="/dashboard"
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer animate-fade-in-up hover-lift"
              style={{ animationDelay: '0ms' }}
            >
              <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{t('nav.dashboard')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t('home.auth.viewStats')}</p>
            </Link>

            <Link
              href="/blood-availability"
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer animate-fade-in-up hover-lift"
              style={{ animationDelay: '80ms' }}
            >
              <div className="bg-red-100 dark:bg-red-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Droplet className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{t('nav.bloodBank')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t('home.auth.checkAvailability')}</p>
            </Link>

            <Link
              href="/contact"
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer animate-fade-in-up hover-lift"
              style={{ animationDelay: '160ms' }}
            >
              <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{t('home.auth.schedule')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t('home.auth.bookAppointment')}</p>
            </Link>

            <Link
              href="/profile"
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer animate-fade-in-up hover-lift"
              style={{ animationDelay: '240ms' }}
            >
              <div className="bg-purple-100 dark:bg-purple-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{t('nav.profile')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t('home.auth.manageAccount')}</p>
            </Link>
          </div>
        </section>

        {/* Dashboard Features */}
        <section className="py-4 container-app animate-fade-in-up">
          <DashboardFeatures userName={user?.fullName || user?.name || ''} hideWelcome />
        </section>

        <UrgentNeeds />

        {/* Recent Activity */}
        <section className="py-8 container-app animate-fade-in-up">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('home.auth.recentActivity')}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{t('home.auth.lastDonation')}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">October 8, 2024</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {t('home.auth.lastDonationDesc', { amount: '450ml', blood: user?.bloodType || 'O+' })}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{t('home.auth.nextEligible')}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">December 8, 2024</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {t('home.auth.nextEligibleDesc', { days: 49 })}
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Public homepage for non-authenticated users
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <HomeHero />

      {/* Features Section */}
      <section className="section-y bg-gray-50 dark:bg-gray-800">
        <div className="container-app">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('home.features.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('home.features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-200 text-center group"
                >
                  <div className="bg-red-100 dark:bg-red-900/30 rounded-full p-4 w-fit mx-auto mb-4 group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-colors">
                    <Icon className="h-8 w-8 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blood Types Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container-app">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('home.blood.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              {t('home.blood.subtitle')}
            </p>
            <Link
              href="/blood-availability"
              className="inline-flex items-center bg-red-600 dark:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 dark:hover:bg-red-800 transition-colors"
            >
              {t('home.blood.cta')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {bloodTypes.map((type) => (
              <div
                key={type}
                className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/40 border-2 border-red-200 dark:border-red-700 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-200 group"
              >
                <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2 group-hover:scale-110 transition-transform">
                  {type}
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                  <div
                    className="bg-red-500 dark:bg-red-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.floor(Math.random() * 80) + 20}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {t('home.blood.units', { count: Math.floor(Math.random() * 50) + 10 })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-800 dark:from-red-700 dark:to-red-900 text-white">
        <div className="container-app text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('home.cta.title')}
          </h2>
          <p className="text-xl text-red-100 dark:text-red-200 mb-8 max-w-2xl mx-auto">
            {t('home.cta.blurb')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button href="/auth/register" variant="secondary" size="lg">
              <Heart className="mr-2 h-5 w-5" fill="currentColor" />
              {t('home.cta.primary')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button href="/about" variant="outline" size="lg">{t('home.cta.secondary')}</Button>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center justify-center space-x-3">
              <CheckCircle className="h-6 w-6 text-green-300" />
              <span>{t('home.cta.point1')}</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <CheckCircle className="h-6 w-6 text-green-300" />
              <span>{t('home.cta.point2')}</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <CheckCircle className="h-6 w-6 text-green-300" />
              <span>{t('home.cta.point3')}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


