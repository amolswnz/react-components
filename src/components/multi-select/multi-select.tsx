// src/components/multi-select/multi-select.tsx
import * as React from 'react';
import { Check, ChevronsUpDown, Loader2, Plus, X } from 'lucide-react';
import { useDebounce } from '@/hooks/amolsw/use-debounce';
import { cn, FieldError, highlightMatch } from '@/lib/amolsw';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export interface MultiSelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
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
  maxDisplayItems?: number;
  className?: string;
  /** Accessible label for the combobox. Defaults to `placeholder`. */
  'aria-label'?: string;
  /** Custom renderer for each option item. Receives the option and whether it's selected. */
  renderOption?: (option: MultiSelectOption, isSelected: boolean) => React.ReactNode;
  createNew?: { label: string; onClick: (query: string) => void };
  showEndOfList?: boolean;
  contentClassName?: string;
}

const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      options,
      value = [],
      onChange,
      label,
      placeholder = 'Select...',
      searchPlaceholder = 'Search...',
      emptyMessage = 'No results found.',
      disabled = false,
      loading = false,
      required = false,
      onSearch,
      maxDisplayItems = 2,
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

    const selectedOptions = React.useMemo(() => options.filter((opt) => value.includes(opt.value)), [options, value]);

    const visibleOptions = selectedOptions.slice(0, maxDisplayItems);
    const overflowCount = selectedOptions.length - maxDisplayItems;

    React.useEffect(() => {
      if (onSearch) {
        onSearch(debouncedSearch);
      }
    }, [debouncedSearch, onSearch]);

    const handleSelect = (currentValue: string) => {
      const newValue = value.includes(currentValue)
        ? value.filter((v) => v !== currentValue)
        : [...value, currentValue];
      onChange?.(newValue);
    };

    const handleRemove = (removedValue: string) => {
      onChange?.(value.filter((v) => v !== removedValue));
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
                'flex h-auto min-h-10 w-full cursor-pointer items-center justify-between gap-1.5 px-3 py-1.5',
                !selectedOptions.length && 'text-muted-foreground',
                error && 'border-destructive',
                className
              )}
            >
              <div className='flex flex-wrap items-center gap-1'>
                {loading && <Loader2 className='h-4 w-4 animate-spin' />}
                {selectedOptions.length === 0 && placeholder}
                {visibleOptions.map((opt) => (
                  <Badge key={opt.value} variant='secondary' className='gap-1 whitespace-nowrap'>
                    {opt.label}
                    <span
                      role='button'
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(opt.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.stopPropagation();
                          handleRemove(opt.value);
                        }
                      }}
                      className='ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2'
                      aria-label={`Remove ${opt.label}`}
                    >
                      <X className='h-3 w-3' />
                    </span>
                  </Badge>
                ))}
                {overflowCount > 0 && <span className='text-xs text-muted-foreground'>+{overflowCount} more</span>}
              </div>
              <ChevronsUpDown className='h-4 w-4 shrink-0 opacity-50' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className={cn('w-full p-0', contentClassName)} align='start'>
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
                  {filteredOptions.map((option) => {
                    const isSelected = value.includes(option.value);
                    return (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                        onSelect={handleSelect}
                        className='cursor-pointer'
                      >
                        {renderOption ? (
                          renderOption(option, isSelected)
                        ) : (
                          <>
                            <div
                              className={cn(
                                'mr-2 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-primary',
                                isSelected ? 'bg-primary text-primary-foreground' : 'opacity-50'
                              )}
                            >
                              {isSelected && <Check className='h-3 w-3' />}
                            </div>
                            {highlightMatch(option.label, searchQuery)}
                          </>
                        )}
                      </CommandItem>
                    );
                  })}
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
MultiSelect.displayName = 'MultiSelect';

export { MultiSelect };
