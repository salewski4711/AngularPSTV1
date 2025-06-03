import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DividerComponent } from './divider.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('DividerComponent', () => {
  let component: DividerComponent;
  let fixture: ComponentFixture<DividerComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DividerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DividerComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Orientation', () => {
    it('should render horizontal divider by default', () => {
      const divider = debugElement.query(By.css('[aria-orientation="horizontal"]'));
      expect(divider).toBeTruthy();
    });

    it('should render vertical divider when orientation is vertical', () => {
      component.orientation = 'vertical';
      fixture.detectChanges();
      
      const divider = debugElement.query(By.css('[aria-orientation="vertical"]'));
      expect(divider).toBeTruthy();
    });
  });

  describe('Variants', () => {
    it('should apply solid variant by default', () => {
      const line = debugElement.query(By.css('div > div'));
      expect(line.nativeElement.className).not.toContain('border-dashed');
      expect(line.nativeElement.className).not.toContain('border-dotted');
    });

    it('should apply dashed variant', () => {
      component.variant = 'dashed';
      fixture.detectChanges();
      
      const line = debugElement.query(By.css('div > div'));
      expect(line.nativeElement.className).toContain('border-dashed');
    });

    it('should apply dotted variant', () => {
      component.variant = 'dotted';
      fixture.detectChanges();
      
      const line = debugElement.query(By.css('div > div'));
      expect(line.nativeElement.className).toContain('border-dotted');
    });
  });

  describe('Spacing', () => {
    it('should apply medium spacing by default', () => {
      const container = debugElement.query(By.css('[role="separator"]'));
      expect(container.nativeElement.className).toContain('my-4');
    });

    it('should apply small spacing', () => {
      component.spacing = 'sm';
      fixture.detectChanges();
      
      const container = debugElement.query(By.css('[role="separator"]'));
      expect(container.nativeElement.className).toContain('my-2');
    });

    it('should apply large spacing', () => {
      component.spacing = 'lg';
      fixture.detectChanges();
      
      const container = debugElement.query(By.css('[role="separator"]'));
      expect(container.nativeElement.className).toContain('my-6');
    });
  });

  describe('Colors', () => {
    it('should apply gray color by default', () => {
      const line = debugElement.query(By.css('div > div'));
      expect(line.nativeElement.className).toContain('bg-gray-200');
    });

    it('should apply primary color', () => {
      component.color = 'primary';
      fixture.detectChanges();
      
      const line = debugElement.query(By.css('div > div'));
      expect(line.nativeElement.className).toContain('bg-primary');
    });

    it('should apply custom color when provided', () => {
      component.color = 'custom';
      component.customColor = '#ff0000';
      fixture.detectChanges();
      
      const line = debugElement.query(By.css('div > div'));
      expect(line.nativeElement.className).toContain('bg-[#ff0000]');
    });
  });

  describe('Label', () => {
    it('should not render label by default', () => {
      const label = debugElement.query(By.css('span'));
      expect(label).toBeFalsy();
    });

    it('should render label when provided', () => {
      component.label = 'Section';
      fixture.detectChanges();
      
      const label = debugElement.query(By.css('span'));
      expect(label).toBeTruthy();
      expect(label.nativeElement.textContent).toBe('Section');
    });

    it('should position label in center by default', () => {
      component.label = 'Section';
      fixture.detectChanges();
      
      const labelContainer = debugElement.query(By.css('.relative.flex'));
      expect(labelContainer.nativeElement.className).toContain('justify-center');
    });

    it('should position label on left', () => {
      component.label = 'Section';
      component.labelPosition = 'left';
      fixture.detectChanges();
      
      const labelContainer = debugElement.query(By.css('.relative.flex'));
      expect(labelContainer.nativeElement.className).toContain('justify-start');
    });

    it('should position label on right', () => {
      component.label = 'Section';
      component.labelPosition = 'right';
      fixture.detectChanges();
      
      const labelContainer = debugElement.query(By.css('.relative.flex'));
      expect(labelContainer.nativeElement.className).toContain('justify-end');
    });
  });

  describe('Thickness', () => {
    it('should apply thin thickness by default', () => {
      const line = debugElement.query(By.css('div > div'));
      expect(line.nativeElement.className).toContain('h-px');
    });

    it('should apply medium thickness', () => {
      component.thickness = 'medium';
      fixture.detectChanges();
      
      const line = debugElement.query(By.css('div > div'));
      expect(line.nativeElement.className).toContain('h-0.5');
    });

    it('should apply thick thickness', () => {
      component.thickness = 'thick';
      fixture.detectChanges();
      
      const line = debugElement.query(By.css('div > div'));
      expect(line.nativeElement.className).toContain('h-1');
    });
  });

  describe('Vertical Divider', () => {
    beforeEach(() => {
      component.orientation = 'vertical';
      fixture.detectChanges();
    });

    it('should apply vertical spacing', () => {
      const divider = debugElement.query(By.css('[aria-orientation="vertical"]'));
      expect(divider.nativeElement.className).toContain('mx-4');
    });

    it('should apply vertical thickness', () => {
      const divider = debugElement.query(By.css('[aria-orientation="vertical"]'));
      expect(divider.nativeElement.className).toContain('w-px');
    });

    it('should not render label for vertical divider', () => {
      component.label = 'Should not appear';
      fixture.detectChanges();
      
      const label = debugElement.query(By.css('span'));
      expect(label).toBeFalsy();
    });
  });

  describe('Accessibility', () => {
    it('should have separator role', () => {
      const divider = debugElement.query(By.css('[role="separator"]'));
      expect(divider).toBeTruthy();
    });

    it('should have correct aria-orientation', () => {
      let divider = debugElement.query(By.css('[aria-orientation="horizontal"]'));
      expect(divider).toBeTruthy();

      component.orientation = 'vertical';
      fixture.detectChanges();
      
      divider = debugElement.query(By.css('[aria-orientation="vertical"]'));
      expect(divider).toBeTruthy();
    });
  });
});