# ngaw-components

## Publishing

- Do not publish, tag, or release unless explicitly asked to do so
- Always bump `version` in `package.json` before tagging — tag and version must match

## Build & Test

- `pnpm dev` — watch mode (tsup)
- `pnpm build` — build library
- `pnpm test` — run all unit tests
- `pnpm test --run src/components/<name>` — run single test file
- `pnpm test:e2e` — run Playwright demo tests
- `pnpm lint` — `oxlint`
- `pnpm lint:ts` — `tsc --noEmit` (type-check only)
- `pnpm format` — `oxfmt --write .`
- `pnpm demo` — Vite dev server at localhost:5173

## Architecture

- Each component: `src/components/<name>/<name>.tsx` + `index.ts` + `<name>.test.tsx` + `<name>.stories.tsx`
- Barrel export via `src/components/<name>/index.ts`
- Root export via `src/index.ts`
- Docs via `docs/<name>.md`

## Component Conventions

- Named exports only (`export { Component }`), never default exports
- Set `displayName` on every component
- Add project-relative file path comment at top: `// path/to/file.tsx`
- Import `cn` from `../../lib/utils`
- Use `cn()` for Tailwind class merging
- Add demo section: `demo/sections/<Name>Demo.tsx` (Card with variants) + import/register in `demo/App.tsx`
- Add story: `src/components/<name>/<name>.stories.tsx` — group by category in `title:` (e.g. `Input/`, `DataTable/`)
- Add docs: `docs/<name>.md`

## Shadcn/UI Rules

- **Do not manually update files in `src/components/ui/`** — these are shadcn primitives maintained by the CLI/tooling
- **Always use shadcn components** over raw HTML:
  - `Button` from `../ui/button` — never `<button>`
  - `Input` from `../ui/input` — never `<input>`
  - `Label` from `../ui/label` — never `<label>`
  - `Table`, `TableBody`, `TableCell`, `TableHead`, `TableHeader`, `TableRow` from `../ui/table`
  - `Select`, `SelectContent`, `SelectItem`, `SelectTrigger`, `SelectValue` from `../ui/select`
  - `Badge` from `../ui/badge`
  - `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent` from `../ui/card`
- Exception: `demo/` files can use raw `<label>` for section headings
- `pnpm dlx shadcn@latest add component`
- `pnpm dlx shadcn add @shadcnblocks/block`

## DataTable Conventions

- Uses `@tanstack/react-table` — `getCoreRowModel`, `getSortedRowModel`, `flexRender`, `useReactTable`
- Manual sorting and pagination via `manualSorting: true`, `manualPagination: true`
- Add sort toggle handler: `onClick={header.column.getToggleSortingHandler()}`
- Show sort icons (ArrowUp/ArrowDown/ArrowUpDown) on sortable headers
- Use `SearchInput` component for search, not raw Input
- Use `Pagination` component for pagination
- `data-state` should be `"selected"` or `undefined`, never `"false"`

## DataTableFilters Conventions

- Generic collapsible filter panel with configurable fields
- `filterSelectFields` — array of `FilterSelectField` (key, label, options)
- `filterTextFields` — array of `FilterTextField` (key, label, placeholder)
- `sort` — `FilterSortConfig` with fields, fieldLabel, directionLabel
- `perPage` — `FilterPerPageConfig` with options, label
- Use `defaultValues`, `defaultSortField`, `defaultSortDirection`, `defaultPerPage` for Active badge logic

## Testing

- vitest + @testing-library/react + userEvent
- Test file: `<name>.test.tsx` alongside component
- Use `vi.fn()` for mocks
- Use `screen.getByRole('option', { name: '...' })` for Radix Select options (portal-rendered)
- Use `screen.queryByText` for absence checks
- Use `container.textContent` for text broken by `<span>` elements
- For tests requiring Radix Select: polyfill `HTMLElement.prototype.hasPointerCapture` in test-setup.ts
- For debounce tests: use `waitFor` with `{ timeout }`, never `vi.useFakeTimers` with userEvent

## Playwright / E2E

- E2E tests in `test/` directory
- Test file: `demo.spec.ts` (single file covering all components)
- Config in `playwright.config.ts` — auto-starts Vite demo server
- Run with `pnpm test:e2e`

## Code Style

- No unnecessary comments (exception: file path header and BDD comments)
- Single quotes, trailing commas (es5), print width 120, tab width 2
- Import order: react → @tanstack → @radix-ui → lucide-react → third-party → @/ → relative

# Add changelog when merged to main
