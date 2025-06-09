# Dashboard Migration Task - Hierarchische Widget-Navigation

## 🎯 Projektübersicht
Migration des ProSolarTec CRM Dashboards mit **hierarchischer Widget-Navigation**:
- **Level 1:** Haupt-Dashboard (Kategorie-Widgets)
- **Level 2:** Sub-Dashboards (spezifische Action-Widgets)
- **Navigation:** Ausschließlich Widget-basiert (KEINE Sidebar!)
- **Responsive:** Einheitliche Widget-UX für Desktop/Tablet/Mobile

**Zielsystem:** C:\Code\AngularV1  
**Prefix Schema:** `pst-` (bereits etabliert)

## 🏗️ Hierarchische Widget-Struktur

### Level 1: Haupt-Dashboard (`/dashboard`)
1. **[Widget] Kontaktmanagement** → `/dashboard/kontakte`
2. **[Widget] Angebotsmanagement** → `/dashboard/angebote` 
3. **[Widget] Vertriebsstatistik** → `/dashboard/statistiken`
4. **[Widget] Workflows** → `/dashboard/workflows`
5. **[Widget] Vertragsmanagement** → `/dashboard/vertraege`

### Level 2: Sub-Dashboards
**Jedes Sub-Dashboard enthält:**
- **[Widget] ← Zurück** (erstes Widget)
- **[Widgets] Spezifische Actions** für die Kategorie

## 📱🖥️ Responsive Layouts
- **Desktop:** 4-6 Spalten Grid
- **Tablet:** 2-3 Spalten Grid  
- **Mobile:** 1-2 Spalten Grid

## 🔧 Widget-Interface

```typescript
interface DashboardWidgetConfig {
  type: 'stat' | 'action' | 'navigation' | 'category';
  title: string;
  icon: IconName;
  route?: string;
  isBackButton?: boolean;
  priority?: number;
  level?: 1 | 2;
  badgeCount?: number;
  trend?: { value: number; direction: 'up' | 'down' };
  permission?: string;
}
```
