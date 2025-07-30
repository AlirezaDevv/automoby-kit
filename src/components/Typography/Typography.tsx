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
  h1: 'text-[36px] font-fat',
  h2: 'text-[32px] font-fat',
  h3: 'text-[28px] font-fat',
  h4: 'text-[24px] font-heavy',
  h5: 'text-[22px] font-heavy',
  h6: 'text-[20px] font-heavy',

  // Body Copy with specific weight variants
  'body-xl-heavy': 'text-[20px] font-heavy',
  'body-l-heavy': 'text-[18px] font-heavy',
  'body-l-bold': 'text-[18px] font-bold',
  'body-l-medium': 'text-[18px] font-medium',
  'body-m-heavy': 'text-[16px] font-heavy',
  'body-m-bold': 'text-[16px] font-bold',
  'body-m-medium': 'text-[16px] font-medium',
  'body-s-heavy': 'text-[14px] font-heavy',
  'body-s-bold': 'text-[14px] font-bold',
  'body-s-medium': 'text-[14px] font-medium',
  'body-ms-bold': 'text-[13px] font-bold',
  'body-ms-medium': 'text-[13px] font-medium',
  'body-xs-bold': 'text-[12px] font-bold',
  'body-xs-medium': 'text-[12px] font-medium',
  'body-t-bold': 'text-[10px] font-bold',
  'body-t-medium': 'text-[10px] font-medium',
  'body-ss-medium': 'text-[9px] font-medium',
};

// Export for reuse in other components
export const getTypographyClasses = (variant: TypographyVariant): string => {
  return variantClasses[variant];
};

const colorClasses: Record<string, string> = {
  primary: 'text-[var(--color-primary)]',
  secondary: 'text-[var(--color-secondary)]',
  'neutral-darker': 'text-[var(--color-neutral-darker)]',
  'neutral-dark': 'text-[var(--color-neutral-dark)]',
  'neutral-main': 'text-[var(--color-neutral-main)]',
  white: 'text-[var(--color-white)]',
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
        className: cn(
          variantClasses[variant],
          colorClasses[color],
          'leading-[var(--leading-default)]', // 180% line height
          className,
        ),
        ...props,
      },
      children,
    );
  },
);

Typography.displayName = 'Typography';
