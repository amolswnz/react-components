import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './pagination';

describe('Pagination', () => {
  const onPageChange = vi.fn();

  beforeEach(() => {
    onPageChange.mockClear();
  });

  it('returns null when total is 0', () => {
    const { container } = render(<Pagination totalItems={0} itemsPerPage={10} onPageChange={onPageChange} />);
    expect(container.innerHTML).toBe('');
  });

  it('renders page numbers for small page count', () => {
    render(<Pagination totalItems={50} itemsPerPage={10} currentPage={1} onPageChange={onPageChange} />);
    const pageButtons = screen.getAllByRole('button', { name: /go to page/i });
    expect(pageButtons).toHaveLength(5);
    expect(screen.getByRole('button', { name: 'Go to page 1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go to page 2' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go to page 3' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go to page 4' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go to page 5' })).toBeInTheDocument();
  });

  it("shows 'Showing X to Y of Z results' text", () => {
    const { container } = render(
      <Pagination totalItems={50} itemsPerPage={10} currentPage={1} onPageChange={onPageChange} />
    );
    expect(container.textContent).toContain('Showing 1 to 10 of 50 results');
  });

  it('highlights current page', () => {
    render(<Pagination totalItems={50} itemsPerPage={10} currentPage={3} onPageChange={onPageChange} />);
    const page3 = screen.getByRole('button', { name: 'Go to page 3' });
    expect(page3).toHaveAttribute('aria-current', 'page');
  });

  it('calls onPageChange when a page is clicked', async () => {
    render(<Pagination totalItems={50} itemsPerPage={10} currentPage={1} onPageChange={onPageChange} />);
    await userEvent.click(screen.getByRole('button', { name: 'Go to page 2' }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('disables first and previous buttons on first page', () => {
    render(<Pagination totalItems={50} itemsPerPage={10} currentPage={1} onPageChange={onPageChange} />);
    expect(screen.getByLabelText('Go to first page')).toBeDisabled();
    expect(screen.getByLabelText('Go to previous page')).toBeDisabled();
  });

  it('disables next and last buttons on last page', () => {
    render(<Pagination totalItems={50} itemsPerPage={10} currentPage={5} onPageChange={onPageChange} />);
    expect(screen.getByLabelText('Go to next page')).toBeDisabled();
    expect(screen.getByLabelText('Go to last page')).toBeDisabled();
  });

  it('shows ellipsis for many pages', () => {
    render(<Pagination totalItems={100} itemsPerPage={5} currentPage={5} onPageChange={onPageChange} />);
    const ellipsisButtons = screen.getAllByLabelText('More pages available');
    expect(ellipsisButtons).toHaveLength(2);
  });

  it('renders with meta object', () => {
    const { container } = render(
      <Pagination
        meta={{
          current_page: 2,
          from: 11,
          last_page: 10,
          per_page: 10,
          to: 20,
          total: 100,
        }}
        onPageChange={onPageChange}
      />
    );
    expect(container.textContent).toContain('Showing 11 to 20 of 100 results');
  });

  it('renders with meta having null from/to fields', () => {
    const { container } = render(
      <Pagination
        meta={{
          current_page: 2,
          from: null,
          last_page: 10,
          per_page: 10,
          to: null,
          total: 100,
        }}
        onPageChange={onPageChange}
      />
    );
    expect(container.textContent).toContain('Showing 11 to 20 of 100 results');
  });

  it("shows 'Showing all X results' when only 1 page", () => {
    const { container } = render(
      <Pagination totalItems={5} itemsPerPage={10} currentPage={1} onPageChange={onPageChange} />
    );
    expect(container.textContent).toContain('Showing all 5 results');
  });

  it('applies custom className', () => {
    render(
      <Pagination
        totalItems={50}
        itemsPerPage={10}
        currentPage={1}
        onPageChange={onPageChange}
        className='custom-class'
      />
    );
    const nav = screen.getByLabelText('Pagination');
    expect(nav.closest('.custom-class')).toBeInTheDocument();
  });

  it('falls back to default total and perPage when none provided', () => {
    const { container } = render(<Pagination currentPage={1} onPageChange={onPageChange} />);
    expect(container.innerHTML).toBe('');
  });

  it('does not call onPageChange when clicking current page', async () => {
    render(<Pagination totalItems={50} itemsPerPage={10} currentPage={1} onPageChange={onPageChange} />);
    await userEvent.click(screen.getByRole('button', { name: 'Go to page 1' }));
    expect(onPageChange).not.toHaveBeenCalled();
  });
});
