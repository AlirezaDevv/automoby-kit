import React, { useId, forwardRef } from 'react';
import cn from '@/utils/cn';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  state?: 'default' | 'error' | 'disabled';
  label: string;
  helperText?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  isMobile?: boolean;
  containerClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      state = 'default',
      label,
      helperText,
      leadingIcon,
      trailingIcon,
      isMobile = false,
      id: providedId,
      className,
      containerClassName,
      disabled,
      value,
      ...props
    },
    ref,
  ) => {
    const fallbackId = useId();
    const id = providedId || fallbackId;

    const isActuallyDisabled = state === 'disabled' || disabled;

    const wrapperClassName = cn(
      'relative flex items-center bg-white border rounded-lg transition-colors duration-200',
      isMobile ? 'h-[48px]' : 'h-[54px]',
      {
        'border-gray-300 focus-within:border-purple-600': state === 'default',
        'border-red-500 focus-within:border-red-500': state === 'error',
        'border-gray-200 bg-gray-100 cursor-not-allowed': state === 'disabled',
      },
    );

    const labelClassName = cn(
      'absolute transition-all duration-200 ease-in-out pointer-events-none origin-right bg-white px-1',

      leadingIcon ? 'right-11' : 'right-4',

      {
        'text-gray-400 peer-focus:text-purple-600': state === 'default',
        'text-red-500 peer-focus:text-red-500': state === 'error',
        'text-gray-400': state === 'disabled',
      },

      'top-0 -translate-y-1/2 text-xs',
      'peer-placeholder-shown:text-base peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2',
    );

    const inputClassName = cn(
      'peer w-full h-full self-stretch bg-transparent placeholder-transparent outline-none text-gray-800 text-right',
      'pt-2',
      leadingIcon ? 'pr-11' : 'pr-4',
      trailingIcon ? 'pl-11' : 'pl-4',
      isActuallyDisabled && 'cursor-not-allowed',
      className,
    );

    const leadingIconClassName = cn(
      'absolute top-1/2 -translate-y-1/2 h-5 w-5 right-4',
      {
        'text-gray-400 peer-focus:text-purple-600': state === 'default',
        'text-red-500': state === 'error',
        'text-gray-400': state === 'disabled',
      },
    );

    const trailingIconClassName = cn(
      'absolute top-1/2 -translate-y-1/2 h-5 w-5 left-4 text-gray-400',
    );

    const helperTextClassName = cn('mt-1 text-xs text-right', {
      'text-gray-500': state === 'default',
      'text-red-500': state === 'error',
      'text-gray-400': state === 'disabled',
    });

    return (
      <div className={cn('w-[360px] flex flex-col', containerClassName)}>
        <div className={wrapperClassName}>
          {leadingIcon && (
            <span className={leadingIconClassName}>{leadingIcon}</span>
          )}

          <input
            id={id}
            ref={ref}
            disabled={isActuallyDisabled}
            placeholder={label}
            className={inputClassName}
            value={value}
            {...props}
          />

          <label htmlFor={id} className={labelClassName}>
            {label}
          </label>

          {trailingIcon && (
            <span className={trailingIconClassName}>{trailingIcon}</span>
          )}
        </div>
        {helperText && <p className={helperTextClassName}>{helperText}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
