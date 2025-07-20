import { Select, SelectOption } from '@/components/Select/Select';
import { MobileProvider } from '@/contexts/MobileContext';
import React from 'react';

export default {
  title: 'Components/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component: `کامپوننت Select با قابلیت انتخاب یک گزینه از لیست، طراحی ریسپانسیو برای دسکتاپ و موبایل، لیبل شناور، ناوبری با کیبورد و پشتیبانی کامل از دسترسی‌پذیری. این کامپوننت مطابق با دیزاین سیستم و پالت رنگ پروژه طراحی شده است.`,
      },
    },
  },
  argTypes: {
    label: {
      name: 'برچسب',
      control: { type: 'text' },
      defaultValue: 'انتخاب شهر',
    },
    placeholder: {
      name: 'متن راهنما',
      control: { type: 'text' },
      defaultValue: 'انتخاب کنید',
    },
    value: {
      name: 'مقدار انتخاب شده (حالت کنترل شده)',
      description:
        'اگر مقداری انتخاب کنید، کامپوننت در حالت کنترل شده خواهد بود',
      control: { type: 'select' },
      options: ['', 'tehran', 'mashhad', 'isfahan', 'shiraz'],
    },
    disabled: {
      name: 'غیرفعال',
      control: { type: 'boolean' },
      defaultValue: false,
    },
    error: {
      name: 'خطا',
      control: { type: 'boolean' },
      defaultValue: false,
    },
    helperText: {
      name: 'متن راهنما',
      control: { type: 'text' },
    },
  },
};

const cities: SelectOption[] = [
  { value: 'tehran', label: 'تهران' },
  { value: 'mashhad', label: 'مشهد' },
  { value: 'isfahan', label: 'اصفهان' },
  { value: 'shiraz', label: 'شیراز' },
  { value: 'tabriz', label: 'تبریز' },
  { value: 'ahvaz', label: 'اهواز' },
  { value: 'qom', label: 'قم' },
  { value: 'karaj', label: 'کرج' },
];

const fruits: SelectOption[] = [
  { value: 'apple', label: 'سیب' },
  { value: 'banana', label: 'موز' },
  { value: 'orange', label: 'پرتقال' },
  { value: 'grape', label: 'انگور' },
  { value: 'strawberry', label: 'توت فرنگی' },
];

type StoryProps = {
  label: string;
  placeholder: string;
  value: string;
  disabled: boolean;
  error: boolean;
  helperText?: string;
};

export const Playground = (args: StoryProps) => {
  const { value: initialValue, ...restArgs } = args;
  const [selectedValue, setSelectedValue] = React.useState(initialValue || '');

  // Update internal state when args change
  React.useEffect(() => {
    setSelectedValue(initialValue || '');
  }, [initialValue]);

  const handleChange = (value: string) => {
    setSelectedValue(value);
    console.log('Selected:', value);
  };

  return (
    <div className="p-4">
      <Select
        {...restArgs}
        options={cities}
        value={selectedValue}
        onChange={handleChange}
      />
    </div>
  );
};
Playground.storyName = 'پلی‌گراند';
Playground.args = {
  label: 'انتخاب شهر',
  placeholder: 'انتخاب کنید',
  value: '',
  disabled: false,
  error: false,
};

export const BasicUsage = () => {
  const [controlledValue, setControlledValue] = React.useState('mashhad');

  return (
    <div className="p-4 space-y-4">
      <div>
        <h3 className="mb-2 text-lg font-bold">
          حالت غیرکنترل شده (Uncontrolled)
        </h3>
        <Select
          label="انتخاب شهر"
          placeholder="انتخاب کنید"
          options={cities}
          onChange={(value) => console.log('Selected city:', value)}
        />
      </div>

      <div>
        <h3 className="mb-2 text-lg font-bold">
          غیرکنترل شده با مقدار پیش‌فرض
        </h3>
        <Select
          label="انتخاب شهر"
          placeholder="انتخاب کنید"
          options={cities}
          defaultValue="tehran"
          onChange={(value) => console.log('Selected city:', value)}
        />
      </div>

      <div>
        <h3 className="mb-2 text-lg font-bold">حالت کنترل شده (Controlled)</h3>
        <p className="mb-2 text-sm text-neutral-main">
          مقدار فعلی: {controlledValue}
        </p>
        <Select
          label="انتخاب شهر"
          placeholder="انتخاب کنید"
          options={cities}
          value={controlledValue}
          onChange={(value) => {
            setControlledValue(value);
            console.log('Controlled selected city:', value);
          }}
        />
      </div>
    </div>
  );
};
BasicUsage.storyName = 'استفاده پایه';

