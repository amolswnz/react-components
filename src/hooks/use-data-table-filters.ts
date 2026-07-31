// src/hooks/use-data-table-filters.ts
import { useCallback, useEffect, useRef, useState } from 'react';
import type { SortDirection } from '@/components/amolsw/data-table';

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

function readParam(key: string): string {
  if (!isBrowser()) return '';
  return new URLSearchParams(window.location.search).get(key) ?? '';
}

function writeParams(params: Record<string, string | null>) {
  if (!isBrowser()) return;
  const searchParams = new URLSearchParams(window.location.search);
  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === '') {
      searchParams.delete(key);
    } else {
      searchParams.set(key, value);
    }
  }
  const qs = searchParams.toString();
  const newUrl = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
  window.history.replaceState(null, '', newUrl);
}

export interface UseDataTableFiltersOptions {
  defaultValues?: Record<string, string>;
  defaultSortField?: string;
  defaultSortDirection?: SortDirection;
  defaultPerPage?: number;
}

export interface UseDataTableFiltersReturn {
  values: Record<string, string>;
  sortField: string;
  sortDirection: SortDirection;
  perPageValue: number;
  onFilterChange: (key: string, value: string) => void;
  onSortFieldChange: (value: string) => void;
  onSortDirectionChange: (value: SortDirection) => void;
  onPerPageChange: (value: number) => void;
  onClearFilters: () => void;
}

export function useDataTableFilters({
  defaultValues = {},
  defaultSortField = '',
  defaultSortDirection = 'asc',
  defaultPerPage = 10,
}: UseDataTableFiltersOptions = {}): UseDataTableFiltersReturn {
  const paramKeys = Object.keys(defaultValues);

  const [values, setValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const key of paramKeys) {
      initial[key] = readParam(key) || defaultValues[key] || '';
    }
    return initial;
  });

  const [sortField, setSortField] = useState<string>(() => {
    return readParam('sortField') || defaultSortField;
  });

  const [sortDirection, setSortDirection] = useState<SortDirection>(() => {
    const val = readParam('sortDirection');
    return (val as SortDirection) || defaultSortDirection;
  });

  const [perPageValue, setPerPageValue] = useState<number>(() => {
    const val = readParam('perPage');
    return val ? parseInt(val, 10) : defaultPerPage;
  });

  const configRef = useRef({ defaultValues, defaultSortField, defaultSortDirection, defaultPerPage });
  configRef.current = { defaultValues, defaultSortField, defaultSortDirection, defaultPerPage };

  const isFirstRender = useRef(true);

  const paramKeysRef = useRef(paramKeys);
  paramKeysRef.current = paramKeys;

  // Sync state to URL on every render after the first
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const cfg = configRef.current;
    const params: Record<string, string | null> = {};
    for (const key of paramKeysRef.current) {
      const value = values[key];
      const defaultValue = cfg.defaultValues[key] ?? '';
      params[key] = value !== defaultValue ? value || null : null;
    }
    params.sortField = sortField !== cfg.defaultSortField ? sortField || null : null;
    params.sortDirection = sortDirection !== cfg.defaultSortDirection ? sortDirection || null : null;
    params.perPage = perPageValue !== cfg.defaultPerPage ? String(perPageValue) : null;

    writeParams(params);
  });

  // Listen for browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const cfg = configRef.current;
      const keys = Object.keys(cfg.defaultValues);
      const newValues: Record<string, string> = {};
      for (const key of keys) {
        newValues[key] = readParam(key) || cfg.defaultValues[key] || '';
      }
      setValues(newValues);
      setSortField(readParam('sortField') || cfg.defaultSortField);
      setSortDirection((readParam('sortDirection') as SortDirection) || cfg.defaultSortDirection);
      const pp = readParam('perPage');
      setPerPageValue(pp ? parseInt(pp, 10) : cfg.defaultPerPage);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const onFilterChange = useCallback((key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const onSortFieldChange = useCallback((value: string) => {
    setSortField(value);
  }, []);

  const onSortDirectionChange = useCallback((value: SortDirection) => {
    setSortDirection(value);
  }, []);

  const onPerPageChange = useCallback((value: number) => {
    setPerPageValue(value);
  }, []);

  const onClearFilters = useCallback(() => {
    const cfg = configRef.current;
    const cleared: Record<string, string> = {};
    for (const key of Object.keys(cfg.defaultValues)) {
      cleared[key] = cfg.defaultValues[key] ?? '';
    }
    setValues(cleared);
    setSortField(cfg.defaultSortField);
    setSortDirection(cfg.defaultSortDirection);
    setPerPageValue(cfg.defaultPerPage);
  }, []);

  return {
    values,
    sortField,
    sortDirection,
    perPageValue,
    onFilterChange,
    onSortFieldChange,
    onSortDirectionChange,
    onPerPageChange,
    onClearFilters,
  };
}
