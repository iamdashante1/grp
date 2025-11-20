'use client';

import { useState } from 'react';
import { AlertCircle, Droplet, User, Phone, MapPin, Clock, Heart } from 'lucide-react';
import toast from 'react-hot-toast';
import Dropdown from '@/components/ui/Dropdown';
import { useI18n } from '@/components/providers/I18nProvider';
import Button from '@/components/ui/Button';

export default function RequestPage() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    patientName: '',
    bloodType: '',
    unitsNeeded: '1',
    urgency: 'routine',
    hospital: '',
    contactName: '',
    contactPhone: '',
    reason: '',
    additionalNotes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const urgencyLevels = [
    { value: 'emergency', label: 'Emergency (Within 24 hours)', color: 'text-red-600' },
    { value: 'urgent', label: 'Urgent (Within 48 hours)', color: 'text-orange-600' },
    { value: 'routine', label: 'Routine (Scheduled)', color: 'text-blue-600' }
  ];

  const hospitals = [
    'University Hospital of the West Indies',
    'Kingston Public Hospital',
    'Spanish Town Hospital',
    'Mandeville Regional Hospital',
    'Cornwall Regional Hospital',
    'Bustamante Hospital for Children',
    'National Chest Hospital',
    'Other'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.patientName.trim()) newErrors.patientName = t('request.errors.patientNameRequired');
    if (!formData.bloodType) newErrors.bloodType = t('request.errors.bloodTypeRequired');
    if (!formData.unitsNeeded || parseInt(formData.unitsNeeded) < 1) {
      newErrors.unitsNeeded = t('request.errors.unitsNeeded');
    }
    if (!formData.hospital) newErrors.hospital = t('request.errors.hospitalRequired');
    if (!formData.contactName.trim()) newErrors.contactName = t('request.errors.contactNameRequired');
    if (!formData.contactPhone.trim()) {
      newErrors.contactPhone = t('request.errors.contactPhoneRequired');
    } else if (!/^\d{10,}$/.test(formData.contactPhone.replace(/[-\s]/g, ''))) {
      newErrors.contactPhone = t('request.errors.contactPhoneInvalid');
    }
    if (!formData.reason.trim()) newErrors.reason = t('request.errors.reasonRequired');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      toast.success(t('request.toast.success'));
      console.log('Request submitted:', formData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto container-app">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full">
              <Droplet className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('request.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('request.subtitle')}
          </p>
        </div>

        {/* Emergency Banner */}
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                {t('request.emergency.title')}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                {t('request.emergency.subtitle')}
              </p>
              <p className="text-lg font-bold text-red-600">
                +1 (876) BLOOD-911 (256-6391)
              </p>
            </div>
          </div>
        </div>

        {/* Request Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Patient Information */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Patient Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                      errors.patientName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.patientName && (
                    <p className="text-red-500 text-sm mt-1">{errors.patientName}</p>
                  )}
                </div>

                <div>
                  <Dropdown
                    label="Blood Type Needed"
                    placeholder="Select blood type"
                    required
                    value={formData.bloodType}
                    onChange={(value) => {
                      setFormData(prev => ({ ...prev, bloodType: value as string }));
                      if (errors.bloodType) {
                        setErrors(prev => ({ ...prev, bloodType: '' }));
                      }
                    }}
                    options={bloodTypes.map(type => ({
                      value: type,
                      label: type
                    }))}
                    error={errors.bloodType}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Units Needed *
                  </label>
                  <input
                    type="number"
                    name="unitsNeeded"
                    value={formData.unitsNeeded}
                    onChange={handleChange}
                    min="1"
                    className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                      errors.unitsNeeded ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  {errors.unitsNeeded && (
                    <p className="text-red-500 text-sm mt-1">{errors.unitsNeeded}</p>
                  )}
                </div>

                <div>
                  <Dropdown
                    label="Urgency Level"
                    placeholder="Select urgency level"
                    required
                    value={formData.urgency}
                    onChange={(value) => setFormData(prev => ({ ...prev, urgency: value as string }))}
                    options={urgencyLevels.map(level => ({
                      value: level.value,
                      label: level.label
                    }))}
                  />
                </div>
              </div>
            </div>

            {/* Hospital Information */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Hospital/Facility Information
              </h2>
              <Dropdown
                label="Hospital/Medical Facility"
                placeholder="Select hospital or facility"
                required
                searchable
                value={formData.hospital}
                onChange={(value) => {
                  setFormData(prev => ({ ...prev, hospital: value as string }));
                  if (errors.hospital) {
                    setErrors(prev => ({ ...prev, hospital: '' }));
                  }
                }}
                options={hospitals.map(hospital => ({
                  value: hospital,
                  label: hospital
                }))}
                error={errors.hospital}
              />
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                      errors.contactName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Jane Smith"
                  />
                  {errors.contactName && (
                    <p className="text-red-500 text-sm mt-1">{errors.contactName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                      errors.contactPhone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="876-123-4567"
                  />
                  {errors.contactPhone && (
                    <p className="text-red-500 text-sm mt-1">{errors.contactPhone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Heart className="h-5 w-5 mr-2" />
                Request Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Reason for Blood Request *
                  </label>
                  <input
                    type="text"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                      errors.reason ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="e.g., Surgery, Accident, Medical condition"
                  />
                  {errors.reason && (
                    <p className="text-red-500 text-sm mt-1">{errors.reason}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Any additional information that might be helpful..."
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                * Required fields
              </p>
              <Button type="submit">
                <Droplet className="h-5 w-5 mr-2" />
                <span>{t('request.submit')}</span>
              </Button>
            </div>
          </form>
        </div>

        {/* Information Box */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <Clock className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                What Happens Next?
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>â€¢ We'll review your request immediately</li>
                <li>â€¢ Our team will match available donors with your requirements</li>
                <li>â€¢ You'll receive a confirmation call within 2 hours</li>
                <li>â€¢ For emergencies, blood can be arranged within 24 hours</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


