import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BadgeComponent } from './badge.component';

describe('BadgeComponent', () => {
  let component: BadgeComponent;
  let fixture: ComponentFixture<BadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Variants', () => {
    it('should apply filled variant styles by default', () => {
      component.color = 'primary';
      fixture.detectChanges();
      
      const badge = fixture.debugElement.query(By.css('span'));
      expect(badge.nativeElement.classList.toString()).toContain('bg-orange-500');
      expect(badge.nativeElement.classList.toString()).toContain('text-white');
    });

    it('should apply outline variant styles', () => {
      component.variant = 'outline';
      component.color = 'primary';
      fixture.detectChanges();
      
      const badge = fixture.debugElement.query(By.css('span'));
      expect(badge.nativeElement.classList.toString()).toContain('bg-transparent');
      expect(badge.nativeElement.classList.toString()).toContain('text-orange-500');
      expect(badge.nativeElement.classList.toString()).toContain('border-orange-500');
    });

    it('should apply subtle variant styles', () => {
      component.variant = 'subtle';
      component.color = 'primary';
      fixture.detectChanges();
      
      const badge = fixture.debugElement.query(By.css('span'));
      expect(badge.nativeElement.classList.toString()).toContain('bg-orange-500/10');
      expect(badge.nativeElement.classList.toString()).toContain('text-orange-500');
    });
  });

  describe('Colors', () => {
    const colors = ['gray', 'primary', 'success', 'error', 'warning', 'info'] as const;
    
    it('should apply correct colors for filled variant', () => {
      colors.forEach(color => {
        component.variant = 'filled';
        component.color = color;
        fixture.detectChanges();
        
        const badge = fixture.debugElement.query(By.css('span'));
        const classes = badge.nativeElement.classList.toString();
        
        if (color === 'primary') {
          expect(classes).toContain('bg-orange-500');
        } else {
          expect(classes).toMatch(new RegExp(`bg-(${color}|green|red|amber|blue)-\\d+`));
        }
      });
    });
  });

  describe('Sizes', () => {
    it('should apply correct size classes', () => {
      const sizes = ['xs', 'sm', 'md', 'lg'] as const;
      const expectedHeights = {
        xs: 'h-5',
        sm: 'h-6',
        md: 'h-7',
        lg: 'h-8'
      };
      
      sizes.forEach(size => {
        component.size = size;
        fixture.detectChanges();
        
        const badge = fixture.debugElement.query(By.css('span'));
        expect(badge.nativeElement.classList.toString()).toContain(expectedHeights[size]);
      });
    });
  });

  describe('Shapes', () => {
    it('should apply rounded shape by default', () => {
      const badge = fixture.debugElement.query(By.css('span'));
      expect(badge.nativeElement.classList.toString()).toContain('rounded-md');
    });

    it('should apply pill shape', () => {
      component.shape = 'pill';
      fixture.detectChanges();
      
      const badge = fixture.debugElement.query(By.css('span'));
      expect(badge.nativeElement.classList.toString()).toContain('rounded-full');
    });

    it('should apply square shape', () => {
      component.shape = 'square';
      fixture.detectChanges();
      
      const badge = fixture.debugElement.query(By.css('span'));
      expect(badge.nativeElement.classList.toString()).toContain('rounded-none');
    });
  });

  describe('Icons', () => {
    it('should render leading icon when provided', () => {
      component.leadingIcon = 'fa fa-check';
      fixture.detectChanges();
      
      const icon = fixture.debugElement.query(By.css('i.fa-check'));
      expect(icon).toBeTruthy();
      expect(icon.nativeElement.classList.toString()).toContain('mr-1.5');
    });

    it('should render trailing icon when provided', () => {
      component.trailingIcon = 'fa fa-arrow-right';
      fixture.detectChanges();
      
      const icon = fixture.debugElement.query(By.css('i.fa-arrow-right'));
      expect(icon).toBeTruthy();
      expect(icon.nativeElement.classList.toString()).toContain('ml-1.5');
    });

    it('should apply correct icon sizes', () => {
      const sizes = ['xs', 'sm', 'md', 'lg'] as const;
      const expectedIconSizes = {
        xs: 'w-3.5 h-3.5',
        sm: 'w-3.5 h-3.5',
        md: 'w-4 h-4',
        lg: 'w-5 h-5'
      };
      
      sizes.forEach(size => {
        component.size = size;
        component.leadingIcon = 'fa fa-test';
        fixture.detectChanges();
        
        const icon = fixture.debugElement.query(By.css('i'));
        const classes = icon.nativeElement.classList.toString();
        const [width, height] = expectedIconSizes[size].split(' ');
        
        expect(classes).toContain(width);
        expect(classes).toContain(height);
      });
    });
  });

  describe('Removable Badge', () => {
    it('should not show remove button by default', () => {
      const removeButton = fixture.debugElement.query(By.css('button'));
      expect(removeButton).toBeFalsy();
    });

    it('should show remove button when removable', () => {
      component.removable = true;
      fixture.detectChanges();
      
      const removeButton = fixture.debugElement.query(By.css('button'));
      expect(removeButton).toBeTruthy();
      expect(removeButton.nativeElement.getAttribute('aria-label')).toBe('Remove');
    });

    it('should emit remove event when clicked', () => {
      component.removable = true;
      fixture.detectChanges();
      
      const removeSpy = jasmine.createSpy('remove');
      component.remove.subscribe(removeSpy);
      
      const removeButton = fixture.debugElement.query(By.css('button'));
      removeButton.nativeElement.click();
      
      expect(removeSpy).toHaveBeenCalled();
    });

    it('should apply correct remove icon sizes', () => {
      const sizes = ['xs', 'sm', 'md', 'lg'] as const;
      const expectedIconSizes = {
        xs: 'w-3 h-3',
        sm: 'w-3 h-3',
        md: 'w-3.5 h-3.5',
        lg: 'w-4 h-4'
      };
      
      sizes.forEach(size => {
        component.size = size;
        component.removable = true;
        fixture.detectChanges();
        
        const icon = fixture.debugElement.query(By.css('svg'));
        const classes = icon.nativeElement.classList.toString();
        const [width, height] = expectedIconSizes[size].split(' ');
        
        expect(classes).toContain(width);
        expect(classes).toContain(height);
      });
    });
  });

  describe('Content Projection', () => {
    it('should project content', () => {
      const testFixture = TestBed.createComponent(TestHostComponent);
      testFixture.detectChanges();
      
      const badge = testFixture.debugElement.query(By.css('app-badge span'));
      expect(badge.nativeElement.textContent).toContain('Test Content');
    });
  });

  describe('Styling', () => {
    it('should apply base classes', () => {
      const badge = fixture.debugElement.query(By.css('span'));
      const classes = badge.nativeElement.classList.toString();
      
      expect(classes).toContain('inline-flex');
      expect(classes).toContain('items-center');
      expect(classes).toContain('font-medium');
      expect(classes).toContain('uppercase');
      expect(classes).toContain('tracking-wider');
    });
  });
});

// Test host component for content projection
@Component({
  template: `<app-badge>Test Content</app-badge>`,
  imports: [BadgeComponent],
  standalone: true
})
class TestHostComponent {}