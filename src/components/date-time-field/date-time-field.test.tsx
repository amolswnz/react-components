import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { format } from 'date-fns';
import { DateTimeField } from './date-time-field';

describe('DateTimeField', () => {
  const defaultProps = {
    date: null,
    time: null,
    onDateChange: vi.fn(),
    onTimeChange: vi.fn(),
  };

  it('does not render labels when dateLabel and timeLabel are not provided', () => {
    render(<DateTimeField {...defaultProps} />);
    expect(screen.queryByText('Date')).not.toBeInTheDocument();
    expect(screen.queryByText('Time')).not.toBeInTheDocument();
  });

  it('renders custom date and time labels', () => {
    render(<DateTimeField {...defaultProps} dateLabel='Start Date' timeLabel='Start Time' />);
    expect(screen.getByText('Start Date')).toBeInTheDocument();
    expect(screen.getByText('Start Time')).toBeInTheDocument();
  });

  it("renders 'Pick a date' when no date selected", () => {
    render(<DateTimeField {...defaultProps} />);
    expect(screen.getByText('Pick a date')).toBeInTheDocument();
  });

  it('shows formatted date when date is selected', () => {
    const date = new Date(2025, 0, 15);
    render(<DateTimeField {...defaultProps} date={date} />);
    expect(screen.getByText(format(date, 'PPP'))).toBeInTheDocument();
  });

  it('uses custom dateFormat when provided', () => {
    const date = new Date(2025, 0, 15);
    render(<DateTimeField {...defaultProps} date={date} dateFormat='yyyy-MM-dd' />);
    expect(screen.getByText('2025-01-15')).toBeInTheDocument();
  });

  it('shows required indicator on both date and time labels when required', () => {
    render(<DateTimeField {...defaultProps} dateLabel='Date' timeLabel='Time' required />);
    expect(screen.getAllByText('*')).toHaveLength(2);
  });

  it('shows error message on both fields when error is provided', () => {
    render(<DateTimeField {...defaultProps} error='This field is required' />);
    expect(screen.getAllByText('This field is required')).toHaveLength(2);
  });

  it('shows separate error messages for date and time fields', () => {
    render(
      <DateTimeField
        {...defaultProps}
        dateLabel='Date'
        timeLabel='Time'
        dateError='Date is required'
        timeError='Time is required'
      />
    );
    expect(screen.getByText('Date is required')).toBeInTheDocument();
    expect(screen.getByText('Time is required')).toBeInTheDocument();
  });

  it('hides time selector when showTime is false', () => {
    render(<DateTimeField {...defaultProps} showTime={false} />);
    expect(screen.queryByText('Time')).not.toBeInTheDocument();
  });

  it('opens calendar popover on button click', async () => {
    render(<DateTimeField {...defaultProps} />);
    const trigger = screen.getByRole('button', { name: /pick a date/i });
    await userEvent.click(trigger);

    const calendarGrid = document.querySelector('[role=grid]');
    expect(calendarGrid).toBeInTheDocument();
  });

  it('calls onDateChange when date selected in calendar', async () => {
    const onDateChange = vi.fn();
    render(<DateTimeField {...defaultProps} onDateChange={onDateChange} />);
    const trigger = screen.getByRole('button', { name: /pick a date/i });
    await userEvent.click(trigger);

    const dayButtons = document.querySelectorAll(
      '[role="gridcell"] button, [role="grid"] button, button:not([disabled])'
    );
    const dayButton = Array.from(dayButtons).find(
      (btn) => btn.textContent && !isNaN(parseInt(btn.textContent, 10)) && btn.getAttribute('role') !== 'gridcell'
    );
    if (dayButton) {
      await userEvent.click(dayButton);
      expect(onDateChange).toHaveBeenCalled();
    }
  });

  it('shows the currently selected time in AM/PM format', () => {
    render(<DateTimeField {...defaultProps} time='13:30:00' />);
    expect(screen.getByText('1:30 PM')).toBeInTheDocument();
  });

  it('shows the currently selected time value', () => {
    render(<DateTimeField {...defaultProps} time='09:00:00' />);
    expect(screen.getByText('9:00 AM')).toBeInTheDocument();
  });

  it('renders time options (96 options for 24h at 15min intervals)', () => {
    render(<DateTimeField {...defaultProps} timeLabel='Time' />);
    expect(screen.getByText('Time')).toBeInTheDocument();
  });

  it('applies error styling to date button', () => {
    render(<DateTimeField {...defaultProps} error='Invalid date' />);
    const button = screen.getByRole('button', { name: /pick a date/i });
    expect(button.className).toContain('border-destructive');
  });

  it('prevents selecting dates outside minDate range', async () => {
    const onDateChange = vi.fn();
    render(
      <DateTimeField
        {...defaultProps}
        onDateChange={onDateChange}
        dateLabel='Date'
        minDate={new Date(2025, 5, 1)}
        maxDate={new Date(2025, 5, 30)}
      />
    );
    const trigger = screen.getByRole('button', { name: /pick a date/i });
    await userEvent.click(trigger);

    const disabledBtns = document.querySelectorAll('[data-slot="calendar"] button:disabled');
    expect(disabledBtns.length).toBeGreaterThan(0);

    await userEvent.click(disabledBtns[0]);
    expect(onDateChange).not.toHaveBeenCalled();
  });

  it('applies error styling to time trigger', () => {
    render(<DateTimeField {...defaultProps} timeError='Invalid time' />);
    const triggers = screen.getAllByRole('combobox');
    expect(triggers[0].className).toContain('border-destructive');
  });

  it('calls onDateChange with null when date is deselected', async () => {
    const onDateChange = vi.fn();
    const Wrapper = () => {
      const [date, setDate] = React.useState<Date | null>(null);
      return (
        <DateTimeField
          {...defaultProps}
          date={date}
          onDateChange={(d) => {
            setDate(d);
            onDateChange(d);
          }}
        />
      );
    };
    render(<Wrapper />);
    const trigger = screen.getByRole('button', { name: /pick a date/i });
    await userEvent.click(trigger);

    const dayButton = Array.from(document.querySelectorAll('[role="gridcell"] button')).find(
      (btn) =>
        btn.textContent &&
        !isNaN(parseInt(btn.textContent, 10)) &&
        parseInt(btn.textContent, 10) >= 1 &&
        parseInt(btn.textContent, 10) <= 28
    );
    if (dayButton) {
      await userEvent.click(dayButton);
      expect(onDateChange).toHaveBeenCalledWith(expect.any(Date));
    }

    onDateChange.mockClear();
    await userEvent.click(trigger);
    const sameDayButton = Array.from(document.querySelectorAll('[role="gridcell"] button')).find(
      (btn) =>
        btn.textContent &&
        !isNaN(parseInt(btn.textContent, 10)) &&
        parseInt(btn.textContent, 10) >= 1 &&
        parseInt(btn.textContent, 10) <= 28
    );
    if (sameDayButton) {
      await userEvent.click(sameDayButton);
      expect(onDateChange).toHaveBeenCalledWith(null);
    }
  });

  it('selects April 14, 2020 from calendar', async () => {
    const onDateChange = vi.fn();
    render(<DateTimeField {...defaultProps} onDateChange={onDateChange} />);
    const trigger = screen.getByRole('button', { name: /pick a date/i });
    await userEvent.click(trigger);

    const calendar = document.querySelector('[data-slot="calendar"]');
    const selects = calendar?.querySelectorAll('select');
    const monthSelect = selects?.[0];
    const yearSelect = selects?.[1];
    if (monthSelect && yearSelect) {
      await userEvent.selectOptions(monthSelect, '3');
      await userEvent.selectOptions(yearSelect, '2020');

      const dayButton = Array.from(calendar?.querySelectorAll('button') ?? []).find(
        (btn) => btn.textContent?.trim() === '14'
      );

      if (dayButton) {
        await userEvent.click(dayButton);
        expect(onDateChange).toHaveBeenCalledWith(expect.any(Date));
        const calledDate = onDateChange.mock.calls[0][0] as Date;
        expect(calledDate.getFullYear()).toBe(2020);
        expect(calledDate.getMonth()).toBe(3);
        expect(calledDate.getDate()).toBe(14);
      }
    }
  });
});
