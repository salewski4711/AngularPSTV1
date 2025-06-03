# Design System Usage Examples

## Grid & Layout

### Container
```html
<!-- Standard Container (max-width: 1280px) -->
<app-container>
  <h1>Mein Content</h1>
</app-container>

<!-- Full Width Container -->
<app-container size="full" [noPadding]="true">
  <img src="hero.jpg" class="w-full">
</app-container>

<!-- Small Container für Formulare -->
<app-container size="sm">
  <app-login-form></app-login-form>
</app-container>
```

### Grid System
```html
<!-- Responsive 3-Column Grid -->
<app-grid [cols]="1" [colsMd]="2" [colsLg]="3" [gap]="6">
  <app-card>Card 1</app-card>
  <app-card>Card 2</app-card>
  <app-card>Card 3</app-card>
</app-grid>

<!-- Grid mit unterschiedlichen Spans -->
<app-grid [cols]="12" [gap]="4">
  <app-grid-item [span]="8" [spanMd]="9">
    <app-main-content></app-main-content>
  </app-grid-item>
  <app-grid-item [span]="4" [spanMd]="3">
    <app-sidebar></app-sidebar>
  </app-grid-item>
</app-grid>
```

## Typography

```html
<!-- Überschriften -->
<app-text variant="h1">Haupt-Überschrift</app-text>
<app-text variant="h2" color="var(--color-primary)">Farbige Überschrift</app-text>
<app-text variant="h3" align="center">Zentrierte Überschrift</app-text>

<!-- Body Text -->
<app-text variant="body">
  Standard Paragraph mit automatischem Dark Mode Support.
</app-text>

<app-text variant="body-sm" weight="medium">
  Kleinerer Text mit medium Gewicht.
</app-text>

<!-- Utility Texte -->
<app-text variant="caption" className="text-gray-500">
  Caption Text für zusätzliche Informationen
</app-text>

<app-text variant="overline">
  Overline Text
</app-text>
```

## Zusammengesetzte Layouts

```html
<!-- Dashboard Layout -->
<app-container>
  <app-grid [cols]="1" [colsLg]="4" [gap]="6">
    <!-- Stats Cards -->
    <app-card variant="elevated">
      <app-text variant="overline" className="text-gray-500">Umsatz</app-text>
      <app-text variant="h2">€125.430</app-text>
      <app-text variant="caption" className="text-green-600">+12% vs. Vormonat</app-text>
    </app-card>
    
    <!-- Weitere Stats... -->
  </app-grid>
  
  <!-- Main Content Grid -->
  <app-grid [cols]="1" [colsLg]="3" [gap]="6" className="mt-8">
    <app-grid-item [span]="1" [spanLg]="2">
      <app-card padding="lg">
        <app-text variant="h3" className="mb-4">Haupt-Dashboard</app-text>
        <!-- Chart Component -->
      </app-card>
    </app-grid-item>
    
    <app-grid-item [span]="1">
      <app-card variant="outlined">
        <app-text variant="h4">Aktivitäten</app-text>
        <!-- Activity List -->
      </app-card>
    </app-grid-item>
  </app-grid>
</app-container>
```

## Dark Mode

Alle Komponenten unterstützen automatisch Dark Mode durch Tailwind CSS Classes:

```html
<!-- Wird automatisch im Dark Mode angepasst -->
<app-text>Text ist schwarz im Light Mode, weiß im Dark Mode</app-text>

<app-card>
  Hintergrund ist weiß im Light Mode, dunkelgrau im Dark Mode
</app-card>
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
