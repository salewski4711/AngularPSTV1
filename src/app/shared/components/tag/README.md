# Tag Component

A versatile tag/chip component for labeling, categorization, and filtering. Tags can be removable, have icons, and come in multiple styles and sizes.

## Usage

```typescript
import { TagComponent } from '@app/shared/components/tag';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [TagComponent],
  template: `
    <app-tag color="primary">Primary Tag</app-tag>
    <app-tag 
      variant="outline" 
      [removable]="true"
      (remove)="handleRemove()"
    >
      Removable Tag
    </app-tag>
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
<app-tag>Default Tag</app-tag>
<app-tag color="primary">Primary Tag</app-tag>
<app-tag color="success">Success Tag</app-tag>
```

### Size Variants
```html
<app-tag size="xs">Extra Small</app-tag>
<app-tag size="sm">Small</app-tag>
<app-tag size="md">Medium</app-tag>
<app-tag size="lg">Large</app-tag>
```

### Style Variants
```html
<app-tag variant="filled" color="primary">Filled</app-tag>
<app-tag variant="outline" color="primary">Outline</app-tag>
<app-tag variant="subtle" color="primary">Subtle</app-tag>
```

### With Icons
```html
<app-tag color="success" leadingIcon="check">Active</app-tag>
<app-tag color="error" trailingIcon="alert-triangle">Urgent</app-tag>
<app-tag color="info" leadingIcon="info" trailingIcon="chevron-right">Learn More</app-tag>
```

### Removable Tags
```html
<app-tag 
  color="primary" 
  [removable]="true"
  (remove)="handleRemove()"
>
  Removable Tag
</app-tag>
```

### Common Use Cases

#### Status Tags
```html
<app-tag color="success" shape="pill" leadingIcon="circle" size="sm">Online</app-tag>
<app-tag color="warning" shape="pill" leadingIcon="circle" size="sm">Away</app-tag>
<app-tag color="gray" shape="pill" leadingIcon="circle" size="sm">Offline</app-tag>
```

#### Category Tags
```html
<app-tag variant="subtle" color="info" [removable]="true">Technology</app-tag>
<app-tag variant="subtle" color="info" [removable]="true">Design</app-tag>
<app-tag variant="subtle" color="info" [removable]="true">Business</app-tag>
```

#### Version Tags
```html
<app-tag size="xs" color="gray" shape="square">v2.1.0</app-tag>
<app-tag size="xs" color="info" variant="subtle" shape="square">Beta</app-tag>
<app-tag size="xs" color="success" variant="subtle" shape="square">Stable</app-tag>
```

#### Filter Tags
```html
<app-tag variant="outline" [removable]="true">Price: $0-$100</app-tag>
<app-tag variant="outline" [removable]="true">Brand: Apple</app-tag>
<app-tag variant="outline" [removable]="true">Color: Black</app-tag>
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