import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Basic Properties', () => {
    it('should render with default properties', () => {
      const input = fixture.debugElement.query(By.css('input'));
      expect(input.nativeElement.type).toBe('text');
      expect(input.nativeElement.disabled).toBe(false);
      expect(input.nativeElement.readOnly).toBe(false);
    });

    it('should render label when provided', () => {
      component.label = 'Test Label';
      fixture.detectChanges();
      
      const label = fixture.debugElement.query(By.css('label'));
      expect(label.nativeElement.textContent).toContain('Test Label');
    });

    it('should show required asterisk when required', () => {
      component.label = 'Test Label';
      component.required = true;
      fixture.detectChanges();
      
      const asterisk = fixture.debugElement.query(By.css('.text-red-500'));
      expect(asterisk.nativeElement.textContent).toBe('*');
    });

    it('should apply different input types', () => {
      const types = ['text', 'email', 'password', 'number', 'tel', 'url', 'search'] as const;
      
      types.forEach(type => {
        component.type = type;
        fixture.detectChanges();
        
        const input = fixture.debugElement.query(By.css('input'));
        expect(input.nativeElement.type).toBe(type);
      });
    });
  });

  describe('Sizes', () => {
    it('should apply correct size classes', () => {
      const sizes = ['sm', 'md', 'lg'] as const;
      const expectedClasses = {
        sm: 'h-8',
        md: 'h-10',
        lg: 'h-12'
      };
      
      sizes.forEach(size => {
        component.size = size;
        fixture.detectChanges();
        
        const input = fixture.debugElement.query(By.css('input'));
        expect(input.nativeElement.classList.toString()).toContain(expectedClasses[size]);
      });
    });
  });

  describe('Icons', () => {
    it('should render leading icon when provided', () => {
      component.leadingIcon = 'fa fa-user';
      fixture.detectChanges();
      
      const icon = fixture.debugElement.query(By.css('.fa-user'));
      expect(icon).toBeTruthy();
    });

    it('should render trailing icon when provided', () => {
      component.trailingIcon = 'fa fa-search';
      fixture.detectChanges();
      
      const icon = fixture.debugElement.query(By.css('.fa-search'));
      expect(icon).toBeTruthy();
    });

    it('should show loading spinner when loading', () => {
      component.loading = true;
      fixture.detectChanges();
      
      const spinner = fixture.debugElement.query(By.css('.animate-spin'));
      expect(spinner).toBeTruthy();
    });
  });

  describe('States', () => {
    it('should apply disabled state', () => {
      component.disabled = true;
      fixture.detectChanges();
      
      const input = fixture.debugElement.query(By.css('input'));
      expect(input.nativeElement.disabled).toBe(true);
      expect(input.nativeElement.classList.toString()).toContain('cursor-not-allowed');
    });

    it('should apply readonly state', () => {
      component.readonly = true;
      fixture.detectChanges();
      
      const input = fixture.debugElement.query(By.css('input'));
      expect(input.nativeElement.readOnly).toBe(true);
    });
  });

  describe('Form Integration', () => {
    it('should work with FormControl', () => {
      const control = new FormControl('test value');
      component.writeValue('test value');
      fixture.detectChanges();
      
      expect(component.value()).toBe('test value');
    });

    it('should call onChange when input value changes', () => {
      const onChangeSpy = jasmine.createSpy('onChange');
      component.registerOnChange(onChangeSpy);
      
      const input = fixture.debugElement.query(By.css('input'));
      input.nativeElement.value = 'new value';
      input.nativeElement.dispatchEvent(new Event('input'));
      
      expect(onChangeSpy).toHaveBeenCalledWith('new value');
    });

    it('should call onTouched when input loses focus', () => {
      const onTouchedSpy = jasmine.createSpy('onTouched');
      component.registerOnTouched(onTouchedSpy);
      
      const input = fixture.debugElement.query(By.css('input'));
      input.nativeElement.dispatchEvent(new Event('focus'));
      input.nativeElement.dispatchEvent(new Event('blur'));
      
      expect(onTouchedSpy).toHaveBeenCalled();
    });
  });

  describe('Validation States', () => {
    it('should show error message when invalid and touched', () => {
      component.errorMessage = 'Field is required';
      component['touched'].set(true);
      
      // Mock ngControl
      const mockControl = {
        invalid: true,
        valid: false,
        errors: { required: true }
      };
      component['ngControl'] = mockControl as any;
      
      fixture.detectChanges();
      
      const errorText = fixture.debugElement.query(By.css('.text-red-500'));
      expect(errorText.nativeElement.textContent).toContain('Field is required');
    });

    it('should show success message when valid', () => {
      component.successMessage = 'Valid input';
      component['touched'].set(true);
      component['value'].set('some value');
      
      // Mock ngControl
      const mockControl = {
        invalid: false,
        valid: true,
        errors: null
      };
      component['ngControl'] = mockControl as any;
      
      fixture.detectChanges();
      
      const successText = fixture.debugElement.query(By.css('.text-green-600'));
      expect(successText.nativeElement.textContent).toContain('Valid input');
    });
  });

  describe('Helper Text', () => {
    it('should show helper text when provided', () => {
      component.helperText = 'This is a helper text';
      fixture.detectChanges();
      
      const helperText = fixture.debugElement.query(By.css('.text-gray-600'));
      expect(helperText.nativeElement.textContent).toContain('This is a helper text');
    });
  });

  describe('Accessibility', () => {
    it('should have proper label association', () => {
      component.label = 'Test Label';
      fixture.detectChanges();
      
      const label = fixture.debugElement.query(By.css('label'));
      const input = fixture.debugElement.query(By.css('input'));
      
      expect(label.nativeElement.getAttribute('for')).toBe(input.nativeElement.id);
    });

    it('should have unique IDs for each instance', () => {
      const component2 = TestBed.createComponent(InputComponent).componentInstance;
      expect(component.inputId).not.toBe(component2.inputId);
    });
  });
});