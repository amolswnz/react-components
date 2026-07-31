// src/components/empty-state/empty-state.test.tsx
import { Search, Plus } from 'lucide-react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EmptyState } from './empty-state';

describe('EmptyState', () => {
  it('renders title', () => {
    render(<EmptyState title='No results found' />);
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<EmptyState title='No results' description='Try adjusting your search.' />);
    expect(screen.getByText('Try adjusting your search.')).toBeInTheDocument();
  });

  it('does not render description when not provided', () => {
    const { container } = render(<EmptyState title='No results' />);
    expect(container.querySelector('p')).not.toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    const { container } = render(<EmptyState title='No results' icon={Search} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('does not render icon wrapper when icon is not provided', () => {
    const { container } = render(<EmptyState title='No results' />);
    expect(container.querySelector('.rounded-full')).not.toBeInTheDocument();
  });

  it('renders action button and calls onClick', async () => {
    const onClick = vi.fn();
    render(<EmptyState title='No results' action={{ label: 'Add new', onClick }} />);
    const button = screen.getByRole('button', { name: 'Add new' });
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders action icon when provided', () => {
    const { container } = render(
      <EmptyState title='No results' action={{ label: 'Add new', onClick: vi.fn(), icon: Plus }} />
    );
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThanOrEqual(1);
  });

  it('renders action with default outline variant', () => {
    const onClick = vi.fn();
    render(<EmptyState title='No results' action={{ label: 'Retry', onClick }} />);
    const button = screen.getByRole('button', { name: 'Retry' });
    expect(button.className).toContain('outline');
  });

  it('renders suggestions list', () => {
    render(
      <EmptyState
        title='No results'
        suggestions={['Check your spelling', 'Try a different search term', 'Browse categories']}
      />
    );
    expect(screen.getByText('Suggestions:')).toBeInTheDocument();
    expect(screen.getByText(/Check your spelling/)).toBeInTheDocument();
    expect(screen.getByText(/Try a different search term/)).toBeInTheDocument();
    expect(screen.getByText(/Browse categories/)).toBeInTheDocument();
  });

  it('does not render suggestions section when suggestions is empty', () => {
    const { container } = render(<EmptyState title='No results' suggestions={[]} />);
    expect(screen.queryByText('Suggestions:')).not.toBeInTheDocument();
    expect(container.querySelector('ul')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<EmptyState title='No results' className='custom-class' />);
    expect(container.firstElementChild?.classList.contains('custom-class')).toBe(true);
  });
});
