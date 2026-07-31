// src/components/pagination/pagination.tsx
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { cn } from '@/lib/amolsw/utils';
import { Button } from '@/components/ui/button';

export interface PaginationMeta {
  current_page: number;
  from: number | null;
  last_page: number;
  per_page: number;
  to: number | null;
  total: number;
}

export interface PaginationProps {
  currentPage?: number;
  totalItems?: number;
  itemsPerPage?: number;
  meta?: PaginationMeta;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination = ({ currentPage, totalItems, itemsPerPage, meta, onPageChange, className }: PaginationProps) => {
  const current = meta?.current_page ?? currentPage ?? 1;
  const total = meta?.total ?? totalItems ?? 0;
  const perPage = meta?.per_page ?? itemsPerPage ?? 10;

  const totalPages = meta?.last_page ?? Math.ceil(total / perPage);
  const startItem = meta?.from ?? (current - 1) * perPage + 1;
  const endItem = meta?.to ?? Math.min(current * perPage, total);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    pages.push(1);

    const startRange = Math.max(2, current - 1);
    const endRange = Math.min(totalPages - 1, current + 1);

    if (startRange > 2) {
      pages.push('...');
    }

    for (let i = startRange; i <= endRange; i++) {
      pages.push(i);
    }

    if (endRange < totalPages - 1) {
      pages.push('...');
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  if (total === 0) {
    return null;
  }

  const pageNumbers = getPageNumbers();

  return (
    <div className={cn('mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between', className)}>
      {totalPages > 1 ? (
        <>
          <div className='text-sm text-muted-foreground'>
            Showing <span className='font-medium text-foreground'>{startItem ?? 0}</span> to{' '}
            <span className='font-medium text-foreground'>{endItem ?? 0}</span> of{' '}
            <span className='font-medium text-foreground'>{total}</span> results
          </div>

          <nav aria-label='Pagination' className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handlePageChange(1)}
              disabled={current === 1}
              aria-label='Go to first page'
              className='size-9 cursor-pointer'
            >
              <ChevronsLeft className='size-4' />
            </Button>

            <Button
              variant='outline'
              size='icon'
              onClick={() => handlePageChange(current - 1)}
              disabled={current === 1}
              aria-label='Go to previous page'
              className='size-9 cursor-pointer'
            >
              <ChevronLeft className='size-4' />
            </Button>

            <div className='flex items-center gap-1'>
              {pageNumbers.map((page, index) =>
                page === '...' ? (
                  <Button
                    key={`ellipsis-${index}`}
                    variant='ghost'
                    size='icon'
                    disabled
                    aria-label='More pages available'
                    className='size-9 pointer-events-none cursor-default'
                  >
                    <span aria-hidden='true'>...</span>
                  </Button>
                ) : (
                  <Button
                    key={page}
                    variant={page === current ? 'default' : 'outline'}
                    size='icon'
                    onClick={() => handlePageChange(page as number)}
                    disabled={page === current}
                    aria-label={`Go to page ${page}`}
                    aria-current={page === current ? 'page' : undefined}
                    className='size-9 cursor-pointer'
                  >
                    {page}
                  </Button>
                )
              )}
            </div>

            <Button
              variant='outline'
              size='icon'
              onClick={() => handlePageChange(current + 1)}
              disabled={current === totalPages}
              aria-label='Go to next page'
              className='size-9 cursor-pointer'
            >
              <ChevronRight className='size-4' />
            </Button>

            <Button
              variant='outline'
              size='icon'
              onClick={() => handlePageChange(totalPages)}
              disabled={current === totalPages}
              aria-label='Go to last page'
              className='size-9 cursor-pointer'
            >
              <ChevronsRight className='size-4' />
            </Button>
          </nav>
        </>
      ) : (
        <div className='text-sm text-muted-foreground'>
          Showing <span className='font-medium text-foreground'>all {total}</span> results
        </div>
      )}
    </div>
  );
};

Pagination.displayName = 'Pagination';

export { Pagination };
