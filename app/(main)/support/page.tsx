'use client';

import { useEffect, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useI18n } from '@/components/providers/I18nProvider';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle,
  AlertTriangle,
  Loader,
  LayoutDashboard,
  ClipboardList,
  LifeBuoy,
  Droplet
} from 'lucide-react';
import toast from 'react-hot-toast';
import Dropdown from '@/components/ui/Dropdown';
import Button from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';

interface SupportFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const SUBJECT_OPTIONS = [
  { value: 'donation', key: 'contact.subject.donation' },
  { value: 'request', key: 'contact.subject.request' },
  { value: 'appointment', key: 'contact.subject.appointment' },
  { value: 'technical', key: 'contact.subject.technical' },
  { value: 'partnership', key: 'contact.subject.partnership' },
  { value: 'general', key: 'contact.subject.general' },
  { value: 'other', key: 'contact.subject.other' }
];

interface SupportHistoryEntry {
  referenceId: string;
  subject: string;
  createdAt: string;
}

const HISTORY_LIMIT = 5;

export default function SupportPage() {
  const { t } = useI18n();
  const { user, isAuthenticated } = useAuth();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<SupportFormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }
  });

  const [history, setHistory] = useState<SupportHistoryEntry[]>([]);
  const storageKey = user?._id ? `supportHistory:${user._id}` : null;

  useEffect(() => {
    if (!storageKey) {
      setHistory([]);
      return;
    }
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem(storageKey);
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch {
        setHistory([]);
      }
    } else {
      setHistory([]);
    }
  }, [storageKey]);

  useEffect(() => {
    if (!user) return;
    const [firstName = '', ...rest] = (user.fullName || '').split(' ');
    const lastName = rest.join(' ');
    setValue('firstName', firstName || user.name || '', { shouldValidate: false });
    if (lastName) {
      setValue('lastName', lastName, { shouldValidate: false });
    }
    setValue('email', user.email || '', { shouldValidate: false });
    setValue('phone', user.phone || '', { shouldValidate: false });
  }, [user, setValue]);

  const persistHistory = (entry: SupportHistoryEntry) => {
    if (!storageKey || typeof window === 'undefined') return;
    const next = [entry, ...history].slice(0, HISTORY_LIMIT);
    window.localStorage.setItem(storageKey, JSON.stringify(next));
    setHistory(next);
  };

  const onSubmit = handleSubmit(async (values) => {
    try {
      const response = await fetch('/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, userId: user?._id }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || t('contact.toast.failed'));
      }

      toast.success(`${t('contact.toast.success')} Ref: ${data.data.referenceId}`);
      persistHistory({
        referenceId: data.data.referenceId,
        subject: values.subject,
        createdAt: new Date().toISOString(),
      });
      reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : t('contact.toast.failed');
      toast.error(message);
    }
  });

  const quickActions = useMemo(() => ([
    {
      icon: LayoutDashboard,
      href: '/dashboard',
      label: t('contact.quickActions.dashboard'),
      description: t('contact.quickActions.dashboardDesc'),
    },
    {
      icon: ClipboardList,
      href: '/profile',
      label: t('contact.quickActions.profile'),
      description: t('contact.quickActions.profileDesc'),
    },
    {
      icon: Droplet,
      href: '/request',
      label: t('contact.quickActions.requests'),
      description: t('contact.quickActions.requestsDesc'),
    },
    {
      icon: LifeBuoy,
      href: '/support',
      label: t('contact.quickActions.support'),
      description: t('contact.quickActions.supportDesc'),
    },
  ]), [t]);

  const contactInfo = [
    {
      icon: Phone,
      title: t('contact.info.phone'),
      details: ['+1 (876) 123-4567', '+1 (876) 987-6543'],
      description: t('contact.info.phoneDesc')
    },
    {
      icon: Mail,
      title: t('contact.info.email'),
      details: ['info@bloodbridge.jm', 'emergency@bloodbridge.jm'],
      description: t('contact.info.emailDesc')
    },
    {
      icon: MapPin,
      title: t('contact.info.address'),
      details: ['123 Hope Road', 'Kingston 6, Jamaica'],
      description: t('contact.info.addressDesc')
    },
    {
      icon: Clock,
      title: t('contact.info.hours'),
      details: ['Mon-Fri: 8:00 AM - 8:00 PM', 'Sat-Sun: 9:00 AM - 5:00 PM'],
      description: t('contact.info.hoursDesc')
    }
  ];

  const departments = [
    {
      name: t('contact.dept.donor'),
      email: 'donors@bloodbridge.jm',
      description: t('contact.dept.donorDesc')
    },
    {
      name: t('contact.dept.requests'),
      email: 'requests@bloodbridge.jm',
      description: t('contact.dept.requestsDesc')
    },
    {
      name: t('contact.dept.general'),
      email: 'info@bloodbridge.jm',
      description: t('contact.dept.generalDesc')
    },
    {
      name: t('contact.dept.technical'),
      email: 'support@bloodbridge.jm',
      description: t('contact.dept.technicalDesc')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container-app">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
              <MessageCircle className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{t('contact.title')}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mt-4 max-w-3xl mx-auto">{t('contact.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 relative overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <Send className="h-6 w-6 mr-2 text-red-600" />
                  {t('contact.formTitle')}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">{t('contact.formSubtitle')}</p>
              </div>

              {!isAuthenticated && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/85 dark:bg-gray-900/85 px-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {t('contact.loginRequiredTitle')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-lg">
                    {t('contact.loginRequiredDescription')}
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <Button href="/auth/login">{t('contact.loginButton')}</Button>
                    <Button href="/auth/register" variant="outline">
                      {t('contact.registerButton')}
                    </Button>
                  </div>
                </div>
              )}

              <form onSubmit={onSubmit} className="p-6 space-y-6">
                <fieldset disabled={!isAuthenticated} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('form.firstName')} *</label>
                    <input
                      type="text"
                      {...register('firstName', {
                        required: t('contact.errors.firstNameRequired'),
                      })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder={t('form.firstNamePlaceholder')}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('form.lastName')} *</label>
                    <input
                      type="text"
                      {...register('lastName', {
                        required: t('contact.errors.lastNameRequired'),
                      })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder={t('form.lastNamePlaceholder')}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('form.email')} *</label>
                    <input
                      type="email"
                      {...register('email', {
                        required: t('contact.errors.emailRequired'),
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: t('contact.errors.emailInvalid'),
                        },
                      })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder={t('form.emailPlaceholder')}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('form.phone')}</label>
                    <input
                      type="tel"
                      {...register('phone')}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder={t('form.phonePlaceholder')}
                    />
                  </div>
                </div>

                <Controller
                  name="subject"
                  control={control}
                  rules={{ required: t('contact.errors.subjectRequired') }}
                  render={({ field }) => (
                    <Dropdown
                      label={t('contact.subject.label')}
                      placeholder={t('contact.subject.placeholder')}
                      required
                      value={field.value}
                      onChange={(value) => field.onChange(value as string)}
                      options={SUBJECT_OPTIONS.map((option) => ({
                        value: option.value,
                        label: t(option.key),
                      }))}
                      error={errors.subject?.message}
                    />
                  )}
                />

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('contact.message')} *</label>
                  <textarea
                    {...register('message', {
                      required: t('contact.errors.messageRequired'),
                      minLength: { value: 10, message: t('contact.errors.messageTooShort') },
                    })}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder={t('contact.messagePlaceholder')}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader className="animate-spin h-5 w-5 mr-2" />
                        <span>{t('contact.sending')}</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        <span>{t('contact.send')}</span>
                      </>
                    )}
                  </Button>
                </div>
                </fieldset>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Details */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('contact.getInTouch')}</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg">
                      <info.icon className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {info.title}
                      </h4>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600 dark:text-gray-400 text-sm">
                          {detail}
                        </p>
                      ))}
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {info.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-4 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                {t('contact.emergencyTitle')}
              </h3>
              <p className="text-red-800 dark:text-red-200 text-sm mb-4">{t('contact.emergencySubtitle')}</p>
              <div className="space-y-2">
                <div className="text-red-900 dark:text-red-100 font-semibold">
                  Emergency Hotline: 119
                </div>
                <div className="text-red-900 dark:text-red-100 font-semibold">
                  Blood Emergency: +1 (876) BLOOD-1
                </div>
              </div>
            </div>

            {/* Departments */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                {t('contact.departments')}
              </h3>
              <div className="space-y-4">
                {departments.map((dept, index) => (
                  <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {dept.name}
                    </h4>
                    <p className="text-sm text-red-600 dark:text-red-400 mb-1">
                      {dept.email}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {dept.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {isAuthenticated ? (
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t('contact.quickActions.title')}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {t('contact.quickActions.description')}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickActions.map((action) => (
                  <a
                    key={action.href}
                    href={action.href}
                    className="flex items-start space-x-3 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:border-red-500 dark:hover:border-red-400 transition-colors"
                  >
                    <div className="p-2 rounded-full bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                      <action.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{action.label}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{action.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t('contact.historyTitle')}
              </h3>
              {history.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('contact.historyEmpty')}
                </p>
              ) : (
                <div className="space-y-4">
                  {history.map((entry) => (
                    <div
                      key={entry.referenceId}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(entry.createdAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                        </p>
                        <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                          {t('contact.historySubmitted')}
                        </span>
                      </div>
                      <p className="mt-2 font-semibold text-gray-900 dark:text-white">
                        {t(`contact.subject.${entry.subject}`, entry.subject)}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        {t('contact.historyReference', { reference: entry.referenceId })}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {t('contact.guestTitle')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 max-w-2xl mx-auto">
              {t('contact.guestDescription')}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button href="/auth/login">{t('contact.loginButton')}</Button>
              <Button href="/auth/register" variant="outline">
                {t('contact.registerButton')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
