import React from 'react';
import cn from '@/utils/cn';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Width of the divider
   * @default "100%"
   */
  width?: string | number;
  /**
   * Height (thickness) of the divider
   * @default 1
   */
  height?: string | number;
  /**
   * Orientation of the divider
   * @default "horizontal"
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Color variant of the divider
   * @default "neutral-light"
   */
  variant?: 'neutral-light' | 'neutral-main' | 'primary';
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      width = '100%',
      height = 1,
      orientation = 'horizontal',
      variant = 'neutral-light',
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const isHorizontal = orientation === 'horizontal';

    const variantClasses = {
      'neutral-light': 'bg-neutral-light',
      'neutral-main': 'bg-neutral-main',
      primary: 'bg-primary',
    };

    const dividerStyle = {
      width: isHorizontal ? width : height,
      height: isHorizontal ? height : width,
      ...style,
    };

    return (
      <div
        ref={ref}
        className={cn('shrink-0', variantClasses[variant], className)}
        style={dividerStyle}
        role="separator"
        {...props}
      />
    );
  },
);

Divider.displayName = 'Divider';

export { Divider };
