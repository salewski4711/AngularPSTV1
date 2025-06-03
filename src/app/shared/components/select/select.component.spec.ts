import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SelectComponent } from './select.component';
import { SelectOption } from './select.types';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  const mockOptions: SelectOption[] = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3', disabled: true }
  ];

  const mockGroupedOptions: SelectOption[] = [
    { value: 'de', label: 'Germany', group: 'Europe' },
    { value: 'fr', label: 'France', group: 'Europe' },
    { value: 'us', label: 'United States', group: 'Americas' },
    { value: 'ca', label: 'Canada', group: 'Americas' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectComponent, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    component.options = mockOptions;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Basic Properties', () => {
    it('should render options', () => {
      const options = fixture.debugElement.queryAll(By.css('option'));
      // +1 for placeholder option
      expect(options.length).toBe(mockOptions.length + 1);
    });

    it('should render placeholder', () => {
      component.placeholder = 'Choose an option';
      fixture.detectChanges();
      
      const placeholder = fixture.debugElement.query(By.css('option[value=""]'));
      expect(placeholder.nativeElement.textContent).toContain('Choose an option');
    });

    it('should disable options when specified', () => {
      const options = fixture.debugElement.queryAll(By.css('option'));
      const disabledOption = options.find(opt => opt.nativeElement.textContent.trim() === 'Option 3');
      expect(disabledOption?.nativeElement.disabled).toBe(true);
    });

    it('should render label when provided', () => {
      component.label = 'Select Label';
      fixture.detectChanges();
      
      const label = fixture.debugElement.query(By.css('label'));
      expect(label.nativeElement.textContent).toContain('Select Label');
    });
  });

  describe('Grouped Options', () => {
    beforeEach(() => {
      component.options = mockGroupedOptions;
      fixture.detectChanges();
    });

    it('should detect grouped options', () => {
      expect(component.hasGroups()).toBe(true);
    });

    it('should render option groups', () => {
      const groups = fixture.debugElement.queryAll(By.css('optgroup'));
      expect(groups.length).toBe(2);
    });

    it('should render correct group labels', () => {
      const groups = fixture.debugElement.queryAll(By.css('optgroup'));
      expect(groups[0].nativeElement.label).toBe('Europe');
      expect(groups[1].nativeElement.label).toBe('Americas');
    });

    it('should render options within groups', () => {
      const europeGroup = fixture.debugElement.query(By.css('optgroup[label="Europe"]'));
      const europeOptions = europeGroup.queryAll(By.css('option'));
      expect(europeOptions.length).toBe(2);
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
        
        const select = fixture.debugElement.query(By.css('select'));
        expect(select.nativeElement.classList.toString()).toContain(expectedClasses[size]);
      });
    });
  });

  describe('States', () => {
    it('should apply disabled state', () => {
      component.disabled = true;
      fixture.detectChanges();
      
      const select = fixture.debugElement.query(By.css('select'));
      expect(select.nativeElement.disabled).toBe(true);
    });

    it('should apply required attribute', () => {
      component.required = true;
      fixture.detectChanges();
      
      const select = fixture.debugElement.query(By.css('select'));
      expect(select.nativeElement.required).toBe(true);
    });
  });

  describe('Form Integration', () => {
    it('should work with FormControl', () => {
      component.writeValue('2');
      fixture.detectChanges();
      
      expect(component.value()).toBe('2');
      const select = fixture.debugElement.query(By.css('select'));
      expect(select.nativeElement.value).toBe('2');
    });

    it('should call onChange when selection changes', () => {
      const onChangeSpy = jasmine.createSpy('onChange');
      component.registerOnChange(onChangeSpy);
      
      const select = fixture.debugElement.query(By.css('select'));
      select.nativeElement.value = '2';
      select.nativeElement.dispatchEvent(new Event('change'));
      
      expect(onChangeSpy).toHaveBeenCalledWith('2');
    });

    it('should handle empty value when allowEmpty is false', () => {
      component.allowEmpty = false;
      fixture.detectChanges();
      
      const placeholder = fixture.debugElement.query(By.css('option[value=""]'));
      expect(placeholder.nativeElement.disabled).toBe(true);
    });

    it('should convert empty string to null', () => {
      const onChangeSpy = jasmine.createSpy('onChange');
      component.registerOnChange(onChangeSpy);
      component.allowEmpty = true;
      fixture.detectChanges();
      
      const select = fixture.debugElement.query(By.css('select'));
      select.nativeElement.value = '';
      select.nativeElement.dispatchEvent(new Event('change'));
      
      expect(onChangeSpy).toHaveBeenCalledWith(null);
    });
  });

  describe('Validation States', () => {
    it('should show error state when invalid', () => {
      component['touched'].set(true);
      const mockControl = {
        invalid: true,
        valid: false,
        errors: { required: true }
      };
      component['ngControl'] = mockControl as any;
      
      fixture.detectChanges();
      
      const select = fixture.debugElement.query(By.css('select'));
      expect(select.nativeElement.classList.toString()).toContain('border-red-500');
    });
  });

  describe('Helper Text', () => {
    it('should show helper text', () => {
      component.helperText = 'Select one option';
      fixture.detectChanges();
      
      const helperText = fixture.debugElement.query(By.css('.text-gray-600'));
      expect(helperText.nativeElement.textContent).toContain('Select one option');
    });

    it('should show error message when invalid', () => {
      component.errorMessage = 'Selection is required';
      component['touched'].set(true);
      const mockControl = {
        invalid: true,
        errors: { required: true }
      };
      component['ngControl'] = mockControl as any;
      
      fixture.detectChanges();
      
      const errorText = fixture.debugElement.query(By.css('.text-red-500'));
      expect(errorText.nativeElement.textContent).toContain('Selection is required');
    });
  });

  describe('Visual Elements', () => {
    it('should always show dropdown icon', () => {
      const icon = fixture.debugElement.query(By.css('svg'));
      expect(icon).toBeTruthy();
      expect(icon.nativeElement.parentElement.classList.toString()).toContain('pointer-events-none');
    });
  });

  describe('Accessibility', () => {
    it('should have proper label association', () => {
      component.label = 'Country';
      fixture.detectChanges();
      
      const label = fixture.debugElement.query(By.css('label'));
      const select = fixture.debugElement.query(By.css('select'));
      
      expect(label.nativeElement.getAttribute('for')).toBe(select.nativeElement.id);
    });

    it('should have unique IDs', () => {
      const component2 = TestBed.createComponent(SelectComponent).componentInstance;
      expect(component.selectId).not.toBe(component2.selectId);
    });
  });
});