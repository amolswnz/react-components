# DataTable

Server-side data table with sorting, pagination, loading skeletons, and empty/action states. Built on `@tanstack/react-table`.

Search is handled by the separate `DataTableFilters` component — pair them together for a complete search + filter + table experience.

## Props

| Prop                 | Type                              | Default               | Description                                              |
| -------------------- | --------------------------------- | --------------------- | -------------------------------------------------------- |
| `columns`            | `ColumnDef<TData>[]`              | —                     | TanStack Table column definitions                        |
| `data`               | `TData[]`                         | —                     | Table data                                               |
| `isLoading`          | `boolean`                         | `false`               | Shows skeleton rows when true                            |
| `pageCount`          | `number`                          | —                     | Total pages (triggers pagination)                        |
| `pagination`         | `{ pageIndex, pageSize }`         | —                     | Current pagination state                                 |
| `onPaginationChange` | `(pagination) => void`            | —                     | Called when pagination changes                           |
| `meta`               | `PaginationMeta`                  | —                     | Laravel-style pagination meta (alternative to pageCount) |
| `onPageChange`       | `(page: number) => void`          | —                     | Called when page changes                                 |
| `sorting`            | `SortingState`                    | —                     | Controlled sorting state                                 |
| `onSortingChange`    | `(sorting: SortingState) => void` | —                     | Called when sorting changes                              |
| `defaultSorting`     | `SortingState`                    | `[]`                  | Initial sorting (uncontrolled)                           |
| `emptyTitle`         | `string`                          | `"No results"`        | Empty state title                                        |
| `emptyDescription`   | `string`                          | `"No results found."` | Empty state description                                  |
| `emptyIcon`          | `React.ReactNode`                 | `Search` icon         | Custom empty state icon                                  |
| `className`          | `string`                          | —                     | Additional styles                                        |

### ColumnMeta

Use `meta` on column definitions to set custom cell/header class names:

```tsx
const columns = [
  {
    accessorKey: 'name',
    header: 'Name',
    meta: { className: 'w-48' },
  },
];
```

## Examples

```tsx
import type { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/amolsw/data-table';

type User = {
  id: number;
  name: string;
  email: string;
};

const columns: ColumnDef<User>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
];

function UserTable() {
  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useState([]);

  return (
    <DataTable
      columns={columns}
      data={users}
      pageCount={10}
      pagination={{ pageIndex: page - 1, pageSize: 10 }}
      onPaginationChange={({ pageIndex }) => setPage(pageIndex + 1)}
      sorting={sorting}
      onSortingChange={setSorting}
    />
  );
}
```
