import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BackLink } from './back-link';

describe('BackLink', () => {
  it("renders with default 'Go back' label", () => {
    render(<BackLink href='#' />);
    expect(screen.getByText('Go back')).toBeInTheDocument();
  });

  it('renders with custom label', () => {
    render(<BackLink href='#' label='Back to dashboard' />);
    expect(screen.getByText('Back to dashboard')).toBeInTheDocument();
  });

  it('renders with href', () => {
    render(<BackLink href='/dashboard' />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/dashboard');
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn((e) => e.preventDefault());
    render(<BackLink href='#' onClick={onClick} />);
    await userEvent.click(screen.getByRole('link'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    const { container } = render(<BackLink className='custom-class' />);
    const anchor = container.querySelector('a');
    expect(anchor?.className).toContain('custom-class');
  });

  it('renders ArrowLeft icon', () => {
    const { container } = render(<BackLink />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders with a ReactNode label', () => {
    render(<BackLink href='#' label={<span>Custom node</span>} />);
    expect(screen.getByText('Custom node')).toBeInTheDocument();
  });
});
