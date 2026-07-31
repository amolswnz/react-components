import { useState } from 'react';
import { Pagination } from '../../src/components/pagination';

function PaginationPreview() {
  const [page, setPage] = useState(1);
  const allItems = Array.from({ length: 86 }, (_, i) => `Item ${i + 1}`);
  const perPage = 10;
  const paginatedItems = allItems.slice((page - 1) * perPage, page * perPage);

  return (
    <div className='space-y-5'>
      <div className='mb-4 rounded-lg border p-4'>
        <p className='mb-2 text-sm font-medium'>Items</p>
        <ul className='space-y-1'>
          {paginatedItems.map((item) => (
            <li key={item} className='text-sm text-muted-foreground'>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <Pagination currentPage={page} totalItems={allItems.length} itemsPerPage={perPage} onPageChange={setPage} />
    </div>
  );
}

export { PaginationPreview };
