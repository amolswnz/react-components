// src/components/matched-fields-tooltip/matched-fields-tooltip.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TooltipProvider } from '../ui/tooltip';
import { MatchedFieldsTooltip } from './matched-fields-tooltip';

const defaultData = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '555-1234',
  notes: 'Some notes',
};

const renderWithProvider = (ui: React.ReactElement) => render(<TooltipProvider>{ui}</TooltipProvider>);

describe('MatchedFieldsTooltip', () => {
  it('renders nothing when search is empty', () => {
    const { container } = renderWithProvider(
      <MatchedFieldsTooltip data={defaultData} search='' matchKeys={['name', 'email']} />
    );
    expect(container.textContent).toBe('');
  });

  it('renders nothing when no matchKeys match search', () => {
    const { container } = renderWithProvider(
      <MatchedFieldsTooltip data={defaultData} search='john' matchKeys={['phone', 'notes']} />
    );
    expect(container.textContent).toBe('');
  });

  it('renders badge when a matchKey field matches', () => {
    renderWithProvider(
      <MatchedFieldsTooltip data={defaultData} search='john' matchKeys={['name', 'email', 'phone']} />
    );
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('shows matched field details in tooltip on hover', async () => {
    const user = userEvent.setup();
    renderWithProvider(
      <MatchedFieldsTooltip data={defaultData} search='john' matchKeys={['name', 'email', 'phone']} />
    );
    const badge = screen.getByText('2');
    await user.hover(badge);
    const items = await screen.findAllByText('Email:');
    expect(items.length).toBeGreaterThan(0);
  });

  it('renders nothing when matchKey values are null or undefined', () => {
    const { container } = renderWithProvider(
      <MatchedFieldsTooltip
        data={{ ...defaultData, name: null, email: undefined }}
        search='john'
        matchKeys={['name', 'email']}
      />
    );
    expect(container.textContent).toBe('');
  });

  it('shows only matched fields from matchKeys, ignoring unmatched fields in data', () => {
    renderWithProvider(<MatchedFieldsTooltip data={defaultData} search='john' matchKeys={['name']} />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('formats field labels by replacing underscores with spaces', async () => {
    const user = userEvent.setup();
    renderWithProvider(
      <MatchedFieldsTooltip
        data={{ ...defaultData, home_address: '123 Main St' }}
        search='main'
        matchKeys={['home_address']}
      />
    );
    await user.hover(screen.getByText('1'));
    const items = await screen.findAllByText('Home Address:');
    expect(items.length).toBeGreaterThan(0);
  });

  it('performs case-insensitive search', () => {
    renderWithProvider(
      <MatchedFieldsTooltip data={{ ...defaultData, email: 'JOHN@EXAMPLE.COM' }} search='john' matchKeys={['email']} />
    );
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('only checks specified matchKeys, not all data keys', () => {
    const { container } = renderWithProvider(
      <MatchedFieldsTooltip data={defaultData} search='john' matchKeys={['phone']} />
    );
    expect(container.textContent).toBe('');
  });
});
