// src/components/icon-input/icon-input.tsx
import * as React from 'react';
import { cn, FieldError } from '@/lib/amolsw';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface IconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
  endIcon?: React.ReactNode;
  label?: string;
  required?: boolean;
  error?: string;
  errorClassName?: string;
  renderError?: (error: string) => React.ReactNode;
}

const IconInput = React.forwardRef<HTMLInputElement, IconInputProps>(
  ({ icon, endIcon, className, label, required = false, error, errorClassName, renderError, ...props }, ref) => {
    return (
      <div className='space-y-2'>
        {label && (
          <Label className='block'>
            {label}
            {required && <span className='text-destructive'> *</span>}
          </Label>
        )}
        <div className='relative flex items-center'>
          <span className="text-muted-foreground pointer-events-none absolute left-3 flex items-center [&_svg:not([class*='size-'])]:size-4">
            {icon}
          </span>
          <Input
            ref={ref}
            className={cn('pl-8', endIcon ? 'pr-8' : '', error && 'border-destructive', className)}
            {...props}
          />
          {endIcon ? (
            <span className="text-muted-foreground absolute right-3 flex items-center [&_svg:not([class*='size-'])]:size-4">
              {endIcon}
            </span>
          ) : null}
        </div>
        <FieldError error={error} errorClassName={errorClassName} renderError={renderError} />
      </div>
    );
  }
);

IconInput.displayName = 'IconInput';

export { IconInput };
