import { useState, useCallback } from 'react';
import { Check, Copy } from 'lucide-react';

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

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
        className='absolute right-2 top-2 flex items-center gap-1.5 rounded-md border bg-background px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground'
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
      <pre className='overflow-x-auto rounded-lg border bg-muted/50 p-4 text-sm leading-relaxed'>
        <code>{code}</code>
      </pre>
    </div>
  );
}

CodeBlock.displayName = 'CodeBlock';

export { CodeBlock };
