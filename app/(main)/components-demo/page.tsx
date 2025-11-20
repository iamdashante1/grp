'use client';

import { useState } from 'react';
import { Code, Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
import Dropdown from '@/components/ui/Dropdown';
import Calendar from '@/components/ui/Calendar';

export default function ComponentsDemo() {
  // Dropdown states
  const [singleSelect, setSingleSelect] = useState('');
  const [multiSelect, setMultiSelect] = useState<string[]>([]);
  const [searchableSelect, setSearchableSelect] = useState('');
  const [bloodTypeSelect, setBloodTypeSelect] = useState('');
  
  // Calendar states
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [appointmentDate, setAppointmentDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState('');
  const [eventDate, setEventDate] = useState<Date | undefined>();

  // Options
  const parishes = [
    { value: 'kingston', label: 'Kingston' },
    { value: 'st-andrew', label: 'St. Andrew' },
    { value: 'st-catherine', label: 'St. Catherine' },
    { value: 'clarendon', label: 'Clarendon' },
    { value: 'manchester', label: 'Manchester' },
    { value: 'st-elizabeth', label: 'St. Elizabeth' },
    { value: 'westmoreland', label: 'Westmoreland' },
    { value: 'hanover', label: 'Hanover' },
    { value: 'st-james', label: 'St. James' },
    { value: 'trelawny', label: 'Trelawny' },
    { value: 'st-ann', label: 'St. Ann' },
    { value: 'st-mary', label: 'St. Mary' },
    { value: 'portland', label: 'Portland' },
    { value: 'st-thomas', label: 'St. Thomas' }
  ];

  const bloodTypes = [
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' }
  ];

  const donationFrequency = [
    { value: 'first', label: 'First Time Donor' },
    { value: 'occasional', label: 'Occasional (1-2 times/year)' },
    { value: 'regular', label: 'Regular (3-4 times/year)' },
    { value: 'frequent', label: 'Frequent (5+ times/year)' }
  ];

  const medicalConditions = [
    { value: 'none', label: 'None' },
    { value: 'diabetes', label: 'Diabetes' },
    { value: 'hypertension', label: 'Hypertension' },
    { value: 'asthma', label: 'Asthma' },
    { value: 'heart', label: 'Heart Condition' },
    { value: 'other', label: 'Other' }
  ];

  // Available dates for calendar (example: next 30 days excluding some dates)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      // Skip Sundays
      if (date.getDay() !== 0) {
        dates.push(date);
      }
    }
    return dates;
  };

  const highlightedDates = [
    { date: new Date(2025, 9, 25), label: 'Blood Drive Event', color: 'bg-blue-500' },
    { date: new Date(2025, 9, 30), label: 'World Blood Donor Day', color: 'bg-red-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container-app">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-full">
              <Code className="h-12 w-12 text-purple-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Custom Components Demo
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our custom-built dropdown and calendar components with various configurations
          </p>
        </div>

        {/* Dropdown Components Section */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <ChevronDown className="h-8 w-8 text-red-600" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Custom Dropdown Component
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Basic Dropdown */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Basic Single Select
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Simple dropdown with single selection
              </p>
              <Dropdown
                label="Select Parish"
                placeholder="Choose your parish"
                value={singleSelect}
                onChange={(value) => setSingleSelect(value as string)}
                options={parishes}
                required
              />
              {singleSelect && (
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    Selected: <strong>{parishes.find(p => p.value === singleSelect)?.label}</strong>
                  </p>
                </div>
              )}
            </div>

            {/* Searchable Dropdown */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Searchable Dropdown
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Dropdown with search functionality
              </p>
              <Dropdown
                label="Search Parish"
                placeholder="Type to search..."
                value={searchableSelect}
                onChange={(value) => setSearchableSelect(value as string)}
                options={parishes}
                searchable
                required
              />
              {searchableSelect && (
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Selected: <strong>{parishes.find(p => p.value === searchableSelect)?.label}</strong>
                  </p>
                </div>
              )}
            </div>

            {/* Multi-Select Dropdown */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Multi-Select Dropdown
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Select multiple medical conditions
              </p>
              <Dropdown
                label="Medical Conditions"
                placeholder="Select all that apply"
                value={multiSelect}
                onChange={(value) => setMultiSelect(value as string[])}
                options={medicalConditions}
                multiSelect
                searchable
              />
              {multiSelect.length > 0 && (
                <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p className="text-sm text-purple-800 dark:text-purple-200 mb-2">
                    Selected conditions:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {multiSelect.map(val => (
                      <span
                        key={val}
                        className="px-2 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200 rounded text-xs font-medium"
                      >
                        {medicalConditions.find(c => c.value === val)?.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Blood Type Dropdown */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Blood Type Selector
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Specialized dropdown for blood types
              </p>
              <Dropdown
                label="Blood Type"
                placeholder="Select your blood type"
                value={bloodTypeSelect}
                onChange={(value) => setBloodTypeSelect(value as string)}
                options={bloodTypes}
                required
              />
              {bloodTypeSelect && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <p className="text-sm text-red-800 dark:text-red-200">
                    Blood Type: <strong className="text-2xl">{bloodTypeSelect}</strong>
                  </p>
                </div>
              )}
            </div>

            {/* Disabled Dropdown Example */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Disabled State
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Dropdown in disabled state
              </p>
              <Dropdown
                label="Donation Frequency"
                placeholder="Please complete registration first"
                value=""
                onChange={() => {}}
                options={donationFrequency}
                disabled
              />
            </div>

            {/* Error State Dropdown */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Error State
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Dropdown with validation error
              </p>
              <Dropdown
                label="Required Field"
                placeholder="This field is required"
                value=""
                onChange={() => {}}
                options={bloodTypes}
                required
                error="Please select a blood type to continue"
              />
            </div>
          </div>
        </section>

        {/* Calendar Components Section */}
        <section>
          <div className="flex items-center space-x-3 mb-6">
            <CalendarIcon className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Custom Calendar Component
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Basic Calendar */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Basic Calendar
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Simple date picker with min/max dates
              </p>
              <Calendar
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                minDate={new Date()}
                maxDate={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)}
              />
              {selectedDate && (
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Selected: <strong>{selectedDate.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</strong>
                  </p>
                </div>
              )}
            </div>

            {/* Calendar with Time Slots */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Appointment Scheduler
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Calendar with time slot selection
              </p>
              <Calendar
                selectedDate={appointmentDate}
                onDateSelect={setAppointmentDate}
                minDate={new Date()}
                showTimeSlots={true}
                timeSlots={[
                  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
                  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
                ]}
                selectedTime={selectedTime}
                onTimeSelect={setSelectedTime}
              />
              {appointmentDate && selectedTime && (
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    Appointment: <strong>{appointmentDate.toLocaleDateString()}</strong> at <strong>{selectedTime}</strong>
                  </p>
                </div>
              )}
            </div>

            {/* Calendar with Available Dates */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Available Dates Only
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Only specific dates are selectable (Mon-Sat)
              </p>
              <Calendar
                selectedDate={eventDate}
                onDateSelect={setEventDate}
                availableDates={getAvailableDates()}
              />
              {eventDate && (
                <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p className="text-sm text-purple-800 dark:text-purple-200">
                    Event Date: <strong>{eventDate.toLocaleDateString()}</strong>
                  </p>
                </div>
              )}
            </div>

            {/* Calendar with Highlighted Dates */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Event Calendar
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Special dates highlighted with different colors
              </p>
              <Calendar
                selectedDate={new Date()}
                onDateSelect={() => {}}
                highlightedDates={highlightedDates}
                minDate={new Date()}
              />
              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="text-gray-700 dark:text-gray-300">Blood Drive Event</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-gray-700 dark:text-gray-300">World Blood Donor Day</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Tips */}
        <section className="mt-16 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl border border-purple-200 dark:border-purple-800 p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Component Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Dropdown Features
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>âœ… Single and multi-select modes</li>
                <li>âœ… Search/filter functionality</li>
                <li>âœ… Clear selection button</li>
                <li>âœ… Disabled state support</li>
                <li>âœ… Error state with messages</li>
                <li>âœ… Click outside to close</li>
                <li>âœ… Dark mode support</li>
                <li>âœ… Fully accessible</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Calendar Features
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>âœ… Date selection with constraints</li>
                <li>âœ… Time slot selection</li>
                <li>âœ… Available dates filtering</li>
                <li>âœ… Highlighted special dates</li>
                <li>âœ… Today indicator</li>
                <li>âœ… Month navigation</li>
                <li>âœ… Dark mode support</li>
                <li>âœ… Interactive legend</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}


