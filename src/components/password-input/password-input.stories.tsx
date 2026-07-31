// src/components/password-input/password-input.stories.tsx
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { PasswordInput } from './password-input';

const meta: Meta<typeof PasswordInput> = {
  title: 'Input/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {
  render: () => (
    <div className='max-w-sm'>
      <PasswordInput />
    </div>
  ),
};

export const WithValue: Story = {
  render: () => (
    <div className='max-w-sm'>
      <PasswordInput defaultValue='mysecretpassword' />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className='max-w-sm space-y-2'>
        <PasswordInput value={value} onChange={setValue} placeholder='Type something...' />
        <p className='text-sm text-muted-foreground'>Value: {value || '(empty)'}</p>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className='max-w-sm space-y-4'>
      <PasswordInput defaultValue='canttouchthis' disabled />
      <PasswordInput disabled />
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className='max-w-sm'>
      <PasswordInput label='Password' error='Password must be at least 8 characters' placeholder='Enter password' />
    </div>
  ),
};

export const WithLabelAndRequired: Story = {
  render: () => (
    <div className='max-w-sm'>
      <PasswordInput label='Password' required placeholder='Enter password' />
    </div>
  ),
};

export const CustomErrorRender: Story = {
  render: () => (
    <div className='max-w-sm'>
      <PasswordInput
        label='Password'
        error='Password must be at least 8 characters'
        renderError={(error) => <span className='text-[11px] text-destructive/80 italic'>{error}</span>}
        placeholder='Enter password'
      />
    </div>
  ),
};

export const InCard: Story = {
  render: () => (
    <Card className='max-w-sm'>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>Enter your new password below.</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <PasswordInput placeholder='Current password' />
        <PasswordInput placeholder='New password' />
        <PasswordInput placeholder='Confirm new password' />
        <Button className='w-full cursor-pointer'>Update Password</Button>
      </CardContent>
    </Card>
  ),
};
