import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SingleSelect } from './single-select';

const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Date', value: 'date' },
  { label: 'Elderberry', value: 'elderberry' },
];

describe('SingleSelect', () => {
  it('renders with placeholder text', () => {
    render(<SingleSelect options={fruits} placeholder='Select a fruit...' />);
    expect(screen.getByText('Select a fruit...')).toBeInTheDocument();
  });

  it('shows the currently selected value', () => {
    render(<SingleSelect options={fruits} value='banana' />);
    expect(screen.getByText('Banana')).toBeInTheDocument();
  });

  it('opens the popover on trigger click', async () => {
    render(<SingleSelect options={fruits} />);
    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger);
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
  });

  it('filters options when typing in the search box', async () => {
    render(<SingleSelect options={fruits} />);
    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger);

    const searchInput = screen.getByPlaceholderText('Search...');
    await userEvent.type(searchInput, 'ap');

    expect(screen.getByRole('option', { name: /ap/i })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: /banana/i })).not.toBeInTheDocument();
  });

  it('calls onChange when an option is selected', async () => {
    const onChange = vi.fn();
    render(<SingleSelect options={fruits} onChange={onChange} />);
    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger);

    const option = screen.getByText('Banana');
    await userEvent.click(option);
    expect(onChange).toHaveBeenCalledWith('banana');
  });

  it("shows 'No results' when no options match", async () => {
    render(<SingleSelect options={fruits} emptyMessage='Nothing found' />);
    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger);

    const searchInput = screen.getByPlaceholderText('Search...');
    await userEvent.type(searchInput, 'xyz');
    expect(screen.getByText('Nothing found')).toBeInTheDocument();
  });

  it('can be disabled', () => {
    render(<SingleSelect options={fruits} disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('shows a loading state', () => {
    render(<SingleSelect options={fruits} loading />);
    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeInTheDocument();
  });

  it('supports AJAX mode via onSearch prop', async () => {
    const onSearch = vi.fn();
    render(<SingleSelect options={fruits} onSearch={onSearch} />);
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
    render(<SingleSelect options={fruits} onSearch={vi.fn()} />);
    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger);

    const searchInput = screen.getByPlaceholderText('Search...');
    await userEvent.type(searchInput, 'ap');

    expect(screen.getByRole('option', { name: /ap/i })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: /banana/i })).not.toBeInTheDocument();
  });

  it('shows required indicator when required', () => {
    render(<SingleSelect options={fruits} label='Fruit' required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders custom option via renderOption', async () => {
    render(<SingleSelect options={fruits} renderOption={(option) => <span>{option.label.toUpperCase()}</span>} />);
    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger);
    expect(await screen.findByText('APPLE')).toBeInTheDocument();
  });

  it('shows createNew option at the bottom of the dropdown', async () => {
    const createNew = { label: '+ Add New', onClick: vi.fn() };
    render(<SingleSelect options={fruits} createNew={createNew} />);
    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger);

    expect(screen.getByText('+ Add New')).toBeInTheDocument();
  });

  it('shows end-of-list item by default', async () => {
    render(<SingleSelect options={fruits} showEndOfList />);
    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger);

    expect(screen.getByText('-- End of list --')).toBeInTheDocument();
  });

  it('hides end-of-list item when showEndOfList is false', async () => {
    render(<SingleSelect options={fruits} showEndOfList={false} />);
    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger);

    expect(screen.queryByText('-- End of list --')).not.toBeInTheDocument();
  });

  it('clears search query when popover closes via Escape', async () => {
    render(<SingleSelect options={fruits} />);
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

  it('clears search query when an option is selected', async () => {
    render(<SingleSelect options={fruits} />);
    const trigger = screen.getByRole('combobox');

    await userEvent.click(trigger);
    const searchInput = screen.getByPlaceholderText('Search...');
    await userEvent.type(searchInput, 'ap');

    await userEvent.click(screen.getByRole('option', { name: /Ap/i }));

    await userEvent.click(trigger);
    expect(screen.getByPlaceholderText('Search...')).toHaveValue('');
    expect(screen.getByText('Banana')).toBeInTheDocument();
  });

  it('calls createNew.onClick with the search query when clicked', async () => {
    const createNew = { label: '+ Add New', onClick: vi.fn() };
    render(<SingleSelect options={fruits} createNew={createNew} onSearch={vi.fn()} />);
    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger);

    const searchInput = screen.getByPlaceholderText('Search...');
    await userEvent.type(searchInput, 'custom fruit');

    await userEvent.click(screen.getByText('+ Add New'));

    expect(createNew.onClick).toHaveBeenCalledWith('custom fruit');
  });
});
