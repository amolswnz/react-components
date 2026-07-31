import * as React from 'react';
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type { LucideIcon } from 'lucide-react';
import { Search, ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/amolsw/utils';
import { EmptyState } from '@/components/amolsw/empty-state';
import { Pagination, type PaginationMeta } from '@/components/amolsw/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface ColumnMeta {
  className?: string;
}

export interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  isLoading?: boolean;
  pageCount?: number;
  pagination?: {
    pageIndex: number;
    pageSize: number;
  };
  onPaginationChange?: (pagination: { pageIndex: number; pageSize: number }) => void;
  meta?: PaginationMeta;
  onPageChange?: (page: number) => void;
  sorting?: SortingState;
  onSortingChange?: (sorting: SortingState) => void;
  defaultSorting?: SortingState;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyIcon?: LucideIcon;
  className?: string;
}

const DataTable = <TData,>({
  columns,
  data,
  isLoading = false,
  pageCount,
  pagination,
  onPaginationChange,
  meta,
  onPageChange,
  sorting: controlledSorting,
  onSortingChange,
  defaultSorting,
  emptyTitle = 'No results',
  emptyDescription = 'No results found.',
  emptyIcon,
  className,
}: DataTableProps<TData>) => {
  const [internalSorting, setInternalSorting] = React.useState<SortingState>(defaultSorting ?? []);

  const sorting = controlledSorting ?? internalSorting;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
    manualPagination: pagination !== undefined || meta !== undefined,
    pageCount: pageCount ?? meta?.last_page ?? -1,
    onSortingChange: (updater) => {
      const next = typeof updater === 'function' ? updater(sorting) : updater;
      if (controlledSorting === undefined) {
        setInternalSorting(next);
      }
      onSortingChange?.(next);
    },
    state: {
      sorting,
      pagination:
        pagination ?? (meta ? { pageIndex: (meta.current_page ?? 1) - 1, pageSize: meta.per_page ?? 10 } : undefined),
    },
    onPaginationChange: (updater) => {
      if (onPaginationChange) {
        const next = typeof updater === 'function' ? updater(pagination ?? { pageIndex: 0, pageSize: 10 }) : updater;
        onPaginationChange(next);
      }
    },
  });

  const handlePageChange = (page: number) => {
    onPageChange?.(page);
    onPaginationChange?.({ pageIndex: page - 1, pageSize: pagination?.pageSize ?? meta?.per_page ?? 10 });
  };

  const hasPagination = pageCount !== undefined || meta !== undefined || pagination !== undefined;

  return (
    <div className={cn('space-y-4', className)}>
      <div className='overflow-hidden rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn(
                      (header.column.columnDef.meta as ColumnMeta)?.className,
                      header.column.getCanSort() && 'cursor-pointer select-none'
                    )}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className='flex items-center gap-1'>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <span className='ml-1 text-muted-foreground/50'>
                          {{
                            asc: <ArrowUp className='h-3.5 w-3.5 text-muted-foreground' />,
                            desc: <ArrowDown className='h-3.5 w-3.5 text-muted-foreground' />,
                          }[header.column.getIsSorted() as string] ?? <ArrowUpDown className='h-3.5 w-3.5' />}
                        </span>
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: pagination?.pageSize ?? meta?.per_page ?? 10 }).map((_, idx) => (
                <TableRow key={`skeleton-${idx}`}>
                  {columns.map((col, cIdx) => (
                    <TableCell key={`skeleton-${idx}-${cIdx}`} className={(col.meta as ColumnMeta)?.className}>
                      <div className='h-4 w-full animate-pulse rounded bg-muted' />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() ? 'selected' : undefined}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={(cell.column.columnDef.meta as ColumnMeta)?.className}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-48'>
                  <EmptyState
                    icon={emptyIcon ?? Search}
                    title={emptyTitle}
                    description={emptyDescription}
                    action={undefined}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {hasPagination && (
        <Pagination
          meta={meta}
          currentPage={meta?.current_page ?? (pagination?.pageIndex ?? 0) + 1}
          totalItems={meta?.total ?? (pageCount ? pageCount * (pagination?.pageSize ?? 10) : 0)}
          itemsPerPage={meta?.per_page ?? pagination?.pageSize ?? 10}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

DataTable.displayName = 'DataTable';

export { DataTable };
