import React from 'react';
import { Menu, MenuItem } from '@/components/Menu/Menu';

export default {
  title: 'Components/Menu',
  component: Menu,
  parameters: {
    docs: {
      description: {
        component: `کامپوننت Menu با قابلیت باز و بسته شدن، پشتیبانی از لینک و دکمه، قابلیت کلیک روی آیتم‌ها، و accessibility کامل. این منو در حالت‌های مختلف نمایش و تعامل قابل استفاده است.`,
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

export const ResponsiveDemo = () => (
  <div style={{ padding: '20px' }}>
    <h3 style={{ marginBottom: '20px', fontFamily: 'var(--font-sans)' }}>
      نمایش در سایزهای مختلف
    </h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      {/* Desktop View */}
      <div>
        <h4 style={{ marginBottom: '16px', fontFamily: 'var(--font-sans)' }}>
          نمای دسکتاپ
        </h4>
        <div style={{ width: '100%', minHeight: '200px', padding: '20px' }}>
          <Menu
            buttonText="حساب کاربری من"
            items={menuItemsWithLinks}
            onOpenChange={(isOpen) =>
              console.log('Desktop menu changed:', isOpen)
            }
          />
        </div>
      </div>

      {/* Mobile View */}
      <div>
        <h4 style={{ marginBottom: '16px', fontFamily: 'var(--font-sans)' }}>
          نمای موبایل
        </h4>
        <div
          style={{
            width: '375px',
            minHeight: '200px',
            padding: '20px',
            border: '1px solid #eee',
            borderRadius: '8px',
          }}
        >
          <Menu
            buttonText="کاربر"
            items={menuItemsWithLinks}
            onOpenChange={(isOpen) =>
              console.log('Mobile menu changed:', isOpen)
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
