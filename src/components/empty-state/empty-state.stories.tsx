// src/components/empty-state/empty-state.stories.tsx
import { Inbox, Search } from 'lucide-react';
import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './empty-state';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    title: 'No results found',
    description: 'Try adjusting your search or filters.',
  },
};

export const WithIcon: Story = {
  args: {
    icon: Inbox,
    title: 'No messages',
    description: 'Your inbox is empty. When you receive messages, they will appear here.',
  },
};

export const WithAction: Story = {
  args: {
    icon: Search,
    title: 'No users found',
    description: 'Try adjusting your search or filters.',
    action: {
      label: 'Add User',
      onClick: () => alert('Add new user'),
    },
  },
};

export const WithSuggestions: Story = {
  args: {
    icon: Inbox,
    title: 'No data available',
    description: 'There is no data to display yet.',
    suggestions: [
      'Check your connection and try again',
      'Try selecting a different date range',
      'Contact support if the problem persists',
    ],
  },
};
