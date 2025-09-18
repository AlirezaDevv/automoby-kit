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
      // Enhanced SSR-safe height with notable differences across breakpoints
      {
        'h-10 sm:h-12 md:h-14 lg:h-16 xl:h-16': actualIsMobile,
        'h-12 sm:h-14 md:h-16 lg:h-18 xl:h-18': !actualIsMobile,
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
      // Enhanced SSR-safe label text sizes with notable differences
      'text-xs sm:text-s md:text-m lg:text-l xl:text-l':
        isLabelFloated && actualIsMobile,
      'text-s sm:text-m md:text-l lg:text-xl xl:text-xl':
        isLabelFloated && !actualIsMobile,
      'text-s sm:text-m md:text-l lg:text-xl xl:text-xl font-medium':
        !isLabelFloated && actualIsMobile,
      'text-m sm:text-l md:text-xl lg:text-xl xl:text-xl font-medium':
        !isLabelFloated && !actualIsMobile,
      // Enhanced responsive positioning
      'right-1 sm:right-1 md:right-2 lg:right-3 xl:right-3': startIcon,
      'right-3 sm:right-3 md:right-4 lg:right-5 xl:right-5': !startIcon,
      'top-1/2 -translate-y-1/2': !isLabelFloated,
      // Enhanced responsive positioning for non-floated with icons
      'right-11 sm:right-12 md:right-14 lg:right-16 xl:right-16':
        !isLabelFloated && startIcon,
      'right-4 sm:right-5 md:right-6 lg:right-7 xl:right-7':
        !isLabelFloated && !startIcon,
      // Colors
      'text-neutral-main': !isFocused && state === 'default',
      'text-neutral-light': isDisabled,
      'text-primary': isFocused && state === 'default',
      'text-error': isLabelFloated && state === 'error',
    });

    const inputClasses = cn(
      baseInputClasses,
      // Enhanced SSR-safe text size with notable differences
      {
        'text-s sm:text-m md:text-l lg:text-xl xl:text-xl': actualIsMobile,
        'text-m sm:text-l md:text-xl lg:text-xl xl:text-xl': !actualIsMobile,
      },
      {
        // Enhanced responsive padding with icons
        'pr-8 sm:pr-10 md:pr-12 lg:pr-14 xl:pr-16': startIcon,
        'pl-8 sm:pl-10 md:pl-12 lg:pl-14 xl:pl-16': endIcon,
        'px-2 sm:px-3 md:px-4 lg:px-5 xl:px-6': !startIcon && !endIcon,
        'pr-2 pl-8 sm:pr-3 sm:pl-10 md:pr-4 md:pl-12 lg:pr-5 lg:pl-14 xl:pr-6 xl:pl-16':
          !startIcon && endIcon,
        'pl-2 pr-8 sm:pl-3 sm:pr-10 md:pl-4 md:pr-12 lg:pl-5 lg:pr-14 xl:pl-6 xl:pr-16':
          startIcon && !endIcon,
        // States
        'cursor-not-allowed text-red-500': isDisabled,
        'text-neutral-dark': !isFocused,
        'text-neutral-darker': isFocused,
      },
    );

    const iconClasses = cn(
      baseIconClasses,
      // Enhanced SSR-safe icon size with notable differences
      {
        'h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-7 xl:w-7':
          actualIsMobile,
        'h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8':
          !actualIsMobile,
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
      // Enhanced responsive padding and text size
      'px-2 sm:px-3 md:px-4 lg:px-5 xl:px-6',
      {
        // Enhanced SSR-safe text sizing with notable differences
        'text-xs sm:text-s md:text-m lg:text-l xl:text-l': actualIsMobile,
        'text-s sm:text-m md:text-l lg:text-xl xl:text-xl': !actualIsMobile,
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
                'left-2 sm:left-3 md:left-4 lg:left-5 xl:left-6',
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
                'right-2 sm:right-3 md:right-4 lg:right-5 xl:right-6',
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
