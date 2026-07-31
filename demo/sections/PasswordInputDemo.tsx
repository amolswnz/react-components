import { useState } from 'react';
import { PasswordInput } from '../../src/components/password-input';

function PasswordInputPreview() {
  const [value, setValue] = useState('');

  return (
    <div className='space-y-5'>
      <div>
        <label className='mb-1.5 block text-sm font-medium'>Empty</label>
        <PasswordInput />
      </div>
      <div>
        <label className='mb-1.5 block text-sm font-medium'>With value</label>
        <PasswordInput defaultValue='mysecretpassword' />
      </div>
      <div>
        <label className='mb-1.5 block text-sm font-medium'>Controlled</label>
        <PasswordInput value={value} onChange={setValue} placeholder='Type something...' />
        <p className='mt-1 text-xs text-muted-foreground'>Value: {value || '(empty)'}</p>
      </div>
      <div>
        <label className='mb-1.5 block text-sm font-medium'>Disabled</label>
        <PasswordInput defaultValue='canttouchthis' disabled />
      </div>
    </div>
  );
}

export { PasswordInputPreview };
