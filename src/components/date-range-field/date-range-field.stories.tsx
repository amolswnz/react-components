// src/components/date-range-field/date-range-field.stories.tsx
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DateRangeField } from './date-range-field';

const meta: Meta<typeof DateRangeField> = {
  title: 'Input/DateRangeField',
  component: DateRangeField,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DateRangeField>;

export const Default: Story = {
  render: () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    return (
      <div className='max-w-sm'>
        <DateRangeField
          label='Date Range'
          from={from}
          to={to}
          onChange={(f, t) => {
            setFrom(f);
            setTo(t);
          }}
        />
      </div>
    );
  },
};

export const WithSelection: Story = {
  render: () => (
    <div className='max-w-sm'>
      <DateRangeField label='Created Date' from='2024-01-01' to='2024-12-31' onChange={() => {}} />
    </div>
  ),
};

export const WithError: Story = {
  render: () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    return (
      <div className='max-w-sm'>
        <DateRangeField
          label='Date Range'
          from={from}
          to={to}
          error='Please select a date range'
          onChange={(f, t) => {
            setFrom(f);
            setTo(t);
          }}
        />
      </div>
    );
  },
};

export const WithRequired: Story = {
  render: () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    return (
      <div className='max-w-sm'>
        <DateRangeField
          label='Date Range'
          from={from}
          to={to}
          required
          onChange={(f, t) => {
            setFrom(f);
            setTo(t);
          }}
        />
      </div>
    );
  },
};

export const CustomErrorRender: Story = {
  render: () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    return (
      <div className='max-w-sm'>
        <DateRangeField
          label='Date Range'
          from={from}
          to={to}
          error='Please select a date range'
          renderError={(error) => (
            <span className='flex items-center gap-1 text-xs text-destructive font-medium'>⚠ {error}</span>
          )}
          onChange={(f, t) => {
            setFrom(f);
            setTo(t);
          }}
        />
      </div>
    );
  },
};
