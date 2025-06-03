# Task: Jest-Angular Test Setup reparieren

## Titel
Jest-Tests schlagen fehl wegen fehlender Angular Testing Module

## Beschreibung
Alle Unit Tests schlagen fehl mit dem Fehler "Cannot find module '@angular/platform-browser-dynamic/testing'". Dies deutet auf ein Problem mit der Jest-Konfiguration für Angular v20 hin. Die jest-preset-angular Version ist möglicherweise nicht kompatibel mit Angular v20.

## Betroffene Dateien
- `/mnt/c/Code/AngularV1/setup-jest.ts`
- `/mnt/c/Code/AngularV1/jest.config.js`
- `/mnt/c/Code/AngularV1/package.json`

## Geschätzter Aufwand
3 Story Points

## Abhängigkeiten
- Muss vor allen anderen Tests gelöst werden

## Lösung
1. Überprüfe jest-preset-angular Version für Angular v20 Kompatibilität
2. Update setup-jest.ts für moderne Angular Testing Configuration
3. Möglicherweise Migration zu @angular/testing utilities notwendig

## Prüfkriterium "Done"
- [ ] Jest-Konfiguration aktualisiert
- [ ] Alle Tests laufen erfolgreich durch
- [ ] Test Coverage Report generiert
- [ ] CI Pipeline grün