// src/components/data-table/data-table.stories.tsx
import { useState } from 'react';
import type { ColumnDef, SortingState } from '@tanstack/react-table';
import { Pencil, Trash2, Inbox } from 'lucide-react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { DataTable } from './data-table';
import { DataTableFilters } from './data-table-filters';

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
      <Badge variant={row.getValue('status') === 'Active' ? 'default' : 'destructive'}>{row.getValue('status')}</Badge>
    ),
  },
  { accessorKey: 'createdAt', header: 'Created At' },
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

const meta: Meta<typeof DataTable> = {
  title: 'DataTable/DataTable',
  component: DataTable,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [filters, setFilters] = useState<Record<string, string>>({});

    const filtered = allUsers.filter((u) => {
      if (filters.roleMulti) {
        const roles = filters.roleMulti.split(',');
        if (!roles.includes(u.role)) return false;
      }
      if (filters.status && filters.status !== 'all' && u.status !== filters.status) return false;
      if (filters.nameFilter && !u.name.toLowerCase().includes(filters.nameFilter.toLowerCase())) return false;
      return true;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (!sorting.length) return 0;
      const { id, desc } = sorting[0];
      const aVal = String(a[id as keyof User]);
      const bVal = String(b[id as keyof User]);
      return desc ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
    });

    const perPage = 5;
    const totalPages = Math.ceil(sorted.length / perPage);
    const paginated = sorted.slice((page - 1) * perPage, page * perPage);

    return (
      <div className='space-y-4'>
        <DataTableFilters
          filterTextFields={[{ key: 'nameFilter', label: 'Name', placeholder: 'Filter by name...' }]}
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
          values={filters}
          defaultValues={{ roleMulti: '', status: 'all', nameFilter: '' }}
          onFilterChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))}
          onClearFilters={() => setFilters({})}
        />
        <DataTable
          columns={columns}
          data={paginated}
          pageCount={totalPages}
          pagination={{ pageIndex: page - 1, pageSize: perPage }}
          onPaginationChange={({ pageIndex }) => setPage(pageIndex + 1)}
          onSortingChange={setSorting}
          sorting={sorting}
        />
      </div>
    );
  },
};

export const Loading: Story = {
  render: () => <DataTable columns={columns} data={[]} isLoading pagination={{ pageIndex: 0, pageSize: 5 }} />,
};

export const Empty: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={[]}
      emptyTitle='No users found'
      emptyDescription='Try adjusting your search or filters.'
    />
  ),
};

export const WithBasicData: Story = {
  render: () => <DataTable columns={columns} data={allUsers} />,
};

export const EmptyWithAction: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={[]}
      emptyTitle='No users found'
      emptyDescription='Get started by adding a new user. Use DataTableFilters to add the Add New button.'
    />
  ),
};

export const EmptyWithCustomIcon: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={[]}
      emptyIcon={Inbox}
      emptyTitle='Nothing here yet'
      emptyDescription='Your inbox is empty.'
    />
  ),
};

export const SinglePage: Story = {
  render: () => <DataTable columns={columns} data={allUsers.slice(0, 3)} />,
};

export const WithMeta: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={allUsers.slice(0, 5)}
      meta={{
        current_page: 1,
        from: 1,
        last_page: 2,
        per_page: 5,
        to: 5,
        total: 8,
      }}
      onPageChange={() => {}}
    />
  ),
};

export const WithDefaultSorting: Story = {
  render: () => <DataTable columns={columns} data={allUsers} defaultSorting={[{ id: 'name', desc: false }]} />,
};

export const FilteredToEmpty: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={[]}
      emptyTitle='No matching users'
      emptyDescription='Try clearing your filters.'
    />
  ),
};

export const WithPerPage: Story = {
  render: () => {
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [sorting, setSorting] = useState<SortingState>([]);

    const filtered = allUsers.filter((u) => {
      if (filters.status && filters.status !== 'all' && u.status !== filters.status) return false;
      return true;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (!sorting.length) return 0;
      const { id, desc } = sorting[0];
      const aVal = String(a[id as keyof User]);
      const bVal = String(b[id as keyof User]);
      return desc ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
    });

    const totalPages = Math.ceil(sorted.length / perPage);
    const paginated = sorted.slice((page - 1) * perPage, page * perPage);

    return (
      <div className='space-y-4'>
        <DataTableFilters
          filterSelectFields={[
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
          values={filters}
          defaultValues={{ status: 'all' }}
          onFilterChange={(key, value) => {
            setFilters((prev) => ({ ...prev, [key]: value }));
            setPage(1);
          }}
          onClearFilters={() => {
            setFilters({ status: 'all' });
            setPage(1);
          }}
          perPage={{
            options: [
              { value: '5', label: '5' },
              { value: '10', label: '10' },
              { value: '25', label: '25' },
            ],
          }}
          perPageValue={perPage}
          onPerPageChange={(v) => {
            setPerPage(v);
            setPage(1);
          }}
        />
        <DataTable
          columns={columns}
          data={paginated}
          pageCount={totalPages}
          pagination={{ pageIndex: page - 1, pageSize: perPage }}
          onPaginationChange={({ pageIndex }) => setPage(pageIndex + 1)}
          onSortingChange={setSorting}
          sorting={sorting}
        />
      </div>
    );
  },
};

export const WithToggleField: Story = {
  render: () => {
    const [filters, setFilters] = useState<Record<string, string>>({
      statusToggle: '',
    });
    const [page, setPage] = useState(1);
    const [sorting, setSorting] = useState<SortingState>([]);

    const filtered = allUsers.filter((u) => {
      if (filters.statusToggle) {
        const selected = filters.statusToggle.split(',');
        if (!selected.includes(u.status)) return false;
      }
      return true;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (!sorting.length) return 0;
      const { id, desc } = sorting[0];
      const aVal = String(a[id as keyof User]);
      const bVal = String(b[id as keyof User]);
      return desc ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
    });

    const perPage = 5;
    const totalPages = Math.ceil(sorted.length / perPage);
    const paginated = sorted.slice((page - 1) * perPage, page * perPage);

    return (
      <div className='space-y-4'>
        <DataTableFilters
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
          values={filters}
          defaultValues={{ statusToggle: '' }}
          onFilterChange={(key, value) => {
            setFilters((prev) => ({ ...prev, [key]: value }));
            setPage(1);
          }}
          onClearFilters={() => {
            setFilters({ statusToggle: '' });
            setPage(1);
          }}
        />
        <DataTable
          columns={columns}
          data={paginated}
          pageCount={totalPages}
          pagination={{ pageIndex: page - 1, pageSize: perPage }}
          onPaginationChange={({ pageIndex }) => setPage(pageIndex + 1)}
          onSortingChange={setSorting}
          sorting={sorting}
        />
      </div>
    );
  },
};
