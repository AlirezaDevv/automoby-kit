import { Typography, TypographyProps } from './Typography';

export default {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    docs: {
      description: {
        component: `سیستم تایپوگرافی کامل مطابق با دیزاین سیستم شامل:

**قابلیت ریسپانسیو:**
- تمام متن‌ها دارای تنظیمات خودکار برای صفحه‌های مختلف
- در موبایل: سایز کوچک‌تر برای فضای محدود
- در تبلت: سایز متوسط 
- در دسکتاپ: سایز کامل و بهینه

**هدینگ‌ها (Headings):**
- H1: 36px / Heavy (900) - ریسپانسیو
- H2: 32px / Heavy (900) - ریسپانسیو
- H3: 28px / Heavy (900) - ریسپانسیو
- H4: 24px / Heavy (700) - ریسپانسیو
- H5: 22px / Heavy (700) - ریسپانسیو
- H6: 20px / Heavy (700) - ریسپانسیو

**متن بدنه (Body Copy):**
- XL: 20px / Heavy (700) - ریسپانسیو
- L: 18px / Heavy (700) & Bold (600) & Medium (400) - ریسپانسیو
- M: 16px / Heavy (700) & Bold (600) & Medium (400) - ریسپانسیو
- S: 14px / Heavy (700) & Bold (600) & Medium (400) - ریسپانسیو
- MS: 13px / Bold (600) & Medium (400) - ریسپانسیو
- XS: 12px / Bold (600) & Medium (400) - ریسپانسیو
- T: 10px / Bold (700) & Medium (400) - ریسپانسیو
- SS: 9px / Medium (400) - ریسپانسیو
        `,
      },
    },
  },
  argTypes: {
    variant: {
      name: 'نوع',
      control: { type: 'select' },
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'body-xl-heavy',
        'body-l-heavy',
        'body-l-bold',
        'body-l-medium',
        'body-m-heavy',
        'body-m-bold',
        'body-m-medium',
        'body-s-heavy',
        'body-s-bold',
        'body-s-medium',
        'body-ms-bold',
        'body-ms-medium',
        'body-xs-bold',
        'body-xs-medium',
        'body-t-bold',
        'body-t-medium',
        'body-ss-medium',
      ],
    },
    color: {
      name: 'رنگ',
      control: { type: 'select' },
      options: [
        'inherit',
        'primary',
        'secondary',
        'neutral-darker',
        'neutral-dark',
        'neutral-main',
        'white',
      ],
    },
    children: {
      name: 'متن',
      control: { type: 'text' },
      defaultValue: 'نمونه متن تایپوگرافی',
    },
  },
};

export const Playground = (args: TypographyProps) => <Typography {...args} />;
Playground.storyName = 'پلی‌گراند';
Playground.args = {
  variant: 'body-m-medium',
  children: 'نمونه متن تایپوگرافی',
  color: 'inherit',
};

export const AllHeadings = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <div
      style={{
        borderBottom: '1px solid #eee',
        paddingBottom: 8,
        marginBottom: 8,
      }}
    >
      <strong>هدینگ‌ها (Headings)</strong>
    </div>
    <Typography variant="h1">
      عنوان ۱ - Heading #1 (36px / Heavy 900)
    </Typography>
    <Typography variant="h2">
      عنوان ۲ - Heading #2 (32px / Heavy 900)
    </Typography>
    <Typography variant="h3">
      عنوان ۳ - Heading #3 (28px / Heavy 900)
    </Typography>
    <Typography variant="h4">
      عنوان ۴ - Heading #4 (24px / Heavy 700)
    </Typography>
    <Typography variant="h5">
      عنوان ۵ - Heading #5 (22px / Heavy 700)
    </Typography>
    <Typography variant="h6">
      عنوان ۶ - Heading #6 (20px / Heavy 700)
    </Typography>
  </div>
);
AllHeadings.storyName = 'تمام هدینگ‌ها';

