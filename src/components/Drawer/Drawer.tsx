import React, { useEffect, useRef, ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';
import cn from '@/utils/cn';
import { useMobile } from '@/contexts/MobileContext';

export type DrawerDirection = 'top' | 'bottom' | 'left' | 'right';

export type DrawerProps = {
  children: ReactNode;
  direction?: DrawerDirection;
  fullScreen?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
  /**
   * Whether the component is in mobile mode (optional, auto-detected if not provided)
   */
  isMobile?: boolean;
  /**
   * If true, keep the drawer mounted in the DOM when closed.
   * This allows SSR rendering but keeps it visually hidden until opened.
   */
  keepMounted?: boolean;
};

const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      children,
      direction = 'bottom',
      fullScreen = false,
      isOpen = false,
      onClose,
      className,
      isMobile,
      keepMounted,
      ...props
    },
    ref,
  ) => {
    const [isClient, setIsClient] = useState(false);
    const detectedIsMobile = useMobile();
    const actualIsMobile = isMobile ?? detectedIsMobile;
    const overlayRef = useRef<HTMLDivElement>(null);
    const drawerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      setIsClient(true);
    }, []);

    // Handle escape key
    useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && isOpen && onClose) {
          onClose();
        }
      };

      if (isOpen) {
        document.addEventListener('keydown', handleEscape);
        // Prevent body scroll when drawer is open
        document.body.style.overflow = 'hidden';
      }

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'auto';
      };
    }, [isOpen, onClose]);

    // Handle click outside
    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (
        !fullScreen &&
        onClose &&
        overlayRef.current &&
        event.target === overlayRef.current
      ) {
        onClose();
      }
    };

    // Handle keyboard events on overlay
    const handleOverlayKeyDown = (
      event: React.KeyboardEvent<HTMLDivElement>,
    ) => {
      if (event.key === 'Enter' || event.key === ' ') {
        if (
          !fullScreen &&
          onClose &&
          overlayRef.current &&
          event.target === overlayRef.current
        ) {
          onClose();
        }
      }
    };

    const getTranslateClasses = () => {
      if (!isOpen) {
        switch (direction) {
          case 'top':
            return '-translate-y-full';
          case 'bottom':
            return 'translate-y-full';
          case 'left':
            return '-translate-x-full';
          case 'right':
            return 'translate-x-full';
          default:
            return 'translate-y-full';
        }
      }
      return 'translate-x-0 translate-y-0';
    };

    const getPositionClasses = () => {
      switch (direction) {
        case 'top':
          return 'top-0 left-0 right-0';
        case 'bottom':
          return 'bottom-0 left-0 right-0';
        case 'left':
          return 'top-0 left-0 bottom-0';
        case 'right':
          return 'top-0 right-0 bottom-0';
        default:
          return 'bottom-0 left-0 right-0';
      }
    };

    const getSizeClasses = () => {
      const isVertical = direction === 'top' || direction === 'bottom';

      if (fullScreen) {
        return isVertical ? 'w-full h-full' : 'w-full h-full';
      }

      if (isVertical) {
        return 'w-full max-h-[90vh]';
      }
      return 'h-full max-w-[90vw]';
    };

    const baseOverlayClasses =
      'fixed inset-0 z-[1000] transition-all duration-300';
    const baseDrawerClasses =
      'fixed bg-white shadow-2xl transition-all duration-300 ease-out overflow-auto';

    const overlayClasses = cn(baseOverlayClasses, {
      'bg-neutral-darker/50 backdrop-blur-sm': isOpen,
      'bg-transparent pointer-events-none': !isOpen,
    });

    const drawerClasses = cn(
      baseDrawerClasses,
      getPositionClasses(),
      getSizeClasses(),
      getTranslateClasses(),
      {
        'rounded-t-2xl': direction === 'bottom' && !fullScreen,
        'rounded-b-2xl': direction === 'top' && !fullScreen,
        'rounded-r-2xl': direction === 'left' && !fullScreen,
        'rounded-l-2xl': direction === 'right' && !fullScreen,
        'p-6': !actualIsMobile,
        'p-4': actualIsMobile,
      },
      className,
    );

    const content = (
      <div
        ref={overlayRef}
        className={overlayClasses}
        onClick={handleOverlayClick}
        onKeyDown={handleOverlayKeyDown}
        tabIndex={-1}
        role="button"
        aria-label="Close drawer"
        aria-hidden={!isOpen}
      >
        <div
          ref={ref || drawerRef}
          className={drawerClasses}
          role="dialog"
          aria-modal="true"
          aria-label="Drawer"
          {...props}
        >
          {children}
        </div>
      </div>
    );

    // If not open and not requested to keep mounted, render nothing
    if (!isOpen && !keepMounted) {
      return null;
    }

    // During SSR or before client mounts, we cannot portal.
    // If keepMounted is true, render the content inline (hidden when closed).
    if (!isClient) {
      return content;
    }

    // On the client, render into body using a portal.
    return createPortal(content, document.body);
  },
);

Drawer.displayName = 'Drawer';

export { Drawer };
