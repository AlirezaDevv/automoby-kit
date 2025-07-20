import { useState } from 'react';
import { X, Menu, Settings, User } from 'lucide-react';
import { Drawer, DrawerProps } from './Drawer';

type StoryArgs = DrawerProps & {
  triggerButtonText?: string;
};

export default {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    docs: {
      description: {
        component: `کامپوننت Drawer برای نمایش محتوای جانبی یا پنل‌های کشویی طراحی شده است.

- **جهت‌های مختلف:** قابلیت نمایش از چهار جهت top, bottom, left, right
- **حالت تمام‌صفحه:** با پراپ fullScreen می‌توان کشو را در تمام صفحه نمایش داد
- **بستن با کلیک خارج:** هنگامی که fullScreen فعال نیست، کلیک خارج از کشو آن را می‌بندد
- **کلید Escape:** امکان بستن کشو با کلید Escape
- **طراحی واکنش‌گرا:** با استفاده از useMobile برای سایزهای مختلف بهینه‌سازی شده
- **دسترسی‌پذیری:** شامل لیبل‌های aria و نقش‌های مناسب برای دسترسی‌پذیری
        `,
      },
    },
  },
  argTypes: {
    direction: {
      name: 'جهت (Direction)',
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
    },
    fullScreen: {
      name: 'تمام‌صفحه',
      control: { type: 'boolean' },
    },
    isOpen: {
      name: 'باز',
      control: { type: 'boolean' },
    },
    children: { table: { disable: true } },
    onClose: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export const Default = ({ triggerButtonText, ...args }: StoryArgs) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium"
      >
        {triggerButtonText || 'باز کردن کشو'}
      </button>

      <Drawer {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-neutral-darker">عنوان کشو</h2>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-neutral-light rounded-lg transition-colors"
              aria-label="بستن کشو"
            >
              <X size={20} />
            </button>
          </div>
          <p className="text-neutral-main leading-relaxed">
            این متن نمونه‌ای است که در داخل کشو نمایش داده می‌شود. شما می‌توانید
            هر نوع محتوایی را در این قسمت قرار دهید.
          </p>
          <div className="space-y-2">
            <button
              type="button"
              className="w-full text-right p-3 hover:bg-neutral-light rounded-lg transition-colors flex items-center gap-3"
            >
              <User size={20} className="text-neutral-main" />
              پروفایل کاربری
            </button>
            <button
              type="button"
              className="w-full text-right p-3 hover:bg-neutral-light rounded-lg transition-colors flex items-center gap-3"
            >
              <Settings size={20} className="text-neutral-main" />
              تنظیمات
            </button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};
Default.storyName = 'پیش‌فرض (Bottom)';
Default.args = {
  direction: 'bottom',
  fullScreen: false,
  triggerButtonText: 'باز کردن کشو از پایین',
};

export const TopDirection = (args: StoryArgs) => <Default {...args} />;
TopDirection.storyName = 'از بالا (Top)';
TopDirection.args = {
  ...Default.args,
  direction: 'top',
  triggerButtonText: 'باز کردن کشو از بالا',
};

export const LeftDirection = (args: StoryArgs) => <Default {...args} />;
LeftDirection.storyName = 'از چپ (Left)';
LeftDirection.args = {
  ...Default.args,
  direction: 'left',
  triggerButtonText: 'باز کردن کشو از چپ',
};

export const RightDirection = (args: StoryArgs) => <Default {...args} />;
RightDirection.storyName = 'از راست (Right)';
RightDirection.args = {
  ...Default.args,
  direction: 'right',
  triggerButtonText: 'باز کردن کشو از راست',
};

export const FullScreenDrawer = (args: StoryArgs) => <Default {...args} />;
FullScreenDrawer.storyName = 'تمام‌صفحه (Full Screen)';
FullScreenDrawer.args = {
  ...Default.args,
  fullScreen: true,
  triggerButtonText: 'باز کردن کشوی تمام‌صفحه',
};

export const NavigationDrawer = ({ triggerButtonText, ...args }: StoryArgs) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { icon: <User size={20} />, label: 'داشبورد', href: '#' },
    { icon: <Settings size={20} />, label: 'تنظیمات', href: '#' },
    { icon: <Menu size={20} />, label: 'منو', href: '#' },
  ];

  return (
    <div className="p-4">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium flex items-center gap-2"
      >
        <Menu size={20} />
        {triggerButtonText || 'منوی ناوبری'}
      </button>

      <Drawer {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-light pb-4">
            <h2 className="text-xl font-bold text-neutral-darker">
              منوی ناوبری
            </h2>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-neutral-light rounded-lg transition-colors"
              aria-label="بستن منو"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="w-full text-right p-3 hover:bg-primary-lightest hover:text-primary rounded-lg transition-colors flex items-center gap-3 text-neutral-darker"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-neutral-main">{item.icon}</span>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="border-t border-neutral-light pt-4">
            <button
              type="button"
              className="w-full bg-error text-white py-2 px-4 rounded-lg hover:bg-error/90 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              خروج از حساب
            </button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};
NavigationDrawer.storyName = 'منوی ناوبری';
NavigationDrawer.args = {
  direction: 'right',
  fullScreen: false,
  triggerButtonText: 'منوی ناوبری',
};

export const MobileVersion = (args: StoryArgs) => (
  <div className="max-w-sm mx-auto border border-neutral-light rounded-xl p-4 bg-neutral-lighter">
    <p className="text-sm text-neutral-main mb-4">نمایش در حالت موبایل:</p>
    <Default {...args} />
  </div>
);
MobileVersion.storyName = 'نسخه موبایل (Mobile)';
MobileVersion.args = {
  ...Default.args,
  direction: 'bottom',
  triggerButtonText: 'کشو موبایل',
};
