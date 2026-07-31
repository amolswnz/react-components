// demo/sections/DateRangeFieldDemo.tsx
import { useState } from 'react';
import { DateRangeField } from '../../src/components/date-range-field';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../src/components/ui/card';

function DateRangeFieldDemo() {
  const [range1, setRange1] = useState({ from: '', to: '' });
  const [range2, setRange2] = useState({ from: '2025-01-01', to: '2025-01-15' });

  return (
    <Card className='mb-8'>
      <CardHeader>
        <CardTitle>DateRangeField</CardTitle>
        <CardDescription>Date range picker with calendar popover.</CardDescription>
      </CardHeader>
      <CardContent className='space-y-5'>
        <div className='my-4'>
          <label className='mb-1.5 block text-sm font-medium'>Default</label>
          <DateRangeField
            label='Trip dates'
            placeholder='Select dates'
            from={range1.from}
            to={range1.to}
            onChange={(from, to) => setRange1({ from, to })}
          />
          <p className='mt-1 text-xs text-muted-foreground'>
            From: {range1.from || '(empty)'} &mdash; To: {range1.to || '(empty)'}
          </p>
        </div>
        <div className='my-4'>
          <label className='mb-1.5 block text-sm font-medium'>Preset range</label>
          <DateRangeField
            label='Booking window'
            from={range2.from}
            to={range2.to}
            onChange={(from, to) => setRange2({ from, to })}
          />
          <p className='mt-1 text-xs text-muted-foreground'>
            From: {range2.from || '(empty)'} &mdash; To: {range2.to || '(empty)'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export { DateRangeFieldDemo };
