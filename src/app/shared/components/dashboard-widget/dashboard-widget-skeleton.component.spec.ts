import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DashboardWidgetSkeletonComponent } from './dashboard-widget-skeleton.component';
import { SkeletonComponent } from '../skeleton/skeleton.component';

describe('DashboardWidgetSkeletonComponent', () => {
  let component: DashboardWidgetSkeletonComponent;
  let fixture: ComponentFixture<DashboardWidgetSkeletonComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardWidgetSkeletonComponent, SkeletonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardWidgetSkeletonComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Widget Type Variations', () => {
    it('should render stat value skeleton for stat type', () => {
      component.type = 'stat';
      fixture.detectChanges();
      
      const statSkeleton = debugElement.query(By.css('.mt-4 pst-skeleton'));
      expect(statSkeleton).toBeTruthy();
      expect(statSkeleton.componentInstance.width).toBe(120);
      expect(statSkeleton.componentInstance.height).toBe(36);
    });

    it('should render action indicator for action type', () => {
      component.type = 'action';
      fixture.detectChanges();
      
      const actionSkeleton = debugElement.query(By.css('.absolute.bottom-4.right-4 pst-skeleton'));
      expect(actionSkeleton).toBeTruthy();
      expect(actionSkeleton.componentInstance.variant).toBe('circular');
    });

    it('should render action indicator for category type', () => {
      component.type = 'category';
      fixture.detectChanges();
      
      const actionSkeleton = debugElement.query(By.css('.absolute.bottom-4.right-4 pst-skeleton'));
      expect(actionSkeleton).toBeTruthy();
    });

    it('should not render action indicator for navigation type', () => {
      component.type = 'navigation';
      fixture.detectChanges();
      
      const actionSkeleton = debugElement.query(By.css('.absolute.bottom-4.right-4 pst-skeleton'));
      expect(actionSkeleton).toBeFalsy();
    });
  });

  describe('Conditional Elements', () => {
    it('should render badge skeleton when showBadge is true', () => {
      component.showBadge = true;
      fixture.detectChanges();
      
      const badgeSkeleton = debugElement.queryAll(By.css('pst-skeleton'))
        .find(el => el.componentInstance.width === 32 && el.componentInstance.height === 20);
      expect(badgeSkeleton).toBeTruthy();
    });

    it('should not render badge skeleton when showBadge is false', () => {
      component.showBadge = false;
      fixture.detectChanges();
      
      const badgeSkeleton = debugElement.queryAll(By.css('pst-skeleton'))
        .find(el => el.componentInstance.width === 32 && el.componentInstance.height === 20);
      expect(badgeSkeleton).toBeFalsy();
    });

    it('should render trend skeleton when showTrend is true', () => {
      component.showTrend = true;
      fixture.detectChanges();
      
      const trendSkeleton = debugElement.queryAll(By.css('pst-skeleton'))
        .find(el => el.componentInstance.width === 60 && el.componentInstance.height === 16);
      expect(trendSkeleton).toBeTruthy();
    });

    it('should render description skeleton when showDescription is true', () => {
      component.showDescription = true;
      fixture.detectChanges();
      
      const descSkeleton = debugElement.queryAll(By.css('pst-skeleton'))
        .find(el => el.componentInstance.width === 220 && el.componentInstance.height === 16);
      expect(descSkeleton).toBeTruthy();
    });
  });

  describe('Base Elements', () => {
    it('should always render icon skeleton', () => {
      const iconSkeleton = debugElement.query(By.css('pst-skeleton[variant="circular"]'));
      expect(iconSkeleton).toBeTruthy();
      expect(iconSkeleton.componentInstance.width).toBe(48);
      expect(iconSkeleton.componentInstance.height).toBe(48);
    });

    it('should always render title skeleton', () => {
      const titleSkeleton = debugElement.queryAll(By.css('pst-skeleton'))
        .find(el => el.componentInstance.width === 180 && el.componentInstance.height === 24);
      expect(titleSkeleton).toBeTruthy();
    });

    it('should have correct container styling', () => {
      const container = debugElement.query(By.css('.relative.h-full.p-6'));
      expect(container).toBeTruthy();
      expect(container.nativeElement.classList).toContain('bg-white');
      expect(container.nativeElement.classList).toContain('dark:bg-black-lighter');
      expect(container.nativeElement.classList).toContain('rounded-lg');
    });
  });
});