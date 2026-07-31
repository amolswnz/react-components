import * as React from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { FieldError } from '@/lib/amolsw';
import { IconInput } from '@/components/amolsw/icon-input';
import { Button } from '@/components/ui/button';

export interface SearchInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value' | 'defaultValue' | 'type'
> {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  loading?: boolean;
  onClear?: () => void;
  label?: string;
  required?: boolean;
  error?: string;
  errorClassName?: string;
  renderError?: (error: string) => React.ReactNode;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue = '',
      onChange,
      loading = false,
      disabled,
      onClear,
      label,
      required = false,
      error,
      errorClassName,
      renderError,
      placeholder = 'Search...',
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const displayValue = isControlled ? controlledValue : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    const handleClear = () => {
      if (!isControlled) {
        setInternalValue('');
      }
      onChange?.('');
      onClear?.();
    };

    return (
      <>
        <IconInput
          ref={ref}
          icon={loading ? <Loader2 className='animate-spin' /> : <Search />}
          value={displayValue}
          onChange={(e) => handleChange(e)}
          disabled={disabled}
          placeholder={placeholder}
          label={label}
          required={required}
          aria-label={ariaLabel || placeholder}
          endIcon={
            displayValue ? (
              <Button
                type='button'
                variant='ghost'
                size='icon'
                onClick={handleClear}
                disabled={disabled}
                className='h-7 w-7 rounded-full text-muted-foreground hover:text-foreground cursor-pointer'
                aria-label='Clear search'
              >
                <X />
              </Button>
            ) : undefined
          }
          className={className}
          {...props}
        />
        <FieldError error={error} errorClassName={errorClassName} renderError={renderError} />
      </>
    );
  }
);
SearchInput.displayName = 'SearchInput';

export { SearchInput };
