// src/components/single-select/single-select.tsx
import * as React from 'react';
import { Check, ChevronsUpDown, Loader2, Plus } from 'lucide-react';
import { useDebounce } from '@/hooks/amolsw/use-debounce';
import { cn, FieldError, highlightMatch } from '@/lib/amolsw';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export interface SingleSelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SingleSelectProps {
  options: SingleSelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  loading?: boolean;
  required?: boolean;
  error?: string;
  errorClassName?: string;
  renderError?: (error: string) => React.ReactNode;
  onSearch?: (query: string) => void;
  className?: string;
  /** Accessible label for the combobox. Defaults to `placeholder`. */
  'aria-label'?: string;
  /** Custom renderer for each option item. Receives the option and whether it's selected. */
  renderOption?: (option: SingleSelectOption, isSelected: boolean) => React.ReactNode;
  createNew?: { label: string; onClick: (query: string) => void };
  showEndOfList?: boolean;
  contentClassName?: string;
}

const SingleSelect = React.forwardRef<HTMLButtonElement, SingleSelectProps>(
  (
    {
      options,
      value,
      onChange,
      label,
      placeholder = 'Select an option...',
      searchPlaceholder = 'Search...',
      emptyMessage = 'No results found.',
      disabled = false,
      loading = false,
      required = false,
      onSearch,
      className,
      'aria-label': ariaLabel,
      renderOption,
      createNew,
      error,
      errorClassName,
      renderError,
      showEndOfList = false,
      contentClassName,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const debouncedSearch = useDebounce(searchQuery, 300);

    const filteredOptions = React.useMemo(() => {
      if (!searchQuery) return options;
      return options.filter((opt) => opt.label.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [options, searchQuery]);

    const selectedOption = React.useMemo(() => options.find((opt) => opt.value === value), [options, value]);

    React.useEffect(() => {
      if (onSearch) {
        onSearch(debouncedSearch);
      }
    }, [debouncedSearch, onSearch]);

    const handleSelect = (currentValue: string) => {
      const newValue = currentValue === value ? '' : currentValue;
      onChange?.(newValue);
      setOpen(false);
      setSearchQuery('');
    };

    return (
      <div className='space-y-2'>
        {label && (
          <Label className='block'>
            {label}
            {required && <span className='text-destructive'> *</span>}
          </Label>
        )}
        <Popover
          open={open}
          onOpenChange={(isOpen) => {
            if (!isOpen) setSearchQuery('');
            setOpen(isOpen);
          }}
        >
          <PopoverTrigger asChild>
            <Button
              ref={ref}
              variant='outline'
              role='combobox'
              aria-expanded={open}
              aria-label={ariaLabel || placeholder}
              disabled={disabled}
              className={cn(
                'w-full cursor-pointer justify-between',
                !selectedOption && 'text-muted-foreground',
                error && 'border-destructive',
                className
              )}
            >
              {loading ? (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              ) : (
                <span className='truncate'>{selectedOption?.label ?? placeholder}</span>
              )}
              <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className={cn('p-0', contentClassName)}>
            <Command shouldFilter={!onSearch}>
              <CommandInput
                placeholder={searchPlaceholder}
                aria-label={ariaLabel || searchPlaceholder}
                value={searchQuery}
                onValueChange={setSearchQuery}
              />
              <CommandList>
                <CommandEmpty>{emptyMessage}</CommandEmpty>
                <CommandGroup>
                  {filteredOptions.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled}
                      onSelect={handleSelect}
                      className='cursor-pointer'
                    >
                      {renderOption ? (
                        renderOption(option, value === option.value)
                      ) : (
                        <>
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4 shrink-0',
                              value === option.value ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                          {highlightMatch(option.label, searchQuery)}
                        </>
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
                {showEndOfList && (
                  <CommandGroup>
                    <CommandItem
                      value='__end_of_list__'
                      disabled
                      className='cursor-default border-t justify-center px-2 text-xs text-muted-foreground'
                    >
                      -- End of list --
                    </CommandItem>
                  </CommandGroup>
                )}
                {createNew && (
                  <CommandGroup>
                    <CommandItem
                      value='__create_new__'
                      onSelect={() => {
                        createNew.onClick(searchQuery);
                        setOpen(false);
                        setSearchQuery('');
                      }}
                      className='cursor-pointer border-t'
                    >
                      <Plus className='h-4 w-4' />
                      {createNew.label}
                    </CommandItem>
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <FieldError error={error} errorClassName={errorClassName} renderError={renderError} />
      </div>
    );
  }
);
SingleSelect.displayName = 'SingleSelect';

export { SingleSelect };
