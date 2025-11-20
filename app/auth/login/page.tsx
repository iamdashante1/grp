'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Heart, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useI18n } from '@/components/providers/I18nProvider';
import Button from '@/components/ui/Button';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(email, password);
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-950 flex items-center justify-center px-4 py-12">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Brand / Intro */}
        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-red-600 via-red-700 to-red-800 dark:from-red-700 dark:via-red-800 dark:to-red-900 text-white rounded-2xl p-10 shadow-lg border border-red-700/30 animate-fade-in-up">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-white/20 p-3 rounded-xl">
              <Heart className="h-7 w-7 text-white" fill="currentColor" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">BloodBridge</span>
              <span className="text-sm text-red-100 -mt-1">Save Lives Together</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold leading-snug mb-3">Welcome back</h1>
          <p className="text-red-100 mb-8">Sign in to access your dashboard, book donations, and check blood availability.</p>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-2xl font-bold">12k+</div>
              <div className="text-sm text-red-100">Active Donors</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-2xl font-bold">8.9k</div>
              <div className="text-sm text-red-100">Lives Saved</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm text-red-100">Support</div>
            </div>
          </div>
        </div>

        {/* Form card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 md:p-10 animate-fade-in-up">
          <div className="md:hidden mb-6 flex items-center space-x-3">
            <div className="bg-primary-600 p-2 rounded-lg">
              <Heart className="h-5 w-5 text-white" fill="currentColor" />
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">BloodBridge</div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('auth.login.title')}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">{t('auth.login.subtitle')}</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('form.email')}</label>
              <div className="relative">
                <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('form.emailPlaceholder')}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('form.password')}</label>
              <div className="relative">
                <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('form.passwordPlaceholder')}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div className="flex justify-end mt-2">
                <Link href="#" className="text-sm text-primary-600 hover:text-primary-700 dark:text-red-400">{t('auth.forgotPassword')}</Link>
              </div>
            </div>

            <Button type="submit" disabled={loading} fullWidth>
              {loading ? t('auth.login.loading') : t('auth.login.submit')}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="font-semibold text-primary-600 hover:text-primary-700 inline-flex items-center">
              Create one <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
