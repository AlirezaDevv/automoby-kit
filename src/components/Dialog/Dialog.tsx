import React from 'react';
import { X } from 'lucide-react';
import cn from '@/utils/cn';
import { Backdrop } from '../Backdrop/Backdrop';

export interface DialogProps {
  isOpen?: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  content?: React.ReactNode;
  buttons?: React.ReactNode;
  showCloseButton?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children?: React.ReactNode;
}

const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      isOpen = false,
      onClose,
      title,
      content,
      buttons,
      showCloseButton = true,
      size = 'md',
      className,
      children,
    },
    ref,
  ) => {
    const handleClose = () => {
      if (onClose) {
        onClose();
      }
    };

    const sizeClasses = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
    };

    const dialogClasses = cn(
      'bg-white rounded-[10px] shadow-lg mx-4 w-full',
      sizeClasses[size],
      className,
    );

    return (
      <Backdrop isOpen={isOpen} onClick={handleClose} blur>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <div
          ref={ref}
          className={dialogClasses}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            if (e.key === 'Escape' && onClose) {
              onClose();
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'dialog-title' : undefined}
        >
          <div className="flex flex-col p-6 gap-8">
            {/* Title Section */}
            {title && (
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between pb-4 border-b border-[#ebeaf0]">
                  <div className="flex items-center justify-between gap-3 w-full flex-row-reverse">
                    <div className="text-[#590d8b] text-xl font-extrabold leading-8">
                      {title}
                    </div>
                    {showCloseButton && (
                      <button
                        type="button"
                        onClick={handleClose}
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Close dialog"
                      >
                        <X className="w-6 h-6 text-[#a4a2bb]" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Content Section */}
            {content && <div className="flex flex-col gap-4">{content}</div>}

            {/* Children (alternative to content prop) */}
            {children && !content && (
              <div className="flex flex-col gap-4">{children}</div>
            )}

            {/* Buttons Section */}
            {buttons && <div className="flex flex-col gap-1.5">{buttons}</div>}
          </div>
        </div>
      </Backdrop>
    );
  },
);

Dialog.displayName = 'Dialog';

// Button components for the dialog
export const DialogButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary';
    icon?: React.ReactNode;
  }
>(({ variant = 'primary', icon, children, className, ...props }, ref) => {
  const buttonClasses = cn(
    'h-14 px-4 py-[13px] rounded-md font-bold text-base leading-[1.8] flex items-center justify-center gap-2 transition-colors',
    {
      'bg-[#590d8b] text-white hover:bg-[#4a0a75]': variant === 'primary',
      'bg-white text-[#1a1922] border border-[#ebeaf0] hover:bg-gray-50':
        variant === 'secondary',
    },
    className,
  );

  return (
    <button type="button" ref={ref} className={buttonClasses} {...props}>
      {children}
      {icon && <span className="w-5 h-5">{icon}</span>}
    </button>
  );
});
DialogButton.displayName = 'DialogButton';

export { Dialog };
