import React from 'react';
import cn from '@/utils/cn';
import { useMobile } from '@/contexts/MobileContext';

export interface TabItem {
  /**
   * Unique identifier for the tab
   */
  id: string;
  /**
   * Display label for the tab
   */
  label: string;
  /**
   * Badge count number (optional)
   */
  count?: number;
  /**
   * Whether the tab is disabled
   */
  disabled?: boolean;
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Array of tab items
   */
  items: TabItem[];
  /**
   * Currently active tab ID
   */
  activeTab: string;
  /**
   * Callback when tab is clicked
   */
  onTabChange: (tabId: string) => void;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Override mobile detection for testing
   */
  isMobile?: boolean;
}

// Helper functions moved outside component
const handleTabClick = (
  tabId: string,
  disabled: boolean | undefined,
  onTabChange: (tabId: string) => void,
) => {
  if (!disabled) {
    onTabChange(tabId);
  }
};

const handleKeyDown = (
  e: React.KeyboardEvent,
  tabId: string,
  disabled: boolean | undefined,
  onTabChange: (tabId: string) => void,
) => {
  if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
    e.preventDefault();
    onTabChange(tabId);
  }
};

const renderBadge = (
  count: number | undefined,
  isActive: boolean | undefined,
  disabled: boolean | undefined,
  isMobile: boolean,
) => {
  if (count === undefined) return null;

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-[5px] font-sans font-bold text-white',
        'transition-colors duration-200',
        isMobile
          ? 'size-6 text-[14px] pt-0.5'
          : 'size-[25px] text-[14px] pt-[3px]',
        disabled ? 'bg-midnight' : isActive ? 'bg-primary' : 'bg-neutral-main',
      )}
    >
      <p className="leading-[24px] whitespace-pre" dir="auto">
        {count}
      </p>
    </div>
  );
};

const renderTabContent = (
  item: TabItem,
  isActive: boolean,
  isMobile: boolean,
) => {
  const hasCount = item.count !== undefined;

  return (
    <div
      className={cn(
        'flex flex-row items-center justify-start transition-colors duration-200',
        isMobile ? 'gap-1.5' : 'gap-1.5',
      )}
    >
      {hasCount && renderBadge(item.count, isActive, item.disabled, isMobile)}
      <div
        className={cn(
          'font-sans text-nowrap text-right transition-colors duration-200',
          isMobile ? 'text-[14px]' : isActive ? 'text-[16px]' : 'text-[18px]',
          item.disabled
            ? 'font-normal text-midnight'
            : isActive
              ? 'font-bold text-primary'
              : 'font-normal text-neutral-main',
          isMobile
            ? 'leading-[24px]'
            : isActive
              ? 'leading-normal'
              : 'leading-[1.9]',
        )}
      >
        <p className="whitespace-pre" dir="auto">
          {item.label}
        </p>
      </div>
    </div>
  );
};

const renderTab = (
  item: TabItem,
  activeTab: string,
  isMobile: boolean,
  onTabChange: (tabId: string) => void,
) => {
  const isActive = item.id === activeTab;

  return (
    <div
      key={item.id}
      className={cn(
        'box-border flex flex-col items-center justify-between relative shrink-0',
        'cursor-pointer transition-all duration-200',
        isMobile ? 'h-12 px-3' : 'h-14 px-4',
        isActive
          ? isMobile
            ? 'pt-[11px] pb-0'
            : 'pt-3.5 pb-0'
          : 'py-0 justify-center',
        item.disabled && 'cursor-not-allowed opacity-50',
        !item.disabled && 'hover:opacity-80',
      )}
      onClick={() => handleTabClick(item.id, item.disabled, onTabChange)}
      onKeyDown={(e) => handleKeyDown(e, item.id, item.disabled, onTabChange)}
      tabIndex={item.disabled ? -1 : 0}
      role="tab"
      aria-selected={isActive}
      aria-disabled={item.disabled}
    >
      {renderTabContent(item, isActive, isMobile)}

      {/* Active indicator line */}
      {isActive && (
        <div className="bg-primary h-1 rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-full" />
      )}
    </div>
  );
};

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      items,
      activeTab,
      onTabChange,
      className,
      isMobile: isMobileProp,
      ...props
    },
    ref,
  ) => {
    const { isMobile } = useMobile(isMobileProp);

    return (
      <div ref={ref} className={cn('relative w-full', className)} {...props}>
        <div className="box-border flex flex-row items-center justify-end p-0 relative w-full">
          {items.map((item) =>
            renderTab(item, activeTab, isMobile, onTabChange),
          )}
        </div>

        {/* Bottom border line */}
        <div className="absolute border-midnight-light border-[0px_0px_1px] border-solid bottom-[-0.5px] left-0 right-0 top-0 pointer-events-none" />
      </div>
    );
  },
);

Tabs.displayName = 'Tabs';

export { Tabs };
