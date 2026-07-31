import { Separator } from '../../src/components/ui/separator';

function Sidebar({ currentSlug, onNavigate }: { currentSlug: string; onNavigate: (slug: string) => void }) {
  const grouped: Record<string, { slug: string; title: string }[]> = {};
  for (const comp of components) {
    if (!grouped[comp.category]) grouped[comp.category] = [];
    grouped[comp.category].push({ slug: comp.slug, title: comp.title });
  }

  return (
    <aside className='flex h-full w-64 flex-col border-r bg-background'>
      <div className='flex items-center gap-2 border-b px-4 py-4'>
        <span className='text-lg font-bold tracking-tight'>amolsw-components</span>
      </div>
      <div className='flex-1 overflow-y-auto px-3 py-4'>
        {categories.map((category) => (
          <div key={category} className='mb-4'>
            <h4 className='mb-1 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
              {category}
            </h4>
            <ul className='space-y-0.5'>
              {grouped[category].map((item) => (
                <li key={item.slug}>
                  <button
                    onClick={() => onNavigate(item.slug)}
                    className={`w-full cursor-pointer rounded-md px-2 py-1.5 text-left text-sm transition-colors ${
                      currentSlug === item.slug
                        ? 'bg-accent text-accent-foreground font-medium'
                        : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                    }`}
                  >
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Separator />
      <div className='px-4 py-3 text-xs text-muted-foreground'>React component library</div>
    </aside>
  );
}

Sidebar.displayName = 'Sidebar';

const categories = ['Input', 'Select', 'Date', 'Navigation', 'Table', 'Display', 'Feedback'] as const;

const components = [
  { slug: 'search-input', title: 'SearchInput', category: 'Input' },
  { slug: 'icon-input', title: 'IconInput', category: 'Input' },
  { slug: 'password-input', title: 'PasswordInput', category: 'Input' },
  { slug: 'single-select', title: 'SingleSelect', category: 'Select' },
  { slug: 'multi-select', title: 'MultiSelect', category: 'Select' },
  { slug: 'date-time-field', title: 'DateTimeField', category: 'Date' },
  { slug: 'date-range-field', title: 'DateRangeField', category: 'Date' },
  { slug: 'back-link', title: 'BackLink', category: 'Navigation' },
  { slug: 'back-to-top', title: 'BackToTop', category: 'Navigation' },
  { slug: 'pagination', title: 'Pagination', category: 'Navigation' },
  { slug: 'data-table', title: 'DataTable', category: 'Table' },
  { slug: 'data-table-filters', title: 'DataTableFilters', category: 'Table' },
  { slug: 'empty-state', title: 'EmptyState', category: 'Display' },
  { slug: 'matched-fields-tooltip', title: 'MatchedFieldsTooltip', category: 'Display' },
  { slug: 'toast-provider', title: 'ToastProvider', category: 'Feedback' },
] as const;

export { Sidebar };
