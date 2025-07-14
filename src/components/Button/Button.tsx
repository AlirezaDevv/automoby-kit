import React from 'react';
import cn from '@/utils/cn';

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
  sm: 'h-[32px] w-[103px] text-sm',
  md: 'h-[40px] w-[121px] text-base',
  lg: 'h-[48px] w-[136px] text-lg',
  xl: 'h-[56px] w-[159px] text-xl',
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: `
    bg-[var(--color-primary)] text-white
    hover:bg-[var(--color-primary-dark)]
    disabled:bg-[var(--color-neutral-light)] disabled:text-[var(--color-neutral-darker)]
  `,
  secondary: `
    bg-[var(--color-primary-lightest)] text-[var(--color-primary)]
    hover:bg-[var(--color-primary-lighter)]
    disabled:bg-[var(--color-neutral-light)] disabled:text-[var(--color-neutral-darker)]
  `,
  tertiary: `
    bg-white border border-[var(--color-primary-light)] text-[var(--color-primary)]
    hover:bg-[var(--color-neutral-lighter)]
    disabled:bg-[var(--color-neutral-light)] disabled:text-[var(--color-neutral-darker)]
  `,
  ghost: `
    bg-transparent text-[var(--color-primary)]
    hover:bg-[var(--color-primary-lightest)]
    disabled:bg-[var(--color-neutral-light)] disabled:text-[var(--color-neutral-darker)]
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
        type="button"
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
