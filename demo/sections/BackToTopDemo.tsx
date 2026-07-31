import { BackToTop } from '../../src/components/back-to-top';

function BackToTopPreview() {
  return (
    <div className='space-y-5'>
      <p className='text-sm text-muted-foreground'>
        Scroll down on this page to see the floating button appear in the bottom-right corner.
      </p>
      <pre className='rounded-lg border bg-muted p-4'>{'<BackToTop />'}</pre>
      <BackToTop />
    </div>
  );
}

export { BackToTopPreview };
