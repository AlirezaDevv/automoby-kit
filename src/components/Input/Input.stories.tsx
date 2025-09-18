// src/components/Input/Input.stories.tsx

import { useState, useEffect } from 'react';
import { User, Mail } from 'lucide-react';
import { Input, InputProps } from './Input';

type StoryArgs = Omit<InputProps, 'onChange' | 'ref'> & {
  initialValue?: string;
};

export default {
  title: 'Components/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component: `کامپوننت Input برای دریافت ورودی از کاربر با قابلیت‌های کامل طراحی شده است.

**قابلیت‌های اصلی:**
- **لیبل شناور:** لیبل با انیمیشن زیبایی هنگام فوکوس یا پر بودن اینپوت، به بالا حرکت می‌کند
- **حالت‌های مختلف:** شامل وضعیت‌های Default, Error و Disabled
- **آیکون:** قابلیت افزودن آیکون در ابتدا و انتهای کامپوننت
- **متن راهنما:** امکان نمایش یک متن کمکی یا خطا در زیر کامپوننت

**قابلیت ریسپانسیو:**
- **SSR-Safe:** با useMobile hook تشخیص اولیه موبایل/دسکتاپ برای رندر سرور
- **Responsive Enhancement:** Tailwind breakpoints برای بهینه‌سازی در کلاینت
- **تنظیم خودکار اندازه:** ارتفاع و عرض متناسب با اندازه صفحه
- **تایپوگرافی ریسپانسیو:** سایز متن، لیبل و متن راهنما در سایزهای مختلف
- **آیکون‌های تطبیقی:** اندازه آیکون‌ها متناسب با صفحه
- **فضابندی هوشمند:** padding و margin بهینه برای هر دستگاه
        `,
      },
    },
  },
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
    placeholder: {
      name: 'Placeholder',
      control: { type: 'text' },
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
  placeholder: 'مثال: نام شما',
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
};

export const WithLabelAndPlaceholder = (args: StoryArgs) => (
  <div className="flex flex-col gap-8">
    <Default
      {...args}
      label="نام"
      placeholder="اینجا تایپ کنید..."
      helperText="Placeholder فقط هنگام فوکوس نمایش داده می‌شود"
    />
    <Default {...args} label="نام بدون Placeholder" helperText="برای مقایسه" />
  </div>
);
WithLabelAndPlaceholder.storyName = 'لیبل و Placeholder با هم';
WithLabelAndPlaceholder.args = {
  ...Default.args,
};

export const ResponsiveDemo = () => (
  <div style={{ padding: '20px' }}>
    <h3 style={{ marginBottom: '20px', fontFamily: 'var(--font-sans)' }}>
      نمایش ریسپانسیو Input
    </h3>
    <div
      style={{
        background: '#f5f5f5',
        padding: '16px',
        borderRadius: '8px',
        marginBottom: '24px',
        fontSize: '14px',
        color: '#666',
      }}
    >
      <strong>نکته:</strong> Input از ترکیب useMobile hook (SSR) + Tailwind
      breakpoints (Client) استفاده می‌کند:
      <br />
      🔧 <strong>SSR:</strong> تشخیص اولیه موبایل/دسکتاپ برای رندر سرور
      <br />
      📱 <strong>موبایل:</strong> کوچک‌تر و فشرده‌تر برای لمس راحت
      <br />
      💻 <strong>تبلت:</strong> سایز متوسط با فضابندی مناسب
      <br />
      🖥️ <strong>دسکتاپ:</strong> سایز کامل با حداکثر راحتی
      <br />⚡ <strong>Client:</strong> Tailwind breakpoints برای تنظیم دقیق
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      {/* Mobile View Simulation */}
      <div>
        <h4 style={{ marginBottom: '16px', fontFamily: 'var(--font-sans)' }}>
          شبیه‌سازی موبایل (375px)
        </h4>
        <div
          style={{
            width: '375px',
            padding: '16px',
            border: '2px dashed #ccc',
            borderRadius: '8px',
            background: '#fff',
          }}
        >
          <div
            style={{ fontSize: '12px', color: '#999', marginBottom: '16px' }}
          >
            • ارتفاع کم‌تر (h-12)
            <br />
            • آیکون‌های کوچک‌تر (h-4 w-4)
            <br />
            • متن کوچک‌تر (text-s)
            <br />• عرض کامل صفحه
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <Default
              state="default"
              label="نام کاربری"
              initialValue=""
              helperText="متن راهنما در موبایل"
            />
            <Default
              state="default"
              label="ایمیل"
              initialValue="test@example.com"
              startIcon={<Mail />}
              helperText="اینپوت با آیکون"
            />
          </div>
        </div>
      </div>

      {/* Tablet View Simulation */}
      <div>
        <h4 style={{ marginBottom: '16px', fontFamily: 'var(--font-sans)' }}>
          شبیه‌سازی تبلت (768px)
        </h4>
        <div
          style={{
            width: '768px',
            padding: '20px',
            border: '2px dashed #ccc',
            borderRadius: '8px',
            background: '#fff',
          }}
        >
          <div
            style={{ fontSize: '12px', color: '#999', marginBottom: '16px' }}
          >
            • ارتفاع متوسط (h-13)
            <br />
            • آیکون‌های متوسط (h-5 w-5)
            <br />
            • متن متوسط (text-m)
            <br />• عرض ثابت (w-90)
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <Default
              state="default"
              label="جستجو"
              initialValue=""
              placeholder="چیزی تایپ کنید..."
              helperText="اینپوت جستجو برای تبلت"
            />
            <Default
              state="error"
              label="رمز عبور"
              initialValue="123"
              type="password"
              helperText="رمز عبور باید حداقل ۸ کاراکتر باشد"
            />
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div>
        <h4 style={{ marginBottom: '16px', fontFamily: 'var(--font-sans)' }}>
          نمای دسکتاپ (1024px+)
        </h4>
        <div
          style={{
            width: '100%',
            padding: '24px',
            border: '2px dashed #ccc',
            borderRadius: '8px',
            background: '#fff',
          }}
        >
          <div
            style={{ fontSize: '12px', color: '#999', marginBottom: '16px' }}
          >
            • ارتفاع کامل (h-14)
            <br />
            • آیکون‌های بزرگ (h-6 w-6)
            <br />
            • متن بزرگ (text-m)
            <br />• فضابندی راحت برای ماوس
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '24px',
            }}
          >
            <Default
              state="default"
              label="نام و نام خانوادگی"
              initialValue=""
              startIcon={<User />}
              helperText="نام کامل خود را وارد کنید"
            />
            <Default
              state="default"
              label="آدرس ایمیل"
              initialValue=""
              startIcon={<User />}
              endIcon={<Mail />}
              helperText="ایمیل معتبر وارد کنید"
            />
          </div>
        </div>
      </div>

      {/* Live Responsive Test */}
      <div>
        <h4 style={{ marginBottom: '16px', fontFamily: 'var(--font-sans)' }}>
          تست زنده ریسپانسیو
        </h4>
        <div
          style={{
            width: '100%',
            padding: '20px',
            border: '2px solid #590db8',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          }}
        >
          <div
            style={{ fontSize: '12px', color: '#666', marginBottom: '16px' }}
          >
            <strong>💡 نکته:</strong> اندازه پنجره مرورگر را تغییر دهید تا
            تغییرات ریسپانسیو را مشاهده کنید
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <Default
              state="default"
              label="ورودی ریسپانسیو"
              initialValue=""
              startIcon={<User />}
              helperText="این ورودی به صورت خودکار با اندازه صفحه تطبیق پیدا می‌کند"
            />
            <Default
              state="error"
              label="ورودی خطا"
              initialValue="مقدار نادرست"
              endIcon={<Mail />}
              helperText="این پیام خطا نیز ریسپانسیو است"
            />
            <Default
              state="disabled"
              label="ورودی غیرفعال"
              initialValue="غیرقابل ویرایش"
              helperText="حتی در حالت غیرفعال هم ریسپانسیو است"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);
ResponsiveDemo.storyName = 'نمایش ریسپانسیو';
