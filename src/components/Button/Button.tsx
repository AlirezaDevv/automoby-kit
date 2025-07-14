import React from 'react';
import cn from '@/utils/cn';
// اگر از آیکون خاصی استفاده می‌کنی، اینجا ایمپورت کن
// import { SearchIcon } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-4 text-sm', // 32px
  md: 'h-10 px-5 text-base', // 40px
  lg: 'h-12 px-6 text-lg', // 48px
  xl: 'h-14 px-8 text-xl', // 56px
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: `
    bg-[var(--color-primary)] text-white
    hover:bg-[var(--color-primary-dark)]
    disabled:bg-[var(--color-primary-lightest)] disabled:text-[var(--color-primary-light)]
  `,
  secondary: `
    bg-[var(--color-primary-light)] text-[var(--color-primary)]
    hover:bg-[var(--color-primary-lighter)]
    disabled:bg-[var(--color-primary-lightest)] disabled:text-[var(--color-primary-light)]
  `,
  tertiary: `
    bg-white border border-[var(--color-primary-light)] text-[var(--color-primary)]
    hover:bg-[var(--color-primary-lightest)]
    disabled:bg-[var(--color-primary-lightest)] disabled:text-[var(--color-primary-light)]
  `,
  ghost: `
    bg-transparent text-[var(--color-primary)]
    hover:bg-[var(--color-primary-lightest)]
    disabled:text-[var(--color-primary-light)]
  `,
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      icon,
      iconPosition = 'right',
      children,
      loading = false,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={props.type || 'button'}
        className={cn(
          'inline-flex items-center justify-center rounded-[8px] font-bold transition-colors duration-200',
          sizeClasses[size],
          variantClasses[variant],
          disabled && 'opacity-50 pointer-events-none',
          className,
        )}
        disabled={disabled || loading}
        {...props}
      >
        {icon && iconPosition === 'left' && (
          <span className="mr-2 flex items-center">{icon}</span>
        )}
        {loading ? '...' : children}
        {icon && iconPosition === 'right' && (
          <span className="ml-2 flex items-center">{icon}</span>
        )}
      </button>
    );
  },
);
Button.displayName = 'Button';
