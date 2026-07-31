import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BackToTop } from './back-to-top';

describe('BackToTop', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 0,
    });
  });

  const fireScroll = (y: number) => {
    window.pageYOffset = y;
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
  };

  it('does not render when below threshold', () => {
    const { container } = render(<BackToTop />);
    fireScroll(0);
    expect(container.innerHTML).toBe('');
  });

  it('renders when above threshold', () => {
    render(<BackToTop />);
    fireScroll(301);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders exactly at threshold value', () => {
    const { container } = render(<BackToTop />);
    fireScroll(300);
    expect(container.innerHTML).toBe('');
  });

  it('hides when scrolled back below threshold', () => {
    render(<BackToTop />);
    fireScroll(500);
    expect(screen.getByRole('button')).toBeInTheDocument();

    fireScroll(0);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('scrolls to top when clicked', async () => {
    const scrollToSpy = vi.fn();
    window.scrollTo = scrollToSpy;

    render(<BackToTop />);
    fireScroll(500);

    await userEvent.click(screen.getByRole('button'));
    expect(scrollToSpy).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('accepts custom threshold', () => {
    render(<BackToTop threshold={50} />);
    fireScroll(100);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders with custom aria-label', () => {
    render(<BackToTop aria-label='Scroll up' />);
    fireScroll(500);
    expect(screen.getByLabelText('Scroll up')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<BackToTop className='custom-class' />);
    fireScroll(500);
    expect(screen.getByRole('button').className).toContain('custom-class');
  });

  it('renders ArrowUp icon', () => {
    const { container } = render(<BackToTop />);
    fireScroll(500);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('listens to threshold changes', () => {
    const { rerender } = render(<BackToTop threshold={500} />);
    fireScroll(400);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();

    rerender(<BackToTop threshold={300} />);
    fireScroll(400);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
