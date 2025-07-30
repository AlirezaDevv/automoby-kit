import React from 'react';
import cn from '@/utils/cn';
import {
  TypographyVariant,
  getTypographyClasses,
} from '../Typography/Typography';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps {
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  textVariant?: TypographyVariant;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-[16px] py-[7px]',
  md: 'px-[16px] py-[9px]',
  lg: 'px-[16px] py-[13px]',
  xl: 'px-[20px] py-[13px]',
};

const defaultTextVariants: Record<ButtonSize, TypographyVariant> = {
  sm: 'body-s-bold', // 14px / Bold (600)
  md: 'body-m-bold', // 16px / Bold (600)
  lg: 'body-l-bold', // 18px / Bold (600)
  xl: 'body-xl-heavy', // 20px / Heavy (700)
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: `
    bg-primary text-white
    hover:bg-primary-dark
    disabled:bg-neutral-light disabled:text-neutral-darker
  `,
  secondary: `
    bg-primary-lightest text-primary
    hover:bg-primary-lighter
    disabled:bg-neutral-light disabled:text-neutral-darker
  `,
  tertiary: `
    bg-white border border-primary-light text-primary
    hover:bg-neutral-lighter
    disabled:bg-neutral-light disabled:text-neutral-darker
  `,
  ghost: `
    bg-transparent text-primary
    hover:bg-primary-lightest
    disabled:bg-neutral-light disabled:text-neutral-darker
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
      textVariant,
      ...props
    },
    ref,
  ) => {
    const finalTextVariant = textVariant || defaultTextVariants[size];

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'inline-flex items-center justify-center rounded-[8px] transition-colors duration-200',
          sizeClasses[size],
          variantClasses[variant],
          getTypographyClasses(finalTextVariant),
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
