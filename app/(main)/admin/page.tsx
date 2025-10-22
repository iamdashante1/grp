'use client';

import { Shield, Users, Activity, Settings, AlertCircle } from 'lucide-react';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
              <Shield className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage blood bank operations and users
              </p>
            </div>
          </div>
        </div>

        {/* Access Restricted Notice */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-8">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                Restricted Access
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                This page is restricted to administrators only. Full admin functionality will be available in the next release.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                If you need admin access, please contact the system administrator.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">12,547</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Requests</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">48</p>
              </div>
              <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-lg">
                <Activity className="h-8 w-8 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Approvals</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">12</p>
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-lg">
                <AlertCircle className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">System Status</p>
                <p className="text-lg font-bold text-green-600 mt-2">All Systems Operational</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                <Settings className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Users className="h-6 w-6 mr-2 text-blue-600" />
              User Management
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Manage donors, hospitals, and admin users
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                Coming in next release...
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Activity className="h-6 w-6 mr-2 text-red-600" />
              Blood Inventory
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Monitor and manage blood stock levels
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                Coming in next release...
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <AlertCircle className="h-6 w-6 mr-2 text-yellow-600" />
              Request Management
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Review and approve blood requests
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                Coming in next release...
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Settings className="h-6 w-6 mr-2 text-purple-600" />
              System Settings
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Configure system preferences and policies
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                Coming in next release...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
