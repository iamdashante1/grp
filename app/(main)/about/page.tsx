import React from 'react';
import Link from 'next/link';
import { 
  Heart, 
  Users, 
  Target, 
  Award, 
  Droplet, 
  Building2,
  Clock,
  Shield,
  CheckCircle,
  TrendingUp,
  Globe,
  UserCheck,
  Phone,
  Mail
} from 'lucide-react';

export default function About() {
  const stats = [
    {
      icon: Users,
      number: '25,000+',
      label: 'Registered Donors',
      description: 'Active blood donors across Jamaica'
    },
    {
      icon: Droplet,
      number: '12,000+',
      label: 'Units Collected',
      description: 'Blood units collected annually'
    },
    {
      icon: Heart,
      number: '8,000+',
      label: 'Lives Saved',
      description: 'Jamaican lives saved through donations'
    },
    {
      icon: Building2,
      number: '50+',
      label: 'Partner Hospitals',
      description: 'Healthcare facilities across the island'
    }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'All blood donations are thoroughly tested and screened to ensure the highest safety standards for both donors and recipients.'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Our emergency blood services operate round the clock to respond to urgent medical situations and emergencies.'
    },
    {
      icon: UserCheck,
      title: 'Easy Registration',
      description: 'Simple and quick donor registration process with comprehensive health screening and eligibility verification.'
    },
    {
      icon: Globe,
      title: 'Island-Wide Network',
      description: 'Extensive network of donation centers, mobile units, and partner hospitals across all 14 parishes of Jamaica.'
    }
  ];

  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Medical Officer',
      description: 'Leading hematologist with 15+ years of experience in blood banking and transfusion medicine.'
    },
    {
      name: 'Michael Chen',
      role: 'Operations Director',
      description: 'Expert in healthcare operations management, ensuring efficient blood collection and distribution.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Donor Relations Manager',
      description: 'Dedicated to donor experience and community outreach programs for blood donation awareness.'
    },
    {
      name: 'Dr. James Wilson',
      role: 'Quality Assurance Director',
      description: 'Ensures all safety protocols and quality standards are maintained throughout the process.'
    }
  ];

  const timeline = [
    {
      year: '2018',
      title: 'BloodBridge Founded',
      description: 'Started as a small community initiative to address local blood shortage.'
    },
    {
      year: '2019',
      title: 'First 1,000 Donors',
      description: 'Reached our first milestone of 1,000 registered donors.'
    },
    {
      year: '2020',
      title: 'Digital Platform Launch',
      description: 'Launched our comprehensive online platform for donors and hospitals.'
    },
    {
      year: '2022',
      title: 'Parish Expansion',
      description: 'Expanded operations to serve all 14 parishes across Jamaica.'
    },
    {
      year: '2024',
      title: 'Mobile App Launch',
      description: 'Introduced mobile application for convenient blood donation management.'
    },
    {
      year: '2025',
      title: 'AI Integration',
      description: 'Implementing AI-powered matching system for optimal blood distribution.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full">
                <Heart className="h-12 w-12" fill="currentColor" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6">About BloodBridge</h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              Connecting Jamaican donors with those in need through innovative technology and compassionate care. 
              We're building a bridge between generosity and life-saving medical treatment across the island.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                To create a sustainable and efficient blood donation ecosystem that ensures no Jamaican patient 
                goes without the blood they need. We leverage technology to connect willing donors with 
                healthcare facilities across Jamaica, making the process seamless, safe, and accessible for everyone.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 dark:text-gray-300">
                    Ensure safe and adequate blood supply for all medical facilities
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 dark:text-gray-300">
                    Promote voluntary blood donation through education and awareness
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 dark:text-gray-300">
                    Maintain the highest standards of safety and quality
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Our Impact
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full w-fit mx-auto mb-3">
                      <stat.icon className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.number}
                    </div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {stat.label}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {stat.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose BloodBridge?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We combine cutting-edge technology with compassionate care to create the most 
              efficient and reliable blood donation network.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full w-fit mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              These principles guide everything we do and shape our commitment to saving lives.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
              <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full w-fit mx-auto mb-6">
                <Heart className="h-8 w-8 text-red-600" fill="currentColor" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Compassion
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We approach every interaction with empathy, understanding that behind every 
                donation and request is a human story of hope and healing.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
              <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full w-fit mx-auto mb-6">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Safety First
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                The safety of our donors and recipients is paramount. We maintain the highest 
                standards in screening, testing, and handling of all blood products.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
              <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full w-fit mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Innovation
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We continuously seek new technologies and methods to improve the efficiency 
                and effectiveness of blood donation and distribution.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-red-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-3xl mx-auto">
            Join thousands of heroes who are already part of our life-saving community. 
            Every donation counts, every donor matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/register" 
              className="bg-white text-red-600 px-8 py-3 rounded-lg hover:bg-red-50 transition-colors font-medium text-center"
            >
              Become a Donor
            </Link>
            <Link 
              href="/blood-availability" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-red-600 transition-colors font-medium text-center"
            >
              Request Blood
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
