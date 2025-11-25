'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { 
  Search, 
  Filter, 
  MapPin, 
  Droplet, 
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingDown,
  TrendingUp
} from 'lucide-react';
import Dropdown from '@/components/ui/Dropdown';
import { useI18n } from '@/components/providers/I18nProvider';

const getBloodTypeColor = (bloodType: string) => {
  const colors: Record<string, string> = {
    'O+': 'border-blue-500 text-blue-700 dark:text-blue-400',
    'O-': 'border-blue-600 text-blue-800 dark:text-blue-300',
    'A+': 'border-green-500 text-green-700 dark:text-green-400',
    'A-': 'border-green-600 text-green-800 dark:text-green-300',
    'B+': 'border-purple-500 text-purple-700 dark:text-purple-400',
    'B-': 'border-purple-600 text-purple-800 dark:text-purple-300',
    'AB+': 'border-red-500 text-red-700 dark:text-red-400',
    'AB-': 'border-red-600 text-red-800 dark:text-red-300',
  };
  return colors[bloodType] || 'border-gray-500 text-gray-700 dark:text-gray-400';
};

const getStockStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    critical: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-200 dark:border-red-800',
    low: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-200 dark:border-yellow-800',
    adequate: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:border-blue-800',
    optimal: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-200 dark:border-green-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
};

interface BloodStock {
  bloodType: string;
  totalUnits: number;
  availableUnits: number;
  reservedUnits: number;
  stockStatus: string;
  lastUpdated: string;
  expiryWarning: boolean;
  trend: string;
}

