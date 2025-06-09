# Task: Race Condition in TooltipDirective beheben

## Titel
setTimeout ohne Cleanup in TooltipDirective führt zu Memory Leak

## Beschreibung
Die TooltipDirective fügt einen Click-Listener mit setTimeout hinzu, ohne die Timeout-ID zu speichern und bei Destroy zu clearen. Dies kann zu Memory Leaks und Race Conditions führen.

## Betroffene Dateien
- `/mnt/c/Code/AngularV1/src/app/shared/components/tooltip/tooltip.directive.ts` (Zeilen 78-82)

## Geschätzter Aufwand
1 Story Point

## Abhängigkeiten
Keine

## Lösung
```typescript
export class TooltipDirective implements OnDestroy {
  private clickTimeout?: number;
  private documentClickListener?: () => void;
  
  private addClickListener(): void {
    // Clear existing timeout if any
    if (this.clickTimeout) {
      clearTimeout(this.clickTimeout);
    }
    
    this.clickTimeout = window.setTimeout(() => {
      this.documentClickListener = () => {
        if (!this.el.nativeElement.contains(event?.target)) {
          this.hide();
        }
      };
      
      document.addEventListener('click', this.documentClickListener);
    }, 100);
  }
  
  ngOnDestroy(): void {
    // Clear timeout if pending
    if (this.clickTimeout) {
      clearTimeout(this.clickTimeout);
    }
    
    // Remove click listener if exists
    if (this.documentClickListener) {
      document.removeEventListener('click', this.documentClickListener);
    }
    
    // Existing cleanup
    this.hide();
  }
  
  private hide(): void {
    // Remove listener when hiding
    if (this.documentClickListener) {
      document.removeEventListener('click', this.documentClickListener);
      this.documentClickListener = undefined;
    }
    
    // Existing hide logic...
    this.tooltipService.hide();
  }
}
```

## Prüfkriterium "Done"
- [ ] Timeout-ID wird gespeichert und gecleant
- [ ] Document Click Listener wird korrekt entfernt
- [ ] Memory Leak Test durchgeführt
- [ ] Unit Test für Cleanup-Logik
- [ ] Manueller Test: Keine Race Conditions bei schnellem Hovern
- [ ] Code Review bestanden