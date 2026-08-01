import type { ReactNode } from 'react';
import { Github, Linkedin, Heart, Globe, Package } from 'lucide-react';
import { cn } from '../../src/lib/amolsw/utils';

export interface FooterLink {
  label: string;
  href: string;
  icon?: ReactNode;
}

export interface FooterProps {
  links?: FooterLink[];
  copyright?: string;
  className?: string;
}

const defaultLinks: FooterLink[] = [
  { label: 'Amol', href: 'https://www.amol.co.nz', icon: <Globe className='h-4 w-4' /> },
  { label: 'GitHub', href: 'https://github.com/amolswnz/react-components', icon: <Github className='h-4 w-4' /> },
  { label: 'npm', href: 'https://www.npmjs.com/package/amolsw-components', icon: <Package className='h-4 w-4' /> },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/amolsw', icon: <Linkedin className='h-4 w-4' /> },
  { label: 'Buy me a coffee', href: 'https://buymeacoffee.com/amolw', icon: <Heart className='h-4 w-4' /> },
];

function Footer({ links = defaultLinks, copyright, className }: FooterProps) {
  return (
    <footer className={cn('border-t bg-background px-6 py-6', className)}>
      <div className='flex flex-col items-center gap-4 sm:flex-row sm:justify-between'>
        <nav className='flex flex-wrap items-center gap-4'>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground'
            >
              {link.icon}
              {link.label}
            </a>
          ))}
        </nav>
        {copyright && <p className='text-xs text-muted-foreground'>{copyright}</p>}
      </div>
    </footer>
  );
}

Footer.displayName = 'Footer';

export { Footer };
