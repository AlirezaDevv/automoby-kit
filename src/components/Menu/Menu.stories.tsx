import React from 'react';
import { Menu, MenuItem } from '@/components/Menu/Menu';

export default {
  title: 'Components/Menu',
  component: Menu,
  parameters: {
    docs: {
      description: {
        component: `کامپوننت Menu با قابلیت‌های کامل شامل:

**قابلیت‌های اصلی:**
- باز و بسته شدن خودکار
- پشتیبانی از لینک و دکمه
- قابلیت کلیک روی آیتم‌ها
- Accessibility کامل

**قابلیت ریسپانسیو:**
- تنظیم خودکار سایز دکمه برای صفحه‌های مختلف
- موقعیت‌یابی هوشمند dropdown در موبایل و دسکتاپ
- فضابندی متناسب با اندازه صفحه
- بهینه‌سازی برای تعامل لمسی در موبایل`,
      },
    },
  },
  argTypes: {
    buttonText: {
      name: 'متن دکمه اصلی',
      control: { type: 'text' },
      defaultValue: 'محمد ابراهیم فرجامی',
    },
    disabled: {
      name: 'غیرفعال',
      control: { type: 'boolean' },
      defaultValue: false,
    },
    isOpen: {
      name: 'باز (کنترل شده)',
      control: { type: 'boolean' },
    },
    wrapperClassName: {
      name: 'کلاس wrapper',
      control: { type: 'text' },
      description: 'کلاس‌های اضافی برای wrapper منو',
    },
    buttonClassName: {
      name: 'کلاس دکمه',
      control: { type: 'text' },
      description: 'کلاس‌های اضافی برای دکمه اصلی منو',
    },
    items: {
      name: 'آیتم‌های منو',
      control: { type: 'object' },
    },
  },
};

// Default menu items for stories
const defaultMenuItems: MenuItem[] = [
  {
    id: 'profile',
    label: 'پروفایل',
    onClick: () => console.log('Profile clicked'),
  },
  {
    id: 'logout',
    label: 'خروج',
    onClick: () => console.log('Logout clicked'),
  },
];

const menuItemsWithLinks: MenuItem[] = [
  {
    id: 'profile',
    label: 'پروفایل',
    href: '/profile',
    onClick: () => console.log('Profile link clicked'),
  },
  {
    id: 'settings',
    label: 'تنظیمات',
    href: '/settings',
    onClick: () => console.log('Settings link clicked'),
  },
  {
    id: 'logout',
    label: 'خروج',
    onClick: () => console.log('Logout clicked'),
  },
];

const menuItemsWithDisabled: MenuItem[] = [
  {
    id: 'profile',
    label: 'پروفایل',
    onClick: () => console.log('Profile clicked'),
  },
  {
    id: 'settings',
    label: 'تنظیمات',
    disabled: true,
    onClick: () => console.log('Settings clicked'),
  },
  {
    id: 'logout',
    label: 'خروج',
    onClick: () => console.log('Logout clicked'),
  },
];

const manyMenuItems: MenuItem[] = [
  {
    id: 'profile',
    label: 'پروفایل',
    href: '/profile',
    onClick: () => console.log('Profile clicked'),
  },
  {
    id: 'settings',
    label: 'تنظیمات',
    href: '/settings',
    onClick: () => console.log('Settings clicked'),
  },
  {
    id: 'orders',
    label: 'سفارشات من',
    href: '/orders',
    onClick: () => console.log('Orders clicked'),
  },
  {
    id: 'favorites',
    label: 'علاقه‌مندی‌ها',
    href: '/favorites',
    onClick: () => console.log('Favorites clicked'),
  },
  {
    id: 'help',
    label: 'راهنما',
    href: '/help',
    onClick: () => console.log('Help clicked'),
  },
  {
    id: 'logout',
    label: 'خروج',
    onClick: () => console.log('Logout clicked'),
  },
];

type StoryProps = {
  buttonText: string;
  disabled: boolean;
  isOpen?: boolean;
  wrapperClassName?: string;
  buttonClassName?: string;
  items: MenuItem[];
};

export const Playground = (args: StoryProps) => (
  <div style={{ padding: '50px', minHeight: '300px' }}>
    <Menu
      {...args}
      onOpenChange={(isOpen) => console.log('Menu open state changed:', isOpen)}
    />
  </div>
);
Playground.storyName = 'پلی‌گراند';
Playground.args = {
  buttonText: 'محمد ابراهیم فرجامی',
  disabled: false,
  items: defaultMenuItems,
};

export const DefaultMenu = () => (
  <div style={{ padding: '50px', minHeight: '300px' }}>
    <Menu
      buttonText="محمد ابراهیم فرجامی"
      items={defaultMenuItems}
      onOpenChange={(isOpen) => console.log('Menu open state changed:', isOpen)}
    />
  </div>
);
DefaultMenu.storyName = 'منوی پیش‌فرض';

