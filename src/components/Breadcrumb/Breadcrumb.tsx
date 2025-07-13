import React from 'react';
import { ChevronLeft } from 'lucide-react';
import cn from '@/utils/cn';
import { useMobile } from '@/contexts/MobileContext';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  testIsMobile?: boolean;
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, className, testIsMobile }, ref) => {
    const { isMobile } = useMobile(testIsMobile);

    const handleItemClick = (item: BreadcrumbItem, index: number) => {
      // Don't make the last item (current page) clickable
      if (index === items.length - 1) return;

      if (item.onClick) {
        item.onClick();
      } else if (item.href) {
        window.location.href = item.href;
      }
    };

    return (
      <nav
        ref={ref}
        className={cn(
          // Base layout - RTL with flex-row-reverse to show items right to left
          'flex flex-row-reverse items-center',
          // Responsive gap and padding based on mobile state
          isMobile ? 'gap-1 px-4 py-2.5' : 'gap-3 pr-1 pt-3 pb-4 pl-0',
          className,
        )}
        aria-label="Breadcrumb"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isClickable = !isLast && (item.href || item.onClick);
          const itemKey = `${item.label}-${index}`;

          return (
            <React.Fragment key={itemKey}>
              {/* Breadcrumb item */}
              {isClickable ? (
                <button
                  type="button"
                  className={cn(
                    // Base styles
                    'whitespace-nowrap border-0 bg-transparent p-0',
                    // Responsive font size based on mobile state
                    isMobile ? 'text-t' : 'text-s',
                    // Color
                    'text-neutral-main',
                    // Cursor and hover effects for clickable items
                    'cursor-pointer hover:text-neutral-dark transition-colors focus:outline-none',
                  )}
                  onClick={() => handleItemClick(item, index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleItemClick(item, index);
                    }
                  }}
                >
                  {item.label}
                </button>
              ) : (
                <span
                  className={cn(
                    // Base styles
                    'whitespace-nowrap',
                    // Responsive font size based on mobile state
                    isMobile ? 'text-t' : 'text-s',
                    // Color
                    'text-neutral-main',
                    // Different styles for current page (last item)
                    'font-medium',
                  )}
                >
                  {item.label}
                </span>
              )}

              {/* Separator - only show if not the last item */}
              {!isLast && (
                <ChevronLeft
                  className={cn(
                    'text-black flex-shrink-0',
                    // Responsive icon size
                    isMobile ? 'w-2.5 h-2.5' : 'w-3 h-3',
                  )}
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          );
        })}
      </nav>
    );
  },
);

Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;
