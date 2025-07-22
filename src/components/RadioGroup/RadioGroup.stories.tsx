import React from 'react';
import { Wrench, User, Settings, Shield, Car, Home } from 'lucide-react';
import { RadioGroup, RadioOption } from '@/components/RadioGroup/RadioGroup';

export default {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    docs: {
      description: {
        component: `کامپوننت RadioGroup با طراحی واکنش‌گرا برای موبایل و دسکتاپ. شامل پشتیبانی از آیکون اختیاری، حالت‌های مختلف (عادی، هاور، انتخاب شده، غیرفعال)، و تشخیص خودکار اندازه بر اساس MobileContext.`,
      },
    },
  },
  argTypes: {
    value: {
      name: 'مقدار انتخاب شده',
      control: { type: 'text' },
      description: 'شناسه گزینه انتخاب شده',
    },
    disabled: {
      name: 'غیرفعال',
      control: { type: 'boolean' },
      defaultValue: false,
      description: 'غیرفعال کردن کل گروه',
    },
    isMobile: {
      name: 'حالت موبایل',
      control: { type: 'boolean' },
      defaultValue: false,
      description: 'اجبار حالت موبایل برای تست',
    },
    direction: {
      name: 'جهت چیدمان',
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
      defaultValue: 'vertical',
      description: 'جهت چیدمان گزینه‌ها (عمودی یا افقی)',
    },
  },
};

// Sample radio options with icons
const sampleOptionsWithIcons: RadioOption[] = [
  { id: 'repair', label: 'تعمیر کننده', icon: <Wrench /> },
  { id: 'user', label: 'مشتری', icon: <User /> },
  { id: 'admin', label: 'مدیر', icon: <Settings /> },
  { id: 'security', label: 'امنیت', icon: <Shield /> },
];

// Sample radio options without icons
const sampleOptionsWithoutIcons: RadioOption[] = [
  { id: 'option1', label: 'گزینه اول' },
  { id: 'option2', label: 'گزینه دوم' },
  { id: 'option3', label: 'گزینه سوم' },
  { id: 'option4', label: 'گزینه چهارم' },
];

// Sample options with mixed states
const mixedStateOptions: RadioOption[] = [
  { id: 'active1', label: 'گزینه فعال', icon: <Car /> },
  { id: 'active2', label: 'گزینه عادی', icon: <Home /> },
  { id: 'disabled1', label: 'گزینه غیرفعال', icon: <Shield />, disabled: true },
  { id: 'active3', label: 'گزینه آخر', icon: <Settings /> },
];

type StoryProps = {
  value: string;
  disabled: boolean;
  isMobile: boolean;
  direction: 'vertical' | 'horizontal';
};

export const Playground = ({
  value: valueArg,
  disabled,
  isMobile,
  direction,
}: StoryProps) => {
  const [value, setValue] = React.useState(valueArg || 'repair');

  React.useEffect(() => {
    setValue(valueArg);
  }, [valueArg]);

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <RadioGroup
        name="playground-radio"
        options={sampleOptionsWithIcons}
        value={value}
        onChange={setValue}
        disabled={disabled}
        isMobile={isMobile}
        direction={direction}
      />

      <div
        style={{
          marginTop: '20px',
          padding: '16px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
        }}
      >
        <h4>انتخاب شده:</h4>
        <p style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>
          {sampleOptionsWithIcons.find((opt) => opt.id === value)?.label ||
            'هیچ کدام'}
        </p>
      </div>
    </div>
  );
};
Playground.storyName = 'پلی‌گراند';
Playground.args = {
  value: 'repair',
  disabled: false,
  isMobile: false,
};

