// demo/sections/BackToTopDemo.tsx
import { BackToTop } from '../../src/components/back-to-top';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../src/components/ui/card';

function BackToTopDemo() {
  return (
    <Card className='mb-8'>
      <CardHeader>
        <CardTitle>Back to top</CardTitle>
        <CardDescription>Scroll-to-top button that appears after scrolling down.</CardDescription>
      </CardHeader>
      <CardContent className='space-y-5'>
        <p className='text-sm text-muted-foreground'>
          Scroll down on this page to see the floating button appear in the bottom-right corner.
        </p>
        <pre className='rounded-lg border bg-muted p-4'>{'<BackToTop />'}</pre>
        <BackToTop />
      </CardContent>
    </Card>
  );
}

export { BackToTopDemo };
