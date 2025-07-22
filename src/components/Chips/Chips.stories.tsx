import React from 'react';
import { Chips } from '@/components/Chips/Chips';

export default {
  title: 'Components/Chips',
  component: Chips,
  parameters: {
    docs: {
      description: {
        component: `کامپوننت Chips با ۶ نوع رنگ (purple, red, green, orange, blue, white)، ۲ سایز (mobile, desktop) و حالت غیرفعال. امکان استفاده از آیکون سفارشی و کنترل کامل بر رویدادهای کلیک.`,
      },
    },
  },
  argTypes: {
    variant: {
      name: 'نوع رنگ',
      control: { type: 'select' },
      options: ['purple', 'red', 'green', 'orange', 'blue', 'white'],
      defaultValue: 'purple',
    },
    size: {
      name: 'سایز',
      control: { type: 'select' },
      options: ['mobile', 'desktop'],
      defaultValue: 'desktop',
    },
    isMobile: {
      name: 'حالت موبایل',
      control: { type: 'boolean' },
      defaultValue: false,
    },
    disabled: {
      name: 'غیرفعال',
      control: { type: 'boolean' },
      defaultValue: false,
    },
    children: {
      name: 'متن',
      control: { type: 'text' },
      defaultValue: 'متن پیشفرض',
    },
  },
};

type StoryProps = {
  variant: 'purple' | 'red' | 'green' | 'orange' | 'blue' | 'white';
  size: 'mobile' | 'desktop';
  isMobile: boolean;
  disabled: boolean;
  children: string;
};

export const Playground = (args: StoryProps) => (
  <Chips
    {...args}
    onClick={() => console.log('Chip clicked')}
    onIconClick={() => console.log('Icon clicked')}
  />
);
Playground.storyName = 'پلی‌گراند';
Playground.args = {
  variant: 'purple',
  size: 'desktop',
  isMobile: false,
  disabled: false,
  children: 'متن پیشفرض',
};

export const AllVariants = () => {
  const variants = [
    'purple',
    'red',
    'green',
    'orange',
    'blue',
    'white',
  ] as const;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={{ marginBottom: 12, fontWeight: 700 }}>سایز دسکتاپ</div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {variants.map((variant) => (
            <Chips
              key={variant}
              variant={variant}
              size="desktop"
              isMobile={false}
            >
              {variant === 'purple' && 'بنفش'}
              {variant === 'red' && 'قرمز'}
              {variant === 'green' && 'سبز'}
              {variant === 'orange' && 'نارنجی'}
              {variant === 'blue' && 'آبی'}
              {variant === 'white' && 'سفید'}
            </Chips>
          ))}
        </div>
      </div>

      <div>
        <div style={{ marginBottom: 12, fontWeight: 700 }}>سایز موبایل</div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {variants.map((variant) => (
            <Chips key={variant} variant={variant} size="mobile" isMobile>
              {variant === 'purple' && 'بنفش'}
              {variant === 'red' && 'قرمز'}
              {variant === 'green' && 'سبز'}
              {variant === 'orange' && 'نارنجی'}
              {variant === 'blue' && 'آبی'}
              {variant === 'white' && 'سفید'}
            </Chips>
          ))}
        </div>
      </div>
    </div>
  );
};
AllVariants.storyName = 'انواع رنگ‌ها';

export const AutoResponsive = () => {
  const variants = [
    'purple',
    'red',
    'green',
    'orange',
    'blue',
    'white',
  ] as const;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <div style={{ marginBottom: 12, fontWeight: 700 }}>
          تشخیص خودکار سایز (بر اساس MobileContext)
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {variants.map((variant) => (
            <Chips key={variant} variant={variant} isMobile={false}>
              {variant === 'purple' && 'بنفش'}
              {variant === 'red' && 'قرمز'}
              {variant === 'green' && 'سبز'}
              {variant === 'orange' && 'نارنجی'}
              {variant === 'blue' && 'آبی'}
              {variant === 'white' && 'سفید'}
            </Chips>
          ))}
        </div>
      </div>

      <div>
        <div style={{ marginBottom: 12, fontWeight: 700 }}>
          شبیه‌سازی حالت موبایل (isMobile=true)
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {variants.map((variant) => (
            <Chips key={variant} variant={variant} isMobile>
              {variant === 'purple' && 'بنفش'}
              {variant === 'red' && 'قرمز'}
              {variant === 'green' && 'سبز'}
              {variant === 'orange' && 'نارنجی'}
              {variant === 'blue' && 'آبی'}
              {variant === 'white' && 'سفید'}
            </Chips>
          ))}
        </div>
      </div>

      <div>
        <div style={{ marginBottom: 12, fontWeight: 700 }}>
          شبیه‌سازی حالت دسکتاپ (isMobile=false)
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {variants.map((variant) => (
            <Chips key={variant} variant={variant} isMobile={false}>
              {variant === 'purple' && 'بنفش'}
              {variant === 'red' && 'قرمز'}
              {variant === 'green' && 'سبز'}
              {variant === 'orange' && 'نارنجی'}
              {variant === 'blue' && 'آبی'}
              {variant === 'white' && 'سفید'}
            </Chips>
          ))}
        </div>
      </div>
    </div>
  );
};
AutoResponsive.storyName = 'تشخیص خودکار سایز';

