import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MainDashboardComponent } from './main-dashboard.component';
import { DashboardService } from '../../core/services/dashboard.service';
import { DashboardWidgetComponent } from '../../shared/components/dashboard-widget/dashboard-widget.component';

describe('MainDashboardComponent', () => {
  let component: MainDashboardComponent;
  let fixture: ComponentFixture<MainDashboardComponent>;
  let mockDashboardService: jasmine.SpyObj<DashboardService>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    // Mock Dashboard Service
    mockDashboardService = jasmine.createSpyObj('DashboardService', [
      'loadDashboard',
      'navigateToWidget',
      'dashboardTitle',
      'currentLevel',
      'visibleWidgets'
    ]);
    
    // Set up signal-like behavior for computed properties
    mockDashboardService.dashboardTitle = jasmine.createSpy().and.returnValue('Test Dashboard');
    mockDashboardService.currentLevel = jasmine.createSpy().and.returnValue(1);
    mockDashboardService.visibleWidgets = jasmine.createSpy().and.returnValue([
      {
        type: 'category',
        title: 'Test Widget',
        icon: 'users',
        route: '/test',
        priority: 1
      }
    ]);
    
    // Mock ActivatedRoute
    mockActivatedRoute = {
      params: of({ category: 'main' })
    };

    await TestBed.configureTestingModule({
      imports: [
        MainDashboardComponent,
        RouterTestingModule,
        DashboardWidgetComponent
      ],
      providers: [
        { provide: DashboardService, useValue: mockDashboardService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MainDashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load dashboard on init', () => {
    fixture.detectChanges();
    
    expect(mockDashboardService.loadDashboard).toHaveBeenCalledWith('main');
  });

  it('should load sub-dashboard when category param is provided', async () => {
    mockActivatedRoute.params = of({ category: 'kontakte' });
    
    fixture.detectChanges();
    await fixture.whenStable();
    
    expect(mockDashboardService.loadDashboard).toHaveBeenCalledWith('kontakte');
  });

  it('should display dashboard title', () => {
    fixture.detectChanges();
    
    const titleElement = fixture.nativeElement.querySelector('h1');
    expect(titleElement.textContent).toContain('Test Dashboard');
  });

  it('should display widgets', () => {
    fixture.detectChanges();
    
    const widgetElements = fixture.nativeElement.querySelectorAll('pst-dashboard-widget');
    expect(widgetElements.length).toBe(1);
  });

  it('should show empty state when no widgets', () => {
    mockDashboardService.visibleWidgets = jasmine.createSpy().and.returnValue([]);
    
    fixture.detectChanges();
    
    const emptyState = fixture.nativeElement.querySelector('.text-center.py-12');
    expect(emptyState).toBeTruthy();
    expect(emptyState.textContent).toContain('Keine Widgets verfügbar');
  });

  it('should handle widget click', () => {
    const mockWidget = {
      type: 'action' as const,
      title: 'Test Action',
      icon: 'document-text' as any,
      route: '/test-action'
    };
    
    const clickEvent = {
      widget: mockWidget,
      event: new MouseEvent('click')
    };
    
    component.onWidgetClick(clickEvent);
    
    expect(mockDashboardService.navigateToWidget).toHaveBeenCalledWith(mockWidget);
  });

  describe('Responsive Layout', () => {
    it('should use single column on mobile', () => {
      // @ts-ignore - accessing private for testing
      component['screenWidth'].set(320);
      fixture.detectChanges();
      
      const gridClasses = component['gridClasses']();
      expect(gridClasses).toContain('grid-cols-1');
    });

    it('should use 2-3 columns on tablet', () => {
      // @ts-ignore - accessing private for testing
      component['screenWidth'].set(768);
      fixture.detectChanges();
      
      const gridClasses = component['gridClasses']();
      expect(gridClasses).toContain('grid-cols-2');
      expect(gridClasses).toContain('md:grid-cols-3');
    });

    it('should use 4-6 columns on desktop', () => {
      // @ts-ignore - accessing private for testing
      component['screenWidth'].set(1920);
      fixture.detectChanges();
      
      const gridClasses = component['gridClasses']();
      expect(gridClasses).toContain('lg:grid-cols-3');
    });
  });

  describe('Widget Sizing', () => {
    it('should use compact variant on mobile', () => {
      // @ts-ignore - accessing private for testing
      component['screenWidth'].set(320);
      
      expect(component.getWidgetVariant()).toBe('compact');
    });

    it('should use default variant on larger screens', () => {
      // @ts-ignore - accessing private for testing
      component['screenWidth'].set(1024);
      
      expect(component.getWidgetVariant()).toBe('default');
    });

    it('should use large size for main dashboard', () => {
      mockDashboardService.currentLevel = jasmine.createSpy().and.returnValue(1);
      // @ts-ignore - accessing private for testing
      component['screenWidth'].set(1024);
      
      expect(component.getWidgetSize()).toBe('large');
    });

    it('should use medium size for sub-dashboard', () => {
      mockDashboardService.currentLevel = jasmine.createSpy().and.returnValue(2);
      // @ts-ignore - accessing private for testing
      component['screenWidth'].set(1024);
      
      expect(component.getWidgetSize()).toBe('medium');
    });
  });

  describe('Widget Grid Classes', () => {
    it('should span multiple columns for back button', () => {
      const backWidget = { isBackButton: true };
      
      const gridClass = component.getWidgetGridClass(backWidget);
      expect(gridClass).toContain('md:col-span-2');
    });

    it('should use single column for stat widgets', () => {
      const statWidget = { type: 'stat', title: 'Test', icon: 'chart-bar' as any };
      
      const gridClass = component.getWidgetGridClass(statWidget);
      expect(gridClass).toBe('col-span-1');
    });
  });

  afterEach(() => {
    fixture.destroy();
  });
});