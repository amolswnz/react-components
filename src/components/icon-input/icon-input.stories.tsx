// src/components/icon-input/icon-input.stories.tsx
import { Search, X, Lock, Mail, CreditCard, Eye } from 'lucide-react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { IconInput } from './icon-input';

const meta: Meta<typeof IconInput> = {
  title: 'Input/IconInput',
  component: IconInput,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof IconInput>;

export const WithLeftIcon: Story = {
  render: () => (
    <div className='max-w-sm'>
      <IconInput icon={<Search />} placeholder='Search...' />
    </div>
  ),
};

export const WithBothIcons: Story = {
  render: () => (
    <div className='max-w-sm'>
      <IconInput
        icon={<Search />}
        endIcon={
          <Button type='button' variant='ghost' size='icon' className='h-7 w-7 rounded-full' aria-label='Clear'>
            <X />
          </Button>
        }
        defaultValue='Some value'
      />
    </div>
  ),
};

export const WithLockIcon: Story = {
  render: () => (
    <div className='max-w-sm space-y-4'>
      <IconInput icon={<CreditCard />} placeholder='Card number' type='text' />
      <IconInput icon={<Lock />} defaultValue='mypassword' type='password' />
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className='max-w-sm'>
      <IconInput
        icon={<Mail />}
        label='Email address'
        error='Please enter a valid email'
        placeholder='you@example.com'
      />
    </div>
  ),
};

export const WithLabelAndRequired: Story = {
  render: () => (
    <div className='max-w-sm'>
      <IconInput icon={<Mail />} label='Email address' required placeholder='you@example.com' />
    </div>
  ),
};

export const CustomErrorRender: Story = {
  render: () => (
    <div className='max-w-sm'>
      <IconInput
        icon={<Mail />}
        label='Email address'
        error='Please enter a valid email'
        renderError={(error) => (
          <span className='inline-flex items-center gap-1 rounded-md bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive'>
            <span className='text-destructive/60'>✕</span>
            {error}
          </span>
        )}
        placeholder='you@example.com'
      />
    </div>
  ),
};

export const InCard: Story = {
  render: () => (
    <Card className='max-w-sm'>
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <IconInput icon={<Mail />} placeholder='Email' type='email' />
        <IconInput icon={<Lock />} endIcon={<Eye />} placeholder='Password' type='password' />
        <Button className='w-full cursor-pointer'>Sign In</Button>
      </CardContent>
    </Card>
  ),
};
