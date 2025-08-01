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
  visibleChildren?: React.ReactNode;
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
      visibleChildren,
      ...props
    },
    ref,
  ) => {
    // // Don't render anything if backdrop is not open
    // if (!isOpen) {
    //   return null;
    // }

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (onClick && event.target === event.currentTarget) {
        onClick();
      }
    };

    const backdropClasses = cn(
      'fixed inset-0 transition-all duration-300',
      {
        'backdrop-blur-sm': blur,
      },
      className,
    );

    const backdropStyle: React.CSSProperties = {
      backgroundColor: 'rgba(0, 0, 0, 0.60)',
      zIndex,
    };

    return (
      <>
        {visibleChildren}
        {isOpen && (
          <div
            ref={ref}
            className={backdropClasses}
            style={backdropStyle}
            onClick={handleClick}
            role="presentation"
            {...props}
          >
            {visibleChildren}
            {children}
          </div>
        )}
      </>
    );
  },
);

Backdrop.displayName = 'Backdrop';
