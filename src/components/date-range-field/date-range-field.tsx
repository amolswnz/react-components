// src/components/date-range-field/date-range-field.tsx
import { CalendarIcon, X } from 'lucide-react';
import { format } from 'date-fns';
import { type DateRange } from 'react-day-picker';
import { cn, FieldError } from '@/lib/amolsw';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export interface DateRangeFieldProps {
  label?: string;
  from?: string;
  to?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  errorClassName?: string;
  renderError?: (error: string) => React.ReactNode;
  onChange: (from: string, to: string) => void;
}

function DateRangeField({
  label,
  from,
  to,
  placeholder,
  required = false,
  error,
  errorClassName,
  renderError,
  onChange,
}: DateRangeFieldProps) {
  const range: DateRange | undefined =
    from || to
      ? {
          from: from ? new Date(from) : undefined,
          to: to ? new Date(to) : undefined,
        }
      : undefined;

  const displayText =
    range?.from && range?.to
      ? `${format(range.from, 'PP')} – ${format(range.to, 'PP')}`
      : range?.from
        ? `From ${format(range.from, 'PP')}`
        : (placeholder ?? 'Select date range');

  return (
    <div className='space-y-2'>
      {label && (
        <Label className='block'>
          {label}
          {required && <span className='text-destructive'> *</span>}
        </Label>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <div className='relative'>
            <Button
              variant='outline'
              className={cn(
                'w-full cursor-pointer justify-start gap-2 pr-8 font-normal',
                !range?.from && !range?.to && 'text-muted-foreground',
                error && 'border-destructive'
              )}
            >
              <CalendarIcon className='h-4 w-4' />
              <span className='truncate'>{displayText}</span>
            </Button>
            {range?.from && (
              <Button
                type='button'
                variant='ghost'
                size='icon'
                onClick={(e) => {
                  e.stopPropagation();
                  onChange('', '');
                }}
                className='absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-foreground'
                tabIndex={-1}
                aria-label='Clear date range'
              >
                <X className='h-4 w-4' />
              </Button>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            mode='range'
            selected={range}
            onSelect={(newRange) => {
              onChange(
                newRange?.from ? newRange.from.toISOString() : '',
                newRange?.to ? newRange.to.toISOString() : ''
              );
            }}
            footer={
              <div className='flex gap-2 border-t pt-2'>
                <Button
                  variant='outline'
                  size='sm'
                  className='flex-1 cursor-pointer text-xs'
                  onClick={() => {
                    const to = new Date();
                    const from = new Date();
                    from.setDate(from.getDate() - 30);
                    onChange(from.toISOString(), to.toISOString());
                  }}
                >
                  Last 30 days
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  className='flex-1 cursor-pointer text-xs'
                  onClick={() => {
                    const to = new Date();
                    const from = new Date();
                    from.setDate(from.getDate() - 60);
                    onChange(from.toISOString(), to.toISOString());
                  }}
                >
                  Last 60 days
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  className='flex-1 cursor-pointer text-xs'
                  onClick={() => {
                    const to = new Date();
                    const from = new Date();
                    from.setDate(from.getDate() - 90);
                    onChange(from.toISOString(), to.toISOString());
                  }}
                >
                  Last 90 days
                </Button>
              </div>
            }
          />
        </PopoverContent>
      </Popover>
      <FieldError error={error} errorClassName={errorClassName} renderError={renderError} />
    </div>
  );
}

DateRangeField.displayName = 'DateRangeField';

export { DateRangeField };
