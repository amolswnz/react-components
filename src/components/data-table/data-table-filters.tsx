import { useMemo } from 'react';
import { Plus, RefreshCw, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/amolsw/utils';
import { DateRangeField } from '@/components/amolsw/date-range-field';
import { MultiSelect } from '@/components/amolsw/multi-select';
import { SearchInput } from '@/components/amolsw/search-input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export type { SortDirection } from '@/lib/amolsw/types';

export interface FilterDateRangeField {
  key: string;
  label: string;
  fromKey?: string;
  toKey?: string;
  fromLabel?: string;
  toLabel?: string;
}

export interface FilterSelectField {
  key: string;
  label: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  multi?: boolean;
}

export interface FilterTextField {
  key: string;
  label: string;
  placeholder?: string;
}

export interface FilterToggleGroupField {
  key: string;
  label: string;
  options: { value: string; label: string }[];
}

export interface FilterPerPageConfig {
  options: { value: string; label: string }[];
  label?: string;
}

export interface DataTableFiltersProps {
  filterSelectFields?: FilterSelectField[];
  filterTextFields?: FilterTextField[];
  filterToggleGroupFields?: FilterToggleGroupField[];
  filterDateRangeFields?: FilterDateRangeField[];
  values: Record<string, string>;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  loadingSearch?: boolean;
  onRefresh?: () => void;
  loadingRefresh?: boolean;
  onAddNew?: () => void;
  onFilterChange: (key: string, value: string) => void;
  perPage?: FilterPerPageConfig;
  perPageValue?: number;
  onPerPageChange?: (value: number) => void;
  defaultValues?: Record<string, string>;
  onClearFilters: () => void;
  className?: string;
}

function formatDateDisplay(value: string): string {
  try {
    return format(new Date(value), 'PP');
  } catch {
    return value;
  }
}

function hasActiveFilters(
  values: Record<string, string>,
  defaultValues: Record<string, string>,
  searchValue?: string
): boolean {
  if (searchValue) return true;
  for (const key of Object.keys(values)) {
    if (values[key] !== (defaultValues[key] ?? '')) return true;
  }
  return false;
}

interface ActiveFilter {
  key: string;
  label: string;
  valueLabel: string;
  onClear: () => void;
}

function buildActiveFilters(
  values: Record<string, string>,
  defaultValues: Record<string, string>,
  filterTextFields: FilterTextField[] | undefined,
  filterSelectFields: FilterSelectField[] | undefined,
  filterDateRangeFields: FilterDateRangeField[] | undefined,
  onFilterChange: (key: string, value: string) => void,
  searchValue?: string,
  onSearchChange?: (value: string) => void,
  filterToggleGroupFields?: FilterToggleGroupField[]
): ActiveFilter[] {
  const result: ActiveFilter[] = [];

  for (const field of filterTextFields ?? []) {
    if (values[field.key] && values[field.key] !== (defaultValues[field.key] ?? '')) {
      result.push({
        key: field.key,
        label: field.label,
        valueLabel: values[field.key],
        onClear: () => onFilterChange(field.key, ''),
      });
    }
  }

  for (const field of filterSelectFields ?? []) {
    if (values[field.key] && values[field.key] !== (defaultValues[field.key] ?? '')) {
      if (field.multi) {
        const selected = values[field.key].split(',').filter(Boolean);
        const labels = selected.map((v) => {
          const opt = field.options.find((o) => o.value === v);
          return opt?.label ?? v;
        });
        result.push({
          key: field.key,
          label: field.label,
          valueLabel: labels.join(', '),
          onClear: () => onFilterChange(field.key, ''),
        });
      } else {
        const option = field.options.find((o) => o.value === values[field.key]);
        result.push({
          key: field.key,
          label: field.label,
          valueLabel: option?.label ?? values[field.key],
          onClear: () => onFilterChange(field.key, ''),
        });
      }
    }
  }

  for (const field of filterToggleGroupFields ?? []) {
    if (values[field.key] && values[field.key] !== (defaultValues[field.key] ?? '')) {
      const selected = values[field.key].split(',').filter(Boolean);
      const labels = selected.map((v) => {
        const opt = field.options.find((o) => o.value === v);
        return opt?.label ?? v;
      });
      result.push({
        key: field.key,
        label: field.label,
        valueLabel: labels.join(', '),
        onClear: () => onFilterChange(field.key, ''),
      });
    }
  }

  for (const field of filterDateRangeFields ?? []) {
    const fromKey = field.fromKey ?? `${field.key}From`;
    const toKey = field.toKey ?? `${field.key}To`;
    const fromValue = values[fromKey];
    const toValue = values[toKey];
    if (
      (fromValue && fromValue !== (defaultValues[fromKey] ?? '')) ||
      (toValue && toValue !== (defaultValues[toKey] ?? ''))
    ) {
      const parts: string[] = [];
      if (fromValue) parts.push(`from ${formatDateDisplay(fromValue)}`);
      if (toValue) parts.push(`to ${formatDateDisplay(toValue)}`);
      result.push({
        key: field.key,
        label: field.label,
        valueLabel: parts.join(' '),
        onClear: () => {
          onFilterChange(fromKey, '');
          onFilterChange(toKey, '');
        },
      });
    }
  }

  if (searchValue && onSearchChange) {
    result.push({
      key: '__search__',
      label: 'Keyword',
      valueLabel: searchValue,
      onClear: () => onSearchChange(''),
    });
  }

  return result;
}

function DataTableFilters({
  filterSelectFields,
  filterTextFields,
  filterToggleGroupFields,
  filterDateRangeFields,
  values,
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
  loadingSearch,
  onRefresh,
  loadingRefresh,
  onAddNew,
  onFilterChange,
  perPage,
  perPageValue,
  onPerPageChange,
  defaultValues = {},
  onClearFilters,
  className,
}: DataTableFiltersProps) {
  const active = hasActiveFilters(values, defaultValues, searchValue);

  const hasFilters =
    (filterSelectFields && filterSelectFields.length > 0) ||
    (filterTextFields && filterTextFields.length > 0) ||
    (filterToggleGroupFields && filterToggleGroupFields.length > 0) ||
    (filterDateRangeFields && filterDateRangeFields.length > 0) ||
    perPage !== undefined;

  const activeFilters = useMemo(
    () =>
      buildActiveFilters(
        values,
        defaultValues,
        filterTextFields,
        filterSelectFields,
        filterDateRangeFields,
        onFilterChange,
        searchValue,
        onSearchChange,
        filterToggleGroupFields
      ),
    [
      values,
      defaultValues,
      filterTextFields,
      filterSelectFields,
      filterDateRangeFields,
      onFilterChange,
      searchValue,
      onSearchChange,
      filterToggleGroupFields,
    ]
  );

  return (
    <div className={cn('w-full space-y-4 mb-8', className)}>
      <div className='flex items-center gap-2'>
        {onSearchChange && (
          <div className='flex-1 min-w-0'>
            <SearchInput
              value={searchValue ?? ''}
              onChange={onSearchChange}
              loading={loadingSearch}
              placeholder={searchPlaceholder}
            />
          </div>
        )}
        <div className='flex items-center gap-2'>
          {active && (
            <Button
              type='button'
              variant='ghost'
              size='sm'
              onClick={onClearFilters}
              className='h-8 cursor-pointer px-2 text-xs'
            >
              <X className='mr-1 h-3 w-3' />
              Clear filters
            </Button>
          )}
          {onRefresh && (
            <Button
              variant='outline'
              size='icon'
              onClick={onRefresh}
              disabled={loadingRefresh}
              aria-label='Refresh data'
              className='cursor-pointer'
            >
              <RefreshCw className={cn('h-4 w-4', loadingRefresh && 'animate-spin')} />
            </Button>
          )}
          {onAddNew && (
            <Button onClick={onAddNew} size='sm' className='cursor-pointer'>
              <Plus className='h-4 w-4' />
              Add New
            </Button>
          )}
        </div>
      </div>

      {hasFilters && (
        <div className='flex flex-wrap gap-4'>
          {filterTextFields?.map((field) => (
            <div key={field.key} className='min-w-[200px] max-w-md flex-1 space-y-2'>
              <Label htmlFor={field.key} className='block'>
                {field.label}
              </Label>
              <div className='relative'>
                <Input
                  id={field.key}
                  placeholder={field.placeholder ?? `Filter by ${field.label.toLowerCase()}...`}
                  value={values[field.key] ?? ''}
                  onChange={(e) => onFilterChange(field.key, e.target.value)}
                  className='pr-8'
                />
                {values[field.key] && (
                  <Button
                    type='button'
                    variant='ghost'
                    size='icon'
                    onClick={() => onFilterChange(field.key, '')}
                    className='absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-foreground'
                    tabIndex={-1}
                    aria-label='Clear'
                  >
                    <X className='h-4 w-4' />
                  </Button>
                )}
              </div>
            </div>
          ))}
          {filterDateRangeFields?.map((field) => {
            const fromKey = field.fromKey ?? `${field.key}From`;
            const toKey = field.toKey ?? `${field.key}To`;
            return (
              <div key={field.key} className='min-w-[200px] max-w-md flex-1'>
                <DateRangeField
                  label={field.label}
                  from={values[fromKey]}
                  to={values[toKey]}
                  placeholder={field.fromLabel}
                  onChange={(from, to) => {
                    onFilterChange(fromKey, from);
                    onFilterChange(toKey, to);
                  }}
                />
              </div>
            );
          })}
          {filterToggleGroupFields?.map((field) => {
            const selectedValues = values[field.key] ? values[field.key].split(',').filter(Boolean) : [];

            return (
              <div key={field.key} className='min-w-[200px] max-w-md flex-1 space-y-2'>
                <Label className='block'>{field.label}</Label>
                <ToggleGroup
                  type='multiple'
                  variant='outline'
                  value={selectedValues}
                  onValueChange={(v) => onFilterChange(field.key, v.join(','))}
                  className='flex-wrap justify-start'
                >
                  {field.options.map((option) => (
                    <ToggleGroupItem key={option.value} value={option.value} className='cursor-pointer text-xs'>
                      {option.label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
            );
          })}
          {filterSelectFields?.map((field) => {
            const selectedValues = field.multi
              ? values[field.key]
                ? values[field.key].split(',').filter(Boolean)
                : []
              : undefined;

            return (
              <div key={field.key} className='min-w-[200px] max-w-md flex-1 space-y-2'>
                <Label className='block'>{field.label}</Label>
                {field.multi ? (
                  <MultiSelect
                    options={field.options.map((o) => ({ label: o.label, value: o.value }))}
                    value={selectedValues}
                    onChange={(v) => onFilterChange(field.key, v.join(','))}
                    placeholder={field.placeholder ?? 'Select...'}
                  />
                ) : (
                  <Select
                    value={values[field.key] ?? defaultValues[field.key] ?? ''}
                    onValueChange={(v) => onFilterChange(field.key, v)}
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder={field.placeholder ?? 'Select...'} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            );
          })}
          {perPage && (
            <div className='ml-auto space-y-2'>
              <Label className='block'>{perPage.label ?? 'Per page'}</Label>
              <Select value={String(perPageValue)} onValueChange={(v) => onPerPageChange?.(parseInt(v, 10))}>
                <SelectTrigger className='w-20'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {perPage.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      )}

      {activeFilters.length > 0 && (
        <div className='flex flex-wrap gap-1'>
          {activeFilters.map((f) => (
            <Badge key={f.key} variant='secondary' className='gap-1 text-sm p-2'>
              <span className='font-normal'>{f.label}:</span> {f.valueLabel}
              <button
                type='button'
                onClick={f.onClear}
                className='cursor-pointer rounded-full outline-none hover:text-foreground'
                aria-label={`Remove ${f.label} filter`}
              >
                <X className='h-3 w-3' />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

DataTableFilters.displayName = 'DataTableFilters';

export { DataTableFilters };
