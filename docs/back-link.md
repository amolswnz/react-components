# BackLink

A back navigation link with an arrow icon.

## Props

| Prop        | Type                                         | Default     | Description                           |
| ----------- | -------------------------------------------- | ----------- | ------------------------------------- |
| `href`      | `string`                                     | —           | Navigation URL (renders as `<a>` tag) |
| `label`     | `ReactNode`                                  | `"Go back"` | Link label text or element            |
| `className` | `string`                                     | —           | Additional styles                     |
| `onClick`   | `(e: MouseEvent<HTMLAnchorElement>) => void` | —           | Click handler                         |

## Usage

```tsx
import { BackLink } from '@/components/amolsw/back-link';

// With navigation
<BackLink href='/users' label='Back to users' />;

// With click handler
<BackLink onClick={() => history.back()} label='Go back' />;

// Default label
<BackLink href='/' />;
```
