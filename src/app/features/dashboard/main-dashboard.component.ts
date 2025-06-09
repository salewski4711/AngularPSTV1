import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DashboardWidgetComponent } from '../../shared/components/dashboard-widget/dashboard-widget.component';
import { DashboardWidgetSkeletonComponent } from '../../shared/components/dashboard-widget/dashboard-widget-skeleton.component';
import { DashboardSectionComponent } from '../../shared/components/dashboard-section/dashboard-section.component';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { IconComponent } from '../../shared/icons/icon.component';
import { DashboardService } from '../../core/services/dashboard.service';
import { DashboardSectionsService } from '../../core/services/dashboard-sections.service';
import { DashboardWidgetClickEvent, DashboardSectionConfig } from '../../shared/components/dashboard-widget/dashboard-widget.types';
import { widgetListAnimation } from './animations/dashboard.animations';
import { IconName } from '../../shared/icons/icon-definitions';

@Component({
  selector: 'pst-main-dashboard',
  standalone: true,
  imports: [CommonModule, DashboardWidgetComponent, DashboardWidgetSkeletonComponent, DashboardSectionComponent, BreadcrumbComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [widgetListAnimation],
  template: `
    <div class="min-h-screen bg-gray-50 dark:bg-[var(--color-background)]">
      <div class="px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <!-- Breadcrumb Navigation -->
        @if (dashboardService.currentLevel() === 2) {
          <nav class="mb-6">
            <pst-breadcrumb 
              [items]="breadcrumbItems()"
              [separator]="'chevron'" />
          </nav>
        }
        
        <!-- Dashboard Header -->
        <header class="mb-8">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
                {{ dashboardService.dashboardTitle() }}
              </h1>
              @if (dashboardService.currentLevel() === 2) {
                <p class="mt-2 text-gray-600 dark:text-gray-400">
                  Wählen Sie eine Aktion aus oder kehren Sie zum Hauptmenü zurück
                </p>
              } @else {
                <p class="mt-2 text-gray-600 dark:text-gray-400">
                  Willkommen in Ihrem CRM Dashboard
                </p>
              }
            </div>
            @if (dashboardService.currentLevel() === 1) {
              <div class="mt-4 sm:mt-0 flex items-center gap-2">
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  Letzte Aktualisierung: {{ lastUpdate() }}
                </span>
                <button 
                  (click)="refreshDashboard()"
                  class="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  [attr.aria-label]="'Dashboard aktualisieren'">
                  <pst-icon name="refresh" [size]="20" />
                </button>
              </div>
            }
          </div>
        </header>
        
        <!-- Main Dashboard Content with Theme Sections -->
        @if (dashboardService.currentLevel() === 1) {
          <!-- Theme Sections -->
          @if (!dashboardService.loading()) {
            <div class="space-y-6">
              @for (section of dashboardSections(); track section.title) {
                <pst-dashboard-section 
                  [section]="section"
                  (widgetClick)="onWidgetClick($event)"
                />
              }
            </div>
          }
        }
        
        <!-- Loading State -->
        @if (dashboardService.loading()) {
          @if (dashboardService.currentLevel() === 1) {
            <!-- Skeleton for Theme Sections -->
            <div class="space-y-6">
              @for (i of [1, 2, 3]; track i) {
                <div class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 animate-pulse">
                  <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-5"></div>
                  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    @for (j of [1, 2, 3, 4]; track j) {
                      <div class="aspect-[2.2/1] bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
                    }
                  </div>
                </div>
              }
            </div>
          } @else {
            <!-- Original skeleton for sub-dashboards -->
            <div [class]="gridClasses()">
              @for (skeleton of getSkeletonArray(); track skeleton) {
                <div [class]="getSkeletonGridClass(skeleton)">
                  <pst-dashboard-widget-skeleton
                    [type]="skeleton.type" />
                </div>
              }
            </div>
          }
        }
        
        <!-- Widget Grid -->
        @if (!dashboardService.loading()) {
          <!-- Back button for sub-dashboards -->
          @if (dashboardService.currentLevel() === 2) {
            <!-- Back button -->
            <div class="mb-6">
              @for (widget of dashboardService.visibleWidgets(); track widget.title) {
                @if (widget.isBackButton) {
                  <pst-dashboard-widget
                    [config]="widget"
                    [variant]="'default'"
                    [size]="'small'"
                    (widgetClick)="onWidgetClick($event)"
                  />
                }
              }
            </div>
          }
          
          <!-- Sub-dashboard: Group by widget type -->
          @if (dashboardService.currentLevel() === 2) {
            <!-- Stats Row -->
            @if (statWidgets().length > 0) {
              <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                @for (widget of statWidgets(); track widget.title) {
                  <pst-dashboard-widget
                    [config]="widget"
                    [variant]="'default'"
                    [size]="'small'"
                    (widgetClick)="onWidgetClick($event)"
                  />
                }
              </div>
            }
            
            <!-- Actions Grid -->
            @if (actionWidgets().length > 0) {
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                @for (widget of actionWidgets(); track widget.title) {
                  <pst-dashboard-widget
                    [config]="widget"
                    [variant]="'default'"
                    [size]="'medium'"
                    (widgetClick)="onWidgetClick($event)"
                  />
                }
              </div>
            }
          }
        }
        
        <!-- Empty State -->
        @if (dashboardService.currentLevel() === 1 && dashboardSections().length === 0 && !dashboardService.loading()) {
          <div class="text-center py-12">
            <pst-icon name="folder-open" [size]="48" class="mx-auto text-gray-400 dark:text-gray-600 mb-4" />
            <p class="text-gray-500 dark:text-gray-400">
              Keine Sections verfügbar
            </p>
          </div>
        }
        @if (dashboardService.currentLevel() === 2 && dashboardService.visibleWidgets().length === 0 && !dashboardService.loading()) {
          <div class="text-center py-12">
            <pst-icon name="folder-open" [size]="48" class="mx-auto text-gray-400 dark:text-gray-600 mb-4" />
            <p class="text-gray-500 dark:text-gray-400">
              Keine Widgets verfügbar
            </p>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class MainDashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  // Responsive breakpoint signals
  private screenWidth = signal(window.innerWidth);
  
  // Inject dashboard sections service
  private sectionsService = inject(DashboardSectionsService);
  
  // Dashboard sections for main level
  protected dashboardSections = computed(() => {
    if (this.dashboardService.currentLevel() === 1) {
      return this.sectionsService.sections();
    }
    return [];
  });
  
  // Breadcrumb items from service
  protected breadcrumbItems = computed(() => {
    return this.dashboardService.breadcrumbItems().map(item => ({
      label: item.label,
      route: item.route
    }));
  });
  
  // Computed values für responsive Layout
  protected gridClasses = computed(() => {
    const width = this.screenWidth();
    const level = this.dashboardService.currentLevel();
    
    if (level === 1) {
      // Main dashboard: Category grid
      if (width < 640) {
        return 'grid grid-cols-1 gap-4';
      } else if (width < 1024) {
        return 'grid grid-cols-2 gap-6';
      } else {
        return 'grid grid-cols-3 xl:grid-cols-5 gap-6';
      }
    } else {
      // Sub-dashboard: Mixed widgets
      if (width < 640) {
        return 'space-y-4';
      } else if (width < 1024) {
        return 'grid grid-cols-1 md:grid-cols-2 gap-4';
      } else {
        // Group stats and actions separately
        return 'space-y-6';
      }
    }
  });
  
  // Quick stats for main dashboard
  protected quickStats = computed(() => {
    if (this.dashboardService.currentLevel() !== 1) return [];
    
    return [
      { title: 'Aktive Kunden', value: '247', trend: 12, icon: 'users' as IconName },
      { title: 'Offene Angebote', value: '34', trend: -5, icon: 'document-text' as IconName },
      { title: 'Umsatz (Monat)', value: '124.5k€', trend: 15, icon: 'currency-euro' as IconName },
      { title: 'Conversion', value: '68%', trend: 3, icon: 'trending-up' as IconName }
    ];
  });
  
  // Last update time
  protected lastUpdate = computed(() => {
    const now = new Date();
    return now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  });
  
  // Filter widgets to exclude back button from main grid
  protected getFilteredWidgets = computed(() => {
    return this.dashboardService.visibleWidgets().filter(w => !w.isBackButton);
  });
  
  // Computed signals for different widget types
  protected statWidgets = computed(() => {
    return this.getFilteredWidgets().filter(w => w.type === 'stat');
  });
  
  protected actionWidgets = computed(() => {
    return this.getFilteredWidgets().filter(w => w.type === 'action' || w.type === 'navigation');
  });
  
  public dashboardService = inject(DashboardService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  
  constructor() {
    // Responsive resize handler
    this.setupResizeListener();
  }
  
  ngOnInit(): void {
    // Load dashboard based on route
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const dashboardId = params['category'] || 'main';
        this.dashboardService.loadDashboard(dashboardId);
      });
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  /**
   * Handles widget click events
   */
  onWidgetClick(event: DashboardWidgetClickEvent): void {
    this.dashboardService.navigateToWidget(event.widget);
  }
  
  /**
   * Determines grid class for individual widgets
   */
  getWidgetGridClass(widget: any): string {
    const level = this.dashboardService.currentLevel();
    const width = this.screenWidth();
    
    if (level === 1) {
      // Main dashboard categories
      return 'col-span-1';
    } else {
      // Sub-dashboard layout
      if (widget.type === 'stat') {
        return width >= 1024 ? 'col-span-1 lg:col-span-1' : 'col-span-1';
      } else if (widget.type === 'action') {
        return width >= 1024 ? 'col-span-1 lg:col-span-2' : 'col-span-1';
      }
      return 'col-span-1';
    }
  }
  
  /**
   * Determines widget variant based on type and screen size
   */
  getWidgetVariant(): 'default' | 'compact' | 'expanded' {
    const width = this.screenWidth();
    
    if (width < 640) {
      return 'compact';
    }
    
    return 'default';
  }
  
  /**
   * Determines widget size based on type
   */
  getWidgetSize(widget: any): 'small' | 'medium' | 'large' | 'full' {
    const level = this.dashboardService.currentLevel();
    const width = this.screenWidth();
    
    if (level === 1) {
      // Main dashboard categories
      return width < 640 ? 'medium' : 'large';
    } else {
      // Sub-dashboard
      if (widget.type === 'stat') {
        return 'small';
      } else if (widget.type === 'action') {
        return 'medium';
      }
      return 'medium';
    }
  }
  
  /**
   * Refresh dashboard data
   */
  refreshDashboard(): void {
    const currentId = this.dashboardService.currentDashboard()?.id || 'main';
    this.dashboardService.loadDashboard(currentId);
  }
  
  /**
   * Sets up window resize listener for responsive layout
   */
  private setupResizeListener(): void {
    let resizeTimer: any;
    
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.screenWidth.set(window.innerWidth);
      }, 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup on destroy
    this.destroy$.subscribe(() => {
      window.removeEventListener('resize', handleResize);
    });
  }
  
  /**
   * Generates skeleton array for loading state
   */
  getSkeletonArray(): Array<{ type: 'stat' | 'action' | 'navigation' | 'category' }> {
    const level = this.dashboardService.currentLevel();
    
    if (level === 1) {
      // Main dashboard: 5 category widgets
      return [
        { type: 'category' },
        { type: 'category' },
        { type: 'category' },
        { type: 'category' },
        { type: 'category' }
      ];
    } else {
      // Sub-dashboard: mixed widget types
      return [
        { type: 'navigation' }, // Back button
        { type: 'action' },
        { type: 'action' },
        { type: 'stat' },
        { type: 'action' },
        { type: 'stat' }
      ];
    }
  }
  
  /**
   * Determines grid class for skeleton widgets
   */
  getSkeletonGridClass(skeleton: any): string {
    if (skeleton.type === 'navigation') {
      return 'col-span-1 md:col-span-2 lg:col-span-2';
    }
    return 'col-span-1';
  }
}