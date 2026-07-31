# DateRangeField

Date range picker with a calendar popover. Can be used standalone or within `DataTableFilters`.

Includes preset buttons for quick date range selection (Last 30, 60, 90 days) and a clear button to reset the selection.

## Props

| Prop             | Type                           | Default               | Description                                 |
| ---------------- | ------------------------------ | --------------------- | ------------------------------------------- |
| `label`          | `string`                       | —                     | Label displayed above the field             |
| `from`           | `string`                       | —                     | Start date (ISO string)                     |
| `to`             | `string`                       | —                     | End date (ISO string)                       |
| `placeholder`    | `string`                       | `"Select date range"` | Placeholder text when no dates selected     |
| `onChange`       | `(from: string, to: string)`   | —                     | Called when date range changes (or cleared) |
| `required`       | `boolean`                      | `false`               | Shows asterisk on the label when set        |
| `error`          | `string`                       | —                     | Error message shown below the field         |
| `errorClassName` | `string`                       | —                     | Additional classes for the error message    |
| `renderError`    | `(error: string) => ReactNode` | —                     | Custom error renderer                       |

## Features

- **Calendar popover** — select a date range by clicking start and end dates
- **Preset buttons** — "Last 30 days", "Last 60 days", "Last 90 days" quick select in the calendar footer
- **Clear button** — X icon to reset selection when a range is active

## Usage

```tsx
import { DateRangeField } from '@/components/amolsw/date-range-field';

const [from, setFrom] = useState('');
const [to, setTo] = useState('');

<DateRangeField
  label='Created At'
  from={from}
  to={to}
  placeholder='Pick a period'
  onChange={(newFrom, newTo) => {
    setFrom(newFrom);
    setTo(newTo);
  }}
/>;
```
