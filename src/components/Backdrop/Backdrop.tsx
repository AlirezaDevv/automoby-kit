import React from 'react';
import cn from '@/utils/cn';

export interface BackdropProps {
  className?: string;
  /**
   * Whether the backdrop is visible
   */
  isOpen?: boolean;
  /**
   * Callback function when backdrop is clicked
   */
  onClick?: () => void;
  /**
   * Whether to show a blur effect
   */
  blur?: boolean;
  /**
   * Custom z-index (defaults to z-51 which is drawer z-index + 1)
   */
  zIndex?: number;
  children?: React.ReactNode;
}

export const Backdrop = React.forwardRef<HTMLDivElement, BackdropProps>(
  (
    {
      isOpen = false,
      onClick,
      blur = false,
      zIndex = 51,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (onClick && event.target === event.currentTarget) {
        onClick();
      }
    };

    const backdropClasses = cn(
      'fixed inset-0 transition-all duration-300',
      {
        'opacity-100 pointer-events-auto': isOpen,
        'opacity-0 pointer-events-none': !isOpen,
        'backdrop-blur-sm': blur,
      },
      className,
    );

    const backdropStyle: React.CSSProperties = {
      backgroundColor: 'rgba(0, 0, 0, 0.60)',
      zIndex,
    };

    return (
      <div
        ref={ref}
        className={backdropClasses}
        style={backdropStyle}
        onClick={handleClick}
        role="presentation"
        aria-hidden={!isOpen}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Backdrop.displayName = 'Backdrop';
