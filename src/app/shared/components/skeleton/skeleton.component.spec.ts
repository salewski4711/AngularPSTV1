import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SkeletonComponent } from './skeleton.component';

describe('SkeletonComponent', () => {
  let component: SkeletonComponent;
  let fixture: ComponentFixture<SkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Variants', () => {
    it('should render text variant by default', () => {
      fixture.detectChanges();
      const skeleton = fixture.debugElement.query(By.css('div'));
      expect(skeleton.nativeElement.classList.toString()).toContain('h-5'); // Default md size
    });

    it('should render circular variant', () => {
      component.variant = 'circular';
      fixture.detectChanges();
      
      const skeleton = fixture.debugElement.query(By.css('div'));
      expect(skeleton.nativeElement.classList.toString()).toContain('rounded-full');
      expect(skeleton.nativeElement.style.width).toBe('3rem'); // Default md size
      expect(skeleton.nativeElement.style.height).toBe('3rem');
    });

    it('should render rectangular variant', () => {
      component.variant = 'rectangular';
      fixture.detectChanges();
      
      const skeleton = fixture.debugElement.query(By.css('div'));
      expect(skeleton.nativeElement.classList.toString()).toContain('rounded-md');
    });

    it('should render button variant', () => {
      component.variant = 'button';
      fixture.detectChanges();
      
      const skeleton = fixture.debugElement.query(By.css('div'));
      expect(skeleton.nativeElement.classList.toString()).toContain('rounded-md');
      expect(skeleton.nativeElement.style.width).toBe('6rem'); // Default md size
      expect(skeleton.nativeElement.style.height).toBe('2.5rem');
    });
  });

  describe('Animations', () => {
    it('should apply pulse animation by default', () => {
      fixture.detectChanges();
      const skeleton = fixture.debugElement.query(By.css('div'));
      expect(skeleton.nativeElement.classList.toString()).toContain('animate-pulse');
    });

    it('should apply wave animation', () => {
      component.animation = 'wave';
      fixture.detectChanges();
      
      const skeleton = fixture.debugElement.query(By.css('div'));
      expect(skeleton.nativeElement.classList.toString()).toContain('animate-wave');
    });

    it('should apply no animation when set to none', () => {
      component.animation = 'none';
      fixture.detectChanges();
      
      const skeleton = fixture.debugElement.query(By.css('div'));
      const classes = skeleton.nativeElement.classList.toString();
      expect(classes).not.toContain('animate-pulse');
      expect(classes).not.toContain('animate-wave');
    });
  });

  describe('Sizes', () => {
    describe('Text variant sizes', () => {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
      const expectedHeights = {
        xs: 'h-3',
        sm: 'h-4',
        md: 'h-5',
        lg: 'h-6',
        xl: 'h-7'
      };

      sizes.forEach(size => {
        it(`should apply correct height for ${size} text`, () => {
          component.variant = 'text';
          component.size = size;
          fixture.detectChanges();
          
          const skeleton = fixture.debugElement.query(By.css('div'));
          expect(skeleton.nativeElement.classList.toString()).toContain(expectedHeights[size]);
        });
      });
    });

    describe('Circular variant sizes', () => {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
      const expectedSizes = {
        xs: '2rem',
        sm: '2.5rem',
        md: '3rem',
        lg: '4rem',
        xl: '5rem'
      };

      sizes.forEach(size => {
        it(`should apply correct dimensions for ${size} circular`, () => {
          component.variant = 'circular';
          component.size = size;
          fixture.detectChanges();
          
          const skeleton = fixture.debugElement.query(By.css('div'));
          expect(skeleton.nativeElement.style.width).toBe(expectedSizes[size]);
          expect(skeleton.nativeElement.style.height).toBe(expectedSizes[size]);
        });
      });
    });

    describe('Button variant sizes', () => {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
      const expectedWidths = {
        xs: '4rem',
        sm: '5rem',
        md: '6rem',
        lg: '8rem',
        xl: '10rem'
      };
      const expectedHeights = {
        xs: '1.75rem',
        sm: '2rem',
        md: '2.5rem',
        lg: '3rem',
        xl: '3.5rem'
      };

      sizes.forEach(size => {
        it(`should apply correct dimensions for ${size} button`, () => {
          component.variant = 'button';
          component.size = size;
          fixture.detectChanges();
          
          const skeleton = fixture.debugElement.query(By.css('div'));
          expect(skeleton.nativeElement.style.width).toBe(expectedWidths[size]);
          expect(skeleton.nativeElement.style.height).toBe(expectedHeights[size]);
        });
      });
    });
  });

  describe('Multiple Lines', () => {
    it('should render single line by default', () => {
      component.variant = 'text';
      fixture.detectChanges();
      
      const skeletons = fixture.debugElement.queryAll(By.css('div > div'));
      expect(skeletons.length).toBe(0); // No wrapper div for single line
    });

    it('should render multiple lines for text variant', () => {
      component.variant = 'text';
      component.lines = 3;
      fixture.detectChanges();
      
      const lines = fixture.debugElement.queryAll(By.css('div > div'));
      expect(lines.length).toBe(3);
    });

    it('should apply spacing between lines', () => {
      component.variant = 'text';
      component.lines = 2;
      component.lineSpacing = 4;
      fixture.detectChanges();
      
      const wrapper = fixture.debugElement.query(By.css('div'));
      expect(wrapper.nativeElement.classList.toString()).toContain('space-y-4');
    });

    it('should apply last line width', () => {
      component.variant = 'text';
      component.lines = 3;
      component.lastLineWidth = 60;
      fixture.detectChanges();
      
      const lines = fixture.debugElement.queryAll(By.css('div > div'));
      expect(lines[2].nativeElement.style.width).toBe('60%');
      expect(lines[0].nativeElement.style.width).toBe('');
      expect(lines[1].nativeElement.style.width).toBe('');
    });

    it('should not render multiple lines for non-text variants', () => {
      component.variant = 'circular';
      component.lines = 3;
      fixture.detectChanges();
      
      const wrapper = fixture.debugElement.query(By.css('div > div'));
      expect(wrapper).toBeFalsy();
    });
  });

  describe('Custom Dimensions', () => {
    it('should apply custom width', () => {
      component.width = '200px';
      fixture.detectChanges();
      
      const skeleton = fixture.debugElement.query(By.css('div'));
      expect(skeleton.nativeElement.style.width).toBe('200px');
    });

    it('should apply custom height', () => {
      component.height = '50px';
      fixture.detectChanges();
      
      const skeleton = fixture.debugElement.query(By.css('div'));
      expect(skeleton.nativeElement.style.height).toBe('50px');
    });

    it('should override variant dimensions with custom dimensions', () => {
      component.variant = 'circular';
      component.width = '100px';
      component.height = '100px';
      fixture.detectChanges();
      
      const skeleton = fixture.debugElement.query(By.css('div'));
      expect(skeleton.nativeElement.style.width).toBe('100px');
      expect(skeleton.nativeElement.style.height).toBe('100px');
    });
  });

  describe('Styling', () => {
    it('should apply base classes', () => {
      fixture.detectChanges();
      const skeleton = fixture.debugElement.query(By.css('div'));
      const classes = skeleton.nativeElement.classList.toString();
      
      expect(classes).toContain('bg-gray-200');
      expect(classes).toContain('dark:bg-gray-700');
    });

    it('should apply custom className', () => {
      component.className = 'custom-skeleton';
      fixture.detectChanges();
      
      const skeleton = fixture.debugElement.query(By.css('div'));
      expect(skeleton.nativeElement.classList.toString()).toContain('custom-skeleton');
    });

    it('should apply correct border radius for button variant', () => {
      component.variant = 'button';
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
      const expectedRadius = {
        xs: 'rounded',
        sm: 'rounded-md',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-lg'
      };

      sizes.forEach(size => {
        component.size = size;
        fixture.detectChanges();
        
        const skeleton = fixture.debugElement.query(By.css('div'));
        expect(skeleton.nativeElement.classList.toString()).toContain(expectedRadius[size]);
      });
    });
  });

  describe('Host Styling', () => {
    it('should have block display', () => {
      const hostElement = fixture.nativeElement;
      const computedStyle = window.getComputedStyle(hostElement);
      expect(computedStyle.display).toBe('block');
    });
  });
});