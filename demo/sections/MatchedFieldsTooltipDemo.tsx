import { MatchedFieldsTooltip } from '../../src/components/matched-fields-tooltip';
import { TooltipProvider } from '../../src/components/ui/tooltip';

const sampleData = {
  title: 'Project Alpha',
  assignee: 'Jane Smith',
  status: 'In Progress',
  priority: 'High',
  notes: 'Sprint review completed',
};

function MatchedFieldsTooltipPreview() {
  return (
    <div className='grid gap-4 md:grid-cols-3'>
      <div className='rounded-lg border p-4'>
        <h4 className='mb-2 text-sm font-medium text-muted-foreground'>Single match</h4>
        <TooltipProvider>
          <p className='text-sm'>
            Search: &quot;jane&quot; · Checking hidden fields: Assignee, Notes
            <MatchedFieldsTooltip data={sampleData} search='jane' matchKeys={['assignee', 'notes']} />
          </p>
        </TooltipProvider>
      </div>
      <div className='rounded-lg border p-4'>
        <h4 className='mb-2 text-sm font-medium text-muted-foreground'>Multiple matches</h4>
        <TooltipProvider>
          <p className='text-sm'>
            Search: &quot;pro&quot; · Checking hidden fields: Title, Notes
            <MatchedFieldsTooltip data={sampleData} search='pro' matchKeys={['title', 'notes']} />
          </p>
        </TooltipProvider>
      </div>
      <div className='rounded-lg border p-4'>
        <h4 className='mb-2 text-sm font-medium text-muted-foreground'>No hidden matches</h4>
        <TooltipProvider>
          <p className='text-sm'>
            Search: &quot;jane&quot; · All matching fields visible
            <MatchedFieldsTooltip data={sampleData} search='jane' matchKeys={['title', 'status']} />
          </p>
        </TooltipProvider>
      </div>
    </div>
  );
}

export { MatchedFieldsTooltipPreview };
