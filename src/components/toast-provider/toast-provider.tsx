// src/components/toast-provider/toast-provider.tsx
import { AlertTriangle, CheckCircle, Info, X, XCircle } from 'lucide-react';
import { toast, Toaster, ToastBar } from 'react-hot-toast';
import type { Toast } from 'react-hot-toast';
import { cn } from '@/lib/amolsw/utils';
import { Button } from '@/components/ui/button';

const activeToasts = new Set<string>();

function getToastId(message: string, type: string): string {
  return `toast-${type}-${message}`;
}

function isDuplicateToast(message: string, type: string): boolean {
  return activeToasts.has(getToastId(message, type));
}

const originalToast = {
  success: toast.success,
  error: toast.error,
  loading: toast.loading,
};

const originalDismiss = toast.dismiss;
toast.dismiss = (id?: string) => {
  if (id) {
    activeToasts.delete(id);
  } else {
    activeToasts.clear();
  }
  originalDismiss(id);
};

toast.success = ((message: string | undefined, options?: Parameters<typeof toast.success>[1]) => {
  const messageStr = String(message ?? '');
  if (isDuplicateToast(messageStr, 'success')) {
    return '';
  }
  const id = getToastId(messageStr, 'success');
  activeToasts.add(id);
  return originalToast.success(message as string, { ...options, id });
}) as typeof toast.success;

toast.error = ((message: string | undefined, options?: Parameters<typeof toast.error>[1]) => {
  const messageStr = String(message ?? '');
  if (isDuplicateToast(messageStr, 'error')) {
    return '';
  }
  const id = getToastId(messageStr, 'error');
  activeToasts.add(id);
  return originalToast.error(message as string, { ...options, id });
}) as typeof toast.error;

toast.loading = ((message: string | undefined, options?: Parameters<typeof toast.loading>[1]) => {
  const messageStr = String(message ?? '');
  if (isDuplicateToast(messageStr, 'loading')) {
    return '';
  }
  const id = getToastId(messageStr, 'loading');
  activeToasts.add(id);
  return originalToast.loading(message as string, { ...options, id });
}) as typeof toast.loading;

function toastInfo(message: string | React.ReactNode, options?: Parameters<typeof toast>[1]): string {
  const messageStr = typeof message === 'string' ? message : '';
  if (messageStr && isDuplicateToast(messageStr, 'info')) {
    return '';
  }
  const id = messageStr ? getToastId(messageStr, 'info') : undefined;
  if (id) activeToasts.add(id);
  return toast(message as string, {
    ...options,
    icon: <Info className='h-4 w-4 text-blue-500' />,
    id,
    // @ts-expect-error - data is not in ToastOptions
    data: { ...(options as Record<string, unknown>)?.data, type: 'info' },
  });
}

function toastWarning(message: string | React.ReactNode, options?: Parameters<typeof toast>[1]): string {
  const messageStr = typeof message === 'string' ? message : '';
  if (messageStr && isDuplicateToast(messageStr, 'warning')) {
    return '';
  }
  const id = messageStr ? getToastId(messageStr, 'warning') : undefined;
  if (id) activeToasts.add(id);
  return toast(message as string, {
    ...options,
    icon: <AlertTriangle className='h-4 w-4 text-amber-500' />,
    id,
    // @ts-expect-error - data is not in ToastOptions
    data: { ...(options as Record<string, unknown>)?.data, type: 'warning' },
  });
}

(toast as unknown as Record<string, unknown>).info = toastInfo;
(toast as unknown as Record<string, unknown>).warning = toastWarning;

interface ToastWithData extends Toast {
  data?: { type?: string };
}

const stripColors: Record<string, string> = {
  success: 'bg-emerald-500',
  error: 'bg-destructive',
  warning: 'bg-amber-500',
  info: 'bg-blue-500',
  loading: 'bg-blue-500',
  blank: 'bg-muted-foreground',
};

const defaultIcons: Record<string, React.ReactElement> = {
  success: <CheckCircle className='h-4 w-4 text-emerald-500' />,
  error: <XCircle className='h-4 w-4 text-destructive' />,
  info: <Info className='h-4 w-4 text-blue-500' />,
  warning: <AlertTriangle className='h-4 w-4 text-amber-500' />,
};

function ToastProvider() {
  return (
    <Toaster
      position='top-right'
      toastOptions={{
        style: {
          background: 'var(--card)',
          color: 'var(--card-foreground)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          padding: '0',
          maxWidth: '380px',
        },
        success: { icon: defaultIcons.success },
        error: { icon: defaultIcons.error },
      }}
      gutter={12}
      containerStyle={{
        top: '24px',
        right: '24px',
      }}
    >
      {(t: Toast) => (
        <ToastBar toast={t}>
          {({ icon, message }) => {
            const toastWithData = t as ToastWithData;
            const toastType = toastWithData.data?.type ?? t.type;
            const stripColor = stripColors[toastType] ?? stripColors.blank;
            const defaultIcon = defaultIcons[toastType];

            return (
              <div className='flex items-stretch overflow-hidden rounded-[var(--radius)]'>
                <div className={cn('w-1.5 shrink-0 opacity-80', stripColor)} />

                <div className='flex flex-1 items-center gap-2 p-3'>
                  {t.icon || t.type !== 'blank' || defaultIcon ? (
                    <span className='shrink-0'>{icon || defaultIcon}</span>
                  ) : null}

                  <div className='min-w-0 flex-1 leading-snug text-card-foreground/80'>{message}</div>

                  {t.type !== 'loading' && (
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => toast.dismiss(t.id)}
                      aria-label='Close notification'
                      className='h-auto w-auto shrink-0 cursor-pointer rounded-md p-1 opacity-70 transition-all duration-150 hover:scale-[1.02] hover:bg-black/5 hover:opacity-100 focus-visible:bg-black/5 focus-visible:opacity-100 active:scale-[0.97] dark:hover:bg-white/10 dark:focus-visible:bg-white/10'
                    >
                      <X className='h-4 w-4' strokeWidth={2} aria-hidden='true' />
                    </Button>
                  )}
                </div>
              </div>
            );
          }}
        </ToastBar>
      )}
    </Toaster>
  );
}

ToastProvider.displayName = 'ToastProvider';

export { ToastProvider };
