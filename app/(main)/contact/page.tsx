'use client';

import React, { useState } from 'react';
import { useI18n } from '@/components/providers/I18nProvider';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle,
  Building2,
  AlertTriangle,
  Loader
} from 'lucide-react';
import toast from 'react-hot-toast';
import Dropdown from '@/components/ui/Dropdown';
import Button from '@/components/ui/Button';

export default function Contact() {
  const { t } = useI18n();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = t('contact.errors.firstNameRequired');
    if (!formData.lastName.trim()) newErrors.lastName = t('contact.errors.lastNameRequired');
    if (!formData.email.trim()) {
      newErrors.email = t('contact.errors.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact.errors.emailInvalid');
    }
    if (!formData.subject) newErrors.subject = t('contact.errors.subjectRequired');
    if (!formData.message.trim()) {
      newErrors.message = t('contact.errors.messageRequired');
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t('contact.errors.messageTooShort');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success(t('contact.toast.success'));
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast.error(t('contact.toast.failed'));
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <Send className="h-6 w-6 mr-2 text-red-600" />
                  {t('contact.formTitle')}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">{t('contact.formSubtitle')}</p>
              </div>

              <form onSubmit={onSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('form.firstName')} *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder={t('form.firstNamePlaceholder')}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('form.lastName')} *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder={t('form.lastNamePlaceholder')}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('form.email')} *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder={t('form.emailPlaceholder')}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('form.phone')}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder={t('form.phonePlaceholder')}
                    />
                  </div>
                </div>

                <Dropdown
                  label={t('contact.subject.label')}
                  placeholder={t('contact.subject.placeholder')}
                  required
                  value={formData.subject}
                  onChange={(value) => {
                    setFormData(prev => ({ ...prev, subject: value as string }));
                    if (errors.subject) {
                      setErrors(prev => ({ ...prev, subject: '' }));
                    }
                  }}
                  options={[
                    { value: 'donation', label: t('contact.subject.donation') },
                    { value: 'request', label: t('contact.subject.request') },
                    { value: 'appointment', label: t('contact.subject.appointment') },
                    { value: 'technical', label: t('contact.subject.technical') },
                    { value: 'partnership', label: t('contact.subject.partnership') },
                    { value: 'general', label: t('contact.subject.general') },
                    { value: 'other', label: t('contact.subject.other') }
                  ]}
                  error={errors.subject}
                />

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('contact.message')} *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder={t('contact.messagePlaceholder')}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message}</p>
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
      </div>
    </div>
  );
}


