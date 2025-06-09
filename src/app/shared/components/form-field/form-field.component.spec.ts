import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormFieldComponent } from './form-field.component';

// Test host component
@Component({
  template: `
    <pst-form-field
      [label]="label"
      [name]="name"
      [required]="required"
      [error]="error"
      [helpText]="helpText"
      [labelClass]="labelClass"
      [errorClass]="errorClass"
      [helpTextClass]="helpTextClass"
    >
      <input 
        #input
        type="text" 
        class="w-full px-3 py-2 border border-gray-300 rounded-md"
        [value]="value"
      />
    </pst-form-field>
  `,
  standalone: true,
  imports: [FormFieldComponent]
})
class TestHostComponent {
  label = 'Test Label';
  name = 'testField';
  required = false;
  error?: string;
  helpText?: string;
  labelClass?: string;
  errorClass?: string;
  helpTextClass?: string;
  value = '';
}

describe('FormFieldComponent', () => {
  let component: FormFieldComponent;
  let fixture: ComponentFixture<FormFieldComponent>;
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldComponent, TestHostComponent]
    }).compileComponents();

    // Create standalone component
    fixture = TestBed.createComponent(FormFieldComponent);
    component = fixture.componentInstance;
    
    // Create host component for integration tests
    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Label rendering', () => {
    it('should render label when provided', () => {
      const labelElement = hostFixture.debugElement.query(By.css('label'));
      expect(labelElement).toBeTruthy();
      expect(labelElement.nativeElement.textContent).toContain('Test Label');
    });

    it('should not render label when not provided', () => {
      hostComponent.label = undefined;
      hostFixture.detectChanges();
      
      const labelElement = hostFixture.debugElement.query(By.css('label'));
      expect(labelElement).toBeFalsy();
    });

    it('should render required indicator when required is true', () => {
      hostComponent.required = true;
      hostFixture.detectChanges();
      
      const requiredIndicator = hostFixture.debugElement.query(By.css('label span'));
      expect(requiredIndicator).toBeTruthy();
      expect(requiredIndicator.nativeElement.textContent).toBe('*');
      expect(requiredIndicator.nativeElement.classList).toContain('text-red-500');
    });

    it('should not render required indicator when required is false', () => {
      hostComponent.required = false;
      hostFixture.detectChanges();
      
      const requiredIndicator = hostFixture.debugElement.query(By.css('label span'));
      expect(requiredIndicator).toBeFalsy();
    });

    it('should apply custom label class', () => {
      hostComponent.labelClass = 'custom-label-class';
      hostFixture.detectChanges();
      
      const labelElement = hostFixture.debugElement.query(By.css('label'));
      expect(labelElement.nativeElement.classList).toContain('custom-label-class');
    });

    it('should apply error styles to label when error is present', () => {
      hostComponent.error = 'Field is required';
      hostFixture.detectChanges();
      
      const labelElement = hostFixture.debugElement.query(By.css('label'));
      expect(labelElement.nativeElement.classList).toContain('text-red-600');
      expect(labelElement.nativeElement.classList).toContain('dark:text-red-400');
    });
  });

  describe('Error message rendering', () => {
    it('should render error message when error is provided', () => {
      hostComponent.error = 'This field is required';
      hostFixture.detectChanges();
      
      const errorElement = hostFixture.debugElement.query(By.css('p'));
      expect(errorElement).toBeTruthy();
      expect(errorElement.nativeElement.textContent).toContain('This field is required');
      expect(errorElement.nativeElement.classList).toContain('text-red-500');
    });

    it('should not render error message when error is not provided', () => {
      hostComponent.error = undefined;
      hostFixture.detectChanges();
      
      const errorElements = hostFixture.debugElement.queryAll(By.css('p'));
      const errorElement = errorElements.find(el => 
        el.nativeElement.classList.contains('text-red-500')
      );
      expect(errorElement).toBeFalsy();
    });

    it('should render error icon', () => {
      hostComponent.error = 'Error message';
      hostFixture.detectChanges();
      
      const iconElement = hostFixture.debugElement.query(By.css('svg'));
      expect(iconElement).toBeTruthy();
      expect(iconElement.nativeElement.classList).toContain('w-3.5');
      expect(iconElement.nativeElement.classList).toContain('h-3.5');
    });

    it('should apply custom error class', () => {
      hostComponent.error = 'Error message';
      hostComponent.errorClass = 'custom-error-class';
      hostFixture.detectChanges();
      
      const errorElement = hostFixture.debugElement.query(By.css('p.text-red-500'));
      expect(errorElement.nativeElement.classList).toContain('custom-error-class');
    });
  });

  describe('Help text rendering', () => {
    it('should render help text when provided and no error', () => {
      hostComponent.helpText = 'This is help text';
      hostComponent.error = undefined;
      hostFixture.detectChanges();
      
      const helpElement = hostFixture.debugElement.query(By.css('p.text-gray-500'));
      expect(helpElement).toBeTruthy();
      expect(helpElement.nativeElement.textContent).toBe('This is help text');
    });

    it('should not render help text when error is present', () => {
      hostComponent.helpText = 'This is help text';
      hostComponent.error = 'Error message';
      hostFixture.detectChanges();
      
      const helpElement = hostFixture.debugElement.query(By.css('p.text-gray-500'));
      expect(helpElement).toBeFalsy();
    });

    it('should apply custom help text class', () => {
      hostComponent.helpText = 'Help text';
      hostComponent.helpTextClass = 'custom-help-class';
      hostFixture.detectChanges();
      
      const helpElement = hostFixture.debugElement.query(By.css('p.text-gray-500'));
      expect(helpElement.nativeElement.classList).toContain('custom-help-class');
    });
  });

  describe('Content projection', () => {
    it('should project input element', () => {
      const inputElement = hostFixture.debugElement.query(By.css('input'));
      expect(inputElement).toBeTruthy();
      expect(inputElement.nativeElement.type).toBe('text');
    });

    it('should set ID on projected input element', (done) => {
      // Wait for AfterContentInit
      setTimeout(() => {
        const inputElement = hostFixture.debugElement.query(By.css('input'));
        const labelElement = hostFixture.debugElement.query(By.css('label'));
        
        expect(inputElement.nativeElement.id).toBeTruthy();
        expect(labelElement.nativeElement.getAttribute('for')).toBe(inputElement.nativeElement.id);
        done();
      }, 0);
    });

    it('should set name attribute on projected input when provided', (done) => {
      hostComponent.name = 'testFieldName';
      hostFixture.detectChanges();
      
      setTimeout(() => {
        const inputElement = hostFixture.debugElement.query(By.css('input'));
        expect(inputElement.nativeElement.name).toBe('testFieldName');
        done();
      }, 0);
    });
  });

  describe('Component styling', () => {
    it('should apply default label styles', () => {
      const labelElement = hostFixture.debugElement.query(By.css('label'));
      expect(labelElement.nativeElement.classList).toContain('text-sm');
      expect(labelElement.nativeElement.classList).toContain('font-medium');
      expect(labelElement.nativeElement.classList).toContain('mb-1.5');
      expect(labelElement.nativeElement.classList).toContain('block');
    });

    it('should apply default error styles', () => {
      hostComponent.error = 'Error';
      hostFixture.detectChanges();
      
      const errorElement = hostFixture.debugElement.query(By.css('p.text-red-500'));
      expect(errorElement.nativeElement.classList).toContain('text-xs');
      expect(errorElement.nativeElement.classList).toContain('mt-1');
      expect(errorElement.nativeElement.classList).toContain('flex');
      expect(errorElement.nativeElement.classList).toContain('items-start');
    });

    it('should apply default help text styles', () => {
      hostComponent.helpText = 'Help';
      hostFixture.detectChanges();
      
      const helpElement = hostFixture.debugElement.query(By.css('p.text-gray-500'));
      expect(helpElement.nativeElement.classList).toContain('text-xs');
      expect(helpElement.nativeElement.classList).toContain('mt-1');
    });
  });

  describe('Different form elements', () => {
    it('should work with select element', (done) => {
      @Component({
        template: `
          <pst-form-field label="Select Field">
            <select #select class="w-full">
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </select>
          </pst-form-field>
        `,
        standalone: true,
        imports: [FormFieldComponent]
      })
      class SelectTestComponent {}

      const selectFixture = TestBed.createComponent(SelectTestComponent);
      selectFixture.detectChanges();

      setTimeout(() => {
        const selectElement = selectFixture.debugElement.query(By.css('select'));
        const labelElement = selectFixture.debugElement.query(By.css('label'));
        
        expect(selectElement.nativeElement.id).toBeTruthy();
        expect(labelElement.nativeElement.getAttribute('for')).toBe(selectElement.nativeElement.id);
        done();
      }, 0);
    });

    it('should work with textarea element', (done) => {
      @Component({
        template: `
          <pst-form-field label="Textarea Field">
            <textarea #textarea class="w-full"></textarea>
          </pst-form-field>
        `,
        standalone: true,
        imports: [FormFieldComponent]
      })
      class TextareaTestComponent {}

      const textareaFixture = TestBed.createComponent(TextareaTestComponent);
      textareaFixture.detectChanges();

      setTimeout(() => {
        const textareaElement = textareaFixture.debugElement.query(By.css('textarea'));
        const labelElement = textareaFixture.debugElement.query(By.css('label'));
        
        expect(textareaElement.nativeElement.id).toBeTruthy();
        expect(labelElement.nativeElement.getAttribute('for')).toBe(textareaElement.nativeElement.id);
        done();
      }, 0);
    });
  });
});