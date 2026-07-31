import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchInput } from './search-input';

describe('SearchInput', () => {
  it('renders with a placeholder', () => {
    render(<SearchInput placeholder='Search items...' />);
    expect(screen.getByPlaceholderText('Search items...')).toBeInTheDocument();
  });

  it('renders a search icon', () => {
    render(<SearchInput />);
    const input = screen.getByRole('textbox');
    const svg = input.parentElement?.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('shows a close button when there is input value', () => {
    render(<SearchInput value='hello' onChange={() => {}} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('does not show a close button when input is empty', () => {
    render(<SearchInput value='' onChange={() => {}} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('calls onChange when the close button is clicked', async () => {
    const onChange = vi.fn();
    render(<SearchInput value='hello' onChange={onChange} />);
    const clearButton = screen.getByRole('button');
    await userEvent.click(clearButton);
    expect(onChange).toHaveBeenCalledWith('');
  });

  it('calls onChange on keystroke', async () => {
    const onChange = vi.fn();
    render(<SearchInput onChange={onChange} />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'hey');
    expect(onChange).toHaveBeenCalledTimes(3);
  });

  it('can be disabled', () => {
    render(<SearchInput disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('forwards additional input props (maxLength)', () => {
    render(<SearchInput maxLength={10} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('maxLength', '10');
  });

  it('applies custom className', () => {
    render(<SearchInput className='custom-class' />);
    const input = screen.getByRole('textbox');
    expect(input.className).toContain('custom-class');
  });

  it('renders with a loading indicator when loading prop is true', () => {
    render(<SearchInput loading />);
    const input = screen.getByRole('textbox');
    const spinner = input.parentElement?.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('calls onClear when clear button is clicked in uncontrolled mode', async () => {
    const onClear = vi.fn();
    const onChange = vi.fn();
    render(<SearchInput defaultValue='initial' onChange={onChange} onClear={onClear} />);
    const clearButton = screen.getByRole('button');
    await userEvent.click(clearButton);
    expect(onChange).toHaveBeenCalledWith('');
    expect(onClear).toHaveBeenCalledOnce();
  });

  it('supports uncontrolled mode with defaultValue', async () => {
    render(<SearchInput defaultValue='initial' />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('initial');
    await userEvent.clear(input);
    expect(input.value).toBe('');
  });
});
