import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import cn from '@/utils/cn';
import { useMobile } from '@/contexts';
import { Typography } from '../Typography/Typography';

export interface AccordionProps {
  /** The header text content */
  title: string;
  /** The body text content */
  body: string;
  /** Icon to display at the start of the header */
  startIcon?: React.ReactNode;
  /** Whether the accordion is expanded (controlled) */
  isExpanded?: boolean;
  /** Callback when the accordion state changes */
  onToggle?: (isExpanded: boolean) => void;
  /** Default expanded state (uncontrolled) */
  defaultExpanded?: boolean;
  /** Additional CSS classes for the root element */
  className?: string;
  /** Unique identifier for the accordion */
  id?: string;
  /** Whether the accordion is disabled */
  disabled?: boolean;
  /** Force mobile mode (optional, for testing/storybook) */
  forceMobile?: boolean;
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      title,
      body,
      startIcon,
      isExpanded: controlledExpanded,
      onToggle,
      defaultExpanded = false,
      className,
      id,
      disabled = false,
      forceMobile,
      ...props
    },
    ref,
  ) => {
    const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
    const { isMobile: contextIsMobile } = useMobile();

    // Use forceMobile prop if provided, otherwise use context
    const isMobile = forceMobile !== undefined ? forceMobile : contextIsMobile;

    // Use controlled state if provided, otherwise use internal state
    const isExpanded =
      controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

    const handleToggle = () => {
      if (disabled) return;

      const newExpanded = !isExpanded;

      if (controlledExpanded === undefined) {
        setInternalExpanded(newExpanded);
      }

      onToggle?.(newExpanded);
    };

    const accordionId =
      id || `accordion-${Math.random().toString(36).substr(2, 9)}`;
    const headerId = `${accordionId}-header`;
    const contentId = `${accordionId}-content`;

    // Icon size based on device
    const iconSize = isMobile ? 20 : 24;

    // Typography variants based on device
    const titleVariant = isMobile ? 'body-s-heavy' : 'body-l-heavy';
    const bodyVariant = isMobile ? 'body-s-medium' : 'body-m-medium';

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl border-0 overflow-hidden',
          'transition-all duration-200 ease-in-out',
          className,
        )}
        {...props}
      >
        {/* Header */}
        <button
          id={headerId}
          type="button"
          onClick={handleToggle}
          disabled={disabled}
          aria-expanded={isExpanded}
          aria-controls={contentId}
          className={cn(
            'w-full flex items-center justify-between',
            isMobile ? 'p-3' : 'p-4',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'transition-all duration-200 ease-in-out',
            !disabled && 'hover:bg-neutral-lighter',
          )}
        >
          {/* Left side: Chevron icon */}
          <div className="flex-shrink-0 mr-4">
            {isExpanded ? (
              <ChevronUp
                size={iconSize}
                className="text-neutral-darker transition-transform duration-200"
                aria-hidden="true"
              />
            ) : (
              <ChevronDown
                size={iconSize}
                className="text-neutral-darker transition-transform duration-200"
                aria-hidden="true"
              />
            )}
          </div>

          {/* Right side: Start icon and title */}
          <div
            className={cn(
              'flex items-center flex-1',
              isMobile ? 'gap-3' : 'gap-4',
            )}
          >
            <div className="flex-1 text-right">
              <Typography variant={titleVariant} color="neutral-darker">
                {title}
              </Typography>
            </div>
            {startIcon && (
              <div
                className={cn(
                  'flex-shrink-0 flex items-center justify-center',
                  isMobile ? 'w-6 h-6' : 'w-8 h-8',
                )}
              >
                {startIcon}
              </div>
            )}
          </div>
        </button>

        {/* Content */}
        <div
          id={contentId}
          role="region"
          aria-labelledby={headerId}
          className={cn(
            'w-full overflow-hidden transition-all duration-300 ease-in-out',
            isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0',
          )}
        >
          <div className={cn(isMobile ? 'pb-3 mt-1' : 'pb-4 mt-1.5')}>
            <div
              className={cn(
                'bg-neutral-lighter rounded-lg',
                isMobile ? 'p-3' : 'p-4',
              )}
            >
              <Typography variant={bodyVariant} color="neutral-dark">
                {body}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

Accordion.displayName = 'Accordion';

export { Accordion };
