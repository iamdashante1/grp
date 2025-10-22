
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Onboarding from '@/components/onboarding/Onboarding';

export default function Register() {
  const router = useRouter();
  const { register } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = async (formData: any) => {
    setIsLoading(true);
    try {
      await register({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: 'donor',
        address: formData.address,
        city: formData.city,
        parish: formData.parish,
        dateOfBirth: formData.dateOfBirth,
        bloodType: formData.bloodType,
        weight: formData.weight,
        lastDonation: formData.lastDonation,
        medicalConditions: formData.medicalConditions,
        emergencyContact: formData.emergencyContact,
        emergencyPhone: formData.emergencyPhone
      });
      router.push('/dashboard');
    } catch (error) {
      // Error handled in AuthContext
    } finally {
      setIsLoading(false);
      setShowOnboarding(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      {showOnboarding && (
        <Onboarding onComplete={handleComplete} />
      )}
      {!showOnboarding && (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Registration Complete!</h2>
          <p className="text-gray-600 dark:text-gray-400">Redirecting to dashboard...</p>
        </div>
      )}
    </div>
  );
}
