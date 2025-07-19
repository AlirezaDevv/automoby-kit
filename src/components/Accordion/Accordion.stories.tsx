import { useState } from 'react';
import { User, HelpCircle, Settings, Info } from 'lucide-react';
import { Accordion, type AccordionProps } from './Accordion';
import { Typography } from '../Typography/Typography';

type StoryArgs = AccordionProps & {
  startIconType?: 'none' | 'number' | 'user' | 'help' | 'settings' | 'info';
};

export default {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    docs: {
      description: {
        component: `کامپوننت Accordion برای نمایش محتوای قابل باز و بسته شدن طراحی شده است.
        
- **Responsive Design:** اندازه‌ها و فاصله‌ها برای موبایل و دسکتاپ بهینه شده‌اند.
- **حالت کنترل شده و غیرکنترل شده:** قابلیت استفاده در هر دو حالت کنترل شده و غیرکنترل شده.
- **آیکون شروع:** امکان افزودن آیکون در ابتدای عنوان (مثل شماره، آیکون کاربری و...).
- **آیکون انتها:** آیکون Chevron که بر اساس وضعیت باز یا بسته تغییر می‌کند.
- **دسترسی‌پذیری:** شامل ARIA attributes مناسب برای استفاده توسط کاربران دارای نیازهای ویژه.
- **انیمیشن:** انتقال نرم بین حالت‌های باز و بسته.
- **Typography Integration:** متن عنوان و بدنه با کامپوننت Typography مدیریت می‌شود.
        `,
      },
    },
  },
  argTypes: {
    title: {
      name: 'متن عنوان',
      control: { type: 'text' },
    },
    body: {
      name: 'متن محتوا',
      control: { type: 'text' },
    },
    startIconType: {
      name: 'نوع آیکون شروع',
      control: { type: 'select' },
      options: ['none', 'number', 'user', 'help', 'settings', 'info'],
    },
    defaultExpanded: {
      name: 'باز بودن پیش‌فرض',
      control: { type: 'boolean' },
    },
    disabled: {
      name: 'غیرفعال',
      control: { type: 'boolean' },
    },
    forceMobile: {
      name: 'حالت موبایل اجباری',
      control: { type: 'boolean' },
    },
    // پراپ‌هایی که نباید در پنل کنترل نمایش داده شوند
    startIcon: { table: { disable: true } },
    isExpanded: { table: { disable: true } },
    onToggle: { table: { disable: true } },
  },
};

const getStartIcon = (type: StoryArgs['startIconType']) => {
  switch (type) {
    case 'number':
      return (
        <Typography
          variant="body-l-heavy"
          color="primary"
          className="text-center"
        >
          .۱
        </Typography>
      );
    case 'user':
      return <User size={20} className="text-primary" />;
    case 'help':
      return <HelpCircle size={20} className="text-primary" />;
    case 'settings':
      return <Settings size={20} className="text-primary" />;
    case 'info':
      return <Info size={20} className="text-primary" />;
    default:
      return undefined;
  }
};

export const Default = ({ startIconType, ...args }: StoryArgs) => (
  <div style={{ width: 600 }}>
    <Accordion {...args} startIcon={getStartIcon(startIconType)} />
  </div>
);

Default.storyName = 'پیش‌فرض (Default)';
Default.args = {
  title: 'می‌تونم لوازم یدکی رو با تخفیف بخرم؟',
  body: 'اگر رانندۀ اسنپی، می‌تونی هر محصولی رو که نیاز داری، تو اتوموبی با ۵% تخفیف بخری.\nکافیه شمارۀ موبایلت رو وارد کنی تا کد تخفیف برات پیامک بشه.',
  startIconType: 'number',
  defaultExpanded: false,
  disabled: false,
  forceMobile: false,
};

export const Mobile = ({ startIconType, ...args }: StoryArgs) => (
  <div style={{ width: 320 }}>
    <Accordion {...args} forceMobile startIcon={getStartIcon(startIconType)} />
  </div>
);

Mobile.storyName = 'نمای موبایل (Mobile)';
Mobile.args = {
  ...Default.args,
  title: 'کالا چه زمانی به دستت می‌رسه؟',
  body: 'اگر ساکن تهران باشی، روز سفارش برات ارسال می‌شه.\nاگر ساکن شهرستانی، ۱ الی ۲ روز بعد به دستت می‌رسه.',
  startIconType: 'number',
  defaultExpanded: true,
};

export const Desktop = ({ startIconType, ...args }: StoryArgs) => (
  <div style={{ width: 1000 }}>
    <Accordion
      {...args}
      forceMobile={false}
      startIcon={getStartIcon(startIconType)}
    />
  </div>
);

Desktop.storyName = 'نمای دسکتاپ (Desktop)';
Desktop.args = {
  ...Default.args,
  defaultExpanded: true,
};

export const ExpandedByDefault = (args: StoryArgs) => <Default {...args} />;
ExpandedByDefault.storyName = 'باز شده به صورت پیش‌فرض';
ExpandedByDefault.args = {
  ...Default.args,
  defaultExpanded: true,
  title: 'چطور می‌تونم سفارش بدم؟',
  body: 'می‌تونید از طریق وب‌سایت یا اپلیکیشن موبایل، محصولات مورد نظرتون رو انتخاب کنید و سفارش بدید. پردازی آنلاین یا پرداخت در محل هر دو امکان‌پذیرند.',
};

