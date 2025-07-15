import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import cn from '@/utils/cn';

export interface AccordionProps {
  /** The header content, typically a Typography component */
  title: React.ReactNode;
  /** The body content, typically a Typography component */
  body: React.ReactNode;
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
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
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
      ...props
    },
    ref,
  ) => {
    const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);

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
            'p-4',
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
                size={24}
                className="text-neutral-darker transition-transform duration-200"
                aria-hidden="true"
              />
            ) : (
              <ChevronDown
                size={24}
                className="text-neutral-darker transition-transform duration-200"
                aria-hidden="true"
              />
            )}
          </div>

          {/* Right side: Start icon and title */}
          <div className="flex items-center gap-4 flex-1">
            <div className="flex-1 text-right">{title}</div>
            {startIcon && (
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8">
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
          <div className="pb-4 mt-1.5">
            <div className={cn('bg-neutral-lighter rounded-lg', 'p-4')}>
              {body}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

Accordion.displayName = 'Accordion';

export default Accordion;
