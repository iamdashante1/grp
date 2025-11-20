'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
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
import Button from '@/components/ui/Button';
import { useI18n } from '@/components/providers/I18nProvider';

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
  hideWelcome?: boolean;
}

export default function DashboardFeatures({ userName = '', hideWelcome = false }: DashboardFeaturesProps) {
  const { t } = useI18n();
  const router = useRouter();
  const [showAchievements, setShowAchievements] = useState(false);
  const [showGoals, setShowGoals] = useState(false);

  const colorMap = {
    blue: {
      text500: 'text-blue-500',
      text600: 'text-blue-600',
      bg500: 'bg-blue-500',
      bg100: 'bg-blue-100',
      darkBg900_30: 'dark:bg-blue-900/30',
    },
    green: {
      text500: 'text-green-500',
      text600: 'text-green-600',
      bg500: 'bg-green-500',
      bg100: 'bg-green-100',
      darkBg900_30: 'dark:bg-green-900/30',
    },
    purple: {
      text500: 'text-purple-500',
      text600: 'text-purple-600',
      bg500: 'bg-purple-500',
      bg100: 'bg-purple-100',
      darkBg900_30: 'dark:bg-purple-900/30',
    },
    orange: {
      text500: 'text-orange-500',
      text600: 'text-orange-600',
      bg500: 'bg-orange-500',
      bg100: 'bg-orange-100',
      darkBg900_30: 'dark:bg-orange-900/30',
    },
  } as const;

  const achievements: Achievement[] = [
    {
      id: 'first-donation',
      title: t('dash.ach.first.title'),
      description: t('dash.ach.first.desc'),
      icon: Droplet,
      progress: 1,
      total: 1,
      unlocked: true,
      reward: t('dash.ach.reward', { points: 100 })
    },
    {
      id: 'five-donations',
      title: t('dash.ach.five.title'),
      description: t('dash.ach.five.desc'),
      icon: Heart,
      progress: 5,
      total: 5,
      unlocked: true,
      reward: t('dash.ach.reward', { points: 500 })
    },
    {
      id: 'ten-donations',
      title: t('dash.ach.ten.title'),
      description: t('dash.ach.ten.desc'),
      icon: Award,
      progress: 5,
      total: 10,
      unlocked: false
    },
    {
      id: 'streak-week',
      title: t('dash.ach.streak.title'),
      description: t('dash.ach.streak.desc'),
      icon: Zap,
      progress: 1,
      total: 3,
      unlocked: false
    }
  ];

  const goals = [
    {
      id: 'monthly-goal',
      title: t('dash.goals.monthly.title'),
      description: t('dash.goals.monthly.desc'),
      current: 1,
      target: 3,
      icon: Target,
      color: 'blue'
    },
    {
      id: 'yearly-goal',
      title: t('dash.goals.yearly.title'),
      description: t('dash.goals.yearly.desc'),
      current: 5,
      target: 12,
      icon: TrendingUp,
      color: 'green'
    }
  ];

  const upcomingMilestones = [
    {
      title: t('dash.milestones.tenth.title'),
      description: t('dash.milestones.tenth.desc'),
      progress: 50,
      icon: Award,
      color: 'purple'
    },
    {
      title: t('home.auth.nextEligible'),
      description: t('home.auth.nextEligibleDesc', { days: 32 }),
      icon: Calendar,
      color: 'orange'
    }
  ];

  const quickActions = [
    {
      title: t('donate.schedule'),
      description: t('home.auth.bookAppointment'),
      icon: Calendar,
      color: 'bg-blue-500',
      action: () => router.push('/donate')
    },
    {
      title: t('nav.request'),
      description: t('dash.quick.emergency'),
      icon: Heart,
      color: 'bg-red-500',
      action: () => router.push('/request')
    },
    {
      title: t('dash.quick.viewImpact'),
      description: t('dash.quick.viewImpactDesc'),
      icon: TrendingUp,
      color: 'bg-green-500',
      action: () => router.push('/dashboard')
    },
    {
      title: t('dash.quick.share'),
      description: t('dash.quick.shareDesc'),
      icon: Zap,
      color: 'bg-purple-500',
      action: async () => {
        try {
          const shareData = {
            title: 'BloodBridge',
            text: t('home.cta.blurb'),
            url: typeof window !== 'undefined' ? window.location.origin : 'https://bloodbridge.local',
          };
          if (typeof navigator !== 'undefined' && (navigator as any).share) {
            await (navigator as any).share(shareData);
          } else if (typeof window !== 'undefined' && navigator.clipboard) {
            await navigator.clipboard.writeText(shareData.url);
            toast.success('Link copied to clipboard');
          }
        } catch (err) {
          toast.error('Unable to share right now');
        }
      }
    }
  ];

  const recentAlerts = [
    {
      type: 'urgent',
      title: t('dash.alerts.lowOBlood'),
      description: t('dash.alerts.lowOBloodDesc'),
      time: t('dash.alerts.time.hours', { count: 2 }),
      icon: AlertCircle
    },
    {
      type: 'success',
      title: t('dash.alerts.donationConfirmed'),
      description: t('dash.alerts.donationConfirmedDesc', { date: 'Oct 25' }),
      time: t('dash.alerts.time.days', { count: 1 }),
      icon: CheckCircle
    },
    {
      type: 'info',
      title: t('dash.alerts.eligibilityUpdate'),
      description: t('home.auth.nextEligibleDesc', { days: 32 }),
      time: t('dash.alerts.time.days', { count: 3 }),
      icon: Clock
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      {!hideWelcome && (
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">{t('home.auth.welcome', { name: userName })}</h2>
              <p className="text-red-100">{t('dash.banner.savings', { count: 15 })}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-3xl font-bold">5</div>
              <div className="text-sm text-red-100">{t('dash.totalDonations')}</div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 text-left animate-fade-in-up hover-lift"
            style={{ animationDelay: `${index * 80}ms` }}
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
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 animate-fade-in-up">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <Award className="h-6 w-6 mr-2 text-yellow-500" />
              {t('dash.ach.title')}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAchievements(!showAchievements)}
            >
              {showAchievements ? t('dash.showLess') : t('dash.viewAll')}
            </Button>
          </div>
          
          <div className="space-y-4">
            {achievements.slice(0, showAchievements ? undefined : 2).map((achievement, idx) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border-2 animate-fade-in-up ${
                  achievement.unlocked
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
                    : 'bg-gray-50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600'
                }`}
                style={{ animationDelay: `${idx * 70}ms` }}
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
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 animate-fade-in-up">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <Target className="h-6 w-6 mr-2 text-blue-500" />
            {t('dash.goals.title')}
          </h3>
          
          <div className="space-y-4">
            {goals.map((goal, idx) => (
              <div key={goal.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg animate-fade-in-up" style={{ animationDelay: `${idx * 70}ms` }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <goal.icon className={`h-5 w-5 ${colorMap[goal.color as keyof typeof colorMap].text500}`} />
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
                    className={`${colorMap[goal.color as keyof typeof colorMap].bg500} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${(goal.current / goal.target) * 100}%` }}
                  />
                </div>
              </div>
            ))}

            <div className="mt-6 space-y-3">
              <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                {t('dash.milestones.upcoming')}
              </h4>
              {upcomingMilestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg animate-fade-in-up">
                  <div className={`p-2 rounded-lg ${colorMap[milestone.color as keyof typeof colorMap].bg100} ${colorMap[milestone.color as keyof typeof colorMap].darkBg900_30}`}>
                    <milestone.icon className={`h-4 w-4 ${colorMap[milestone.color as keyof typeof colorMap].text600}`} />
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
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 animate-fade-in-up">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <AlertCircle className="h-6 w-6 mr-2 text-orange-500" />
          {t('dash.alerts.title')}
        </h3>
        
        <div className="space-y-3">
          {recentAlerts.map((alert, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-l-4 animate-fade-in-up ${
                alert.type === 'urgent'
                  ? 'bg-red-50 dark:bg-red-900/20 border-red-500'
                  : alert.type === 'success'
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
                  : 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
              }`}
              style={{ animationDelay: `${index * 60}ms` }}
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
