# Task 3: Code Block Component

## Status: 🟡 Ready for Development
**Can be done in parallel with:** All other tasks
**Estimated Time:** 1.5 hours
**Dependencies:** None

## Objective
Create a reusable code block component with syntax highlighting and copy functionality.

## Implementation Steps

### 1. Create Component
```typescript
// Path: src/app/features/components-showcase/shared/components/code-block.component.ts
// Features:
// - Syntax highlighting mit Prism.js
// - Copy to clipboard button
// - Line numbers (optional)
// - Dark mode support (prism-tomorrow theme)
// - Language badge
```

### 1a. Install Dependencies
```bash
npm install prismjs @types/prismjs
```

### 1b. Update angular.json
```json
"styles": [
  "node_modules/prismjs/themes/prism-tomorrow.css"
]
```

### 2. Required Features
- [ ] Display code with proper formatting
- [ ] Copy button with feedback
- [ ] Support for HTML, TypeScript, CSS
- [ ] Responsive design
- [ ] Optional line numbers
- [ ] Optional title/filename

### 3. Example Usage
```html
<pst-code-block 
  [code]="exampleCode" 
  language="typescript"
  [showLineNumbers]="true"
  fileName="button.component.ts"
/>
```

## Acceptance Criteria
- [ ] Code displays with syntax highlighting
- [ ] Copy button works with visual feedback
- [ ] Supports multiple languages
- [ ] Dark mode compatible
- [ ] Accessible (keyboard navigation)
