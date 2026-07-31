// src/components/matched-fields-tooltip/matched-fields-tooltip.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { TooltipProvider } from '../ui/tooltip';
import { MatchedFieldsTooltip } from './matched-fields-tooltip';

const meta: Meta<typeof MatchedFieldsTooltip> = {
  title: 'Components/MatchedFieldsTooltip',
  component: MatchedFieldsTooltip,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MatchedFieldsTooltip>;

const sampleData = {
  title: 'Project Alpha',
  assignee: 'Jane Smith',
  status: 'In Progress',
  priority: 'High',
  department: 'Engineering',
};

export const Default: Story = {
  args: {
    data: sampleData,
    search: 'jane',
    matchKeys: ['assignee', 'notes'],
  },
};

export const MultipleMatches: Story = {
  args: {
    data: sampleData,
    search: 'eng',
    matchKeys: ['title', 'department', 'notes'],
  },
};

export const NoMatch: Story = {
  args: {
    data: sampleData,
    search: 'zzz',
    matchKeys: ['title', 'assignee'],
  },
};
