'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Droplet,
  Edit3,
  Save,
  X,
  Heart,
  Shield,
  Clock,
  Activity,
  Camera,
  Award,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import toast from 'react-hot-toast';
import Dropdown from '@/components/ui/Dropdown';
import { useAuth } from '@/context/AuthContext';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPersonalHidden, setIsPersonalHidden] = useState(false);
  const [profileImage, setProfileImage] = useState<string>(user?.profileImage || '/default-avatar.jpg');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // User data from auth context
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bloodType: '',
    dateOfBirth: '',
    address: user?.address?.street || '',
    weight: '',
    medicalConditions: '',
    emergencyContact: '',
    emergencyName: ''
  });

  // Update form data when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || '',
        bloodType: '',
        dateOfBirth: '',
        address: user.address?.street || '',
        weight: '',
        medicalConditions: '',
        emergencyContact: '',
        emergencyName: ''
      });
      setProfileImage(user.profileImage || '/default-avatar.jpg');
    }
  }, [user]);

  const stats = {
    totalDonations: 5,
    totalRequests: 2,
    lastDonation: '2024-09-15',
    memberSince: '2023-01-01',
    livesImpacted: 15,
    achievements: 3
  };

  const donationHistory = [
    { id: 1, date: '2024-09-15', location: 'Kingston Blood Center', units: 1, type: 'Whole Blood' },
    { id: 2, date: '2024-07-20', location: 'Spanish Town Hospital', units: 1, type: 'Whole Blood' },
    { id: 3, date: '2024-05-10', location: 'Kingston Blood Center', units: 1, type: 'Platelets' },
    { id: 4, date: '2024-03-05', location: 'Montego Bay Center', units: 1, type: 'Whole Blood' },
    { id: 5, date: '2024-01-15', location: 'Kingston Blood Center', units: 1, type: 'Whole Blood' },
  ];

  const achievements = [
    { id: 1, title: 'First Donation', icon: Heart, color: 'bg-red-100 text-red-600 dark:bg-red-900/30', earned: true },
    { id: 2, title: '5 Donations', icon: Award, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30', earned: true },
    { id: 3, title: 'Life Saver', icon: Shield, color: 'bg-green-100 text-green-600 dark:bg-green-900/30', earned: true },
    { id: 4, title: '10 Donations', icon: TrendingUp, color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30', earned: false },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image must be less than 5MB');
        return;
      }

      // Get user ID from auth context
      const userId = user?._id;
      if (!userId) {
        toast.error('User not found. Please login again.');
        return;
      }
      
      const uploadFormData = new FormData();
      uploadFormData.append('image', file);
      uploadFormData.append('userId', userId);

      try {
        const response = await fetch('/api/user/upload-image', {
          method: 'POST',
          body: uploadFormData,
        });

        const data = await response.json();

        if (data.success) {
          setProfileImage(data.data.imageUrl);
          updateUser({ profileImage: data.data.imageUrl });
          toast.success('Profile picture uploaded successfully!');
        } else {
          toast.error(data.message || 'Failed to upload image');
        }
      } catch (error) {
        console.error('Upload error:', error);
        toast.error('Failed to upload image');
      }
    }
  };

  const getRoleBadgeColor = () => {
    return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateNextEligible = (lastDonation: string) => {
    const lastDate = new Date(lastDonation);
    const nextDate = new Date(lastDate.getTime() + (56 * 24 * 60 * 60 * 1000)); // 56 days
    return nextDate > new Date() ? nextDate : null;
  };

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const nextEligible = calculateNextEligible(stats.lastDonation);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto container-app">
        {/* Header with Profile Picture */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg relative">
                {profileImage ? (
                  <Image
                    src={profileImage}
                    alt="Profile"
                    fill
                    sizes="128px"
                    className="object-cover"
                    onError={() => setProfileImage('/default-avatar.jpg')}
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <User className="h-16 w-16 text-red-600" />
                  </div>
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-all duration-200 group-hover:scale-110 cursor-pointer"
              >
                <Camera className="h-4 w-4" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor()}`}>
                donor
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-6">
            {formData.fullName}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your account information and view your activity
          </p>
          
          {/* Quick Stats Bar */}
          <div className="flex justify-center gap-6 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{stats.totalDonations}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Donations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.livesImpacted}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Lives Saved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.achievements}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Achievements</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Profile Information
                </h2>
                <div className="flex items-center gap-4">
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors cursor-pointer"
                    >
                      <Edit3 className="h-4 w-4" />
                      <span className="text-sm font-medium">Edit</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleCancel}
                      className="flex items-center space-x-1 text-gray-600 hover:text-gray-700 transition-colors cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                      <span className="text-sm">Cancel</span>
                    </button>
                  )}
                  <button
                    aria-label="Close personal info"
                    onClick={() => { setIsPersonalHidden(!isPersonalHidden); if (isEditing) setIsEditing(false); }}
                    className="p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    title={isPersonalHidden ? 'Show' : 'Hide'}
                    type="button"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {!isPersonalHidden && (
              <form onSubmit={onSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <User className="inline h-4 w-4 mr-1" />
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    ) : (
                      <p className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white">
                        {formData.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email (read-only) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Mail className="inline h-4 w-4 mr-1" />
                      Email Address
                    </label>
                    <p className="px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400">
                      {formData.email}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Phone className="inline h-4 w-4 mr-1" />
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    ) : (
                      <p className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white">
                        {formData.phone}
                      </p>
                    )}
                  </div>

                  {/* Blood Type */}
                  <div>
                    {isEditing ? (
                      <Dropdown
                        label="Blood Type"
                        placeholder="Select blood type"
                        value={formData.bloodType}
                        onChange={(value) => setFormData(prev => ({ ...prev, bloodType: value as string }))}
                        options={bloodTypes.map((type) => ({ value: type, label: type }))}
                      />
                    ) : (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          <Droplet className="inline h-4 w-4 mr-1" />
                          Blood Type
                        </label>
                        <p className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white">
                          {formData.bloodType}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Calendar className="inline h-4 w-4 mr-1" />
                      Date of Birth
                    </label>
                    {isEditing ? (
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        max={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white cursor-pointer"
                      />
                    ) : (
                      <p className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white">
                        {formatDate(formData.dateOfBirth)}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <MapPin className="inline h-4 w-4 mr-1" />
                      Address
                    </label>
                    {isEditing ? (
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Enter your address"
                      />
                    ) : (
                      <p className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white">
                        {formData.address}
                      </p>
                    )}
                  </div>

                  {/* Weight */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Weight (lbs)
                    </label>
                    {isEditing ? (
                      <input
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    ) : (
                      <p className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white">
                        {formData.weight} lbs
                      </p>
                    )}
                  </div>

                  {/* Medical Conditions */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Medical Conditions
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="medicalConditions"
                        value={formData.medicalConditions}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="None"
                      />
                    ) : (
                      <p className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white">
                        {formData.medicalConditions}
                      </p>
                    )}
                  </div>

                  {/* Emergency Contact Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Emergency Contact Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="emergencyName"
                        value={formData.emergencyName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    ) : (
                      <p className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white">
                        {formData.emergencyName}
                      </p>
                    )}
                  </div>

                  {/* Emergency Contact Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Emergency Contact Phone
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    ) : (
                      <p className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white">
                        {formData.emergencyContact}
                      </p>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-6 flex justify-end">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center space-x-2 cursor-pointer"
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                      <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                  </div>
                )}
              </form>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-red-500" />
                Activity Stats
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Donations</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{stats.totalDonations}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Last Donation</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatDate(stats.lastDonation)}
                  </span>
                </div>
                {nextEligible && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-yellow-500 mr-2" />
                      <div>
                        <p className="text-xs text-yellow-700 dark:text-yellow-400">Next eligible to donate</p>
                        <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                          {formatDate(nextEligible.toISOString())}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Member Since</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatDate(stats.memberSince)}
                  </span>
                </div>
              </div>
            </div>

            {/* Role Information */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-blue-500" />
                Role & Permissions
              </h3>
              <div className="space-y-3">
                <div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRoleBadgeColor()}`}>
                    Donor
                  </span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Can schedule appointments and donate blood
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Award className="h-5 w-5 mr-2 text-yellow-500" />
                Achievements
              </h3>
              <div className="space-y-3">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <div
                      key={achievement.id}
                      className={`flex items-center space-x-3 p-3 rounded-lg ${
                        achievement.earned
                          ? 'bg-gray-50 dark:bg-gray-700'
                          : 'bg-gray-100 dark:bg-gray-800 opacity-50'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${achievement.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {achievement.title}
                        </div>
                      </div>
                      {achievement.earned && (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Donation History */}
        <div className="mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <Clock className="h-6 w-6 mr-2 text-red-500" />
                Donation History
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {donationHistory.map((donation, index) => (
                  <div
                    key={donation.id}
                    className="flex items-start space-x-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                        <Droplet className="h-6 w-6 text-red-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {donation.type}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {donation.location}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            {formatDate(donation.date)}
                          </p>
                        </div>
                        <div className="ml-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
                            {donation.units} Unit{donation.units > 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    </div>
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