export const States = () => {
  const [selectedValue, setSelectedValue] = React.useState('apple');
  const [disabledValue, setDisabledValue] = React.useState('banana');

  return (
    <div className="p-4 space-y-6">
      <div>
        <h3 className="mb-2 text-lg font-bold">حالت عادی</h3>
        <Select
          label="انتخاب میوه"
          placeholder="میوه مورد نظر خود را انتخاب کنید"
          options={fruits}
          onChange={(value) => console.log('Selected fruit:', value)}
        />
      </div>

      <div>
        <h3 className="mb-2 text-lg font-bold">حالت انتخاب شده</h3>
        <Select
          label="انتخاب میوه"
          placeholder="میوه مورد نظر خود را انتخاب کنید"
          options={fruits}
          value={selectedValue}
          onChange={(value) => {
            setSelectedValue(value);
            console.log('Selected fruit:', value);
          }}
        />
      </div>

      <div>
        <h3 className="mb-2 text-lg font-bold">حالت غیرفعال</h3>
        <Select
          label="انتخاب میوه"
          placeholder="میوه مورد نظر خود را انتخاب کنید"
          options={fruits}
          disabled
          onChange={(value) => console.log('Selected fruit:', value)}
        />
      </div>

      <div>
        <h3 className="mb-2 text-lg font-bold">حالت غیرفعال با مقدار</h3>
        <Select
          label="انتخاب میوه"
          placeholder="میوه مورد نظر خود را انتخاب کنید"
          options={fruits}
          value={disabledValue}
          disabled
          onChange={(value) => {
            setDisabledValue(value);
            console.log('Selected fruit:', value);
          }}
        />
      </div>

      <div>
        <h3 className="mb-2 text-lg font-bold">حالت خطا</h3>
        <Select
          label="انتخاب میوه"
          placeholder="میوه مورد نظر خود را انتخاب کنید"
          options={fruits}
          error
          helperText="لطفا یک میوه انتخاب کنید"
          onChange={(value) => console.log('Selected fruit:', value)}
        />
      </div>
    </div>
  );
};
States.storyName = 'حالت‌های مختلف';

export const WithHelperText = () => {
  return (
    <div className="p-4 space-y-4">
      <Select
        label="انتخاب شهر"
        placeholder="انتخاب کنید"
        options={cities}
        helperText="شهر محل سکونت خود را انتخاب کنید"
        onChange={(value) => console.log('Selected city:', value)}
      />

      <Select
        label="انتخاب میوه"
        placeholder="انتخاب کنید"
        options={fruits}
        error
        helperText="این فیلد اجباری است"
        onChange={(value) => console.log('Selected fruit:', value)}
      />
    </div>
  );
};
WithHelperText.storyName = 'با متن راهنما';

export const MobileView = () => {
  const [selectedMobileValue, setSelectedMobileValue] =
    React.useState('mashhad');
  const [disabledMobileValue, setDisabledMobileValue] =
    React.useState('isfahan');

  return (
    <MobileProvider userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15">
      <div className="p-4 space-y-6 max-w-sm">
        <div>
          <h3 className="mb-2 text-lg font-bold">نمای موبایل - پیش‌فرض</h3>
          <Select
            label="انتخاب شهر"
            placeholder="انتخاب کنید"
            options={cities}
            onChange={(value) => console.log('Selected city:', value)}
          />
        </div>

        <div>
          <h3 className="mb-2 text-lg font-bold">نمای موبایل - انتخاب شده</h3>
          <Select
            label="انتخاب شهر"
            placeholder="انتخاب کنید"
            options={cities}
            value={selectedMobileValue}
            onChange={(value) => {
              setSelectedMobileValue(value);
              console.log('Selected city:', value);
            }}
          />
        </div>

        <div>
          <h3 className="mb-2 text-lg font-bold">نمای موبایل - غیرفعال</h3>
          <Select
            label="انتخاب شهر"
            placeholder="انتخاب کنید"
            options={cities}
            value={disabledMobileValue}
            disabled
            onChange={(value) => {
              setDisabledMobileValue(value);
              console.log('Selected city:', value);
            }}
          />
        </div>
      </div>
    </MobileProvider>
  );
};
MobileView.storyName = 'نمای موبایل';

