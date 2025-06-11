import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { TokenUtils } from '../../../core/design-system/token-utilities';
import { Component } from '@angular/core';

// Test-Host-Komponente für Content-Projection
@Component({
  template: `<pst-button>Click me</pst-button>`,
  standalone: true,
  imports: [ButtonComponent]
})
class TestHostComponent {}

describe('ButtonComponent mit TokenUtils', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  describe('Token Compliance', () => {
    it('sollte TokenUtils für Klassen-Generierung verwenden', () => {
      // Spy auf TokenUtils
      const getComponentClassesSpy = spyOn(TokenUtils, 'getComponentClasses').and.returnValue('test-classes');
      
      // Trigger change detection
      component.variant = 'primary';
      component.size = 'md';
      fixture.detectChanges();
      
      // Verify TokenUtils wurde aufgerufen
      expect(getComponentClassesSpy).toHaveBeenCalledWith('button', {
        variant: 'primary',
        size: 'md',
        state: {
          disabled: false,
          loading: false,
          fullWidth: false,
          iconOnly: false
        }
      });
    });

    it('sollte keine hardcodierten Farben im Template haben', () => {
      const htmlContent = compiled.innerHTML;
      
      // Check für Hex-Farben
      expect(htmlContent).not.toMatch(/#[0-9A-Fa-f]{6}/);
      
      // Check für RGB
      expect(htmlContent).not.toMatch(/rgb\(/);
      
      // Check für hardcodierte Tailwind-Farben
      expect(htmlContent).not.toMatch(/bg-(red|blue|orange|green)-\d{3}/);
    });

    it('sollte keine hardcodierten Spacing-Werte haben', () => {
      const htmlContent = compiled.innerHTML;
      
      // Check für px-Werte
      expect(htmlContent).not.toMatch(/\d+px/);
      
      // Check für hardcodierte Padding/Margin
      expect(htmlContent).not.toMatch(/p-\d+/);
      expect(htmlContent).not.toMatch(/m-\d+/);
    });
  });

  describe('Funktionalität', () => {
    it('sollte click event emittieren wenn nicht disabled', () => {
      const clickSpy = jasmine.createSpy('clickSpy');
      component.clicked.subscribe(clickSpy);
      
      const button = compiled.querySelector('button');
      button?.click();
      
      expect(clickSpy).toHaveBeenCalled();
    });

    it('sollte KEINE click events emittieren wenn disabled', () => {
      const clickSpy = jasmine.createSpy('clickSpy');
      component.clicked.subscribe(clickSpy);
      component.disabled = true;
      fixture.detectChanges();
      
      const button = compiled.querySelector('button');
      button?.click();
      
      expect(clickSpy).not.toHaveBeenCalled();
    });

    it('sollte KEINE click events emittieren wenn loading', () => {
      const clickSpy = jasmine.createSpy('clickSpy');
      component.clicked.subscribe(clickSpy);
      component.loading = true;
      fixture.detectChanges();
      
      const button = compiled.querySelector('button');
      button?.click();
      
      expect(clickSpy).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('sollte aria-label setzen wenn vorhanden', () => {
      component.ariaLabel = 'Submit form';
      fixture.detectChanges();
      
      const button = compiled.querySelector('button');
      expect(button?.getAttribute('aria-label')).toBe('Submit form');
    });

    it('sollte aria-busy setzen wenn loading', () => {
      component.loading = true;
      fixture.detectChanges();
      
      const button = compiled.querySelector('button');
      expect(button?.getAttribute('aria-busy')).toBe('true');
    });

    it('sollte disabled attribute setzen', () => {
      component.disabled = true;
      fixture.detectChanges();
      
      const button = compiled.querySelector('button');
      expect(button?.hasAttribute('disabled')).toBe(true);
    });
  });

  describe('Varianten', () => {
    const variants: Array<'primary' | 'secondary' | 'outline-primary' | 'tertiary' | 'ghost' | 'danger'> = 
      ['primary', 'secondary', 'outline-primary', 'tertiary', 'ghost', 'danger'];
    
    variants.forEach(variant => {
      it(`sollte ${variant} variant korrekt rendern`, () => {
        component.variant = variant;
        fixture.detectChanges();
        
        // TokenUtils sollte die richtigen Klassen zurückgeben
        const buttonClasses = component.buttonClasses();
        expect(buttonClasses).toBeTruthy();
        expect(buttonClasses.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Größen', () => {
    const sizes: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl'> = ['xs', 'sm', 'md', 'lg', 'xl'];
    
    sizes.forEach(size => {
      it(`sollte ${size} size korrekt rendern`, () => {
        component.size = size;
        fixture.detectChanges();
        
        // Icon size sollte sich anpassen
        expect(component.iconSize()).toBeGreaterThan(0);
        
        // Spinner size sollte sich anpassen
        expect(component.spinnerSize()).toContain('h-');
        expect(component.spinnerSize()).toContain('w-');
      });
    });
  });

  describe('Icon-Only Mode', () => {
    it('sollte andere Klassen für icon-only buttons verwenden', () => {
      spyOn(TokenUtils, 'getComponentClasses').and.returnValue('icon-only-classes');
      
      component.iconOnly = true;
      fixture.detectChanges();
      
      expect(TokenUtils.getComponentClasses).toHaveBeenCalledWith('button', {
        variant: 'primary',
        size: 'md',
        state: {
          disabled: false,
          loading: false,
          fullWidth: false,
          iconOnly: true
        }
      });
    });
  });
});