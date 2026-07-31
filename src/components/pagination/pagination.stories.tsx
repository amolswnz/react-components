// src/components/pagination/pagination.stories.tsx
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <div className='max-w-2xl'>
        <Pagination currentPage={page} totalItems={100} itemsPerPage={10} onPageChange={setPage} />
      </div>
    );
  },
};

export const FirstPage: Story = {
  render: () => (
    <div className='max-w-2xl'>
      <Pagination currentPage={1} totalItems={100} itemsPerPage={10} onPageChange={() => {}} />
    </div>
  ),
};

export const MiddlePage: Story = {
  render: () => (
    <div className='max-w-2xl'>
      <Pagination currentPage={5} totalItems={100} itemsPerPage={10} onPageChange={() => {}} />
    </div>
  ),
};

export const LastPage: Story = {
  render: () => (
    <div className='max-w-2xl'>
      <Pagination currentPage={10} totalItems={100} itemsPerPage={10} onPageChange={() => {}} />
    </div>
  ),
};

export const SinglePage: Story = {
  render: () => (
    <div className='max-w-2xl'>
      <Pagination currentPage={1} totalItems={5} itemsPerPage={10} onPageChange={() => {}} />
    </div>
  ),
};

export const UsingMeta: Story = {
  render: () => (
    <div className='max-w-2xl'>
      <Pagination
        meta={{
          current_page: 2,
          from: 11,
          last_page: 5,
          per_page: 10,
          to: 20,
          total: 50,
        }}
        onPageChange={() => {}}
      />
    </div>
  ),
};
