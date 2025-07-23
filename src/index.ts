import { withLicenseProtection } from './components/ProtectedComponent';
// Original Components (for internal use)
import { Typography as OriginalTypography } from './components/Typography/Typography';
import { Button as OriginalButton } from './components/Button/Button';
import { Input as OriginalInput } from './components/Input/Input';
import { Tabs as OriginalTabs } from './components/Tabs/Tabs';
import { Drawer as OriginalDrawer } from './components/Drawer/Drawer';
import { Backdrop as OriginalBackdrop } from './components/Backdrop/Backdrop';
import { Breadcrumb as OriginalBreadcrumb } from './components/Breadcrumb/Breadcrumb';
import { Pagination as OriginalPagination } from './components/Pagination/Pagination';
import { Accordion as OriginalAccordion } from './components/Accordion/Accordion';
import { Divider as OriginalDivider } from './components/Divider/Divider';
import { RadioGroup as OriginalRadioGroup } from './components/RadioGroup/RadioGroup';
import { Chips as OriginalChips } from './components/Chips/Chips';
import { Menu as OriginalMenu } from './components/Menu/Menu';

// License Management - Must be imported and called first
export { initializeAutomobiKit } from './licensing';
export type { LicenseConfig } from './licensing';

// Protected Components (license-wrapped)
export const Typography = withLicenseProtection(
  OriginalTypography,
  'Typography',
);
export const Button = withLicenseProtection(OriginalButton, 'Button');
export const Input = withLicenseProtection(OriginalInput, 'Input');
export const Tabs = withLicenseProtection(OriginalTabs, 'Tabs');
export const Drawer = withLicenseProtection(OriginalDrawer, 'Drawer');
export const Backdrop = withLicenseProtection(OriginalBackdrop, 'Backdrop');
export const Breadcrumb = withLicenseProtection(
  OriginalBreadcrumb,
  'Breadcrumb',
);
export const Pagination = withLicenseProtection(
  OriginalPagination,
  'Pagination',
);
export const Accordion = withLicenseProtection(OriginalAccordion, 'Accordion');
export const Divider = withLicenseProtection(OriginalDivider, 'Divider');
export const RadioGroup = withLicenseProtection(
  OriginalRadioGroup,
  'RadioGroup',
);
export const Chips = withLicenseProtection(OriginalChips, 'Chips');
export const Menu = withLicenseProtection(OriginalMenu, 'Menu');

// Type exports
export type {
  TypographyProps,
  TypographyVariant,
} from './components/Typography/Typography';

export type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
} from './components/Button/Button';

export type { InputProps } from './components/Input/Input';

export type { TabsProps, TabItem } from './components/Tabs/Tabs';

export type { DrawerProps, DrawerDirection } from './components/Drawer/Drawer';

export type { BackdropProps } from './components/Backdrop/Backdrop';

export type {
  BreadcrumbProps,
  BreadcrumbItem,
} from './components/Breadcrumb/Breadcrumb';

export type { UnifiedPaginationProps as PaginationProps } from './components/Pagination/Pagination';

export type { AccordionProps } from './components/Accordion/Accordion';

export type { DividerProps } from './components/Divider/Divider';

export type {
  RadioGroupProps,
  RadioOption,
} from './components/RadioGroup/RadioGroup';

export type { ChipsProps } from './components/Chips/Chips';

export type { MenuProps, MenuItem } from './components/Menu/Menu';

// Contexts
export { MobileProvider, useMobile } from './contexts/MobileContext';
