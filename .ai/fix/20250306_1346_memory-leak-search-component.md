# Task: Memory Leak und Race Condition in SearchComponent beheben

## Titel
Uncancelled setTimeout in onBlur() führt zu Memory Leak und Race Conditions

## Beschreibung
Die SearchComponent verwendet setTimeout in der onBlur() Methode ohne die Timeout-ID zu speichern und in ngOnDestroy zu clearen. Dies kann zu Memory Leaks und Race Conditions führen, wenn die Component zerstört wird während der Timeout noch läuft.

## Betroffene Dateien
- `/mnt/c/Code/AngularV1/src/app/shared/components/search/search.component.ts` (Zeile 87)

## Geschätzter Aufwand
1 Story Point

## Abhängigkeiten
Keine

## Lösung
```typescript
export class SearchComponent implements OnInit, OnDestroy {
  private blurTimeout?: number;
  
  onBlur(): void {
    // Clear existing timeout if any
    if (this.blurTimeout) {
      clearTimeout(this.blurTimeout);
    }
    
    this.blurTimeout = window.setTimeout(() => {
      this.showDropdown = false;
    }, 200);
  }

  ngOnDestroy(): void {
    // Clear timeout if still pending
    if (this.blurTimeout) {
      clearTimeout(this.blurTimeout);
    }
    
    // Existing cleanup code
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

## Prüfkriterium "Done"
- [ ] Code angepasst mit Timeout-Tracking
- [ ] window.setTimeout verwendet für TypeScript Typing
- [ ] Timeout in ngOnDestroy gecleant
- [ ] Unit Test für Timeout-Cleanup erstellt
- [ ] Manueller Test: Keine Race Conditions bei schnellem Component-Wechsel
- [ ] Code Review bestanden