export const Disabled = (args: StoryArgs) => <Default {...args} />;
Disabled.storyName = 'حالت غیرفعال (Disabled)';
Disabled.args = {
  ...Default.args,
  disabled: true,
  title: 'این سوال در حال حاضر در دسترس نیست',
  body: 'محتوای این بخش موقتاً در دسترس نمی‌باشد.',
};

export const WithDifferentIcons = (args: StoryArgs) => (
  <div className="space-y-4" style={{ width: 600 }}>
    <Default {...args} startIconType="user" title="اطلاعات کاربری" />
    <Default {...args} startIconType="help" title="راهنما و پشتیبانی" />
    <Default {...args} startIconType="settings" title="تنظیمات حساب کاربری" />
    <Default {...args} startIconType="info" title="اطلاعات تماس" />
  </div>
);
WithDifferentIcons.storyName = 'انواع آیکون‌ها';
WithDifferentIcons.args = {
  ...Default.args,
  body: 'این یک متن نمونه برای نمایش محتوای آکاردئون است.',
};

export const MultipleAccordions = () => {
  const faqData = [
    {
      id: 1,
      title: 'می‌تونم لوازم یدکی رو با تخفیف بخرم؟',
      body: 'اگر رانندۀ اسنپی، می‌تونی هر محصولی رو که نیاز داری، تو اتوموبی با ۵% تخفیف بخری. کافیه شمارۀ موبایلت رو وارد کنی تا کد تخفیف برات پیامک بشه.',
    },
    {
      id: 2,
      title: 'چطور می‌تونم سفارش بدم؟',
      body: 'می‌تونید از طریق وب‌سایت یا اپلیکیشن موبایل، محصولات مورد نظرتون رو انتخاب کنید و سفارش بدید. پرداخت آنلاین یا پرداخت در محل هر دو امکان‌پذیرند.',
    },
    {
      id: 3,
      title: 'زمان تحویل چقدره؟',
      body: 'بسته به منطقه و نوع کالا، زمان تحویل بین ۲۴ ساعت تا ۷۲ ساعت متغیر است. برای کالاهای فوری، امکان تحویل در همان روز نیز وجود دارد.',
    },
  ];

  return (
    <div className="space-y-4" style={{ width: 600 }}>
      {faqData.map((item) => (
        <Accordion
          key={item.id}
          startIcon={
            <Typography
              variant="body-l-heavy"
              color="primary"
              className="text-center"
            >
              .{item.id}
            </Typography>
          }
          title={item.title}
          body={item.body}
        />
      ))}
    </div>
  );
};
MultipleAccordions.storyName = 'چندین آکاردئون (FAQ)';

export const MobileFAQ = () => {
  const faqData = [
    {
      id: 1,
      title: 'می‌شه لوازم یدکی رو با تخفیف خرید؟',
      body: 'اگر رانندۀ اسنپی، می‌تونی هر محصولی رو که نیاز داری، تو اتوموبی با ۵% تخفیف بخری.',
    },
    {
      id: 2,
      title: 'کالا چه زمانی به دستت می‌رسه؟',
      body: 'اگر ساکن تهران باشی، روز سفارش برات ارسال می‌شه. اگر ساکن شهرستانی، ۱ الی ۲ روز بعد به دستت می‌رسه.',
    },
    {
      id: 3,
      title: 'چطور سفارش بدم؟',
      body: 'از طریق وب‌سایت یا اپلیکیشن موبایل، محصولات مورد نظرتون رو انتخاب کنید.',
    },
  ];

  return (
    <div className="space-y-3" style={{ width: 320 }}>
      {faqData.map((item) => (
        <Accordion
          key={item.id}
          forceMobile
          startIcon={
            <Typography
              variant="body-s-heavy"
              color="primary"
              className="text-center"
            >
              .{item.id}
            </Typography>
          }
          title={item.title}
          body={item.body}
        />
      ))}
    </div>
  );
};
MobileFAQ.storyName = 'FAQ موبایل';

export const Controlled = (args: StoryArgs) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div style={{ width: 600 }}>
      <div className="mb-4">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
        >
          {isExpanded ? 'بستن آکاردئون' : 'باز کردن آکاردئون'}
        </button>
      </div>
      <Default {...args} isExpanded={isExpanded} onToggle={setIsExpanded} />
    </div>
  );
};
Controlled.storyName = 'کنترل شده (Controlled)';
Controlled.args = {
  ...Default.args,
  title: 'آکاردئون کنترل شده از بیرون',
  body: 'این آکاردئون توسط دکمه بالایی کنترل می‌شود. شما می‌توانید وضعیت آن را از طریق کد برنامه تغییر دهید.',
};

export const LongContent = (args: StoryArgs) => <Default {...args} />;
LongContent.storyName = 'محتوای طولانی';
LongContent.args = {
  ...Default.args,
  title: 'شرایط و قوانین استفاده',
  body: `شرایط استفاده از خدمات اتوموبی:

۱. کاربر موظف است اطلاعات صحیح و کامل ارائه دهد.
۲. استفاده از خدمات به منظور فعالیت‌های غیرقانونی ممنوع است.
۳. حریم خصوصی کاربران محترم شمرده می‌شود.
۴. تمامی قوانین جمهوری اسلامی ایران در این پلتفرم رعایت می‌شود.
۵. در صورت بروز هرگونه مشکل، لطفاً با پشتیبانی تماس بگیرید.

این متن به عنوان نمونه‌ای از محتوای طولانی در نظر گرفته شده است تا نحوه نمایش آکاردئون با محتوای زیاد مشخص شود. انیمیشن باز و بسته شدن باید به صورت نرم و طبیعی اجرا شود.`,
  startIconType: 'info',
};
