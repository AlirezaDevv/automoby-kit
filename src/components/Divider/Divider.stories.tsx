import { Divider, DividerProps } from './Divider';

export default {
  title: 'Components/Divider',
  component: Divider,
  parameters: {
    docs: {
      description: {
        component: `کامپوننت Divider برای جدا کردن بخش‌های مختلف رابط کاربری استفاده می‌شود.

**ویژگی‌ها:**
- **عرض قابل تنظیم:** امکان تعیین عرض دلخواه (پیش‌فرض: 100%)
- **ضخامت قابل تنظیم:** امکان تعیین ضخامت خط (پیش‌فرض: 1px)
- **جهت‌گیری:** افقی یا عمودی
- **رنگ‌های مختلف:** neutral-light، neutral-main، primary
- **سازگار با تم:** استفاده از رنگ‌های سیستم طراحی
        `,
      },
    },
  },
  argTypes: {
    width: {
      name: 'عرض',
      control: { type: 'text' },
      description: 'عرض خط جداکننده (مثال: "100%", "200px", 300)',
      defaultValue: '100%',
    },
    height: {
      name: 'ضخامت',
      control: { type: 'text' },
      description: 'ضخامت خط جداکننده (مثال: 1, "2px")',
      defaultValue: 1,
    },
    orientation: {
      name: 'جهت‌گیری',
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'جهت نمایش خط جداکننده',
      defaultValue: 'horizontal',
    },
    variant: {
      name: 'نوع رنگ',
      control: { type: 'select' },
      options: ['neutral-light', 'neutral-main', 'primary'],
      description: 'رنگ خط جداکننده',
      defaultValue: 'neutral-light',
    },
  },
};

// Default horizontal divider
export const Default = {
  args: {
    width: '100%',
    height: 1,
    orientation: 'horizontal',
    variant: 'neutral-light',
  },
  render: (args: DividerProps) => (
    <div className="w-full max-w-md p-4 space-y-4">
      <div className="text-s font-medium">محتوای بالا</div>
      <Divider {...args} />
      <div className="text-s font-medium">محتوای پایین</div>
    </div>
  ),
};

// Thick divider
export const Thick = {
  args: {
    width: '100%',
    height: 3,
    orientation: 'horizontal',
    variant: 'neutral-main',
  },
  render: (args: DividerProps) => (
    <div className="w-full max-w-md p-4 space-y-4">
      <div className="text-s font-medium">قسمت اول</div>
      <Divider {...args} />
      <div className="text-s font-medium">قسمت دوم</div>
    </div>
  ),
};

// Custom width divider
export const CustomWidth = {
  args: {
    width: '200px',
    height: 1,
    orientation: 'horizontal',
    variant: 'primary',
  },
  render: (args: DividerProps) => (
    <div className="w-full max-w-md p-4 space-y-4">
      <div className="text-s font-medium">خط با عرض سفارشی</div>
      <Divider {...args} />
      <div className="text-s font-medium">محتوای بعدی</div>
    </div>
  ),
};

// Vertical divider
export const Vertical = {
  args: {
    width: 60,
    height: 1,
    orientation: 'vertical',
    variant: 'neutral-light',
  },
  render: (args: DividerProps) => (
    <div className="flex items-center gap-4 p-4">
      <div className="text-s font-medium">بخش چپ</div>
      <Divider {...args} />
      <div className="text-s font-medium">بخش راست</div>
    </div>
  ),
};

// Different variants showcase
export const Variants = {
  render: () => (
    <div className="w-full max-w-md p-4 space-y-6">
      <div>
        <div className="text-s font-medium mb-2">Neutral Light</div>
        <Divider variant="neutral-light" />
      </div>
      <div>
        <div className="text-s font-medium mb-2">Neutral Main</div>
        <Divider variant="neutral-main" />
      </div>
      <div>
        <div className="text-s font-medium mb-2">Primary</div>
        <Divider variant="primary" />
      </div>
    </div>
  ),
};