export const WithLinks = () => (
  <div style={{ padding: '50px', minHeight: '300px' }}>
    <Menu
      buttonText="ناحیه کاربری"
      items={menuItemsWithLinks}
      onOpenChange={(isOpen) => console.log('Menu open state changed:', isOpen)}
    />
  </div>
);
WithLinks.storyName = 'با لینک‌ها';

export const WithDisabledItems = () => (
  <div style={{ padding: '50px', minHeight: '300px' }}>
    <Menu
      buttonText="منوی کاربر"
      items={menuItemsWithDisabled}
      onOpenChange={(isOpen) => console.log('Menu open state changed:', isOpen)}
    />
  </div>
);
WithDisabledItems.storyName = 'با آیتم‌های غیرفعال';

export const DisabledMenu = () => (
  <div style={{ padding: '50px', minHeight: '300px' }}>
    <Menu
      buttonText="منوی غیرفعال"
      items={defaultMenuItems}
      disabled
      onOpenChange={(isOpen) => console.log('Menu open state changed:', isOpen)}
    />
  </div>
);
DisabledMenu.storyName = 'منوی غیرفعال';

export const ManyItems = () => (
  <div style={{ padding: '50px', minHeight: '400px' }}>
    <Menu
      buttonText="منوی کامل"
      items={manyMenuItems}
      onOpenChange={(isOpen) => console.log('Menu open state changed:', isOpen)}
    />
  </div>
);
ManyItems.storyName = 'آیتم‌های متعدد';

export const ControlledMenu = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div style={{ padding: '50px', minHeight: '300px' }}>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '16px' }}>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#590db8',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          باز کردن منو
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#6b688d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          بستن منو
        </button>
      </div>
      <Menu
        buttonText="منوی کنترل شده"
        items={defaultMenuItems}
        isOpen={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          console.log('Menu open state changed:', open);
        }}
      />
    </div>
  );
};
ControlledMenu.storyName = 'منوی کنترل شده';

export const CustomStyling = () => (
  <div style={{ padding: '50px', minHeight: '300px' }}>
    <div style={{ marginBottom: '30px' }}>
      <h3 style={{ marginBottom: '16px', fontFamily: 'var(--font-sans)' }}>
        منو با استایل‌های سفارشی
      </h3>
      <p style={{ marginBottom: '20px', color: '#666' }}>
        این مثال نشان می‌دهد که چگونه می‌توانید از wrapperClassName و
        buttonClassName برای سفارشی‌سازی ظاهر منو استفاده کنید.
      </p>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {/* Example 1: Custom wrapper with border */}
      <div>
        <h4 style={{ marginBottom: '12px', fontFamily: 'var(--font-sans)' }}>
          مثال ۱: Wrapper با حاشیه سفارشی
        </h4>
        <Menu
          buttonText="منو با حاشیه"
          items={defaultMenuItems}
          wrapperClassName="border-2 border-blue-500 rounded-lg p-4 bg-blue-50"
          onOpenChange={(isOpen) =>
            console.log('Bordered menu changed:', isOpen)
          }
        />
      </div>

      {/* Example 2: Custom button styling */}
      <div>
        <h4 style={{ marginBottom: '12px', fontFamily: 'var(--font-sans)' }}>
          مثال ۲: دکمه با استایل سفارشی
        </h4>
        <Menu
          buttonText="دکمه رنگارنگ"
          items={defaultMenuItems}
          buttonClassName="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          onOpenChange={(isOpen) =>
            console.log('Gradient menu changed:', isOpen)
          }
        />
      </div>

      {/* Example 3: Both wrapper and button custom styling */}
      <div>
        <h4 style={{ marginBottom: '12px', fontFamily: 'var(--font-sans)' }}>
          مثال ۳: هر دو wrapper و دکمه سفارشی
        </h4>
        <Menu
          buttonText="منو کامل سفارشی"
          items={menuItemsWithLinks}
          wrapperClassName="border border-green-400 rounded-xl p-6 bg-green-50 shadow-md"
          buttonClassName="bg-green-600 hover:bg-green-700 text-white border-green-600 font-bold text-lg px-8 py-4 rounded-xl shadow-lg"
          onOpenChange={(isOpen) =>
            console.log('Full custom menu changed:', isOpen)
          }
        />
      </div>

      {/* Example 4: Multiple menus with different styles */}
      <div>
        <h4 style={{ marginBottom: '12px', fontFamily: 'var(--font-sans)' }}>
          مثال ۴: چندین منو با استایل‌های مختلف
        </h4>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <Menu
            buttonText="منو ساده"
            items={defaultMenuItems}
            wrapperClassName="bg-gray-100 p-3 rounded-md"
            buttonClassName="bg-gray-600 text-white hover:bg-gray-700"
            onOpenChange={(isOpen) =>
              console.log('Simple menu changed:', isOpen)
            }
          />
          <Menu
            buttonText="منو مدرن"
            items={defaultMenuItems}
            wrapperClassName="bg-slate-100 p-3 rounded-full"
            buttonClassName="bg-slate-800 text-white hover:bg-slate-900 rounded-full shadow-md"
            onOpenChange={(isOpen) =>
              console.log('Modern menu changed:', isOpen)
            }
          />
          <Menu
            buttonText="منو کلاسیک"
            items={defaultMenuItems}
            wrapperClassName="bg-amber-50 p-3 rounded-none border-2 border-amber-300"
            buttonClassName="bg-amber-600 text-white hover:bg-amber-700 rounded-none border-2 border-amber-800 font-serif"
            onOpenChange={(isOpen) =>
              console.log('Classic menu changed:', isOpen)
            }
          />
        </div>
      </div>
    </div>
  </div>
);
CustomStyling.storyName = 'استایل‌های سفارشی';

