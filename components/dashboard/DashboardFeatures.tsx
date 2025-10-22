'use client';

import { useState } from 'react';
import { 
  Heart, 
  Droplet,
  TrendingUp, 
  Calendar, 
  Award,
  Target,
  Zap,
  AlertCircle,
  CheckCircle,
  Clock,
  X
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  progress: number;
  total: number;
  unlocked: boolean;
  reward?: string;
}

interface DashboardFeaturesProps {
  userName?: string;
}

export default function DashboardFeatures({ userName = 'User' }: DashboardFeaturesProps) {
  const [showAchievements, setShowAchievements] = useState(false);
  const [showGoals, setShowGoals] = useState(false);

  const achievements: Achievement[] = [
    {
      id: 'first-donation',
      title: 'First Step',
      description: 'Complete your first blood donation',
      icon: Droplet,
      progress: 1,
      total: 1,
      unlocked: true,
      reward: '100 points'
    },
    {
      id: 'five-donations',
      title: 'Regular Hero',
      description: 'Complete 5 blood donations',
      icon: Heart,
      progress: 5,
      total: 5,
      unlocked: true,
      reward: '500 points'
    },
    {
      id: 'ten-donations',
      title: 'Lifesaver',
      description: 'Complete 10 blood donations',
      icon: Award,
      progress: 5,
      total: 10,
      unlocked: false
    },
    {
      id: 'streak-week',
      title: 'Dedicated',
      description: 'Donate every eligible period for 3 months',
      icon: Zap,
      progress: 1,
      total: 3,
      unlocked: false
    }
  ];

  const goals = [
    {
      id: 'monthly-goal',
      title: 'Monthly Impact',
      description: 'Help save 3 lives this month',
      current: 1,
      target: 3,
      icon: Target,
      color: 'blue'
    },
    {
      id: 'yearly-goal',
      title: 'Yearly Mission',
      description: 'Complete 12 donations this year',
      current: 5,
      target: 12,
      icon: TrendingUp,
      color: 'green'
    }
  ];

  const upcomingMilestones = [
    {
      title: '10th Donation',
      description: 'Just 5 more donations to unlock "Lifesaver" badge',
      progress: 50,
      icon: Award,
      color: 'purple'
    },
    {
      title: 'Next Eligible',
      description: 'You can donate again in 32 days',
      icon: Calendar,
      color: 'orange'
    }
  ];

  const quickActions = [
    {
      title: 'Schedule Donation',
      description: 'Book your next appointment',
      icon: Calendar,
      color: 'bg-blue-500',
      action: () => console.log('Schedule')
    },
    {
      title: 'Request Blood',
      description: 'Emergency blood request',
      icon: Heart,
      color: 'bg-red-500',
      action: () => console.log('Request')
    },
    {
      title: 'View Impact',
      description: 'See lives you\'ve saved',
      icon: TrendingUp,
      color: 'bg-green-500',
      action: () => console.log('Impact')
    },
    {
      title: 'Share Story',
      description: 'Inspire others to donate',
      icon: Zap,
      color: 'bg-purple-500',
      action: () => console.log('Share')
    }
  ];

  const recentAlerts = [
    {
      type: 'urgent',
      title: 'O- Blood Critically Low',
      description: 'Local hospitals need O- blood urgently',
      time: '2 hours ago',
      icon: AlertCircle
    },
    {
      type: 'success',
      title: 'Donation Confirmed',
      description: 'Your appointment for Oct 25 is confirmed',
      time: '1 day ago',
      icon: CheckCircle
    },
    {
      type: 'info',
      title: 'Eligibility Update',
      description: 'You\'re eligible to donate in 32 days',
      time: '3 days ago',
      icon: Clock
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome back, {userName}! 👋</h2>
            <p className="text-red-100">You have saved 15 lives through your donations. Keep up the amazing work!</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-3xl font-bold">5</div>
            <div className="text-sm text-red-100">Total Donations</div>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 text-left"
          >
            <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
              <action.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              {action.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {action.description}
            </p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Achievements Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <Award className="h-6 w-6 mr-2 text-yellow-500" />
              Achievements
            </h3>
            <button
              onClick={() => setShowAchievements(!showAchievements)}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              {showAchievements ? 'Show Less' : 'View All'}
            </button>
          </div>
          
          <div className="space-y-4">
            {achievements.slice(0, showAchievements ? undefined : 2).map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border-2 ${
                  achievement.unlocked
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
                    : 'bg-gray-50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      achievement.unlocked 
                        ? 'bg-green-100 dark:bg-green-900/30' 
                        : 'bg-gray-200 dark:bg-gray-600'
                    }`}>
                      <achievement.icon className={`h-5 w-5 ${
                        achievement.unlocked ? 'text-green-600' : 'text-gray-500'
                      }`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                  {achievement.unlocked && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                    <span>{achievement.progress} / {achievement.total}</span>
                    <span>{Math.round((achievement.progress / achievement.total) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        achievement.unlocked ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Goals & Milestones */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <Target className="h-6 w-6 mr-2 text-blue-500" />
            Goals & Milestones
          </h3>
          
          <div className="space-y-4">
            {goals.map((goal) => (
              <div key={goal.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <goal.icon className={`h-5 w-5 text-${goal.color}-500`} />
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {goal.title}
                    </h4>
                  </div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {goal.current} / {goal.target}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {goal.description}
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className={`bg-${goal.color}-500 h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${(goal.current / goal.target) * 100}%` }}
                  />
                </div>
              </div>
            ))}

            <div className="mt-6 space-y-3">
              <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                Upcoming Milestones
              </h4>
              {upcomingMilestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className={`p-2 rounded-lg bg-${milestone.color}-100 dark:bg-${milestone.color}-900/30`}>
                    <milestone.icon className={`h-4 w-4 text-${milestone.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      {milestone.title}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <AlertCircle className="h-6 w-6 mr-2 text-orange-500" />
          Recent Alerts & Updates
        </h3>
        
        <div className="space-y-3">
          {recentAlerts.map((alert, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-l-4 ${
                alert.type === 'urgent'
                  ? 'bg-red-50 dark:bg-red-900/20 border-red-500'
                  : alert.type === 'success'
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
                  : 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <alert.icon className={`h-5 w-5 mt-0.5 ${
                    alert.type === 'urgent'
                      ? 'text-red-600'
                      : alert.type === 'success'
                      ? 'text-green-600'
                      : 'text-blue-600'
                  }`} />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {alert.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {alert.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                      {alert.time}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
