import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DataTableFilters } from './data-table-filters';

const defaultProps = {
  values: {},
  onFilterChange: vi.fn(),
  onClearFilters: vi.fn(),
};

const selectFields = [
  {
    key: 'role',
    label: 'Role',
    options: [
      { value: 'all', label: 'All' },
      { value: 'admin', label: 'Admin' },
    ],
  },
  {
    key: 'status',
    label: 'Status',
    options: [
      { value: 'all', label: 'All' },
      { value: 'active', label: 'Active' },
    ],
  },
];

const textFields = [{ key: 'name', label: 'Name', placeholder: 'Filter by name...' }];

describe('DataTableFilters', () => {
  it('renders filter select fields', () => {
    render(<DataTableFilters {...defaultProps} filterSelectFields={selectFields} />);
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('renders filter text fields', () => {
    render(<DataTableFilters {...defaultProps} filterTextFields={textFields} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Filter by name...')).toBeInTheDocument();
  });

  it('calls onFilterChange when select value changes', async () => {
    const onFilterChange = vi.fn();
    render(
      <DataTableFilters
        {...defaultProps}
        onFilterChange={onFilterChange}
        filterSelectFields={selectFields}
        values={{ role: 'all' }}
      />
    );
    await userEvent.click(screen.getAllByRole('combobox')[0]);
    await userEvent.click(await screen.findByRole('option', { name: 'Admin' }));
    expect(onFilterChange).toHaveBeenCalledWith('role', 'admin');
  });

  it('shows default value in single-select when no explicit value is provided', () => {
    render(
      <DataTableFilters
        {...defaultProps}
        filterSelectFields={selectFields}
        values={{}}
        defaultValues={{ role: 'all' }}
      />
    );
    expect(screen.getByText('All')).toBeInTheDocument();
  });

  it('shows placeholder in single-select when no value and no default', () => {
    const { container } = render(<DataTableFilters {...defaultProps} filterSelectFields={selectFields} values={{}} />);
    expect(container.textContent).not.toContain('All');
    expect(container.textContent).not.toContain('Admin');
  });

  it('does not show active filter badge when value matches default', () => {
    render(
      <DataTableFilters
        {...defaultProps}
        filterSelectFields={selectFields}
        values={{}}
        defaultValues={{ role: 'all' }}
      />
    );
    expect(screen.queryByRole('button', { name: /remove/i })).not.toBeInTheDocument();
  });

  it('calls onFilterChange when text input changes', async () => {
    const onFilterChange = vi.fn();
    render(
      <DataTableFilters
        {...defaultProps}
        onFilterChange={onFilterChange}
        filterTextFields={textFields}
        values={{ name: '' }}
      />
    );
    await userEvent.type(screen.getByPlaceholderText('Filter by name...'), 'a');
    expect(onFilterChange).toHaveBeenCalledWith('name', 'a');
  });

  it('shows clear button on text input when value exists', () => {
    render(<DataTableFilters {...defaultProps} filterTextFields={textFields} values={{ name: 'alice' }} />);
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument();
  });

  it('clears text filter when clear button is clicked', async () => {
    const onFilterChange = vi.fn();
    render(
      <DataTableFilters
        {...defaultProps}
        onFilterChange={onFilterChange}
        filterTextFields={textFields}
        values={{ name: 'alice' }}
      />
    );
    await userEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(onFilterChange).toHaveBeenCalledWith('name', '');
  });

  it('shows filter badge when filter differs from default', () => {
    render(
      <DataTableFilters
        {...defaultProps}
        filterSelectFields={selectFields}
        values={{ role: 'admin' }}
        defaultValues={{ role: 'all' }}
      />
    );
    expect(screen.getByRole('button', { name: 'Remove Role filter' })).toBeInTheDocument();
  });

  it('shows active filter badge with resolved option label for select fields', () => {
    const { container } = render(
      <DataTableFilters
        {...defaultProps}
        filterSelectFields={selectFields}
        values={{ role: 'admin' }}
        defaultValues={{ role: 'all' }}
      />
    );
    expect(container.textContent).toContain('Role: Admin');
  });

  it('hides filter badge when filters match defaults', () => {
    render(
      <DataTableFilters
        {...defaultProps}
        filterSelectFields={selectFields}
        values={{ role: 'all' }}
        defaultValues={{ role: 'all' }}
      />
    );
    expect(screen.queryByRole('button', { name: /remove/i })).not.toBeInTheDocument();
  });

  it('shows Clear filters button when filters are active', () => {
    render(<DataTableFilters {...defaultProps} values={{ role: 'admin' }} defaultValues={{ role: 'all' }} />);
    expect(screen.getByText('Clear filters')).toBeInTheDocument();
  });

  it('hides Clear filters button when filters match defaults', () => {
    render(<DataTableFilters {...defaultProps} values={{ role: 'all' }} defaultValues={{ role: 'all' }} />);
    expect(screen.queryByText('Clear filters')).not.toBeInTheDocument();
  });

  it('calls onClearFilters when Clear filters is clicked', async () => {
    const onClearFilters = vi.fn();
    render(
      <DataTableFilters
        {...defaultProps}
        onClearFilters={onClearFilters}
        values={{ role: 'admin' }}
        defaultValues={{ role: 'all' }}
      />
    );
    await userEvent.click(screen.getByText('Clear filters'));
    expect(onClearFilters).toHaveBeenCalledOnce();
  });

  it('renders search input when onSearchChange is provided', () => {
    render(<DataTableFilters {...defaultProps} onSearchChange={vi.fn()} searchValue='' />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('calls onSearchChange when typing in search', async () => {
    const onSearchChange = vi.fn();
    render(<DataTableFilters {...defaultProps} onSearchChange={onSearchChange} searchValue='' />);
    const searchInput = screen.getByRole('textbox');
    await userEvent.type(searchInput, 'test');
    expect(onSearchChange).toHaveBeenCalledWith('t');
    expect(onSearchChange).toHaveBeenCalledWith('e');
    expect(onSearchChange).toHaveBeenCalledWith('s');
    expect(onSearchChange).toHaveBeenCalledWith('t');
  });

  it('renders Add New button when onAddNew is provided', () => {
    render(<DataTableFilters {...defaultProps} onAddNew={vi.fn()} />);
    expect(screen.getByText('Add New')).toBeInTheDocument();
  });

  it('calls onAddNew when Add New button is clicked', async () => {
    const onAddNew = vi.fn();
    render(<DataTableFilters {...defaultProps} onAddNew={onAddNew} />);
    await userEvent.click(screen.getByText('Add New'));
    expect(onAddNew).toHaveBeenCalledOnce();
  });

  it('renders Refresh button when onRefresh is provided', () => {
    render(<DataTableFilters {...defaultProps} onRefresh={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Refresh data' })).toBeInTheDocument();
  });

  it('calls onRefresh when Refresh button is clicked', async () => {
    const onRefresh = vi.fn();
    render(<DataTableFilters {...defaultProps} onRefresh={onRefresh} />);
    await userEvent.click(screen.getByRole('button', { name: 'Refresh data' }));
    expect(onRefresh).toHaveBeenCalledOnce();
  });

  it('applies custom className', () => {
    const { container } = render(<DataTableFilters {...defaultProps} className='custom-class' />);
    expect(container.firstElementChild?.classList.contains('custom-class')).toBe(true);
  });

  it('renders multi-select field when multi is true', () => {
    const multiField = [
      { key: 'role', label: 'Role', multi: true as const, options: [{ value: 'Admin', label: 'Admin' }] },
    ];
    render(<DataTableFilters {...defaultProps} filterSelectFields={multiField} />);
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('calls onFilterChange with comma-separated values for multi-select', async () => {
    const onFilterChange = vi.fn();
    const multiField = [
      {
        key: 'role',
        label: 'Role',
        multi: true as const,
        options: [
          { value: 'Admin', label: 'Admin' },
          { value: 'Editor', label: 'Editor' },
        ],
      },
    ];
    render(
      <DataTableFilters
        {...defaultProps}
        onFilterChange={onFilterChange}
        filterSelectFields={multiField}
        values={{ role: '' }}
      />
    );
    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger);
    await userEvent.click(screen.getByRole('option', { name: /Admin/ }));
    expect(onFilterChange).toHaveBeenCalledWith('role', 'Admin');
  });

  it('shows active filter badge with multi-select values', () => {
    const multiField = [
      {
        key: 'role',
        label: 'Role',
        multi: true as const,
        options: [
          { value: 'Admin', label: 'Admin' },
          { value: 'Editor', label: 'Editor' },
        ],
      },
    ];
    const { container } = render(
      <DataTableFilters
        {...defaultProps}
        filterSelectFields={multiField}
        values={{ role: 'Admin,Editor' }}
        defaultValues={{ role: '' }}
      />
    );
    expect(container.textContent).toContain('Role: Admin, Editor');
  });

  it('renders per page selector when perPage is provided', () => {
    const { container } = render(
      <DataTableFilters
        {...defaultProps}
        perPage={{ options: [{ value: '10', label: '10' }] }}
        perPageValue={10}
        onPerPageChange={vi.fn()}
      />
    );
    expect(container.textContent).toContain('10');
  });

  it('renders date range filter fields', () => {
    const dateFields = [{ key: 'createdAt', label: 'Created Date' }];
    render(
      <DataTableFilters
        {...defaultProps}
        filterDateRangeFields={dateFields}
        values={{ createdAtFrom: '', createdAtTo: '' }}
      />
    );
    expect(screen.getByText('Created Date')).toBeInTheDocument();
  });

  it('shows active filter badge for date range fields', () => {
    const dateFields = [{ key: 'createdAt', label: 'Created Date' }];
    const { container } = render(
      <DataTableFilters
        {...defaultProps}
        filterDateRangeFields={dateFields}
        values={{ createdAtFrom: '2024-01-01', createdAtTo: '' }}
        defaultValues={{ createdAtFrom: '', createdAtTo: '' }}
      />
    );
    expect(container.textContent).toContain('Created Date');
  });

  it('clears both date range fields when badge remove is clicked', async () => {
    const onFilterChange = vi.fn();
    const dateFields = [{ key: 'createdAt', label: 'Created Date' }];
    render(
      <DataTableFilters
        {...defaultProps}
        onFilterChange={onFilterChange}
        filterDateRangeFields={dateFields}
        values={{ createdAtFrom: '2024-01-01', createdAtTo: '2024-06-01' }}
        defaultValues={{ createdAtFrom: '', createdAtTo: '' }}
      />
    );
    await userEvent.click(screen.getByRole('button', { name: 'Remove Created Date filter' }));
    expect(onFilterChange).toHaveBeenCalledWith('createdAtFrom', '');
    expect(onFilterChange).toHaveBeenCalledWith('createdAtTo', '');
  });

  it('shows active filter badge for date range with "to" value', () => {
    const dateFields = [{ key: 'createdAt', label: 'Created Date' }];
    const { container } = render(
      <DataTableFilters
        {...defaultProps}
        filterDateRangeFields={dateFields}
        values={{ createdAtFrom: '', createdAtTo: '2024-06-01' }}
        defaultValues={{ createdAtFrom: '', createdAtTo: '' }}
      />
    );
    expect(container.textContent).toContain('Created Date');
  });

  it('renders toggle group filter fields', () => {
    const toggleFields = [
      {
        key: 'status',
        label: 'Status',
        options: [
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
        ],
      },
    ];
    render(<DataTableFilters {...defaultProps} filterToggleGroupFields={toggleFields} values={{ status: '' }} />);
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Active' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Inactive' })).toBeInTheDocument();
  });

  it('calls onFilterChange when toggle group item is clicked', async () => {
    const onFilterChange = vi.fn();
    const toggleFields = [
      {
        key: 'status',
        label: 'Status',
        options: [
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
        ],
      },
    ];
    render(
      <DataTableFilters
        {...defaultProps}
        onFilterChange={onFilterChange}
        filterToggleGroupFields={toggleFields}
        values={{ status: '' }}
      />
    );
    await userEvent.click(screen.getByRole('button', { name: 'Active' }));
    expect(onFilterChange).toHaveBeenCalledWith('status', 'active');
  });

  it('toggles item off when clicked again', async () => {
    const onFilterChange = vi.fn();
    const toggleFields = [{ key: 'status', label: 'Status', options: [{ value: 'active', label: 'Active' }] }];
    render(
      <DataTableFilters
        {...defaultProps}
        onFilterChange={onFilterChange}
        filterToggleGroupFields={toggleFields}
        values={{ status: 'active' }}
      />
    );
    await userEvent.click(screen.getByRole('button', { name: 'Active' }));
    expect(onFilterChange).toHaveBeenCalledWith('status', '');
  });

  it('shows active filter badge for toggle group values', () => {
    const toggleFields = [
      {
        key: 'status',
        label: 'Status',
        options: [
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
        ],
      },
    ];
    const { container } = render(
      <DataTableFilters
        {...defaultProps}
        filterToggleGroupFields={toggleFields}
        values={{ status: 'active,inactive' }}
        defaultValues={{ status: '' }}
      />
    );
    expect(container.textContent).toContain('Status: Active, Inactive');
  });

  it('calls onPerPageChange when per page changes', async () => {
    const onPerPageChange = vi.fn();
    const { container } = render(
      <DataTableFilters
        {...defaultProps}
        perPage={{
          options: [
            { value: '10', label: '10' },
            { value: '20', label: '20' },
          ],
        }}
        perPageValue={10}
        onPerPageChange={onPerPageChange}
      />
    );
    const trigger = container.querySelector('[role="combobox"]')!;
    await userEvent.click(trigger);
    await userEvent.click(await screen.findByRole('option', { name: '20' }));
    expect(onPerPageChange).toHaveBeenCalledWith(20);
  });
});
