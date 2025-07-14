import { Pagination } from '@/components/Pagination/Pagination';
import { useEffect, useState } from 'react';

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
  },
};

type StoryProps = {
  pageCount: number;
  defaultPage: number;
  page?: number;
};

export const Uncontrolled = (args: StoryProps) => (
  <div dir="rtl" style={{ width: 480, margin: 'auto' }}>
    <Pagination
      pageCount={args.pageCount}
      defaultPage={args.defaultPage}
      onPageChange={(p) => console.log('page changed:', p)}
    />
  </div>
);

Uncontrolled.storyName = 'Uncontrolled (داخلی)';
Uncontrolled.args = {
  pageCount: 7,
  defaultPage: 2,
};

export const Controlled = (args: StoryProps) => {
  const [page, setPage] = useState(args.defaultPage);

  useEffect(() => {
    setPage(args.defaultPage);
  }, [args.defaultPage]);

  return (
    <div dir="rtl" style={{ width: 480, margin: 'auto' }}>
      <Pagination
        pageCount={args.pageCount}
        page={page}
        onPageChange={setPage}
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
};
