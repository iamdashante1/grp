'use client';

import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AlertCircle, Droplet, User, Phone, MapPin, Clock, Heart, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import Dropdown from '@/components/ui/Dropdown';
import { useI18n } from '@/components/providers/I18nProvider';
import Button from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';

interface HospitalOption {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    state?: string;
    zipCode?: string;
  };
  contactPerson: string;
  phone: string;
  email: string;
}

interface RequestFormValues {
  patientName: string;
  bloodType: string;
  unitsNeeded: number;
  urgency: 'routine' | 'urgent' | 'emergency';
  hospital: string;
  customHospitalName: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  reason: string;
  requiredBy: string;
  additionalNotes: string;
}

const hospitals: HospitalOption[] = [
  {
    id: 'nbts',
    name: 'National Blood Transfusion Service',
    address: { street: '1 Devon Road', city: 'Kingston 10' },
    contactPerson: 'Central Dispatch',
    phone: '+1 (876) 967-3524',
    email: 'dispatch@bloodbridge.jm',
  },
  {
    id: 'uhwi',
    name: 'University Hospital of the West Indies',
    address: { street: 'Golding Avenue', city: 'Kingston 7' },
    contactPerson: 'Hospital Liaison',
    phone: '+1 (876) 927-1620',
    email: 'uhwi.requests@bloodbridge.jm',
  },
  {
    id: 'kph',
    name: 'Kingston Public Hospital',
    address: { street: '6 North Street', city: 'Kingston' },
    contactPerson: 'Emergency Desk',
    phone: '+1 (876) 922-0210',
    email: 'kph.requests@bloodbridge.jm',
  },
  {
    id: 'sth',
    name: 'Spanish Town Hospital',
    address: { street: 'Burke Road', city: 'Spanish Town' },
    contactPerson: 'Blood Bank Office',
    phone: '+1 (876) 984-2201',
    email: 'sth.requests@bloodbridge.jm',
  },
  {
    id: 'other',
    name: 'Other',
    address: { street: '', city: '' },
    contactPerson: '',
    phone: '',
    email: '',
  },
];

const urgencyLevels = [
  { value: 'emergency', label: 'Emergency (Within 24 hours)', color: 'text-red-600' },
  { value: 'urgent', label: 'Urgent (Within 48 hours)', color: 'text-orange-600' },
  { value: 'routine', label: 'Routine (Scheduled)', color: 'text-blue-600' }
];

const reasonOptions = [
  { value: 'surgery', label: 'Surgery' },
  { value: 'trauma', label: 'Trauma / Accident' },
  { value: 'cancer_treatment', label: 'Cancer Treatment' },
  { value: 'chronic_anemia', label: 'Chronic Anemia' },
  { value: 'childbirth', label: 'Childbirth / Maternal' },
  { value: 'organ_transplant', label: 'Organ Transplant' },
  { value: 'emergency', label: 'General Emergency' },
  { value: 'other', label: 'Other' }
];

