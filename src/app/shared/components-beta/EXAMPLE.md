# Beispiel: Card Component Evolution

## Beta Phase (v0.8)
```html
<!-- In Beta -->
<pst-card-beta 
  variant="elevated" 
  [showHeader]="true"
  [showBetaBadge]="true"
>
  <div card-header>
    <h3>Kunde Details</h3>
  </div>
  <p>Inhalt...</p>
</pst-card-beta>
```

## Production (v1.0)
```html
<!-- Nach Migration -->
<pst-card variant="elevated">
  <pst-card-header>
    <h3>Kunde Details</h3>
  </pst-card-header>
  <pst-card-body>
    <p>Inhalt...</p>
  </pst-card-body>
</pst-card>
```

## Was hat sich geändert?
1. Kein Beta-Badge mehr
2. Bessere Komponenten-Komposition
3. Klarere API
4. Performance-Optimierungen
