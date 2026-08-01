import { cn } from '../../src/lib/amolsw/utils';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterProps {
  links?: FooterLink[];
  copyright?: string;
  className?: string;
}

const defaultLinks: FooterLink[] = [
  { label: 'React component library', href: '#' },
  { label: 'GitHub', href: 'https://github.com/amolswnz/react-components' },
  { label: 'npm', href: 'https://www.npmjs.com/package/amolsw-components' },
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
              className='text-sm text-muted-foreground transition-colors hover:text-foreground'
            >
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
