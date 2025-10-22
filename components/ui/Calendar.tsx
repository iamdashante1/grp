'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from 'lucide-react';

interface CalendarProps {
  selectedDate?: Date;
  onDateSelect: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  availableDates?: Date[];
  highlightedDates?: { date: Date; label: string; color: string }[];
  showTimeSlots?: boolean;
  timeSlots?: string[];
  selectedTime?: string;
  onTimeSelect?: (time: string) => void;
  className?: string;
  isPopup?: boolean;
  onClose?: () => void;
}

export default function Calendar({
  selectedDate,
  onDateSelect,
  minDate,
  maxDate,
  disabledDates = [],
  availableDates = [],
  highlightedDates = [],
  showTimeSlots = false,
  timeSlots = [],
  selectedTime,
  onTimeSelect,
  className = '',
  isPopup = false,
  onClose,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(
    selectedDate ? new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1) : new Date()
  );
  const calendarRef = useRef<HTMLDivElement>(null);

  // Lock scroll when popup is open
  useEffect(() => {
    if (isPopup) {
      // Save current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';

      return () => {
        // Restore scroll position
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      };
    }
  }, [isPopup]);

  // Handle click outside to close popup
  useEffect(() => {
    if (!isPopup || !onClose) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isPopup, onClose]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Get first day of month (0 = Sunday)
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Check if two dates are the same day
  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  // Check if date is disabled
  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return disabledDates.some((d) => isSameDay(d, date));
  };

  // Check if date is available
  const isDateAvailable = (date: Date) => {
    if (availableDates.length === 0) return true;
    return availableDates.some((d) => isSameDay(d, date));
  };

  // Get highlighted date info
  const getHighlightedInfo = (date: Date) => {
    return highlightedDates.find((h) => isSameDay(h.date, date));
  };

  // Navigate months
  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Generate calendar grid
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days: (Date | null)[] = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  // Generate year options (current year ± 100 years)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 200 }, (_, i) => currentYear - 100 + i);

  const calendarContent = (
    <div 
      ref={calendarRef}
      className={`p-4 ${
        isPopup 
          ? 'fixed z-[9999] max-w-md bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg' 
          : 'w-full'
      } ${className}`}
      style={isPopup ? { 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)'
      } : undefined}
    >
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={previousMonth}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </button>
        
        <div className="flex items-center space-x-2">
          <CalendarIcon className="h-5 w-5 text-red-600" />
          <div className="flex items-center space-x-2">
            <select
              value={currentMonth.getMonth()}
              onChange={(e) => setCurrentMonth(new Date(currentMonth.getFullYear(), parseInt(e.target.value), 1))}
              className="px-2 py-1 text-sm font-semibold bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              {monthNames.map((month, index) => (
                <option key={month} value={index}>
                  {month}
                </option>
              ))}
            </select>
            <select
              value={currentMonth.getFullYear()}
              onChange={(e) => setCurrentMonth(new Date(parseInt(e.target.value), currentMonth.getMonth(), 1))}
              className="px-2 py-1 text-sm font-semibold bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
        >
          <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold text-gray-600 dark:text-gray-400 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="aspect-square" />;
          }

          const isSelected = selectedDate && isSameDay(date, selectedDate);
          const isDisabled = isDateDisabled(date);
          const isAvailable = isDateAvailable(date);
          const isToday = isSameDay(date, new Date());
          const highlightInfo = getHighlightedInfo(date);

          return (
            <button
              key={date.toISOString()}
              type="button"
              onClick={() => !isDisabled && isAvailable && onDateSelect(date)}
              disabled={isDisabled || !isAvailable}
              className={`
                aspect-square p-2 rounded-lg text-sm font-medium
                transition-all duration-200
                ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-lg scale-105 cursor-pointer'
                    : isToday
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 cursor-pointer'
                    : highlightInfo
                    ? `${highlightInfo.color} text-white cursor-pointer`
                    : isDisabled || !isAvailable
                    ? 'text-gray-300 dark:text-gray-700 cursor-not-allowed'
                    : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
                }
              `}
              title={highlightInfo?.label}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      {/* Time Slots */}
      {showTimeSlots && timeSlots.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-3">
            <Clock className="h-5 w-5 text-red-600" />
            <h4 className="font-semibold text-gray-900 dark:text-white">
              Available Times
            </h4>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => onTimeSelect && onTimeSelect(time)}
                className={`
                  px-3 py-2 rounded-lg text-sm font-medium
                  transition-all duration-200 cursor-pointer
                  ${
                    selectedTime === time
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                  }
                `}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Legend */}
      {(availableDates.length > 0 || highlightedDates.length > 0) && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-3 text-xs">
            {availableDates.length > 0 && (
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-gray-600 dark:text-gray-400">Available</span>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-gray-600 dark:text-gray-400">Today</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-600"></div>
              <span className="text-gray-600 dark:text-gray-400">Selected</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // If it's a popup, wrap with backdrop
  if (isPopup) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] flex items-center justify-center">
        {calendarContent}
      </div>
    );
  }

  return calendarContent;
}
