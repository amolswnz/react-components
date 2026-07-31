# MultiSelect

Multi-select combobox with badges and search. Supports both static and AJAX modes.

## Props

| Prop                | Type                                                     | Default               | Description                                                                                             |
| ------------------- | -------------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------- |
| `options`           | `{ label: string; value: string; disabled?: boolean }[]` | —                     | Options list                                                                                            |
| `value`             | `string[]`                                               | `[]`                  | Selected values                                                                                         |
| `onChange`          | `(value: string[]) => void`                              | —                     | Called with updated selection array                                                                     |
| `label`             | `string`                                                 | —                     | Label displayed above the field                                                                         |
| `placeholder`       | `string`                                                 | `"Select..."`         | Trigger placeholder                                                                                     |
| `searchPlaceholder` | `string`                                                 | `"Search..."`         | Search input placeholder                                                                                |
| `emptyMessage`      | `string`                                                 | `"No results found."` | Message when no matches                                                                                 |
| `loading`           | `boolean`                                                | `false`               | Show loading spinner                                                                                    |
| `disabled`          | `boolean`                                                | `false`               | Disabled state                                                                                          |
| `required`          | `boolean`                                                | `false`               | Shows asterisk on the label when set                                                                    |
| `error`             | `string`                                                 | —                     | Error message shown below the field                                                                     |
| `errorClassName`    | `string`                                                 | —                     | Additional classes for the error message                                                                |
| `renderError`       | `(error: string) => ReactNode`                           | —                     | Custom error renderer                                                                                   |
| `onSearch`          | `(query: string) => void`                                | —                     | **Enables AJAX mode.** Called with debounced query.                                                     |
| `maxDisplayItems`   | `number`                                                 | `2`                   | Max badges shown before overflow                                                                        |
| `renderOption`      | `(option, isSelected) => ReactNode`                      | —                     | Custom option renderer                                                                                  |
| `createNew`         | `{ label: string; onClick: (query: string) => void }`    | —                     | Shows a "create new" option at the bottom of the dropdown. `onClick` receives the current search query. |
| `showEndOfList`     | `boolean`                                                | `true`                | Show the "-- End of list --" marker at the bottom of the options list                                   |
| `contentClassName`  | `string`                                                 | —                     | Additional styles for the dropdown popover content                                                      |
| `className`         | `string`                                                 | —                     | Additional styles for the trigger button                                                                |

## Search Highlighting

Matching search text is highlighted with **bold** and <ins>underline</ins> in option labels automatically.

When using a custom `renderOption`, apply highlighting with the exported `highlightMatch` utility:

```tsx
import { MultiSelect } from '@/components/amolsw/multi-select';
import { highlightMatch } from '@/lib/amolsw';

<MultiSelect
  options={items}
  renderOption={(option) => <div className='flex items-center gap-2'>{highlightMatch(option.label, query)}</div>}
/>;
```

## Examples

```tsx
// Static mode
const [selected, setSelected] = useState<string[]>([]);

<MultiSelect
  options={fruits}
  value={selected}
  onChange={setSelected}
  placeholder='Select fruits'
  maxDisplayItems={3}
/>;

// AJAX mode (server-driven)
const [users, setUsers] = useState([]);
const [fetching, setFetching] = useState(false);

<MultiSelect
  options={users}
  loading={fetching}
  onSearch={async (query) => {
    setFetching(true);
    const res = await fetch(`/api/users?q=${query}`);
    setUsers(await res.json());
    setFetching(false);
  }}
  placeholder='Search users...'
/>;
```
