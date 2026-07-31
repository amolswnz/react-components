import { BackLink } from '../../src/components/back-link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../src/components/ui/card';

function BackLinkDemo() {
  return (
    <Card className='mb-8'>
      <CardHeader>
        <CardTitle>BackLink</CardTitle>
        <CardDescription>Back navigation link with arrow icon.</CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}

export { BackLinkDemo };
