# BackToTop

A scroll-to-top button that appears when the user scrolls past a threshold.

## Props

| Prop         | Type     | Default         | Description                                   |
| ------------ | -------- | --------------- | --------------------------------------------- |
| `threshold`  | `number` | `300`           | Scroll px threshold before showing the button |
| `className`  | `string` | —               | Additional styles                             |
| `aria-label` | `string` | `"Back to top"` | Accessible label                              |

## Usage

```tsx
import { BackToTop } from '@/components/amolsw/back-to-top';

<BackToTop />;

// Custom threshold
<BackToTop threshold={500} />;
```
