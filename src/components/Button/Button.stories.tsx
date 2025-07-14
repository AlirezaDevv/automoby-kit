import React from 'react';
import { Button } from '@/components/Button/Button';
import { SearchIcon, PlusIcon, DownloadIcon } from 'lucide-react';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: `کامپوننت Button با ۴ نوع (primary, secondary, tertiary, ghost)، ۴ سایز و ۳ حالت (عادی، هاور، غیرفعال) مطابق پالت رنگ و دیزاین سیستم.`,
      },
    },
  },
  argTypes: {
    variant: {
      name: 'نوع',
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'ghost'],
      defaultValue: 'primary',
    },
    size: {
      name: 'سایز',
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      defaultValue: 'md',
    },
    disabled: {
      name: 'غیرفعال',
      control: { type: 'boolean' },
      defaultValue: false,
    },
    loading: {
      name: 'در حال بارگذاری',
      control: { type: 'boolean' },
      defaultValue: false,
    },
    iconPosition: {
      name: 'موقعیت آیکون',
      control: { type: 'select' },
      options: ['left', 'right'],
      defaultValue: 'right',
    },
    children: {
      name: 'متن دکمه',
      control: { type: 'text' },
      defaultValue: 'دکمه‌ی اصلی',
    },
  },
};

type StoryProps = {
  variant: 'primary' | 'secondary' | 'tertiary' | 'ghost';
  size: 'sm' | 'md' | 'lg' | 'xl';
  disabled: boolean;
  loading: boolean;
  children: string;
};

export const Playground = (args: StoryProps) => <Button {...args} />;
Playground.storyName = 'پلی‌گراند';
Playground.args = {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  children: 'دکمه‌ی اصلی',
};

export const AllVariantsAndSizes = () => {
  const variants = ['primary', 'secondary', 'tertiary', 'ghost'] as const;
  const sizes = ['sm', 'md', 'lg', 'xl'] as const;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {variants.map((variant) => (
        <div key={variant}>
          <div style={{ marginBottom: 8, fontWeight: 700 }}>{variant}</div>
          <div style={{ display: 'flex', gap: 16 }}>
            {sizes.map((size) => (
              <Button key={size} variant={variant} size={size}>
                دکمه‌ی اصلی
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
AllVariantsAndSizes.storyName = 'انواع و سایزها';

export const WithIcon = () => {
  const variants = ['primary', 'secondary', 'tertiary', 'ghost'] as const;
  const sizes = ['sm', 'md', 'lg', 'xl'] as const;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {variants.map((variant) => (
        <div key={variant}>
          <div style={{ marginBottom: 8, fontWeight: 700 }}>{variant}</div>
          <div style={{ display: 'flex', gap: 16 }}>
            {sizes.map((size) => (
              <Button
                key={size}
                variant={variant}
                size={size}
                icon={<SearchIcon size={18} />}
                iconPosition="right"
              >
                دکمه‌ی اصلی
              </Button>
            ))}
            <Button
              variant={variant}
              size="md"
              icon={<SearchIcon size={18} />}
              aria-label="جستجو"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
WithIcon.storyName = 'با آیکون';

export const DisabledStates = () => {
  const variants = ['primary', 'secondary', 'tertiary', 'ghost'] as const;
  const sizes = ['sm', 'md', 'lg', 'xl'] as const;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {variants.map((variant) => (
        <div key={variant}>
          <div style={{ marginBottom: 8, fontWeight: 700 }}>
            {variant} (غیرفعال)
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            {sizes.map((size) => (
              <Button key={size} variant={variant} size={size} disabled>
                دکمه‌ی اصلی
              </Button>
            ))}
            <Button
              variant={variant}
              size="md"
              icon={<SearchIcon size={18} />}
              disabled
              aria-label="جستجو"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
DisabledStates.storyName = 'حالت غیرفعال';
