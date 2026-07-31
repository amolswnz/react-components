import { useState } from 'react';
import { SearchInput } from '../../src/components/search-input';

function SearchInputPreview() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className='space-y-5'>
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
    </div>
  );
}

export { SearchInputPreview };
