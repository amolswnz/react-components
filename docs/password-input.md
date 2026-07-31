# PasswordInput

Password input with a lock icon and eye toggle to show/hide the password.

## Props

| Prop             | Type                           | Default      | Description                              |
| ---------------- | ------------------------------ | ------------ | ---------------------------------------- |
| `value`          | `string`                       | —            | Controlled value                         |
| `defaultValue`   | `string`                       | `""`         | Uncontrolled default                     |
| `onChange`       | `(value: string) => void`      | —            | Called on every keystroke                |
| `label`          | `string`                       | —            | Label displayed above the input          |
| `required`       | `boolean`                      | `false`      | Shows asterisk on the label when set     |
| `error`          | `string`                       | —            | Error message shown below the field      |
| `errorClassName` | `string`                       | —            | Additional classes for the error message |
| `renderError`    | `(error: string) => ReactNode` | —            | Custom error renderer                    |
| `placeholder`    | `string`                       | `"Password"` | Placeholder text                         |
| `disabled`       | `boolean`                      | `false`      | Disabled state                           |

All standard `InputHTMLAttributes` (except `type`, `onChange`, `value`, `defaultValue`) are forwarded.

## Examples

```tsx
import { PasswordInput } from '@/components/amolsw/password-input';

function Form() {
  return <PasswordInput placeholder='Enter password' onChange={(value) => console.log(value)} />;
}
```