export const BodyCopyVariants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <div
      style={{
        borderBottom: '1px solid #eee',
        paddingBottom: 8,
        marginBottom: 8,
      }}
    >
      <strong>متن بدنه (Body Copy)</strong>
    </div>

    <div>
      <div style={{ fontSize: '14px', color: '#666', marginBottom: 4 }}>
        BodyCopy / XL / Heavy (20px)
      </div>
      <Typography variant="body-xl-heavy">
        این متن نمونه برای BodyCopy XL Heavy است
      </Typography>
    </div>

    <div>
      <div style={{ fontSize: '14px', color: '#666', marginBottom: 4 }}>
        BodyCopy / L / Heavy (18px)
      </div>
      <Typography variant="body-l-heavy">
        این متن نمونه برای BodyCopy L Heavy است
      </Typography>
    </div>

    <div>
      <div style={{ fontSize: '14px', color: '#666', marginBottom: 4 }}>
        BodyCopy / L / Bold (18px)
      </div>
      <Typography variant="body-l-bold">
        این متن نمونه برای BodyCopy L Bold است
      </Typography>
    </div>

    <div>
      <div style={{ fontSize: '14px', color: '#666', marginBottom: 4 }}>
        BodyCopy / L / Medium (18px)
      </div>
      <Typography variant="body-l-medium">
        این متن نمونه برای BodyCopy L Medium است
      </Typography>
    </div>

    <div>
      <div style={{ fontSize: '14px', color: '#666', marginBottom: 4 }}>
        BodyCopy / M / Heavy (16px)
      </div>
      <Typography variant="body-m-heavy">
        این متن نمونه برای BodyCopy M Heavy است
      </Typography>
    </div>

    <div>
      <div style={{ fontSize: '14px', color: '#666', marginBottom: 4 }}>
        BodyCopy / M / Bold (16px)
      </div>
      <Typography variant="body-m-bold">
        این متن نمونه برای BodyCopy M Bold است
      </Typography>
    </div>

    <div>
      <div style={{ fontSize: '14px', color: '#666', marginBottom: 4 }}>
        BodyCopy / M / Medium (16px)
      </div>
      <Typography variant="body-m-medium">
        این متن نمونه برای BodyCopy M Medium است
      </Typography>
    </div>

    <div>
      <div style={{ fontSize: '14px', color: '#666', marginBottom: 4 }}>
        BodyCopy / S / Heavy (14px)
      </div>
      <Typography variant="body-s-heavy">
        این متن نمونه برای BodyCopy S Heavy است
      </Typography>
    </div>

    <div>
      <div style={{ fontSize: '14px', color: '#666', marginBottom: 4 }}>
        BodyCopy / S / Bold (14px)
      </div>
      <Typography variant="body-s-bold">
        این متن نمونه برای BodyCopy S Bold است
      </Typography>
    </div>

    <div>
      <div style={{ fontSize: '14px', color: '#666', marginBottom: 4 }}>
        BodyCopy / S / Medium (14px)
      </div>
      <Typography variant="body-s-medium">
        این متن نمونه برای BodyCopy S Medium است
      </Typography>
    </div>

    <div>
      <div style={{ fontSize: '14px', color: '#666', marginBottom: 4 }}>
        BodyCopy / MS / Bold (13px)
      </div>
      <Typography variant="body-ms-bold">
        این متن نمونه برای BodyCopy MS Bold است
      </Typography>
    </div>

    <div>
      <div style={{ fontSize: '14px', color: '#666', marginBottom: 4 }}>
        BodyCopy / MS / Medium (13px)
      </div>
      <Typography variant="body-ms-medium">
        این متن نمونه برای BodyCopy MS Medium است
      </Typography>
    </div>

    <div>
      <div style={{ fontSize: '14px', color: '#666', marginBottom: 4 }}>
        BodyCopy / XS / Bold (12px)
      </div>
      <Typography variant="body-xs-bold">
        این متن نمونه برای BodyCopy XS Bold است
      </Typography>
    </div>

    <div>
      <div style={{ fontSize: '14px', color: '#666', marginBottom: 4 }}>
        BodyCopy / XS / Medium (12px)
      </div>
      <Typography variant="body-xs-medium">
        این متن نمونه برای BodyCopy XS Medium است
      </Typography>
    </div>

    <div>
      <div style={{ fontSize: '14px', color: '#666', marginBottom: 4 }}>
        BodyCopy / T / Bold (10px)
      </div>
      <Typography variant="body-t-bold">
        این متن نمونه برای BodyCopy T Bold است
      </Typography>
    </div>

    <div>
      <div style={{ fontSize: '14px', color: '#666', marginBottom: 4 }}>
        BodyCopy / T / Medium (10px)
      </div>
      <Typography variant="body-t-medium">
        این متن نمونه برای BodyCopy T Medium است
      </Typography>
    </div>

    <div>
      <div style={{ fontSize: '14px', color: '#666', marginBottom: 4 }}>
        BodyCopy / SS / Medium (9px)
      </div>
      <Typography variant="body-ss-medium">
        این متن نمونه برای BodyCopy SS Medium است
      </Typography>
    </div>
  </div>
);
BodyCopyVariants.storyName = 'متن بدنه';

