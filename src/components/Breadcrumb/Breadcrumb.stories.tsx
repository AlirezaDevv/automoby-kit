// src/components/Breadcrumb/Breadcrumb.stories.tsx

import React from 'react';
import { Breadcrumb, BreadcrumbProps } from './Breadcrumb';

type StoryArgs = BreadcrumbProps;

export default {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    docs: {
      description: {
        component: `کامپوننت Breadcrumb برای نمایش مسیر فعلی کاربر در سایت طراحی شده است.

- **طراحی واکنش‌گرا:** در نسخه موبایل اندازه فونت و فاصله‌ها کوچک‌تر می‌شود.
- **پشتیبانی از RTL:** برای زبان‌های راست به چپ بهینه‌سازی شده است.
- **قابلیت کلیک:** تمام آیتم‌ها به جز آیتم آخر (صفحه فعلی) قابل کلیک هستند.
- **دسترسی‌پذیری:** با کیبورد قابل استفاده و شامل نشانگرهای مناسب است.
- **آیکون جداکننده:** از آیکون ChevronLeft به عنوان جداکننده استفاده می‌کند.
 - **کامپوننت سفارشی:** می‌توانید برای هر آیتم یک 'component' (مثل Link) بدهید تا بجای 'span' رندر شود.
 - **پشتیبانی از لینک:** در صورت ارسال 'href' (برای آیتم‌های غیر آخر)، آیتم به صورت لینک ('a') رندر می‌شود.
 - **عنوان:** می‌توانید 'title' نیز برای هر آیتم ارسال کنید.
 - **تایپوگرافی:** برای متن هر آیتم از کامپوننت Typography استفاده می‌شود.
        `,
      },
    },
  },
  argTypes: {
    items: {
      name: 'آیتم‌های نقشه راه',
      control: { type: 'object' },
      description: 'آرایه‌ای از آیتم‌های breadcrumb شامل label و onClick',
    },
    className: {
      name: 'کلاس اضافی',
      control: { type: 'text' },
      description: 'کلاس‌های CSS اضافی برای سفارشی‌سازی ظاهر',
    },
    isMobile: {
      name: 'حالت موبایل',
      control: { type: 'boolean' },
      description: 'تعیین حالت موبایل یا دسکتاپ',
    },
  },
  args: {
    items: [
      {
        label: 'صفحه اصلی',
        href: '/',
        title: 'بازگشت به صفحه اصلی',
        onClick: () => console.log('home-clicked'),
      },
      {
        label: 'دسته‌بندی اول',
        href: '/category-1',
        title: 'مشاهده دسته‌بندی اول',
        onClick: () => console.log('category1-clicked'),
      },
      {
        label: 'دسته‌بندی دوم',
        href: '/category-1/2',
        title: 'مشاهده دسته‌بندی دوم',
        onClick: () => console.log('category2-clicked'),
      },
      { label: 'صفحه فعلی' },
    ],
    isMobile: false,
  },
};

export const Default = (args: StoryArgs) => <Breadcrumb {...args} />;

Default.storyName = 'پیش‌فرض (Default)';
Default.args = {
  items: [
    {
      label: 'صفحه اصلی',
      href: '/',
      title: 'خانه',
      onClick: () => console.log('home-clicked'),
    },
    {
      label: 'محصولات',
      href: '/products',
      title: 'محصولات',
      onClick: () => console.log('products-clicked'),
    },
    {
      label: 'خودرو',
      href: '/products/cars',
      title: 'دسته خودرو',
      onClick: () => console.log('cars-clicked'),
    },
    { label: 'سدان', onClick: () => console.log('sedan-clicked') },
    { label: 'BMW سری 3' },
  ],
};

export const ShortBreadcrumb = (args: StoryArgs) => <Breadcrumb {...args} />;

ShortBreadcrumb.storyName = 'نقشه راه کوتاه';
ShortBreadcrumb.args = {
  items: [
    { label: 'صفحه اصلی', href: '/', title: 'خانه' },
    { label: 'صفحه فعلی' },
  ],
};

export const LongBreadcrumb = (args: StoryArgs) => <Breadcrumb {...args} />;

LongBreadcrumb.storyName = 'نقشه راه بلند';
LongBreadcrumb.args = {
  items: [
    { label: 'صفحه اصلی', href: '/' },
    { label: 'دسته‌بندی اول', href: '/c1' },
    { label: 'دسته‌بندی دوم', href: '/c1/c2' },
    { label: 'دسته‌بندی سوم', href: '/c1/c2/c3' },
    { label: 'دسته‌بندی چهارم', href: '/c1/c2/c3/c4' },
    { label: 'دسته‌بندی پنجم', href: '/c1/c2/c3/c4/c5' },
    { label: 'صفحه فعلی' },
  ],
};

