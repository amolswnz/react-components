import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MultiSelect } from './multi-select';

const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Date', value: 'date' },
];

describe('MultiSelect', () => {
  it('renders with placeholder text', () => {
    render(<MultiSelect options={fruits} placeholder='Select fruits...' />);
    expect(screen.getByText('Select fruits...')).toBeInTheDocument();
  });

  it('shows selected values as badges', () => {
    render(<MultiSelect options={fruits} value={['apple', 'banana']} />);
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
  });

  it('shows count when more items selected than max displayed', () => {
    render(<MultiSelect options={fruits} value={['apple', 'banana', 'cherry']} maxDisplayItems={2} />);
    expect(screen.getByText(/\+1/)).toBeInTheDocument();
  });

  it('opens popover on trigger click', async () => {
    render(<MultiSelect options={fruits} />);
    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger);
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
  });

  it('toggles selection when clicking an option', async () => {
    const onChange = vi.fn();
    render(<MultiSelect options={fruits} onChange={onChange} />);
    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger);

    const option = screen.getByRole('option', { name: /Banana/ });
    await userEvent.click(option);
    expect(onChange).toHaveBeenCalledWith(['banana']);
  });

  it('deselects a selected option when clicked', async () => {
    const onChange = vi.fn();
    render(<MultiSelect options={fruits} value={['banana']} onChange={onChange} />);
    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger);

    const option = screen.getByRole('option', { name: /Banana/ });
    await userEvent.click(option);
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('filters options when typing', async () => {
    render(<MultiSelect options={fruits} />);
    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger);

    const searchInput = screen.getByPlaceholderText('Search...');
    await userEvent.type(searchInput, 'ap');

    expect(screen.getByRole('option', { name: /ap/i })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: /banana/i })).not.toBeInTheDocument();
  });

  it('removes a selected badge via keyboard (Enter)', async () => {
    const onChange = vi.fn();
    render(<MultiSelect options={fruits} value={['apple']} onChange={onChange} />);
    const removeButton = screen.getByLabelText('Remove Apple');
    await userEvent.type(removeButton, '{Enter}');
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('renders custom option via renderOption', async () => {
    render(<MultiSelect options={fruits} renderOption={(option) => <span>{option.label.toUpperCase()}</span>} />);
    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger);
    expect(await screen.findByText('APPLE')).toBeInTheDocument();
  });

  it('removes a selected badge when clicking its remove button', async () => {
    const onChange = vi.fn();
    render(<MultiSelect options={fruits} value={['apple']} onChange={onChange} />);
    const removeButton = screen.getByLabelText('Remove Apple');
    await userEvent.click(removeButton);
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('can be disabled', () => {
    render(<MultiSelect options={fruits} disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('supports AJAX mode via onSearch', async () => {
    const onSearch = vi.fn();
    render(<MultiSelect options={fruits} onSearch={onSearch} />);
    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger);

    const searchInput = screen.getByPlaceholderText('Search...');
    await userEvent.type(searchInput, 'app', { delay: 10 });

    await waitFor(
      () => {
        expect(onSearch).toHaveBeenCalledWith('app');
      },
      { timeout: 2000 }
    );
  });

  it('filters options client-side when onSearch is provided', async () => {
    render(<MultiSelect options={fruits} onSearch={vi.fn()} />);
    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger);

    const searchInput = screen.getByPlaceholderText('Search...');
    await userEvent.type(searchInput, 'ap');

    expect(screen.getByRole('option', { name: /ap/i })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: /banana/i })).not.toBeInTheDocument();
  });

  it('shows createNew option at the bottom of the dropdown', async () => {
    const createNew = { label: '+ Add New', onClick: vi.fn() };
    render(<MultiSelect options={fruits} createNew={createNew} />);
    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger);

    expect(screen.getByText('+ Add New')).toBeInTheDocument();
  });

  it('shows end-of-list item by default', async () => {
    render(<MultiSelect options={fruits} showEndOfList />);
    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger);

    expect(screen.getByText('-- End of list --')).toBeInTheDocument();
  });

  it('shows required indicator when required', () => {
    render(<MultiSelect options={fruits} label='Fruits' required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('applies error styling', () => {
    render(<MultiSelect options={fruits} error='Invalid' />);
    const trigger = screen.getByRole('combobox');
    expect(trigger.className).toContain('border-destructive');
  });

  it('shows loading spinner', () => {
    const { container } = render(<MultiSelect options={fruits} loading />);
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toBeTruthy();
  });

  it('removes a selected badge via keyboard (Space)', async () => {
    const onChange = vi.fn();
    render(<MultiSelect options={fruits} value={['apple']} onChange={onChange} />);
    const removeButton = screen.getByLabelText('Remove Apple');
    await userEvent.type(removeButton, ' ');
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('hides end-of-list item when showEndOfList is false', async () => {
    render(<MultiSelect options={fruits} showEndOfList={false} />);
    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger);

    expect(screen.queryByText('-- End of list --')).not.toBeInTheDocument();
  });

  it('clears search query when popover closes via Escape', async () => {
    render(<MultiSelect options={fruits} />);
    const trigger = screen.getByRole('combobox');

    await userEvent.click(trigger);
    const searchInput = screen.getByPlaceholderText('Search...');
    await userEvent.type(searchInput, 'ap');
    expect(screen.queryByText('Banana')).not.toBeInTheDocument();

    await userEvent.keyboard('{Escape}');

    await userEvent.click(trigger);
    expect(screen.getByPlaceholderText('Search...')).toHaveValue('');
    expect(screen.getByText('Banana')).toBeInTheDocument();
  });

  it('calls createNew.onClick with the search query when clicked', async () => {
    const createNew = { label: '+ Add New', onClick: vi.fn() };
    render(<MultiSelect options={fruits} createNew={createNew} onSearch={vi.fn()} />);
    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger);

    const searchInput = screen.getByPlaceholderText('Search...');
    await userEvent.type(searchInput, 'custom fruit');

    await userEvent.click(screen.getByText('+ Add New'));

    expect(createNew.onClick).toHaveBeenCalledWith('custom fruit');
  });
});
