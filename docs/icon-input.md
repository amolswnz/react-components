# IconInput

Input with icon addons, built with a relative wrapper and absolute-positioned icons.

## Props

| Prop             | Type                           | Default | Description                              |
| ---------------- | ------------------------------ | ------- | ---------------------------------------- |
| `icon`           | `ReactNode`                    | —       | Required. Left-side icon.                |
| `endIcon`        | `ReactNode`                    | —       | Optional. Right-side icon.               |
| `label`          | `string`                       | —       | Label displayed above the input          |
| `required`       | `boolean`                      | `false` | Shows asterisk on the label when set     |
| `error`          | `string`                       | —       | Error message shown below the field      |
| `errorClassName` | `string`                       | —       | Additional classes for the error message |
| `renderError`    | `(error: string) => ReactNode` | —       | Custom error renderer                    |

All standard `InputHTMLAttributes` (except `type`) are forwarded.

## Examples

```tsx
// Single icon
<IconInput icon={<MailIcon />} placeholder='Email' />;

// Dual icons
<IconInput icon={<CreditCardIcon />} endIcon={<LockIcon />} placeholder='Card number' />;

// Password with help icon
<IconInput icon={<KeyIcon />} endIcon={<HelpCircleIcon />} type='password' placeholder='Password' />;
```
