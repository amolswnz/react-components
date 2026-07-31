# DataTableFilters

Filter panel with text, select (single/multi), toggle group, and date range filter fields, plus search, actions, per-page selector, and active filter badges. Works alongside `DataTable` but can be used independently.

## Props

| Prop                      | Type                       | Default       | Description                                |
| ------------------------- | -------------------------- | ------------- | ------------------------------------------ |
| `filterSelectFields`      | `FilterSelectField[]`      | —             | Select/multi-select dropdown filter fields |
| `filterTextFields`        | `FilterTextField[]`        | —             | Text input filter fields                   |
| `filterToggleGroupFields` | `FilterToggleGroupField[]` | —             | Toggle button group filter fields          |
| `filterDateRangeFields`   | `FilterDateRangeField[]`   | —             | Date range picker fields                   |
| `values`                  | `Record<string, string>`   | —             | Current filter values (controlled)         |
| `searchValue`             | `string`                   | —             | Search input value                         |
| `onSearchChange`          | `(value: string) => void`  | —             | Called when search input changes           |
| `searchPlaceholder`       | `string`                   | `"Search..."` | Search input placeholder                   |
| `loadingSearch`           | `boolean`                  | —             | Show loading spinner in search             |
| `onRefresh`               | `() => void`               | —             | Shows refresh button                       |
| `loadingRefresh`          | `boolean`                  | —             | Shows spinner animation on refresh button  |
| `onAddNew`                | `() => void`               | —             | Shows "Add New" button                     |
| `perPage`                 | `FilterPerPageConfig`      | —             | Per-page selector                          |
| `perPageValue`            | `number`                   | —             | Current per-page value                     |
| `onPerPageChange`         | `(value: number) => void`  | —             | Called when per page changes               |
| `onFilterChange`          | `(key, value) => void`     | —             | Called when any filter changes             |
| `defaultValues`           | `Record<string, string>`   | `{}`          | Default filter values (for Active badge)   |
| `onClearFilters`          | `() => void`               | —             | Called when "Clear filters" is clicked     |
| `className`               | `string`                   | —             | Additional styles                          |

### FilterSelectField

| Field         | Type                 | Default       | Description              |
| ------------- | -------------------- | ------------- | ------------------------ |
| `key`         | `string`             | —             | Unique identifier        |
| `label`       | `string`             | —             | Display label            |
| `options`     | `{ value, label }[]` | —             | Select options           |
| `placeholder` | `string`             | `"Select..."` | Select placeholder       |
| `multi`       | `boolean`            | —             | Enable multi-select mode |

When `multi: true`, the value is stored as a comma-separated string (e.g. `"Admin,Editor"`).

### FilterTextField

| Field         | Type     | Description       |
| ------------- | -------- | ----------------- |
| `key`         | `string` | Unique identifier |
| `label`       | `string` | Display label     |
| `placeholder` | `string` | Input placeholder |

### FilterToggleGroupField

| Field     | Type                 | Description           |
| --------- | -------------------- | --------------------- |
| `key`     | `string`             | Unique identifier     |
| `label`   | `string`             | Display label         |
| `options` | `{ value, label }[]` | Toggle button options |

The value is stored as a comma-separated string (e.g. `"active,inactive"`). Renders a `<ToggleGroup type="multiple" variant="outline">` with toggle buttons for each option.

### FilterDateRangeField

| Field       | Type     | Default       | Description                             |
| ----------- | -------- | ------------- | --------------------------------------- |
| `key`       | `string` | —             | Unique identifier                       |
| `label`     | `string` | —             | Display label                           |
| `fromKey`   | `string` | `"{key}From"` | Key for the start date value            |
| `toKey`     | `string` | `"{key}To"`   | Key for the end date value              |
| `fromLabel` | `string` | —             | Placeholder text when no dates selected |

### FilterPerPageConfig

| Field     | Type                 | Default      | Description      |
| --------- | -------------------- | ------------ | ---------------- |
| `options` | `{ value, label }[]` | —            | Per-page options |
| `label`   | `string`             | `"Per page"` | Section label    |

## Examples

```tsx
import { DataTableFilters } from '@/components/amolsw/data-table';

function UserTable() {
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('all');
  const [name, setName] = useState('');

  return (
    <DataTableFilters
      filterSelectFields={[
        {
          key: 'role',
          label: 'Role',
          multi: true,
          options: [
            { value: 'Admin', label: 'Admin' },
            { value: 'Editor', label: 'Editor' },
            { value: 'Viewer', label: 'Viewer' },
          ],
        },
        {
          key: 'status',
          label: 'Status',
          options: [
            { value: 'all', label: 'All' },
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
          ],
        },
      ]}
      filterTextFields={[{ key: 'name', label: 'Name', placeholder: 'Filter by name...' }]}
      values={{ role, status, name }}
      defaultValues={{ role: '', status: 'all', name: '' }}
      onFilterChange={(key, value) => {
        if (key === 'role') setRole(value);
        if (key === 'status') setStatus(value);
        if (key === 'name') setName(value);
      }}
      onClearFilters={() => {
        setRole('');
        setStatus('all');
        setName('');
      }}
    />
  );
}
```

### With Toggle Group

```tsx
import { DataTableFilters } from '@/components/amolsw/data-table';

function UserTable() {
  const [status, setStatus] = useState('');

  return (
    <DataTableFilters
      filterToggleGroupFields={[
        {
          key: 'status',
          label: 'Status',
          options: [
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
            { value: 'pending', label: 'Pending' },
          ],
        },
      ]}
      values={{ status }}
      onFilterChange={(key, value) => setStatus(value)}
      onClearFilters={() => setStatus('')}
    />
  );
}
```
