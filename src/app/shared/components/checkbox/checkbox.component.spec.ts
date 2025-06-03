import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxComponent, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Basic Properties', () => {
    it('should render checkbox input', () => {
      const checkbox = fixture.debugElement.query(By.css('input[type="checkbox"]'));
      expect(checkbox).toBeTruthy();
    });

    it('should render label when provided', () => {
      component.label = 'Accept terms';
      fixture.detectChanges();
      
      const label = fixture.debugElement.query(By.css('span'));
      expect(label.nativeElement.textContent).toContain('Accept terms');
    });

    it('should show required asterisk', () => {
      component.label = 'Required field';
      component.required = true;
      fixture.detectChanges();
      
      const asterisk = fixture.debugElement.query(By.css('.text-red-500'));
      expect(asterisk.nativeElement.textContent).toBe('*');
    });
  });

  describe('Sizes', () => {
    it('should apply correct size classes', () => {
      const sizes = ['sm', 'md', 'lg'] as const;
      const expectedClasses = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6'
      };
      
      sizes.forEach(size => {
        component.size = size;
        fixture.detectChanges();
        
        const checkbox = fixture.debugElement.query(By.css('input[type="checkbox"]'));
        const classList = checkbox.nativeElement.classList.toString();
        const [width, height] = expectedClasses[size].split(' ');
        expect(classList).toContain(width);
        expect(classList).toContain(height);
      });
    });
  });

  describe('States', () => {
    it('should handle checked state', () => {
      const checkbox = fixture.debugElement.query(By.css('input[type="checkbox"]'));
      
      expect(checkbox.nativeElement.checked).toBe(false);
      
      component.writeValue(true);
      fixture.detectChanges();
      
      expect(checkbox.nativeElement.checked).toBe(true);
    });

    it('should handle indeterminate state', () => {
      component.indeterminate = true;
      fixture.detectChanges();
      
      const checkbox = fixture.debugElement.query(By.css('input[type="checkbox"]'));
      expect(checkbox.nativeElement.indeterminate).toBe(true);
    });

    it('should apply disabled state', () => {
      component.disabled = true;
      fixture.detectChanges();
      
      const checkbox = fixture.debugElement.query(By.css('input[type="checkbox"]'));
      expect(checkbox.nativeElement.disabled).toBe(true);
      expect(checkbox.nativeElement.classList.toString()).toContain('cursor-not-allowed');
    });

    it('should apply required attribute', () => {
      component.required = true;
      fixture.detectChanges();
      
      const checkbox = fixture.debugElement.query(By.css('input[type="checkbox"]'));
      expect(checkbox.nativeElement.required).toBe(true);
    });
  });

  describe('Form Integration', () => {
    it('should work with FormControl', () => {
      const control = new FormControl(false);
      component.writeValue(false);
      fixture.detectChanges();
      
      expect(component.value()).toBe(false);
    });

    it('should call onChange when checkbox is clicked', () => {
      const onChangeSpy = jasmine.createSpy('onChange');
      component.registerOnChange(onChangeSpy);
      
      const checkbox = fixture.debugElement.query(By.css('input[type="checkbox"]'));
      checkbox.nativeElement.click();
      
      expect(onChangeSpy).toHaveBeenCalledWith(true);
    });

    it('should call onTouched on blur', () => {
      const onTouchedSpy = jasmine.createSpy('onTouched');
      component.registerOnTouched(onTouchedSpy);
      
      const checkbox = fixture.debugElement.query(By.css('input[type="checkbox"]'));
      checkbox.nativeElement.dispatchEvent(new Event('focus'));
      checkbox.nativeElement.dispatchEvent(new Event('blur'));
      
      expect(onTouchedSpy).toHaveBeenCalled();
    });

    it('should toggle value on change', () => {
      const checkbox = fixture.debugElement.query(By.css('input[type="checkbox"]'));
      
      expect(component.value()).toBeFalsy();
      
      checkbox.nativeElement.checked = true;
      checkbox.nativeElement.dispatchEvent(new Event('change'));
      
      expect(component.value()).toBe(true);
      
      checkbox.nativeElement.checked = false;
      checkbox.nativeElement.dispatchEvent(new Event('change'));
      
      expect(component.value()).toBe(false);
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
      component.helperText = 'Check this box to continue';
      fixture.detectChanges();
      
      const helperText = fixture.debugElement.query(By.css('.text-gray-600'));
      expect(helperText.nativeElement.textContent).toContain('Check this box to continue');
    });

    it('should show error message when invalid', () => {
      component.showHelperText = true;
      component.errorMessage = 'This field is required';
      component['touched'].set(true);
      const mockControl = {
        invalid: true,
        errors: { required: true }
      };
      component['ngControl'] = mockControl as any;
      
      fixture.detectChanges();
      
      const errorText = fixture.debugElement.query(By.css('.text-red-500'));
      expect(errorText.nativeElement.textContent).toContain('This field is required');
    });
  });

  describe('Styling', () => {
    it('should apply proper label styling when disabled', () => {
      component.label = 'Disabled checkbox';
      component.disabled = true;
      fixture.detectChanges();
      
      const labelText = fixture.debugElement.query(By.css('span'));
      expect(labelText.nativeElement.classList.toString()).toContain('text-gray-500');
      expect(labelText.nativeElement.classList.toString()).toContain('cursor-not-allowed');
    });

    it('should have proper container classes', () => {
      const container = fixture.debugElement.query(By.css('label'));
      expect(container.nativeElement.classList.toString()).toContain('flex');
      expect(container.nativeElement.classList.toString()).toContain('items-start');
    });
  });

  describe('Accessibility', () => {
    it('should have proper label association', () => {
      component.label = 'Terms and conditions';
      fixture.detectChanges();
      
      const label = fixture.debugElement.query(By.css('label'));
      const checkbox = fixture.debugElement.query(By.css('input[type="checkbox"]'));
      
      // Label wraps the checkbox, so they are implicitly associated
      expect(label.nativeElement.contains(checkbox.nativeElement)).toBe(true);
    });

    it('should have unique IDs', () => {
      const component2 = TestBed.createComponent(CheckboxComponent).componentInstance;
      expect(component.checkboxId).not.toBe(component2.checkboxId);
    });
  });
});