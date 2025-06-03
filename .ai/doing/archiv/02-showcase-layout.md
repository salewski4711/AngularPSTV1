# Task 2: Showcase Layout Component

## Status: 🟡 Ready for Development
**Can be done in parallel with:** Tasks 1, 3, 4
**Estimated Time:** 2 hours
**Dependencies:** None (kann mit Mock-Navigation starten)

## Objective
Create the main layout component with sidebar navigation for the Component Showcase.

## Implementation

### File: showcase-layout.component.ts
```typescript
// Path: src/app/features/components-showcase/layout/showcase-layout.component.ts
@Component({
  selector: 'app-showcase-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  template: `
    <div class="flex h-screen bg-gray-50 dark:bg-gray-900">
      <!-- Sidebar -->
      <aside class="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
        <div class="p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <app-icon name="package" [size]="24" />
            Component Library
          </h1>
        </div>
        
        <nav class="px-4 pb-4">
          @for (category of navigation; track category.label) {
            <div class="mb-6">
              <h2 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                {{ category.label }}
              </h2>
              <ul class="space-y-1">
                @for (item of category.items; track item.path) {
                  <li>
                    <a [routerLink]="item.path"
                       routerLinkActive="bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
                       class="flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
                      <span>{{ item.label }}</span>
                      @if (item.status) {
                        <app-badge [variant]="getBadgeVariant(item.status)" size="sm">
                          {{ item.status }}
                        </app-badge>
                      }
                    </a>
                  </li>
                }
              </ul>
            </div>
          }
        </nav>
      </aside>
      
      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto">
        <router-outlet />
      </main>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowcaseLayoutComponent {
  navigation = showcaseNavigation; // From showcase-navigation.ts
  
  getBadgeVariant(status: string) {
    const variants = {
      'stable': 'success',
      'beta': 'warning', 
      'deprecated': 'error'
    };
    return variants[status] || 'neutral';
  }
}
```

## Acceptance Criteria
- [ ] Responsive sidebar navigation
- [ ] Active route highlighting
- [ ] Status badges working
- [ ] Dark mode support
- [ ] Smooth scrolling in content area