export const ResponsiveComparison = () => {
  const [desktopValue, setDesktopValue] = React.useState('repair');
  const [mobileValue, setMobileValue] = React.useState('repair');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <div>
        <h3 style={{ marginBottom: 16, fontWeight: 700 }}>نسخه دسکتاپ</h3>
        <div style={{ maxWidth: '400px' }}>
          <RadioGroup
            name="desktop-radio"
            options={sampleOptionsWithIcons}
            value={desktopValue}
            onChange={setDesktopValue}
            isMobile={false}
          />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: 16, fontWeight: 700 }}>نسخه موبایل</h3>
        <div style={{ maxWidth: '320px' }}>
          <RadioGroup
            name="mobile-radio"
            options={sampleOptionsWithIcons}
            value={mobileValue}
            onChange={setMobileValue}
            isMobile
          />
        </div>
      </div>
    </div>
  );
};
ResponsiveComparison.storyName = 'مقایسه موبایل و دسکتاپ';

export const WithoutIcons = () => {
  const [value, setValue] = React.useState('option2');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <div>
        <h3 style={{ marginBottom: 16, fontWeight: 700 }}>
          بدون آیکون - دسکتاپ
        </h3>
        <div style={{ maxWidth: '400px' }}>
          <RadioGroup
            name="no-icons-desktop"
            options={sampleOptionsWithoutIcons}
            value={value}
            onChange={setValue}
            isMobile={false}
          />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: 16, fontWeight: 700 }}>
          بدون آیکون - موبایل
        </h3>
        <div style={{ maxWidth: '320px' }}>
          <RadioGroup
            name="no-icons-mobile"
            options={sampleOptionsWithoutIcons}
            value={value}
            onChange={setValue}
            isMobile
          />
        </div>
      </div>
    </div>
  );
};
WithoutIcons.storyName = 'بدون آیکون';

export const DisabledStates = () => {
  const [value1, setValue1] = React.useState('active1');
  const [value2, setValue2] = React.useState('active1');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <div>
        <h3 style={{ marginBottom: 16, fontWeight: 700 }}>
          گروه کاملاً غیرفعال - دسکتاپ
        </h3>
        <div style={{ maxWidth: '400px' }}>
          <RadioGroup
            name="disabled-group-desktop"
            options={sampleOptionsWithIcons}
            value={value1}
            onChange={setValue1}
            disabled
            isMobile={false}
          />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: 16, fontWeight: 700 }}>
          گزینه‌های انتخابی غیرفعال - موبایل
        </h3>
        <div style={{ maxWidth: '320px' }}>
          <RadioGroup
            name="mixed-disabled-mobile"
            options={mixedStateOptions}
            value={value2}
            onChange={setValue2}
            isMobile
          />
        </div>
      </div>
    </div>
  );
};
DisabledStates.storyName = 'حالت‌های غیرفعال';

export const AutoResponsive = () => {
  const [value, setValue] = React.useState('repair');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <div>
        <h3 style={{ marginBottom: 16, fontWeight: 700 }}>
          تشخیص خودکار سایز (بر اساس MobileContext)
        </h3>
        <div style={{ maxWidth: '400px' }}>
          <RadioGroup
            name="auto-responsive"
            options={sampleOptionsWithIcons}
            value={value}
            onChange={setValue}
            isMobile={false}
          />
        </div>
        <p style={{ marginTop: 12, color: '#666', fontSize: '14px' }}>
          این مثال از MobileContext برای تشخیص خودکار اندازه استفاده می‌کند.
        </p>
      </div>

      <div>
        <h3 style={{ marginBottom: 16, fontWeight: 700 }}>
          اجبار حالت موبایل (isMobile=true)
        </h3>
        <div style={{ maxWidth: '320px' }}>
          <RadioGroup
            name="forced-mobile"
            options={sampleOptionsWithIcons}
            value={value}
            onChange={setValue}
            isMobile
          />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: 16, fontWeight: 700 }}>
          اجبار حالت دسکتاپ (isMobile=false)
        </h3>
        <div style={{ maxWidth: '400px' }}>
          <RadioGroup
            name="forced-desktop"
            options={sampleOptionsWithIcons}
            value={value}
            onChange={setValue}
            isMobile={false}
          />
        </div>
      </div>
    </div>
  );
};
AutoResponsive.storyName = 'تشخیص خودکار سایز';

