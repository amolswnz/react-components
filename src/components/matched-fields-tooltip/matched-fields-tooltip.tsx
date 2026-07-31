// src/components/matched-fields-tooltip/matched-fields-tooltip.tsx
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export interface MatchedFieldsTooltipProps {
  data: Record<string, unknown>;
  search: string;
  /** Keys to check for search matches */
  matchKeys: string[];
}

const MatchedFieldsTooltip = ({ data, search, matchKeys }: MatchedFieldsTooltipProps) => {
  if (!search) return null;

  const searchLower = search.toLowerCase();

  const matchedFields = matchKeys.filter((key) => {
    const value = data[key];
    return value != null && String(value).toLowerCase().includes(searchLower);
  });

  if (matchedFields.length === 0) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className='ml-1.5 inline-flex cursor-help items-center rounded-sm bg-yellow-100 px-1 text-[10px] font-medium text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'>
          <Info className='mr-0.5 h-3 w-3' />
          {matchedFields.length}
        </span>
      </TooltipTrigger>
      <TooltipContent side='top' className='max-w-64 text-xs'>
        <p className='mb-1 font-medium'>Matched by:</p>
        <ul className='space-y-0.5'>
          {matchedFields.map((field) => {
            const label = field.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
            const value = data[field];
            return (
              <li key={field}>
                <span className='text-muted-foreground'>{label}: </span>
                <span className='font-medium'>{String(value)}</span>
              </li>
            );
          })}
        </ul>
      </TooltipContent>
    </Tooltip>
  );
};

MatchedFieldsTooltip.displayName = 'MatchedFieldsTooltip';

export { MatchedFieldsTooltip };
