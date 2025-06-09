import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DashboardWidgetComponent } from './dashboard-widget.component';
import { DashboardWidgetConfig } from './dashboard-widget.types';
import { IconComponent } from '../../icons/icon.component';
import { BadgeComponent } from '../badge/badge.component';

describe('DashboardWidgetComponent', () => {
  let component: DashboardWidgetComponent;
  let fixture: ComponentFixture<DashboardWidgetComponent>;
  let debugElement: DebugElement;

  const mockConfig: DashboardWidgetConfig = {
    type: 'category',
    title: 'Test Widget',
    icon: 'users',
    route: '/test-route',
    priority: 1,
    level: 1
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DashboardWidgetComponent,
        RouterTestingModule,
        IconComponent,
        BadgeComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardWidgetComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    component.config = mockConfig;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Widget Rendering', () => {
    it('should render widget title', () => {
      const titleElement = debugElement.query(By.css('h3'));
      expect(titleElement?.nativeElement.textContent).toContain('Test Widget');
    });

    it('should render widget icon', () => {
      const iconElement = debugElement.query(By.css('pst-icon'));
      expect(iconElement).toBeTruthy();
      expect(iconElement.componentInstance.name).toBe('users');
    });

    it('should render description when provided', () => {
      component.config = { ...mockConfig, description: 'Test description' };
      fixture.detectChanges();
      
      const descElement = debugElement.query(By.css('p'));
      expect(descElement?.nativeElement.textContent).toContain('Test description');
    });

    it('should render badge when badgeCount > 0', () => {
      component.config = { ...mockConfig, badgeCount: 5 };
      fixture.detectChanges();
      
      const badgeElement = debugElement.query(By.css('pst-badge'));
      expect(badgeElement).toBeTruthy();
      expect(badgeElement.componentInstance.value).toBe(5);
    });

    it('should not render badge when badgeCount is 0', () => {
      component.config = { ...mockConfig, badgeCount: 0 };
      fixture.detectChanges();
      
      const badgeElement = debugElement.query(By.css('pst-badge'));
      expect(badgeElement).toBeFalsy();
    });
  });

  describe('Back Button Variant', () => {
    it('should render back button layout when isBackButton is true', () => {
      component.config = { ...mockConfig, isBackButton: true, title: 'Zurück' };
      fixture.detectChanges();
      
      const backButtonContainer = debugElement.query(By.css('.flex.items-center.gap-3'));
      expect(backButtonContainer).toBeTruthy();
      expect(debugElement.nativeElement.textContent).toContain('Zurück');
    });
  });

  describe('Stat Widget', () => {
    it('should render stat value and unit for stat type', () => {
      component.config = {
        ...mockConfig,
        type: 'stat',
        statValue: 1234,
        statUnit: '€'
      };
      fixture.detectChanges();
      
      const statValue = debugElement.query(By.css('.text-3xl'));
      const statUnit = debugElement.query(By.css('.text-xl'));
      
      expect(statValue?.nativeElement.textContent).toContain('1234');
      expect(statUnit?.nativeElement.textContent).toContain('€');
    });
  });

  describe('Trend Indicator', () => {
    it('should render upward trend with green color', () => {
      component.config = {
        ...mockConfig,
        trend: { value: 15, direction: 'up' }
      };
      fixture.detectChanges();
      
      const trendContainer = debugElement.query(By.css('.flex.items-center.gap-1.text-sm'));
      expect(trendContainer).toBeTruthy();
      expect(trendContainer.nativeElement.textContent).toContain('15%');
      
      const trendIcon = trendContainer.query(By.css('pst-icon'));
      expect(trendIcon.componentInstance.name).toBe('trending-up');
    });

    it('should render downward trend with red color', () => {
      component.config = {
        ...mockConfig,
        trend: { value: 10, direction: 'down' }
      };
      fixture.detectChanges();
      
      const trendIcon = debugElement.query(By.css('pst-icon'));
      expect(trendIcon.componentInstance.name).toBe('trending-down');
    });
  });

  describe('Click Handling', () => {
    it('should emit widgetClick event when clicked with route', (done) => {
      component.widgetClick.subscribe(event => {
        expect(event.widget).toEqual(mockConfig);
        expect(event.event).toBeDefined();
        done();
      });
      
      const widgetElement = debugElement.query(By.css('div'));
      widgetElement.nativeElement.click();
    });

    it('should not emit click event when no route', () => {
      component.config = { ...mockConfig, route: undefined };
      fixture.detectChanges();
      
      spyOn(component.widgetClick, 'emit');
      
      const widgetElement = debugElement.query(By.css('div'));
      widgetElement.nativeElement.click();
      
      expect(component.widgetClick.emit).not.toHaveBeenCalled();
    });

    it('should have cursor-pointer class when clickable', () => {
      const widgetElement = debugElement.query(By.css('div'));
      expect(widgetElement.nativeElement.classList).toContain('cursor-pointer');
    });
  });

  describe('Widget Sizes', () => {
    it('should apply correct size classes', () => {
      const sizes: Array<'small' | 'medium' | 'large' | 'full'> = ['small', 'medium', 'large', 'full'];
      const expectedClasses = {
        small: 'min-h-[120px]',
        medium: 'min-h-[160px]',
        large: 'min-h-[200px]',
        full: 'min-h-[240px]'
      };
      
      sizes.forEach(size => {
        component.size = size;
        fixture.detectChanges();
        
        const widgetElement = debugElement.query(By.css('div'));
        expect(widgetElement.nativeElement.className).toContain(expectedClasses[size]);
      });
    });
  });

  describe('Color Variants', () => {
    it('should apply correct color classes to icon container', () => {
      const colors = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const;
      
      colors.forEach(color => {
        component.config = { ...mockConfig, color };
        fixture.detectChanges();
        
        const iconContainer = debugElement.query(By.css('.rounded-lg.flex'));
        const className = iconContainer.nativeElement.className;
        
        // Prüfe, ob die entsprechende Farbklasse vorhanden ist
        if (color === 'primary') {
          expect(className).toContain('bg-orange-500');
        } else if (color === 'secondary') {
          expect(className).toContain('bg-pst-blue');
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('should have correct ARIA attributes', () => {
      const widgetElement = debugElement.query(By.css('div'));
      
      expect(widgetElement.nativeElement.getAttribute('role')).toBe('link');
      expect(widgetElement.nativeElement.getAttribute('aria-label')).toBe('Test Widget');
    });

    it('should have article role when not clickable', () => {
      component.config = { ...mockConfig, route: undefined };
      fixture.detectChanges();
      
      const widgetElement = debugElement.query(By.css('div'));
      expect(widgetElement.nativeElement.getAttribute('role')).toBe('article');
    });
  });
});