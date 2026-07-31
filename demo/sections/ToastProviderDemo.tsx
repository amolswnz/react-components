import { CheckCircle2, AlertTriangle, XCircle, InfoIcon, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { ToastProvider } from '../../src/components/toast-provider';
import { Button } from '../../src/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../src/components/ui/card';

function ToastProviderDemo() {
  return (
    <Card className='mb-8'>
      <CardHeader>
        <CardTitle>ToastProvider</CardTitle>
        <CardDescription>Toast notifications with duplicate prevention and themed styling.</CardDescription>
      </CardHeader>
      <CardContent className='space-y-5'>
        <ToastProvider />

        <div className='space-y-4'>
          <div className='flex items-center gap-4'>
            <Button variant='outline' onClick={() => toast.success('Operation completed successfully!')}>
              <CheckCircle2 />
              Success
            </Button>
            <p className='text-sm text-muted-foreground'>Green strip with checkmark icon</p>
          </div>

          <div className='flex items-center gap-4'>
            <Button variant='outline' onClick={() => toast.error('Something went wrong!')}>
              <XCircle />
              Error
            </Button>
            <p className='text-sm text-muted-foreground'>Red strip with X icon</p>
          </div>

          <div className='flex items-center gap-4'>
            <Button
              variant='outline'
              onClick={() =>
                (toast as unknown as Record<string, (m: string) => void>).info('Here is some information for you.')
              }
            >
              <InfoIcon />
              Info
            </Button>
            <p className='text-sm text-muted-foreground'>Blue strip with info icon</p>
          </div>

          <div className='flex items-center gap-4'>
            <Button
              variant='outline'
              onClick={() =>
                (toast as unknown as Record<string, (m: string, o?: { duration?: number }) => void>).warning(
                  <span>
                    Please <strong>be careful</strong> with this action.
                  </span>,
                  { duration: Infinity }
                )
              }
            >
              <AlertTriangle />
              Warning
            </Button>
            <p className='text-sm text-muted-foreground'>Amber strip, persistent until dismissed</p>
          </div>

          <div className='flex items-center gap-4'>
            <Button
              variant='outline'
              onClick={() => {
                const id = toast.loading('Processing your request...');
                setTimeout(() => toast.success('Done!', { id }), 2000);
              }}
            >
              <Loader2 />
              Loading
            </Button>
            <p className='text-sm text-muted-foreground'>Resolves to success after 2s</p>
          </div>

          <div className='flex items-center gap-4'>
            <Button variant='outline' onClick={() => toast('This is a default notification.')}>
              Default
            </Button>
            <p className='text-sm text-muted-foreground'>No indicator strip, no icon</p>
          </div>

          <div className='flex items-center gap-4'>
            <Button
              variant='outline'
              onClick={() =>
                toast.success(
                  <div>
                    <div className='font-semibold text-card-foreground'>Account Created!</div>
                    <div className='text-sm text-card-foreground/80'>
                      Welcome <span className='font-medium'>John</span>!
                    </div>
                  </div>
                )
              }
            >
              Custom HTML
            </Button>
            <p className='text-sm text-muted-foreground'>Rich content with title</p>
          </div>

          <div className='flex items-center gap-4'>
            <Button
              variant='outline'
              onClick={() => {
                const promise = new Promise((resolve) => {
                  setTimeout(() => resolve('Data loaded!'), 2000);
                });
                toast.promise(promise, {
                  loading: 'Loading data...',
                  success: 'Data loaded successfully!',
                  error: 'Failed to load data',
                });
              }}
            >
              Promise
            </Button>
            <p className='text-sm text-muted-foreground'>Loading → success/error auto-handling</p>
          </div>

          <div className='flex items-center gap-4'>
            <Button
              variant='outline'
              onClick={() => {
                toast.success('First notification');
                setTimeout(() => toast.error('Second notification'), 500);
                setTimeout(() => {
                  const t = toast as unknown as Record<string, (m: string) => void>;
                  t.info('Third notification');
                }, 1000);
              }}
            >
              Show Multiple
            </Button>
            <p className='text-sm text-muted-foreground'>Triggers 3 toasts in sequence</p>
          </div>

          <div className='flex items-center gap-4'>
            <Button
              variant='outline'
              onClick={() => {
                toast.success('This message is unique');
                toast.success('This message is unique');
              }}
            >
              Duplicate Prevention
            </Button>
            <p className='text-sm text-muted-foreground'>Same message+type won't show twice</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { ToastProviderDemo };
