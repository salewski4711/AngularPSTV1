# Task 1: Component Showcase Basic Structure

## Status: 🟡 Ready for Development
**Can be done in parallel with:** Tasks 2, 3, 4
**Estimated Time:** 1 hour
**Dependencies:** None

## Objective
Create the basic folder structure and routing setup for the Component Showcase feature.

## Implementation Steps

### 1. Create Folder Structure
```bash
mkdir -p src/app/features/components-showcase
mkdir -p src/app/features/components-showcase/layout
mkdir -p src/app/features/components-showcase/pages/atoms
mkdir -p src/app/features/components-showcase/pages/molecules
mkdir -p src/app/features/components-showcase/pages/organisms
mkdir -p src/app/features/components-showcase/shared/components
```

### 2. Create Main Routes File
```typescript
// Path: src/app/features/components-showcase/showcase.routes.ts
import { Routes } from '@angular/router';

export const showcaseRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/showcase-layout.component').then(m => m.ShowcaseLayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'atoms/button',
        pathMatch: 'full'
      },
      {
        path: 'atoms/button',
        loadComponent: () => import('./pages/atoms/button-showcase.component').then(m => m.ButtonShowcaseComponent)
      },
      // Add more routes as components are ready
    ]
  }
];
```

### 3. Update Main App Routes
```typescript
// In app.routes.ts, add:
{
  path: 'components',
  loadChildren: () => import('./features/components-showcase/showcase.routes').then(m => m.showcaseRoutes)
}
```

### 4. Create Navigation Data Structure
```typescript
// Path: src/app/features/components-showcase/showcase-navigation.ts
export interface NavItem {
  label: string;
  path: string;
  status?: 'stable' | 'beta' | 'deprecated';
  icon?: string;
}

export interface NavCategory {
  label: string;
  items: NavItem[];
}

export const showcaseNavigation: NavCategory[] = [
  {
    label: 'Atoms',
    items: [
      { label: 'Button', path: '/components/atoms/button', status: 'stable' },
      { label: 'Input', path: '/components/atoms/input', status: 'beta' },
      { label: 'Select', path: '/components/atoms/select', status: 'beta' },
      { label: 'Checkbox', path: '/components/atoms/checkbox', status: 'beta' },
      { label: 'Radio', path: '/components/atoms/radio', status: 'beta' },
      { label: 'Toggle', path: '/components/atoms/toggle', status: 'beta' },
      { label: 'Badge', path: '/components/atoms/badge', status: 'beta' },
      { label: 'Avatar', path: '/components/atoms/avatar', status: 'beta' }
    ]
  }
];
```

## Acceptance Criteria
- [ ] Folder structure created
- [ ] Routes file configured
- [ ] Main app routes updated
- [ ] Navigation structure defined
- [ ] No TypeScript errors

## Output
Functioning route structure at `/components` ready for components.
