import React, { useState, useRef, useEffect } from 'react';
import cn from '@/utils/cn';
import { Typography } from '../Typography/Typography';

export interface MenuItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export interface MenuProps {
  /**
   * The text displayed on the main menu button
   */
  buttonText: string;
  /**
   * Array of menu items to display in the dropdown
   */
  items: MenuItem[];
  /**
   * Whether the menu is disabled
   */
  disabled?: boolean;
  /**
   * Additional CSS classes for the menu wrapper container
   */
  wrapperClassName?: string;
  /**
   * Additional CSS classes for the main menu button
   */
  buttonClassName?: string;
  /**
   * Callback fired when menu open state changes
   */
  onOpenChange?: (isOpen: boolean) => void;
  /**
   * Whether the menu is initially open (controlled mode)
   */
  isOpen?: boolean;
  /**
   * Aria label for the menu button
   */
  'aria-label'?: string;
}

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  (
    {
      buttonText,
      items,
      disabled = false,
      wrapperClassName,
      buttonClassName,
      onOpenChange,
      isOpen: controlledIsOpen,
      'aria-label': ariaLabel,
      ...props
    },
    ref,
  ) => {
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Use controlled or uncontrolled state
    const isOpen =
      controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

    const handleToggle = () => {
      if (disabled) return;

      const newIsOpen = !isOpen;

      if (controlledIsOpen === undefined) {
        setInternalIsOpen(newIsOpen);
      }

      onOpenChange?.(newIsOpen);
    };

    const handleItemClick = (item: MenuItem) => {
      if (item.disabled) return;

      // Close menu after item click
      if (controlledIsOpen === undefined) {
        setInternalIsOpen(false);
      }
      onOpenChange?.(false);

      // Execute item's onClick if provided
      item.onClick?.();
    };

    // Close menu when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          menuRef.current &&
          !menuRef.current.contains(event.target as Node)
        ) {
          if (controlledIsOpen === undefined) {
            setInternalIsOpen(false);
          }
          onOpenChange?.(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }
      return undefined;
    }, [isOpen, controlledIsOpen, onOpenChange]);

    // Handle keyboard navigation
    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (disabled) return;

      switch (event.key) {
        case 'Escape':
          if (isOpen) {
            event.preventDefault();
            if (controlledIsOpen === undefined) {
              setInternalIsOpen(false);
            }
            onOpenChange?.(false);
            buttonRef.current?.focus();
          }
          break;
        case 'ArrowDown':
          if (!isOpen) {
            event.preventDefault();
            handleToggle();
          }
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          handleToggle();
          break;
        default:
          // No action needed for other keys
          break;
      }
    };

    const buttonClasses = cn(
      // Base button styles matching Figma design
      'inline-flex items-center justify-center',
      'bg-white border border-neutral-light',
      'rounded-md transition-colors duration-200',
      // Enhanced responsive padding and sizing with notable differences
      'px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-3 lg:px-6 lg:py-4 xl:px-8 xl:py-5',
      'min-w-16 sm:min-w-20 md:min-w-24 lg:min-w-32 xl:min-w-40',
      // Interactive states
      'hover:bg-neutral-lighter',
      'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
      // Disabled state
      {
        'opacity-50 cursor-not-allowed': disabled,
        'cursor-pointer': !disabled,
      },
      buttonClassName,
    );

    const dropdownClasses = cn(
      // Base dropdown styles
      'absolute top-full z-10 mt-1',
      'bg-white border border-neutral-light',
      'rounded-md shadow-lg',
      // Enhanced responsive positioning and sizing with notable differences
      'left-0 right-0 sm:left-0 sm:right-auto sm:min-w-40 md:min-w-48 lg:min-w-56 xl:min-w-64',
      // Enhanced responsive padding
      'py-1 px-2 sm:py-2 sm:px-3 md:py-3 md:px-4 lg:py-4 lg:px-6 xl:py-5 xl:px-8',
      // Animation
      'transition-all duration-200',
      {
        'opacity-100 translate-y-0 pointer-events-auto': isOpen,
        'opacity-0 -translate-y-2 pointer-events-none': !isOpen,
      },
    );

    const itemClasses = cn(
      'block w-full text-right',
      'transition-colors duration-200',
      'hover:bg-neutral-lighter rounded',
      'focus:outline-none focus:bg-neutral-lighter',
      // Enhanced responsive padding with notable differences
      'px-1 py-0.5 sm:px-2 sm:py-1 md:px-3 md:py-2 lg:px-4 lg:py-3 xl:px-5 xl:py-4',
      // Enhanced responsive margins
      '-mx-1 sm:-mx-2 md:-mx-3 lg:-mx-4 xl:-mx-5',
    );

    return (
      <div
        ref={ref}
        className={cn('relative inline-block', wrapperClassName)}
        {...props}
      >
        <div ref={menuRef}>
          {/* Main Menu Button */}
          <button
            ref={buttonRef}
            type="button"
            className={buttonClasses}
            onClick={handleToggle}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            aria-expanded={isOpen}
            aria-haspopup="true"
            aria-label={ariaLabel || `منوی ${buttonText}`}
          >
            <Typography
              variant="body-s-heavy"
              color="neutral-darker"
              className="text-right"
            >
              {buttonText}
            </Typography>
          </button>

          {/* Dropdown Menu */}
          <div className={dropdownClasses}>
            <div className="flex flex-col gap-1 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-5">
              {items.map((item) => {
                const content = (
                  <Typography
                    variant="body-s-heavy"
                    color={item.disabled ? 'neutral-main' : 'neutral-darker'}
                    className="text-right"
                  >
                    {item.label}
                  </Typography>
                );

                const commonProps = {
                  className: cn(itemClasses, {
                    'opacity-50 cursor-not-allowed': item.disabled,
                    'cursor-pointer': !item.disabled,
                  }),
                  onClick: item.disabled
                    ? undefined
                    : () => handleItemClick(item),
                  'aria-label': `منوی ${item.label}`,
                };

                // Render as link if href is provided
                if (item.href && !item.disabled) {
                  return (
                    <a
                      key={item.id}
                      {...commonProps}
                      href={item.href}
                      role="menuitem"
                      tabIndex={isOpen ? 0 : -1}
                    >
                      {content}
                    </a>
                  );
                }

                // Render as button
                return (
                  <button
                    key={item.id}
                    {...commonProps}
                    type="button"
                    role="menuitem"
                    tabIndex={isOpen ? 0 : -1}
                    disabled={item.disabled}
                  >
                    {content}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

Menu.displayName = 'Menu';
