import { useState } from 'react';
import * as React from 'react';
import { DateTimeField } from '../../src/components/date-time-field';
import { Calendar } from '../../src/components/ui/calendar';

function DateTimeFieldPreview() {
  const [demoDate, setDemoDate] = useState<Date | null>(null);
  const [demoTime, setDemoTime] = useState<string | null>(null);
  const [altDate, setAltDate] = useState<Date | null>(null);
  const [altTime, setAltTime] = useState<string | null>(null);
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className='space-y-5'>
      <DateTimeField
        date={demoDate}
        time={demoTime}
        onDateChange={setDemoDate}
        onTimeChange={setDemoTime}
        dateLabel='Event date'
        timeLabel='Event time'
      />
      <p className='text-xs text-muted-foreground'>
        Date: {demoDate ? demoDate.toDateString() : '(none)'} | Time: {demoTime ?? '(none)'}
      </p>
      <DateTimeField
        date={altDate}
        time={altTime}
        onDateChange={setAltDate}
        onTimeChange={setAltTime}
        dateLabel='Custom format'
        dateFormat='yyyy-MM-dd'
      />
      <p className='text-xs text-muted-foreground'>
        Date: {altDate ? altDate.toDateString() : '(none)'} | Time: {altTime ?? '(none)'}
      </p>
      <Calendar
        mode='single'
        selected={date}
        onSelect={setDate}
        className='rounded-lg border'
        captionLayout='dropdown'
        data-testid='calendar-dropdown'
      />
    </div>
  );
}

export { DateTimeFieldPreview };
