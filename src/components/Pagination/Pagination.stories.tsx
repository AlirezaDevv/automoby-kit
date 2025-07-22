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
  isMobile: boolean;
};

export const Uncontrolled = ({
  pageCount,
  defaultPage,
  isMobile,
}: StoryProps) => (
  <div dir="rtl" style={{ width: 480, margin: 'auto' }}>
    <Pagination
      pageCount={pageCount}
      defaultPage={defaultPage}
      onPageChange={() => {}}
      isMobile={isMobile}
    />
  </div>
);

Uncontrolled.storyName = 'Uncontrolled (داخلی)';
Uncontrolled.args = {
  pageCount: 7,
  defaultPage: 2,
  isMobile: false,
};

export const Controlled = ({
  pageCount,
  defaultPage,
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
            isMobile={true}
          />
        </div>
      </div>
    </div>
  );
};

ResponsiveComparison.storyName = 'مقایسه واکنش‌گرا';
