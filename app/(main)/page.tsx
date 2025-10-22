'use client';

import Link from 'next/link';
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
  const stats = [
    { icon: Users, label: 'Active Donors', value: '12,547', color: 'text-blue-600' },
    { icon: Droplet, label: 'Lives Saved', value: '8,932', color: 'text-red-600' },
    { icon: Activity, label: 'Blood Units', value: '23,651', color: 'text-green-600' },
    { icon: Clock, label: 'Response Time', value: '< 2 hrs', color: 'text-purple-600' },
  ];

  const features = [
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'All blood donations follow strict medical guidelines and safety protocols.'
    },
    {
      icon: Clock,
      title: 'Quick Response',
      description: 'Emergency blood requests are processed within 2 hours of submission.'
    },
    {
      icon: Users,
      title: 'Verified Donors',
      description: 'All donors are medically screened and verified for safety.'
    },
    {
      icon: Award,
      title: 'Trusted Platform',
      description: 'Partner with hospitals and medical centers island-wide.'
    }
  ];

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  // If user is authenticated, show personalized dashboard-style home
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Welcome Hero for Authenticated Users */}
        <section className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 dark:from-red-700 dark:via-red-800 dark:to-red-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  Welcome back, {user?.name || 'User'}! 👋
                </h1>
                <p className="text-red-100 dark:text-red-200 text-lg">
                  Ready to make a difference today?
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-lg px-6 py-3 text-center">
                  <div className="text-2xl font-bold">5</div>
                  <div className="text-sm text-red-100">Donations</div>
                </div>
                <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-lg px-6 py-3 text-center">
                  <div className="text-2xl font-bold">15</div>
                  <div className="text-sm text-red-100">Lives Saved</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/dashboard"
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer"
            >
              <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Dashboard</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">View your stats</p>
            </Link>

            <Link
              href="/blood-availability"
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer"
            >
              <div className="bg-red-100 dark:bg-red-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Droplet className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Blood Bank</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Check availability</p>
            </Link>

            <Link
              href="/contact"
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer"
            >
              <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Schedule</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Book appointment</p>
            </Link>

            <Link
              href="/profile"
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer"
            >
              <div className="bg-purple-100 dark:bg-purple-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Profile</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Manage account</p>
            </Link>
          </div>
        </section>

        {/* Dashboard Features */}
        <section className="py-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DashboardFeatures userName={user?.name || 'User'} />
        </section>

        {/* Urgent Blood Needs */}
        <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-red-50 dark:bg-red-900/20 px-6 py-4 border-b border-red-200 dark:border-red-800">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Urgent Blood Needs
                </h2>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['O+', 'O-', 'A+', 'AB-'].map((type) => (
                  <div
                    key={type}
                    className="bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700 rounded-lg p-4 text-center"
                  >
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">
                      {type}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Urgently Needed
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link
                  href="/blood-availability"
                  className="inline-flex items-center text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
                >
                  View All Blood Types
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Last Donation</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">October 8, 2024</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                You donated 450ml of {user?.bloodType || 'O+'} blood. Great job!
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Next Eligible</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">December 8, 2024</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                You will be eligible to donate again in 49 days.
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
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 dark:from-red-700 dark:via-red-800 dark:to-red-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Save Lives
                  <span className="block text-red-200">One Drop at a Time</span>
                </h1>
                <p className="text-xl text-red-100 leading-relaxed max-w-lg">
                  Join our mission to connect Jamaican blood donors with those in need. 
                  Your donation can save up to 3 lives across the island.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/register"
                  className="bg-white text-red-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-50 transition-all duration-200 flex items-center justify-center group cursor-pointer"
                >
                  Become a Donor
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/request"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-red-700 transition-all duration-200 flex items-center justify-center cursor-pointer"
                >
                  Request Blood
                </Link>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 bg-red-200 rounded-full border-2 border-white flex items-center justify-center"
                    >
                      <Heart className="h-4 w-4 text-red-700" fill="currentColor" />
                    </div>
                  ))}
                </div>
                <div className="text-red-100">
                  <div className="font-semibold">1000+ donors this month</div>
                  <div className="text-sm">Join our community</div>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/20 dark:border-white/10">
              <h3 className="text-2xl font-bold mb-6 text-center">Impact Statistics</h3>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="bg-white/20 dark:bg-white/10 rounded-full p-3 w-fit mx-auto mb-3">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-red-100 text-sm">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose BloodBridge?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We&apos;re committed to making blood donation safe, accessible, and efficient for all Jamaicans.
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Current Blood Availability
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Check real-time availability of blood types in our blood bank
            </p>
            <Link
              href="/blood-availability"
              className="inline-flex items-center bg-red-600 dark:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 dark:hover:bg-red-800 transition-colors"
            >
              View Full Inventory
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
                  {Math.floor(Math.random() * 50) + 10} units
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-800 dark:from-red-700 dark:to-red-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-red-100 dark:text-red-200 mb-8 max-w-2xl mx-auto">
            Join thousands of heroes who are saving lives through blood donation. 
            Every donation matters, every donor is a hero.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/register"
              className="bg-white text-red-700 dark:bg-gray-100 dark:text-red-800 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-50 dark:hover:bg-white transition-all duration-200 flex items-center group cursor-pointer"
            >
              <Heart className="mr-2 h-5 w-5" fill="currentColor" />
              Start Donating Today
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-red-700 dark:hover:text-red-800 transition-all duration-200 cursor-pointer"
            >
              Learn More
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center justify-center space-x-3">
              <CheckCircle className="h-6 w-6 text-green-300" />
              <span>Safe & Sterile Process</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <CheckCircle className="h-6 w-6 text-green-300" />
              <span>Medical Professionals</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <CheckCircle className="h-6 w-6 text-green-300" />
              <span>24/7 Emergency Support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
