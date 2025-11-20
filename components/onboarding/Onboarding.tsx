'use client';

import { useState } from 'react';
import { ArrowRight, User, Phone, MapPin, Droplet, Calendar as CalendarIcon, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import Dropdown from '@/components/ui/Dropdown';
import Calendar from '@/components/ui/Calendar';

interface OnboardingProps {
  onComplete: (userData: any) => void;
  onDismiss?: () => void;
}

export default function Onboarding({ onComplete, onDismiss }: OnboardingProps) {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [showDobCalendar, setShowDobCalendar] = useState(false);
  const [showLastDonationCalendar, setShowLastDonationCalendar] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    phone: '',
    address: '',
    city: '',
    parish: '',
    dateOfBirth: '',
    bloodType: user?.bloodType || '',
    weight: '',
    lastDonation: '',
    medicalConditions: '',
    emergencyContact: '',
    emergencyPhone: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const parishes = [
    'Kingston', 'St. Andrew', 'St. Catherine', 'Clarendon', 'Manchester',
    'St. Elizabeth', 'Westmoreland', 'Hanover', 'St. James', 'Trelawny',
    'St. Ann', 'St. Mary', 'Portland', 'St. Thomas'
  ];

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\d{10,}$/.test(formData.phone.replace(/[-\s]/g, ''))) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }

    if (step === 1) {
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.parish) newErrors.parish = 'Parish is required';
    }

    if (step === 2) {
      if (!formData.dateOfBirth) {
        newErrors.dateOfBirth = 'Date of birth is required';
      } else {
        const age = new Date().getFullYear() - new Date(formData.dateOfBirth).getFullYear();
        if (age < 17) newErrors.dateOfBirth = 'You must be at least 17 years old';
      }
      if (!formData.bloodType) newErrors.bloodType = 'Blood type is required';
      if (!formData.weight.trim()) {
        newErrors.weight = 'Weight is required';
      } else if (parseInt(formData.weight) < 50) {
        newErrors.weight = 'You must weigh at least 50 kg to donate';
      }
    }

    if (step === 3) {
      if (!formData.emergencyContact.trim()) newErrors.emergencyContact = 'Emergency contact name is required';
      if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = 'Emergency contact phone is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      } else {
        toast.success('Profile completed successfully!');
        onComplete(formData);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name *</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white ${errors.fullName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                placeholder="John Doe" />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number *</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white ${errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                placeholder="876-123-4567" />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Street Address *</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white ${errors.address ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                placeholder="123 Main Street" />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">City *</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white ${errors.city ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                  placeholder="Kingston" />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>
              <div>
                <Dropdown
                  label="Parish"
                  placeholder="Select your parish"
                  required
                  searchable
                  value={formData.parish}
                  onChange={(value) => {
                    setFormData(prev => ({ ...prev, parish: value as string }));
                    if (errors.parish) {
                      setErrors(prev => ({ ...prev, parish: '' }));
                    }
                  }}
                  options={parishes.map(p => ({ value: p, label: p }))}
                  error={errors.parish}
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date of Birth *</label>
                <button
                  type="button"
                  onClick={() => setShowDobCalendar(!showDobCalendar)}
                  className={`w-full px-4 py-2 border-2 rounded-lg text-left flex items-center justify-between bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white cursor-pointer ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'}`}
                >
                  <span>{formData.dateOfBirth || 'Select date'}</span>
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </button>
                {showDobCalendar && (
                  <Calendar
                    isPopup={true}
                    selectedDate={formData.dateOfBirth ? new Date(formData.dateOfBirth) : undefined}
                    onDateSelect={(date) => {
                      setFormData(prev => ({ ...prev, dateOfBirth: date.toISOString().split('T')[0] }));
                      setShowDobCalendar(false);
                      if (errors.dateOfBirth) {
                        setErrors(prev => ({ ...prev, dateOfBirth: '' }));
                      }
                    }}
                    onClose={() => setShowDobCalendar(false)}
                    maxDate={new Date()}
                  />
                )}
                {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
              </div>
              <div>
                <Dropdown
                  label="Blood Type"
                  placeholder="Select your blood type"
                  required
                  value={formData.bloodType}
                  onChange={(value) => {
                    setFormData(prev => ({ ...prev, bloodType: value as string }));
                    if (errors.bloodType) {
                      setErrors(prev => ({ ...prev, bloodType: '' }));
                    }
                  }}
                  options={bloodTypes.map(t => ({ value: t, label: t }))}
                  error={errors.bloodType}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Weight (kg) *</label>
              <input 
                type="number" 
                name="weight" 
                value={formData.weight} 
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white ${errors.weight ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                placeholder="70" 
                min="50" 
              />
              {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Donation Date (Optional)</label>
              <button
                type="button"
                onClick={() => setShowLastDonationCalendar(!showLastDonationCalendar)}
                className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 rounded-lg text-left flex items-center justify-between bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white cursor-pointer"
              >
                <span>{formData.lastDonation || 'Select date (optional)'}</span>
                <CalendarIcon className="h-5 w-5 text-gray-400" />
              </button>
              {showLastDonationCalendar && (
                <Calendar
                  isPopup={true}
                  selectedDate={formData.lastDonation ? new Date(formData.lastDonation) : undefined}
                  onDateSelect={(date) => {
                    setFormData(prev => ({ ...prev, lastDonation: date.toISOString().split('T')[0] }));
                    setShowLastDonationCalendar(false);
                  }}
                  onClose={() => setShowLastDonationCalendar(false)}
                  maxDate={new Date()}
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Medical Conditions (Optional)</label>
              <textarea 
                name="medicalConditions" 
                value={formData.medicalConditions} 
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                rows={3} 
                placeholder="List any medical conditions or medications..." 
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Emergency Contact Name *</label>
              <input type="text" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white ${errors.emergencyContact ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                placeholder="Jane Doe" />
              {errors.emergencyContact && <p className="text-red-500 text-sm mt-1">{errors.emergencyContact}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Emergency Contact Phone *</label>
              <input type="tel" name="emergencyPhone" value={formData.emergencyPhone} onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white ${errors.emergencyPhone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                placeholder="876-123-4567" />
              {errors.emergencyPhone && <p className="text-red-500 text-sm mt-1">{errors.emergencyPhone}</p>}
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-6">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Almost done!</strong> This information will help us provide better service and contact you in case of emergencies.
              </p>
            </div>
          </div>
        );
    }
  };

  const stepTitles = ['Personal Information', 'Address Details', 'Medical Information', 'Emergency Contact'];
  const stepIcons = [User, MapPin, Droplet, Phone];
  const StepIcon = stepIcons[currentStep];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="sticky top-0 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between animate-slide-down">
          <div className="flex items-center space-x-3">
            <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg">
              <StepIcon className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">{stepTitles[currentStep]}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Step {currentStep + 1} of 4</p>
            </div>
          </div>
          <div>
            <button
              type="button"
              aria-label="Close onboarding"
              title="Close"
              onClick={() => {
                if (onDismiss) onDismiss();
              }}
              className="p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="px-6 pt-4">
          <div className="flex items-center space-x-2">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className={`h-2 flex-1 rounded-full transition-all duration-300 ${i <= currentStep ? 'bg-red-600' : 'bg-gray-200 dark:bg-gray-700'} animate-fade-in-up`} style={{animationDelay: `${i*60}ms`}} />
            ))}
          </div>
        </div>
        <div className="px-6 py-6 animate-fade-in-up" style={{animationDelay: '120ms'}}>{renderStep()}</div>
        <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
          <button onClick={handleBack} disabled={currentStep === 0}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${currentStep === 0 ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}>
            Back
          </button>
          <button onClick={handleNext}
            className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center space-x-2">
            <span>{currentStep === 3 ? 'Complete' : 'Next'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
