import { X } from 'lucide-react';
import { useMobile } from '@/contexts/MobileContext';
import cn from '@/utils/cn';
import { forwardRef } from 'react';

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
  /**
   * Whether to show the close icon. Defaults to true to preserve existing behavior.
   */
  showIcon?: boolean;
  /**
   * Optional leading icon element rendered before the label
   */
  startIcon?: React.ReactNode;
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
    border: 'border-error-light',
  },
  green: {
    background: 'bg-success-light',
    text: 'text-success',
    border: 'border-success-light',
  },
  orange: {
    background: 'bg-warning-light',
    text: 'text-warning',
    border: 'border-warning-light',
  },
  blue: {
    background: 'bg-info-light',
    text: 'text-info',
    border: 'border-info-light',
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
    iconSize: 'w-4 h-4',
    fontSize: 'text-xs',
    lineHeight: 'leading-normal',
  },
  desktop: {
    padding: 'px-3 py-1',
    gap: 'gap-1.5',
    iconSize: 'w-5 h-5',
    fontSize: 'text-s',
    lineHeight: 'leading-6',
  },
};

export const Chips = forwardRef<HTMLDivElement, ChipsProps>(
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
      showIcon = true,
      startIcon,
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
      if (!showIcon) return null;
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

    const renderStartIcon = () => {
      if (!startIcon) return null;
      return (
        <span
          className={cn(
            'flex items-center justify-center',
            sizeStyles.iconSize,
          )}
        >
          {startIcon}
        </span>
      );
    };

    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          'relative rounded-full border border-solid inline-flex',
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
        {renderStartIcon()}
        <span className="text-center">{children}</span>
        {renderIcon()}
      </div>
    );
  },
);

Chips.displayName = 'Chips';

export default Chips;
