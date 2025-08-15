import { useEffect, useState } from 'react';
import { Pagination } from '@/components/Pagination/Pagination';

export default {
  title: 'Components/Pagination (Unified)',
  component: Pagination,
  parameters: {
    docs: {
      description: {
        component: `کامپوننت Pagination هم به صورت Controlled و هم Uncontrolled قابل استفاده است.
        
- حالت Controlled: وضعیت صفحه فعال توسط والد مدیریت می‌شود.
- حالت Uncontrolled: وضعیت صفحه درون خود کامپوننت نگهداری می‌شود.

مناسب برای نمایش لیست صفحات با قابلیت سفارشی‌سازی بالا.
        `,
      },
    },
  },
  argTypes: {
    pageCount: {
      name: 'تعداد صفحات',
      control: { type: 'number', min: 2, max: 20 },
      defaultValue: 7,
    },
    defaultPage: {
      name: 'صفحه اولیه (uncontrolled)',
      control: { type: 'number', min: 1, max: 20 },
      defaultValue: 1,
    },
    page: {
      name: 'صفحه فعال (controlled)',
      control: { type: 'number', min: 1, max: 20 },
      defaultValue: undefined,
    },
    baseUrl: {
      name: 'Base URL',
      control: { type: 'text' },
      defaultValue: '/products',
      description: 'آدرس پایه برای ساخت href ها (مثال: /products)',
    },
    isMobile: {
      name: 'حالت موبایل',
      control: { type: 'boolean' },
      defaultValue: false,
      description: 'تعیین حالت موبایل یا دسکتاپ',
    },
  },
};

type StoryProps = {
  pageCount: number;
  defaultPage: number;
  baseUrl: string;
  isMobile: boolean;
};

export const Uncontrolled = ({
  pageCount,
  defaultPage,
  baseUrl,
  isMobile,
}: StoryProps) => (
  <div dir="rtl" style={{ width: 480, margin: 'auto' }}>
    <Pagination
      pageCount={pageCount}
      defaultPage={defaultPage}
      baseUrl={baseUrl}
      onPageChange={() => {}}
      isMobile={isMobile}
    />
  </div>
);

Uncontrolled.storyName = 'Uncontrolled (داخلی)';
Uncontrolled.args = {
  pageCount: 7,
  defaultPage: 2,
  baseUrl: '/products',
  isMobile: false,
};

export const Controlled = ({
  pageCount,
  defaultPage,
  baseUrl,
  isMobile,
}: StoryProps) => {
  const [page, setPage] = useState(defaultPage);

  useEffect(() => {
    setPage(defaultPage);
  }, [defaultPage]);

  return (
    <div dir="rtl" style={{ width: 480, margin: 'auto' }}>
      <Pagination
        pageCount={pageCount}
        page={page}
        onPageChange={setPage}
        baseUrl={baseUrl}
        isMobile={isMobile}
      />
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        صفحه فعلی:{' '}
        <span style={{ color: '#590DB8', fontWeight: 700 }}>{page}</span>
      </div>
    </div>
  );
};

Controlled.storyName = 'Controlled (کنترل‌شده)';
Controlled.args = {
  pageCount: 10,
  defaultPage: 1,
  baseUrl: '/products',
  isMobile: false,
};

export const ResponsiveComparison = () => {
  const [desktopPage, setDesktopPage] = useState(1);
  const [mobilePage, setMobilePage] = useState(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <div>
        <h3 style={{ marginBottom: 16, fontWeight: 700 }}>نسخه دسکتاپ</h3>
        <div dir="rtl" style={{ width: 480, margin: 'auto' }}>
          <Pagination
            pageCount={10}
            page={desktopPage}
            onPageChange={setDesktopPage}
            baseUrl="/products"
            isMobile={false}
          />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: 16, fontWeight: 700 }}>نسخه موبایل</h3>
        <div dir="rtl" style={{ width: 320, margin: 'auto' }}>
          <Pagination
            pageCount={10}
            page={mobilePage}
            onPageChange={setMobilePage}
            baseUrl="/products"
            isMobile
          />
        </div>
      </div>
    </div>
  );
};

ResponsiveComparison.storyName = 'مقایسه واکنش‌گرا';

// Demonstrates using a custom link component instead of <a/>
const DemoLink = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const { href, children, ...rest } = props;
  return (
    <a href={href} data-demo-link style={{ textDecoration: 'none' }} {...rest}>
      {children}
    </a>
  );
};

export const WithCustomLinkComponent = ({
  pageCount,
  defaultPage,
  baseUrl,
  isMobile,
}: StoryProps) => (
  <div dir="rtl" style={{ width: 480, margin: 'auto' }}>
    <Pagination
      pageCount={pageCount}
      defaultPage={defaultPage}
      baseUrl={baseUrl}
      // Note: keeping onPageChange prevents default navigation and lets Storybook stay on the same page
      onPageChange={() => {}}
      linkComponent={DemoLink}
      isMobile={isMobile}
    />
  </div>
);

WithCustomLinkComponent.storyName = 'With Custom Link Component';
WithCustomLinkComponent.args = {
  pageCount: 7,
  defaultPage: 2,
  baseUrl: '/products',
  isMobile: false,
};
