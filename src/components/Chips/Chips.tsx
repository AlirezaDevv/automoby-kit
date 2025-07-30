import React from 'react';
import { X } from 'lucide-react';
import cn from '@/utils/cn';
import { useMobile } from '@/contexts/MobileContext';

export interface ChipsProps {
  /**
   * The variant/color of the chip
   */
  variant?:
    | 'purple'
    | 'red'
    | 'green'
    | 'orange'
    | 'blue'
    | 'white'
    | 'disabled';
  /**
   * Size of the chip - affects padding and font size. If not provided, automatically detected from MobileContext
   */
  size?: 'mobile' | 'desktop';
  /**
   * The text or content to display in the chip
   */
  children?: React.ReactNode;
  /**
   * Whether the chip is disabled
   */
  disabled?: boolean;
  /**
   * Click handler for the chip
   */
  onClick?: () => void;
  /**
   * Click handler for the close icon
   */
  onIconClick?: () => void;
  /**
   * Custom CSS class
   */
  className?: string;
  /**
   * Whether the component is in mobile mode (optional, auto-detected if not provided)
   */
  isMobile?: boolean;
}

const chipVariants = {
  purple: {
    background: 'bg-primary-lightest',
    text: 'text-primary-darkest',
    border: 'border-primary-light',
  },
  red: {
    background: 'bg-error-light',
    text: 'text-error',
    border: 'border-[#f0d6d6]',
  },
  green: {
    background: 'bg-success-light',
    text: 'text-success',
    border: 'border-[#d4e8dc]',
  },
  orange: {
    background: 'bg-warning-light',
    text: 'text-warning',
    border: 'border-[#f5e1d1]',
  },
  blue: {
    background: 'bg-info-light',
    text: 'text-info',
    border: 'border-[#d3e9f2]',
  },
  white: {
    background: 'bg-white',
    text: 'text-neutral-darker',
    border: 'border-neutral-light',
  },
  disabled: {
    background: 'bg-neutral-lighter',
    text: 'text-neutral-main',
    border: 'border-neutral-light',
  },
};

const chipSizes = {
  mobile: {
    padding: 'px-2.5 py-1',
    gap: 'gap-1',
    iconSize: 'size-4',
    fontSize: 'text-[12px]',
    lineHeight: 'leading-[1.8]',
  },
  desktop: {
    padding: 'px-3 py-1',
    gap: 'gap-1.5',
    iconSize: 'size-5',
    fontSize: 'text-[14px]',
    lineHeight: 'leading-[24px]',
  },
};

export const Chips = React.forwardRef<HTMLDivElement, ChipsProps>(
  (
    {
      variant = 'purple',
      size,
      children = 'متن پیشفرض',
      disabled = false,
      onClick,
      onIconClick,
      className,
      isMobile,
      ...props
    },
    ref,
  ) => {
    const detectedIsMobile = useMobile();
    const actualIsMobile = isMobile ?? detectedIsMobile;
    const actualSize = size || (actualIsMobile ? 'mobile' : 'desktop');

    const actualVariant = disabled ? 'disabled' : variant;
    const variantStyles = chipVariants[actualVariant];
    const sizeStyles = chipSizes[actualSize];

    const handleIconClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (onIconClick) {
        onIconClick();
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && onClick && !disabled) {
        e.preventDefault();
        onClick();
      }
    };

    const renderIcon = () => {
      const iconElement = <X className={cn(sizeStyles.iconSize)} />;

      if (onIconClick) {
        return (
          <button
            type="button"
            onClick={handleIconClick}
            disabled={disabled}
            className={cn(
              'flex items-center justify-center',
              'hover:opacity-70 transition-opacity',
              disabled && 'cursor-not-allowed opacity-50',
            )}
            aria-label="حذف"
          >
            {iconElement}
          </button>
        );
      }

      return iconElement;
    };

    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          'relative rounded-[50px] border border-solid inline-flex',
          'flex-row items-center justify-center',
          'font-sans font-bold not-italic',
          'text-nowrap text-right',
          'transition-all duration-200',

          // Variant styles
          variantStyles.background,
          variantStyles.text,
          variantStyles.border,

          // Size styles
          sizeStyles.padding,
          sizeStyles.gap,
          sizeStyles.fontSize,
          sizeStyles.lineHeight,

          // Interactive styles
          onClick && !disabled && 'cursor-pointer hover:opacity-80',
          disabled && 'cursor-not-allowed opacity-60',

          className,
        )}
        onClick={disabled ? undefined : onClick}
        onKeyDown={onClick && !disabled ? handleKeyDown : undefined}
        tabIndex={onClick && !disabled ? 0 : undefined}
        role={onClick ? 'button' : undefined}
        {...props}
      >
        <span className="text-center">{children}</span>
        {renderIcon()}
      </div>
    );
  },
);

Chips.displayName = 'Chips';

export default Chips;
