// src/components/date-time-field/date-time-field.tsx
import { CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { cn, FieldError } from '@/lib/amolsw';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface DateTimeFieldProps {
  date: Date | null;
  time: string | null;
  onDateChange: (date: Date | null) => void;
  onTimeChange: (time: string) => void;
  dateLabel?: string;
  timeLabel?: string;
  required?: boolean;
  error?: string;
  errorClassName?: string;
  renderError?: (error: string) => React.ReactNode;
  dateError?: string;
  dateErrorClassName?: string;
  dateRenderError?: (error: string) => React.ReactNode;
  timeError?: string;
  timeErrorClassName?: string;
  timeRenderError?: (error: string) => React.ReactNode;
  showTime?: boolean;
  dateFormat?: string;
  minDate?: Date;
  maxDate?: Date;
}

const generateTimeOptions = () => {
  const options: string[] = [];
  // Start from 9am onward, then wrap to midnight–8:45am
  for (let hour = 9; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`;
      options.push(timeString);
    }
  }
  for (let hour = 0; hour < 9; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`;
      options.push(timeString);
    }
  }
  return options;
};

const timeOptions = generateTimeOptions();

const formatTimeDisplay = (time: string) => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};

const DateTimeField = ({
  date,
  time = null,
  onDateChange,
  onTimeChange,
  dateLabel,
  timeLabel,
  required = false,
  error,
  errorClassName,
  renderError,
  dateError,
  dateErrorClassName,
  dateRenderError,
  timeError,
  timeErrorClassName,
  timeRenderError,
  showTime = true,
  dateFormat = 'PPP',
  minDate,
  maxDate,
}: DateTimeFieldProps) => {
  const disabledDays = [
    ...(minDate ? [{ before: minDate } as const] : []),
    ...(maxDate ? [{ after: maxDate } as const] : []),
  ];

  return (
    <div className='flex flex-col gap-2'>
      <div className={cn('grid gap-4', showTime ? 'md:grid-cols-2' : '')}>
        <div className='space-y-2'>
          {dateLabel && (
            <Label className='block'>
              {dateLabel}
              {required && <span className='text-destructive'> *</span>}
            </Label>
          )}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                className={cn(
                  'w-full cursor-pointer justify-start text-left font-normal',
                  !date && 'text-muted-foreground',
                  (dateError ?? error) && 'border-destructive'
                )}
              >
                <CalendarIcon className='mr-2 h-4 w-4' />
                {date ? format(date, dateFormat) : 'Pick a date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                mode='single'
                selected={date ?? undefined}
                onSelect={(d) => onDateChange(d ?? null)}
                required={false}
                captionLayout='dropdown'
                disabled={disabledDays}
              />
            </PopoverContent>
          </Popover>
          <FieldError
            error={dateError ?? error}
            errorClassName={dateErrorClassName ?? errorClassName}
            renderError={dateRenderError ?? renderError}
          />
        </div>

        {showTime && (
          <div className='space-y-2'>
            {timeLabel && (
              <Label className='block'>
                {timeLabel}
                {required && <span className='text-destructive'> *</span>}
              </Label>
            )}
            <Select value={time ?? undefined} onValueChange={onTimeChange}>
              <SelectTrigger
                className={cn(
                  'w-full justify-start text-left [&>:last-child]:ml-auto',
                  (timeError ?? error) && 'border-destructive'
                )}
              >
                <Clock className='mr-2 h-4 w-4' />
                <SelectValue placeholder='Select time' />
              </SelectTrigger>
              <SelectContent className='max-h-60'>
                {timeOptions.map((timeOption) => (
                  <SelectItem key={timeOption} value={timeOption}>
                    {formatTimeDisplay(timeOption)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError
              error={timeError ?? error}
              errorClassName={timeErrorClassName ?? errorClassName}
              renderError={timeRenderError ?? renderError}
            />
          </div>
        )}
      </div>
    </div>
  );
};

DateTimeField.displayName = 'DateTimeField';

export { DateTimeField };
