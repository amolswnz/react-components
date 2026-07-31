import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { codeToHtml, type BundledLanguage } from 'shiki';

function ShikiCodeBlock({ code, lang }: { code: string; lang: string }) {
  const [html, setHtml] = useState('');

  useEffect(() => {
    let cancelled = false;
    const resolvedLang = (['tsx', 'ts', 'jsx', 'javascript', 'typescript'].includes(lang) ? 'tsx' : lang) as BundledLanguage;
    codeToHtml(code, {
      lang: resolvedLang,
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      defaultColor: 'light',
    }).then((result) => {
      if (!cancelled) setHtml(result);
    });
    return () => {
      cancelled = true;
    };
  }, [code, lang]);

  if (!html) {
    return <div className='my-4 h-32 animate-pulse rounded-lg border bg-muted/50' />;
  }

  return <div className='my-4 overflow-x-auto rounded-lg border' dangerouslySetInnerHTML={{ __html: html }} />;
}

function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className='markdown-content'>
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          table: ({ children }) => (
            <div className='my-4 overflow-x-auto rounded-lg border'>
              <table className='w-full text-sm'>{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className='border-b bg-muted/50'>{children}</thead>,
          th: ({ children }) => (
            <th className='px-4 py-2 text-left font-medium text-muted-foreground' style={{ minWidth: '8rem' }}>
              {children}
            </th>
          ),
          td: ({ children }) => <td className='border-t px-4 py-2'>{children}</td>,
          code: ({ children, className }) => {
            const isBlock = typeof children === 'string' && children.includes('\n');
            if (isBlock) {
              const langClass = className?.replace('language-', '') || '';
              const codeStr = typeof children === 'string' ? children : String(children);
              return <ShikiCodeBlock code={codeStr} lang={langClass} />;
            }
            return (
              <code className='rounded bg-muted px-1.5 py-0.5 text-sm font-mono'>{children}</code>
            );
          },
          h1: ({ children }) => <h1 className='mb-4 text-2xl font-bold tracking-tight'>{children}</h1>,
          h2: ({ children }) => <h2 className='mb-3 mt-8 text-xl font-semibold tracking-tight'>{children}</h2>,
          h3: ({ children }) => <h3 className='mb-2 mt-6 text-lg font-semibold'>{children}</h3>,
          p: ({ children }) => <p className='mb-4 leading-relaxed text-muted-foreground'>{children}</p>,
          ul: ({ children }) => <ul className='mb-4 ml-6 list-disc space-y-1'>{children}</ul>,
          ol: ({ children }) => <ol className='mb-4 ml-6 list-decimal space-y-1'>{children}</ol>,
          li: ({ children }) => <li className='leading-relaxed text-muted-foreground'>{children}</li>,
          a: ({ href, children }) => (
            <a href={href} className='text-primary underline underline-offset-4 hover:text-primary/80'>
              {children}
            </a>
          ),
          strong: ({ children }) => <strong className='font-semibold text-foreground'>{children}</strong>,
          hr: () => <hr className='my-6 border-border' />,
          blockquote: ({ children }) => (
            <blockquote className='my-4 border-l-2 border-primary/20 pl-4 italic text-muted-foreground'>
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}

MarkdownRenderer.displayName = 'MarkdownRenderer';

export { MarkdownRenderer };
