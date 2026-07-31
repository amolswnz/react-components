import { useState, useCallback } from 'react';
import { Check } from 'lucide-react';
import { SingleSelect } from '../../src/components/single-select';
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

function SingleSelectDemo() {
  const [singleValue, setSingleValue] = useState('');
  const [ajaxSingleValue, setAjaxSingleValue] = useState('');
  const [ajaxSingleOptions, setAjaxSingleOptions] = useState<{ label: string; value: string }[]>([]);
  const [ajaxSingleLoading, setAjaxSingleLoading] = useState(false);
  const [customSingleValue, setCustomSingleValue] = useState('');
  const [customSingleQuery, setCustomSingleQuery] = useState('');
  const [createSingleValue, setCreateSingleValue] = useState('');
  const [createSingleQuery, setCreateSingleQuery] = useState('');
  const [noEndSingleValue, setNoEndSingleValue] = useState('');

  const handleSingleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setAjaxSingleOptions([]);
      return;
    }
    setAjaxSingleLoading(true);
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users?q=${encodeURIComponent(query)}`);
      const users = await res.json();
      setAjaxSingleOptions(users.map((u: { id: number; name: string }) => ({ label: u.name, value: String(u.id) })));
    } finally {
      setAjaxSingleLoading(false);
    }
  }, []);

  return (
    <Card className='mb-8'>
      <CardHeader>
        <CardTitle>SingleSelect</CardTitle>
        <CardDescription>Single-select combobox with static and AJAX modes.</CardDescription>
      </CardHeader>
      <CardContent className='space-y-5'>
        <div className='my-4'>
          <label className='mb-1.5 block text-sm font-medium'>
            Pick a fruit <span className='text-xs text-muted-foreground'>(static)</span>
          </label>
          <SingleSelect
            options={fruits}
            value={singleValue}
            onChange={setSingleValue}
            placeholder='Select a fruit...'
          />
          <p className='mt-1 text-xs text-muted-foreground'>Selected: {singleValue || '(none)'}</p>
        </div>
        <div className='my-4'>
          <label className='mb-1.5 block text-sm font-medium'>
            Search users <span className='text-xs text-muted-foreground'>(AJAX)</span>
          </label>
          <SingleSelect
            options={ajaxSingleOptions}
            value={ajaxSingleValue}
            onChange={setAjaxSingleValue}
            onSearch={handleSingleSearch}
            loading={ajaxSingleLoading}
            placeholder='Type to search users...'
            searchPlaceholder='Search users...'
            emptyMessage='No users found'
          />
          <p className='mt-1 text-xs text-muted-foreground'>Selected: {ajaxSingleValue || '(none)'}</p>
          <p className='mt-1 text-xs text-muted-foreground'>
            Uses "https://jsonplaceholder.typicode.com/users?q={'searchQuery'}", which search through whole user data
            fields
          </p>
        </div>
        <div className='my-4'>
          <label className='mb-1.5 block text-sm font-medium'>
            Pick a fruit — custom render <span className='text-xs text-muted-foreground'>(static)</span>
          </label>
          <SingleSelect
            options={fruits}
            value={customSingleValue}
            onChange={setCustomSingleValue}
            onSearch={setCustomSingleQuery}
            placeholder='Select a fruit...'
            renderOption={(option, isSelected) => (
              <div className='flex w-full items-center gap-2'>
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium ${getAvatarColor(option.value)}`}
                >
                  {option.label.charAt(0)}
                </div>
                <span className='flex-1'>{highlightMatch(option.label, customSingleQuery)}</span>
                {isSelected && <Check className='h-4 w-4 text-primary' />}
              </div>
            )}
          />
          <p className='mt-1 text-xs text-muted-foreground'>Selected: {customSingleValue || '(none)'}</p>
        </div>
        <div className='my-4'>
          <label className='mb-1.5 block text-sm font-medium'>Disabled</label>
          <SingleSelect options={fruits} value='cherry' disabled placeholder='Select...' />
        </div>
        <div className='my-4'>
          <label className='mb-1.5 block text-sm font-medium'>Loading</label>
          <SingleSelect options={[]} loading placeholder='Loading options...' />
        </div>
        <div className='my-4'>
          <label className='mb-1.5 block text-sm font-medium'>
            Without end-of-list <span className='text-xs text-muted-foreground'>(showEndOfList=false)</span>
          </label>
          <SingleSelect
            options={fruits}
            value={noEndSingleValue}
            onChange={setNoEndSingleValue}
            placeholder='Select a fruit...'
            showEndOfList={false}
          />
        </div>
        <div className='my-4'>
          <label className='mb-1.5 block text-sm font-medium'>
            With create new <span className='text-xs text-muted-foreground'>(type to see option)</span>
          </label>
          <SingleSelect
            options={fruits}
            value={createSingleValue}
            onChange={setCreateSingleValue}
            onSearch={setCreateSingleQuery}
            placeholder='Type to create or select...'
            createNew={{
              label: `Create new`,
              onClick: (query) => alert(`Create new: ${query}`),
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export { SingleSelectDemo };
