import React from 'react';
import cn from '@/utils/cn';

export type TypographyVariant =
  // Headings with Fat weight (900)
  | 'h1' // 36px / Fat (900)
  | 'h2' // 32px / Fat (900)
  | 'h3' // 28px / Fat (900)
  | 'h4' // 24px / Heavy (700)
  | 'h5' // 22px / Heavy (700)
  | 'h6' // 20px / Heavy (700)
  // Body Copy variants with specific weights
  | 'body-xl-heavy' // 20px / Heavy (700)
  | 'body-l-heavy' // 18px / Heavy (700)
  | 'body-l-bold' // 18px / Bold (600)
  | 'body-l-medium' // 18px / Medium (400)
  | 'body-m-heavy' // 16px / Heavy (700)
  | 'body-m-bold' // 16px / Bold (600)
  | 'body-m-medium' // 16px / Medium (400)
  | 'body-s-heavy' // 14px / Heavy (700)
  | 'body-s-bold' // 14px / Bold (600)
  | 'body-s-medium' // 14px / Medium (400)
  | 'body-ms-bold' // 13px / Bold (600)
  | 'body-ms-medium' // 13px / Medium (400)
  | 'body-xs-bold' // 12px / Bold (600)
  | 'body-xs-medium' // 12px / Medium (400)
  | 'body-t-bold' // 10px / Bold (600)
  | 'body-t-medium' // 10px / Medium (400)
  | 'body-ss-medium'; // 9px / Medium (400)

export interface TypographyProps {
  variant?: TypographyVariant;
  children?: React.ReactNode;
  color?:
    | 'primary'
    | 'secondary'
    | 'neutral-darker'
    | 'neutral-dark'
    | 'neutral-main'
    | 'white'
    | 'inherit';
  as?: React.ElementType;
  className?: string;
}

const variantClasses: Record<TypographyVariant, string> = {
  // Headings with Fat weight (900)
  h1: 'text-h1 font-fat',
  h2: 'text-h2 font-fat',
  h3: 'text-h3 font-fat',
  h4: 'text-h4 font-heavy',
  h5: 'text-h5 font-heavy',
  h6: 'text-h6 font-heavy',

  // Body Copy with specific weight variants
  'body-xl-heavy': 'text-xl font-heavy',
  'body-l-heavy': 'text-l font-heavy',
  'body-l-bold': 'text-l font-bold',
  'body-l-medium': 'text-l font-medium',
  'body-m-heavy': 'text-m font-heavy',
  'body-m-bold': 'text-m font-bold',
  'body-m-medium': 'text-m font-medium',
  'body-s-heavy': 'text-s font-heavy',
  'body-s-bold': 'text-s font-bold',
  'body-s-medium': 'text-s font-medium',
  'body-ms-bold': 'text-ms font-bold',
  'body-ms-medium': 'text-ms font-medium',
  'body-xs-bold': 'text-xs font-bold',
  'body-xs-medium': 'text-xs font-medium',
  'body-t-bold': 'text-t font-bold',
  'body-t-medium': 'text-t font-medium',
  'body-ss-medium': 'text-ss font-medium',
};

// Export for reuse in other components
export const getTypographyClasses = (variant: TypographyVariant): string => {
  return variantClasses[variant];
};

const colorClasses: Record<string, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  'neutral-darker': 'text-neutral-darker',
  'neutral-dark': 'text-neutral-dark',
  'neutral-main': 'text-neutral-main',
  white: 'text-white',
  inherit: 'text-inherit',
};

const getDefaultElement = (variant: TypographyVariant): string => {
  if (variant.startsWith('h')) return variant.split('-')[0]; // h1, h2, etc.
  return 'p';
};

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      variant = 'body-m-medium',
      color = 'inherit',
      as,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const Element = as || getDefaultElement(variant);

    return React.createElement(
      Element,
      {
        ref,
        className: cn(colorClasses[color], variantClasses[variant], className),
        ...props,
      },
      children,
    );
  },
);

Typography.displayName = 'Typography';
