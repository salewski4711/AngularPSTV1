# Ripple Directive

Eine Angular-Directive, die einen Material Design-ähnlichen Ripple-Effekt zu Elementen hinzufügt.

## Verwendung

```html
<!-- Standard (aktiviert) -->
<button appRipple>Click me</button>

<!-- Conditional -->
<button [appRipple]="isEnabled">Click me</button>

<!-- Mit Button-Komponente -->
<app-button-beta [ripple]="true">Mit Ripple</app-button-beta>
<app-button-beta [ripple]="false">Ohne Ripple</app-button-beta>
```

## Features

- **Positionsgenau**: Der Effekt startet genau am Klickpunkt
- **Responsive**: Passt sich an die Elementgröße an
- **Anpassbare Farben**: 
  - Weiß für dunkle Buttons (Primary, Secondary, Danger)
  - CurrentColor für helle Buttons (Outline, Tertiary, Ghost)
- **Performance**: Entfernt sich selbst nach der Animation

## Wie es funktioniert

1. Bei Klick wird die Position relativ zum Element berechnet
2. Ein kreisförmiges Element wird an dieser Position erstellt
3. CSS-Animation skaliert den Kreis und lässt ihn verblassen
4. Nach 600ms wird das Ripple-Element entfernt

## Anpassungen

Die Animation kann in `styles.scss` angepasst werden:

```scss
@keyframes ripple-effect {
  to {
    transform: scale(4);  // Größe des Ripples
    opacity: 0;           // Endtransparenz
  }
}
```

## Browser-Kompatibilität

Funktioniert in allen modernen Browsern mit CSS Animations Support.
