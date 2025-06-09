# 🔄 PROMPT: Migrate ALL Components to pst- Prefix

## Aufgabe
Ändere ALLE Angular Component-Selektoren von `app-` zu `pst-` (ProSolarTec).

## Was ändern:

### 1. Component Selectors
```typescript
// In allen *.component.ts
selector: 'pst-button' → selector: 'pst-button'
```

### 2. HTML Templates
```html
<!-- In allen *.html und template strings -->
<pst-button> → <pst-button>
</pst-button> → </pst-button>
```

## Regex für VS Code:
```
Find: selector:\s*['"]app-
Replace: selector: 'pst-

Find: <pst-
Replace: <pst-

Find: </pst-
Replace: </pst-
```

## Betroffene Ordner:
- src/app/shared/components/
- src/app/features/components-showcase/
- src/app/design-system/
- src/app/layouts/

## NICHT ändern:
- app-root (Main App Component)
- RouterModule
- Third-party components

## Nach Migration testen:
```bash
ng build
ng serve --port 4201
```

Alle "Unknown element" Fehler sollten verschwunden sein!
