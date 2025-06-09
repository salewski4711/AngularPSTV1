# Tabs Component

A versatile navigation component for organizing content into tabbed sections with support for multiple visual variants, icons, badges, and keyboard navigation.

## Features

- **Multiple Variants**: Line (underline), Pills (rounded), and Bordered styles
- **Icon Support**: Display icons alongside tab labels
- **Badge Support**: Show counts or status indicators
- **Disabled States**: Prevent interaction with specific tabs
- **Keyboard Navigation**: Full arrow key support with Home/End keys
- **Scrollable Tabs**: Horizontal scrolling for overflow with indicators
- **Lazy Loading**: Support for lazy-loaded tab content
- **Accessibility**: Full ARIA support for screen readers
- **Dark Mode**: Fully themed for light and dark modes

## Usage

```typescript
import { TabsComponent, Tab } from '@shared/components/tabs';

@Component({
  template: `
    <pst-tabs 
      [tabs]="tabs" 
      variant="line"
      (tabChange)="onTabChange($event)"
    >
      <div *ngFor="let tab of tabs" [hidden]="activeTab !== tab.id">
        <!-- Tab content here -->
      </div>
    </pst-tabs>
  `
})
export class MyComponent {
  tabs: Tab[] = [
    { id: 'tab1', label: 'Tab 1' },
    { id: 'tab2', label: 'Tab 2', icon: 'user' },
    { id: 'tab3', label: 'Tab 3', badge: 5 },
    { id: 'tab4', label: 'Tab 4', disabled: true }
  ];
  
  activeTab = 'tab1';
  
  onTabChange(event: TabChangeEvent) {
    this.activeTab = event.currentTab;
  }
}
```

## API

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `tabs` | `Tab[]` | `[]` | Array of tab objects |
| `variant` | `'line' \| 'pills' \| 'bordered'` | `'line'` | Visual style variant |
| `activeTab` | `string` | `undefined` | ID of the initially active tab |
| `scrollable` | `boolean` | `false` | Enable horizontal scrolling |
| `ariaLabel` | `string` | `'Tab navigation'` | Accessibility label |

### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `tabChange` | `TabChangeEvent` | Emitted when active tab changes |

### Tab Interface

```typescript
interface Tab {
  id: string;           // Unique identifier
  label: string;        // Display text
  icon?: string;        // Optional icon name
  disabled?: boolean;   // Disable interaction
  badge?: string | number; // Optional badge content
  content?: any;        // For lazy loading content
}
```

### TabChangeEvent Interface

```typescript
interface TabChangeEvent {
  previousTab: string | null;  // ID of previous tab
  currentTab: string;          // ID of current tab
  tab: Tab;                   // Full tab object
}
```

## Variants

### Line (Default)
Minimal style with underline indicator for active tab:
```html
<pst-tabs [tabs]="tabs" variant="line"></pst-tabs>
```

### Pills
Rounded button style with filled background for active tab:
```html
<pst-tabs [tabs]="tabs" variant="pills"></pst-tabs>
```

### Bordered
Traditional tab style with borders, ideal for content containers:
```html
<pst-tabs [tabs]="tabs" variant="bordered"></pst-tabs>
```

## Examples

### Basic Tabs
```typescript
tabs: Tab[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'details', label: 'Details' },
  { id: 'history', label: 'History' }
];
```

### Tabs with Icons
```typescript
tabs: Tab[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'home' },
  { id: 'profile', label: 'Profile', icon: 'user' },
  { id: 'settings', label: 'Settings', icon: 'settings' }
];
```

### Tabs with Badges
```typescript
tabs: Tab[] = [
  { id: 'inbox', label: 'Inbox', badge: 12 },
  { id: 'sent', label: 'Sent', badge: 3 },
  { id: 'drafts', label: 'Drafts', badge: 0 }
];
```

### Scrollable Tabs
```html
<pst-tabs 
  [tabs]="manyTabs" 
  [scrollable]="true"
  variant="line"
></pst-tabs>
```

### Product Details Example
```typescript
productTabs: Tab[] = [
  { id: 'info', label: 'Product Information' },
  { id: 'specs', label: 'Technical Data' },
  { id: 'images', label: 'Images & Media', badge: 4 },
  { id: 'stock', label: 'Stock' },
  { id: 'docs', label: 'Documents', badge: 3 }
];
```

## Keyboard Navigation

- **Arrow Left/Right**: Navigate between tabs
- **Home**: Go to first tab
- **End**: Go to last tab
- **Tab**: Move focus out of tab list
- Disabled tabs are automatically skipped

## Styling

The component uses Tailwind CSS classes and respects the design system tokens:

- **Primary Color**: Used for active states (#F99600)
- **Border Colors**: Follows gray scale for inactive states
- **Transitions**: 150ms ease-in-out for smooth interactions
- **Dark Mode**: Automatically adjusts colors for dark theme

## Accessibility

- Full ARIA support with `role="tablist"` and `role="tab"`
- Keyboard navigation follows WAI-ARIA authoring practices
- Screen reader announcements for tab changes
- Focus indicators for keyboard users

## Best Practices

1. **Unique IDs**: Ensure each tab has a unique ID
2. **Meaningful Labels**: Use clear, concise tab labels
3. **Icon Usage**: Use icons to enhance, not replace, text labels
4. **Badge Updates**: Update badges dynamically to reflect current state
5. **Content Loading**: Use lazy loading for heavy tab content
6. **Mobile Considerations**: Enable scrollable for many tabs on mobile

## Common Use Cases

- Product/Service detail pages
- User account settings
- Multi-step forms
- Data visualization dashboards
- Configuration panels
- Document viewers