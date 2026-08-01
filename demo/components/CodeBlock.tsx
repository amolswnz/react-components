import { Fragment, useState, useEffect, useCallback, type JSX } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
import { codeToHast, type BundledLanguage } from 'shiki';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { Check, Copy } from 'lucide-react';

function CodeBlock({ code, lang = 'tsx' }: { code: string; lang?: BundledLanguage }) {
  const [highlighted, setHighlighted] = useState<JSX.Element | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    codeToHast(code, {
      lang,
      theme: 'github-dark',
    }).then((hast) => {
      if (!cancelled) {
        const element = toJsxRuntime(hast, {
          Fragment,
          jsx,
          jsxs,
          components: {
            pre: ({ children, style: _s, className: _c, ...props }) => (
              <pre
                className='overflow-x-auto whitespace-pre-wrap break-words rounded-lg border border-border bg-[#0d1117] p-2 text-xs leading-relaxed'
                {...props}
              >
                {children}
              </pre>
            ),
            code: ({ style: _style, className: _className, ...props }) => <code className='text-xs' {...props} />,
          },
        }) as JSX.Element;
        setHighlighted(element);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [code, lang]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  return (
    <div className='relative'>
      <button
        onClick={handleCopy}
        className='absolute right-2 top-2 z-10 flex items-center gap-1.5 rounded-md border bg-background/80 px-2 py-1 text-xs text-muted-foreground backdrop-blur transition-colors hover:bg-accent hover:text-foreground'
      >
        {copied ? (
          <>
            <Check className='h-3 w-3' />
            Copied
          </>
        ) : (
          <>
            <Copy className='h-3 w-3' />
            Copy
          </>
        )}
      </button>
      {highlighted ?? <div className='h-48 animate-pulse rounded-lg border bg-muted/50' />}
    </div>
  );
}

CodeBlock.displayName = 'CodeBlock';

export { CodeBlock };
