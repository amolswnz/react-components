// src/components/data-table/data-table-filters.stories.tsx
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DataTableFilters } from './data-table-filters';

const meta: Meta<typeof DataTableFilters> = {
  title: 'DataTable/DataTableFilters',
  component: DataTableFilters,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DataTableFilters>;

export const Default: Story = {
  render: () => {
    const [values, setValues] = useState<Record<string, string>>({});
    return (
      <DataTableFilters
        values={values}
        onFilterChange={(key, value) => setValues((prev) => ({ ...prev, [key]: value }))}
        onClearFilters={() => setValues({})}
      />
    );
  },
};

export const WithTextFields: Story = {
  render: () => {
    const [values, setValues] = useState<Record<string, string>>({});
    return (
      <DataTableFilters
        filterTextFields={[
          { key: 'name', label: 'Name', placeholder: 'Filter by name...' },
          { key: 'email', label: 'Email', placeholder: 'Filter by email...' },
        ]}
        values={values}
        onFilterChange={(key, value) => setValues((prev) => ({ ...prev, [key]: value }))}
        onClearFilters={() => setValues({})}
      />
    );
  },
};

export const WithSelectFields: Story = {
  render: () => {
    const [values, setValues] = useState<Record<string, string>>({});
    return (
      <DataTableFilters
        filterSelectFields={[
          {
            key: 'role',
            label: 'Role',
            options: [
              { value: 'admin', label: 'Admin' },
              { value: 'editor', label: 'Editor' },
              { value: 'viewer', label: 'Viewer' },
            ],
          },
          {
            key: 'status',
            label: 'Status',
            options: [
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
            ],
          },
        ]}
        values={values}
        defaultValues={{ role: 'admin' }}
        onFilterChange={(key, value) => setValues((prev) => ({ ...prev, [key]: value }))}
        onClearFilters={() => setValues({})}
      />
    );
  },
};

export const WithMultiSelect: Story = {
  render: () => {
    const [values, setValues] = useState<Record<string, string>>({});
    return (
      <DataTableFilters
        filterSelectFields={[
          {
            key: 'roles',
            label: 'Roles',
            multi: true,
            options: [
              { value: 'admin', label: 'Admin' },
              { value: 'editor', label: 'Editor' },
              { value: 'viewer', label: 'Viewer' },
              { value: 'guest', label: 'Guest' },
            ],
          },
        ]}
        values={values}
        onFilterChange={(key, value) => setValues((prev) => ({ ...prev, [key]: value }))}
        onClearFilters={() => setValues({})}
      />
    );
  },
};

export const WithToggleGroup: Story = {
  render: () => {
    const [values, setValues] = useState<Record<string, string>>({});
    return (
      <DataTableFilters
        filterToggleGroupFields={[
          {
            key: 'status',
            label: 'Status',
            options: [
              { value: 'Active', label: 'Active' },
              { value: 'Inactive', label: 'Inactive' },
            ],
          },
        ]}
        values={values}
        onFilterChange={(key, value) => setValues((prev) => ({ ...prev, [key]: value }))}
        onClearFilters={() => setValues({})}
      />
    );
  },
};

export const WithDateRange: Story = {
  render: () => {
    const [values, setValues] = useState<Record<string, string>>({});
    return (
      <DataTableFilters
        filterDateRangeFields={[
          {
            key: 'createdAt',
            label: 'Created Date',
          },
        ]}
        values={values}
        onFilterChange={(key, value) => setValues((prev) => ({ ...prev, [key]: value }))}
        onClearFilters={() => setValues({})}
      />
    );
  },
};

export const WithPerPage: Story = {
  render: () => {
    const [values, setValues] = useState<Record<string, string>>({});
    const [perPage, setPerPage] = useState(10);
    return (
      <DataTableFilters
        values={values}
        onFilterChange={(key, value) => setValues((prev) => ({ ...prev, [key]: value }))}
        onClearFilters={() => setValues({})}
        perPage={{
          options: [
            { value: '5', label: '5' },
            { value: '10', label: '10' },
            { value: '25', label: '25' },
            { value: '50', label: '50' },
          ],
        }}
        perPageValue={perPage}
        onPerPageChange={setPerPage}
      />
    );
  },
};

export const WithSearch: Story = {
  render: () => {
    const [values, setValues] = useState<Record<string, string>>({});
    const [search, setSearch] = useState('');
    return (
      <DataTableFilters
        values={values}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder='Search by name or email...'
        onFilterChange={(key, value) => setValues((prev) => ({ ...prev, [key]: value }))}
        onClearFilters={() => {
          setValues({});
          setSearch('');
        }}
      />
    );
  },
};

export const WithRefreshAndAdd: Story = {
  render: () => {
    const [values, setValues] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    return (
      <DataTableFilters
        values={values}
        onFilterChange={(key, value) => setValues((prev) => ({ ...prev, [key]: value }))}
        onClearFilters={() => setValues({})}
        onRefresh={() => {
          setLoading(true);
          setTimeout(() => setLoading(false), 1000);
        }}
        loadingRefresh={loading}
        onAddNew={() => alert('Add new item')}
      />
    );
  },
};

export const AllFields: Story = {
  render: () => {
    const [values, setValues] = useState<Record<string, string>>({});
    const [search, setSearch] = useState('');
    const [perPage, setPerPage] = useState(10);
    const [loading, setLoading] = useState(false);
    return (
      <DataTableFilters
        filterTextFields={[{ key: 'name', label: 'Name', placeholder: 'Filter by name...' }]}
        filterSelectFields={[
          {
            key: 'role',
            label: 'Role',
            multi: true,
            options: [
              { value: 'admin', label: 'Admin' },
              { value: 'editor', label: 'Editor' },
              { value: 'viewer', label: 'Viewer' },
            ],
          },
          {
            key: 'status',
            label: 'Status',
            options: [
              { value: 'all', label: 'All' },
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
            ],
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
        filterDateRangeFields={[{ key: 'createdAt', label: 'Created Date' }]}
        values={values}
        defaultValues={{ role: '', status: 'all', statusToggle: '', name: '' }}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder='Search...'
        onFilterChange={(key, value) => setValues((prev) => ({ ...prev, [key]: value }))}
        onClearFilters={() => {
          setValues({});
          setSearch('');
        }}
        perPage={{
          options: [
            { value: '5', label: '5' },
            { value: '10', label: '10' },
            { value: '25', label: '25' },
          ],
        }}
        perPageValue={perPage}
        onPerPageChange={setPerPage}
        onRefresh={() => {
          setLoading(true);
          setTimeout(() => setLoading(false), 1000);
        }}
        loadingRefresh={loading}
        onAddNew={() => alert('Add new user')}
      />
    );
  },
};

export const WithActiveFilters: Story = {
  render: () => {
    const [values, setValues] = useState<Record<string, string>>({
      name: 'Alice',
      role: 'admin,editor',
      status: 'active',
    });
    const [search, setSearch] = useState('john');
    return (
      <DataTableFilters
        filterTextFields={[{ key: 'name', label: 'Name', placeholder: 'Filter by name...' }]}
        filterSelectFields={[
          {
            key: 'role',
            label: 'Role',
            multi: true,
            options: [
              { value: 'admin', label: 'Admin' },
              { value: 'editor', label: 'Editor' },
              { value: 'viewer', label: 'Viewer' },
            ],
          },
          {
            key: 'status',
            label: 'Status',
            options: [
              { value: 'all', label: 'All' },
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
            ],
          },
        ]}
        values={values}
        defaultValues={{ role: '', status: 'all', name: '' }}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder='Search...'
        onFilterChange={(key, value) => setValues((prev) => ({ ...prev, [key]: value }))}
        onClearFilters={() => {
          setValues({});
          setSearch('');
        }}
      />
    );
  },
};
