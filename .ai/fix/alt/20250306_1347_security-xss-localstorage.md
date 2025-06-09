# Task: XSS-Vulnerabilität in localStorage-Handling beheben

## Titel
Fehlende Validierung beim Speichern/Lesen von User-Daten in localStorage

## Beschreibung
Die AuthService speichert User-Daten direkt ohne Validierung in localStorage und liest sie wieder aus. Dies stellt ein Sicherheitsrisiko dar, wenn localStorage kompromittiert wird oder manipulierte Daten enthält.

## Betroffene Dateien
- `/mnt/c/Code/AngularV1/src/app/features/auth/auth.service.ts` (Zeilen 36-37, 85-86)

## Geschätzter Aufwand
3 Story Points

## Abhängigkeiten
- Eventuell Security-Utils erstellen

## Lösung
```typescript
// Neue Utility-Funktion für sicheres localStorage-Handling
private sanitizeUserData(data: any): User | null {
  if (!data || typeof data !== 'object') return null;
  
  // Whitelist approach - nur erlaubte Felder übernehmen
  const sanitized: User = {
    id: this.sanitizeString(data.id),
    email: this.sanitizeEmail(data.email),
    name: this.sanitizeString(data.name),
    role: this.sanitizeRole(data.role)
  };
  
  // Validierung
  if (!sanitized.id || !sanitized.email) return null;
  
  return sanitized;
}

private sanitizeString(value: any): string {
  if (typeof value !== 'string') return '';
  // Remove potential XSS vectors
  return value.replace(/<script[^>]*>.*?<\/script>/gi, '')
              .replace(/<[^>]+>/g, '')
              .trim();
}

private sanitizeEmail(value: any): string {
  const sanitized = this.sanitizeString(value);
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(sanitized) ? sanitized : '';
}

private sanitizeRole(value: any): string {
  const validRoles = ['admin', 'user', 'guest'];
  return validRoles.includes(value) ? value : 'user';
}

// Angepasste loadUserFromStorage
private loadUserFromStorage(): void {
  try {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const rawUser = JSON.parse(userStr);
      const sanitizedUser = this.sanitizeUserData(rawUser);
      
      if (sanitizedUser) {
        this.currentUserSubject.next(sanitizedUser);
        this.isAuthenticatedSubject.next(true);
      } else {
        // Invalid data - clear storage
        this.clearStorage();
      }
    }
  } catch (error) {
    console.error('Failed to load user from storage:', error);
    this.clearStorage();
  }
}
```

## Prüfkriterium "Done"
- [ ] Sanitization-Funktionen implementiert
- [ ] Whitelist-Approach für User-Felder
- [ ] XSS-Vektoren werden entfernt
- [ ] Unit Tests für alle Sanitization-Funktionen
- [ ] Security Review durchgeführt
- [ ] Penetration Test mit manipulierten localStorage-Daten
- [ ] Code Review bestanden