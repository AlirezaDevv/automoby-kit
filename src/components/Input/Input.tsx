import React, { useState, useId, ReactNode } from 'react';
import cn from '@/utils/cn';
import { useMobile } from '@/contexts/MobileContext';

export type InputProps = {
  state?: 'default' | 'disabled' | 'error';
  label: string;
  helperText?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  /**
   * Whether the component is in mobile mode (optional, auto-detected if not provided)
   */
  isMobile?: boolean;
  containerClassName?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      state = 'default',
      label,
      value,
      onChange,
      helperText,
      startIcon,
      endIcon,
      type = 'text',
      placeholder,
      isMobile,
      containerClassName,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const id = useId();
    const detectedIsMobile = useMobile();
    // Use provided isMobile prop or fall back to detected mobile state
    // This ensures SSR compatibility while allowing responsive breakpoints on client
    const actualIsMobile = isMobile ?? detectedIsMobile;

    const hasContent = value !== '' && value !== null && value !== undefined;
    const isLabelFloated = isFocused || hasContent;
    const isDisabled = state === 'disabled';

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      if (!isDisabled) {
        setIsFocused(true);
        props.onFocus?.(e);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (!isDisabled) {
        setIsFocused(false);
        props.onBlur?.(e);
      }
    };

    const baseContainerClasses =
      'relative flex items-center border rounded-lg transition-all duration-300 w-full sm:w-90 md:w-90 lg:w-90';
    const baseLabelClasses =
      'absolute pointer-events-none transition-all duration-300';
    const baseInputClasses =
      'peer w-full h-full bg-transparent outline-none font-medium disabled:text-neutral-light';
    const baseIconClasses = 'absolute transition-colors duration-300';

    const containerClasses = cn(
      baseContainerClasses,
      // SSR-safe initial height based on mobile detection, then responsive scaling
      {
        'h-12 sm:h-13 md:h-14 lg:h-14': actualIsMobile,
        'h-14 sm:h-14 md:h-14 lg:h-14': !actualIsMobile,
      },
      // Enhanced responsive breakpoints for client-side optimization
      'transition-all duration-300',
      {
        'border-neutral-light': state === 'default' && !isFocused,
        'border-primary': state === 'default' && isFocused,
        'border-error': state === 'error',
        'bg-white border-neutral-light cursor-not-allowed': isDisabled,
      },
      containerClassName,
    );

    const labelClasses = cn(baseLabelClasses, {
      '-top-2.5 bg-white px-1 mx-3 font-medium': isLabelFloated,
      // SSR-safe label text sizes with responsive enhancement
      'text-xs sm:text-s md:text-s lg:text-s': isLabelFloated && actualIsMobile,
      'text-s sm:text-s md:text-s lg:text-s': isLabelFloated && !actualIsMobile,
      'text-s sm:text-m md:text-m lg:text-m font-medium':
        !isLabelFloated && actualIsMobile,
      'text-m sm:text-m md:text-m lg:text-m font-medium':
        !isLabelFloated && !actualIsMobile,
      // Responsive positioning
      'right-1 sm:right-1 md:right-1 lg:right-1': startIcon,
      'right-3 sm:right-3 md:right-3 lg:right-3': !startIcon,
      'top-1/2 -translate-y-1/2': !isLabelFloated,
      // Responsive positioning for non-floated with icons
      'right-11 sm:right-11 md:right-12 lg:right-12':
        !isLabelFloated && startIcon,
      'right-4 sm:right-4 md:right-4 lg:right-4': !isLabelFloated && !startIcon,
      // Colors
      'text-neutral-main': !isFocused && state === 'default',
      'text-neutral-light': isDisabled,
      'text-primary': isFocused && state === 'default',
      'text-error': isLabelFloated && state === 'error',
    });

    const inputClasses = cn(
      baseInputClasses,
      // SSR-safe text size with responsive enhancement
      {
        'text-s sm:text-m md:text-m lg:text-m': actualIsMobile,
        'text-m sm:text-m md:text-m lg:text-m': !actualIsMobile,
      },
      {
        // Responsive padding with icons
        'pr-10 sm:pr-12 md:pr-12 lg:pr-12': startIcon,
        'pl-10 sm:pl-12 md:pl-12 lg:pl-12': endIcon,
        'px-3 sm:px-4 md:px-4 lg:px-4': !startIcon && !endIcon,
        'pr-3 pl-10 sm:pr-4 sm:pl-12 md:pr-4 md:pl-12 lg:pr-4 lg:pl-12':
          !startIcon && endIcon,
        'pl-3 pr-10 sm:pl-4 sm:pr-12 md:pl-4 md:pr-12 lg:pl-4 lg:pr-12':
          startIcon && !endIcon,
        // States
        'cursor-not-allowed text-red-500': isDisabled,
        'text-neutral-dark': !isFocused,
        'text-neutral-darker': isFocused,
      },
    );

    const iconClasses = cn(
      baseIconClasses,
      // SSR-safe icon size with responsive enhancement
      {
        'h-4 w-4 sm:h-5 sm:w-5 md:h-5 md:w-5 lg:h-6 lg:w-6': actualIsMobile,
        'h-5 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-6 lg:w-6': !actualIsMobile,
      },
      {
        'text-neutral-main': state !== 'error' && !isFocused,
        'text-primary': state === 'default' && isFocused,
        'text-error': state === 'error',
        'text-neutral-light': isDisabled,
      },
    );

    const helperTextClasses = cn(
      'font-light mt-1 h-4',
      // Responsive padding and text size
      'px-2 sm:px-2 md:px-3 lg:px-3',
      {
        // SSR-safe text sizing with responsive enhancement
        'text-xs sm:text-s md:text-s lg:text-s': actualIsMobile,
        'text-s sm:text-s md:text-s lg:text-s': !actualIsMobile,
      },
      {
        'text-neutral-main': state === 'default',
        'text-primary': state === 'default' && isFocused,
        'text-error': state === 'error',
        'text-neutral-light': isDisabled,
      },
    );

    // If both label and placeholder are provided, hide placeholder when not focused
    const computedPlaceholder =
      placeholder && !isFocused ? undefined : placeholder;

    return (
      <div>
        <div className={containerClasses}>
          {endIcon && (
            <span
              className={cn(
                iconClasses,
                'left-3 sm:left-4 md:left-4 lg:left-4',
              )}
            >
              {endIcon}
            </span>
          )}

          <label htmlFor={id} className={labelClasses}>
            {label}
          </label>

          <input
            ref={ref}
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={isDisabled}
            placeholder={computedPlaceholder}
            className={inputClasses}
            {...props}
          />

          {startIcon && (
            <span
              className={cn(
                iconClasses,
                'right-3 sm:right-4 md:right-4 lg:right-4',
              )}
            >
              {startIcon}
            </span>
          )}
        </div>

        {helperText && <p className={helperTextClasses}>{helperText}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
