import { useState, useCallback, useEffect } from 'react';

export function useHashRoute(defaultSlug: string) {
  const [slug, setSlug] = useState(() => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    return hash || defaultSlug;
  });

  const navigate = useCallback((newSlug: string) => {
    window.location.hash = `#/${newSlug}`;
    setSlug(newSlug);
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      setSlug(hash || defaultSlug);
      document.querySelector('main')?.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [defaultSlug]);

  return { slug, navigate } as const;
}
