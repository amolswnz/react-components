import type { ComponentType } from 'react';

import searchInputDoc from '../../docs/search-input.md?raw';
import iconInputDoc from '../../docs/icon-input.md?raw';
import passwordInputDoc from '../../docs/password-input.md?raw';
import singleSelectDoc from '../../docs/single-select.md?raw';
import multiSelectDoc from '../../docs/multi-select.md?raw';
import dateTimeFieldDoc from '../../docs/date-time-field.md?raw';
import dateRangeFieldDoc from '../../docs/date-range-field.md?raw';
import backLinkDoc from '../../docs/back-link.md?raw';
import backToTopDoc from '../../docs/back-to-top.md?raw';
import paginationDoc from '../../docs/pagination.md?raw';
import dataTableDoc from '../../docs/data-table.md?raw';
import dataTableFiltersDoc from '../../docs/data-table-filters.md?raw';
import emptyStateDoc from '../../docs/empty-state.md?raw';
import matchedFieldsTooltipDoc from '../../docs/matched-fields-tooltip.md?raw';
import toastProviderDoc from '../../docs/toast-provider.md?raw';

import { SearchInputPreview } from '../sections/SearchInputDemo';
import { IconInputPreview } from '../sections/IconInputDemo';
import { PasswordInputPreview } from '../sections/PasswordInputDemo';
import { SingleSelectPreview } from '../sections/SingleSelectDemo';
import { MultiSelectPreview } from '../sections/MultiSelectDemo';
import { DateTimeFieldPreview } from '../sections/DateTimeFieldDemo';
import { DateRangeFieldPreview } from '../sections/DateRangeFieldDemo';
import { BackLinkPreview } from '../sections/BackLinkDemo';
import { BackToTopPreview } from '../sections/BackToTopDemo';
import { PaginationPreview } from '../sections/PaginationDemo';
import { DataTablePreview } from '../sections/DataTableDemo';
import { EmptyStatePreview } from '../sections/EmptyStateDemo';
import { MatchedFieldsTooltipPreview } from '../sections/MatchedFieldsTooltipDemo';
import { ToastProviderPreview } from '../sections/ToastProviderDemo';

export type ComponentCategory = 'Input' | 'Select' | 'Date' | 'Navigation' | 'Table' | 'Display' | 'Feedback';

export interface ComponentEntry {
  slug: string;
  title: string;
  description: string;
  category: ComponentCategory;
  docs: string;
  Preview: ComponentType;
}

export const categories: ComponentCategory[] = ['Input', 'Select', 'Date', 'Navigation', 'Table', 'Display', 'Feedback'];

export const components: ComponentEntry[] = [
  {
    slug: 'search-input',
    title: 'SearchInput',
    description: 'Search input with a search icon, clear button, and loading state.',
    category: 'Input',
    docs: searchInputDoc,
    Preview: SearchInputPreview,
  },
  {
    slug: 'icon-input',
    title: 'IconInput',
    description: 'Input with icon addons, built with a relative wrapper and absolute-positioned icons.',
    category: 'Input',
    docs: iconInputDoc,
    Preview: IconInputPreview,
  },
  {
    slug: 'password-input',
    title: 'PasswordInput',
    description: 'Password input with a lock icon and eye toggle to show/hide the password.',
    category: 'Input',
    docs: passwordInputDoc,
    Preview: PasswordInputPreview,
  },
  {
    slug: 'single-select',
    title: 'SingleSelect',
    description: 'Single-select combobox with search. Supports both static and AJAX modes.',
    category: 'Select',
    docs: singleSelectDoc,
    Preview: SingleSelectPreview,
  },
  {
    slug: 'multi-select',
    title: 'MultiSelect',
    description: 'Multi-select combobox with badges and search. Supports both static and AJAX modes.',
    category: 'Select',
    docs: multiSelectDoc,
    Preview: MultiSelectPreview,
  },
  {
    slug: 'date-time-field',
    title: 'DateTimeField',
    description: 'Combined date picker and time selector field.',
    category: 'Date',
    docs: dateTimeFieldDoc,
    Preview: DateTimeFieldPreview,
  },
  {
    slug: 'date-range-field',
    title: 'DateRangeField',
    description: 'Date range picker with a calendar popover and preset buttons.',
    category: 'Date',
    docs: dateRangeFieldDoc,
    Preview: DateRangeFieldPreview,
  },
  {
    slug: 'back-link',
    title: 'BackLink',
    description: 'A back navigation link with an arrow icon.',
    category: 'Navigation',
    docs: backLinkDoc,
    Preview: BackLinkPreview,
  },
  {
    slug: 'back-to-top',
    title: 'BackToTop',
    description: 'A scroll-to-top button that appears when the user scrolls past a threshold.',
    category: 'Navigation',
    docs: backToTopDoc,
    Preview: BackToTopPreview,
  },
  {
    slug: 'pagination',
    title: 'Pagination',
    description: 'Pagination component with page numbers, navigation buttons, and result count summary.',
    category: 'Navigation',
    docs: paginationDoc,
    Preview: PaginationPreview,
  },
  {
    slug: 'data-table',
    title: 'DataTable',
    description: 'Server-side data table with sorting, pagination, loading skeletons, and empty/action states.',
    category: 'Table',
    docs: dataTableDoc,
    Preview: DataTablePreview,
  },
  {
    slug: 'data-table-filters',
    title: 'DataTableFilters',
    description: 'Filter panel with text, select, toggle group, and date range filter fields.',
    category: 'Table',
    docs: dataTableFiltersDoc,
    Preview: DataTablePreview,
  },
  {
    slug: 'empty-state',
    title: 'EmptyState',
    description: 'Empty state placeholder for when no data is available.',
    category: 'Display',
    docs: emptyStateDoc,
    Preview: EmptyStatePreview,
  },
  {
    slug: 'matched-fields-tooltip',
    title: 'MatchedFieldsTooltip',
    description: 'Badge indicating how many fields matched a search term, with tooltip on hover.',
    category: 'Display',
    docs: matchedFieldsTooltipDoc,
    Preview: MatchedFieldsTooltipPreview,
  },
  {
    slug: 'toast-provider',
    title: 'ToastProvider',
    description: 'Toast notification provider built on react-hot-toast with shadcn styling.',
    category: 'Feedback',
    docs: toastProviderDoc,
    Preview: ToastProviderPreview,
  },
];
