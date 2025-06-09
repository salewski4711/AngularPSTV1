# Tag Component

A versatile tag/chip component for labeling, categorization, and filtering. Tags can be removable, have icons, and come in multiple styles and sizes.

## Usage

```typescript
import { TagComponent } from '@app/shared/components/tag';

@Component({
  selector: 'pst-example',
  standalone: true,
  imports: [TagComponent],
  template: `
    <pst-tag color="primary">Primary Tag</pst-tag>
    <pst-tag 
      variant="outline" 
      [removable]="true"
      (remove)="handleRemove()"
    >
      Removable Tag
    </pst-tag>
  `
})
export class ExampleComponent {
  handleRemove() {
    console.log('Tag removed');
  }
}
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'filled' \| 'outline' \| 'subtle'` | `'filled'` | The visual style variant of the tag |
| `color` | `'gray' \| 'primary' \| 'success' \| 'error' \| 'warning' \| 'info'` | `'gray'` | The color theme of the tag |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'sm'` | The size of the tag |
| `shape` | `'rounded' \| 'pill' \| 'square'` | `'rounded'` | The shape/border radius of the tag |
| `leadingIcon` | `string` | `undefined` | Icon to display before the tag content |
| `trailingIcon` | `string` | `undefined` | Icon to display after the tag content |
| `removable` | `boolean` | `false` | Whether the tag can be removed |
| `removeAriaLabel` | `string` | `'Remove tag'` | Aria label for the remove button |
| `disabled` | `boolean` | `false` | Whether the tag is disabled |

## Events

| Event | Type | Description |
|-------|------|-------------|
| `remove` | `EventEmitter<void>` | Emitted when the remove button is clicked |

## Examples

### Basic Usage
```html
<pst-tag>Default Tag</pst-tag>
<pst-tag color="primary">Primary Tag</pst-tag>
<pst-tag color="success">Success Tag</pst-tag>
```

### Size Variants
```html
<pst-tag size="xs">Extra Small</pst-tag>
<pst-tag size="sm">Small</pst-tag>
<pst-tag size="md">Medium</pst-tag>
<pst-tag size="lg">Large</pst-tag>
```

### Style Variants
```html
<pst-tag variant="filled" color="primary">Filled</pst-tag>
<pst-tag variant="outline" color="primary">Outline</pst-tag>
<pst-tag variant="subtle" color="primary">Subtle</pst-tag>
```

### With Icons
```html
<pst-tag color="success" leadingIcon="check">Active</pst-tag>
<pst-tag color="error" trailingIcon="alert-triangle">Urgent</pst-tag>
<pst-tag color="info" leadingIcon="info" trailingIcon="chevron-right">Learn More</pst-tag>
```

### Removable Tags
```html
<pst-tag 
  color="primary" 
  [removable]="true"
  (remove)="handleRemove()"
>
  Removable Tag
</pst-tag>
```

### Common Use Cases

#### Status Tags
```html
<pst-tag color="success" shape="pill" leadingIcon="circle" size="sm">Online</pst-tag>
<pst-tag color="warning" shape="pill" leadingIcon="circle" size="sm">Away</pst-tag>
<pst-tag color="gray" shape="pill" leadingIcon="circle" size="sm">Offline</pst-tag>
```

#### Category Tags
```html
<pst-tag variant="subtle" color="info" [removable]="true">Technology</pst-tag>
<pst-tag variant="subtle" color="info" [removable]="true">Design</pst-tag>
<pst-tag variant="subtle" color="info" [removable]="true">Business</pst-tag>
```

#### Version Tags
```html
<pst-tag size="xs" color="gray" shape="square">v2.1.0</pst-tag>
<pst-tag size="xs" color="info" variant="subtle" shape="square">Beta</pst-tag>
<pst-tag size="xs" color="success" variant="subtle" shape="square">Stable</pst-tag>
```

#### Filter Tags
```html
<pst-tag variant="outline" [removable]="true">Price: $0-$100</pst-tag>
<pst-tag variant="outline" [removable]="true">Brand: Apple</pst-tag>
<pst-tag variant="outline" [removable]="true">Color: Black</pst-tag>
```

## Accessibility

- The component uses semantic HTML with proper ARIA attributes
- Remove buttons include an `aria-label` that can be customized via the `removeAriaLabel` prop
- Disabled state is properly indicated for screen readers
- Focus states are clearly visible for keyboard navigation

## Design Tokens

The component uses the following design tokens:
- Colors: `primary`, `gray-*`, `green-*`, `red-*`, `amber-*`, `blue-*`
- Typography: Text sizes from `text-xs` to `text-base`
- Spacing: Standard Tailwind spacing scale
- Border radius: `rounded-md`, `rounded-full`, `rounded-none`