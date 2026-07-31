// src/components/date-time-field/date-time-field.stories.tsx
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DateTimeField } from './date-time-field';

const meta: Meta<typeof DateTimeField> = {
  title: 'Input/DateTimeField',
  component: DateTimeField,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DateTimeField>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState('');
    return (
      <div className='max-w-md'>
        <DateTimeField
          date={date}
          time={time}
          onDateChange={setDate}
          onTimeChange={setTime}
          dateLabel='Date'
          timeLabel='Time'
        />
      </div>
    );
  },
};

export const DateOnly: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState('');
    return (
      <div className='max-w-md'>
        <DateTimeField
          date={date}
          time={time}
          onDateChange={setDate}
          onTimeChange={setTime}
          dateLabel='Date'
          showTime={false}
        />
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState('');
    return (
      <div className='max-w-md'>
        <DateTimeField
          date={date}
          time={time}
          onDateChange={setDate}
          onTimeChange={setTime}
          dateLabel='Date'
          timeLabel='Time'
          error='Date is required'
          required
        />
      </div>
    );
  },
};

export const CustomDateFormat: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date());
    const [time, setTime] = useState('');
    return (
      <div className='max-w-md'>
        <DateTimeField
          date={date}
          time={time}
          onDateChange={setDate}
          onTimeChange={setTime}
          dateLabel='Date'
          timeLabel='Time'
          dateFormat='yyyy-MM-dd'
        />
      </div>
    );
  },
};

export const DateRange: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState('');
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 10);
    return (
      <div className='max-w-md'>
        <DateTimeField
          date={date}
          time={time}
          onDateChange={setDate}
          onTimeChange={setTime}
          dateLabel={`Date (Today - ${maxDate.toLocaleDateString()})`}
          timeLabel='Time'
          minDate={new Date()}
          maxDate={maxDate}
        />
      </div>
    );
  },
};

export const CustomErrorRender: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState('');
    return (
      <div className='max-w-md'>
        <DateTimeField
          date={date}
          time={time}
          onDateChange={setDate}
          onTimeChange={setTime}
          dateLabel='Date'
          timeLabel='Time'
          dateError='Invalid date'
          dateRenderError={(error) => (
            <span className='flex items-center gap-1 text-xs text-destructive font-medium'>⚠ {error}</span>
          )}
        />
      </div>
    );
  },
};
