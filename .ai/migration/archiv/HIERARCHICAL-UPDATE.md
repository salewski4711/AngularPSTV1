# ⚡ HIERARCHISCHE NAVIGATION - Update für Claude Code

## 🎯 NEUE ANFORDERUNG: 2-Level Widget-Navigation

### Dashboard-Hierarchie:
- **Level 1:** `/dashboard` (Kategorie-Widgets → Sub-Dashboards)
- **Level 2:** `/dashboard/kategorie` (Action-Widgets + Zurück-Button)

### Widget-Typen ERWEITERT:
```typescript
interface DashboardWidgetConfig {
  type: 'stat' | 'action' | 'navigation' | 'category';
  title: string;
  icon: IconName;
  route?: string;
  isBackButton?: boolean;  // NEU - für ← Zurück Widgets
  priority?: number;       // NEU - Widget-Reihenfolge
  level?: 1 | 2;          // NEU - Dashboard-Level
  // ... bestehende Properties
}
```

### Sub-Dashboard Beispiel:
```typescript
// /dashboard/angebote
ANGEBOTE_WIDGETS = [
  { title: '← Zurück', route: '/dashboard', isBackButton: true, priority: 1 },
  { title: 'Alle Angebote', route: '/offers' },
  { title: 'Gedruckte Angebote', type: 'action' },
  { title: 'Neue Angebote', type: 'action' }
];
```

### Routing ERWEITERT:
- `/dashboard/kontakte` → Kontakte Sub-Dashboard
- `/dashboard/angebote` → Angebote Sub-Dashboard  
- `/dashboard/statistiken` → Statistiken Sub-Dashboard
- `/dashboard/workflows` → Workflows Sub-Dashboard
- `/dashboard/vertraege` → Verträge Sub-Dashboard

### Responsive Design:
- **Desktop:** 4-6 Spalten Widget-Grid
- **Tablet:** 2-3 Spalten Widget-Grid
- **Mobile:** 1-2 Spalten Widget-Grid
- **KEINE Sidebar** - nur Widgets auf allen Geräten!

**🚀 Start:** Erweitere Dashboard-Widget um `isBackButton` und `priority`
