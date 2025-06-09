# Task: Memory Leak in HeaderComponent beheben

## Titel
Memory Leak durch unsubscribed Observable in logout() Methode

## Beschreibung
In der HeaderComponent wird bei der logout() Methode eine Observable-Subscription erstellt, die niemals unsubscribed wird. Dies führt zu einem Memory Leak, besonders wenn der Nutzer mehrfach die Logout-Funktion aufruft.

## Betroffene Dateien
- `/mnt/c/Code/AngularV1/src/app/layouts/header/header.component.ts` (Zeile 146-148)

## Geschätzter Aufwand
1 Story Point

## Abhängigkeiten
Keine

## Lösung
```typescript
logout(): void {
  this.authService.logout().pipe(
    take(1) // Automatisches Complete nach erstem Emit
  ).subscribe(() => {
    this.router.navigate(['/auth/login']);
  });
}
```

## Prüfkriterium "Done"
- [ ] Code angepasst mit `take(1)` Operator
- [ ] Import von `take` aus 'rxjs/operators' hinzugefügt
- [ ] Unit Test erstellt, der verifiziert dass die Subscription completed
- [ ] Manueller Test: Mehrfaches Logout verursacht keine Memory Leaks
- [ ] Code Review bestanden