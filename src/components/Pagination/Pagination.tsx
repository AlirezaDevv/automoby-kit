import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsRightIcon,
  ChevronsLeftIcon,
  MoreHorizontalIcon,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { useEffect, useState } from 'react';

type device = 'mobile' | 'desktop';

function PaginationRoot({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  device,
  ...props
}: React.ComponentProps<'ul'> & { device: device }) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn(
        'flex flex-row items-center',
        device === 'mobile' ? 'gap-[6px]' : 'gap-2',
        className,
      )}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkVariant = 'main' | 'nextPrev';

type PaginationLinkProps = {
  variant: PaginationLinkVariant;
  isActive?: boolean;
} & React.ComponentProps<'a'> & { device: device };

function PaginationLink({
  className,
  device,
  variant,
  isActive,
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant:
            variant === 'nextPrev' ? variant : isActive ? 'active' : 'outline',
          device,
        }),
        className,
      )}
      tabIndex={props['aria-disabled'] ? -1 : 0}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  device,
  variant,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  const isMobile = device === 'mobile';

  const content = {
    mobile: <ChevronRightIcon size={18} />,
    desktop: (
      <>
        <ChevronsRightIcon size={20} /> <span>قبلی</span>
      </>
    ),
  };

  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={
        !isMobile
          ? 'flex justify-center items-center gap-2 w-[89px] h-[48px] ml-4'
          : 'ml-2.5'
      }
      device={device}
      variant="nextPrev"
      {...props}
    >
      {device === 'mobile' ? content.mobile : content.desktop}
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  device,
  variant,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  const isMobile = device === 'mobile';

  const content = {
    mobile: <ChevronLeftIcon size={18} />,
    desktop: (
      <>
        <span>بعدی</span>
        <ChevronsLeftIcon size={20} />
      </>
    ),
  };

  return (
    <PaginationLink
      aria-label="Go to next page"
      className={
        !isMobile
          ? 'flex justify-center items-center gap-2 w-[89px] h-[48px] mr-4'
          : 'mr-2.5'
      }
      device={device}
      variant="nextPrev"
      {...props}
    >
      {device === 'mobile' ? content.mobile : content.desktop}
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn('flex size-9 items-center justify-center', className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
    </span>
  );
}

type ButtonVariant = 'outline' | 'active' | 'nextPrev';

function buttonVariants({
  variant,
  device,
}: {
  variant: ButtonVariant;
  device: device;
}) {
  const isMobile = device === 'mobile';

  const base = cn({
    'flex items-center justify-center rounded-[6px]': true,
    'w-[40px] h-[40px] text-s weight-heavy': isMobile,
    'w-[48px] h-[48px] text-l weight-heavy': !isMobile,
  });

  const variants: Record<ButtonVariant, string> = {
    outline: 'border border-neutral-light bg-white text-neutral-darker',
    active: 'bg-primary text-white',
    nextPrev: 'border border-neutral-light bg-white text-neutral-darker',
  };

  return [base, variants[variant]].join(' ');
}

export interface UnifiedPaginationProps {
  pageCount: number;
  page?: number;
  defaultPage?: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<UnifiedPaginationProps> = ({
  pageCount,
  page: controlledPage,
  defaultPage = 1,
  onPageChange,
  className,
  ...navProps
}) => {
  const isControlled = controlledPage !== undefined;
  const [internalPage, setInternalPage] = useState(defaultPage);

  const page = isControlled ? controlledPage! : internalPage;

  const device: device = 'mobile';

  useEffect(() => {
    if (!isControlled) setInternalPage(defaultPage);
  }, [defaultPage, isControlled]);

  const changePage = (newPage: number) => {
    if (!isControlled) setInternalPage(newPage);
    onPageChange?.(newPage);
  };

  function renderPages() {
    const items: React.ReactNode[] = [];

    if (pageCount <= 5) {
      for (let i = 1; i <= pageCount; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={page === i}
              variant="main"
              device={device}
              onClick={(e) => {
                e.preventDefault();
                if (page !== i) changePage(i);
              }}
              aria-disabled={page === i}
              tabIndex={page === i ? -1 : 0}
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }
    } else {
      // First page
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            href="#"
            isActive={page === 1}
            device={device}
            variant="main"
            onClick={(e) => {
              e.preventDefault();
              if (page !== 1) changePage(1);
            }}
            aria-disabled={page === 1}
            tabIndex={page === 1 ? -1 : 0}
          >
            1
          </PaginationLink>
        </PaginationItem>,
      );
      // Ellipsis start
      if (page > 3) {
        items.push(
          <PaginationItem key="start-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }
      // Middle pages
      const start = Math.max(2, page - 1);
      const end = Math.min(pageCount - 1, page + 1);
      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={page === i}
              device={device}
              variant="main"
              onClick={(e) => {
                e.preventDefault();
                if (page !== i) changePage(i);
              }}
              aria-disabled={page === i}
              tabIndex={page === i ? -1 : 0}
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }
      // Ellipsis end
      if (page < pageCount - 2) {
        items.push(
          <PaginationItem key="end-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }
      // Last page
      items.push(
        <PaginationItem key={pageCount}>
          <PaginationLink
            href="#"
            isActive={page === pageCount}
            device={device}
            variant="main"
            onClick={(e) => {
              e.preventDefault();
              if (page !== pageCount) changePage(pageCount);
            }}
            aria-disabled={page === pageCount}
            tabIndex={page === pageCount ? -1 : 0}
          >
            {pageCount}
          </PaginationLink>
        </PaginationItem>,
      );
    }
    return items;
  }

  return (
    <PaginationRoot className={className} {...navProps}>
      <PaginationContent device="mobile">
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (page > 1) changePage(page - 1);
            }}
            variant="nextPrev"
            device={device}
            aria-disabled={page === 1}
            tabIndex={page === 1 ? -1 : 0}
          />
        </PaginationItem>
        {renderPages()}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (page < pageCount) changePage(page + 1);
            }}
            variant="nextPrev"
            device={device}
            aria-disabled={page === pageCount}
            tabIndex={page === pageCount ? -1 : 0}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
};
