# ToastProvider

A toast notification provider built on `react-hot-toast` with shadcn styling, duplicate prevention, and customizable icons.

## Usage

```tsx
import { ToastProvider } from '@/components/amolsw/toast-provider';
import { toast } from 'react-hot-toast';

function App() {
  return (
    <>
      <ToastProvider />
      <button onClick={() => toast.success('Saved!')}>Success</button>
      <button onClick={() => toast.error('Failed!')}>Error</button>
      <button onClick={() => toast.loading('Processing...')}>Loading</button>
      <button onClick={() => (toast as any).info('Note: ...')}>Info</button>
      <button onClick={() => (toast as any).warning('Caution!')}>Warning</button>
    </>
  );
}
```

## Features

- **Duplicate prevention** — Same message + type won't show twice simultaneously
- **Themed styling** — Uses shadcn CSS variables (`--card`, `--border`, `--radius`, etc.)
- **Left indicator strip** — Color-coded by toast type
- **Default icons** — All toast types except `blank` and `loading` have icons
- **Close button** — Available on all non-loading toasts

## Duplicate Prevention

`toast.success`, `toast.error`, `toast.loading`, `toast.info`, and `toast.warning` all track active toasts by message + type. Calling the same method with the same message while the toast is visible will be silently ignored. After dismissing, the same message can be shown again.

## API

### `toast.info(message, options?)`

Displays an informational toast. Monitored for duplicates.

### `toast.warning(message, options?)`

Displays a warning toast. Monitored for duplicates.

### `toast.dismiss(id?)`

Dismisses a specific toast by id, or all toasts if no id is provided. Also clears the duplicate tracking set.

## Props

None. Renders at the app root level.

## Styling

| Toast Type | Indicator Strip       | Icon               |
| ---------- | --------------------- | ------------------ |
| `success`  | `bg-emerald-500`      | `CheckCircle` — `text-emerald-500` |
| `error`    | `bg-destructive`      | `XCircle` — `text-destructive` |
| `warning`  | `bg-amber-500`        | `AlertTriangle` — `text-amber-500` |
| `info`     | `bg-blue-500`         | `Info` — `text-blue-500` |
| `loading`  | `bg-blue-500`         | —                  |
| `blank`    | `bg-muted-foreground` | —                  |

## Toaster Config

| Prop                          | Value       | Description        |
| ----------------------------- | ----------- | ------------------ |
| `position`                    | `top-right` | Toast position     |
| `gutter`                      | `12`        | Gap between toasts |
| `containerStyle.top`          | `24px`      | Top offset         |
| `containerStyle.right`        | `24px`      | Right offset       |
| `toastOptions.style.maxWidth` | `380px`     | Max toast width    |
