# 🎯 REFACTORING MASTERPLAN - ProSolarTec CRM

## Übersicht

Dieser Masterplan definiert die komplette Refactoring-Strategie zur Behebung von DRY/SOLID-Verletzungen und zur Einführung eines einheitlichen Design Token Systems.

## 🔴 Kritische Probleme

1. **4 verschiedene Token-Definitionen** ohne Single Source of Truth
2. **Hardcodierte Werte** in allen Komponenten
3. **SOLID-Verletzungen** in Services (NavigationService: 236 Zeilen, DashboardService: 687 Zeilen)
4. **Keine Token-Nutzung** trotz vorhandener Definitionen
5. **Duplizierte Konfigurationen** in fast jeder Komponente

## 📋 Phasen-Übersicht

### Phase 1: Design Token System (1-2 Wochen)
- Style Dictionary Setup
- Token-Migration
- Build-Pipeline Integration

### Phase 2: Komponenten-Refactoring (2-3 Wochen)
- Token-basierte Utility-Klassen
- Komponenten-Migration
- Visual Testing Setup

### Phase 3: Service-Architektur (1-2 Wochen)
- Service-Aufteilung
- Interface-Definition
- Dependency Injection

### Phase 4: Qualitätssicherung (fortlaufend)
- Automatisierte Tests
- Pre-Commit Hooks
- CI/CD Integration

## 🚀 Parallelisierung

### Team-Aufteilung (5-10 Agents)
1. **Token-Agent**: Design Token Migration
2. **Component-Agent A**: Atoms (Button, Input, Badge, etc.)
3. **Component-Agent B**: Molecules (Card, Modal, etc.)
4. **Component-Agent C**: Organisms (Navigation, etc.)
5. **Service-Agent**: Service-Refactoring
6. **Test-Agent**: Test-Erstellung
7. **Visual-Test-Agent**: Puppeteer Screenshots
8. **Documentation-Agent**: Dokumentation
9. **Quality-Agent**: Code-Reviews
10. **Integration-Agent**: Build-Pipeline

## 📊 Erfolgs-Metriken

- ✅ 100% Token-Nutzung (keine hardcodierten Werte)
- ✅ Alle Services < 100 Zeilen
- ✅ 100% Test-Abdeckung für kritische Pfade
- ✅ Visual Tests für alle Showcase-Komponenten
- ✅ Automatische Token-Synchronisation

## 🔗 Verwandte Dokumente

- [01-DESIGN-TOKEN-SYSTEM.md](./01-DESIGN-TOKEN-SYSTEM.md)
- [02-KOMPONENTEN-STANDARDS.md](./02-KOMPONENTEN-STANDARDS.md)
- [03-SERVICE-ARCHITEKTUR.md](./03-SERVICE-ARCHITEKTUR.md)
- [04-PARALLELISIERUNGS-PLAN.md](./04-PARALLELISIERUNGS-PLAN.md)
- [05-AUTOMATISIERTE-TEST-STRATEGIE.md](./05-AUTOMATISIERTE-TEST-STRATEGIE.md)

## ⚡ Quick Start

```bash
# 1. Style Dictionary installieren
npm install --save-dev style-dictionary

# 2. Token Build ausführen
npm run tokens:build

# 3. Tests ausführen
npm test

# 4. Visual Tests
npm run test:visual
```

## 🚦 Status-Tracking

| Phase | Status | Fortschritt | Verantwortlich |
|-------|--------|-------------|----------------|
| Design Tokens | 🔴 Nicht gestartet | 0% | Token-Agent |
| Komponenten | 🔴 Nicht gestartet | 0% | Component-Agents |
| Services | 🔴 Nicht gestartet | 0% | Service-Agent |
| Tests | 🔴 Nicht gestartet | 0% | Test-Agents |