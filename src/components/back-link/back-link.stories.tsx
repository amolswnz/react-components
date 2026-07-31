// src/components/back-link/back-link.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { BackLink } from './back-link';

const meta: Meta<typeof BackLink> = {
  title: 'Components/BackLink',
  component: BackLink,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BackLink>;

export const Default: Story = {
  args: {
    label: 'Back to dashboard',
    href: '#',
  },
};

export const CustomLabel: Story = {
  args: {
    label: 'Return to users list',
    href: '#',
  },
};
