# Template: [Component] Showcase Page

## Status: 🔴 Template
**Estimated Time:** 1-2 hours per component
**Dependencies:** Core showcase components (Tasks 3-5)

## Instructions
1. Copy this template
2. Replace [Component] with actual name
3. Follow the structure

## Implementation Template

```typescript
// Path: src/app/features/components-showcase/pages/atoms/[component]-showcase.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// Import your component and shared showcase components

@Component({
  selector: 'app-[component]-showcase',
  standalone: true,
  imports: [
    CommonModule,
    // YourComponent,
    // CodeBlockComponent,
    // PropsTableComponent,
    // PlaygroundComponent
  ],
  template: `
    <div class="showcase-page">
      <!-- 1. Header -->
      <header>
        <h1>[Component] Component</h1>
        <p class="lead">Brief description</p>
      </header>

      <!-- 2. Import Section -->
      <section>
        <h2>Import</h2>
        <app-code-block 
          code="import { [Component]Component } from '@app/shared/components/[component]';"
          language="typescript"
        />
      </section>

      <!-- 3. Examples -->
      <!-- 4. Playground -->
      <!-- 5. Props Table -->
      <!-- 6. Accessibility -->
    </div>
  `
})
export class [Component]ShowcaseComponent {
  // Component logic
}
```
