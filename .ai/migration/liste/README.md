# Entity List View - MSW + 100k Performance

## 📁 **Dateien in diesem Verzeichnis**

### 1. `ENTITY-LIST-VIEW-PROMPT.md` ⚡
**HAUPTDATEI für Claude Code** - MSW + 100k Performance Implementation.

### 2. `PERFORMANCE-100K-UPDATE.md`
**Performance-Anforderungen** für große Datensätze.

### 3. `entity-list-view-task.md`
**Technische Spezifikation** mit UI-Struktur.

## 🎯 **MSW + 100k Performance**

### **MSW bereits konfiguriert!** ✅
- `src/mocks/handlers.ts` - API-Endpoints
- `src/mocks/data/customers.mock.ts` - Mock-Daten
- Nur **Frontend-Development** nötig

### **Performance-Strategie für 100k:**
⚡ **Virtual Scrolling** - PFLICHT (sonst Browser-Crash)  
⚡ **MSW-Simulation** - Server-side Paginierung/Search/Filter  
⚡ **Infinite Scrolling** - Progressive Loading  
⚡ **Cache-Management** - Max 1000 Entitäten im Speicher

### **MSW-Vorteile:**
- Realistische API-Latenz-Simulation
- 100k Datensätze ohne echtes Backend
- Performance-Tests mit realistischen Daten
- Unabhängige Frontend-Entwicklung

## 🚀 **Für Claude Code**

**Hauptdatei:** `ENTITY-LIST-VIEW-PROMPT.md`

**Prompt:** "Implementiere High-Performance Entity List mit MSW für 100k+ Datensätze basierend auf ENTITY-LIST-VIEW-PROMPT.md"

### **Komponente:** `pst-entity-list-view`
- Virtual Scrolling + MSW-Integration
- Wiederverwendbar für Kontakte/Verträge/Angebote
- Performance-optimiert für 100k+ Datensätze

**Geschätzte Zeit:** 8-10 Arbeitstage (MSW vereinfacht Development)
**Priorität:** Hoch (nach Dashboard-Migration)