export default function RequestPage() {
  const { t } = useI18n();
  const { user } = useAuth();

  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    setValue,
    getValues,
    formState: { errors, isSubmitting }
  } = useForm<RequestFormValues>({
    defaultValues: {
      patientName: '',
      bloodType: '',
      unitsNeeded: 1,
      urgency: 'routine',
      hospital: '',
      customHospitalName: '',
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      reason: '',
      requiredBy: '',
      additionalNotes: ''
    }
  });

  const selectedHospitalId = watch('hospital');
  const unitsNeeded = watch('unitsNeeded') || 0;
  const requiredBy = watch('requiredBy');
  const selectedUrgency = watch('urgency');

  const selectedHospital = useMemo(
    () => hospitals.find((hospital) => hospital.id === selectedHospitalId),
    [selectedHospitalId]
  );

  useEffect(() => {
    if (!user) return;
    const currentValues = getValues();
    if (!currentValues.contactName) {
      setValue('contactName', user.fullName || user.name || '', { shouldValidate: false });
    }
    if (!currentValues.contactPhone && user.phone) {
      setValue('contactPhone', user.phone, { shouldValidate: false });
    }
    if (!currentValues.contactEmail && user.email) {
      setValue('contactEmail', user.email, { shouldValidate: false });
    }
  }, [user, getValues, setValue]);

  useEffect(() => {
    if (!selectedHospital || selectedHospital.id === 'other') return;
    setValue('customHospitalName', selectedHospital.name, { shouldValidate: false });
    setValue('contactName', selectedHospital.contactPerson, { shouldValidate: false });
    setValue('contactPhone', selectedHospital.phone, { shouldValidate: false });
    setValue('contactEmail', selectedHospital.email, { shouldValidate: false });
  }, [selectedHospital, setValue]);

  const onSubmit = handleSubmit(async (values) => {
    try {
      const hospitalDetails = selectedHospital?.id === 'other'
        ? {
            name: values.customHospitalName,
            address: { street: values.customHospitalName, city: '', state: '', zipCode: '' },
          }
        : {
            name: selectedHospital?.name,
            address: selectedHospital?.address,
          };

      if (!hospitalDetails?.name) {
        toast.error(t('request.errors.hospitalRequired'));
        return;
      }

      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientName: values.patientName,
          bloodType: values.bloodType,
          unitsNeeded: Number(values.unitsNeeded),
          urgency: values.urgency,
          hospitalName: hospitalDetails.name,
          hospitalAddress: hospitalDetails.address,
          contactName: values.contactName,
          contactPhone: values.contactPhone,
          contactEmail: values.contactEmail,
          reason: values.reason,
          additionalNotes: values.additionalNotes,
          requiredBy: values.requiredBy,
          userId: user?._id,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || t('request.toast.failed'));
      }

      toast.success(`${t('request.toast.success')} Ref: ${data.data.requestId}`);
      reset({
        patientName: '',
        bloodType: '',
        unitsNeeded: 1,
        urgency: 'routine',
        hospital: '',
        customHospitalName: '',
        contactName: user?.fullName || user?.name || '',
        contactPhone: user?.phone || '',
        contactEmail: user?.email || '',
        reason: '',
        requiredBy: '',
        additionalNotes: ''
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : t('request.toast.failed');
      toast.error(message);
    }
  });

  const isCustomHospital = selectedHospitalId === 'other';
  const estimatedVolume = Math.max(1, Number(unitsNeeded) || 0) * 450;

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
          <form onSubmit={onSubmit} className="space-y-6">
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
                    {...register('patientName', { required: t('request.errors.patientNameRequired') })}
                    className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                      errors.patientName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.patientName && (
                    <p className="text-red-500 text-sm mt-1">{errors.patientName.message}</p>
                  )}
                </div>

                <div>
                  <Controller
                    name="bloodType"
                    control={control}
                    rules={{ required: t('request.errors.bloodTypeRequired') }}
                    render={({ field }) => (
                      <Dropdown
                        label="Blood Type Needed"
                        placeholder="Select blood type"
                        required
                        value={field.value}
                        onChange={(value) => field.onChange(value as string)}
                        options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((type) => ({
                          value: type,
                          label: type,
                        }))}
                        error={errors.bloodType?.message}
                      />
                    )}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Units Needed *
                  </label>
                  <input
                    type="number"
                    min={1}
                    {...register('unitsNeeded', {
                      valueAsNumber: true,
                      min: { value: 1, message: t('request.errors.unitsNeeded') },
                      required: t('request.errors.unitsNeeded'),
                    })}
                    className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                      errors.unitsNeeded ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  {errors.unitsNeeded && (
                    <p className="text-red-500 text-sm mt-1">{errors.unitsNeeded.message}</p>
                  )}
                </div>

                <div>
                  <Controller
                    name="urgency"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Dropdown
                        label="Urgency Level"
                        placeholder="Select urgency level"
                        required
                        value={field.value}
                        onChange={(value) => field.onChange(value as string)}
                        options={urgencyLevels.map((level) => ({ value: level.value, label: level.label }))}
                      />
                    )}
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
              <Controller
                name="hospital"
                control={control}
                rules={{ required: t('request.errors.hospitalRequired') }}
                render={({ field }) => (
                  <Dropdown
                    label="Hospital/Medical Facility"
                    placeholder="Select hospital or facility"
                    required
                    searchable
                    value={field.value}
                    onChange={(value) => field.onChange(value as string)}
                    options={hospitals.map((hospital) => ({
                      value: hospital.id,
                      label: hospital.id === 'other'
                        ? 'Other (not listed)'
                        : `${hospital.name} - ${hospital.address.city}`,
                    }))}
                    error={errors.hospital?.message}
                  />
                )}
              />

              {isCustomHospital && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('request.form.customHospitalLabel')} *
                  </label>
                  <input
                    type="text"
                    {...register('customHospitalName', {
                      required: t('request.errors.hospitalRequired'),
                    })}
                    className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                      errors.customHospitalName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder={t('request.form.customHospitalPlaceholder')}
                  />
                  {errors.customHospitalName && (
                    <p className="text-red-500 text-sm mt-1">{errors.customHospitalName.message}</p>
                  )}
                </div>
              )}
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
                    {...register('contactName', { required: t('request.errors.contactNameRequired') })}
                    className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                      errors.contactName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Jane Smith"
                  />
                  {errors.contactName && (
                    <p className="text-red-500 text-sm mt-1">{errors.contactName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    {...register('contactPhone', {
                      required: t('request.errors.contactPhoneRequired'),
                      pattern: {
                        value: /^\+?[0-9\-\s]{7,}$/,
                        message: t('request.errors.contactPhoneInvalid'),
                      },
                    })}
                    className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                      errors.contactPhone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="876-123-4567"
                  />
                  {errors.contactPhone && (
                    <p className="text-red-500 text-sm mt-1">{errors.contactPhone.message}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('request.form.contactEmail')} *
                  </label>
                  <input
                    type="email"
                    {...register('contactEmail', {
                      required: t('request.errors.contactEmailRequired'),
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: t('request.errors.contactEmailInvalid'),
                      },
                    })}
                    className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                      errors.contactEmail ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="contact@hospital.com"
                  />
                  {errors.contactEmail && (
                    <p className="text-red-500 text-sm mt-1">{errors.contactEmail.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Request Details */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Heart className="h-5 w-5 mr-2" />
                Request Details
              </h2>
              <div className="space-y-4">
                <Controller
                  name="reason"
                  control={control}
                  rules={{ required: t('request.errors.reasonRequired') }}
                  render={({ field }) => (
                    <Dropdown
                      label={t('request.form.reasonLabel')}
                      placeholder={t('request.form.reasonPlaceholder')}
                      required
                      value={field.value}
                      onChange={(value) => field.onChange(value as string)}
                      options={reasonOptions.map((reason) => ({ value: reason.value, label: reason.label }))}
                      error={errors.reason?.message}
                    />
                  )}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('request.form.requiredBy')} *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      {...register('requiredBy', { required: t('request.errors.requiredBy') })}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                        errors.requiredBy ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  {errors.requiredBy && (
                    <p className="text-red-500 text-sm mt-1">{errors.requiredBy.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    {...register('additionalNotes')}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Any additional information that might be helpful..."
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('request.form.summaryTitle')}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {t('request.form.summaryVolume', { units: Math.max(1, Number(unitsNeeded) || 0), volume: estimatedVolume })}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {t('request.form.summaryUrgency', { urgency: urgencyLevels.find((u) => u.value === selectedUrgency)?.label || selectedUrgency })}
                </p>
                {requiredBy && (
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {t('request.form.summaryDeadline', { date: new Date(requiredBy).toLocaleDateString() })}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  <Droplet className="h-5 w-5 mr-2" />
                  <span>{isSubmitting ? t('request.submitting') : t('request.submit')}</span>
                </Button>
              </div>
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
                <li>&bull; We&apos;ll review your request immediately</li>
                <li>&bull; Our team will match available donors with your requirements</li>
                <li>&bull; You&apos;ll receive a confirmation call within 2 hours</li>
                <li>&bull; For emergencies, blood can be arranged within 24 hours</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
