// src/components/password-input/password-input.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PasswordInput } from './password-input';

describe('PasswordInput', () => {
  it('renders with placeholder', () => {
    render(<PasswordInput placeholder='Enter password' />);
    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
  });

  it('renders with default placeholder', () => {
    render(<PasswordInput />);
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('renders with lock icon', () => {
    const { container } = render(<PasswordInput />);
    expect(container.querySelector('svg.lucide-lock')).toBeInTheDocument();
  });

  it('hides password by default', () => {
    render(<PasswordInput defaultValue='secret' />);
    const input = screen.getByPlaceholderText('Password');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('shows eye button when value is present', () => {
    render(<PasswordInput defaultValue='secret' />);
    expect(screen.getByLabelText('Show password')).toBeInTheDocument();
  });

  it('does not show eye button when value is empty', () => {
    render(<PasswordInput value='' />);
    expect(screen.queryByLabelText('Show password')).not.toBeInTheDocument();
  });

  it('toggles password visibility on eye click', async () => {
    const user = userEvent.setup();
    render(<PasswordInput defaultValue='secret' />);
    const input = screen.getByPlaceholderText('Password');
    expect(input).toHaveAttribute('type', 'password');

    await user.click(screen.getByLabelText('Show password'));
    expect(input).toHaveAttribute('type', 'text');
    expect(screen.getByLabelText('Hide password')).toBeInTheDocument();

    await user.click(screen.getByLabelText('Hide password'));
    expect(input).toHaveAttribute('type', 'password');
  });

  it('calls onChange when typing', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<PasswordInput onChange={onChange} />);
    await user.type(screen.getByPlaceholderText('Password'), 'a');
    expect(onChange).toHaveBeenCalledWith('a');
  });

  it('supports controlled value', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(<PasswordInput value='initial' onChange={onChange} />);
    expect(screen.getByPlaceholderText('Password')).toHaveValue('initial');

    await user.type(screen.getByPlaceholderText('Password'), 'x');
    expect(onChange).toHaveBeenCalled();

    rerender(<PasswordInput value='updated' onChange={onChange} />);
    expect(screen.getByPlaceholderText('Password')).toHaveValue('updated');
  });

  it('disables input and button when disabled', () => {
    render(<PasswordInput defaultValue='secret' disabled />);
    expect(screen.getByPlaceholderText('Password')).toBeDisabled();
    expect(screen.getByLabelText('Show password')).toBeDisabled();
  });

  it('applies custom className', () => {
    const { container } = render(<PasswordInput className='custom-class' />);
    const input = container.querySelector('input');
    expect(input?.classList.contains('custom-class')).toBe(true);
  });

  it('shows required indicator when required', () => {
    render(<PasswordInput label='Password' required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });
});
