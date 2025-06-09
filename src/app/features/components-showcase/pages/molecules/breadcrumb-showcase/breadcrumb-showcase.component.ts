import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent, BreadcrumbItem } from '../../../../../shared/components/breadcrumb';
import { CodeBlockComponent } from '../../../shared/components/code-block.component';
import { PropsTableComponent } from '../../../shared/components/props-table.component';

@Component({
  selector: 'pst-breadcrumb-showcase',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, CodeBlockComponent, PropsTableComponent],
  template: `
    <div class="space-y-8">
      <section>
        <h1 class="text-3xl font-bold mb-4">Breadcrumb Component</h1>
        <p class="text-gray-600 dark:text-gray-400">
          A navigation component that shows the user's current location within a hierarchy.
        </p>
      </section>

      <!-- Basic Example -->
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold">Basic Usage</h2>
        <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <pst-breadcrumb [items]="basicItems" />
        </div>
        <pst-code-block 
          [code]="basicCode" 
          language="typescript" 
        />
      </section>

      <!-- Separators Example -->
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold">Custom Separators</h2>
        <div class="space-y-4 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          @for (sep of separators; track sep) {
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Separator: "{{ sep }}"</p>
              <pst-breadcrumb [items]="basicItems" [separator]="sep" />
            </div>
          }
        </div>
        <pst-code-block 
          [code]="separatorCode" 
          language="html" 
        />
      </section>

      <!-- With Icons -->
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold">With Icons</h2>
        <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <pst-breadcrumb [items]="itemsWithIcons" />
        </div>
        <pst-code-block 
          [code]="iconsCode" 
          language="typescript" 
        />
      </section>

      <!-- Long Items with Truncation -->
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold">Long Items with Truncation</h2>
        <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <pst-breadcrumb [items]="longItems" />
        </div>
        <pst-code-block 
          [code]="longItemsCode" 
          language="typescript" 
        />
      </section>

      <!-- Max Items -->
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold">Max Items (Collapsed)</h2>
        <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <pst-breadcrumb [items]="manyItems" [maxItems]="3" />
        </div>
        <pst-code-block 
          [code]="maxItemsCode" 
          language="html" 
        />
      </section>

      <!-- Without Home -->
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold">Without Home Icon</h2>
        <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <pst-breadcrumb [items]="basicItems" [showHome]="false" />
        </div>
        <pst-code-block 
          [code]="noHomeCode" 
          language="html" 
        />
      </section>

      <!-- Interactive Example -->
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold">Interactive Example</h2>
        <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <pst-breadcrumb 
            [items]="basicItems" 
            (itemClick)="onItemClick($event)" 
          />
          @if (lastClicked()) {
            <p class="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Last clicked: {{ lastClicked() }}
            </p>
          }
        </div>
        <pst-code-block 
          [code]="interactiveCode" 
          language="typescript" 
        />
      </section>

      <!-- Auto-generate from Route -->
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold">Auto-generate from Route</h2>
        <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Enable route-based generation by setting breadcrumb data in your routes:
          </p>
          <pst-breadcrumb [autoGenerateFromRoute]="true" />
        </div>
        <pst-code-block 
          [code]="routeCode" 
          language="typescript" 
        />
      </section>

      <!-- Props Table -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Component API</h2>
        <pst-props-table 
          [props]="componentProps" 
        />
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbShowcaseComponent {
  lastClicked = signal<string>('');

  basicItems: BreadcrumbItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Electronics', path: '/products/electronics' },
    { label: 'Smartphones', path: '/products/electronics/smartphones' }
  ];

  itemsWithIcons: BreadcrumbItem[] = [
    { label: 'Dashboard', path: '/dashboard', icon: 'home' },
    { label: 'Customers', path: '/customers', icon: 'users' },
    { label: 'Details', path: '/customers/123', icon: 'user' }
  ];

  longItems: BreadcrumbItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Very Long Category Name That Should Be Truncated', path: '/category' },
    { label: 'Another Really Long Subcategory Name', path: '/category/sub' },
    { label: 'Final Extremely Long Product Name That Definitely Needs Truncation' }
  ];

  manyItems: BreadcrumbItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Level 1', path: '/level1' },
    { label: 'Level 2', path: '/level1/level2' },
    { label: 'Level 3', path: '/level1/level2/level3' },
    { label: 'Level 4', path: '/level1/level2/level3/level4' },
    { label: 'Level 5', path: '/level1/level2/level3/level4/level5' },
    { label: 'Current Page' }
  ];

  separators: string[] = ['/', '>', '•', '→', '»'];

  basicCode = `import { BreadcrumbComponent, BreadcrumbItem } from '@app/shared/components/breadcrumb';

items: BreadcrumbItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'Electronics', path: '/products/electronics' },
  { label: 'Smartphones', path: '/products/electronics/smartphones' }
];

// Template
<pst-breadcrumb [items]="items" />`;

  separatorCode = `<!-- Available separators: '/', '>', '•', '→', '»' -->
<pst-breadcrumb [items]="items" separator=">" />
<pst-breadcrumb [items]="items" separator="•" />
<pst-breadcrumb [items]="items" separator="→" />`;

  iconsCode = `items: BreadcrumbItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: 'home' },
  { label: 'Customers', path: '/customers', icon: 'users' },
  { label: 'Details', path: '/customers/123', icon: 'user' }
];`;

  longItemsCode = `// Items with long labels will be automatically truncated with ellipsis
// Hover over items to see full text in tooltip`;

  maxItemsCode = `<!-- Collapse breadcrumbs when more than maxItems -->
<pst-breadcrumb [items]="manyItems" [maxItems]="3" />`;

  noHomeCode = `<!-- Hide the home icon -->
<pst-breadcrumb [items]="items" [showHome]="false" />`;

  interactiveCode = `// Component
onItemClick(item: BreadcrumbItem): void {
  console.log('Breadcrumb clicked:', item);
  this.lastClicked.set(item.label);
}

// Template
<pst-breadcrumb 
  [items]="items" 
  (itemClick)="onItemClick($event)" 
/>`;

  routeCode = `// In your route configuration:
const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
    data: { breadcrumb: 'Products', breadcrumbIcon: 'package' },
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
<pst-breadcrumb [autoGenerateFromRoute]="true" />`;

  componentProps = [
    {
      name: 'items',
      type: 'BreadcrumbItem[]',
      default: '[]',
      description: 'Array of breadcrumb items to display'
    },
    {
      name: 'separator',
      type: 'BreadcrumbSeparator',
      default: '/',
      description: 'Separator character between items. Options: /, >, •, →, »'
    },
    {
      name: 'showHome',
      type: 'boolean',
      default: 'true',
      description: 'Show home icon as first item'
    },
    {
      name: 'maxItems',
      type: 'number',
      default: '4',
      description: 'Maximum items to show before collapsing with ellipsis'
    },
    {
      name: 'autoGenerateFromRoute',
      type: 'boolean',
      default: 'false',
      description: 'Automatically generate breadcrumbs from route data'
    }
  ];

  componentEvents = [
    {
      name: 'itemClick',
      type: 'BreadcrumbItem',
      description: 'Emitted when a breadcrumb item is clicked'
    }
  ];

  onItemClick(item: BreadcrumbItem): void {
    console.log('Breadcrumb clicked:', item);
    this.lastClicked.set(item.label);
  }
}