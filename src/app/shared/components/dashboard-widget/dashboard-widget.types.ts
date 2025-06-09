import { IconName } from '../../icons/icon-definitions';

/**
 * Dashboard Widget Configuration Interface
 * Definiert die Struktur für Dashboard-Widgets in der hierarchischen Navigation
 */
export interface DashboardWidgetConfig {
  /** Widget-Typ bestimmt das Verhalten und die Darstellung */
  type: 'stat' | 'action' | 'navigation' | 'category' | 'section-widget';
  
  /** Anzeige-Titel des Widgets */
  title: string;
  
  /** Icon-Name aus dem zentralen Icon-System */
  icon: IconName;
  
  /** Ziel-Route bei Klick (optional für stat widgets) */
  route?: string;
  
  /** Markiert das Widget als Zurück-Navigation */
  isBackButton?: boolean;
  
  /** Priorität für die Sortierung (höher = weiter oben) */
  priority?: number;
  
  /** Dashboard-Ebene (1 = Haupt-Dashboard, 2 = Sub-Dashboard) */
  level?: 1 | 2;
  
  /** Badge-Anzahl für Benachrichtigungen */
  badgeCount?: number | string;
  
  /** Trend-Indikator für Statistiken */
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  
  /** Erforderliche Berechtigung zur Anzeige */
  permission?: string;
  
  /** Zusätzliche Beschreibung oder Untertitel */
  description?: string;
  
  /** Farb-Schema für das Widget */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  
  /** Statistik-Wert für stat widgets */
  statValue?: string | number;
  
  /** Einheit für Statistik-Werte (z.B. '€', '%', 'Stück') */
  statUnit?: string;
  
  /** Highlight-Status für section-widgets */
  isHighlighted?: boolean;
}

/**
 * Theme-Section Konfiguration
 */
export interface DashboardSectionConfig {
  /** Section Titel */
  title: string;
  
  /** Widgets in dieser Section */
  widgets: DashboardWidgetConfig[];
}

/**
 * Dashboard-Konfiguration für eine komplette Seite
 */
export interface DashboardConfig {
  /** Eindeutige ID des Dashboards */
  id: string;
  
  /** Titel der Dashboard-Seite */
  title: string;
  
  /** Dashboard-Ebene */
  level: 1 | 2;
  
  /** Parent-Dashboard ID (für Level 2) */
  parentId?: string;
  
  /** Widget-Konfigurationen */
  widgets: DashboardWidgetConfig[];
  
  /** Theme-Sections für das Hauptdashboard */
  sections?: DashboardSectionConfig[];
}

/**
 * Widget Click Event
 */
export interface DashboardWidgetClickEvent {
  widget: DashboardWidgetConfig;
  event: MouseEvent;
}

/**
 * Widget Varianten für unterschiedliche Darstellungen
 */
export type DashboardWidgetVariant = 'default' | 'compact' | 'expanded';

/**
 * Widget Größen im Grid
 */
export type DashboardWidgetSize = 'small' | 'medium' | 'large' | 'full';