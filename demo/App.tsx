// demo/App.tsx
import { BackLinkDemo } from './sections/BackLinkDemo';
import { BackToTopDemo } from './sections/BackToTopDemo';
import { DataTableDemo } from './sections/DataTableDemo';
import { DateRangeFieldDemo } from './sections/DateRangeFieldDemo';
import { DateTimeFieldDemo } from './sections/DateTimeFieldDemo';
import { EmptyStateDemo } from './sections/EmptyStateDemo';
import { IconInputDemo } from './sections/IconInputDemo';
import { MatchedFieldsTooltipDemo } from './sections/MatchedFieldsTooltipDemo';
import { MultiSelectDemo } from './sections/MultiSelectDemo';
import { PaginationDemo } from './sections/PaginationDemo';
import { PasswordInputDemo } from './sections/PasswordInputDemo';
import { SearchInputDemo } from './sections/SearchInputDemo';
import { SingleSelectDemo } from './sections/SingleSelectDemo';
import { ToastProviderDemo } from './sections/ToastProviderDemo';

function App() {
  return (
    <div className='min-h-screen bg-muted/30 text-foreground'>
      <div className='mx-auto px-4 py-12'>
        <div className='mb-10'>
          <h1 className='mb-2 text-3xl font-bold tracking-tight'>ngaw-components</h1>
          <p className='text-muted-foreground'>React component library built with shadcn/ui + Tailwind CSS</p>
        </div>

        <div className='mt-8 grid gap-4 md:grid-cols-3'>
          <SearchInputDemo />
          <IconInputDemo />
          <PasswordInputDemo />
          <SingleSelectDemo />
          <MultiSelectDemo />
        </div>

        <div className='grid gap-4 md:grid-cols-3'>
          <BackLinkDemo />
          <DateTimeFieldDemo />
          <BackToTopDemo />
        </div>

        <DateRangeFieldDemo />

        <EmptyStateDemo />
        <MatchedFieldsTooltipDemo />
        <DataTableDemo />
        <PaginationDemo />
        <ToastProviderDemo />
      </div>
    </div>
  );
}

export default App;
