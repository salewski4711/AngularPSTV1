import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ApplicationRef, EnvironmentInjector } from '@angular/core';
import { AlertService } from './alert.service';
import { AlertComponent } from './alert.component';

describe('AlertService', () => {
  let service: AlertService;
  let appRef: jasmine.SpyObj<ApplicationRef>;
  let injector: jasmine.SpyObj<EnvironmentInjector>;

  beforeEach(() => {
    const appRefSpy = jasmine.createSpyObj('ApplicationRef', ['attachView']);
    const injectorSpy = jasmine.createSpyObj('EnvironmentInjector', ['get']);

    TestBed.configureTestingModule({
      providers: [
        AlertService,
        { provide: ApplicationRef, useValue: appRefSpy },
        { provide: EnvironmentInjector, useValue: injectorSpy }
      ]
    });

    service = TestBed.inject(AlertService);
    appRef = TestBed.inject(ApplicationRef) as jasmine.SpyObj<ApplicationRef>;
    injector = TestBed.inject(EnvironmentInjector) as jasmine.SpyObj<EnvironmentInjector>;
  });

  afterEach(() => {
    // Clean up any created containers
    document.querySelectorAll('[aria-live="polite"]').forEach(el => el.remove());
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Show Methods', () => {
    it('should show success alert', () => {
      spyOn(service, 'show').and.returnValue('alert-1');
      const id = service.showSuccess('Success message');
      
      expect(service.show).toHaveBeenCalledWith({
        type: 'success',
        message: 'Success message'
      });
    });

    it('should show error alert', () => {
      spyOn(service, 'show').and.returnValue('alert-1');
      const id = service.showError('Error message');
      
      expect(service.show).toHaveBeenCalledWith({
        type: 'error',
        message: 'Error message'
      });
    });

    it('should show warning alert', () => {
      spyOn(service, 'show').and.returnValue('alert-1');
      const id = service.showWarning('Warning message');
      
      expect(service.show).toHaveBeenCalledWith({
        type: 'warning',
        message: 'Warning message'
      });
    });

    it('should show info alert', () => {
      spyOn(service, 'show').and.returnValue('alert-1');
      const id = service.showInfo('Info message');
      
      expect(service.show).toHaveBeenCalledWith({
        type: 'info',
        message: 'Info message'
      });
    });

    it('should accept additional config', () => {
      spyOn(service, 'show').and.returnValue('alert-1');
      const config = { dismissible: false, duration: 10000 };
      service.showSuccess('Message', config);
      
      expect(service.show).toHaveBeenCalledWith({
        ...config,
        type: 'success',
        message: 'Message'
      });
    });
  });

  describe('Alert Management', () => {
    it('should generate unique IDs for alerts', () => {
      const id1 = service.show({ type: 'info', message: 'Message 1' });
      const id2 = service.show({ type: 'info', message: 'Message 2' });
      
      expect(id1).not.toBe(id2);
      expect(id1).toMatch(/^alert-\d+$/);
      expect(id2).toMatch(/^alert-\d+$/);
    });

    it('should add alerts to the alerts signal', () => {
      service.show({ type: 'info', message: 'Test message' });
      
      const alerts = service.alerts();
      expect(alerts.length).toBe(1);
      expect(alerts[0].message).toBe('Test message');
      expect(alerts[0].type).toBe('info');
    });

    it('should emit alerts to the observable', (done) => {
      service.alerts$.subscribe(alerts => {
        if (alerts.length > 0) {
          expect(alerts[0].message).toBe('Observable test');
          done();
        }
      });
      
      service.show({ type: 'info', message: 'Observable test' });
    });

    it('should apply default values', () => {
      service.show({ type: 'info', message: 'Test' });
      
      const alerts = service.alerts();
      expect(alerts[0].dismissible).toBe(true);
      expect(alerts[0].duration).toBe(5000);
      expect(alerts[0].position).toBe('top-right');
    });
  });

  describe('Dismiss Functionality', () => {
    it('should dismiss specific alert', fakeAsync(() => {
      const id = service.show({ type: 'info', message: 'Test' });
      expect(service.alerts().length).toBe(1);
      
      service.dismiss(id);
      tick(200); // Wait for animation
      
      expect(service.alerts().length).toBe(0);
    }));

    it('should dismiss all alerts', fakeAsync(() => {
      service.show({ type: 'info', message: 'Test 1' });
      service.show({ type: 'error', message: 'Test 2' });
      service.show({ type: 'success', message: 'Test 3' });
      expect(service.alerts().length).toBe(3);
      
      service.dismissAll();
      tick(200); // Wait for animation
      
      expect(service.alerts().length).toBe(0);
    }));

    it('should handle dismissing non-existent alert', () => {
      expect(() => service.dismiss('non-existent')).not.toThrow();
    });
  });

  describe('Container Management', () => {
    it('should create container for each position', () => {
      const positions = ['top-right', 'top-left', 'bottom-right', 'bottom-left'] as const;
      
      positions.forEach(position => {
        service.show({ type: 'info', message: 'Test', position });
      });
      
      const containers = document.querySelectorAll('[aria-live="polite"]');
      expect(containers.length).toBe(4);
    });

    it('should reuse existing containers', () => {
      service.show({ type: 'info', message: 'Test 1', position: 'top-right' });
      service.show({ type: 'info', message: 'Test 2', position: 'top-right' });
      
      const containers = document.querySelectorAll('.top-4.right-4');
      expect(containers.length).toBe(1);
    });

    it('should apply correct position classes', () => {
      service.show({ type: 'info', message: 'Test', position: 'bottom-left' });
      
      const container = document.querySelector('.bottom-4.left-4');
      expect(container).toBeTruthy();
      expect(container?.classList.contains('fixed')).toBe(true);
      expect(container?.classList.contains('z-50')).toBe(true);
    });
  });

  describe('Alert Lifecycle', () => {
    it('should create alert component with correct properties', () => {
      const createComponentSpy = spyOn<any>(service, 'createAlertComponent');
      
      service.show({
        type: 'success',
        message: 'Test message',
        dismissible: false,
        duration: 10000
      });
      
      expect(createComponentSpy).toHaveBeenCalled();
      const alert = createComponentSpy.calls.mostRecent().args[0];
      expect(alert.type).toBe('success');
      expect(alert.message).toBe('Test message');
      expect(alert.dismissible).toBe(false);
      expect(alert.duration).toBe(10000);
    });

    it('should handle alert close event', fakeAsync(() => {
      const id = service.show({ type: 'info', message: 'Test' });
      const alerts = service.alerts();
      expect(alerts.length).toBe(1);
      
      // Simulate component close event
      service['removeAlert'](id);
      tick(200);
      
      expect(service.alerts().length).toBe(0);
    }));
  });
});