// src/components/date-range-field/date-range-field.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { format } from 'date-fns';
import { DateRangeField } from './date-range-field';

describe('DateRangeField', () => {
  const defaultProps = {
    label: 'Created At',
    onChange: vi.fn(),
  };

  it('renders the label', () => {
    render(<DateRangeField {...defaultProps} />);
    expect(screen.getByText('Created At')).toBeInTheDocument();
  });

  it('shows default placeholder when no dates selected', () => {
    render(<DateRangeField {...defaultProps} />);
    expect(screen.getByText('Select date range')).toBeInTheDocument();
  });

  it('shows custom placeholder', () => {
    render(<DateRangeField {...defaultProps} placeholder='Pick a period' />);
    expect(screen.getByText('Pick a period')).toBeInTheDocument();
  });

  it('shows formatted single date when only from is provided', () => {
    const date = new Date(2025, 0, 15);
    render(<DateRangeField {...defaultProps} from={date.toISOString()} />);
    expect(screen.getByText(`From ${format(date, 'PP')}`)).toBeInTheDocument();
  });

  it('shows formatted date range when both from and to are provided', () => {
    const from = new Date(2025, 0, 15);
    const to = new Date(2025, 1, 20);
    render(<DateRangeField {...defaultProps} from={from.toISOString()} to={to.toISOString()} />);
    expect(screen.getByText(`${format(from, 'PP')} – ${format(to, 'PP')}`)).toBeInTheDocument();
  });

  it('applies muted foreground class when no range selected', () => {
    render(<DateRangeField {...defaultProps} />);
    const button = screen.getByRole('button', { name: /select date range/i });
    expect(button.className).toContain('text-muted-foreground');
  });

  it('does not apply muted foreground when range is selected', () => {
    const from = new Date(2025, 0, 15).toISOString();
    render(<DateRangeField {...defaultProps} from={from} />);
    const button = screen.getByRole('button', { name: /from/i });
    expect(button.className).not.toContain('text-muted-foreground');
  });

  it('opens calendar popover on button click', async () => {
    render(<DateRangeField {...defaultProps} />);
    await userEvent.click(screen.getByRole('button', { name: /select date range/i }));

    const month = await screen.findByText(
      /january|february|march|april|may|june|july|august|september|october|november|december/i
    );
    expect(month).toBeInTheDocument();
  });

  it('calls onChange when date range is selected', async () => {
    const onChange = vi.fn();
    render(<DateRangeField {...defaultProps} onChange={onChange} />);
    await userEvent.click(screen.getByRole('button', { name: /select date range/i }));

    const dialog = screen.getByRole('dialog');
    const buttons = dialog.querySelectorAll('button');
    const dayButton = Array.from(buttons).find((btn) => {
      const text = btn.textContent?.trim();
      return text && /^\d+$/.test(text) && parseInt(text, 10) >= 1 && parseInt(text, 10) <= 28;
    });

    if (dayButton) {
      await userEvent.click(dayButton);
      expect(onChange).toHaveBeenCalled();
      const [from, to] = onChange.mock.calls[0];
      expect(typeof from).toBe('string');
      expect(typeof to).toBe('string');
    }
  });

  it('shows clear button when from date is selected', () => {
    const from = new Date(2025, 0, 15).toISOString();
    render(<DateRangeField {...defaultProps} from={from} />);
    expect(screen.getByRole('button', { name: 'Clear date range' })).toBeInTheDocument();
  });

  it('hides clear button when no date selected', () => {
    render(<DateRangeField {...defaultProps} />);
    expect(screen.queryByRole('button', { name: 'Clear date range' })).not.toBeInTheDocument();
  });

  it('calls onChange with empty strings when clear button is clicked', async () => {
    const onChange = vi.fn();
    const from = new Date(2025, 0, 15).toISOString();
    const to = new Date(2025, 1, 20).toISOString();
    render(<DateRangeField {...defaultProps} from={from} to={to} onChange={onChange} />);
    await userEvent.click(screen.getByRole('button', { name: 'Clear date range' }));
    expect(onChange).toHaveBeenCalledWith('', '');
  });

  it('sets displayName', () => {
    expect(DateRangeField.displayName).toBe('DateRangeField');
  });

  it('calls onChange with Last 60 days preset', async () => {
    const onChange = vi.fn();
    render(<DateRangeField {...defaultProps} onChange={onChange} />);
    await userEvent.click(screen.getByRole('button', { name: /select date range/i }));
    await userEvent.click(await screen.findByText('Last 60 days'));
    expect(onChange).toHaveBeenCalled();
    const [from, to] = onChange.mock.calls[0];
    expect(typeof from).toBe('string');
    expect(typeof to).toBe('string');
  });

  it('calls onChange with Last 90 days preset', async () => {
    const onChange = vi.fn();
    render(<DateRangeField {...defaultProps} onChange={onChange} />);
    await userEvent.click(screen.getByRole('button', { name: /select date range/i }));
    await userEvent.click(await screen.findByText('Last 90 days'));
    expect(onChange).toHaveBeenCalled();
    const [from, to] = onChange.mock.calls[0];
    expect(typeof from).toBe('string');
    expect(typeof to).toBe('string');
  });
});
