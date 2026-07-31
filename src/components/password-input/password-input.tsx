// src/components/password-input/password-input.tsx
import * as React from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { cn, FieldError } from '@/lib/amolsw';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface PasswordInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onChange' | 'value' | 'defaultValue'
> {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  label?: string;
  required?: boolean;
  error?: string;
  errorClassName?: string;
  renderError?: (error: string) => React.ReactNode;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue = '',
      onChange,
      disabled,
      label,
      required = false,
      error,
      errorClassName,
      renderError,
      placeholder = 'Password',
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const displayValue = isControlled ? controlledValue : internalValue;
    const [showPassword, setShowPassword] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    return (
      <div className='space-y-2'>
        {label && (
          <Label className='block'>
            {label}
            {required && <span className='text-destructive'> *</span>}
          </Label>
        )}
        <div className='relative flex items-center'>
          <Lock className='text-muted-foreground pointer-events-none absolute left-3 size-4' />
          <Input
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            value={displayValue}
            onChange={handleChange}
            disabled={disabled}
            placeholder={placeholder}
            aria-label={ariaLabel || placeholder}
            className={cn('pl-10 pr-10', error && 'border-destructive', className)}
            {...props}
          />
          {displayValue ? (
            <Button
              type='button'
              variant='ghost'
              size='icon'
              onClick={() => setShowPassword(!showPassword)}
              disabled={disabled}
              className='text-muted-foreground hover:text-foreground absolute right-1 h-7 w-7 cursor-pointer rounded-full'
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className='size-4' /> : <Eye className='size-4' />}
            </Button>
          ) : null}
        </div>
        <FieldError error={error} errorClassName={errorClassName} renderError={renderError} />
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