export const ColorVariants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <div
      style={{
        borderBottom: '1px solid #eee',
        paddingBottom: 8,
        marginBottom: 8,
      }}
    >
      <strong>رنگ‌های مختلف</strong>
    </div>
    <Typography variant="body-l-heavy" color="primary">
      متن با رنگ Primary
    </Typography>
    <Typography variant="body-l-heavy" color="secondary">
      متن با رنگ Secondary
    </Typography>
    <Typography variant="body-l-heavy" color="neutral-darker">
      متن با رنگ Neutral Darker
    </Typography>
    <Typography variant="body-l-heavy" color="neutral-dark">
      متن با رنگ Neutral Dark
    </Typography>
    <Typography variant="body-l-heavy" color="neutral-main">
      متن با رنگ Neutral Main
    </Typography>
    <div style={{ background: '#333', padding: 16, borderRadius: 8 }}>
      <Typography variant="body-l-heavy" color="white">
        متن با رنگ White
      </Typography>
    </div>
  </div>
);
ColorVariants.storyName = 'رنگ‌های مختلف';

export const ResponsiveTypography = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
    <div
      style={{
        borderBottom: '1px solid #eee',
        paddingBottom: 8,
        marginBottom: 8,
      }}
    >
      <strong>تایپوگرافی ریسپانسیو</strong>
      <p style={{ fontSize: '14px', color: '#666', marginTop: 4 }}>
        متن‌ها بر اساس اندازه صفحه تغییر سایز می‌دهند. اندازه پنجره را تغییر
        دهید تا تفاوت‌ها را ببینید.
      </p>
    </div>

    <div style={{ border: '1px dashed #ccc', padding: 16, borderRadius: 8 }}>
      <div style={{ fontSize: '12px', color: '#666', marginBottom: 8 }}>
        <strong>عناوین (Headings)</strong> - در موبایل کوچک‌تر، در دسکتاپ
        بزرگ‌تر
      </div>
      <Typography variant="h1" style={{ marginBottom: 8 }}>
        عنوان اصلی H1 - ریسپانسیو
      </Typography>
      <Typography variant="h2" style={{ marginBottom: 8 }}>
        عنوان فرعی H2 - ریسپانسیو
      </Typography>
      <Typography variant="h3" style={{ marginBottom: 8 }}>
        عنوان H3 - ریسپانسیو
      </Typography>
    </div>

    <div style={{ border: '1px dashed #ccc', padding: 16, borderRadius: 8 }}>
      <div style={{ fontSize: '12px', color: '#666', marginBottom: 8 }}>
        <strong>متن بدنه (Body Text)</strong> - تنظیم خودکار برای خوانایی بهتر
      </div>
      <Typography variant="body-xl-heavy" style={{ marginBottom: 8 }}>
        متن بزرگ و پررنگ - مناسب برای تاکید در تمام سایزها
      </Typography>
      <Typography variant="body-l-medium" style={{ marginBottom: 8 }}>
        متن متوسط - مناسب برای محتوای اصلی در تمام دستگاه‌ها
      </Typography>
      <Typography variant="body-m-medium" style={{ marginBottom: 8 }}>
        متن معمولی - خوانایی مطلوب در موبایل و دسکتاپ
      </Typography>
      <Typography variant="body-s-medium">
        متن کوچک - برای جزئیات و توضیحات اضافی
      </Typography>
    </div>

    <div
      style={{
        background: '#f5f5f5',
        padding: 16,
        borderRadius: 8,
        fontSize: '12px',
        color: '#666',
      }}
    >
      <strong>نکته:</strong> هر متن در سایزهای مختلف صفحه تغییرات قابل توجه
      دارد:
      <br />
      📱 موبایل (تا 640px): سایز کوچک برای فضای محدود
      <br />
      📱 Small (640px+): سایز متوسط برای تبلت‌های کوچک
      <br />
      💻 Medium (768px+): سایز بزرگ‌تر برای تبلت‌ها
      <br />
      🖥️ Large (1024px+): سایز کامل برای دسکتاپ
      <br />
      🖥️ XL (1280px+): سایز حداکثر برای صفحات بزرگ
    </div>
  </div>
);
ResponsiveTypography.storyName = 'تایپوگرافی ریسپانسیو';
