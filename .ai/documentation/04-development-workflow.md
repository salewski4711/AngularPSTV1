# Development Workflow

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm 9+
- Git
- VS Code (empfohlen)

### Initial Setup
```bash
# Repository klonen
git clone <repository-url>
cd AngularV1

# Dependencies installieren
npm install

# Development Server starten
npm start

# Browser öffnen
http://localhost:4201
```

## 📋 Verfügbare Scripts

```bash
# Development
npm start              # Dev-Server auf Port 4201
npm run build         # Production Build
npm run watch         # Build mit Watch-Mode

# Testing
npm test              # Jest Tests ausführen
npm run test:watch    # Tests im Watch-Mode
npm run test:coverage # Test Coverage Report

# Utilities
npm run sync:examples # Example Files synchronisieren
```

## 🔄 Git Workflow

### Branch-Strategie
```
main
├── develop
│   ├── feature/component-name
│   ├── feature/business-feature
│   └── fix/bug-description
└── release/v1.0.0
```

### Commit Convention
```bash
# Format
<type>(<scope>): <subject>

# Beispiele
feat(button): add loading state
fix(auth): resolve login redirect issue
docs(showcase): update button examples
style(header): improve responsive design
refactor(api): optimize error handling
test(utils): add unit tests for helpers
chore(deps): update Angular to v20
```

### Pull Request Process
1. Feature Branch erstellen
2. Änderungen implementieren
3. Tests schreiben/updaten
4. `npm run build` erfolgreich
5. Pull Request erstellen
6. Code Review
7. Merge nach Approval

## 🧩 Component Development

### Neue Component erstellen

#### 1. Beta Component Start
```bash
# Verzeichnis erstellen
mkdir -p src/app/shared/components-beta/new-component

# Component File erstellen
touch src/app/shared/components-beta/new-component/new-component.component.ts
```

#### 2. Component Template
```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-component',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="new-component">
      <!-- Component Template -->
    </div>
  `,
  styles: [`
    .new-component {
      /* Component Styles */
    }
  `]
})
export class NewComponent {
  @Input() property: string = '';
  @Output() action = new EventEmitter<void>();
}
```

#### 3. Tests schreiben
```typescript
// new-component.component.spec.ts
describe('NewComponent', () => {
  // Test Implementation
});
```

#### 4. Showcase Page erstellen
```bash
# Showcase Verzeichnis
mkdir -p src/app/features/components-showcase/pages/atoms/new-component-showcase
mkdir -p src/app/features/components-showcase/pages/atoms/new-component-showcase/examples

# Example Files
touch examples/basic.example.html
touch examples/variants.example.html

# Showcase Component
touch new-component-showcase.component.ts
```

#### 5. Migration zu Production
Nach Review und Stabilisierung:
```bash
# Component verschieben
mv src/app/shared/components-beta/new-component \
   src/app/shared/components/

# Imports updaten
# Beta-Referenzen entfernen
```

## 🎨 Styling Guidelines

### Tailwind CSS Best Practices
```html
<!-- Utility Classes verwenden -->
<button class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
  Click me
</button>

<!-- Responsive Design -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- Content -->
</div>

<!-- Dark Mode Support -->
<div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
  <!-- Content -->
</div>
```

### Component-Specific Styles
```typescript
styles: [`
  :host {
    display: block;
  }
  
  /* Verwende CSS Custom Properties für Theming */
  .component {
    background: var(--bg-color, white);
    color: var(--text-color, black);
  }
`]
```

## 🧪 Testing Strategy

### Unit Tests
```typescript
// Component Test Template
describe('ComponentName', () => {
  let component: ComponentName;
  let fixture: ComponentFixture<ComponentName>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentName]
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentName);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event on action', () => {
    spyOn(component.action, 'emit');
    component.onAction();
    expect(component.action.emit).toHaveBeenCalled();
  });
});
```

### Integration Tests
```typescript
// Service Integration Test
describe('ApiService Integration', () => {
  // Test API calls with MSW
});
```

## 📦 Build & Optimization

### Development Build
```bash
npm run build -- --configuration development
```

### Production Build
```bash
npm run build -- --configuration production
```

### Bundle Analysis
```bash
npm run build -- --stats-json
npx webpack-bundle-analyzer dist/angular-crm-app/stats.json
```

### Performance Checklist
- [ ] Lazy Loading für Features
- [ ] OnPush Change Detection
- [ ] TrackBy für Listen
- [ ] Bilder optimiert (WebP)
- [ ] Fonts selbst gehostet
- [ ] Tree-shakable Imports

## 🐛 Debugging

### Angular DevTools
1. Chrome Extension installieren
2. DevTools öffnen → Angular Tab
3. Component Tree inspizieren
4. Change Detection analysieren

### VS Code Debug Config
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Debug Angular",
      "url": "http://localhost:4201",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

### Common Issues

#### Build Errors
```bash
# Cache löschen
rm -rf node_modules/.cache
rm -rf dist

# Dependencies neu installieren
rm -rf node_modules package-lock.json
npm install
```

#### Type Errors
```bash
# TypeScript Compiler direkt nutzen
npx tsc --noEmit
```

## 🔧 Tooling Setup

### Empfohlene VS Code Extensions
- Angular Language Service
- Tailwind CSS IntelliSense
- ESLint
- Prettier
- GitLens
- Jest Runner

### Editor Config
```ini
# .editorconfig
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
```

## 📚 Weitere Ressourcen

### Interne Dokumentation
- [Architecture Guide](./02-architecture.md)
- [Component Showcase Guide](./03-component-showcase.md)
- [Design System](./07-design-system.md)

### Externe Links
- [Angular Docs](https://angular.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)