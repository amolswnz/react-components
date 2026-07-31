import { useState } from 'react';
import { SearchInput } from '../../src/components/search-input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../src/components/ui/card';

function SearchInputDemo() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <Card className='mb-8'>
      <CardHeader>
        <CardTitle>SearchInput</CardTitle>
        <CardDescription>Text input with search icon, clear button, and loading state.</CardDescription>
      </CardHeader>
      <CardContent className='space-y-5'>
        <div className='my-4'>
          <label className='mb-1.5 block text-sm font-medium'>Default</label>
          <SearchInput value={searchValue} onChange={setSearchValue} placeholder='Search anything...' />
          <p className='mt-1 text-xs text-muted-foreground'>Value: {searchValue || '(empty)'}</p>
        </div>
        <div className='my-4'>
          <label className='mb-1.5 block text-sm font-medium'>Loading state</label>
          <SearchInput defaultValue='Loading example' loading placeholder='Search...' />
        </div>
        <div className='my-4'>
          <label className='mb-1.5 block text-sm font-medium'>Disabled</label>
          <SearchInput value="Can't touch this" disabled placeholder='Search...' />
        </div>
      </CardContent>
    </Card>
  );
}

export { SearchInputDemo };
