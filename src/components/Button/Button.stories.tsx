import { SearchIcon } from 'lucide-react';
import { Button } from '@/components/Button/Button';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: `کامپوننت Button با ۴ نوع (primary, secondary, tertiary, ghost)، ۴ سایز و ۳ حالت (عادی، هاور، غیرفعال) مطابق پالت رنگ و دیزاین سیستم. همچنین امکان استفاده از انواع تایپوگرافی سیستم دیزاین.`,
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
    textVariant: {
      name: 'نوع تایپوگرافی',
      control: { type: 'select' },
      options: [
        'body-s-bold',
        'body-s-heavy',
        'body-m-bold',
        'body-m-heavy',
        'body-l-bold',
        'body-l-heavy',
        'body-xl-heavy',
        'h6',
        'h5',
      ],
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

export const WithCustomTypography = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={{ marginBottom: 8, fontWeight: 700 }}>
          دکمه‌ها با انواع مختلف تایپوگرافی
        </div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Button variant="primary" textVariant="body-s-bold">
            کوچک بولد
          </Button>
          <Button variant="primary" textVariant="body-m-bold">
            متوسط بولد (پیش‌فرض)
          </Button>
          <Button variant="primary" textVariant="body-l-bold">
            بزرگ بولد
          </Button>
          <Button variant="primary" textVariant="body-xl-heavy">
            خیلی بزرگ سنگین
          </Button>
          <Button variant="primary" textVariant="h6">
            تیتر کوچک
          </Button>
        </div>
      </div>

      <div>
        <div style={{ marginBottom: 8, fontWeight: 700 }}>
          مقایسه وزن‌های مختلف (سایز یکسان)
        </div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Button variant="secondary" textVariant="body-m-medium">
            متوسط معمولی
          </Button>
          <Button variant="secondary" textVariant="body-m-bold">
            متوسط بولد
          </Button>
          <Button variant="secondary" textVariant="body-m-heavy">
            متوسط سنگین
          </Button>
        </div>
      </div>

      <div>
        <div style={{ marginBottom: 8, fontWeight: 700 }}>
          ترکیب سایز دکمه و تایپوگرافی مختلف
        </div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Button variant="tertiary" size="sm" textVariant="body-xs-bold">
            دکمه کوچک با متن ریز
          </Button>
          <Button variant="tertiary" size="lg" textVariant="h6">
            دکمه بزرگ با تیتر
          </Button>
          <Button variant="ghost" size="xl" textVariant="body-l-heavy">
            دکمه خیلی بزرگ
          </Button>
        </div>
      </div>
    </div>
  );
};
WithCustomTypography.storyName = 'با تایپوگرافی سفارشی';
