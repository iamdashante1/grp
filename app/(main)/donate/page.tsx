'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, Calendar as CalendarIcon, MapPin, Clock, CheckCircle, ArrowRight, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import Calendar from '@/components/ui/Calendar';
import Dropdown from '@/components/ui/Dropdown';

export default function DonatePage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [formData, setFormData] = useState({
    hasEaten: false,
    isHydrated: false,
    hasSlept: false
  });

  const locations = [
    {
      id: 1,
      name: 'National Blood Transfusion Service',
      address: '1 Devon Road, Kingston 10',
      phone: '+1 (876) 567-8900',
      hours: 'Mon-Fri: 8:00 AM - 4:00 PM'
    },
    {
      id: 2,
      name: 'Spanish Town Hospital',
      address: 'Burke Road, Spanish Town',
      phone: '+1 (876) 984-2211',
      hours: 'Mon-Fri: 9:00 AM - 3:00 PM'
    },
    {
      id: 3,
      name: 'Mandeville Regional Hospital',
      address: 'Hargreaves Avenue, Mandeville',
      phone: '+1 (876) 962-2067',
      hours: 'Mon-Fri: 8:30 AM - 3:30 PM'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Donation appointment request submitted! We will contact you shortly.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full">
              <Heart className="h-12 w-12 text-red-600" fill="currentColor" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Donate Blood, Save Lives
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Schedule your blood donation appointment and join thousands of heroes making a difference.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Appointment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Schedule Appointment
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Custom Calendar */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Select Appointment Date & Time
                  </label>
                  <Calendar
                    selectedDate={selectedDate}
                    onDateSelect={setSelectedDate}
                    minDate={new Date()}
                    maxDate={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)}
                    showTimeSlots={true}
                    timeSlots={[
                      '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
                      '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM'
                    ]}
                    selectedTime={selectedTime}
                    onTimeSelect={setSelectedTime}
                  />
                </div>

                {/* Custom Dropdown for Location */}
                <Dropdown
                  label="Donation Location"
                  placeholder="Select a donation center"
                  required
                  searchable
                  value={selectedLocation}
                  onChange={(value) => setSelectedLocation(value as string)}
                  options={locations.map(loc => ({
                    value: loc.name,
                    label: `${loc.name} - ${loc.address}`
                  }))}
                />

                {/* Pre-donation Checklist */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-blue-600" />
                    Pre-Donation Checklist
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="hasEaten"
                        checked={formData.hasEaten}
                        onChange={handleChange}
                        className="w-4 h-4 text-red-600 rounded"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        I have eaten a healthy meal today
                      </span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="isHydrated"
                        checked={formData.isHydrated}
                        onChange={handleChange}
                        className="w-4 h-4 text-red-600 rounded"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        I am well hydrated (drinking plenty of water)
                      </span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="hasSlept"
                        checked={formData.hasSlept}
                        onChange={handleChange}
                        className="w-4 h-4 text-red-600 rounded"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        I got a good night's sleep
                      </span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <CalendarIcon className="h-5 w-5" />
                  <span>Schedule Donation</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Eligibility Requirements */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Eligibility Requirements
              </h3>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>At least 17 years old</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Weigh at least 50 kg (110 lbs)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>In good general health</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Last donation was at least 8 weeks ago</span>
                </li>
              </ul>
            </div>

            {/* What to Expect */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                What to Expect
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg">
                    <Clock className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Duration</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Process takes 30-45 minutes
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                    <Heart className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Amount</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      About 450ml of blood collected
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                    Need Help?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Call us at <strong>+1 (876) 567-8900</strong> for assistance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Donation Locations */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Donation Centers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {locations.map(location => (
              <div
                key={location.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start space-x-3 mb-4">
                  <MapPin className="h-6 w-6 text-red-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                      {location.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {location.address}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {location.hours}
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">📞</span>
                    {location.phone}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
