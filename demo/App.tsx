import { useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { ComponentPage } from './components/ComponentPage';
import { components } from './data/components';
import { useHashRoute } from './lib/useHashRoute';

function App() {
  const { slug, navigate } = useHashRoute(components[0]?.slug ?? 'search-input');

  const entry = useMemo(() => components.find((c) => c.slug === slug), [slug]);

  return (
    <div className='flex h-screen flex-col overflow-hidden bg-background text-foreground'>
      <div className='flex min-h-0 flex-1'>
        <Sidebar currentSlug={slug} onNavigate={navigate} />
        <main className='flex-1 overflow-y-auto'>
          {entry ? (
            <ComponentPage entry={entry} />
          ) : (
            <div className='flex items-center justify-center p-12 text-muted-foreground'>Component not found</div>
          )}
        </main>
      </div>
      <Footer copyright={`React component library © ${new Date().getFullYear()} Amol Wankhede`} />
    </div>
  );
}

export default App;
