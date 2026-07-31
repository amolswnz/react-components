# SearchInput

Search input with a search icon and clear button.

## Props

| Prop             | Type                           | Default       | Description                              |
| ---------------- | ------------------------------ | ------------- | ---------------------------------------- |
| `value`          | `string`                       | —             | Controlled value                         |
| `defaultValue`   | `string`                       | `""`          | Uncontrolled default                     |
| `onChange`       | `(value: string) => void`      | —             | Called on every keystroke and on clear   |
| `loading`        | `boolean`                      | `false`       | Show spinner instead of search icon      |
| `onClear`        | `() => void`                   | —             | Additional callback when cleared         |
| `label`          | `string`                       | —             | Label displayed above the input          |
| `required`       | `boolean`                      | `false`       | Shows asterisk on the label when set     |
| `error`          | `string`                       | —             | Error message shown below the field      |
| `errorClassName` | `string`                       | —             | Additional classes for the error message |
| `renderError`    | `(error: string) => ReactNode` | —             | Custom error renderer                    |
| `placeholder`    | `string`                       | `"Search..."` | Placeholder text                         |
| `disabled`       | `boolean`                      | `false`       | Disabled state                           |

All standard `InputHTMLAttributes` (except `type`, `onChange`, `value`, `defaultValue`) are forwarded.

## Examples

```tsx
// Controlled
const [query, setQuery] = useState('');
<SearchInput value={query} onChange={setQuery} placeholder='Search users...' />;

// Uncontrolled with loading
<SearchInput defaultValue='hello' loading={true} onClear={() => console.log('cleared')} />;
```
