// src/components/Input/Input.stories.tsx

import { useState, useEffect } from 'react';
import { User, Mail } from 'lucide-react';
import Input, { InputProps } from './Input';

type StoryArgs = Omit<InputProps, 'onChange' | 'ref'> & {
  initialValue?: string;
};

export default {
  title: 'Components/Forms/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component: `کامپوننت Input برای دریافت ورودی از کاربر با قابلیت‌های متنوع طراحی شده است.
        
- **لیبل شناور:** لیبل با انیمیشن زیبایی هنگام فوکوس یا پر بودن اینپوت، به بالا حرکت می‌کند.
- **حالت‌های مختلف:** شامل وضعیت‌های Default, Error و Disabled.
- **آیکون:** قابلیت افزودن آیکون در ابتدا و انتهای کامپوننت.
- **متن راهنما:** امکان نمایش یک متن کمکی یا خطا در زیر کامپوننت.
- **طراحی واکنش‌گرا:** با پراپ isMobile می‌توان استایل‌های نسخه موبایل را فعال کرد.
        `,
      },
    },
  },
<<<<<<< HEAD
=======
  argTypes: {
    state: {
      name: 'وضعیت (State)',
      control: { type: 'select' },
      options: ['default', 'error', 'disabled'],
    },
    label: {
      name: 'لیبل',
      control: { type: 'text' },
    },
    initialValue: {
      name: 'مقدار اولیه',
      control: { type: 'text' },
    },
    helperText: {
      name: 'متن راهنما',
      control: { type: 'text' },
    },
    isMobile: {
      name: 'حالت موبایل',
      control: { type: 'boolean' },
    },
    // پراپ‌هایی که نباید در پنل کنترل نمایش داده شوند
    startIcon: { table: { disable: true } },
    endIcon: { table: { disable: true } },
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
  },
};

export const Default = ({ initialValue, ...args }: StoryArgs) => {
  const [value, setValue] = useState(initialValue || '');

  useEffect(() => {
    setValue(initialValue || '');
  }, [initialValue]);

  return (
    <div style={{ width: 360 }}>
      <Input
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
Default.storyName = 'پیش‌فرض (Default)';
Default.args = {
  state: 'default',
  label: 'عنوان باکس',
  initialValue: '',
  helperText: 'این یک متن کمکی است',
  isMobile: false,
};

export const ErrorState = (args: StoryArgs) => <Default {...args} />;
ErrorState.storyName = 'حالت خطا (Error)';
ErrorState.args = {
  ...Default.args,
  state: 'error',
  label: 'ایمیل',
  initialValue: 'email@invalid',
  helperText: 'فرمت ایمیل نامعتبر است',
};

export const DisabledState = (args: StoryArgs) => (
  <div className="flex flex-col gap-8">
    <Default {...args} initialValue="ایران" />
    <Default {...args} />
  </div>
);
DisabledState.storyName = 'حالت غیرفعال (Disabled)';
DisabledState.args = {
  ...Default.args,
  state: 'disabled',
  label: 'کشور',
  helperText: 'این فیلد قابل ویرایش نیست',
};

export const WithIcons = (args: StoryArgs) => (
  <div className="flex flex-col gap-8">
    <Default
      {...args}
      label="نام کاربری"
      startIcon={<User />}
      helperText="اینپوت با آیکون شروع"
    />
    <Default
      {...args}
      label="ایمیل"
      initialValue="info@example.com"
      startIcon={<User />}
      endIcon={<Mail />}
      helperText="اینپوت با دو آیکون"
    />
  </div>
);
WithIcons.storyName = 'همراه با آیکون';
WithIcons.args = {
  ...Default.args,
};

export const MobileVersion = (args: StoryArgs) => <Default {...args} />;
MobileVersion.storyName = 'نسخه موبایل (Mobile)';
MobileVersion.args = {
  ...Default.args,
  isMobile: true,
  label: 'جستجو (موبایل)',
  helperText: 'ارتفاع کامپوننت در حالت موبایل کمتر است',
>>>>>>> 9bbd2de (feat: enhance Input component with new features and RTL support)
};
