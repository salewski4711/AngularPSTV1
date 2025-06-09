import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { DashboardService } from './dashboard.service';
import { DashboardWidgetConfig } from '../../shared/components/dashboard-widget/dashboard-widget.types';

describe('DashboardService', () => {
  let service: DashboardService;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        DashboardService,
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(DashboardService);
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadDashboard', () => {
    it('should load main dashboard when id is "main"', () => {
      service.loadDashboard('main');
      
      expect(service.dashboardTitle()).toBe('Dashboard');
      expect(service.currentLevel()).toBe(1);
      expect(service.visibleWidgets().length).toBeGreaterThan(0);
    });

    it('should load main dashboard when id is empty', () => {
      service.loadDashboard('');
      
      expect(service.dashboardTitle()).toBe('Dashboard');
      expect(service.currentLevel()).toBe(1);
    });

    it('should load sub-dashboard when valid id provided', () => {
      service.loadDashboard('kontakte');
      
      expect(service.dashboardTitle()).toBe('Kontaktmanagement');
      expect(service.currentLevel()).toBe(2);
      
      const widgets = service.visibleWidgets();
      expect(widgets.length).toBeGreaterThan(0);
      expect(widgets[0].isBackButton).toBe(true);
    });

    it('should not load dashboard when invalid id provided', () => {
      service.loadDashboard('invalid-dashboard');
      
      // Should keep previous state or be null
      expect(service.dashboardTitle()).toBe('Dashboard');
    });
  });

  describe('visibleWidgets', () => {
    it('should return widgets sorted by priority', () => {
      service.loadDashboard('main');
      
      const widgets = service.visibleWidgets();
      for (let i = 1; i < widgets.length; i++) {
        const prevPriority = widgets[i - 1].priority || 0;
        const currPriority = widgets[i].priority || 0;
        expect(prevPriority).toBeGreaterThanOrEqual(currPriority);
      }
    });

    it('should filter widgets by permission', () => {
      // Mock hasPermission to return false for testing
      spyOn<any>(service, 'hasPermission').and.returnValue(false);
      
      service.loadDashboard('main');
      const widgets = service.visibleWidgets();
      
      expect(widgets.length).toBe(0);
    });
  });

  describe('navigateToWidget', () => {
    it('should navigate to widget route', () => {
      const widget: DashboardWidgetConfig = {
        type: 'action',
        title: 'Test',
        icon: 'users',
        route: '/test-route'
      };
      
      service.navigateToWidget(widget);
      
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/test-route']);
    });

    it('should call navigateBack for back button widgets', () => {
      spyOn(service, 'navigateBack');
      
      const widget: DashboardWidgetConfig = {
        type: 'navigation',
        title: 'Zurück',
        icon: 'arrow-left',
        route: '/dashboard',
        isBackButton: true
      };
      
      service.navigateToWidget(widget);
      
      expect(service.navigateBack).toHaveBeenCalled();
    });

    it('should not navigate when widget has no route', () => {
      const widget: DashboardWidgetConfig = {
        type: 'stat',
        title: 'Test Stat',
        icon: 'chart-bar'
      };
      
      service.navigateToWidget(widget);
      
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });
  });

  describe('navigateBack', () => {
    it('should navigate to dashboard', () => {
      service.navigateBack();
      
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
    });

    it('should clear navigation history when navigating back', () => {
      // Load sub-dashboard to populate history
      service.loadDashboard('kontakte');
      
      service.navigateBack();
      
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
    });
  });

  describe('updateWidgetStats', () => {
    it('should update widget statistics', () => {
      service.loadDashboard('kontakte');
      
      const newStats = {
        statValue: 300,
        trend: { value: 20, direction: 'up' as const }
      };
      
      service.updateWidgetStats('Aktive Kunden', newStats);
      
      const updatedWidget = service.visibleWidgets()
        .find(w => w.title === 'Aktive Kunden');
      
      expect(updatedWidget?.statValue).toBe(300);
      expect(updatedWidget?.trend?.value).toBe(20);
    });

    it('should not update when no dashboard loaded', () => {
      // Don't load any dashboard
      const newStats = { statValue: 300 };
      
      expect(() => {
        service.updateWidgetStats('Some Widget', newStats);
      }).not.toThrow();
    });
  });

  describe('Dashboard configurations', () => {
    it('should have correct main dashboard widgets', () => {
      service.loadDashboard('main');
      const widgets = service.visibleWidgets();
      
      const expectedCategories = [
        'Kontaktmanagement',
        'Angebotsmanagement',
        'Vertriebsstatistik',
        'Workflows',
        'Vertragsmanagement'
      ];
      
      const titles = widgets.map(w => w.title);
      expectedCategories.forEach(category => {
        expect(titles).toContain(category);
      });
    });

    it('should have back button as first widget in sub-dashboards', () => {
      const subDashboards = ['kontakte', 'angebote', 'statistiken', 'workflows', 'vertraege'];
      
      subDashboards.forEach(dashboardId => {
        service.loadDashboard(dashboardId);
        const widgets = service.visibleWidgets();
        
        expect(widgets[0].isBackButton).toBe(true);
        expect(widgets[0].title).toBe('Zurück');
        expect(widgets[0].priority).toBe(100); // Highest priority
      });
    });
  });
});