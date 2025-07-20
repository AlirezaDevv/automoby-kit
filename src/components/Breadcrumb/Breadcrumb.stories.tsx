// src/components/Breadcrumb/Breadcrumb.stories.tsx

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
        `,
      },
    },
  },
  argTypes: {
    items: {
      name: 'آیتم‌های نقشه راه',
      control: { type: 'object' },
      description: 'آرایه‌ای از آیتم‌های breadcrumb شامل label، href و onClick',
    },
    className: {
      name: 'کلاس اضافی',
      control: { type: 'text' },
      description: 'کلاس‌های CSS اضافی برای سفارشی‌سازی ظاهر',
    },
    testIsMobile: {
      name: 'حالت موبایل (تست)',
      control: { type: 'boolean' },
      description: 'برای تست و نمایش حالت موبایل استفاده می‌شود',
    },
  },
  args: {
    items: [
      {
        label: 'صفحه اصلی',
        href: '/',
        onClick: () => console.log('home-clicked'),
      },
      {
        label: 'دسته‌بندی اول',
        href: '/category1',
        onClick: () => console.log('category1-clicked'),
      },
      {
        label: 'دسته‌بندی دوم',
        href: '/category2',
        onClick: () => console.log('category2-clicked'),
      },
      { label: 'صفحه فعلی' },
    ],
  },
};

export const Default = (args: StoryArgs) => <Breadcrumb {...args} />;

Default.storyName = 'پیش‌فرض (Default)';
Default.args = {
  items: [
    {
      label: 'صفحه اصلی',
      href: '/',
      onClick: () => console.log('home-clicked'),
    },
    {
      label: 'محصولات',
      href: '/products',
      onClick: () => console.log('products-clicked'),
    },
    {
      label: 'خودرو',
      href: '/products/cars',
      onClick: () => console.log('cars-clicked'),
    },
    {
      label: 'سدان',
      href: '/products/cars/sedan',
      onClick: () => console.log('sedan-clicked'),
    },
    { label: 'BMW سری 3' },
  ],
};

export const ShortBreadcrumb = (args: StoryArgs) => <Breadcrumb {...args} />;

ShortBreadcrumb.storyName = 'نقشه راه کوتاه';
ShortBreadcrumb.args = {
  items: [
    {
      label: 'صفحه اصلی',
      href: '/',
      onClick: () => console.log('home-clicked'),
    },
    { label: 'صفحه فعلی' },
  ],
};

export const LongBreadcrumb = (args: StoryArgs) => <Breadcrumb {...args} />;

LongBreadcrumb.storyName = 'نقشه راه بلند';
LongBreadcrumb.args = {
  items: [
    {
      label: 'صفحه اصلی',
      href: '/',
      onClick: () => console.log('home-clicked'),
    },
    {
      label: 'دسته‌بندی اول',
      href: '/cat1',
      onClick: () => console.log('cat1-clicked'),
    },
    {
      label: 'دسته‌بندی دوم',
      href: '/cat2',
      onClick: () => console.log('cat2-clicked'),
    },
    {
      label: 'دسته‌بندی سوم',
      href: '/cat3',
      onClick: () => console.log('cat3-clicked'),
    },
    {
      label: 'دسته‌بندی چهارم',
      href: '/cat4',
      onClick: () => console.log('cat4-clicked'),
    },
    {
      label: 'دسته‌بندی پنجم',
      href: '/cat5',
      onClick: () => console.log('cat5-clicked'),
    },
    { label: 'صفحه فعلی' },
  ],
};

export const WithClickHandlers = (args: StoryArgs) => <Breadcrumb {...args} />;

WithClickHandlers.storyName = 'با کنترل کننده کلیک';
WithClickHandlers.args = {
  items: [
    { label: 'خانه', onClick: () => console.log('navigate-to-home') },
    { label: 'فروشگاه', onClick: () => console.log('navigate-to-shop') },
    { label: 'جزئیات محصول' },
  ],
};

export const WithMixedNavigation = (args: StoryArgs) => (
  <Breadcrumb {...args} />
);

WithMixedNavigation.storyName = 'ناوبری ترکیبی';
WithMixedNavigation.args = {
  items: [
    { label: 'صفحه اصلی', href: '/' }, // Only href
    { label: 'درباره ما', onClick: () => console.log('about-clicked') }, // Only onClick
    {
      label: 'تیم ما',
      href: '/about/team',
      onClick: () => console.log('team-clicked'),
    }, // Both href and onClick
    { label: 'جزئیات عضو' }, // Neither (current page)
  ],
};

export const EnglishContent = (args: StoryArgs) => <Breadcrumb {...args} />;

EnglishContent.storyName = 'محتوای انگلیسی';
EnglishContent.args = {
  items: [
    { label: 'Home', href: '/', onClick: () => console.log('home-clicked') },
    {
      label: 'Products',
      href: '/products',
      onClick: () => console.log('products-clicked'),
    },
    {
      label: 'Electronics',
      href: '/electronics',
      onClick: () => console.log('electronics-clicked'),
    },
    { label: 'Current Page' },
  ],
};

// Desktop and Mobile comparison stories
export const DesktopView = (args: StoryArgs) => <Breadcrumb {...args} />;

DesktopView.storyName = 'نمایش دسکتاپ';
DesktopView.args = {
  testIsMobile: false,
  items: [
    { label: 'صفحه اصلی', onClick: () => console.log('home-clicked') },
    { label: 'صفحه پیشین', onClick: () => console.log('previous-clicked') },
    { label: 'صفحه پیشین', onClick: () => console.log('previous2-clicked') },
    { label: 'صفحه فعلی' },
  ],
};

export const MobileView = (args: StoryArgs) => <Breadcrumb {...args} />;

MobileView.storyName = 'نمایش موبایل';
MobileView.args = {
  testIsMobile: true,
  items: [
    { label: 'صفحه اصلی', onClick: () => console.log('home-clicked') },
    { label: 'صفحه پیشین', onClick: () => console.log('previous-clicked') },
    { label: 'صفحه پیشین', onClick: () => console.log('previous2-clicked') },
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
        testIsMobile={false}
        items={[
          { label: 'صفحه اصلی', onClick: () => console.log('home-clicked') },
          { label: 'محصولات', onClick: () => console.log('products-clicked') },
          { label: 'خودرو', onClick: () => console.log('cars-clicked') },
          { label: 'صفحه فعلی' },
        ]}
      />
    </div>
    <div>
      <h3 className="text-lg font-semibold mb-2 text-gray-700">
        Mobile View (10px font, 4px gap)
      </h3>
      <Breadcrumb
        testIsMobile
        items={[
          { label: 'صفحه اصلی', onClick: () => console.log('home-clicked') },
          { label: 'محصولات', onClick: () => console.log('products-clicked') },
          { label: 'خودرو', onClick: () => console.log('cars-clicked') },
          { label: 'صفحه فعلی' },
        ]}
      />
    </div>
  </div>
);

ResponsiveComparison.storyName = 'مقایسه واکنش‌گرا';
