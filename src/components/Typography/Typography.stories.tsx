import {
  Typography,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  BodyText,
  TypographyProps,
} from './Typography';

export default {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    docs: {
      description: {
        component: `سیستم تایپوگرافی کامل مطابق با دیزاین سیستم شامل:

**هدینگ‌ها (Headings):**
- H1: 36px / Heavy (900)
- H2: 32px / Heavy (900) 
- H3: 28px / Heavy (900)
- H4: 24px / Heavy (700)
- H5: 22px / Heavy (700)
- H6: 20px / Heavy (700)

**متن بدنه (Body Copy):**
- XL: 20px / Heavy (700)
- L: 18px / Heavy (700) & Bold (600) & Medium (400)
- M: 16px / Heavy (700) & Bold (600) & Medium (400)
- S: 14px / Heavy (700) & Bold (600) & Medium (400)
- MS: 13px / Bold (600) & Medium (400)
- XS: 12px / Bold (600) & Medium (400)
- T: 10px / Bold (700) & Medium (400)
- SS: 9px / Medium (400)
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
    <Heading1>عنوان ۱ - Heading #1 (36px / Heavy 900)</Heading1>
    <Heading2>عنوان ۲ - Heading #2 (32px / Heavy 900)</Heading2>
    <Heading3>عنوان ۳ - Heading #3 (28px / Heavy 900)</Heading3>
    <Heading4>عنوان ۴ - Heading #4 (24px / Heavy 700)</Heading4>
    <Heading5>عنوان ۵ - Heading #5 (22px / Heavy 700)</Heading5>
    <Heading6>عنوان ۶ - Heading #6 (20px / Heavy 700)</Heading6>
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
      <BodyText variant="body-xl-heavy">
        این متن نمونه برای BodyCopy XL Heavy است
      </BodyText>
    </div>

    <div>
      <div style={{ fontSize: '14px', color: '#666', marginBottom: 4 }}>
        BodyCopy / L / Heavy (18px)
      </div>
      <BodyText variant="body-l-heavy">
        این متن نمونه برای BodyCopy L Heavy است
      </BodyText>
    </div>

    <div>
      <div style={{ fontSize: '14px', color: '#666', marginBottom: 4 }}>
        BodyCopy / L / Bold (18px)
      </div>
      <BodyText variant="body-l-bold">
        این متن نمونه برای BodyCopy L Bold است
      </BodyText>
    </div>

    <div>
      <div style={{ fontSize: '14px', color: '#666', marginBottom: 4 }}>
        BodyCopy / L / Medium (18px)
      </div>
      <BodyText variant="body-l-medium">
        این متن نمونه برای BodyCopy L Medium است
      </BodyText>
    </div>

    <div>
      <div style={{ fontSize: '14px', color: '#666', marginBottom: 4 }}>
        BodyCopy / M / Heavy (16px)
      </div>
      <BodyText variant="body-m-heavy">
        این متن نمونه برای BodyCopy M Heavy است
      </BodyText>
    </div>

    <div>
      <div style={{ fontSize: '14px', color: '#666', marginBottom: 4 }}>
        BodyCopy / M / Bold (16px)
      </div>
      <BodyText variant="body-m-bold">
        این متن نمونه برای BodyCopy M Bold است
      </BodyText>
    </div>

    <div>
      <div style={{ fontSize: '14px', color: '#666', marginBottom: 4 }}>
        BodyCopy / M / Medium (16px)
      </div>
      <BodyText variant="body-m-medium">
        این متن نمونه برای BodyCopy M Medium است
      </BodyText>
    </div>

    <div>
      <div style={{ fontSize: '14px', color: '#666', marginBottom: 4 }}>
        BodyCopy / S / Heavy (14px)
      </div>
      <BodyText variant="body-s-heavy">
        این متن نمونه برای BodyCopy S Heavy است
      </BodyText>
    </div>

    <div>
      <div style={{ fontSize: '14px', color: '#666', marginBottom: 4 }}>
        BodyCopy / S / Bold (14px)
      </div>
      <BodyText variant="body-s-bold">
        این متن نمونه برای BodyCopy S Bold است
      </BodyText>
    </div>

    <div>
      <div style={{ fontSize: '14px', color: '#666', marginBottom: 4 }}>
        BodyCopy / S / Medium (14px)
      </div>
      <BodyText variant="body-s-medium">
        این متن نمونه برای BodyCopy S Medium است
      </BodyText>
    </div>

    <div>
      <div style={{ fontSize: '14px', color: '#666', marginBottom: 4 }}>
        BodyCopy / MS / Bold (13px)
      </div>
      <BodyText variant="body-ms-bold">
        این متن نمونه برای BodyCopy MS Bold است
      </BodyText>
    </div>

    <div>
      <div style={{ fontSize: '14px', color: '#666', marginBottom: 4 }}>
        BodyCopy / MS / Medium (13px)
      </div>
      <BodyText variant="body-ms-medium">
        این متن نمونه برای BodyCopy MS Medium است
      </BodyText>
    </div>

    <div>
      <div style={{ fontSize: '14px', color: '#666', marginBottom: 4 }}>
        BodyCopy / XS / Bold (12px)
      </div>
      <BodyText variant="body-xs-bold">
        این متن نمونه برای BodyCopy XS Bold است
      </BodyText>
    </div>

    <div>
      <div style={{ fontSize: '14px', color: '#666', marginBottom: 4 }}>
        BodyCopy / XS / Medium (12px)
      </div>
      <BodyText variant="body-xs-medium">
        این متن نمونه برای BodyCopy XS Medium است
      </BodyText>
    </div>

    <div>
      <div style={{ fontSize: '14px', color: '#666', marginBottom: 4 }}>
        BodyCopy / T / Bold (10px)
      </div>
      <BodyText variant="body-t-bold">
        این متن نمونه برای BodyCopy T Bold است
      </BodyText>
    </div>

    <div>
      <div style={{ fontSize: '14px', color: '#666', marginBottom: 4 }}>
        BodyCopy / T / Medium (10px)
      </div>
      <BodyText variant="body-t-medium">
        این متن نمونه برای BodyCopy T Medium است
      </BodyText>
    </div>

    <div>
      <div style={{ fontSize: '14px', color: '#666', marginBottom: 4 }}>
        BodyCopy / SS / Medium (9px)
      </div>
      <BodyText variant="body-ss-medium">
        این متن نمونه برای BodyCopy SS Medium است
      </BodyText>
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
