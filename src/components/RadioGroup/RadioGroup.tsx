import React from 'react';
import cn from '@/utils/cn';
import { useMobile } from '@/contexts/MobileContext';

export interface RadioOption {
  /**
   * Unique identifier for the radio option
   */
  id: string;
  /**
   * Display label for the option
   */
  label: string;
  /**
   * Optional icon element
   */
  icon?: React.ReactNode;
  /**
   * Whether this option is disabled
   */
  disabled?: boolean;
}

export interface RadioGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Array of radio options
   */
  options: RadioOption[];
  /**
   * Currently selected option ID
   */
  value?: string;
  /**
   * Callback when selection changes
   */
  onChange?: (value: string) => void;
  /**
   * Name attribute for the radio group
   */
  name: string;
  /**
   * Whether the entire group is disabled
   */
  disabled?: boolean;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Override mobile detection for testing
   */
  isMobile?: boolean;
  /**
   * Layout direction of radio options
   */
  direction?: 'vertical' | 'horizontal';
}

interface RadioButtonProps {
  /**
   * Whether the radio is selected
   */
  selected: boolean;
  /**
   * Whether the radio is disabled
   */
  disabled?: boolean;
  /**
   * Whether in mobile mode
   */
  isMobile: boolean;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  selected,
  disabled,
  isMobile,
}) => {
  const size = isMobile ? 'size-5' : 'size-6';

  if (selected) {
    return (
      <div className={cn('relative flex items-center justify-center', size)}>
        {/* Outer circle - filled when selected */}
        <div
          className={cn(
            'absolute inset-0 rounded-full border-2',
            disabled
              ? 'bg-neutral-light border-neutral-light'
              : 'bg-primary border-primary',
          )}
        />
        {/* Inner white circle */}
        <div
          className={cn(
            'absolute rounded-full bg-white',
            isMobile ? 'inset-[5px]' : 'inset-1.5',
          )}
        />
      </div>
    );
  }

  return (
    <div className={cn('relative flex items-center justify-center', size)}>
      {/* Empty circle border */}
      <div
        className={cn(
          'absolute inset-0 rounded-full border',
          isMobile ? 'border' : 'border-[1.5px]',
          disabled ? 'border-neutral-light' : 'border-midnight',
        )}
      />
    </div>
  );
};

interface RadioOptionComponentProps {
  /**
   * Radio option data
   */
  option: RadioOption;
  /**
   * Whether this option is selected
   */
  selected: boolean;
  /**
   * Whether the option is disabled
   */
  disabled?: boolean;
  /**
   * Click handler
   */
  onClick: () => void;
  /**
   * Name attribute for radio input
   */
  name: string;
  /**
   * Whether in mobile mode
   */
  isMobile: boolean;
}

const RadioOptionComponent: React.FC<RadioOptionComponentProps> = ({
  option,
  selected,
  disabled,
  onClick,
  name,
  isMobile,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
      e.preventDefault();
      onClick();
    }
  };

  const getBackgroundColor = () => {
    if (disabled) return 'bg-neutral-lighter';
    if (selected) return 'bg-primary-lightest';
    if (isHovered) return 'bg-primary-lightest/20';
    return 'bg-white';
  };

  const getBorderColor = () => {
    if (selected) return 'border-primary';
    return 'border-transparent';
  };

  const getTextColor = () => {
    if (disabled) return 'text-midnight';
    if (selected) return 'text-primary';
    return 'text-neutral-dark';
  };

  const getShadow = () => {
    if (disabled) return '';
    return 'shadow-[0px_2px_4px_0px_rgba(0,0,0,0.08)]';
  };

  return (
    <div
      className={cn(
        'relative rounded-lg border-[1.5px] cursor-pointer transition-all duration-200',
        getBackgroundColor(),
        getBorderColor(),
        getShadow(),
        disabled && 'cursor-not-allowed',
      )}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      role="radio"
      aria-checked={selected}
      aria-disabled={disabled}
    >
      <div className="flex flex-row items-center justify-end relative w-full">
        <div
          className={cn(
            'box-border flex flex-row items-center justify-end relative w-full',
            isMobile ? 'gap-2 px-4 py-3' : 'gap-4 px-6 py-4',
          )}
        >
          <div
            className={cn(
              'flex flex-row items-center justify-end p-0 relative shrink-0',
              isMobile ? 'gap-2' : 'gap-3',
            )}
          >
            {/* Hidden native radio input for accessibility */}
            <input
              type="radio"
              name={name}
              value={option.id}
              checked={selected}
              disabled={disabled}
              onChange={onClick}
              className="sr-only"
              aria-label={option.label}
            />

            {/* Text Label */}
            <div className="flex flex-col gap-0.5 items-end justify-start p-0 relative shrink-0">
              <div
                className={cn(
                  'font-sans font-bold text-nowrap text-right transition-colors duration-200',
                  isMobile
                    ? 'text-[14px] leading-[24px]'
                    : 'text-[16px] leading-normal',
                  getTextColor(),
                )}
              >
                <p className="whitespace-pre" dir="auto">
                  {option.label}
                </p>
              </div>
            </div>

            {/* Optional Icon */}
            {option.icon && (
              <div
                className={cn(
                  'flex items-center justify-center shrink-0 transition-colors duration-200',
                  isMobile ? 'size-6' : 'size-7',
                  getTextColor(),
                )}
              >
                {option.icon}
              </div>
            )}

            {/* Radio Button */}
            <div className="flex flex-col items-start justify-start p-0 relative shrink-0">
              <RadioButton
                selected={selected}
                disabled={disabled}
                isMobile={isMobile}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      options,
      value,
      onChange,
      name,
      disabled = false,
      className,
      isMobile: isMobileProp,
      direction = 'vertical',
      ...props
    },
    ref,
  ) => {
    const { isMobile } = useMobile(isMobileProp);

    const handleOptionClick = (optionId: string) => {
      if (!disabled && onChange) {
        onChange(optionId);
      }
    };

    const getContainerClasses = () => {
      if (direction === 'horizontal') {
        return cn(
          'flex flex-row gap-2',
          isMobile ? 'flex-wrap' : 'flex-nowrap',
          className,
        );
      }
      return cn('flex flex-col gap-2', className);
    };

    return (
      <div
        ref={ref}
        className={getContainerClasses()}
        role="radiogroup"
        {...props}
      >
        {options.map((option) => (
          <RadioOptionComponent
            key={option.id}
            option={option}
            selected={value === option.id}
            disabled={disabled || option.disabled}
            onClick={() => handleOptionClick(option.id)}
            name={name}
            isMobile={isMobile}
          />
        ))}
      </div>
    );
  },
);

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
