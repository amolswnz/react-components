import { useState, useCallback } from 'react';
import type { ColumnDef, SortingState } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';
import { DataTable, DataTableFilters, useDataTableFilters } from '../../src';
import { Badge } from '../../src/components/ui/badge';
import { Button } from '../../src/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../src/components/ui/card';

type User = {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'Active' | 'Inactive';
  createdAt: string;
};

const allUsers: User[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'Admin',
    status: 'Active',
    createdAt: '2024-01-15',
  },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active', createdAt: '2024-03-22' },
  {
    id: 3,
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    role: 'Viewer',
    status: 'Inactive',
    createdAt: '2024-05-10',
  },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'Admin', status: 'Active', createdAt: '2024-07-08' },
  { id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Editor', status: 'Active', createdAt: '2024-08-19' },
  {
    id: 6,
    name: 'Frank Miller',
    email: 'frank@example.com',
    role: 'Viewer',
    status: 'Inactive',
    createdAt: '2024-09-01',
  },
  { id: 7, name: 'Grace Lee', email: 'grace@example.com', role: 'Editor', status: 'Active', createdAt: '2024-10-12' },
  {
    id: 8,
    name: 'Henry Wilson',
    email: 'henry@example.com',
    role: 'Viewer',
    status: 'Active',
    createdAt: '2024-11-25',
  },
];

function DataTableDemo() {
  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [search, setSearch] = useState('');
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const filters = useDataTableFilters({
    defaultValues: {
      roleMulti: '',
      status: 'all',
      statusToggle: '',
      nameFilter: '',
      createdAtFrom: '',
      createdAtTo: '',
    },
    defaultSortField: 'name',
    defaultSortDirection: 'asc',
    defaultPerPage: 5,
  });

  const byRole = !filters.values.roleMulti
    ? allUsers
    : allUsers.filter((u) => filters.values.roleMulti.split(',').includes(u.role));
  const byStatus = filters.values.status === 'all' ? byRole : byRole.filter((u) => u.status === filters.values.status);
  const byStatusToggle = !filters.values.statusToggle
    ? byStatus
    : byStatus.filter((u) => filters.values.statusToggle.split(',').includes(u.status));
  const byName = !filters.values.nameFilter
    ? byStatusToggle
    : byStatusToggle.filter((u) => u.name.toLowerCase().includes(filters.values.nameFilter.toLowerCase()));
  const byDate = byName.filter((u) => {
    if (filters.values.createdAtFrom && u.createdAt < filters.values.createdAtFrom) return false;
    if (filters.values.createdAtTo && u.createdAt > filters.values.createdAtTo) return false;
    return true;
  });

  const filtered = byDate.filter(
    (u) =>
      !search ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (!sorting.length) {
      const aVal = String(a[filters.sortField as keyof User]);
      const bVal = String(b[filters.sortField as keyof User]);
      return filters.sortDirection === 'desc' ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
    }
    const { id, desc } = sorting[0];
    const aVal = String(a[id as keyof User]);
    const bVal = String(b[id as keyof User]);
    return desc ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
  });

  const totalPages = Math.ceil(filtered.length / filters.perPageValue);
  const paginated = sorted.slice((page - 1) * filters.perPageValue, page * filters.perPageValue);

  const handleSearchChange = useCallback((value: string) => {
    setLoadingSearch(true);
    setSearch(value);
    setPage(1);
    setTimeout(() => setLoadingSearch(false), 300);
  }, []);

  const handleRefresh = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  const columns: ColumnDef<User>[] = [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'email', header: 'Email' },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => (
        <Badge variant={row.getValue('role') === 'Admin' ? 'default' : 'secondary'}>{row.getValue('role')}</Badge>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <Badge variant={row.getValue('status') === 'Active' ? 'default' : 'destructive'}>
          {row.getValue('status')}
        </Badge>
      ),
    },
    { accessorKey: 'createdAt', header: 'CreatedAt' },
    {
      id: 'actions',
      header: 'Actions',
      cell: () => (
        <div className='flex gap-1'>
          <Button
            variant='ghost'
            size='icon'
            aria-label='Edit'
            className='cursor-pointer hover:bg-blue-50 hover:text-blue-600'
          >
            <Pencil className='h-4 w-4' />
          </Button>
          <Button
            variant='ghost'
            size='icon'
            aria-label='Delete'
            className='cursor-pointer hover:bg-red-50 hover:text-red-600'
          >
            <Trash2 className='h-4 w-4' />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Card className='mb-8'>
      <CardHeader>
        <CardTitle>DataTable</CardTitle>
        <CardDescription>Table with sorting, search, pagination, loading, and empty states.</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <DataTableFilters
          filterTextFields={[
            {
              key: 'nameFilter',
              label: 'Name',
              placeholder: 'Filter by name...',
            },
          ]}
          filterDateRangeFields={[
            {
              key: 'createdAt',
              label: 'Created Date',
            },
          ]}
          filterToggleGroupFields={[
            {
              key: 'statusToggle',
              label: 'Status',
              options: [
                { value: 'Active', label: 'Active' },
                { value: 'Inactive', label: 'Inactive' },
              ],
            },
          ]}
          filterSelectFields={[
            {
              key: 'roleMulti',
              label: 'Role',
              multi: true,
              options: [
                { value: 'Admin', label: 'Admin' },
                { value: 'Editor', label: 'Editor' },
                { value: 'Viewer', label: 'Viewer' },
              ],
            },
            {
              key: 'status',
              label: 'Status',
              options: [
                { value: 'all', label: 'All' },
                { value: 'Active', label: 'Active' },
                { value: 'Inactive', label: 'Inactive' },
              ],
            },
          ]}
          values={filters.values}
          defaultValues={{
            roleMulti: '',
            status: 'all',
            statusToggle: '',
            nameFilter: '',
            createdAtFrom: '',
            createdAtTo: '',
          }}
          searchValue={search}
          onSearchChange={handleSearchChange}
          loadingSearch={loadingSearch}
          searchPlaceholder='Search by name or email...'
          perPage={{
            options: [
              { value: '5', label: '5' },
              { value: '10', label: '10' },
              { value: '15', label: '15' },
              { value: '25', label: '25' },
            ],
          }}
          perPageValue={filters.perPageValue}
          onPerPageChange={(v) => {
            filters.onPerPageChange(v);
            setPage(1);
          }}
          onRefresh={handleRefresh}
          loadingRefresh={isLoading}
          onAddNew={() => alert('Add new user')}
          onFilterChange={(key, value) => {
            filters.onFilterChange(key, value);
            setPage(1);
          }}
          onClearFilters={() => {
            filters.onClearFilters();
            setSorting([]);
            setSearch('');
            setPage(1);
          }}
        />
        <DataTable
          columns={columns}
          data={paginated}
          isLoading={isLoading}
          pageCount={totalPages}
          pagination={{ pageIndex: page - 1, pageSize: filters.perPageValue }}
          onPaginationChange={({ pageIndex }) => setPage(pageIndex + 1)}
          onSortingChange={setSorting}
          sorting={sorting}
          emptyTitle='No users found'
          emptyDescription='Try adjusting your search or filters.'
        />
      </CardContent>
    </Card>
  );
}

export { DataTableDemo };
