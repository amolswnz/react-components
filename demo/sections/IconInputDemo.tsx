import { CreditCardIcon, LockIcon, HelpCircleIcon, MailIcon, KeyIcon } from 'lucide-react';
import { IconInput } from '../../src/components/icon-input';

function IconInputPreview() {
  return (
    <div className='space-y-5'>
      <div>
        <label className='mb-1.5 block text-sm font-medium'>Single icon</label>
        <IconInput icon={<MailIcon />} placeholder='Email' />
      </div>
      <div>
        <label className='mb-1.5 block text-sm font-medium'>Dual icons</label>
        <IconInput icon={<CreditCardIcon />} endIcon={<LockIcon />} placeholder='Card number' />
      </div>
      <div>
        <label className='mb-1.5 block text-sm font-medium'>Password</label>
        <IconInput icon={<KeyIcon />} endIcon={<HelpCircleIcon />} type='password' placeholder='Password' />
      </div>
      <div>
        <label className='mb-1.5 block text-sm font-medium'>Disabled</label>
        <IconInput icon={<MailIcon />} value="Can't touch this" disabled />
      </div>
    </div>
  );
}

export { IconInputPreview };
