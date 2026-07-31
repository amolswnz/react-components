// src/components/back-to-top/back-to-top.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { BackToTop } from './back-to-top';

const meta: Meta<typeof BackToTop> = {
  title: 'Components/BackToTop',
  component: BackToTop,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Scroll-to-top button. Scroll down in the story to see it appear. The button only shows when the page is scrolled past the threshold (default 300px).',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BackToTop>;

export const Default: Story = {
  args: {
    threshold: 100,
  },
};
