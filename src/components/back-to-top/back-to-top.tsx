import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/amolsw/utils';
import { Button } from '@/components/ui/button';

export interface BackToTopProps {
  threshold?: number;
  className?: string;
  'aria-label'?: string;
}

const BackToTop = ({ threshold = 300, className, 'aria-label': ariaLabel = 'Back to top' }: BackToTopProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > threshold);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <Button
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-5 end-5 z-10 size-9 cursor-pointer rounded-full shadow-md hover:shadow-lg',
        className
      )}
      aria-label={ariaLabel}
      size='icon'
    >
      <ArrowUp />
    </Button>
  );
};

BackToTop.displayName = 'BackToTop';

export { BackToTop };
