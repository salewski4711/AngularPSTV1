import { Injectable, signal, computed } from '@angular/core';
import { DashboardSectionConfig } from '../../shared/components/dashboard-widget/dashboard-widget.types';

@Injectable({
  providedIn: 'root'
})
export class DashboardSectionsService {
  // Signal für die Dashboard-Sections
  private _sections = signal<DashboardSectionConfig[]>([
    {
      title: 'Kontaktmanagement',
      widgets: [
        {
          type: 'section-widget',
          title: 'Alle Kontakte',
          icon: 'users',
          route: '/contacts',
          priority: 10,
          color: 'primary'
        },
        {
          type: 'section-widget',
          title: 'Neuen Kontakt',
          icon: 'user-plus',
          route: '/contacts/new',
          priority: 9,
          color: 'primary'
        },
        {
          type: 'section-widget',
          title: 'Kontakt-Aufgaben',
          icon: 'clipboard-list',
          route: '/contacts/tasks',
          priority: 8,
          color: 'primary',
          badgeCount: '3'
        },
        {
          type: 'section-widget',
          title: 'Kalender',
          icon: 'calendar',
          route: '/contacts/calendar',
          priority: 7,
          color: 'primary'
        }
      ]
    },
    {
      title: 'Angebotsmanagement',
      widgets: [
        {
          type: 'section-widget',
          title: 'Alle Angebote',
          icon: 'document-text',
          route: '/offers',
          priority: 10,
          color: 'secondary'
        },
        {
          type: 'section-widget',
          title: 'Neues Angebot',
          icon: 'document-plus',
          route: '/offers/new',
          priority: 9,
          color: 'secondary'
        },
        {
          type: 'section-widget',
          title: 'Vorlagen',
          icon: 'document-duplicate',
          route: '/offers/templates',
          priority: 8,
          color: 'secondary'
        },
        {
          type: 'section-widget',
          title: 'Kalkulationstool',
          icon: 'calculator',
          route: '/offers/calculator',
          priority: 7,
          color: 'secondary'
        }
      ]
    },
    {
      title: 'Vertriebsstatistik',
      widgets: [
        {
          type: 'section-widget',
          title: 'Dashboard',
          icon: 'chart-bar',
          route: '/statistics/dashboard',
          priority: 10,
          color: 'success'
        },
        {
          type: 'section-widget',
          title: 'Reports',
          icon: 'document-report',
          route: '/statistics/reports',
          priority: 9,
          color: 'success'
        },
        {
          type: 'section-widget',
          title: 'Pipeline',
          icon: 'view-boards',
          route: '/statistics/pipeline',
          priority: 8,
          color: 'success'
        },
        {
          type: 'section-widget',
          title: 'Forecast',
          icon: 'trending-up',
          route: '/statistics/forecast',
          priority: 7,
          color: 'success'
        }
      ]
    },
    {
      title: 'Workflows',
      widgets: [
        {
          type: 'section-widget',
          title: 'Alle Workflows',
          icon: 'lightning-bolt',
          route: '/workflows',
          priority: 10,
          color: 'info'
        },
        {
          type: 'section-widget',
          title: 'Neuer Workflow',
          icon: 'plus-circle',
          route: '/workflows/new',
          priority: 9,
          color: 'info'
        },
        {
          type: 'section-widget',
          title: 'Automatisierung',
          icon: 'cog',
          route: '/workflows/automation',
          priority: 8,
          color: 'info'
        }
      ]
    },
    {
      title: 'Verträge',
      widgets: [
        {
          type: 'section-widget',
          title: 'Alle Verträge',
          icon: 'clipboard-list',
          route: '/contracts',
          priority: 10,
          color: 'warning'
        },
        {
          type: 'section-widget',
          title: 'Neuer Vertrag',
          icon: 'document-plus',
          route: '/contracts/new',
          priority: 9,
          color: 'warning'
        },
        {
          type: 'section-widget',
          title: 'Vorlagen',
          icon: 'document-duplicate',
          route: '/contracts/templates',
          priority: 8,
          color: 'warning'
        }
      ]
    }
  ]);
  
  // Public readonly Signal
  public readonly sections = this._sections.asReadonly();
  
  // Computed Signal für Section-Count
  public readonly sectionCount = computed(() => this._sections().length);
  
  constructor() {}
  
  /**
   * Get a specific section by index
   */
  getSection(index: number): DashboardSectionConfig | undefined {
    return this._sections()[index];
  }
  
  /**
   * Update a section
   */
  updateSection(index: number, section: DashboardSectionConfig): void {
    const sections = [...this._sections()];
    if (index >= 0 && index < sections.length) {
      sections[index] = section;
      this._sections.set(sections);
    }
  }
}