// src/components/multi-select/multi-select.stories.tsx
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MultiSelect } from './multi-select';

const roleOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' },
  { value: 'contributor', label: 'Contributor' },
  { value: 'guest', label: 'Guest' },
];

const meta: Meta<typeof MultiSelect> = {
  title: 'Input/MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div className='w-[350px]'>
        <MultiSelect options={roleOptions} value={value} onChange={setValue} />
      </div>
    );
  },
};

export const WithSelection: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['admin', 'editor']);
    return (
      <div className='w-[350px]'>
        <MultiSelect options={roleOptions} value={value} onChange={setValue} />
      </div>
    );
  },
};

export const Loading: Story = {
  render: () => (
    <div className='w-[350px]'>
      <MultiSelect options={roleOptions} loading placeholder='Loading...' />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className='w-[350px]'>
      <MultiSelect options={roleOptions} disabled placeholder='Disabled' />
    </div>
  ),
};

export const WithoutEndOfList: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div className='w-[350px]'>
        <MultiSelect options={roleOptions} value={value} onChange={setValue} showEndOfList={false} />
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div className='w-[350px]'>
        <MultiSelect
          options={roleOptions}
          value={value}
          onChange={setValue}
          label='Assign roles'
          error='Please select at least one role'
          placeholder='Select roles...'
        />
      </div>
    );
  },
};

export const WithLabelAndRequired: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div className='w-[350px]'>
        <MultiSelect
          options={roleOptions}
          value={value}
          onChange={setValue}
          label='Assign roles'
          required
          placeholder='Select roles...'
        />
      </div>
    );
  },
};

export const CustomErrorRender: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div className='w-[350px]'>
        <MultiSelect
          options={roleOptions}
          value={value}
          onChange={setValue}
          label='Assign roles'
          error='Please select at least one role'
          renderError={(error) => (
            <div className='border-l-2 border-destructive pl-2 text-xs text-destructive'>{error}</div>
          )}
          placeholder='Select roles...'
        />
      </div>
    );
  },
};