export const InteractiveExample = () => {
  const [userRole, setUserRole] = React.useState('repair');
  const [preferences, setPreferences] = React.useState('option1');

  const roleOptions: RadioOption[] = [
    { id: 'repair', label: 'تعمیر کننده', icon: <Wrench /> },
    { id: 'customer', label: 'مشتری', icon: <User /> },
    { id: 'manager', label: 'مدیر', icon: <Settings /> },
    { id: 'security', label: 'مسئول امنیت', icon: <Shield />, disabled: true },
  ];

  const preferenceOptions: RadioOption[] = [
    { id: 'option1', label: 'تنظیمات پیش‌فرض' },
    { id: 'option2', label: 'تنظیمات سفارشی' },
    { id: 'option3', label: 'تنظیمات پیشرفته' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <h3 style={{ marginBottom: 16, fontWeight: 700 }}>
          مثال تعاملی - انتخاب نقش کاربر
        </h3>
        <div style={{ maxWidth: '400px' }}>
          <RadioGroup
            name="user-role"
            options={roleOptions}
            value={userRole}
            onChange={setUserRole}
            isMobile={false}
          />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: 16, fontWeight: 700 }}>
          تنظیمات (بدون آیکون)
        </h3>
        <div style={{ maxWidth: '400px' }}>
          <RadioGroup
            name="preferences"
            options={preferenceOptions}
            value={preferences}
            onChange={setPreferences}
            isMobile={false}
          />
        </div>
      </div>

      <div
        style={{
          padding: '20px',
          backgroundColor: '#e7f4fa',
          borderRadius: '8px',
          border: '1px solid #bee5eb',
        }}
      >
        <h4 style={{ marginBottom: 12, fontWeight: 600 }}>خلاصه انتخاب‌ها:</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p>
            <strong>نقش کاربر:</strong>{' '}
            <span style={{ color: 'var(--color-primary)' }}>
              {roleOptions.find((opt) => opt.id === userRole)?.label}
            </span>
          </p>
          <p>
            <strong>تنظیمات:</strong>{' '}
            <span style={{ color: 'var(--color-primary)' }}>
              {preferenceOptions.find((opt) => opt.id === preferences)?.label}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
InteractiveExample.storyName = 'مثال تعاملی';

export const AllStates = () => {
  const [normalValue, setNormalValue] = React.useState('repair');
  const [selectedValue] = React.useState('user');
  const [disabledValue] = React.useState('admin');

  const stateOptions: RadioOption[] = [
    { id: 'repair', label: 'حالت عادی', icon: <Wrench /> },
    { id: 'user', label: 'حالت انتخاب شده', icon: <User /> },
    { id: 'admin', label: 'حالت غیرفعال', icon: <Settings /> },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <h3 style={{ marginBottom: 16, fontWeight: 700 }}>
          حالت عادی (قابل تغییر)
        </h3>
        <div style={{ maxWidth: '400px' }}>
          <RadioGroup
            name="normal-state"
            options={stateOptions}
            value={normalValue}
            onChange={setNormalValue}
            isMobile={false}
          />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: 16, fontWeight: 700 }}>
          حالت انتخاب شده (ثابت)
        </h3>
        <div style={{ maxWidth: '400px' }}>
          <RadioGroup
            name="selected-state"
            options={stateOptions}
            value={selectedValue}
            onChange={() => {}} // No change allowed
            isMobile={false}
          />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: 16, fontWeight: 700 }}>حالت غیرفعال</h3>
        <div style={{ maxWidth: '400px' }}>
          <RadioGroup
            name="disabled-state"
            options={stateOptions}
            value={disabledValue}
            onChange={() => {}}
            disabled
            isMobile={false}
          />
        </div>
      </div>
    </div>
  );
};
AllStates.storyName = 'تمام حالت‌ها';
