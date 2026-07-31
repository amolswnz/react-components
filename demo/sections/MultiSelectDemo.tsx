import { useState, useCallback } from 'react';
import { Check } from 'lucide-react';
import { MultiSelect } from '../../src/components/multi-select';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../src/components/ui/card';
import { highlightMatch } from '../../src/lib/highlight-match';

const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Date', value: 'date' },
  { label: 'Elderberry', value: 'elderberry' },
  { label: 'Fig', value: 'fig' },
  { label: 'Grape', value: 'grape' },
];

const AVATAR_COLORS = [
  'bg-red-100 text-red-700',
  'bg-blue-100 text-blue-700',
  'bg-green-100 text-green-700',
  'bg-amber-100 text-amber-700',
  'bg-purple-100 text-purple-700',
  'bg-pink-100 text-pink-700',
  'bg-indigo-100 text-indigo-700',
  'bg-teal-100 text-teal-700',
];

function getAvatarColor(value: string): string {
  return AVATAR_COLORS[Math.abs(value.charCodeAt(0) || 0) % AVATAR_COLORS.length];
}

function MultiSelectDemo() {
  const [multiValue, setMultiValue] = useState<string[]>([]);
  const [ajaxMultiValue, setAjaxMultiValue] = useState<string[]>([]);
  const [ajaxMultiOptions, setAjaxMultiOptions] = useState<{ label: string; value: string }[]>([]);
  const [ajaxMultiLoading, setAjaxMultiLoading] = useState(false);
  const [customMultiValue, setCustomMultiValue] = useState<string[]>([]);
  const [customMultiQuery, setCustomMultiQuery] = useState('');
  const [createMultiValue, setCreateMultiValue] = useState<string[]>([]);
  const [createMultiQuery, setCreateMultiQuery] = useState('');
  const [noEndMultiValue, setNoEndMultiValue] = useState<string[]>([]);

  const handleMultiSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setAjaxMultiOptions([]);
      return;
    }
    setAjaxMultiLoading(true);
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users?q=${encodeURIComponent(query)}`);
      const users = await res.json();
      setAjaxMultiOptions(users.map((u: { id: number; name: string }) => ({ label: u.name, value: String(u.id) })));
    } finally {
      setAjaxMultiLoading(false);
    }
  }, []);

  return (
    <Card className='mb-8'>
      <CardHeader>
        <CardTitle>MultiSelect</CardTitle>
        <CardDescription>Multi-select combobox with static and AJAX modes.</CardDescription>
      </CardHeader>
      <CardContent className='space-y-5'>
        <div className='my-4'>
          <label className='mb-1.5 block text-sm font-medium'>
            Choose fruits <span className='text-xs text-muted-foreground'>(static)</span>
          </label>
          <MultiSelect
            options={fruits}
            value={multiValue}
            onChange={setMultiValue}
            placeholder='Select fruits...'
            maxDisplayItems={3}
          />
          <p className='mt-1 text-xs text-muted-foreground'>
            Selected: {multiValue.length ? multiValue.join(', ') : '(none)'}
          </p>
        </div>
        <div className='my-4'>
          <label className='mb-1.5 block text-sm font-medium'>
            Search users <span className='text-xs text-muted-foreground'>(AJAX)</span>
          </label>
          <MultiSelect
            options={ajaxMultiOptions}
            value={ajaxMultiValue}
            onChange={setAjaxMultiValue}
            onSearch={handleMultiSearch}
            loading={ajaxMultiLoading}
            placeholder='Type to search users...'
            searchPlaceholder='Search users...'
            emptyMessage='No users found'
            maxDisplayItems={3}
          />
          <p className='mt-1 text-xs text-muted-foreground'>
            Selected: {ajaxMultiValue.length ? ajaxMultiValue.join(', ') : '(none)'}
          </p>
        </div>
        <div className='my-4'>
          <label className='mb-1.5 block text-sm font-medium'>
            Choose fruits — custom render <span className='text-xs text-muted-foreground'>(static)</span>
          </label>
          <MultiSelect
            options={fruits}
            value={customMultiValue}
            onChange={setCustomMultiValue}
            onSearch={setCustomMultiQuery}
            placeholder='Select fruits...'
            maxDisplayItems={3}
            renderOption={(option, isSelected) => (
              <div className='flex w-full items-center gap-2'>
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium ${getAvatarColor(option.value)}`}
                >
                  {option.label.charAt(0)}
                </div>
                <span className='flex-1'>{highlightMatch(option.label, customMultiQuery)}</span>
                {isSelected && <Check className='h-4 w-4 text-primary' />}
              </div>
            )}
          />
          <p className='mt-1 text-xs text-muted-foreground'>
            Selected: {customMultiValue.length ? customMultiValue.join(', ') : '(none)'}
          </p>
        </div>
        <div className='my-4'>
          <label className='mb-1.5 block text-sm font-medium'>Pre-selected values</label>
          <MultiSelect options={fruits} value={['apple', 'banana', 'cherry', 'date']} placeholder='Select...' />
        </div>
        <div className='my-4'>
          <label className='mb-1.5 block text-sm font-medium'>Disabled</label>
          <MultiSelect options={fruits} value={['fig']} disabled placeholder='Select...' />
        </div>
        <div className='my-4'>
          <label className='mb-1.5 block text-sm font-medium'>Loading</label>
          <MultiSelect options={[]} loading placeholder='Loading...' />
        </div>
        <div className='my-4'>
          <label className='mb-1.5 block text-sm font-medium'>
            Without end-of-list <span className='text-xs text-muted-foreground'>(showEndOfList=false)</span>
          </label>
          <MultiSelect
            options={fruits}
            value={noEndMultiValue}
            onChange={setNoEndMultiValue}
            placeholder='Select fruits...'
            showEndOfList={false}
          />
        </div>
        <div className='my-4'>
          <label className='mb-1.5 block text-sm font-medium'>
            With create new <span className='text-xs text-muted-foreground'>(type to see option)</span>
          </label>
          <MultiSelect
            options={fruits}
            value={createMultiValue}
            onChange={setCreateMultiValue}
            onSearch={setCreateMultiQuery}
            placeholder='Type to create or select...'
            createNew={{
              label: `Create "${createMultiQuery}"`,
              onClick: (query) => alert(`Create new: ${query}`),
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export { MultiSelectDemo };
