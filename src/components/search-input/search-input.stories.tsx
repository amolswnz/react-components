// src/components/search-input/search-input.stories.tsx
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SearchInput } from './search-input';

const meta: Meta<typeof SearchInput> = {
  title: 'Input/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className='max-w-sm space-y-4'>
        <SearchInput value={value} onChange={setValue} placeholder='Search anything...' />
      </div>
    );
  },
};

export const Loading: Story = {
  render: () => (
    <div className='max-w-sm'>
      <SearchInput defaultValue='Loading example' loading placeholder='Search...' />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className='max-w-sm'>
      <SearchInput value="Can't touch this" disabled placeholder='Search...' />
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className='max-w-sm'>
      <SearchInput label='Search users' error='No results found' placeholder='Search...' />
    </div>
  ),
};

export const WithLabelAndRequired: Story = {
  render: () => (
    <div className='max-w-sm'>
      <SearchInput label='Search users' required placeholder='Search...' />
    </div>
  ),
};

export const CustomErrorRender: Story = {
  render: () => (
    <div className='max-w-sm'>
      <SearchInput
        label='Search users'
        error='No results found'
        renderError={(error) => (
          <span className='rounded-sm border border-destructive/40 bg-destructive/5 px-1.5 py-0.5 text-xs text-destructive'>
            {error}
          </span>
        )}
        placeholder='Search...'
      />
    </div>
  ),
};
