// src/lib/field-error.tsx
import { AlertCircle } from 'lucide-react';
import { cn } from './utils';

export interface FieldErrorProps {
  error?: string;
  errorClassName?: string;
  renderError?: (error: string) => React.ReactNode;
}

function FieldError({ error, errorClassName, renderError }: FieldErrorProps) {
  if (!error) return null;

  if (renderError) {
    return <>{renderError(error)}</>;
  }

  return (
    <span className={cn('flex items-center gap-1 text-xs text-destructive', errorClassName)}>
      <AlertCircle className='h-3 w-3' />
      {error}
    </span>
  );
}

FieldError.displayName = 'FieldError';

export { FieldError };
