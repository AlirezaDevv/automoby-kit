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
  color?:
    | 'primary'
    | 'secondary'
    | 'neutral-darker'
    | 'neutral-dark'
    | 'neutral-main'
    | 'white'
    | 'inherit';
  as?: React.ElementType;
}

const variantClasses: Record<TypographyVariant, string> = {
  // Headings with Fat weight (900)
  h1: 'text-[var(--text-h1)] font-[var(--font-weight-fat)]',
  h2: 'text-[var(--text-h2)] font-[var(--font-weight-fat)]',
  h3: 'text-[var(--text-h3)] font-[var(--font-weight-fat)]',
  h4: 'text-[var(--text-h4)] font-[var(--font-weight-heavy)]',
  h5: 'text-[var(--text-h5)] font-[var(--font-weight-heavy)]',
  h6: 'text-[var(--text-h6)] font-[var(--font-weight-heavy)]',

  // Body Copy with specific weight variants
  'body-xl-heavy': 'text-[var(--text-xl)] font-[var(--font-weight-heavy)]',
  'body-l-heavy': 'text-[var(--text-l)] font-[var(--font-weight-heavy)]',
  'body-l-bold': 'text-[var(--text-l)] font-[var(--font-weight-bold)]',
  'body-l-medium': 'text-[var(--text-l)] font-[var(--font-weight-medium)]',
  'body-m-heavy': 'text-[var(--text-m)] font-[var(--font-weight-heavy)]',
  'body-m-bold': 'text-[var(--text-m)] font-[var(--font-weight-bold)]',
  'body-m-medium': 'text-[var(--text-m)] font-[var(--font-weight-medium)]',
  'body-s-heavy': 'text-[var(--text-s)] font-[var(--font-weight-heavy)]',
  'body-s-bold': 'text-[var(--text-s)] font-[var(--font-weight-bold)]',
  'body-s-medium': 'text-[var(--text-s)] font-[var(--font-weight-medium)]',
  'body-ms-bold': 'text-[var(--text-ms)] font-[var(--font-weight-bold)]',
  'body-ms-medium': 'text-[var(--text-ms)] font-[var(--font-weight-medium)]',
  'body-xs-bold': 'text-[var(--text-xs)] font-[var(--font-weight-bold)]',
  'body-xs-medium': 'text-[var(--text-xs)] font-[var(--font-weight-medium)]',
  'body-t-bold': 'text-[var(--text-t)] font-[var(--font-weight-bold)]',
  'body-t-medium': 'text-[var(--text-t)] font-[var(--font-weight-medium)]',
  'body-ss-medium': 'text-[var(--text-ss)] font-[var(--font-weight-medium)]',
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

// Helper components for convenience
export const Heading1 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h1" {...props} />
);

export const Heading2 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h2" {...props} />
);

export const Heading3 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h3" {...props} />
);

export const Heading4 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h4" {...props} />
);

export const Heading5 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h5" {...props} />
);

export const Heading6 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h6" {...props} />
);

export const BodyText = ({
  variant = 'body-m-medium',
  ...props
}: Omit<TypographyProps, 'variant'> & {
  variant?: Exclude<TypographyVariant, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>;
}) => <Typography variant={variant} {...props} />;
