// src/components/toast-provider/toast-provider.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { toast } from 'react-hot-toast';
import { Button } from '../ui/button';
import { ToastProvider } from './toast-provider';

const meta: Meta<typeof ToastProvider> = {
  title: 'Components/ToastProvider',
  component: ToastProvider,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ToastProvider>;

export const Default: Story = {
  render: () => (
    <>
      <ToastProvider />
      <div className='flex flex-wrap gap-2'>
        <Button onClick={() => toast.success('Saved successfully!')}>Show Success</Button>
        <Button variant='destructive' onClick={() => toast.error('Something went wrong.')}>
          Show Error
        </Button>
        <Button variant='outline' onClick={() => toast('This is a default toast.')}>
          Show Default
        </Button>
        <Button
          variant='secondary'
          onClick={() => (toast as unknown as Record<string, unknown>).info?.('Did you know?') as unknown as void}
        >
          Show Info
        </Button>
        <Button
          variant='secondary'
          onClick={() =>
            (toast as unknown as Record<string, unknown>).warning?.('Proceed with caution.') as unknown as void
          }
        >
          Show Warning
        </Button>
        <Button
          variant='outline'
          onClick={() => {
            const id = toast.loading('Processing...');
            setTimeout(() => toast.dismiss(id), 2000);
          }}
        >
          Show Loading
        </Button>
      </div>
    </>
  ),
};
