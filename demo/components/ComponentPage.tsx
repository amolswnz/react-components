import type { ComponentEntry } from '../data/components';
import { MarkdownRenderer } from './MarkdownRenderer';

function ComponentPage({ entry }: { entry: ComponentEntry }) {
  return (
    <div className='mx-auto max-w-4xl space-y-8 px-6 py-8'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>{entry.title}</h1>
        <p className='mt-2 text-lg text-muted-foreground'>{entry.description}</p>
      </div>

      <div className='rounded-lg border p-6'>
        <entry.Preview />
      </div>

      <div>
        <h2 className='mb-4 text-xl font-semibold tracking-tight'>API Reference</h2>
        <MarkdownRenderer content={entry.docs} />
      </div>
    </div>
  );
}

ComponentPage.displayName = 'ComponentPage';

export { ComponentPage };
