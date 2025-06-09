import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertComponent } from './alert.component';
import { IconComponent } from '../../icons/icon.component';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertComponent, BrowserAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Properties', () => {
    it('should have default values', () => {
      expect(component.type).toBe('info');
      expect(component.message).toBe('');
      expect(component.dismissible).toBe(true);
      expect(component.duration).toBe(5000);
    });

    it('should accept input values', () => {
      component.type = 'success';
      component.message = 'Test message';
      component.dismissible = false;
      component.duration = 10000;
      fixture.detectChanges();

      expect(component.type).toBe('success');
      expect(component.message).toBe('Test message');
      expect(component.dismissible).toBe(false);
      expect(component.duration).toBe(10000);
    });
  });

  describe('Alert Types', () => {
    const testCases = [
      { type: 'success', iconName: 'check-circle', colorClass: 'bg-green-50' },
      { type: 'error', iconName: 'x-circle', colorClass: 'bg-red-50' },
      { type: 'warning', iconName: 'alert-triangle', colorClass: 'bg-yellow-50' },
      { type: 'info', iconName: 'info', colorClass: 'bg-blue-50' }
    ];

    testCases.forEach(({ type, iconName, colorClass }) => {
      it(`should display correct icon and styling for ${type} type`, () => {
        component.type = type as any;
        component.message = `${type} message`;
        fixture.detectChanges();

        const alertElement = debugElement.query(By.css('[role="alert"]'));
        expect(alertElement.nativeElement.classList.toString()).toContain(colorClass);
        expect(component.iconName()).toBe(iconName);
      });
    });
  });

  describe('Dismissible Functionality', () => {
    it('should show close button when dismissible is true', () => {
      component.dismissible = true;
      component.message = 'Test message';
      fixture.detectChanges();

      const closeButton = debugElement.query(By.css('button[aria-label="Close alert"]'));
      expect(closeButton).toBeTruthy();
    });

    it('should hide close button when dismissible is false', () => {
      component.dismissible = false;
      component.message = 'Test message';
      fixture.detectChanges();

      const closeButton = debugElement.query(By.css('button[aria-label="Close alert"]'));
      expect(closeButton).toBeFalsy();
    });

    it('should emit closed event when close button is clicked', () => {
      let closedEmitted = false;
      component.dismissible = true;
      component.message = 'Test message';
      component.closed.subscribe(() => {
        closedEmitted = true;
      });
      fixture.detectChanges();

      const closeButton = debugElement.query(By.css('button[aria-label="Close alert"]'));
      closeButton.nativeElement.click();

      expect(closedEmitted).toBe(true);
    });
  });

  describe('Auto-dismiss Functionality', () => {
    beforeEach(() => {
      jasmine.clock().install();
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    it('should auto-dismiss after specified duration', fakeAsync(() => {
      let closedEmitted = false;
      component.duration = 3000;
      component.message = 'Test message';
      component.closed.subscribe(() => {
        closedEmitted = true;
      });
      
      fixture.detectChanges();
      component.ngOnInit();

      tick(2999);
      expect(closedEmitted).toBe(false);

      tick(1);
      expect(closedEmitted).toBe(true);
    }));

    it('should not auto-dismiss when duration is 0', fakeAsync(() => {
      let closedEmitted = false;
      component.duration = 0;
      component.message = 'Test message';
      component.closed.subscribe(() => {
        closedEmitted = true;
      });
      
      fixture.detectChanges();
      component.ngOnInit();

      tick(10000);
      expect(closedEmitted).toBe(false);
    }));

    it('should clear timeout on manual close', fakeAsync(() => {
      spyOn(window, 'clearTimeout');
      component.duration = 5000;
      component.message = 'Test message';
      fixture.detectChanges();
      component.ngOnInit();

      component.handleClose();
      expect(window.clearTimeout).toHaveBeenCalled();
    }));

    it('should clear timeout on destroy', fakeAsync(() => {
      spyOn(window, 'clearTimeout');
      component.duration = 5000;
      component.message = 'Test message';
      fixture.detectChanges();
      component.ngOnInit();

      component.ngOnDestroy();
      expect(window.clearTimeout).toHaveBeenCalled();
    }));
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      component.message = 'Test message';
      fixture.detectChanges();

      const alertElement = debugElement.query(By.css('[role="alert"]'));
      expect(alertElement.nativeElement.getAttribute('role')).toBe('alert');
      expect(alertElement.nativeElement.getAttribute('aria-live')).toBe('assertive');
      expect(alertElement.nativeElement.getAttribute('aria-atomic')).toBe('true');
    });

    it('should have proper aria-label on close button', () => {
      component.dismissible = true;
      component.message = 'Test message';
      fixture.detectChanges();

      const closeButton = debugElement.query(By.css('button'));
      expect(closeButton.nativeElement.getAttribute('aria-label')).toBe('Close alert');
    });
  });

  describe('Styling Classes', () => {
    it('should compute correct alert classes', () => {
      component.type = 'success';
      fixture.detectChanges();

      const classes = component.alertClasses();
      expect(classes).toContain('p-4');
      expect(classes).toContain('rounded-lg');
      expect(classes).toContain('border');
      expect(classes).toContain('bg-green-50');
    });

    it('should compute correct icon classes', () => {
      component.type = 'error';
      fixture.detectChanges();

      const classes = component.iconClasses();
      expect(classes).toContain('text-red-600');
    });

    it('should compute correct close button classes', () => {
      component.type = 'warning';
      fixture.detectChanges();

      const classes = component.closeButtonClasses();
      expect(classes).toContain('inline-flex');
      expect(classes).toContain('rounded-md');
      expect(classes).toContain('hover:bg-yellow-100');
    });
  });
});