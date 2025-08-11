import React from 'react';
import { ChevronLeft } from 'lucide-react';
import cn from '@/utils/cn';
import { useMobile } from '@/contexts/MobileContext';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  /**
   * Whether the component is in mobile mode (optional, auto-detected if not provided)
   */
  isMobile?: boolean;
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, className, isMobile }, ref) => {
    const detectedIsMobile = useMobile();
    const actualIsMobile = isMobile ?? detectedIsMobile;

    const handleItemClick = (
      item: BreadcrumbItem,
      index: number,
      e: React.MouseEvent,
    ) => {
      // Don't make the last item (current page) clickable
      if (index === items.length - 1) return;

      if (item.onClick) {
        e.preventDefault();
        item.onClick();
      }
    };

    return (
      <nav
        ref={ref}
        className={cn(
          // Base layout - rely on page RTL direction; no manual row-reverse
          'flex items-center',
          // Responsive gap and padding based on mobile state
          actualIsMobile ? 'gap-1 px-4 py-2.5' : 'gap-3 pr-1 pt-3 pb-4 pl-0',
          className,
        )}
        aria-label="Breadcrumb navigation"
      >
        <ol className="flex items-center gap-inherit">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isClickable = !isLast && !!item.onClick;
            const itemKey = `${item.label}-${index}`;

            return (
              <li key={itemKey} className="flex items-center gap-inherit">
                {/* Breadcrumb item - always span */}
                {/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-static-element-interactions, jsx-a11y/no-noninteractive-tabindex, jsx-a11y/interactive-supports-focus, jsx-a11y/click-events-have-key-events */}
                <span
                  className={cn(
                    'whitespace-nowrap',
                    actualIsMobile ? 'text-t' : 'text-s',
                    'text-neutral-main',
                    isLast ? 'font-medium' : undefined,
                    isClickable
                      ? 'cursor-pointer hover:text-neutral-dark transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded-sm'
                      : undefined,
                  )}
                  role={isClickable ? 'button' : undefined}
                  tabIndex={isClickable ? 0 : undefined}
                  aria-current={isLast ? 'page' : undefined}
                  aria-label={
                    isLast ? `Current page: ${item.label}` : undefined
                  }
                  onClick={
                    isClickable
                      ? (e) => handleItemClick(item, index, e)
                      : undefined
                  }
                  onKeyDown={
                    isClickable
                      ? (e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            if (item.onClick) {
                              item.onClick();
                            }
                          }
                        }
                      : undefined
                  }
                >
                  {item.label}
                </span>
                {/* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-static-element-interactions, jsx-a11y/no-noninteractive-tabindex, jsx-a11y/interactive-supports-focus, jsx-a11y/click-events-have-key-events */}

                {/* Separator - only show if not the last item */}
                {!isLast && (
                  <ChevronLeft
                    className={cn(
                      'text-neutral-main flex-shrink-0',
                      // Responsive icon size
                      actualIsMobile ? 'w-2.5 h-2.5' : 'w-3 h-3',
                    )}
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  },
);

Breadcrumb.displayName = 'Breadcrumb';

export { Breadcrumb };
