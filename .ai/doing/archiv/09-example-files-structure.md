# Task 9: Create Example Files Structure

## Status: 🟡 Ready for Development
**Can be done in parallel with:** Task 6
**Estimated Time:** 1 hour
**Dependencies:** None

## Objective
Create the structure for storing component examples as separate files.

## Implementation

### 1. Create Examples Directory Structure
```bash
mkdir -p src/app/features/components-showcase/examples/atoms/button
mkdir -p src/app/features/components-showcase/examples/atoms/input
# etc. for each component
```

### 2. Create Example Files for Button
```
examples/atoms/button/
├── basic.example.html
├── basic.example.ts        # Component logic if needed
├── variants.example.html
├── sizes.example.html
├── with-icons.example.html
├── states.example.html
└── loading.example.html
```

### 3. Example File Format
```html
<!-- basic.example.html -->
<pst-button variant="primary">Click me</pst-button>
<pst-button variant="secondary">Click me</pst-button>
<pst-button variant="ghost">Click me</pst-button>
```

### 4. Create Example Loader Service
```typescript
// Path: src/app/features/components-showcase/services/example-loader.service.ts
@Injectable({ providedIn: 'root' })
export class ExampleLoaderService {
  private cache = new Map<string, string>();
  
  async loadExample(component: string, example: string): Promise<string> {
    const key = `${component}/${example}`;
    if (this.cache.has(key)) return this.cache.get(key)!;
    
    const response = await fetch(`/assets/examples/${component}/${example}.example.html`);
    const content = await response.text();
    this.cache.set(key, content);
    return content;
  }
}
```

## Acceptance Criteria
- [ ] Example files structure created
- [ ] Loader service working
- [ ] Examples load correctly
- [ ] Caching implemented
