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
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const id = useId();
    const detectedIsMobile = useMobile();
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
      'relative flex items-center border rounded-lg transition-all duration-300 w-90';
    const baseLabelClasses =
      'absolute pointer-events-none transition-all duration-300';
    const baseInputClasses =
      'peer w-full h-full bg-transparent outline-none text-m font-medium disabled:text-neutral-light';
    const baseIconClasses = 'absolute h-5 w-5 transition-colors duration-300';

    const containerClasses = cn(baseContainerClasses, {
      'h-14': !actualIsMobile,
      'h-12': actualIsMobile,
      'border-neutral-light': state === 'default' && !isFocused,
      'border-primary': state === 'default' && isFocused,
      'border-error': state === 'error',
      'bg-white border-neutral-light cursor-not-allowed': isDisabled,
    });

    const labelClasses = cn(baseLabelClasses, {
      '-top-2.5 bg-white px-1 mx-3 font-medium': isLabelFloated,
      'text-s':
        (!actualIsMobile && isLabelFloated) ||
        (actualIsMobile && !isLabelFloated),
      'text-xs': actualIsMobile && isLabelFloated,
      'text-m': !actualIsMobile && !isLabelFloated,
      'right-1': startIcon,
      'right-3': !startIcon,
      'top-1/2 -translate-y-1/2 text-m font-medium': !isLabelFloated,
      'right-11': !isLabelFloated && startIcon,
      'right-4': !isLabelFloated && !startIcon,
      'text-neutral-main': !isFocused && state === 'default',
      'text-neutral-light': isDisabled,
      'text-primary': isFocused && state === 'default',
      'text-error': isLabelFloated && state === 'error',
    });

    const inputClasses = cn(baseInputClasses, {
      'pr-12': startIcon,
      'pl-12': endIcon,
      'px-4': !startIcon && !endIcon,
      'pr-4 pl-12': !startIcon && endIcon,
      'pl-4 pr-12': startIcon && !endIcon,
      'cursor-not-allowed text-red-500': isDisabled,
      'text-neutral-dark': !isFocused,
      'text-neutral-darker': isFocused,
    });

    const iconClasses = cn(baseIconClasses, {
      'text-neutral-main': state !== 'error' && !isFocused,
      'text-primary': state === 'default' && isFocused,
      'text-error': state === 'error',
      'text-neutral-light': isDisabled,
    });

    const helperTextClasses = cn('font-light mt-1 px-2 h-4', {
      'text-s': !actualIsMobile,
      'text-xs': actualIsMobile,
      'text-neutral-main': state === 'default',
      'text-primary': state === 'default' && isFocused,
      'text-error': state === 'error',
      'text-neutral-light': isDisabled,
    });

    // If both label and placeholder are provided, hide placeholder when not focused
    const computedPlaceholder =
      placeholder && !isFocused ? undefined : placeholder;

    return (
      <div>
        <div className={containerClasses}>
          {endIcon && (
            <span className={cn(iconClasses, 'left-4')}>{endIcon}</span>
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
            <span className={cn(iconClasses, 'right-4')}>{startIcon}</span>
          )}
        </div>

        {helperText && <p className={helperTextClasses}>{helperText}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
