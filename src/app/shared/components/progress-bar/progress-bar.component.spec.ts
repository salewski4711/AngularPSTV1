import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressBarComponent, ProgressSegment } from './progress-bar.component';
import { signal } from '@angular/core';

describe('ProgressBarComponent', () => {
  let component: ProgressBarComponent;
  let fixture: ComponentFixture<ProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressBarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Linear Progress', () => {
    beforeEach(() => {
      component.variant = signal('linear');
    });

    it('should render linear progress bar', () => {
      component.value = signal(50);
      fixture.detectChanges();

      const progressBar = fixture.nativeElement.querySelector('[role="progressbar"]');
      expect(progressBar).toBeTruthy();
      expect(progressBar.getAttribute('aria-valuenow')).toBe('50');
      expect(progressBar.style.width).toBe('50%');
    });

    it('should calculate normalized value correctly', () => {
      component.min = signal(0);
      component.max = signal(200);
      component.value = signal(100);
      fixture.detectChanges();

      expect(component['normalizedValue']()).toBe(50);
    });

    it('should display label when showLabel is true', () => {
      component.value = signal(75);
      component.showLabel = signal(true);
      fixture.detectChanges();

      const label = fixture.nativeElement.querySelector('.text-gray-600');
      expect(label?.textContent.trim()).toBe('75%');
    });

    it('should display custom label text', () => {
      component.label = signal('Step 3 of 5');
      fixture.detectChanges();

      const label = fixture.nativeElement.querySelector('.text-gray-600');
      expect(label?.textContent.trim()).toBe('Step 3 of 5');
    });

    it('should apply correct size classes', () => {
      component.size = signal('lg');
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.h-4');
      expect(container).toBeTruthy();
    });

    it('should apply correct color classes', () => {
      component.color = signal('success');
      fixture.detectChanges();

      const progressBar = fixture.nativeElement.querySelector('.bg-green-600');
      expect(progressBar).toBeTruthy();
    });

    it('should apply animation class when animated', () => {
      component.value = signal(50);
      component.animated = signal(true);
      fixture.detectChanges();

      const progressBar = fixture.nativeElement.querySelector('.animate-progress-pulse');
      expect(progressBar).toBeTruthy();
    });
  });

  describe('Segmented Progress', () => {
    beforeEach(() => {
      component.variant = signal('segmented');
    });

    it('should render default 5 segments', () => {
      component.value = signal(60);
      fixture.detectChanges();

      const segments = fixture.nativeElement.querySelectorAll('[role="progressbar"]');
      expect(segments.length).toBe(5);
    });

    it('should render custom segments', () => {
      const customSegments: ProgressSegment[] = [
        { value: 100, label: 'Account', status: 'complete' },
        { value: 50, label: 'Profile', status: 'current' },
        { value: 0, label: 'Settings', status: 'pending' }
      ];
      component.segments = signal(customSegments);
      fixture.detectChanges();

      const segments = fixture.nativeElement.querySelectorAll('[role="progressbar"]');
      expect(segments.length).toBe(3);
    });

    it('should display segment labels', () => {
      const customSegments: ProgressSegment[] = [
        { value: 100, label: 'Account', status: 'complete' },
        { value: 50, label: 'Profile', status: 'current' }
      ];
      component.segments = signal(customSegments);
      fixture.detectChanges();

      const labels = fixture.nativeElement.querySelectorAll('.text-gray-600 span');
      expect(labels.length).toBe(2);
      expect(labels[0].textContent.trim()).toBe('Account');
      expect(labels[1].textContent.trim()).toBe('Profile');
    });

    it('should apply correct status classes', () => {
      const customSegments: ProgressSegment[] = [
        { value: 100, status: 'complete' },
        { value: 50, status: 'current' },
        { value: 0, status: 'pending' }
      ];
      component.segments = signal(customSegments);
      fixture.detectChanges();

      const segments = fixture.nativeElement.querySelectorAll('[role="progressbar"]');
      expect(segments[0].classList.contains('bg-green-600')).toBeTruthy();
      expect(segments[1].classList.contains('bg-orange-600')).toBeTruthy();
      expect(segments[2].classList.contains('bg-gray-200')).toBeTruthy();
    });
  });

  describe('Circular Progress', () => {
    beforeEach(() => {
      component.variant = signal('circular');
    });

    it('should render circular progress', () => {
      component.value = signal(75);
      fixture.detectChanges();

      const svg = fixture.nativeElement.querySelector('svg');
      expect(svg).toBeTruthy();
      expect(svg.getAttribute('role')).toBe('progressbar');
      expect(svg.getAttribute('aria-valuenow')).toBe('75');
    });

    it('should render two circles', () => {
      fixture.detectChanges();

      const circles = fixture.nativeElement.querySelectorAll('circle');
      expect(circles.length).toBe(2);
    });

    it('should calculate stroke dashoffset correctly', () => {
      component.value = signal(25);
      fixture.detectChanges();

      const circumference = 2 * Math.PI * 42; // radius = 42
      const expectedOffset = circumference - (25 / 100) * circumference;
      
      expect(component['strokeDashoffset']()).toBeCloseTo(expectedOffset, 2);
    });

    it('should display percentage when showLabel is true', () => {
      component.value = signal(80);
      component.showLabel = signal(true);
      fixture.detectChanges();

      const label = fixture.nativeElement.querySelector('.absolute span');
      expect(label?.textContent.trim()).toBe('80%');
    });

    it('should apply correct size classes', () => {
      component.size = signal('lg');
      fixture.detectChanges();

      const svg = fixture.nativeElement.querySelector('svg');
      expect(svg.classList.contains('w-32')).toBeTruthy();
      expect(svg.classList.contains('h-32')).toBeTruthy();
    });

    it('should apply correct stroke color', () => {
      component.color = signal('error');
      fixture.detectChanges();

      const progressCircle = fixture.nativeElement.querySelectorAll('circle')[1];
      expect(progressCircle.classList.contains('stroke-red-600')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      component.value = signal(60);
      component.min = signal(0);
      component.max = signal(100);
      component.ariaLabel = signal('Upload progress');
      fixture.detectChanges();

      const progressBar = fixture.nativeElement.querySelector('[role="progressbar"]');
      expect(progressBar.getAttribute('aria-valuenow')).toBe('60');
      expect(progressBar.getAttribute('aria-valuemin')).toBe('0');
      expect(progressBar.getAttribute('aria-valuemax')).toBe('100');
      expect(progressBar.getAttribute('aria-label')).toBe('Upload progress');
    });

    it('should use default aria-label when not provided', () => {
      fixture.detectChanges();

      const progressBar = fixture.nativeElement.querySelector('[role="progressbar"]');
      expect(progressBar.getAttribute('aria-label')).toBe('Progress');
    });
  });
});