// demo/sections/PasswordInputDemo.tsx
import { useState } from 'react';
import { PasswordInput } from '../../src/components/password-input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../src/components/ui/card';

function PasswordInputDemo() {
  const [value, setValue] = useState('');

  return (
    <Card className='mb-8'>
      <CardHeader>
        <CardTitle>PasswordInput</CardTitle>
        <CardDescription>Password input with lock icon and show/hide toggle.</CardDescription>
      </CardHeader>
      <CardContent className='space-y-5'>
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
      </CardContent>
    </Card>
  );
}

export { PasswordInputDemo };
