# Pagination

Pagination component with page numbers, navigation buttons, and result count summary. Supports both a `meta` object (from Laravel pagination) and individual props.

## Props

| Prop           | Type                     | Default | Description                                         |
| -------------- | ------------------------ | ------- | --------------------------------------------------- |
| `meta`         | `PaginationMeta`         | —       | Laravel-style pagination meta object                |
| `currentPage`  | `number`                 | `1`     | Current active page (used if `meta` not provided)   |
| `totalItems`   | `number`                 | `0`     | Total number of items (used if `meta` not provided) |
| `itemsPerPage` | `number`                 | `10`    | Items per page (used if `meta` not provided)        |
| `onPageChange` | `(page: number) => void` | —       | Called when a page is selected                      |
| `className`    | `string`                 | —       | Additional styles                                   |

### PaginationMeta

| Field          | Type             | Description         |
| -------------- | ---------------- | ------------------- |
| `current_page` | `number`         | Current page number |
| `from`         | `number \| null` | Starting item index |
| `last_page`    | `number`         | Last page number    |
| `per_page`     | `number`         | Items per page      |
| `to`           | `number \| null` | Ending item index   |
| `total`        | `number`         | Total items         |

## Examples

```tsx
// With meta object
const meta = {
  current_page: 1,
  from: 1,
  last_page: 5,
  per_page: 10,
  to: 10,
  total: 50,
};

<Pagination meta={meta} onPageChange={(page) => console.log(page)} />;

// With individual props
<Pagination currentPage={page} totalItems={100} itemsPerPage={20} onPageChange={setPage} />;
```
