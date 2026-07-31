import type { ColumnDef } from '@tanstack/react-table';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DataTable } from './data-table';

interface TestItem {
  id: number;
  name: string;
  email: string;
}

const columns: ColumnDef<TestItem>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
];

const data: TestItem[] = [
  { id: 1, name: 'Alice', email: 'alice@test.com' },
  { id: 2, name: 'Bob', email: 'bob@test.com' },
  { id: 3, name: 'Charlie', email: 'charlie@test.com' },
];

describe('DataTable', () => {
  it('renders column headers', () => {
    render(<DataTable columns={columns} data={data} />);
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('renders rows from data', () => {
    render(<DataTable columns={columns} data={data} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();
  });

  it('shows skeleton rows when loading', () => {
    const { container } = render(<DataTable columns={columns} data={[]} isLoading />);
    const skeletons = container.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('shows empty state when no data and not loading', () => {
    render(<DataTable columns={columns} data={[]} />);
    expect(screen.getByText('No results')).toBeInTheDocument();
    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  it('shows custom empty state message', () => {
    render(
      <DataTable columns={columns} data={[]} emptyTitle='Nothing here' emptyDescription='Try a different search.' />
    );
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
    expect(screen.getByText('Try a different search.')).toBeInTheDocument();
  });

  it('renders pagination with meta', () => {
    const { container } = render(
      <DataTable
        columns={columns}
        data={data}
        meta={{
          current_page: 1,
          from: 1,
          last_page: 1,
          per_page: 10,
          to: 3,
          total: 3,
        }}
        onPageChange={vi.fn()}
      />
    );
    expect(container.textContent).toContain('Showing all 3 results');
  });

  it('renders pagination with pageCount', () => {
    render(
      <DataTable
        columns={columns}
        data={data}
        pageCount={5}
        pagination={{ pageIndex: 0, pageSize: 10 }}
        onPaginationChange={vi.fn()}
      />
    );
    expect(screen.getByText(/results/)).toBeInTheDocument();
  });

  it('calls onPageChange when page is changed', async () => {
    const onPageChange = vi.fn();
    render(
      <DataTable
        columns={columns}
        data={data}
        meta={{
          current_page: 1,
          from: 1,
          last_page: 3,
          per_page: 1,
          to: 1,
          total: 3,
        }}
        onPageChange={onPageChange}
      />
    );
    await userEvent.click(screen.getByLabelText('Go to page 2'));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('applies custom className', () => {
    const { container } = render(<DataTable columns={columns} data={data} className='custom-class' />);
    const outer = container.firstElementChild;
    expect(outer?.classList.contains('custom-class')).toBe(true);
  });

  it('calls onSortingChange when sortable header is clicked', async () => {
    const onSortingChange = vi.fn();
    render(<DataTable columns={columns} data={data} onSortingChange={onSortingChange} />);
    await userEvent.click(screen.getByText('Name'));
    await waitFor(() => {
      expect(onSortingChange).toHaveBeenCalled();
    });
  });

  it('calls onPaginationChange when page is changed with pagination prop', async () => {
    const onPaginationChange = vi.fn();
    render(
      <DataTable
        columns={columns}
        data={data}
        pageCount={5}
        pagination={{ pageIndex: 0, pageSize: 10 }}
        onPaginationChange={onPaginationChange}
      />
    );
    await userEvent.click(screen.getByLabelText('Go to page 2'));
    expect(onPaginationChange).toHaveBeenCalledWith({ pageIndex: 1, pageSize: 10 });
  });
});
