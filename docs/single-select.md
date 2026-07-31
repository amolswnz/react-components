# SingleSelect

Single-select combobox with search. Supports both static (client-side filter) and AJAX (server-driven options) modes.

## Props

| Prop                | Type                                                     | Default                 | Description                                                                                                 |
| ------------------- | -------------------------------------------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------- |
| `options`           | `{ label: string; value: string; disabled?: boolean }[]` | —                       | Options list                                                                                                |
| `value`             | `string`                                                 | —                       | Currently selected value                                                                                    |
| `onChange`          | `(value: string) => void`                                | —                       | Called with the selected value                                                                              |
| `label`             | `string`                                                 | —                       | Label displayed above the field                                                                             |
| `placeholder`       | `string`                                                 | `"Select an option..."` | Trigger placeholder                                                                                         |
| `searchPlaceholder` | `string`                                                 | `"Search..."`           | Search input placeholder                                                                                    |
| `emptyMessage`      | `string`                                                 | `"No results found."`   | Message when no matches                                                                                     |
| `loading`           | `boolean`                                                | `false`                 | Show loading spinner                                                                                        |
| `disabled`          | `boolean`                                                | `false`                 | Disabled state                                                                                              |
| `required`          | `boolean`                                                | `false`                 | Shows asterisk on the label when set                                                                        |
| `error`             | `string`                                                 | —                       | Error message shown below the field                                                                         |
| `errorClassName`    | `string`                                                 | —                       | Additional classes for the error message                                                                    |
| `renderError`       | `(error: string) => ReactNode`                           | —                       | Custom error renderer                                                                                       |
| `onSearch`          | `(query: string) => void`                                | —                       | **Enables AJAX mode.** Called with debounced search query (300ms). Consumer updates `options` with results. |
| `renderOption`      | `(option, isSelected) => ReactNode`                      | —                       | Custom option renderer                                                                                      |
| `createNew`         | `{ label: string; onClick: (query: string) => void }`    | —                       | Shows a "create new" option at the bottom of the dropdown. `onClick` receives the current search query.     |
| `showEndOfList`     | `boolean`                                                | `true`                  | Show the "-- End of list --" marker at the bottom of the options list                                       |
| `contentClassName`  | `string`                                                 | —                       | Additional styles for the dropdown popover content                                                          |
| `className`         | `string`                                                 | —                       | Additional styles for the trigger button                                                                    |

## Search Highlighting

Matching search text is highlighted with **bold** and <ins>underline</ins> in option labels automatically.

When using a custom `renderOption`, apply highlighting with the exported `highlightMatch` utility:

```tsx
import { SingleSelect } from '@/components/amolsw/single-select';
import { highlightMatch } from '@/lib/amolsw';

<SingleSelect
  options={items}
  renderOption={(option) => <div className='flex items-center gap-2'>{highlightMatch(option.label, query)}</div>}
/>;
```

## Examples

```tsx
// Static mode (client-side filter)
const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
];

const [fruit, setFruit] = useState('');

<SingleSelect options={fruits} value={fruit} onChange={setFruit} placeholder='Pick a fruit' />;

// AJAX mode (server-driven)
const [users, setUsers] = useState([]);

<SingleSelect
  options={users}
  onSearch={async (query) => {
    const res = await fetch(`/api/users?q=${query}`);
    setUsers(await res.json());
  }}
  placeholder='Search users...'
/>;
```