export default function BloodAvailability() {
  const { t } = useI18n();
  const [bloodStock, setBloodStock] = useState<BloodStock[]>([]);
  const [filteredStock, setFilteredStock] = useState<BloodStock[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockData: BloodStock[] = [
      {
        bloodType: 'O+',
        totalUnits: 45,
        availableUnits: 38,
        reservedUnits: 7,
        stockStatus: 'optimal',
        lastUpdated: '2024-10-09T10:30:00Z',
        expiryWarning: false,
        trend: 'up'
      },
      {
        bloodType: 'O-',
        totalUnits: 23,
        availableUnits: 8,
        reservedUnits: 15,
        stockStatus: 'low',
        lastUpdated: '2024-10-09T09:15:00Z',
        expiryWarning: true,
        trend: 'down'
      },
      {
        bloodType: 'A+',
        totalUnits: 32,
        availableUnits: 28,
        reservedUnits: 4,
        stockStatus: 'adequate',
        lastUpdated: '2024-10-09T11:00:00Z',
        expiryWarning: false,
        trend: 'up'
      },
      {
        bloodType: 'A-',
        totalUnits: 18,
        availableUnits: 12,
        reservedUnits: 6,
        stockStatus: 'adequate',
        lastUpdated: '2024-10-09T08:45:00Z',
        expiryWarning: false,
        trend: 'stable'
      },
      {
        bloodType: 'B+',
        totalUnits: 25,
        availableUnits: 20,
        reservedUnits: 5,
        stockStatus: 'adequate',
        lastUpdated: '2024-10-09T10:00:00Z',
        expiryWarning: false,
        trend: 'up'
      },
      {
        bloodType: 'B-',
        totalUnits: 12,
        availableUnits: 3,
        reservedUnits: 9,
        stockStatus: 'critical',
        lastUpdated: '2024-10-09T07:30:00Z',
        expiryWarning: true,
        trend: 'down'
      },
      {
        bloodType: 'AB+',
        totalUnits: 15,
        availableUnits: 12,
        reservedUnits: 3,
        stockStatus: 'adequate',
        lastUpdated: '2024-10-09T09:30:00Z',
        expiryWarning: false,
        trend: 'stable'
      },
      {
        bloodType: 'AB-',
        totalUnits: 8,
        availableUnits: 2,
        reservedUnits: 6,
        stockStatus: 'critical',
        lastUpdated: '2024-10-09T08:00:00Z',
        expiryWarning: true,
        trend: 'down'
      }
    ];

    setTimeout(() => {
      setBloodStock(mockData);
      setFilteredStock(mockData);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = bloodStock;

    if (searchTerm) {
      filtered = filtered.filter(stock =>
        stock.bloodType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(stock => stock.stockStatus === filterStatus);
    }

    setFilteredStock(filtered);
  }, [searchTerm, filterStatus, bloodStock]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'low':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'adequate':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'optimal':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
    }
  };

  const getProgressBarColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'bg-red-500';
      case 'low':
        return 'bg-yellow-500';
      case 'adequate':
        return 'bg-blue-500';
      case 'optimal':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading blood availability...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container-app">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('blood.title')}</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">{t('blood.subtitle')}</p>
            </div>
            <Button onClick={refreshData} size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              <span>{t('common.refresh')}</span>
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('blood.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <Dropdown
              placeholder={t('blood.filterStatus')}
              value={filterStatus}
              onChange={(value) => setFilterStatus(value as string)}
              options={[
                { value: 'all', label: 'All Status' },
                { value: 'critical', label: 'Critical' },
                { value: 'low', label: 'Low' },
                { value: 'adequate', label: 'Adequate' },
                { value: 'optimal', label: 'Optimal' }
              ]}
              className="min-w-[200px]"
            />

            <Dropdown
              placeholder={t('blood.allParishes')}
              value=""
              onChange={() => {}}
              searchable
              options={[
                { value: 'all', label: 'All Parishes' },
                { value: 'kingston', label: 'Kingston & St. Andrew' },
                { value: 'spanish-town', label: 'Spanish Town Hospital' },
                { value: 'mandeville', label: 'Mandeville Regional' },
                { value: 'cornwall', label: 'Cornwall Regional Hospital' },
                { value: 'annotto-bay', label: 'Annotto Bay Hospital' }
              ]}
              className="min-w-[220px]"
            />
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Units</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {bloodStock.reduce((sum, stock) => sum + stock.totalUnits, 0)}
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                <Droplet className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Available</p>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  {bloodStock.reduce((sum, stock) => sum + stock.availableUnits, 0)}
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Reserved</p>
                <p className="text-3xl font-bold text-yellow-600 mt-2">
                  {bloodStock.reduce((sum, stock) => sum + stock.reservedUnits, 0)}
                </p>
              </div>
              <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Critical Types</p>
                <p className="text-3xl font-bold text-red-600 mt-2">
                  {bloodStock.filter(stock => stock.stockStatus === 'critical').length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Blood Stock Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredStock.map((stock) => (
            <div
              key={stock.bloodType}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`px-3 py-1 rounded-full border text-lg font-bold ${getBloodTypeColor(stock.bloodType)}`}>
                  {stock.bloodType}
                </div>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(stock.trend)}
                  {getStatusIcon(stock.stockStatus)}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Available</span>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {stock.availableUnits} units
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Reserved</span>
                  <span className="text-sm text-gray-900 dark:text-white">
                    {stock.reservedUnits} units
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total</span>
                  <span className="text-sm text-gray-900 dark:text-white">
                    {stock.totalUnits} units
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Stock Level</span>
                    <span>{Math.round((stock.availableUnits / stock.totalUnits) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(stock.stockStatus)}`}
                      style={{ width: `${(stock.availableUnits / stock.totalUnits) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStockStatusColor(stock.stockStatus)}`}>
                    {stock.stockStatus.charAt(0).toUpperCase() + stock.stockStatus.slice(1)}
                  </span>
                  {stock.expiryWarning && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200">
                      Expiry Soon
                    </span>
                  )}
                </div>

                <div className="text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
                  Updated: {new Date(stock.lastUpdated).toLocaleString()}
                </div>
              </div>

              <Link 
                href="/support" 
                className="w-full mt-4 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium block text-center"
              >
                Request Blood
              </Link>
            </div>
          ))}
        </div>

        {filteredStock.length === 0 && (
          <div className="text-center py-12">
            <Droplet className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No blood types found matching your criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}


