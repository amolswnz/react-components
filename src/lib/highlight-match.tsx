import * as React from 'react';

export function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query) return text;

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);

  if (parts.length === 1) return text;

  return (
    <span>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className='underline'>
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </span>
  );
}
