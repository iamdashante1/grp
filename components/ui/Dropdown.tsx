'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, X, Search } from 'lucide-react';
import { useI18n } from '@/components/providers/I18nProvider';

interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string | string[];
  onChange: (value: string | string[]) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
  searchable?: boolean;
  multiSelect?: boolean;
  disabled?: boolean;
  className?: string;
  showClear?: boolean;
  showChevron?: boolean;
  icon?: React.ReactNode;
  showLabel?: boolean;
  fullWidth?: boolean;
  alignRight?: boolean;
  offsetY?: number;
  offsetX?: number;
  fitContent?: boolean;
}

export default function Dropdown({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  error,
  required = false,
  searchable = false,
  multiSelect = false,
  disabled = false,
  className = '',
  showClear = true,
  showChevron = true,
  icon,
  showLabel = true,
  fullWidth = true,
  alignRight = false,
  offsetY = 8,
  offsetX = 0,
  fitContent = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 280 });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Update dropdown position when opened and on resize
  useEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      if (!buttonRef.current || !dropdownRef.current) return;

      const button = buttonRef.current;
      const wrapper = dropdownRef.current;

      const top = button.offsetTop + button.offsetHeight + offsetY;
      const buttonWidth = button.offsetWidth;

      const minWidth = 200;
      const maxWidth = 320;
      const width = Math.max(minWidth, Math.min(maxWidth, fullWidth ? (wrapper.clientWidth || maxWidth) : maxWidth));

      let left = alignRight
        ? Math.max(0, button.offsetLeft + buttonWidth - width)
        : button.offsetLeft;
      left += offsetX;

      setDropdownPosition({ top, left, width });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, alignRight, fullWidth, offsetY, offsetX]);

  // Do not lock main scroll when dropdown is open

  // Close dropdown on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  // Filter options based on search query
  const filteredOptions = searchQuery
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  // Get selected option(s) label(s)
  const getSelectedLabel = () => {
    if (multiSelect && Array.isArray(value)) {
      if (value.length === 0) return placeholder;
      if (value.length === 1) {
        const option = options.find((opt) => opt.value === value[0]);
        return option?.label || placeholder;
      }
      return `${value.length} selected`;
    }
    const option = options.find((opt) => opt.value === value);
    return option?.label || placeholder || t('dropdown.selectOption');
  };

  // Handle option selection
  const handleSelect = (optionValue: string) => {
    if (multiSelect && Array.isArray(value)) {
      const newValue = value.includes(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue];
      onChange(newValue);
    } else {
      onChange(optionValue);
      setIsOpen(false);
      setSearchQuery('');
    }
  };

  // Check if option is selected
  const isSelected = (optionValue: string) => {
    if (multiSelect && Array.isArray(value)) {
      return value.includes(optionValue);
    }
    return value === optionValue;
  };

  // Clear all selections
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(multiSelect ? [] : '');
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Dropdown Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          ${fullWidth ? 'w-full' : ''} px-4 py-3 rounded-lg border text-left
          flex items-center justify-between
          transition-all duration-200
          ${
            disabled
              ? 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 cursor-not-allowed opacity-60'
              : isOpen
              ? 'border-red-500 dark:border-red-400 bg-gray-50 dark:bg-gray-700 cursor-pointer'
              : error
              ? 'border-red-300 dark:border-red-700 bg-gray-50 dark:bg-gray-700 hover:border-red-400 cursor-pointer'
              : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 cursor-pointer'
          }
          ${
            value && (multiSelect ? (value as string[]).length > 0 : value)
              ? 'text-gray-900 dark:text-white'
              : 'text-gray-500 dark:text-gray-400'
          }
        `}
      >
        <span className="truncate flex items-center gap-2">
          {icon}
          {showLabel ? getSelectedLabel() : ''}
        </span>
        <div className="flex items-center space-x-2">
          {showClear && value && (multiSelect ? (value as string[]).length > 0 : value) && !disabled && (
            <X
              className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
              onClick={handleClear}
            />
          )}
          {showChevron && (
            <ChevronDown
              className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                isOpen ? 'transform rotate-180' : ''
              }`}
            />
          )}
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className="absolute z-[9999] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl max-h-64 overflow-hidden whitespace-nowrap"
          style={
            fitContent
              ? (
                  alignRight
                    ? { top: dropdownPosition.top, right: Math.max(0, -offsetX) }
                    : { top: dropdownPosition.top, left: dropdownPosition.left + offsetX }
                )
              : {
                  top: dropdownPosition.top,
                  left: dropdownPosition.left,
                  width: `${dropdownPosition.width}px`,
                }
          }
        >
          {/* Search Input */}
          {searchable && (
            <div className="p-2 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('dropdown.searchPlaceholder')}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-red-500"
                />
              </div>
            </div>
          )}

          {/* Options List */}
          <div className="overflow-y-auto max-h-48 scrollbar-thin">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-3 text-center text-gray-500 dark:text-gray-400">
                {t('dropdown.noOptions')}
              </div>
            ) : (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => !option.disabled && handleSelect(option.value)}
                  disabled={option.disabled}
                  className={`
                    w-full px-4 py-3 text-left flex items-center justify-between
                    transition-colors duration-150
                    ${
                      option.disabled
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
                    }
                    ${
                      isSelected(option.value)
                        ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                        : 'text-gray-900 dark:text-white'
                    }
                  `}
                >
                  <span>{option.label}</span>
                  {isSelected(option.value) && (
                    <Check className="h-5 w-5 text-red-600 dark:text-red-400" />
                  )}
                </button>
              ))
            )}
          </div>

          {/* Multi-select footer */}
          {multiSelect && Array.isArray(value) && value.length > 0 && (
            <div className="p-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <button
                type="button"
                onClick={handleClear}
                className="text-sm text-red-600 dark:text-red-400 hover:underline cursor-pointer"
              >
                {t('dropdown.clearAll', { count: value.length })}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
