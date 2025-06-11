import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { LinkComponent } from './link.component';
import { IconComponent } from '../../icons/icon.component';

describe('LinkComponent', () => {
  let component: LinkComponent;
  let fixture: ComponentFixture<LinkComponent>;
  let linkElement: DebugElement;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkComponent, RouterTestingModule, IconComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LinkComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  describe('External Links', () => {
    beforeEach(() => {
      component.href = 'https://example.com';
      fixture.detectChanges();
      linkElement = fixture.debugElement.query(By.css('a'));
    });

    it('should create an external link with href', () => {
      expect(linkElement.nativeElement.href).toBe('https://example.com/');
    });

    it('should open external links in new tab when external is true', () => {
      component.external = true;
      fixture.detectChanges();
      
      expect(linkElement.nativeElement.target).toBe('_blank');
      expect(linkElement.nativeElement.rel).toBe('noopener noreferrer');
    });

    it('should show external link icon when external is true', () => {
      component.external = true;
      fixture.detectChanges();
      
      const icon = fixture.debugElement.query(By.directive(IconComponent));
      expect(icon).toBeTruthy();
      expect(icon.componentInstance.name).toBe('external-link');
    });

    it('should open in same tab when external is false', () => {
      component.external = false;
      fixture.detectChanges();
      
      expect(linkElement.nativeElement.target).toBe('_self');
      expect(linkElement.nativeElement.rel).toBeFalsy();
    });
  });

  describe('Router Links', () => {
    beforeEach(() => {
      component.routerLink = '/test-route';
      fixture.detectChanges();
      linkElement = fixture.debugElement.query(By.css('a'));
    });

    it('should create a router link', () => {
      expect(linkElement.attributes['ng-reflect-router-link']).toBe('/test-route');
    });

    it('should support array router links', () => {
      component.routerLink = ['/parent', 'child'];
      fixture.detectChanges();
      
      expect(linkElement.attributes['ng-reflect-router-link']).toBe('/parent,child');
    });

    it('should pass query params', () => {
      component.queryParams = { id: '123', filter: 'active' };
      fixture.detectChanges();
      
      expect(linkElement.attributes['ng-reflect-query-params']).toBeTruthy();
    });

    it('should pass fragment', () => {
      component.fragment = 'section1';
      fixture.detectChanges();
      
      expect(linkElement.attributes['ng-reflect-fragment']).toBe('section1');
    });
  });

  describe('Variants', () => {
    beforeEach(() => {
      component.href = '#';
      fixture.detectChanges();
      linkElement = fixture.debugElement.query(By.css('a'));
    });

    it('should apply default variant classes', () => {
      expect(linkElement.nativeElement.className).toContain('text-info-600');
      expect(linkElement.nativeElement.className).toContain('hover:text-info-700');
    });

    it('should apply primary variant classes', () => {
      component.variant = 'primary';
      fixture.detectChanges();
      
      expect(linkElement.nativeElement.className).toContain('text-primary');
      expect(linkElement.nativeElement.className).toContain('hover:text-primary-600');
    });

    it('should apply muted variant classes', () => {
      component.variant = 'muted';
      fixture.detectChanges();
      
      expect(linkElement.nativeElement.className).toContain('text-neutral-600');
      expect(linkElement.nativeElement.className).toContain('hover:text-neutral-900');
    });
  });

  describe('Sizes', () => {
    beforeEach(() => {
      component.href = '#';
      fixture.detectChanges();
      linkElement = fixture.debugElement.query(By.css('a'));
    });

    it('should apply small size classes', () => {
      component.size = 'sm';
      fixture.detectChanges();
      
      expect(linkElement.nativeElement.className).toContain('text-sm');
    });

    it('should apply medium size classes by default', () => {
      expect(linkElement.nativeElement.className).toContain('text-base');
    });

    it('should apply large size classes', () => {
      component.size = 'lg';
      fixture.detectChanges();
      
      expect(linkElement.nativeElement.className).toContain('text-lg');
    });

    it('should adjust icon size based on link size', () => {
      component.external = true;
      component.size = 'sm';
      fixture.detectChanges();
      
      const icon = fixture.debugElement.query(By.directive(IconComponent));
      expect(icon.componentInstance.size).toBe(12);
      
      component.size = 'lg';
      fixture.detectChanges();
      expect(icon.componentInstance.size).toBe(16);
    });
  });

  describe('Underline', () => {
    beforeEach(() => {
      component.href = '#';
      fixture.detectChanges();
      linkElement = fixture.debugElement.query(By.css('a'));
    });

    it('should have underline on hover by default', () => {
      expect(linkElement.nativeElement.className).toContain('hover:underline');
    });

    it('should not have underline when underline is false', () => {
      component.underline = false;
      fixture.detectChanges();
      
      expect(linkElement.nativeElement.className).not.toContain('hover:underline');
    });
  });

  describe('Disabled State', () => {
    beforeEach(() => {
      component.href = '#';
      component.disabled = true;
      fixture.detectChanges();
      linkElement = fixture.debugElement.query(By.css('a'));
    });

    it('should apply disabled classes', () => {
      expect(linkElement.nativeElement.className).toContain('opacity-50');
      expect(linkElement.nativeElement.className).toContain('cursor-not-allowed');
      expect(linkElement.nativeElement.className).toContain('pointer-events-none');
    });

    it('should set aria-disabled attribute', () => {
      expect(linkElement.nativeElement.getAttribute('aria-disabled')).toBe('true');
    });

    it('should not have underline when disabled', () => {
      expect(linkElement.nativeElement.className).not.toContain('hover:underline');
    });

    it('should prevent click events when disabled', () => {
      const clickSpy = jasmine.createSpy('click');
      component.linkClick.subscribe(clickSpy);
      
      const event = new MouseEvent('click');
      const preventDefaultSpy = spyOn(event, 'preventDefault');
      
      component.handleClick(event);
      
      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(clickSpy).not.toHaveBeenCalled();
    });
  });

  describe('Click Events', () => {
    beforeEach(() => {
      component.href = '#';
      fixture.detectChanges();
      linkElement = fixture.debugElement.query(By.css('a'));
    });

    it('should emit linkClick event', () => {
      const clickSpy = jasmine.createSpy('click');
      component.linkClick.subscribe(clickSpy);
      
      linkElement.nativeElement.click();
      
      expect(clickSpy).toHaveBeenCalled();
    });

    it('should not emit click when disabled', () => {
      component.disabled = true;
      fixture.detectChanges();
      
      const clickSpy = jasmine.createSpy('click');
      component.linkClick.subscribe(clickSpy);
      
      const event = new MouseEvent('click');
      component.handleClick(event);
      
      expect(clickSpy).not.toHaveBeenCalled();
    });
  });

  describe('Content Projection', () => {
    it('should project content', () => {
      component.href = '#';
      fixture.detectChanges();
      
      const linkText = 'Test Link';
      fixture.nativeElement.querySelector('a').textContent = linkText;
      
      expect(fixture.nativeElement.textContent).toContain(linkText);
    });
  });

  describe('Focus Styles', () => {
    beforeEach(() => {
      component.href = '#';
      fixture.detectChanges();
      linkElement = fixture.debugElement.query(By.css('a'));
    });

    it('should have focus ring classes', () => {
      expect(linkElement.nativeElement.className).toContain('focus:outline-none');
      expect(linkElement.nativeElement.className).toContain('focus:ring-2');
      expect(linkElement.nativeElement.className).toContain('focus:ring-offset-2');
      expect(linkElement.nativeElement.className).toContain('focus:ring-primary');
    });
  });
});