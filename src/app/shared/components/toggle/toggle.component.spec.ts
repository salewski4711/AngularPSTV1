import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ToggleComponent } from './toggle.component';

describe('ToggleComponent', () => {
  let component: ToggleComponent;
  let fixture: ComponentFixture<ToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleComponent, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Basic Properties', () => {
    it('should render toggle button', () => {
      const button = fixture.debugElement.query(By.css('button[role="switch"]'));
      expect(button).toBeTruthy();
    });

    it('should render label when provided', () => {
      component.label = 'Enable notifications';
      fixture.detectChanges();
      
      const label = fixture.debugElement.query(By.css('span'));
      expect(label.nativeElement.textContent).toContain('Enable notifications');
    });

    it('should show required asterisk', () => {
      component.label = 'Required toggle';
      component.required = true;
      fixture.detectChanges();
      
      const asterisk = fixture.debugElement.query(By.css('.text-red-500'));
      expect(asterisk.nativeElement.textContent).toBe('*');
    });
  });

  describe('Label Position', () => {
    it('should render label on the right by default', () => {
      component.label = 'Toggle label';
      fixture.detectChanges();
      
      const container = fixture.debugElement.query(By.css('.flex'));
      const children = container.nativeElement.children;
      
      expect(children[0].tagName).toBe('BUTTON');
      expect(children[1].tagName).toBe('SPAN');
    });

    it('should render label on the left when specified', () => {
      component.label = 'Toggle label';
      component.labelPosition = 'left';
      fixture.detectChanges();
      
      const container = fixture.debugElement.query(By.css('.flex'));
      const children = container.nativeElement.children;
      
      expect(children[0].tagName).toBe('SPAN');
      expect(children[1].tagName).toBe('BUTTON');
    });
  });

  describe('Sizes', () => {
    it('should apply correct size classes', () => {
      const sizes = ['sm', 'md', 'lg'] as const;
      const expectedContainerClasses = {
        sm: 'h-5 w-9',
        md: 'h-6 w-11',
        lg: 'h-7 w-14'
      };
      const expectedHandleClasses = {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6'
      };
      
      sizes.forEach(size => {
        component.size = size;
        fixture.detectChanges();
        
        const button = fixture.debugElement.query(By.css('button'));
        const handle = fixture.debugElement.query(By.css('button span'));
        
        const buttonClasses = button.nativeElement.classList.toString();
        const handleClasses = handle.nativeElement.classList.toString();
        
        const [height, width] = expectedContainerClasses[size].split(' ');
        expect(buttonClasses).toContain(height);
        expect(buttonClasses).toContain(width);
        
        const [handleHeight, handleWidth] = expectedHandleClasses[size].split(' ');
        expect(handleClasses).toContain(handleHeight);
        expect(handleClasses).toContain(handleWidth);
      });
    });
  });

  describe('Toggle State', () => {
    it('should start in off state', () => {
      const button = fixture.debugElement.query(By.css('button'));
      expect(button.nativeElement.getAttribute('aria-checked')).toBe('false');
      expect(button.nativeElement.classList.toString()).toContain('bg-gray-300');
    });

    it('should toggle to on state', () => {
      component.writeValue(true);
      fixture.detectChanges();
      
      const button = fixture.debugElement.query(By.css('button'));
      expect(button.nativeElement.getAttribute('aria-checked')).toBe('true');
      expect(button.nativeElement.classList.toString()).toContain('bg-orange-500');
    });

    it('should animate handle position', () => {
      const handle = fixture.debugElement.query(By.css('button span'));
      
      // Off state
      expect(handle.nativeElement.classList.toString()).toContain('translate-x-1');
      
      // On state
      component.writeValue(true);
      fixture.detectChanges();
      
      expect(handle.nativeElement.classList.toString()).toContain('translate-x-5');
    });
  });

  describe('States', () => {
    it('should apply disabled state', () => {
      component.disabled = true;
      fixture.detectChanges();
      
      const button = fixture.debugElement.query(By.css('button'));
      expect(button.nativeElement.disabled).toBe(true);
      expect(button.nativeElement.classList.toString()).toContain('opacity-50');
      expect(button.nativeElement.classList.toString()).toContain('cursor-not-allowed');
    });

    it('should not toggle when disabled', () => {
      component.disabled = true;
      component.writeValue(false);
      fixture.detectChanges();
      
      component.toggle();
      expect(component.value()).toBe(false);
    });
  });

  describe('Form Integration', () => {
    it('should work with FormControl', () => {
      const control = new FormControl(false);
      component.writeValue(false);
      fixture.detectChanges();
      
      expect(component.value()).toBe(false);
      
      component.writeValue(true);
      fixture.detectChanges();
      
      expect(component.value()).toBe(true);
    });

    it('should call onChange when toggled', () => {
      const onChangeSpy = jasmine.createSpy('onChange');
      component.registerOnChange(onChangeSpy);
      
      const button = fixture.debugElement.query(By.css('button'));
      button.nativeElement.click();
      
      expect(onChangeSpy).toHaveBeenCalledWith(true);
      
      button.nativeElement.click();
      
      expect(onChangeSpy).toHaveBeenCalledWith(false);
    });

    it('should call onTouched on blur', () => {
      const onTouchedSpy = jasmine.createSpy('onTouched');
      component.registerOnTouched(onTouchedSpy);
      
      const button = fixture.debugElement.query(By.css('button'));
      button.nativeElement.dispatchEvent(new Event('focus'));
      button.nativeElement.dispatchEvent(new Event('blur'));
      
      expect(onTouchedSpy).toHaveBeenCalled();
    });
  });

  describe('Helper Text', () => {
    it('should not show helper text by default', () => {
      component.helperText = 'Some help';
      fixture.detectChanges();
      
      const helperText = fixture.debugElement.query(By.css('.text-gray-600'));
      expect(helperText).toBeFalsy();
    });

    it('should show helper text when showHelperText is true', () => {
      component.showHelperText = true;
      component.helperText = 'Toggle to enable feature';
      fixture.detectChanges();
      
      const helperText = fixture.debugElement.query(By.css('.text-gray-600'));
      expect(helperText.nativeElement.textContent).toContain('Toggle to enable feature');
    });

    it('should show error message when invalid', () => {
      component.showHelperText = true;
      component.errorMessage = 'This must be enabled';
      component['touched'].set(true);
      const mockControl = {
        invalid: true,
        errors: { required: true }
      };
      component['ngControl'] = mockControl as any;
      
      fixture.detectChanges();
      
      const errorText = fixture.debugElement.query(By.css('.text-red-500'));
      expect(errorText.nativeElement.textContent).toContain('This must be enabled');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      const button = fixture.debugElement.query(By.css('button'));
      
      expect(button.nativeElement.getAttribute('role')).toBe('switch');
      expect(button.nativeElement.getAttribute('aria-checked')).toBe('false');
      
      component.writeValue(true);
      fixture.detectChanges();
      
      expect(button.nativeElement.getAttribute('aria-checked')).toBe('true');
    });

    it('should use aria-label when provided', () => {
      component.ariaLabel = 'Toggle dark mode';
      fixture.detectChanges();
      
      const button = fixture.debugElement.query(By.css('button'));
      expect(button.nativeElement.getAttribute('aria-label')).toBe('Toggle dark mode');
    });

    it('should fallback to label for aria-label', () => {
      component.label = 'Dark mode';
      fixture.detectChanges();
      
      const button = fixture.debugElement.query(By.css('button'));
      expect(button.nativeElement.getAttribute('aria-label')).toBe('Dark mode');
    });
  });

  describe('Visual Feedback', () => {
    it('should have focus ring', () => {
      const button = fixture.debugElement.query(By.css('button'));
      expect(button.nativeElement.classList.toString()).toContain('focus:ring-2');
      expect(button.nativeElement.classList.toString()).toContain('focus:ring-orange-500');
    });

    it('should have smooth transitions', () => {
      const button = fixture.debugElement.query(By.css('button'));
      const handle = fixture.debugElement.query(By.css('button span'));
      
      expect(button.nativeElement.classList.toString()).toContain('transition-colors');
      expect(handle.nativeElement.classList.toString()).toContain('transition-transform');
    });
  });
});