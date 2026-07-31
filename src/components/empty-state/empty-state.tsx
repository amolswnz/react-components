// src/components/empty-state/empty-state.tsx
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/amolsw/utils';
import { Button } from '@/components/ui/button';

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'default' | 'outline' | 'ghost' | 'secondary' | 'link' | 'destructive';
    icon?: LucideIcon;
  };
  suggestions?: string[];
  className?: string;
}

const EmptyState = ({ icon: Icon, title, description, action, suggestions, className }: EmptyStateProps) => {
  return (
    <div className={cn('py-16', className)}>
      <div className='bg-muted/30 mx-auto max-w-xl rounded-2xl border p-8'>
        <div className='flex flex-col items-start gap-5 sm:flex-row'>
          {Icon && (
            <div className='bg-muted flex size-12 shrink-0 items-center justify-center rounded-full'>
              <Icon className='text-muted-foreground h-6 w-6' />
            </div>
          )}
          <div className='flex-1'>
            <h3 className='text-foreground text-xl font-semibold'>{title}</h3>
            {description && <p className='text-muted-foreground mt-1 text-sm leading-relaxed'>{description}</p>}
            {suggestions && suggestions.length > 0 && (
              <div className='text-muted-foreground bg-background/50 mt-4 rounded-lg p-4 text-sm'>
                <p className='text-foreground font-medium'>Suggestions:</p>
                <ul className='mt-2 space-y-1'>
                  {suggestions.map((suggestion, index) => (
                    <li key={index}>• {suggestion}</li>
                  ))}
                </ul>
              </div>
            )}
            {action && (
              <div className='mt-6'>
                <Button variant={action.variant || 'outline'} onClick={action.onClick} className='cursor-pointer gap-2'>
                  {action.icon && <action.icon className='h-4 w-4' />}
                  {action.label}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

EmptyState.displayName = 'EmptyState';

export { EmptyState };
