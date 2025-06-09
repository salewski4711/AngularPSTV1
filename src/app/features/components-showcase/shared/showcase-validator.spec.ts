import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Type } from '@angular/core';
import { ShowcaseTemplateComponent } from './showcase-template.component';

/**
 * Test-Helper für Showcase-Komponenten
 * 
 * Verwendung:
 * ```typescript
 * import { validateShowcaseComponent } from './showcase-validator.spec';
 * 
 * describe('MyShowcaseComponent', () => {
 *   it('should follow showcase conventions', () => {
 *     validateShowcaseComponent(MyShowcaseComponent);
 *   });
 * });
 * ```
 */
export function validateShowcaseComponent(componentClass: Type<any>): void {
  let component: any;
  let fixture: ComponentFixture<any>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [componentClass]
    }).compileComponents();

    fixture = TestBed.createComponent(componentClass);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  describe('Showcase Conventions', () => {
    // 1. Check if it uses ShowcaseTemplateComponent
    it('should use ShowcaseTemplateComponent', () => {
      const showcaseTemplate = compiled.querySelector('pst-showcase-template');
      expect(showcaseTemplate).toBeTruthy('Component must use <pst-showcase-template>');
    });

    // 2. Check required properties
    it('should have required properties', () => {
      expect(component.sections).toBeDefined('sections property is required');
      expect(Array.isArray(component.sections)).toBe(true, 'sections must be an array');
      expect(component.sections.length).toBeGreaterThan(0, 'sections must not be empty');

      expect(component.props).toBeDefined('props property is required');
      expect(Array.isArray(component.props)).toBe(true, 'props must be an array');

      expect(component.bestPractices).toBeDefined('bestPractices property is required');
      expect(component.bestPractices.do).toBeDefined('bestPractices.do is required');
      expect(component.bestPractices.dont).toBeDefined('bestPractices.dont is required');
      expect(Array.isArray(component.bestPractices.do)).toBe(true, 'bestPractices.do must be an array');
      expect(Array.isArray(component.bestPractices.dont)).toBe(true, 'bestPractices.dont must be an array');
    });

    // 3. Check title and description in template
    it('should have title and description bindings', () => {
      const template = componentClass.ɵcmp.template.toString();
      expect(template).toContain('[title]', 'Template must bind [title]');
      expect(template).toContain('[description]', 'Template must bind [description]');
    });

    // 4. Validate sections structure
    it('should have valid sections structure', () => {
      component.sections.forEach((section: any, index: number) => {
        expect(section.title).toBeTruthy(`Section ${index} must have a title`);
        expect(section.code).toBeTruthy(`Section ${index} must have code`);
        expect(typeof section.title).toBe('string', `Section ${index} title must be a string`);
        expect(typeof section.code).toBe('string', `Section ${index} code must be a string`);
      });
    });

    // 5. Validate props structure
    it('should have valid props structure', () => {
      component.props.forEach((prop: any, index: number) => {
        expect(prop.name).toBeTruthy(`Prop ${index} must have a name`);
        expect(prop.type).toBeTruthy(`Prop ${index} must have a type`);
        expect(prop.default).toBeDefined(`Prop ${index} must have a default value`);
        expect(prop.description).toBeTruthy(`Prop ${index} must have a description`);
      });
    });

    // 6. Check best practices
    it('should have comprehensive best practices', () => {
      expect(component.bestPractices.do.length).toBeGreaterThanOrEqual(3, 
        'Should have at least 3 "do" practices');
      expect(component.bestPractices.dont.length).toBeGreaterThanOrEqual(3, 
        'Should have at least 3 "dont" practices');

      component.bestPractices.do.forEach((practice: string, index: number) => {
        expect(practice.length).toBeGreaterThan(10, 
          `Do practice ${index} should be descriptive (>10 chars)`);
      });

      component.bestPractices.dont.forEach((practice: string, index: number) => {
        expect(practice.length).toBeGreaterThan(10, 
          `Don't practice ${index} should be descriptive (>10 chars)`);
      });
    });

    // 7. Check it doesn't extend BaseShowcaseComponent
    it('should NOT extend BaseShowcaseComponent', () => {
      const prototype = Object.getPrototypeOf(component);
      const prototypeName = prototype.constructor.name;
      expect(prototypeName).not.toBe('BaseShowcaseComponent', 
        'Component should NOT extend BaseShowcaseComponent');
    });

    // 8. Check for common mistakes
    it('should not have common implementation mistakes', () => {
      // Check imports array doesn't include unnecessary components
      const metadata = componentClass.ɵcmp;
      const imports = metadata.dependencies || [];
      
      const unnecessaryImports = ['CodeBlockComponent', 'PropsTableComponent'];
      imports.forEach((imp: any) => {
        const importName = imp.name || imp.constructor.name;
        expect(unnecessaryImports).not.toContain(importName,
          `${importName} should not be imported (handled by ShowcaseTemplateComponent)`);
      });
    });

    // 9. Validate events if present
    if (component.events) {
      it('should have valid events structure', () => {
        expect(Array.isArray(component.events)).toBe(true, 'events must be an array');
        component.events.forEach((event: any, index: number) => {
          expect(event.name).toBeTruthy(`Event ${index} must have a name`);
          expect(event.type).toBeTruthy(`Event ${index} must have a type`);
          expect(event.description).toBeTruthy(`Event ${index} must have a description`);
        });
      });
    }

    // 10. Check examples have variety
    it('should have varied examples', () => {
      expect(component.sections.length).toBeGreaterThanOrEqual(2, 
        'Should have at least 2 different examples');
      
      // Check that examples are not too similar
      const codeSamples = component.sections.map((s: any) => s.code);
      const uniqueCodeSamples = new Set(codeSamples);
      expect(uniqueCodeSamples.size).toBe(codeSamples.length, 
        'All code examples should be unique');
    });
  });
}

/**
 * Automatisierter Test für eine spezifische Showcase-Komponente
 * Kann von KI-Agenten direkt ausgeführt werden
 */
export function createShowcaseComponentTest(componentClass: Type<any>): void {
  describe(`${componentClass.name} Showcase Validation`, () => {
    validateShowcaseComponent(componentClass);
  });
}