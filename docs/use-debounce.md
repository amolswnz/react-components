# useDebounce

A React hook that debounces a rapidly changing value, returning the stable value only after the specified delay has elapsed since the last change.

## Usage

```tsx
import { useDebounce } from '@/hooks/amolsw';

function SearchResults({ query }: { query: string }) {
  const debouncedQuery = useDebounce(query, 300);

  // Fetch only when debouncedQuery stabilizes
  useEffect(() => {
    fetch(`/api/search?q=${debouncedQuery}`).then(/* … */);
  }, [debouncedQuery]);

  return <div>Searching for "{debouncedQuery}"…</div>;
}
```

## Signature

```ts
function useDebounce<T>(value: T, delayMs: number): T;
```

## Parameters

| Param     | Type     | Description           |
| --------- | -------- | --------------------- |
| `value`   | `T`      | The value to debounce |
| `delayMs` | `number` | Delay in milliseconds |

## Returns

The debounced value of type `T`. Updates only after `delayMs` of inactivity.
