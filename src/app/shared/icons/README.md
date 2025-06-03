# Neue Icons hinzufügen

## 1. Icon Definition erweitern

Öffnen Sie `src/app/shared/icons/icon-definitions.ts` und fügen Sie Ihr neues Icon hinzu:

```typescript
export const ICONS: Record<string, IconDefinition> = {
  // ... andere Icons
  
  'mein-icon': {
    name: 'mein-icon',
    viewBox: '0 0 24 24',  // Standard ist 24x24
    path: 'M12 2L2 7v10...' // SVG Path-Daten
  }
};
```

## 2. SVG Path-Daten finden

### Option A: Von Heroicons (empfohlen)
1. Besuchen Sie https://heroicons.com/
2. Wählen Sie ein Icon (Outline-Version)
3. Kopieren Sie den SVG-Code
4. Extrahieren Sie den `d` Wert aus dem `<path>` Element

### Option B: Von anderen Icon-Libraries
- Feather Icons: https://feathericons.com/
- Tabler Icons: https://tabler-icons.io/
- Bootstrap Icons: https://icons.getbootstrap.com/

### Option C: Eigenes SVG erstellen
- Nutzen Sie Figma, Illustrator oder Inkscape
- Exportieren Sie als SVG
- Optimieren Sie mit SVGO: https://jakearchibald.github.io/svgomg/

## 3. Icon verwenden

```html
<app-button-beta icon="mein-icon" variant="primary">
  Mit Icon
</app-button-beta>

<app-icon name="mein-icon" [size]="24"></app-icon>
```

## 4. Best Practices

- **Stroke-basiert**: Nutzen Sie Outline-Icons (stroke) statt gefüllte Icons
- **Viewbox**: Standard 24x24, aber anpassbar
- **Naming**: Verwenden Sie kebab-case (mein-icon, nicht meinIcon)
- **Optimierung**: Entfernen Sie unnötige Attribute aus dem SVG
