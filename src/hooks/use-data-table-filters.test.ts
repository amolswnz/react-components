// src/hooks/use-data-table-filters.test.ts
import { act, renderHook } from '@testing-library/react';
import { useDataTableFilters } from './use-data-table-filters';

function setSearchParams(params: string) {
  const url = new URL(`http://localhost${params ? `?${params}` : ''}`);
  window.history.replaceState(null, '', url.toString());
}

function getSearchParams(): string {
  return window.location.search.replace(/^\?/, '');
}

beforeEach(() => {
  setSearchParams('');
});

describe('useDataTableFilters', () => {
  it('initializes values from defaults when URL has no params', () => {
    const { result } = renderHook(() =>
      useDataTableFilters({
        defaultValues: { role: 'all', status: 'active' },
      })
    );
    expect(result.current.values).toEqual({ role: 'all', status: 'active' });
  });

  it('initializes values from URL params when present', () => {
    setSearchParams('role=Admin&status=inactive');
    const { result } = renderHook(() =>
      useDataTableFilters({
        defaultValues: { role: 'all', status: 'active' },
      })
    );
    expect(result.current.values).toEqual({ role: 'Admin', status: 'inactive' });
  });

  it('initializes sortField from URL', () => {
    setSearchParams('sortField=email');
    const { result } = renderHook(() => useDataTableFilters({ defaultSortField: 'name' }));
    expect(result.current.sortField).toBe('email');
  });

  it('initializes sortDirection from URL', () => {
    setSearchParams('sortDirection=desc');
    const { result } = renderHook(() => useDataTableFilters({ defaultSortDirection: 'asc' }));
    expect(result.current.sortDirection).toBe('desc');
  });

  it('initializes perPage from URL', () => {
    setSearchParams('perPage=25');
    const { result } = renderHook(() => useDataTableFilters({ defaultPerPage: 10 }));
    expect(result.current.perPageValue).toBe(25);
  });

  it('falls back to defaults when URL params are missing', () => {
    setSearchParams('otherParam=value');
    const { result } = renderHook(() =>
      useDataTableFilters({
        defaultValues: { role: 'all' },
        defaultSortField: 'name',
        defaultSortDirection: 'asc',
        defaultPerPage: 10,
      })
    );
    expect(result.current.values).toEqual({ role: 'all' });
    expect(result.current.sortField).toBe('name');
    expect(result.current.sortDirection).toBe('asc');
    expect(result.current.perPageValue).toBe(10);
  });

  it('updates URL when onFilterChange is called', () => {
    const { result } = renderHook(() => useDataTableFilters({ defaultValues: { role: 'all' } }));
    act(() => {
      result.current.onFilterChange('role', 'Admin');
    });
    expect(result.current.values.role).toBe('Admin');
    expect(getSearchParams()).toContain('role=Admin');
  });

  it('updates URL when onSortFieldChange is called', () => {
    const { result } = renderHook(() => useDataTableFilters({ defaultSortField: 'name' }));
    act(() => {
      result.current.onSortFieldChange('email');
    });
    expect(getSearchParams()).toContain('sortField=email');
  });

  it('updates URL when onSortDirectionChange is called', () => {
    const { result } = renderHook(() => useDataTableFilters({ defaultSortDirection: 'asc' }));
    act(() => {
      result.current.onSortDirectionChange('desc');
    });
    expect(getSearchParams()).toContain('sortDirection=desc');
  });

  it('updates URL when onPerPageChange is called', () => {
    const { result } = renderHook(() => useDataTableFilters({ defaultPerPage: 10 }));
    act(() => {
      result.current.onPerPageChange(25);
    });
    expect(getSearchParams()).toContain('perPage=25');
  });

  it('onClearFilters resets all values and removes URL params', () => {
    setSearchParams('role=Admin&status=inactive&sortField=email&sortDirection=desc&perPage=25');
    const { result } = renderHook(() =>
      useDataTableFilters({
        defaultValues: { role: 'all', status: 'active' },
        defaultSortField: 'name',
        defaultSortDirection: 'asc',
        defaultPerPage: 10,
      })
    );
    act(() => {
      result.current.onClearFilters();
    });
    expect(result.current.values).toEqual({ role: 'all', status: 'active' });
    expect(result.current.sortField).toBe('name');
    expect(result.current.sortDirection).toBe('asc');
    expect(result.current.perPageValue).toBe(10);
    expect(getSearchParams()).not.toContain('role');
    expect(getSearchParams()).not.toContain('status');
  });

  it('removes param from URL when value is set to empty string', () => {
    setSearchParams('role=Admin');
    const { result } = renderHook(() => useDataTableFilters({ defaultValues: { role: '' } }));
    act(() => {
      result.current.onFilterChange('role', '');
    });
    expect(getSearchParams()).not.toContain('role');
  });

  it('restores from URL on popstate', () => {
    const { result } = renderHook(() => useDataTableFilters({ defaultValues: { role: 'all' } }));
    act(() => {
      result.current.onFilterChange('role', 'Editor');
    });
    expect(result.current.values.role).toBe('Editor');

    setSearchParams('role=Admin');
    act(() => {
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
    expect(result.current.values.role).toBe('Admin');
  });
});
