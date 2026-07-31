import { BackLink } from '../../src/components/back-link';

function BackLinkPreview() {
  return (
    <div className='space-y-4'>
      <BackLink href='/' label='Back to home' />
      <div className='mt-2'>
        <BackLink
          onClick={(e) => {
            e.preventDefault();
            alert('Navigate back');
          }}
          label='Go back (with onClick)'
        />
      </div>
    </div>
  );
}

export { BackLinkPreview };
