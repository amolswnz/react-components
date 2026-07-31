# highlightMatch

Utility for highlighting substring matches in text with **bold** and <ins>underline</ins>.

## Import

```tsx
import { highlightMatch } from '@/lib/amolsw';
```

## Usage

```tsx
highlightMatch(text, query);
```

Returns a React node with matching portions wrapped in `<strong className="underline">`.

| Param   | Type     | Description                    |
| ------- | -------- | ------------------------------ |
| `text`  | `string` | The text to search within      |
| `query` | `string` | The search string to highlight |

If `query` is empty or no match is found, the original `text` is returned unchanged.

## Examples

```tsx
highlightMatch('Apple', 'ap');
// → <><strong class="underline">Ap</strong>ple</>

highlightMatch('Banana', 'na');
// → <><strong class="underline">na</strong></>

highlightMatch('Cherry', 'xyz');
// → "Cherry"

highlightMatch('Grape', '');
// → "Grape"
```
