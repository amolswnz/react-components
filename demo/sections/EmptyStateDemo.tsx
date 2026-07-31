import { Search, Users, Inbox, Plug } from 'lucide-react';
import { EmptyState } from '../../src/components/empty-state';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../src/components/ui/card';

function EmptyStateDemo() {
  return (
    <Card className='mb-8'>
      <CardHeader>
        <CardTitle>EmptyState</CardTitle>
        <CardDescription>Empty state with icon, suggestions, and action button.</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='grid gap-4 md:grid-cols-3'>
          <div className='rounded-lg border p-4'>
            <h4 className='mb-2 text-sm font-medium text-muted-foreground'>With suggestions</h4>
            <EmptyState
              icon={Search}
              title='No results found'
              description='Try adjusting your search or filters.'
              suggestions={['Check your spelling', 'Try a different search term', 'Browse categories']}
            />
          </div>
          <div className='rounded-lg border p-4'>
            <h4 className='mb-2 text-sm font-medium text-muted-foreground'>With action</h4>
            <EmptyState
              icon={Users}
              title='No team members'
              description='Get started by adding your first team member.'
              action={{
                label: 'Add member',
                icon: Plug,
                variant: 'default',
                onClick: () => alert('Add member clicked'),
              }}
            />
          </div>
          <div className='rounded-lg border p-4'>
            <h4 className='mb-2 text-sm font-medium text-muted-foreground'>Minimal</h4>
            <EmptyState
              icon={Inbox}
              title='Nothing here yet'
              description='This section is empty. Content will appear once available.'
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { EmptyStateDemo };
