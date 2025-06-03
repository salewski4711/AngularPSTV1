# Assets Struktur

## Ordnerstruktur:

```
public/
├── images/          # Allgemeine Bilder
│   ├── hero/       # Hero/Banner Bilder
│   ├── products/   # Produktbilder
│   └── team/       # Team/Mitarbeiterfotos
├── logos/          # Firmenlogos
│   ├── prosolar-logo.svg
│   ├── prosolar-logo-dark.svg
│   └── partner-logos/
├── icons/          # Icons (falls nicht Icon-Font)
│   ├── social/     # Social Media Icons
│   └── custom/     # Custom Icons
├── fonts/          # Lokale Fonts (falls benötigt)
└── documents/      # PDFs, Downloads etc.
```

## Verwendung in Angular:

### 1. In Templates:
```html
<!-- Absoluter Pfad vom public Ordner -->
<img src="/logos/prosolar-logo.svg" alt="ProSolarTec Logo">

<!-- Oder mit Angular Binding -->
<img [src]="logoPath" alt="ProSolarTec Logo">
```

### 2. In Komponenten:
```typescript
export class HeaderComponent {
  logoPath = '/logos/prosolar-logo.svg';
  logoDarkPath = '/logos/prosolar-logo-dark.svg';
  
  getLogo(): string {
    return this.isDarkMode ? this.logoDarkPath : this.logoPath;
  }
}
```

### 3. In SCSS:
```scss
.hero-section {
  background-image: url('/images/hero/solar-panels.jpg');
}
```

## Best Practices:

1. **Bildformate:**
   - SVG für Logos und Icons (skalierbar)
   - WebP/AVIF für moderne Browser
   - JPG/PNG als Fallback

2. **Dateinamen:**
   - Kleinschreibung
   - Bindestriche statt Leerzeichen
   - Beschreibende Namen: `prosolar-logo-white.svg`

3. **Optimierung:**
   - Bilder vor Upload optimieren
   - Lazy Loading für große Bilder
   - Responsive Bilder mit srcset

4. **Organisation:**
   - Thematisch gruppieren
   - Versionierung bei Bedarf: `logo-v2.svg`
