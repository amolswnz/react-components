# MatchedFieldsTooltip

Displays a small badge indicating how many specified fields matched a search term. Hovering the badge reveals the field names and values in a tooltip.

## Props

| Prop        | Type                      | Default | Description                            |
| ----------- | ------------------------- | ------- | -------------------------------------- |
| `data`      | `Record<string, unknown>` | —       | Data object to search through          |
| `search`    | `string`                  | —       | Current search term (case-insensitive) |
| `matchKeys` | `string[]`                | —       | Keys to check for search matches       |

## Usage

```tsx
import { MatchedFieldsTooltip } from '@/components/amolsw/matched-fields-tooltip';
import { TooltipProvider } from '@/components/ui';

// Wrap app with TooltipProvider
<TooltipProvider>
  <span>
    Search results
    <MatchedFieldsTooltip data={row} search='jane' matchKeys={['assignee', 'notes', 'department']} />
  </span>
</TooltipProvider>;
```

## Notes

- Returns `null` when `search` is empty or no `matchKeys` contain the search term
- Search is case-insensitive
- Handles `null` and `undefined` field values gracefully
- Requires a `TooltipProvider` ancestor in the component tree
- Ideal for table rows where some searched fields are hidden from view — pass only the hidden column keys to `matchKeys`
