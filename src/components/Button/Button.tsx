import React from 'react';
import { cn } from '@/utils/cn';
// اگر از آیکون خاصی استفاده می‌کنی، اینجا ایمپورت کن
// import { SearchIcon } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'right' | 'left';
  loading?: boolean;
}

function buttonVariants({
  variant = 'primary',
  size = 'md',
  disabled,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
}) {
  const base = cn(
    'inline-flex items-center justify-center rounded-[6px] font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50',
    disabled && 'opacity-50 pointer-events-none',
  );
  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-primary text-white hover:bg-primary-dark',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark',
    outline: 'border border-primary text-primary bg-white hover:bg-primary/10',
    ghost: 'bg-transparent text-primary hover:bg-primary/10',
  };
  const sizes: Record<ButtonSize, string> = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-base',
    lg: 'h-12 px-6 text-lg',
  };
  return cn(base, variants[variant], sizes[size]);
}

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
          buttonVariants({ variant, size, disabled: disabled || loading }),
          className,
        )}
        disabled={disabled || loading}
        data-variant={variant}
        data-size={size}
        {...props}
      >
        {icon && iconPosition === 'left' && (
          <span className={cn('mr-2 flex items-center')}>{icon}</span>
        )}
        {loading ? '...' : children}
        {icon && iconPosition === 'right' && (
          <span className={cn('ml-2 flex items-center')}>{icon}</span>
        )}
      </button>
    );
  },
);
Button.displayName = 'Button';