export const WithClickHandlers = (args: StoryArgs) => <Breadcrumb {...args} />;

WithClickHandlers.storyName = 'با کنترل کننده کلیک';
WithClickHandlers.args = {
  items: [
    {
      label: 'خانه',
      href: '/',
      onClick: () => console.log('navigate-to-home'),
    },
    {
      label: 'فروشگاه',
      href: '/shop',
      title: 'Shop page',
      onClick: () => console.log('navigate-to-shop'),
    },
    { label: 'جزئیات محصول' },
  ],
};

export const WithMixedNavigation = (args: StoryArgs) => (
  <Breadcrumb {...args} />
);

WithMixedNavigation.storyName = 'ناوبری ترکیبی';
WithMixedNavigation.args = {
  items: [
    {
      label: 'صفحه اصلی',
      href: '/',
      onClick: () => console.log('home-clicked'),
    },
    {
      label: 'درباره ما',
      href: '/about',
      onClick: () => console.log('about-clicked'),
    },
    {
      label: 'تیم ما',
      href: '/about/team',
      onClick: () => console.log('team-clicked'),
    },
    { label: 'جزئیات عضو' },
  ],
};

export const EnglishContent = (args: StoryArgs) => (
  <div dir="ltr">
    <Breadcrumb {...args} />
  </div>
);

EnglishContent.storyName = 'محتوای انگلیسی';
EnglishContent.args = {
  items: [
    { label: 'Home', href: '/', title: 'Home' },
    { label: 'Products', href: '/products', title: 'Products' },
    { label: 'Electronics', onClick: () => console.log('electronics-clicked') },
    { label: 'Current Page' },
  ],
};

// Desktop and Mobile comparison stories
export const DesktopView = (args: StoryArgs) => <Breadcrumb {...args} />;

DesktopView.storyName = 'نمایش دسکتاپ';
DesktopView.args = {
  isMobile: false,
  items: [
    { label: 'صفحه اصلی', href: '/', title: 'خانه' },
    { label: 'صفحه پیشین', href: '/prev-1' },
    { label: 'صفحه پیشین', href: '/prev-2' },
    { label: 'صفحه فعلی' },
  ],
};

export const MobileView = (args: StoryArgs) => <Breadcrumb {...args} />;

MobileView.storyName = 'نمایش موبایل';
MobileView.args = {
  isMobile: true,
  items: [
    { label: 'صفحه اصلی', href: '/', title: 'خانه' },
    { label: 'صفحه پیشین', href: '/prev-1' },
    { label: 'صفحه پیشین', href: '/prev-2' },
    { label: 'صفحه فعلی' },
  ],
};

// Side by side comparison
export const ResponsiveComparison = () => (
  <div className="space-y-8">
    <div>
      <h3 className="text-lg font-semibold mb-2 text-gray-700">
        Desktop View (14px font, 12px gap)
      </h3>
      <Breadcrumb
        isMobile={false}
        items={[
          { label: 'صفحه اصلی', href: '/' },
          { label: 'محصولات', href: '/products' },
          { label: 'خودرو', href: '/products/cars' },
          { label: 'صفحه فعلی' },
        ]}
      />
    </div>
    <div>
      <h3 className="text-lg font-semibold mb-2 text-gray-700">
        Mobile View (10px font, 4px gap)
      </h3>
      <Breadcrumb
        isMobile
        items={[
          { label: 'صفحه اصلی', href: '/' },
          { label: 'محصولات', href: '/products' },
          { label: 'خودرو', href: '/products/cars' },
          { label: 'صفحه فعلی' },
        ]}
      />
    </div>
  </div>
);

ResponsiveComparison.storyName = 'مقایسه واکنش‌گرا';

// Custom component example (e.g., Next.js Link)
const MockLink: React.FC<React.ComponentPropsWithoutRef<'a'>> = ({
  href,
  title,
  className,
  children,
  ...rest
}) => (
  <a href={href} title={title} className={className} {...rest}>
    {children}
  </a>
);

export const WithCustomComponent = (args: StoryArgs) => (
  <Breadcrumb {...args} />
);

WithCustomComponent.storyName = 'با کامپوننت سفارشی';
WithCustomComponent.args = {
  items: [
    { label: 'Home', href: '/', component: MockLink, title: 'Go Home' },
    {
      label: 'Category',
      href: '/category',
      component: MockLink,
      title: 'View Category',
    },
    { label: 'Current Page' },
  ],
};
