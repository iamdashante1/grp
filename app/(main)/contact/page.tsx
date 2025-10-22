'use client';

import React, { useState } from 'react';
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

export default function Contact() {
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
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject) newErrors.subject = 'Please select a subject';
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
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
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+1 (876) 123-4567', '+1 (876) 987-6543'],
      description: '24/7 Emergency Hotline'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@bloodbridge.jm', 'emergency@bloodbridge.jm'],
      description: 'Get in touch with us'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: ['123 Hope Road', 'Kingston 6, Jamaica'],
      description: 'Visit our main center'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: ['Mon-Fri: 8:00 AM - 8:00 PM', 'Sat-Sun: 9:00 AM - 5:00 PM'],
      description: 'Blood donation center hours'
    }
  ];

  const departments = [
    {
      name: 'Donor Services',
      email: 'donors@bloodbridge.jm',
      description: 'Questions about blood donation, scheduling appointments'
    },
    {
      name: 'Blood Requests',
      email: 'requests@bloodbridge.jm',
      description: 'Hospital blood requests, emergency blood needs'
    },
    {
      name: 'General Inquiries',
      email: 'info@bloodbridge.jm',
      description: 'General questions, partnerships, media inquiries'
    },
    {
      name: 'Technical Support',
      email: 'support@bloodbridge.jm',
      description: 'Website issues, account problems, technical help'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
              <MessageCircle className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mt-4 max-w-3xl mx-auto">
            Have questions about blood donation or need assistance? We're here to help 24/7.
            Reach out to us through any of the channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <Send className="h-6 w-6 mr-2 text-red-600" />
                  Send us a Message
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              <form onSubmit={onSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter your email address"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <Dropdown
                  label="Subject"
                  placeholder="Select a subject"
                  required
                  value={formData.subject}
                  onChange={(value) => {
                    setFormData(prev => ({ ...prev, subject: value as string }));
                    if (errors.subject) {
                      setErrors(prev => ({ ...prev, subject: '' }));
                    }
                  }}
                  options={[
                    { value: 'donation', label: 'Blood Donation Inquiry' },
                    { value: 'request', label: 'Blood Request' },
                    { value: 'appointment', label: 'Appointment Scheduling' },
                    { value: 'technical', label: 'Technical Support' },
                    { value: 'partnership', label: 'Partnership Opportunity' },
                    { value: 'general', label: 'General Question' },
                    { value: 'other', label: 'Other' }
                  ]}
                  error={errors.subject}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Tell us how we can help you..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center space-x-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="animate-spin h-5 w-5" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Details */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Get in Touch
              </h3>
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
                Emergency Contact
              </h3>
              <p className="text-red-800 dark:text-red-200 text-sm mb-4">
                For urgent blood requests or life-threatening emergencies:
              </p>
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
                Departments
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
