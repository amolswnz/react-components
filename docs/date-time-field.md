# DateTimeField

Combined date picker and time selector field.

## Props

| Prop                 | Type                           | Default | Description                                              |
| -------------------- | ------------------------------ | ------- | -------------------------------------------------------- |
| `date`               | `Date \| null`                 | —       | Currently selected date                                  |
| `time`               | `string \| null`               | `null`  | Currently selected time (HH:mm format)                   |
| `onDateChange`       | `(date: Date \| null) => void` | —       | Called when a date is picked                             |
| `onTimeChange`       | `(time: string) => void`       | —       | Called when a time is selected                           |
| `dateLabel`          | `string`                       | —       | Label for the date field (not rendered when omitted)     |
| `timeLabel`          | `string`                       | —       | Label for the time field (not rendered when omitted)     |
| `required`           | `boolean`                      | `false` | Shows asterisk on labels                                 |
| `error`              | `string`                       | —       | Error message shown below both fields (fallback)         |
| `errorClassName`     | `string`                       | —       | Additional classes for the fallback error                |
| `renderError`        | `(error: string) => ReactNode` | —       | Custom fallback error renderer                           |
| `dateError`          | `string`                       | —       | Error message for the date field only                    |
| `dateErrorClassName` | `string`                       | —       | Additional classes for the date field error              |
| `dateRenderError`    | `(error: string) => ReactNode` | —       | Custom error renderer for the date field                 |
| `timeError`          | `string`                       | —       | Error message for the time field only                    |
| `timeErrorClassName` | `string`                       | —       | Additional classes for the time field error              |
| `timeRenderError`    | `(error: string) => ReactNode` | —       | Custom error renderer for the time field                 |
| `showTime`           | `boolean`                      | `true`  | Show/hide the time selector                              |
| `dateFormat`         | `string`                       | `"PPP"` | date-fns format string for the displayed date            |
| `minDate`            | `Date`                         | —       | Earliest selectable date (passed to Calendar `fromDate`) |
| `maxDate`            | `Date`                         | —       | Latest selectable date (passed to Calendar `toDate`)     |

Error messages are shown inline below each field with an `AlertCircle` icon and `border-destructive` on the trigger. When `dateError`/`timeError` are not set, the generic `error` prop applies to both fields.

## Usage

```tsx
import { DateTimeField } from '@/components/amolsw/date-time-field';

const [date, setDate] = useState<Date | null>(null);
const [time, setTime] = useState<string | null>(null);

<DateTimeField
  date={date}
  time={time}
  onDateChange={setDate}
  onTimeChange={setTime}
  dateLabel='Event date'
  timeLabel='Event time'
  required
/>;

// Date only (no time)
<DateTimeField date={date} time={null} onDateChange={setDate} onTimeChange={() => {}} showTime={false} />;

// Separate error messages
<DateTimeField
  date={date}
  time={time}
  onDateChange={setDate}
  onTimeChange={setTime}
  dateLabel='Date'
  timeLabel='Time'
  dateError='Please select a date'
  timeError='Please select a time'
/>;

// Custom error rendering
<DateTimeField
  date={date}
  time={time}
  onDateChange={setDate}
  onTimeChange={setTime}
  dateLabel='Date'
  timeLabel='Time'
  dateError='Invalid date'
  dateRenderError={(error) => (
    <span className='flex items-center gap-1 text-xs text-destructive font-medium'>⚠ {error}</span>
  )}
/>;
```
