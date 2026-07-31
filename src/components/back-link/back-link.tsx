import type { ReactNode, MouseEvent } from 'react';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/amolsw/utils';

export interface BackLinkProps {
  href?: string;
  label?: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

const BackLink = ({ href, label, className, onClick }: BackLinkProps) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        'mb-6 inline-flex cursor-pointer items-center text-muted-foreground transition-colors duration-150 hover:text-foreground',
        className
      )}
    >
      <ArrowLeft className='mr-1 h-4 w-4' />
      {label ?? 'Go back'}
    </a>
  );
};

BackLink.displayName = 'BackLink';

export { BackLink };
