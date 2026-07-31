// src/components/single-select/single-select.stories.tsx
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SingleSelect } from './single-select';

const fruitOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'long', label: 'This is long text and can span upto two lines so be careful' },
];

const meta: Meta<typeof SingleSelect> = {
  title: 'Input/SingleSelect',
  component: SingleSelect,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SingleSelect>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className='w-[250px]'>
        <SingleSelect options={fruitOptions} value={value} onChange={setValue} />
      </div>
    );
  },
};

export const Loading: Story = {
  render: () => (
    <div className='w-[250px]'>
      <SingleSelect options={fruitOptions} loading placeholder='Loading...' />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className='w-[250px]'>
      <SingleSelect options={fruitOptions} disabled placeholder='Disabled' />
    </div>
  ),
};

export const WithoutEndOfList: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className='w-[250px]'>
        <SingleSelect options={fruitOptions} value={value} onChange={setValue} showEndOfList={false} />
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className='w-[250px]'>
        <SingleSelect
          options={fruitOptions}
          value={value}
          onChange={setValue}
          label='Choose a fruit'
          error='Please select a fruit'
          placeholder='Select...'
        />
      </div>
    );
  },
};

export const WithLabelAndRequired: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className='w-[250px]'>
        <SingleSelect
          options={fruitOptions}
          value={value}
          onChange={setValue}
          label='Choose a fruit'
          required
          placeholder='Select...'
        />
      </div>
    );
  },
};

export const CustomErrorRender: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className='w-[250px]'>
        <SingleSelect
          options={fruitOptions}
          value={value}
          onChange={setValue}
          label='Choose a fruit'
          error='Please select a fruit'
          renderError={(error) => (
            <div className='flex items-center gap-1.5 text-xs'>
              <span className='inline-flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold'>
                !
              </span>
              <span className='text-destructive'>{error}</span>
            </div>
          )}
          placeholder='Select...'
        />
      </div>
    );
  },
};
