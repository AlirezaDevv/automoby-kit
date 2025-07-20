import React, { useState, useRef, useEffect, useId } from 'react';
import cn from '@/utils/cn';
import { useMobile } from '@/contexts/MobileContext';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  label: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
}

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M6 9L12 15L18 9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      label,
      placeholder = 'انتخاب کنید',
      options,
      value: controlledValue,
      defaultValue,
      onChange,
      disabled = false,
      error = false,
      helperText,
      className,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [internalValue, setInternalValue] = useState(defaultValue || '');
    const selectRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const id = useId();
    const { isMobile } = useMobile();

    // Determine if component is controlled or uncontrolled
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const selectedOption = options.find((option) => option.value === value);
    const hasValue = Boolean(selectedOption);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          selectRef.current &&
          !selectRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setFocusedIndex(-1);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (optionValue: string) => {
      // Update internal state for uncontrolled component
      if (!isControlled) {
        setInternalValue(optionValue);
      }

      // Call onChange callback
      onChange?.(optionValue);

      // Close dropdown
      setIsOpen(false);
      setFocusedIndex(-1);
    };

    // Handle keyboard navigation
    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (disabled) return;

      switch (event.key) {
        case 'Enter':
        case ' ':
          event.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            setFocusedIndex(0);
          } else if (focusedIndex >= 0) {
            handleSelect(options[focusedIndex].value);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
        case 'ArrowDown':
          event.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            setFocusedIndex(0);
          } else {
            setFocusedIndex((prev) =>
              prev < options.length - 1 ? prev + 1 : prev,
            );
          }
          break;
        case 'ArrowUp':
          event.preventDefault();
          if (isOpen) {
            setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          }
          break;
        case 'Tab':
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
        default:
          break;
      }
    };

    const handleToggle = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
        setFocusedIndex(isOpen ? -1 : 0);
      }
    };

    // Responsive dimensions and styles
    const containerClasses = isMobile
      ? 'min-w-[204px] w-full'
      : 'min-w-[229px] w-full';

    const inputClasses = isMobile
      ? 'h-12 px-3 py-[13px] gap-2'
      : 'h-14 px-4 py-[15px] gap-3';

    const textClasses = isMobile ? 'text-sm' : 'text-base';

    const iconClasses = isMobile ? 'w-5 h-5' : 'w-6 h-6';

    const dropdownClasses = isMobile
      ? 'py-[13px] px-3 gap-4'
      : 'py-4 px-4 gap-4';

    const optionClasses = isMobile ? 'text-sm' : 'text-base';

    return (
      <div className={cn('relative', containerClasses, className)} {...props}>
        {/* Main Select Input */}
        <div
          ref={ref}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={`${id}-listbox`}
          aria-labelledby={`${id}-label`}
          tabIndex={disabled ? -1 : 0}
          className={cn(
            'relative flex items-center justify-between bg-white border rounded-md cursor-pointer transition-colors duration-200',
            inputClasses,
            {
              'border-neutral-light hover:border-neutral-main':
                !error && !disabled,
              'border-error': error,
              'border-neutral-light bg-neutral-lighter cursor-not-allowed':
                disabled,
              'border-primary': isOpen && !error,
            },
          )}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
        >
          {/* Input Content */}
          <div className="flex-1 text-right">
            <span
              className={cn('block transition-colors', textClasses, {
                'text-neutral-main': (!hasValue && !disabled) || disabled,
                'text-neutral-darker': hasValue && !disabled,
              })}
            >
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>

          {/* Chevron Icon */}
          <ChevronDownIcon
            className={cn(
              'transition-transform duration-200 text-neutral-main',
              iconClasses,
              {
                'rotate-180': isOpen,
                'text-neutral-light': disabled,
              },
            )}
          />

          {/* Floating Label */}
          {hasValue && (
            <div
              className={cn(
                'absolute -top-2 bg-white px-1 text-neutral-main transition-all duration-200',
                isMobile ? 'right-2 text-xs' : 'right-3 text-sm',
              )}
              id={`${id}-label`}
            >
              {label}
            </div>
          )}
        </div>

        {/* Dropdown List */}
        {isOpen && (
          <div
            className={cn(
              'absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-neutral-light rounded-md shadow-lg',
              dropdownClasses,
            )}
          >
            <ul
              ref={listRef}
              role="listbox"
              id={`${id}-listbox`}
              aria-labelledby={`${id}-label`}
              className="flex flex-col items-end"
            >
              {options.map((option, index) => (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={option.value === value}
                  className={cn(
                    'w-full cursor-pointer text-right py-2 transition-colors duration-150',
                    optionClasses,
                    {
                      'bg-primary-lightest': index === focusedIndex,
                      'text-neutral-darker': option.value !== value,
                      'text-primary font-medium': option.value === value,
                    },
                  )}
                  onClick={() => handleSelect(option.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelect(option.value);
                    }
                  }}
                  onMouseEnter={() => setFocusedIndex(index)}
                  tabIndex={-1}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Helper Text */}
        {helperText && (
          <div
            className={cn('mt-1 text-xs text-right', {
              'text-error': error,
              'text-neutral-main': !error,
            })}
          >
            {helperText}
          </div>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';
