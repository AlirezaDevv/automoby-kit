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

// Components (direct exports)
export const Typography = OriginalTypography;
export const Button = OriginalButton;
export const Input = OriginalInput;
export const Tabs = OriginalTabs;
export const Drawer = OriginalDrawer;
export const Backdrop = OriginalBackdrop;
export const Breadcrumb = OriginalBreadcrumb;
export const Pagination = OriginalPagination;
export const Accordion = OriginalAccordion;
export const Divider = OriginalDivider;
export const RadioGroup = OriginalRadioGroup;
export const Chips = OriginalChips;
export const Menu = OriginalMenu;

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
export { MobileProvider } from './contexts/MobileContext';
export { useMobile } from './contexts/MobileContext';
