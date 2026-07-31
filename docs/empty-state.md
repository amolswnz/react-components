# EmptyState

Empty state placeholder for when no data is available. Displays a title, optional description, suggestions, and action button.

## Props

| Prop          | Type                                  | Default | Description                          |
| ------------- | ------------------------------------- | ------- | ------------------------------------ |
| `icon`        | `LucideIcon`                          | —       | Icon component displayed in a circle |
| `title`       | `string`                              | —       | Main heading text (required)         |
| `description` | `string`                              | —       | Supporting text below title          |
| `action`      | `{ label, onClick, variant?, icon? }` | —       | Optional action button config        |
| `suggestions` | `string[]`                            | —       | Bulleted list of suggestions         |
| `className`   | `string`                              | —       | Additional CSS classes               |

## Examples

```tsx
// Minimal
<EmptyState title='No results found' />

// With icon and description
<EmptyState
  icon={SearchX}
  title='No matching results'
  description='Try adjusting your search or filters to find what you are looking for.'
/>

// With action button and suggestions
<EmptyState
  icon={Package}
  title='No packages yet'
  description='Get started by creating your first package.'
  suggestions={['Create a package from the dashboard', 'Import an existing package']}
  action={{
    label: 'Create Package',
    onClick: () => router.push('/packages/new'),
    variant: 'default',
    icon: Plus,
  }}
/>
```