export const DisabledStates = () => {
  const variants = [
    'purple',
    'red',
    'green',
    'orange',
    'blue',
    'white',
  ] as const;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={{ marginBottom: 12, fontWeight: 700 }}>
          حالت غیرفعال - سایز دسکتاپ
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {variants.map((variant) => (
            <Chips
              key={variant}
              variant={variant}
              size="desktop"
              disabled
              isMobile={false}
            >
              {variant === 'purple' && 'بنفش غیرفعال'}
              {variant === 'red' && 'قرمز غیرفعال'}
              {variant === 'green' && 'سبز غیرفعال'}
              {variant === 'orange' && 'نارنجی غیرفعال'}
              {variant === 'blue' && 'آبی غیرفعال'}
              {variant === 'white' && 'سفید غیرفعال'}
            </Chips>
          ))}
        </div>
      </div>

      <div>
        <div style={{ marginBottom: 12, fontWeight: 700 }}>
          حالت غیرفعال - سایز موبایل
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {variants.map((variant) => (
            <Chips
              key={variant}
              variant={variant}
              size="mobile"
              disabled
              isMobile
            >
              غیرفعال
            </Chips>
          ))}
        </div>
      </div>
    </div>
  );
};
DisabledStates.storyName = 'حالت غیرفعال';

export const InteractiveExample = () => {
  const [chips, setChips] = React.useState([
    { id: 1, text: 'JavaScript', variant: 'blue' as const },
    { id: 2, text: 'React', variant: 'green' as const },
    { id: 3, text: 'TypeScript', variant: 'purple' as const },
    { id: 4, text: 'CSS', variant: 'orange' as const },
    { id: 5, text: 'HTML', variant: 'red' as const },
  ]);

  const removeChip = (id: number) => {
    setChips(chips.filter((chip) => chip.id !== id));
  };

  const addChip = () => {
    const newId = Math.max(...chips.map((c) => c.id), 0) + 1;
    const variants = ['purple', 'red', 'green', 'orange', 'blue'] as const;
    const randomVariant = variants[Math.floor(Math.random() * variants.length)];
    setChips([
      ...chips,
      {
        id: newId,
        text: `تگ ${newId}`,
        variant: randomVariant,
      },
    ]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <button
          type="button"
          onClick={addChip}
          style={{
            padding: '8px 16px',
            backgroundColor: '#42076a',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginBottom: '16px',
          }}
        >
          افزودن تگ جدید
        </button>
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {chips.map((chip) => (
          <Chips
            key={chip.id}
            variant={chip.variant}
            size="desktop"
            onIconClick={() => removeChip(chip.id)}
            onClick={() => alert(`تگ "${chip.text}" کلیک شد!`)}
            isMobile={false}
          >
            {chip.text}
          </Chips>
        ))}
      </div>

      {chips.length === 0 && (
        <div
          style={{
            padding: '32px',
            textAlign: 'center',
            color: '#a4a2bb',
            border: '2px dashed #a4a2bb',
            borderRadius: '8px',
          }}
        >
          هیچ تگی وجود ندارد. روی &quot;افزودن تگ جدید&quot; کلیک کنید.
        </div>
      )}
    </div>
  );
};
InteractiveExample.storyName = 'مثال تعاملی';

export const ResponsiveComparison = () => {
  const variants = [
    'purple',
    'red',
    'green',
    'orange',
    'blue',
    'white',
  ] as const;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {variants.map((variant) => (
        <div
          key={variant}
          style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
        >
          <div style={{ fontWeight: 700, textTransform: 'capitalize' }}>
            {variant === 'purple' && 'بنفش (Purple)'}
            {variant === 'red' && 'قرمز (Red)'}
            {variant === 'green' && 'سبز (Green)'}
            {variant === 'orange' && 'نارنجی (Orange)'}
            {variant === 'blue' && 'آبی (Blue)'}
            {variant === 'white' && 'سفید (White)'}
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <span style={{ fontSize: '12px', color: '#666' }}>Desktop</span>
              <Chips variant={variant} size="desktop" isMobile={false}>
                متن نمونه
              </Chips>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <span style={{ fontSize: '12px', color: '#666' }}>Mobile</span>
              <Chips variant={variant} size="mobile" isMobile>
                متن نمونه
              </Chips>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
ResponsiveComparison.storyName = 'مقایسه سایزها';
