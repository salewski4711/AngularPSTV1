# 📋 Component Showcase - Getroffene Entscheidungen

## ✅ Finale Entscheidungen

```typescript
export const showcaseDecisions = {
  syntaxHighlight: 'prismjs',
  codeStorage: 'separate-files',    // Saubere Struktur mit .example.ts Dateien
  navigation: 'categorized',         // /components/atoms/button
  search: 'top-menu',               // Search im Header, nicht in Sidebar
  status: 'badges',                 // stable/beta/deprecated
  export: 'copy-only'               // Nur Copy-Button
};
```

## 1. Syntax Highlighting: **Prism.js**
```bash
npm install prismjs @types/prismjs
npm install prismjs-themes  # Für Dark Mode Theme
```

## 2. Code Storage: **Separate Dateien**
```
button-showcase/
├── button-showcase.component.ts
├── examples/
│   ├── basic.example.html
│   ├── variants.example.html
│   ├── with-icons.example.html
│   ├── sizes.example.html
│   └── states.example.html
```

## 3. Navigation: **Kategorisiert**
```
/components/atoms/button
/components/atoms/input
/components/molecules/form-group
/components/organisms/contact-form
```

## 4. Search: **Top Menu Integration**
- Search-Icon im Header neben anderen Menüpunkten
- Globale Suche über alle Komponenten
- Keyboard Shortcut: Ctrl/Cmd + K

## 5. Component Status: **Badge System**
- 🟢 `stable` - Production ready
- 🟡 `beta` - In Entwicklung
- 🔴 `deprecated` - Veraltet

## 6. Export: **Copy Button Only**
- Ein-Klick Copy für Code-Beispiele
- Visual Feedback bei erfolgreichem Copy
- Später erweiterbar auf StackBlitz

## Implementation Notes

### Prism.js Setup
```typescript
// In angular.json unter "styles":
"node_modules/prismjs/themes/prism-tomorrow.css"

// In component:
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-markup';
```

### Example File Loader Service
```typescript
@Injectable()
export class ExampleLoaderService {
  async loadExample(component: string, example: string): Promise<string> {
    const response = await fetch(`/assets/examples/${component}/${example}.example.html`);
    return response.text();
  }
}
```