export const ResponsiveDemo = () => (
  <div style={{ padding: '20px' }}>
    <h3 style={{ marginBottom: '20px', fontFamily: 'var(--font-sans)' }}>
      نمایش ریسپانسیو منو
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
      <strong>نکته:</strong> منو بر اساس اندازه صفحه تغییرات قابل توجه دارد:
      <br />
      📱 موبایل: کوچک‌ترین دکمه، dropdown تمام عرض
      <br />
      📱 Small: دکمه متوسط، dropdown موقعیت‌یابی هوشمند
      <br />
      💻 Medium: دکمه بزرگ‌تر، dropdown با عرض مشخص
      <br />
      🖥️ Large: دکمه کامل، dropdown کنار دکمه
      <br />
      🖥️ XL: دکمه حداکثر، dropdown بهینه شده
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
            minHeight: '200px',
            padding: '16px',
            border: '2px dashed #ccc',
            borderRadius: '8px',
            background: '#fff',
          }}
        >
          <div style={{ fontSize: '12px', color: '#999', marginBottom: '8px' }}>
            • دکمه کوچک‌تر و فشرده‌تر
            <br />• Dropdown تمام عرض صفحه
          </div>
          <Menu
            buttonText="کاربر"
            items={menuItemsWithLinks}
            onOpenChange={(isOpen) =>
              console.log('Mobile menu changed:', isOpen)
            }
          />
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
            minHeight: '200px',
            padding: '20px',
            border: '2px dashed #ccc',
            borderRadius: '8px',
            background: '#fff',
          }}
        >
          <div style={{ fontSize: '12px', color: '#999', marginBottom: '8px' }}>
            • سایز متوسط دکمه
            <br />• Dropdown با عرض مشخص
          </div>
          <Menu
            buttonText="حساب کاربری"
            items={menuItemsWithLinks}
            onOpenChange={(isOpen) =>
              console.log('Tablet menu changed:', isOpen)
            }
          />
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
            minHeight: '200px',
            padding: '24px',
            border: '2px dashed #ccc',
            borderRadius: '8px',
            background: '#fff',
          }}
        >
          <div style={{ fontSize: '12px', color: '#999', marginBottom: '8px' }}>
            • دکمه بزرگ و راحت
            <br />
            • Dropdown بهینه شده برای دسکتاپ
            <br />• فضابندی مناسب برای ماوس
          </div>
          <Menu
            buttonText="محمد ابراهیم فرجامی"
            items={manyMenuItems}
            onOpenChange={(isOpen) =>
              console.log('Desktop menu changed:', isOpen)
            }
          />
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
            minHeight: '200px',
            padding: '20px',
            border: '2px solid #590db8',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          }}
        >
          <div
            style={{ fontSize: '12px', color: '#666', marginBottom: '12px' }}
          >
            <strong>💡 نکته:</strong> اندازه پنجره مرورگر را تغییر دهید تا
            تغییرات ریسپانسیو را مشاهده کنید
          </div>
          <Menu
            buttonText="منوی ریسپانسیو"
            items={manyMenuItems}
            onOpenChange={(isOpen) =>
              console.log('Responsive menu changed:', isOpen)
            }
          />
        </div>
      </div>
    </div>
  </div>
);
ResponsiveDemo.storyName = 'نمایش ریسپانسیو';

export const AccessibilityDemo = () => (
  <div style={{ padding: '50px', minHeight: '300px' }}>
    <div style={{ marginBottom: '20px', fontFamily: 'var(--font-sans)' }}>
      <h3>راهنمای دسترسی:</h3>
      <ul style={{ marginTop: '10px', paddingRight: '20px' }}>
        <li>کلید Enter یا Space: باز/بسته کردن منو</li>
        <li>کلید Arrow Down: باز کردن منو</li>
        <li>کلید Escape: بستن منو</li>
        <li>Tab: حرکت بین آیتم‌ها</li>
        <li>کلیک خارج از منو: بستن منو</li>
      </ul>
    </div>
    <Menu
      buttonText="منوی قابل دسترس"
      items={defaultMenuItems}
      onOpenChange={(isOpen) => console.log('Accessible menu changed:', isOpen)}
      aria-label="منوی اصلی کاربر"
    />
  </div>
);
AccessibilityDemo.storyName = 'نمایش قابلیت دسترسی';
