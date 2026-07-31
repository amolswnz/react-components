# amolsw/react-components

A React component library distributed as a [shadcn](https://ui.shadcn.com) GitHub registry. Built with shadcn/ui primitives, Tailwind CSS v4, and TypeScript.

## Installation

### Prerequisites

- [shadcn/ui](https://ui.shadcn.com/docs/installation) initialized in your project (`pnpm dlx shadcn@latest init`)
- Tailwind CSS v4 configured
- React 19+

### Install Components

```bash
# List available components
pnpm dlx shadcn@latest list amolswnz/react-components

# Install a single component (auto-installs all dependencies)
pnpm dlx shadcn@latest add amolswnz/react-components/data-table

# Install multiple components
pnpm dlx shadcn@latest add amolswnz/react-components/search-input amolswnz/react-components/pagination

# Install a hook
pnpm dlx shadcn@latest add amolswnz/react-components/use-debounce

# Pin to a specific version
pnpm dlx shadcn@latest add amolswnz/react-components/data-table#v1.0.0

# Preview before installing
pnpm dlx shadcn@latest add amolswnz/react-components/data-table --dry-run
```

Components are copied into your project under an `amolsw/` namespace:

```
src/
  components/
    ui/                    <- shadcn UI primitives (shared)
    amolsw/                <- custom components
      data-table/
      search-input/
      ...
  lib/
    amolsw/                <- utilities (cn, highlightMatch, FieldError, types)
  hooks/
    amolsw/                <- hooks (useDebounce, useDataTableFilters)
```

### Required npm Dependencies

The CLI auto-installs npm dependencies for each component. Common dependencies include:

- `@tanstack/react-table` — for DataTable
- `date-fns` — for DateRangeField, DateTimeField
- `react-day-picker` — for Calendar/DateRangeField
- `react-hot-toast` — for ToastProvider
- `lucide-react` — for icons
- `cmdk` — for Command (used by SingleSelect, MultiSelect)
- `clsx`, `tailwind-merge`, `class-variance-authority` — for cn utility
- `@radix-ui/*` — for shadcn UI primitives

## Usage

```tsx
import { SearchInput } from '@/components/amolsw/search-input';
import { DataTable } from '@/components/amolsw/data-table';
import { SingleSelect } from '@/components/amolsw/single-select';
import { highlightMatch, cn } from '@/lib/amolsw';
import { useDebounce } from '@/hooks/amolsw';
```

---

## Components

| Component          | Description                                  | Docs                                                     |
| ------------------ | -------------------------------------------- | -------------------------------------------------------- |
| `SearchInput`      | Search input with icon and clear button      | [docs/search-input.md](docs/search-input.md)             |
| `SingleSelect`     | Single-select combobox with search           | [docs/single-select.md](docs/single-select.md)           |
| `MultiSelect`      | Multi-select combobox with badges and search | [docs/multi-select.md](docs/multi-select.md)             |
| `Pagination`       | Pagination with page numbers and navigation  | [docs/pagination.md](docs/pagination.md)                 |
| `BackLink`         | Back navigation link with icon               | [docs/back-link.md](docs/back-link.md)                   |
| `BackToTop`        | Scroll-to-top button                         | [docs/back-to-top.md](docs/back-to-top.md)               |
| `DateTimeField`    | Date picker with time selector               | [docs/date-time-field.md](docs/date-time-field.md)       |
| `DateRangeField`   | Date range picker with calendar popover      | [docs/date-range-field.md](docs/date-range-field.md)     |
| `DataTable`        | Sortable, paginated data table               | [docs/data-table.md](docs/data-table.md)                 |
| `DataTableFilters` | Filter panel with collapsible fields         | [docs/data-table-filters.md](docs/data-table-filters.md) |
| `EmptyState`       | Empty state placeholder with icon and action | [docs/empty-state.md](docs/empty-state.md)               |
| `ToastProvider`    | Toast notification provider with theming     | [docs/toast-provider.md](docs/toast-provider.md)         |
| `IconInput`        | Input field with leading icon                | [docs/icon-input.md](docs/icon-input.md)                 |
| `PasswordInput`    | Password input with show/hide toggle         | [docs/password-input.md](docs/password-input.md)         |
| `MatchedFieldsTooltip` | Tooltip highlighting matching field names | [docs/matched-fields-tooltip.md](docs/matched-fields-tooltip.md) |
| `highlightMatch`   | Utility for highlighting search matches      | [docs/highlight-match.md](docs/highlight-match.md)       |
| `useDebounce`      | Hook for debouncing rapidly changing values  | [docs/use-debounce.md](docs/use-debounce.md)             |

### shadcn UI Primitives

The following shadcn primitives are also available in the registry and installed automatically as dependencies:

`button`, `input`, `label`, `badge`, `card`, `table`, `select`, `popover`, `command`, `dialog`, `separator`, `scroll-area`, `textarea`, `toggle`, `toggle-group`, `calendar`, `input-group`, `tooltip`

---

## Development

```bash
pnpm dev          # Watch mode (tsup)
pnpm build        # Build library (for local dev/demo)
pnpm test         # Run tests
pnpm lint         # Lint
pnpm lint:ts      # TypeScript check
pnpm clean        # Remove dist/
pnpm demo         # Launch Vite dev server at localhost:5173
pnpm storybook    # Launch Storybook at localhost:6006
pnpm test:e2e     # Run Playwright E2E tests
```

## Registry

This project is distributed as a [shadcn GitHub registry](https://ui.shadcn.com/docs/registry/github). The `registry.json` at the project root describes all available components, their dependencies, and file targets.

### Validate

```bash
pnpm dlx shadcn@latest registry validate amolswnz/react-components
```

## License

MIT
