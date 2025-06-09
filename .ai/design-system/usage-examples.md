# Design System Usage Examples

## Grid & Layout

### Container
```html
<!-- Standard Container (max-width: 1280px) -->
<pst-container>
  <h1>Mein Content</h1>
</pst-container>

<!-- Full Width Container -->
<pst-container size="full" [noPadding]="true">
  <img src="hero.jpg" class="w-full">
</pst-container>

<!-- Small Container für Formulare -->
<pst-container size="sm">
  <pst-login-form></pst-login-form>
</pst-container>
```

### Grid System
```html
<!-- Responsive 3-Column Grid -->
<pst-grid [cols]="1" [colsMd]="2" [colsLg]="3" [gap]="6">
  <pst-card>Card 1</pst-card>
  <pst-card>Card 2</pst-card>
  <pst-card>Card 3</pst-card>
</pst-grid>

<!-- Grid mit unterschiedlichen Spans -->
<pst-grid [cols]="12" [gap]="4">
  <pst-grid-item [span]="8" [spanMd]="9">
    <pst-main-content></pst-main-content>
  </pst-grid-item>
  <pst-grid-item [span]="4" [spanMd]="3">
    <pst-sidebar></pst-sidebar>
  </pst-grid-item>
</pst-grid>
```

## Typography

```html
<!-- Überschriften -->
<pst-text variant="h1">Haupt-Überschrift</pst-text>
<pst-text variant="h2" color="var(--color-primary)">Farbige Überschrift</pst-text>
<pst-text variant="h3" align="center">Zentrierte Überschrift</pst-text>

<!-- Body Text -->
<pst-text variant="body">
  Standard Paragraph mit automatischem Dark Mode Support.
</pst-text>

<pst-text variant="body-sm" weight="medium">
  Kleinerer Text mit medium Gewicht.
</pst-text>

<!-- Utility Texte -->
<pst-text variant="caption" className="text-gray-500">
  Caption Text für zusätzliche Informationen
</pst-text>

<pst-text variant="overline">
  Overline Text
</pst-text>
```

## Zusammengesetzte Layouts

```html
<!-- Dashboard Layout -->
<pst-container>
  <pst-grid [cols]="1" [colsLg]="4" [gap]="6">
    <!-- Stats Cards -->
    <pst-card variant="elevated">
      <pst-text variant="overline" className="text-gray-500">Umsatz</pst-text>
      <pst-text variant="h2">€125.430</pst-text>
      <pst-text variant="caption" className="text-green-600">+12% vs. Vormonat</pst-text>
    </pst-card>
    
    <!-- Weitere Stats... -->
  </pst-grid>
  
  <!-- Main Content Grid -->
  <pst-grid [cols]="1" [colsLg]="3" [gap]="6" className="mt-8">
    <pst-grid-item [span]="1" [spanLg]="2">
      <pst-card padding="lg">
        <pst-text variant="h3" className="mb-4">Haupt-Dashboard</pst-text>
        <!-- Chart Component -->
      </pst-card>
    </pst-grid-item>
    
    <pst-grid-item [span]="1">
      <pst-card variant="outlined">
        <pst-text variant="h4">Aktivitäten</pst-text>
        <!-- Activity List -->
      </pst-card>
    </pst-grid-item>
  </pst-grid>
</pst-container>
```

## Dark Mode

Alle Komponenten unterstützen automatisch Dark Mode durch Tailwind CSS Classes:

```html
<!-- Wird automatisch im Dark Mode angepasst -->
<pst-text>Text ist schwarz im Light Mode, weiß im Dark Mode</pst-text>

<pst-card>
  Hintergrund ist weiß im Light Mode, dunkelgrau im Dark Mode
</pst-card>
```

## Spacing System (8px Grid)

Nutze die Tailwind Spacing Classes die auf dem 8px Grid basieren:
- `p-1` = 4px
- `p-2` = 8px (Basis)
- `p-4` = 16px
- `p-6` = 24px
- `p-8` = 32px

```html
<div class="mt-8 mb-4 px-6">
  <!-- 32px top margin, 16px bottom margin, 24px horizontal padding -->
</div>
```

## ProSolarTec Farben

Verwende die Token-basierten Farben:
```css
/* Primär (Orange) */
.bg-primary     /* #F99600 */
.text-primary   /* #F99600 */
.border-primary /* #F99600 */

/* Sekundär (Blau) */
.bg-secondary   /* #1C3661 */
.text-secondary /* #1C3661 */

/* Status Farben */
.text-success   /* #10B981 */
.text-error     /* #EF4444 */
.text-warning   /* #F59E0B */
.text-info      /* #3B82F6 */
```
