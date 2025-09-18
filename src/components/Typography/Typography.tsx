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

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
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
  // Headings with Fat weight (900) - Enhanced responsive scaling with notable differences
  h1: 'text-h4 sm:text-h3 md:text-h2 lg:text-h1 xl:text-h1 font-fat',
  h2: 'text-h5 sm:text-h4 md:text-h3 lg:text-h2 xl:text-h2 font-fat',
  h3: 'text-h6 sm:text-h5 md:text-h4 lg:text-h3 xl:text-h3 font-fat',
  h4: 'text-l sm:text-xl md:text-h5 lg:text-h4 xl:text-h4 font-heavy',
  h5: 'text-m sm:text-l md:text-xl lg:text-h5 xl:text-h5 font-heavy',
  h6: 'text-s sm:text-m md:text-l lg:text-h6 xl:text-h6 font-heavy',

  // Body Copy with specific weight variants - Enhanced responsive scaling
  'body-xl-heavy':
    'text-m sm:text-l md:text-xl lg:text-xl xl:text-xl font-heavy',
  'body-l-heavy': 'text-s sm:text-m md:text-l lg:text-l xl:text-l font-heavy',
  'body-l-bold': 'text-s sm:text-m md:text-l lg:text-l xl:text-l font-bold',
  'body-l-medium': 'text-s sm:text-m md:text-l lg:text-l xl:text-l font-medium',
  'body-m-heavy': 'text-ms sm:text-s md:text-m lg:text-m xl:text-m font-heavy',
  'body-m-bold': 'text-ms sm:text-s md:text-m lg:text-m xl:text-m font-bold',
  'body-m-medium':
    'text-ms sm:text-s md:text-m lg:text-m xl:text-m font-medium',
  'body-s-heavy': 'text-xs sm:text-ms md:text-s lg:text-s xl:text-s font-heavy',
  'body-s-bold': 'text-xs sm:text-ms md:text-s lg:text-s xl:text-s font-bold',
  'body-s-medium':
    'text-xs sm:text-ms md:text-s lg:text-s xl:text-s font-medium',
  'body-ms-bold':
    'text-t sm:text-xs md:text-ms lg:text-ms xl:text-ms font-bold',
  'body-ms-medium':
    'text-t sm:text-xs md:text-ms lg:text-ms xl:text-ms font-medium',
  'body-xs-bold':
    'text-ss sm:text-t md:text-xs lg:text-xs xl:text-xs font-bold',
  'body-xs-medium':
    'text-ss sm:text-t md:text-xs lg:text-xs xl:text-xs font-medium',
  'body-t-bold': 'text-ss sm:text-ss md:text-t lg:text-t xl:text-t font-bold',
  'body-t-medium':
    'text-ss sm:text-ss md:text-t lg:text-t xl:text-t font-medium',
  'body-ss-medium':
    'text-ss sm:text-ss md:text-ss lg:text-ss xl:text-ss font-medium',
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
