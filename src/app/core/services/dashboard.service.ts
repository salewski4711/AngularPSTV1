import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardConfig, DashboardWidgetConfig } from '../../shared/components/dashboard-widget/dashboard-widget.types';

/**
 * Dashboard Service
 * Verwaltet die hierarchische Widget-Navigation und Dashboard-Konfigurationen
 */
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  // Signal für aktuelle Dashboard-Konfiguration
  private _currentDashboard = signal<DashboardConfig | null>(null);
  
  // Signal für Navigation History (für Back-Navigation)
  private navigationHistory = signal<string[]>([]);
  
  // Signal für Loading State
  private isLoading = signal<boolean>(false);
  
  // Public readonly Signal für Loading State
  public readonly loading = this.isLoading.asReadonly();
  
  // Public readonly Signal for current dashboard
  public readonly currentDashboard = this._currentDashboard.asReadonly();
  
  // Computed Signal für sichtbare Widgets (mit Berechtigungsfilterung)
  public visibleWidgets = computed(() => {
    const dashboard = this._currentDashboard();
    if (!dashboard) return [];
    
    return dashboard.widgets
      .filter(widget => this.hasPermission(widget.permission))
      .sort((a, b) => (b.priority || 0) - (a.priority || 0));
  });
  
  // Computed Signal für Dashboard-Titel
  public dashboardTitle = computed(() => this._currentDashboard()?.title || 'Dashboard');
  
  // Computed Signal für aktuelle Ebene
  public currentLevel = computed(() => this._currentDashboard()?.level || 1);
  
  // Computed Signal für Breadcrumb Items
  public breadcrumbItems = computed(() => {
    const current = this._currentDashboard();
    if (!current) return [];
    
    const items = [
      { label: 'Dashboard', route: '/dashboard', icon: 'home' }
    ];
    
    if (current.level === 2) {
      items.push({
        label: current.title,
        route: `/dashboard/${current.id}`,
        icon: this.getCategoryIcon(current.id)
      });
    }
    
    return items;
  });
  
  private router = inject(Router);
  
  constructor() {}
  
  /**
   * Haupt-Dashboard Konfiguration (Level 1)
   */
  private mainDashboardConfig: DashboardConfig = {
    id: 'main',
    title: 'Dashboard',
    level: 1,
    widgets: [
      {
        type: 'category',
        title: 'Kontakte',
        icon: 'users',
        route: '/dashboard/kontakte',
        priority: 5,
        color: 'primary',
        description: 'Verwalten Sie Kunden, Leads und Ansprechpartner',
        badgeCount: 12
      },
      {
        type: 'category',
        title: 'Angebote',
        icon: 'document-text',
        route: '/dashboard/angebote',
        priority: 4,
        color: 'secondary',
        description: 'Erstellen und verfolgen Sie Ihre Angebote',
        badgeCount: 5
      },
      {
        type: 'category',
        title: 'Statistiken',
        icon: 'chart-bar',
        route: '/dashboard/statistiken',
        priority: 3,
        color: 'success',
        description: 'Analysieren Sie Umsätze und KPIs'
      },
      {
        type: 'category',
        title: 'Workflows',
        icon: 'lightning-bolt',
        route: '/dashboard/workflows',
        priority: 2,
        color: 'info',
        description: 'Automatisieren Sie Ihre Prozesse'
      },
      {
        type: 'category',
        title: 'Verträge',
        icon: 'clipboard-list',
        route: '/dashboard/vertraege',
        priority: 1,
        color: 'warning',
        description: 'Verwalten Sie Verträge und Dokumente'
      }
    ]
  };
  
  /**
   * Sub-Dashboard Konfigurationen (Level 2)
   */
  private subDashboardConfigs: Record<string, DashboardConfig> = {
    'kontakte': {
      id: 'kontakte',
      title: 'Kontaktmanagement',
      level: 2,
      parentId: 'main',
      widgets: [
        {
          type: 'navigation',
          title: 'Zurück zum Dashboard',
          icon: 'arrow-left',
          route: '/dashboard',
          isBackButton: true,
          priority: 100
        },
        {
          type: 'stat',
          title: 'Aktive Kunden',
          icon: 'user-check',
          statValue: 247,
          statUnit: '',
          priority: 11,
          color: 'success',
          trend: { value: 12, direction: 'up' }
        },
        {
          type: 'stat',
          title: 'Neue Leads',
          icon: 'sparkles',
          statValue: 34,
          statUnit: 'diese Woche',
          priority: 10,
          color: 'info',
          trend: { value: 8, direction: 'up' }
        },
        {
          type: 'stat',
          title: 'Conversion Rate',
          icon: 'trending-up',
          statValue: 24,
          statUnit: '%',
          priority: 9,
          color: 'warning',
          trend: { value: 3, direction: 'up' }
        },
        {
          type: 'stat',
          title: 'Gesamt Kontakte',
          icon: 'users',
          statValue: '100k+',
          statUnit: '',
          priority: 8,
          color: 'primary'
        },
        {
          type: 'action',
          title: 'Neuen Kontakt anlegen',
          icon: 'user-plus',
          route: '/contacts/new',
          priority: 7,
          color: 'primary',
          description: 'Kunde oder Lead erfassen'
        },
        {
          type: 'action',
          title: 'Kontaktliste anzeigen',
          icon: 'users',
          route: '/contacts',
          priority: 6,
          color: 'primary',
          description: 'Alle Kontakte durchsuchen'
        },
        {
          type: 'action',
          title: 'Lead-Verwaltung',
          icon: 'lightning-bolt',
          route: '/leads',
          priority: 5,
          color: 'info',
          description: 'Leads qualifizieren und konvertieren'
        },
        {
          type: 'action',
          title: 'Import/Export',
          icon: 'cloud-upload',
          route: '/contacts/import',
          priority: 4,
          color: 'secondary',
          description: 'Bulk-Import & Export von Kontakten'
        }
      ]
    },
    'angebote': {
      id: 'angebote',
      title: 'Angebotsmanagement',
      level: 2,
      parentId: 'main',
      widgets: [
        {
          type: 'navigation',
          title: 'Zurück zum Dashboard',
          icon: 'arrow-left',
          route: '/dashboard',
          isBackButton: true,
          priority: 100
        },
        {
          type: 'stat',
          title: 'Offene Angebote',
          icon: 'clock',
          statValue: 34,
          statUnit: '',
          priority: 11,
          color: 'warning',
          trend: { value: 5, direction: 'down' }
        },
        {
          type: 'stat',
          title: 'Angebotssumme',
          icon: 'currency-euro',
          statValue: '892k',
          statUnit: '€',
          priority: 10,
          color: 'primary',
          trend: { value: 12, direction: 'up' }
        },
        {
          type: 'stat',
          title: 'Erfolgsquote',
          icon: 'check-circle',
          statValue: 68,
          statUnit: '%',
          priority: 9,
          color: 'success',
          trend: { value: 3, direction: 'up' }
        },
        {
          type: 'stat',
          title: 'Ø Bearbeitungszeit',
          icon: 'chart-bar',
          statValue: 3.2,
          statUnit: 'Tage',
          priority: 8,
          color: 'info'
        },
        {
          type: 'action',
          title: 'Neues Angebot erstellen',
          icon: 'document-plus',
          route: '/offers/new',
          priority: 7,
          color: 'primary',
          description: 'Schnell ein neues Angebot anlegen'
        },
        {
          type: 'action',
          title: 'Angebotsliste',
          icon: 'document-text',
          route: '/offers',
          priority: 6,
          color: 'primary',
          description: 'Alle Angebote verwalten'
        },
        {
          type: 'action',
          title: 'Angebotsvorlagen',
          icon: 'duplicate',
          route: '/offers/templates',
          priority: 5,
          color: 'secondary',
          description: 'Vorlagen erstellen und bearbeiten'
        },
        {
          type: 'action',
          title: 'Kalkulationstool',
          icon: 'calculator',
          route: '/offers/calculator',
          priority: 4,
          color: 'info',
          description: 'PV-Anlagen kalkulieren'
        }
      ]
    },
    'statistiken': {
      id: 'statistiken',
      title: 'Vertriebsstatistik',
      level: 2,
      parentId: 'main',
      widgets: [
        {
          type: 'navigation',
          title: 'Zurück zum Dashboard',
          icon: 'arrow-left',
          route: '/dashboard',
          isBackButton: true,
          priority: 100
        },
        {
          type: 'stat',
          title: 'Umsatz (Monat)',
          icon: 'currency-euro',
          statValue: '124.5k',
          statUnit: '€',
          priority: 11,
          color: 'success',
          trend: { value: 15, direction: 'up' }
        },
        {
          type: 'stat',
          title: 'Pipeline-Wert',
          icon: 'chart-pie',
          statValue: '892.3k',
          statUnit: '€',
          priority: 10,
          color: 'info'
        },
        {
          type: 'stat',
          title: 'Abschlussquote',
          icon: 'trending-up',
          statValue: 24,
          statUnit: '%',
          priority: 9,
          color: 'warning',
          trend: { value: 2, direction: 'down' }
        },
        {
          type: 'stat',
          title: 'Neue Kunden',
          icon: 'user-plus',
          statValue: 18,
          statUnit: 'diesen Monat',
          priority: 8,
          color: 'primary',
          trend: { value: 20, direction: 'up' }
        },
        {
          type: 'action',
          title: 'Umsatzreports',
          icon: 'document-report',
          route: '/reports',
          priority: 7,
          color: 'primary',
          description: 'Detaillierte Umsatzanalysen'
        },
        {
          type: 'action',
          title: 'Prognosen & Trends',
          icon: 'presentation-chart-line',
          route: '/forecasts',
          priority: 6,
          color: 'secondary',
          description: 'Zukünftige Entwicklungen'
        },
        {
          type: 'action',
          title: 'KPI Dashboard',
          icon: 'chart-bar',
          route: '/kpi',
          priority: 5,
          color: 'info',
          description: 'Alle Kennzahlen im Überblick'
        },
        {
          type: 'action',
          title: 'Export & Download',
          icon: 'download',
          route: '/reports/export',
          priority: 4,
          color: 'secondary',
          description: 'Berichte herunterladen'
        }
      ]
    },
    'workflows': {
      id: 'workflows',
      title: 'Workflows & Automatisierung',
      level: 2,
      parentId: 'main',
      widgets: [
        {
          type: 'navigation',
          title: 'Zurück zum Dashboard',
          icon: 'arrow-left',
          route: '/dashboard',
          isBackButton: true,
          priority: 100
        },
        {
          type: 'stat',
          title: 'Aktive Workflows',
          icon: 'play-circle',
          statValue: 18,
          statUnit: '',
          priority: 11,
          color: 'success'
        },
        {
          type: 'stat',
          title: 'Ausgeführte Tasks',
          icon: 'check-circle',
          statValue: '1.2k',
          statUnit: 'diese Woche',
          priority: 10,
          color: 'info',
          trend: { value: 8, direction: 'up' }
        },
        {
          type: 'stat',
          title: 'Eingesparte Zeit',
          icon: 'clock',
          statValue: 47,
          statUnit: 'Stunden',
          priority: 9,
          color: 'primary'
        },
        {
          type: 'stat',
          title: 'Fehlerquote',
          icon: 'exclamation-circle',
          statValue: 0.3,
          statUnit: '%',
          priority: 8,
          color: 'danger',
          trend: { value: 15, direction: 'down' }
        },
        {
          type: 'action',
          title: 'Workflow-Übersicht',
          icon: 'template',
          route: '/workflow',
          priority: 7,
          color: 'primary',
          description: 'Alle Workflows verwalten'
        },
        {
          type: 'action',
          title: 'Workflow erstellen',
          icon: 'plus-circle',
          route: '/workflow/new',
          priority: 6,
          color: 'primary',
          description: 'Neuen Workflow anlegen'
        },
        {
          type: 'action',
          title: 'Workflow-Editor',
          icon: 'pencil',
          route: '/workflow/editor',
          priority: 5,
          color: 'secondary',
          description: 'Workflows visuell bearbeiten'
        },
        {
          type: 'action',
          title: 'Vorlagen-Bibliothek',
          icon: 'collection',
          route: '/workflow/templates',
          priority: 4,
          color: 'info',
          description: 'Vorgefertigte Workflows nutzen'
        }
      ]
    },
    'vertraege': {
      id: 'vertraege',
      title: 'Vertragsmanagement',
      level: 2,
      parentId: 'main',
      widgets: [
        {
          type: 'navigation',
          title: 'Zurück zum Dashboard',
          icon: 'arrow-left',
          route: '/dashboard',
          isBackButton: true,
          priority: 100
        },
        {
          type: 'stat',
          title: 'Aktive Verträge',
          icon: 'shield-check',
          statValue: 156,
          statUnit: '',
          priority: 11,
          color: 'success'
        },
        {
          type: 'stat',
          title: 'Vertragswert',
          icon: 'currency-euro',
          statValue: '2.4M',
          statUnit: '€',
          priority: 10,
          color: 'primary',
          trend: { value: 22, direction: 'up' }
        },
        {
          type: 'stat',
          title: 'Auslaufend',
          icon: 'exclamation-circle',
          statValue: 8,
          statUnit: 'nächste 30 Tage',
          priority: 9,
          color: 'warning'
        },
        {
          type: 'stat',
          title: 'Verlängerungsquote',
          icon: 'refresh',
          statValue: 87,
          statUnit: '%',
          priority: 8,
          color: 'info',
          trend: { value: 5, direction: 'up' }
        },
        {
          type: 'action',
          title: 'Neuen Vertrag anlegen',
          icon: 'document-add',
          route: '/contracts/new',
          priority: 7,
          color: 'primary',
          description: 'Vertrag erstellen und verwalten'
        },
        {
          type: 'action',
          title: 'Vertragsliste',
          icon: 'clipboard-list',
          route: '/contracts',
          priority: 6,
          color: 'primary',
          description: 'Alle Verträge im Überblick'
        },
        {
          type: 'action',
          title: 'Dokumentenverwaltung',
          icon: 'folder-open',
          route: '/documents',
          priority: 5,
          color: 'secondary',
          description: 'Vertragsdokumente organisieren'
        },
        {
          type: 'action',
          title: 'Verlängerungen',
          icon: 'calendar',
          route: '/contracts/renewals',
          priority: 4,
          color: 'warning',
          description: 'Anstehende Verlängerungen'
        }
      ]
    }
  };
  
  /**
   * Lädt Dashboard-Konfiguration basierend auf Route
   */
  loadDashboard(dashboardId: string): void {
    // Set loading state
    this.isLoading.set(true);
    
    // Simulate async loading (in real app would be HTTP call)
    setTimeout(() => {
      let config: DashboardConfig | null = null;
      
      if (dashboardId === 'main' || !dashboardId) {
        config = this.mainDashboardConfig;
      } else {
        config = this.subDashboardConfigs[dashboardId] || null;
      }
      
      if (config) {
        this._currentDashboard.set(config);
        
        // Update Navigation History
        if (config.level === 2) {
          this.navigationHistory.update(history => [...history, dashboardId]);
        } else {
          this.navigationHistory.set([]);
        }
      }
      
      // Clear loading state
      this.isLoading.set(false);
    }, 300); // Simulated network delay
  }
  
  /**
   * Navigiert zu einem Widget
   */
  navigateToWidget(widget: DashboardWidgetConfig): void {
    if (widget.route) {
      if (widget.isBackButton) {
        this.navigateBack();
      } else {
        this.router.navigate([widget.route]);
      }
    }
  }
  
  /**
   * Navigiert zur vorherigen Ebene
   */
  navigateBack(): void {
    const history = this.navigationHistory();
    if (history.length > 0) {
      history.pop();
      this.navigationHistory.set([...history]);
    }
    this.router.navigate(['/dashboard']);
  }
  
  /**
   * Prüft Berechtigungen (Mock-Implementierung)
   */
  private hasPermission(_permission?: string): boolean {
    // TODO: Echte Berechtigungsprüfung implementieren
    return true;
  }
  
  /**
   * Holt Widget-Statistiken (für Live-Updates)
   */
  updateWidgetStats(widgetId: string, stats: Partial<DashboardWidgetConfig>): void {
    const dashboard = this._currentDashboard();
    if (!dashboard) {
      return;
    }
    
    const updatedWidgets = dashboard.widgets.map(widget => {
      if (widget.title === widgetId) {
        return { ...widget, ...stats };
      }
      return widget;
    });
    
    this._currentDashboard.set({
      ...dashboard,
      widgets: updatedWidgets
    });
  }
  
  /**
   * Holt das Icon für eine Kategorie
   */
  private getCategoryIcon(categoryId: string): string {
    const iconMap: Record<string, string> = {
      'kontakte': 'users',
      'angebote': 'document-text',
      'statistiken': 'chart-bar',
      'workflows': 'template',
      'vertraege': 'clipboard-list'
    };
    
    return iconMap[categoryId] || 'folder';
  }
}