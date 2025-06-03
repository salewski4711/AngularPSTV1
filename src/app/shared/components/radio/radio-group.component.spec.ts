import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RadioGroupComponent } from './radio-group.component';
import { RadioOption } from './radio.types';

describe('RadioGroupComponent', () => {
  let component: RadioGroupComponent;
  let fixture: ComponentFixture<RadioGroupComponent>;

  const mockOptions: RadioOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2', helperText: 'Recommended' },
    { value: 'option3', label: 'Option 3', disabled: true }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioGroupComponent, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RadioGroupComponent);
    component = fixture.componentInstance;
    component.options = mockOptions;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Basic Properties', () => {
    it('should render all radio options', () => {
      const radios = fixture.debugElement.queryAll(By.css('input[type="radio"]'));
      expect(radios.length).toBe(mockOptions.length);
    });

    it('should render labels for each option', () => {
      const labels = fixture.debugElement.queryAll(By.css('label span'));
      expect(labels[0].nativeElement.textContent.trim()).toBe('Option 1');
      expect(labels[1].nativeElement.textContent.trim()).toBe('Option 2');
      expect(labels[2].nativeElement.textContent.trim()).toBe('Option 3');
    });

    it('should render helper text when provided', () => {
      const helperTexts = fixture.debugElement.queryAll(By.css('.text-xs'));
      expect(helperTexts.length).toBe(1);
      expect(helperTexts[0].nativeElement.textContent).toContain('Recommended');
    });

    it('should render group label when provided', () => {
      component.label = 'Select an option';
      fixture.detectChanges();
      
      const legend = fixture.debugElement.query(By.css('legend'));
      expect(legend.nativeElement.textContent).toContain('Select an option');
    });

    it('should show required asterisk', () => {
      component.label = 'Required selection';
      component.required = true;
      fixture.detectChanges();
      
      const asterisk = fixture.debugElement.query(By.css('.text-red-500'));
      expect(asterisk.nativeElement.textContent).toBe('*');
    });
  });

  describe('Radio Group Behavior', () => {
    it('should use same name for all radios in group', () => {
      const radios = fixture.debugElement.queryAll(By.css('input[type="radio"]'));
      const groupName = radios[0].nativeElement.name;
      
      radios.forEach(radio => {
        expect(radio.nativeElement.name).toBe(groupName);
      });
    });

    it('should have unique group names for different instances', () => {
      const component2 = TestBed.createComponent(RadioGroupComponent).componentInstance;
      expect(component.groupName).not.toBe(component2.groupName);
    });

    it('should only allow one selection', () => {
      const radios = fixture.debugElement.queryAll(By.css('input[type="radio"]'));
      
      // Select first option
      component.handleChange('option1');
      fixture.detectChanges();
      expect(component.value()).toBe('option1');
      
      // Select second option
      component.handleChange('option2');
      fixture.detectChanges();
      expect(component.value()).toBe('option2');
    });
  });

  describe('Orientation', () => {
    it('should render vertically by default', () => {
      const container = fixture.debugElement.query(By.css('.flex'));
      expect(container.nativeElement.classList.toString()).toContain('flex-col');
    });

    it('should render horizontally when specified', () => {
      component.orientation = 'horizontal';
      fixture.detectChanges();
      
      const container = fixture.debugElement.query(By.css('.flex'));
      expect(container.nativeElement.classList.toString()).toContain('flex-row');
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
        
        const radio = fixture.debugElement.query(By.css('input[type="radio"]'));
        const classList = radio.nativeElement.classList.toString();
        const [width, height] = expectedClasses[size].split(' ');
        expect(classList).toContain(width);
        expect(classList).toContain(height);
      });
    });
  });

  describe('States', () => {
    it('should disable individual options', () => {
      const radios = fixture.debugElement.queryAll(By.css('input[type="radio"]'));
      expect(radios[2].nativeElement.disabled).toBe(true);
    });

    it('should disable entire group', () => {
      component.disabled = true;
      fixture.detectChanges();
      
      const radios = fixture.debugElement.queryAll(By.css('input[type="radio"]'));
      radios.forEach(radio => {
        expect(radio.nativeElement.disabled).toBe(true);
      });
    });

    it('should apply required attribute', () => {
      component.required = true;
      fixture.detectChanges();
      
      const radios = fixture.debugElement.queryAll(By.css('input[type="radio"]'));
      radios.forEach(radio => {
        expect(radio.nativeElement.required).toBe(true);
      });
    });
  });

  describe('Form Integration', () => {
    it('should work with FormControl', () => {
      component.writeValue('option2');
      fixture.detectChanges();
      
      expect(component.value()).toBe('option2');
      expect(component.isChecked('option2')).toBe(true);
    });

    it('should call onChange when selection changes', () => {
      const onChangeSpy = jasmine.createSpy('onChange');
      component.registerOnChange(onChangeSpy);
      
      const radios = fixture.debugElement.queryAll(By.css('input[type="radio"]'));
      radios[1].nativeElement.click();
      radios[1].nativeElement.dispatchEvent(new Event('change'));
      
      expect(onChangeSpy).toHaveBeenCalledWith('option2');
    });

    it('should not change value when disabled', () => {
      component.disabled = true;
      component.writeValue('option1');
      fixture.detectChanges();
      
      component.handleChange('option2');
      expect(component.value()).toBe('option1');
    });
  });

  describe('Helper Text', () => {
    it('should show group helper text', () => {
      component.helperText = 'Select one option from the list';
      fixture.detectChanges();
      
      const helperText = fixture.debugElement.query(By.css('.mt-3'));
      expect(helperText.nativeElement.textContent).toContain('Select one option from the list');
    });

    it('should show error message when invalid', () => {
      component.errorMessage = 'Please select an option';
      component['touched'].set(true);
      const mockControl = {
        invalid: true,
        errors: { required: true }
      };
      component['ngControl'] = mockControl as any;
      
      fixture.detectChanges();
      
      const errorText = fixture.debugElement.query(By.css('.text-red-500'));
      expect(errorText.nativeElement.textContent).toContain('Please select an option');
    });
  });

  describe('Styling', () => {
    it('should apply proper styling to disabled options', () => {
      const labels = fixture.debugElement.queryAll(By.css('label'));
      const disabledLabel = labels[2].query(By.css('span'));
      
      expect(disabledLabel.nativeElement.classList.toString()).toContain('text-gray-500');
      expect(disabledLabel.nativeElement.classList.toString()).toContain('cursor-not-allowed');
    });

    it('should apply error styling to legend when invalid', () => {
      component.label = 'Selection';
      component['touched'].set(true);
      const mockControl = {
        invalid: true,
        errors: { required: true }
      };
      component['ngControl'] = mockControl as any;
      
      fixture.detectChanges();
      
      const legend = fixture.debugElement.query(By.css('legend'));
      expect(legend.nativeElement.classList.toString()).toContain('text-red-600');
    });
  });

  describe('isChecked method', () => {
    it('should return true for selected value', () => {
      component.writeValue('option1');
      expect(component.isChecked('option1')).toBe(true);
      expect(component.isChecked('option2')).toBe(false);
    });

    it('should return false when no value selected', () => {
      expect(component.isChecked('option1')).toBe(false);
    });
  });
});