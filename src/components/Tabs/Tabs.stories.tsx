import React from 'react';
import { Tabs, TabItem } from '@/components/Tabs/Tabs';

export default {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component: `کامپوننت Tabs با طراحی واکنش‌گرا برای موبایل و دسکتاپ. شامل پشتیبانی از بج شمارنده، حالت فعال، و تشخیص خودکار اندازه بر اساس MobileContext.`,
      },
    },
  },
  argTypes: {
    activeTab: {
      name: 'تب فعال',
      control: { type: 'text' },
      description: 'شناسه تب فعال',
    },
    isMobile: {
      name: 'حالت موبایل',
      control: { type: 'boolean' },
      defaultValue: false,
      description: 'اجبار حالت موبایل برای تست',
    },
  },
};

// Sample tab data
const sampleTabs: TabItem[] = [
  { id: 'barcode', label: 'بارکدخوان', count: 1 },
  { id: 'sort-list', label: 'لیست سورت', count: 12 },
  { id: 'locked-carts', label: 'سبدهای قفل', count: 1 },
];

const sampleTabsWithoutCounts: TabItem[] = [
  { id: 'tab1', label: 'تب اول' },
  { id: 'tab2', label: 'تب دوم' },
  { id: 'tab3', label: 'تب سوم' },
];

type StoryProps = {
  activeTab: string;
  isMobile: boolean;
};

export const Playground = ({
  activeTab: activeTabArg,
  isMobile,
}: StoryProps) => {
  const [activeTab, setActiveTab] = React.useState(activeTabArg || 'sort-list');

  React.useEffect(() => {
    setActiveTab(activeTabArg);
  }, [activeTabArg]);

  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <Tabs
        items={sampleTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isMobile={isMobile}
      />

      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
        }}
      >
        <h3>
          محتوای تب فعال:{' '}
          {sampleTabs.find((tab) => tab.id === activeTab)?.label}
        </h3>
        <p>این محتوا بر اساس تب انتخاب شده تغییر می‌کند.</p>
      </div>
    </div>
  );
};
Playground.storyName = 'پلی‌گراند';
Playground.args = {
  activeTab: 'sort-list',
  isMobile: false,
};

export const ResponsiveComparison = () => {
  const [desktopActiveTab, setDesktopActiveTab] = React.useState('sort-list');
  const [mobileActiveTab, setMobileActiveTab] = React.useState('sort-list');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <div>
        <h3 style={{ marginBottom: 16, fontWeight: 700 }}>نسخه دسکتاپ</h3>
        <div
          style={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <Tabs
            items={sampleTabs}
            activeTab={desktopActiveTab}
            onTabChange={setDesktopActiveTab}
            isMobile={false}
          />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: 16, fontWeight: 700 }}>نسخه موبایل</h3>
        <div
          style={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <Tabs
            items={sampleTabs}
            activeTab={mobileActiveTab}
            onTabChange={setMobileActiveTab}
            isMobile
          />
        </div>
      </div>
    </div>
  );
};
ResponsiveComparison.storyName = 'مقایسه موبایل و دسکتاپ';

export const WithoutBadges = () => {
  const [activeTab, setActiveTab] = React.useState('tab2');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <div>
        <h3 style={{ marginBottom: 16, fontWeight: 700 }}>
          بدون بج شمارنده - دسکتاپ
        </h3>
        <div
          style={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <Tabs
            items={sampleTabsWithoutCounts}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            isMobile={false}
          />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: 16, fontWeight: 700 }}>
          بدون بج شمارنده - موبایل
        </h3>
        <div
          style={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <Tabs
            items={sampleTabsWithoutCounts}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            isMobile
          />
        </div>
      </div>
    </div>
  );
};
WithoutBadges.storyName = 'بدون بج شمارنده';

export const MixedCounts = () => {
  const mixedTabs: TabItem[] = [
    { id: 'no-count', label: 'بدون شمارنده' },
    { id: 'low-count', label: 'تعداد کم', count: 3 },
    { id: 'high-count', label: 'تعداد زیاد', count: 99 },
    { id: 'zero-count', label: 'صفر', count: 0 },
  ];

  const [activeTab, setActiveTab] = React.useState('low-count');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <div>
        <h3 style={{ marginBottom: 16, fontWeight: 700 }}>
          ترکیب انواع مختلف - دسکتاپ
        </h3>
        <div
          style={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <Tabs
            items={mixedTabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            isMobile={false}
          />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: 16, fontWeight: 700 }}>
          ترکیب انواع مختلف - موبایل
        </h3>
        <div
          style={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <Tabs
            items={mixedTabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            isMobile
          />
        </div>
      </div>
    </div>
  );
};
MixedCounts.storyName = 'ترکیب انواع مختلف';

export const DisabledTabs = () => {
  const tabsWithDisabled: TabItem[] = [
    { id: 'active-tab', label: 'تب فعال', count: 5 },
    { id: 'disabled-tab', label: 'تب غیرفعال', count: 2, disabled: true },
    { id: 'normal-tab', label: 'تب عادی', count: 8 },
  ];

  const [activeTab, setActiveTab] = React.useState('active-tab');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <div>
        <h3 style={{ marginBottom: 16, fontWeight: 700 }}>
          شامل تب غیرفعال - دسکتاپ
        </h3>
        <div
          style={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <Tabs
            items={tabsWithDisabled}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            isMobile={false}
          />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: 16, fontWeight: 700 }}>
          شامل تب غیرفعال - موبایل
        </h3>
        <div
          style={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <Tabs
            items={tabsWithDisabled}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            isMobile
          />
        </div>
      </div>
    </div>
  );
};
DisabledTabs.storyName = 'تب‌های غیرفعال';

export const AutoResponsive = () => {
  const [activeTab, setActiveTab] = React.useState('sort-list');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <div>
        <h3 style={{ marginBottom: 16, fontWeight: 700 }}>
          تشخیص خودکار سایز (بر اساس MobileContext)
        </h3>
        <div
          style={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <Tabs
            items={sampleTabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
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
        <div
          style={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <Tabs
            items={sampleTabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            isMobile
          />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: 16, fontWeight: 700 }}>
          اجبار حالت دسکتاپ (isMobile=false)
        </h3>
        <div
          style={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <Tabs
            items={sampleTabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            isMobile={false}
          />
        </div>
      </div>
    </div>
  );
};
AutoResponsive.storyName = 'تشخیص خودکار سایز';

export const InteractiveExample = () => {
  const [activeTab, setActiveTab] = React.useState('sort-list');

  const dynamicTabs: TabItem[] = [
    { id: 'barcode', label: 'بارکدخوان', count: 1 },
    { id: 'sort-list', label: 'لیست سورت', count: 12 },
    { id: 'locked-carts', label: 'سبدهای قفل', count: 1 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h3 style={{ marginBottom: 16, fontWeight: 700 }}>مثال تعاملی</h3>
        <div
          style={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <Tabs
            items={dynamicTabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
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
        <h4 style={{ marginBottom: 8, fontWeight: 600 }}>تب فعال:</h4>
        <p
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: 'var(--color-primary)',
          }}
        >
          {dynamicTabs.find((tab) => tab.id === activeTab)?.label}
        </p>
        <p style={{ marginTop: 8, color: '#6c757d' }}>
          شمارنده: {dynamicTabs.find((tab) => tab.id === activeTab)?.count}
        </p>
      </div>
    </div>
  );
};
InteractiveExample.storyName = 'مثال تعاملی';
