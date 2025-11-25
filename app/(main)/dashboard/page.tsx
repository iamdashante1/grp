'use client';

import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Heart, 
  Droplet, 
  Calendar, 
  Bell, 
  Activity,
  MapPin,
  User,
  X
} from 'lucide-react';
import Onboarding from '@/components/onboarding/Onboarding';
import DashboardFeatures from '@/components/dashboard/DashboardFeatures';

export default function Dashboard() {
  const { user, userRole } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [showUserCard, setShowUserCard] = useState(true);

  useEffect(() => {
    // Check if user has seen onboarding (stored in sessionStorage)
    const seen = sessionStorage.getItem('hasSeenOnboarding');
    if (!seen) {
      setShowOnboarding(true);
    }
    setHasSeenOnboarding(!!seen);
  }, []);

  const handleOnboardingComplete = (userData: any) => {
    console.log('User profile data:', userData);
    // TODO: Save userData to backend/database
    sessionStorage.setItem('hasSeenOnboarding', 'true');
    sessionStorage.setItem('userProfile', JSON.stringify(userData));
    setShowOnboarding(false);
    setHasSeenOnboarding(true);
  };

  // Mock data
  const stats = {
    totalDonations: 5,
    totalRequests: 2,
    upcomingAppointments: 1,
    unreadNotifications: 3
  };

  const recentActivity = [
    {
      id: 1,
      type: 'donation',
      title: 'Blood donation completed',
      description: 'Successfully donated 450ml of O+ blood',
      date: '2024-10-08',
      status: 'completed'
    },
    {
      id: 2,
      type: 'request',
      title: 'Blood request approved',
      description: 'Your request for A+ blood has been approved',
      date: '2024-10-07',
      status: 'approved'
    },
    {
      id: 3,
      type: 'appointment',
      title: 'Appointment scheduled',
      description: 'Donation appointment for October 15, 2024',
      date: '2024-10-06',
      status: 'scheduled'
    }
  ];

  const upcomingAppointment = {
    id: 1,
    type: 'donation',
    date: '2024-10-15',
    time: '10:00 AM',
    location: 'National Blood Transfusion Service',
    address: '1 Devon Road, Kingston 10, Jamaica'
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200',
      approved: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200',
      scheduled: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200',
      pending: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'donation':
        return <Droplet className="h-5 w-5 text-red-500" />;
      case 'request':
        return <Heart className="h-5 w-5 text-blue-500" />;
      case 'appointment':
        return <Calendar className="h-5 w-5 text-green-500" />;
      default:
        return <Activity className="h-5 w-5 text-gray-500" />;
    }
  };

  const getBloodTypeColor = (bloodType: string) => {
    return 'border-red-500 text-red-700 dark:text-red-400';
  };

  const quickActions = useMemo(() => {
    if (userRole && ['doctor', 'hospital'].includes(userRole)) {
      return [
        { href: '/request', label: 'Manage blood requests', tone: 'primary' },
        { href: '/doctor', label: 'Open doctor tools', tone: 'outline' },
        { href: '/support', label: 'Contact coordination team', tone: 'danger' },
      ];
    }
    if (userRole && ['patient', 'recipient', 'caregiver'].includes(userRole)) {
      return [
        { href: '/patient', label: 'Track my request', tone: 'primary' },
        { href: '/request', label: 'Submit new request', tone: 'danger' },
        { href: '/support', label: 'Chat with advocate', tone: 'outline' },
      ];
    }
    return [
      { href: '/donate', label: 'Schedule donation', tone: 'primary' },
      { href: '/dashboard', label: 'View appointments', tone: 'outline' },
      { href: '/support', label: 'Contact support', tone: 'danger' },
    ];
  }, [userRole]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      {showOnboarding && (
        <Onboarding 
          onComplete={handleOnboardingComplete} 
          onDismiss={() => setShowOnboarding(false)} 
        />
      )}
      
      <div className="container-app">
        {/* Header with Restart Onboarding Button */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Here&apos;s what&apos;s happening with your blood donation activities.
            </p>
          </div>
          {hasSeenOnboarding && (
            <button
              onClick={() => setShowOnboarding(true)}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Restart Tour
            </button>
          )}
        </div>

        {/* Dashboard Features Component */}
        <DashboardFeatures userName={user?.fullName || user?.name || ''} />

        {/* Original Stats Grid for Reference */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Donations</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.totalDonations}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Lifetime donations</p>
              </div>
              <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30">
                <Droplet className="h-8 w-8 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Blood Requests</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.totalRequests}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Active requests</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Upcoming</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.upcomingAppointments}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Scheduled appointments</p>
              </div>
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Notifications</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.unreadNotifications}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Unread messages</p>
              </div>
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30">
                <Bell className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Recent Activity
                </h2>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {recentActivity.map((activity, idx) => (
                  <div key={activity.id} className="flex items-start space-x-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors animate-fade-in-up" style={{animationDelay: `${idx*70}ms`}}>
                    <div className="flex-shrink-0 mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {activity.description}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(activity.date)}
                        </span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                          {activity.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* User Profile Card */}
            {showUserCard && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 relative">
              <button
                type="button"
                aria-label="Close profile card"
                onClick={() => setShowUserCard(false)}
                className="absolute top-3 right-3 p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                title="Hide"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="text-center">
                <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden relative">
                  {user?.profileImage ? (
                    <Image
                      src={user.profileImage}
                      alt={user?.fullName || user?.name || 'User'}
                      fill
                      sizes="80px"
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <span className="text-2xl font-bold text-white">{(user?.fullName || user?.name || 'U').charAt(0)}</span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {user?.fullName || user?.name || 'Profile'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
                
                <div className="mt-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getBloodTypeColor(user?.bloodType || 'N/A')}`}>
                    Blood Type: {user?.bloodType || 'N/A'}
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600">5</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Donations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">15</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Lives Saved</div>
                  </div>
                </div>
              </div>
            </div>
            )}

            {/* Upcoming Appointments */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Upcoming Appointments
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      Blood Donation
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
                      Confirmed
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(upcomingAppointment.date)} at {upcomingAppointment.time}
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {upcomingAppointment.location}
                        </div>
                        <div>{upcomingAppointment.address}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                {quickActions.map((action) => {
                  const toneClasses = action.tone === 'danger'
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : action.tone === 'outline'
                      ? 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      : 'bg-primary-600 text-white hover:bg-primary-700';
                  return (
                    <Link
                      key={action.label}
                      href={action.href}
                      className={`w-full py-2 px-4 rounded-lg transition-colors text-sm font-medium block text-center ${toneClasses}`}
                    >
                      {action.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


