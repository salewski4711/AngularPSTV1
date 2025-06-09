# Breadcrumb Component

A flexible breadcrumb navigation component that displays the user's current location within a website hierarchy.

## Features

- **Auto-generation from routes**: Automatically generate breadcrumbs from Angular route data
- **Custom separators**: Choose from multiple separator styles (/, >, •, →, »)
- **Icon support**: Display icons alongside breadcrumb items
- **Responsive design**: Collapses to a dropdown menu on mobile devices
- **Truncation**: Long items are truncated with ellipsis
- **Home icon**: Optional home icon as the first breadcrumb
- **Dark mode support**: Fully styled for both light and dark themes
- **Interactive**: Click events for navigation

## Usage

### Basic Usage

```typescript
import { BreadcrumbComponent, BreadcrumbItem } from '@app/shared/components/breadcrumb';

@Component({
  selector: 'pst-example',
  standalone: true,
  imports: [BreadcrumbComponent],
  template: `
    <pst-breadcrumb [items]="breadcrumbItems" />
  `
})
export class ExampleComponent {
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', url: '/' },
    { label: 'Products', url: '/products' },
    { label: 'Electronics', url: '/products/electronics' },
    { label: 'Smartphones' } // Current page - no URL
  ];
}
```

### Auto-generate from Routes

Configure your routes with breadcrumb data:

```typescript
const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
    data: { 
      breadcrumb: 'Products',
      breadcrumbIcon: 'package' // Optional icon
    },
    children: [
      {
        path: 'electronics',
        component: ElectronicsComponent,
        data: { breadcrumb: 'Electronics' },
        children: [
          {
            path: ':id',
            component: ProductDetailComponent,
            data: { breadcrumb: 'Product Details' }
          }
        ]
      }
    ]
  }
];

// In your component:
<pst-breadcrumb [autoGenerateFromRoute]="true" />
```

### Custom Separators

```html
<pst-breadcrumb [items]="items" separator=">" />
<pst-breadcrumb [items]="items" separator="•" />
<pst-breadcrumb [items]="items" separator="→" />
```

### With Icons

```typescript
breadcrumbItems: BreadcrumbItem[] = [
  { label: 'Dashboard', url: '/dashboard', icon: 'home' },
  { label: 'Customers', url: '/customers', icon: 'users' },
  { label: 'John Doe', icon: 'user' }
];
```

### Handling Clicks

```html
<pst-breadcrumb 
  [items]="items" 
  (itemClick)="onBreadcrumbClick($event)" 
/>
```

```typescript
onBreadcrumbClick(item: BreadcrumbItem): void {
  console.log('Breadcrumb clicked:', item);
  // Custom navigation logic if needed
}
```

## API

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `items` | `BreadcrumbItem[]` | `[]` | Array of breadcrumb items |
| `separator` | `BreadcrumbSeparator` | `'/'` | Separator between items (/, >, •, →, ») |
| `showHome` | `boolean` | `true` | Show home icon as first item |
| `maxItems` | `number` | `4` | Maximum items before truncation |
| `autoGenerateFromRoute` | `boolean` | `false` | Auto-generate from route data |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `itemClick` | `EventEmitter<BreadcrumbItem>` | Emitted when an item is clicked |

### Types

```typescript
interface BreadcrumbItem {
  label: string;      // Display text
  url?: string;       // Navigation URL (optional for current page)
  icon?: string;      // Icon name from icon system
  data?: any;         // Additional data
}

type BreadcrumbSeparator = '/' | '>' | '•' | '→' | '»';
```

## Styling

The component uses Tailwind CSS classes with ProSolarTec theme colors:

- Regular items: `text-gray-500` (light) / `text-gray-400` (dark)
- Hover state: `text-gray-700` (light) / `text-gray-200` (dark)
- Active item: `text-gray-900` (light) / `text-white` (dark) with `font-medium`
- Separators: `text-gray-400` (light) / `text-gray-600` (dark)

## Responsive Behavior

- **Desktop**: Shows all items up to `maxItems`, with ellipsis for overflow
- **Mobile** (< 640px): Collapses to a dropdown menu showing only the current page

## Accessibility

- Uses semantic `<nav>` element with `aria-label="Breadcrumb"`
- Current page marked with `aria-current="page"`
- Proper link and button labeling
- Keyboard navigation support

## Examples

See the showcase component at `/components/molecules/breadcrumb` for live examples and code snippets.