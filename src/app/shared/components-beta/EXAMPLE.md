# Beispiel: Card Component Evolution

## Beta Phase (v0.8)
```html
<!-- In Beta -->
<app-card-beta 
  variant="elevated" 
  [showHeader]="true"
  [showBetaBadge]="true"
>
  <div card-header>
    <h3>Kunde Details</h3>
  </div>
  <p>Inhalt...</p>
</app-card-beta>
```

## Production (v1.0)
```html
<!-- Nach Migration -->
<app-card variant="elevated">
  <app-card-header>
    <h3>Kunde Details</h3>
  </app-card-header>
  <app-card-body>
    <p>Inhalt...</p>
  </app-card-body>
</app-card>
```

## Was hat sich geändert?
1. Kein Beta-Badge mehr
2. Bessere Komponenten-Komposition
3. Klarere API
4. Performance-Optimierungen