export const LongList = () => {
  const longCityList: SelectOption[] = [
    { value: 'tehran', label: 'تهران' },
    { value: 'mashhad', label: 'مشهد' },
    { value: 'isfahan', label: 'اصفهان' },
    { value: 'shiraz', label: 'شیراز' },
    { value: 'tabriz', label: 'تبریز' },
    { value: 'ahvaz', label: 'اهواز' },
    { value: 'qom', label: 'قم' },
    { value: 'karaj', label: 'کرج' },
    { value: 'urmia', label: 'ارومیه' },
    { value: 'rasht', label: 'رشت' },
    { value: 'zahedan', label: 'زاهدان' },
    { value: 'hamedan', label: 'همدان' },
    { value: 'yazd', label: 'یزد' },
    { value: 'ardabil', label: 'اردبیل' },
    { value: 'bandar_abbas', label: 'بندرعباس' },
    { value: 'arak', label: 'اراک' },
  ];

  return (
    <div className="p-4">
      <h3 className="mb-4 text-lg font-bold">لیست طولانی گزینه‌ها</h3>
      <Select
        label="انتخاب شهر"
        placeholder="انتخاب کنید"
        options={longCityList}
        helperText="از میان ۱۶ شهر یکی را انتخاب کنید"
        onChange={(value) => console.log('Selected city:', value)}
      />
    </div>
  );
};
LongList.storyName = 'لیست طولانی';

export const MultipleSelects = () => {
  return (
    <div className="p-4 space-y-4">
      <h3 className="mb-4 text-lg font-bold">چندین Select در کنار هم</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="شهر مبدا"
          placeholder="انتخاب کنید"
          options={cities}
          onChange={(value) => console.log('Origin city:', value)}
        />

        <Select
          label="شهر مقصد"
          placeholder="انتخاب کنید"
          options={cities}
          onChange={(value) => console.log('Destination city:', value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          label="نوع خودرو"
          placeholder="انتخاب کنید"
          options={[
            { value: 'sedan', label: 'سدان' },
            { value: 'hatchback', label: 'هاچ‌بک' },
            { value: 'suv', label: 'شاسی بلند' },
            { value: 'coupe', label: 'کوپه' },
          ]}
          onChange={(value) => console.log('Car type:', value)}
        />

        <Select
          label="رنگ"
          placeholder="انتخاب کنید"
          options={[
            { value: 'white', label: 'سفید' },
            { value: 'black', label: 'مشکی' },
            { value: 'silver', label: 'نقره‌ای' },
            { value: 'red', label: 'قرمز' },
          ]}
          onChange={(value) => console.log('Color:', value)}
        />

        <Select
          label="سال تولید"
          placeholder="انتخاب کنید"
          options={[
            { value: '2024', label: '۱۴۰۳' },
            { value: '2023', label: '۱۴۰۲' },
            { value: '2022', label: '۱۴۰۱' },
            { value: '2021', label: '۱۴۰۰' },
          ]}
          onChange={(value) => console.log('Year:', value)}
        />
      </div>
    </div>
  );
};
MultipleSelects.storyName = 'چندین Select';

export const ControlledVsUncontrolled = () => {
  const [controlledValue, setControlledValue] = React.useState('');
  const [controlledValue2, setControlledValue2] = React.useState('isfahan');

  return (
    <div className="p-4 space-y-6">
      <div>
        <h3 className="mb-2 text-lg font-bold">
          کامپوننت غیرکنترل شده (Uncontrolled)
        </h3>
        <p className="mb-2 text-sm text-neutral-main">
          کامپوننت خودش وضعیت انتخاب را مدیریت می‌کند
        </p>
        <Select
          label="انتخاب میوه"
          placeholder="میوه مورد علاقه‌تان را انتخاب کنید"
          options={fruits}
          onChange={(value) => console.log('Uncontrolled selected:', value)}
        />
      </div>

      <div>
        <h3 className="mb-2 text-lg font-bold">
          کامپوننت کنترل شده (Controlled)
        </h3>
        <p className="mb-2 text-sm text-neutral-main">
          مقدار انتخاب شده: {controlledValue || 'هیچ'}
        </p>
        <Select
          label="انتخاب شهر"
          placeholder="انتخاب کنید"
          options={cities}
          value={controlledValue}
          onChange={(value) => {
            setControlledValue(value);
            console.log('Controlled selected:', value);
          }}
        />
        <div className="mt-2 space-x-2">
          <button
            type="button"
            onClick={() => setControlledValue('tehran')}
            className="px-3 py-1 text-sm bg-primary text-white rounded"
          >
            انتخاب تهران
          </button>
          <button
            type="button"
            onClick={() => setControlledValue('')}
            className="px-3 py-1 text-sm bg-neutral-main text-white rounded"
          >
            پاک کردن انتخاب
          </button>
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-lg font-bold">کنترل شده با مقدار اولیه</h3>
        <p className="mb-2 text-sm text-neutral-main">
          مقدار انتخاب شده: {controlledValue2}
        </p>
        <Select
          label="انتخاب شهر"
          placeholder="انتخاب کنید"
          options={cities}
          value={controlledValue2}
          onChange={(value) => {
            setControlledValue2(value);
            console.log('Controlled with initial selected:', value);
          }}
        />
      </div>
    </div>
  );
};
ControlledVsUncontrolled.storyName = 'کنترل شده در مقابل غیرکنترل شده';
