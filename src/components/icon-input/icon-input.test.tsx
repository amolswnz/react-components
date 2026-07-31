import { MailIcon, LockIcon, HelpCircleIcon, Star } from 'lucide-react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IconInput } from './icon-input';

describe('IconInput', () => {
  it('renders with an icon', () => {
    render(<IconInput icon={<MailIcon />} placeholder='Email' />);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with both start and end icons', () => {
    render(<IconInput icon={<MailIcon />} endIcon={<LockIcon />} placeholder='Email' />);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  });

  it('renders without an end icon when not provided', () => {
    render(<IconInput icon={<MailIcon />} placeholder='Email' />);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  });

  it('can be disabled', () => {
    render(<IconInput icon={<MailIcon />} disabled placeholder='Email' />);
    expect(screen.getByPlaceholderText('Email')).toBeDisabled();
  });

  it('forwards additional input props', () => {
    render(<IconInput icon={<MailIcon />} placeholder='Email' maxLength={10} />);
    expect(screen.getByPlaceholderText('Email')).toHaveAttribute('maxLength', '10');
  });

  it('applies custom className to the input', () => {
    render(<IconInput icon={<MailIcon />} placeholder='Email' className='custom-class' />);
    const input = screen.getByPlaceholderText('Email');
    expect(input.className).toContain('custom-class');
  });

  it('handles user input', async () => {
    render(<IconInput icon={<MailIcon />} placeholder='Email' />);
    const input = screen.getByPlaceholderText('Email');
    await userEvent.type(input, 'hello');
    expect(input).toHaveValue('hello');
  });

  it('supports controlled value', () => {
    render(<IconInput icon={<MailIcon />} value='controlled' readOnly placeholder='Email' />);
    const input = screen.getByPlaceholderText('Email');
    expect(input).toHaveValue('controlled');
  });

  it('renders with a password type', () => {
    render(<IconInput icon={<LockIcon />} endIcon={<HelpCircleIcon />} type='password' placeholder='Password' />);
    const input = screen.getByPlaceholderText('Password');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('shows required indicator when required', () => {
    render(<IconInput icon={<Star />} label='Email' required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('applies error styling', () => {
    render(<IconInput icon={<Star />} placeholder='Test' error='Invalid' />);
    const input = screen.getByPlaceholderText('Test');
    expect(input.className).toContain('border-destructive');
  });
});
