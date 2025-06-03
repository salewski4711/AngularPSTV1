import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AvatarComponent } from './avatar.component';

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Avatar Types', () => {
    it('should render image avatar when src is provided', () => {
      component.src = 'https://example.com/avatar.jpg';
      component.alt = 'User Avatar';
      fixture.detectChanges();
      
      const img = fixture.debugElement.query(By.css('img'));
      expect(img).toBeTruthy();
      expect(img.nativeElement.src).toBe('https://example.com/avatar.jpg');
      expect(img.nativeElement.alt).toBe('User Avatar');
    });

    it('should render initials avatar when no src', () => {
      component.name = 'John Doe';
      fixture.detectChanges();
      
      const initialsDiv = fixture.debugElement.query(By.css('div > span'));
      expect(initialsDiv).toBeTruthy();
      expect(initialsDiv.nativeElement.textContent).toBe('JD');
    });

    it('should fallback to initials on image error', () => {
      component.src = 'https://example.com/invalid.jpg';
      component.name = 'Jane Smith';
      fixture.detectChanges();
      
      const img = fixture.debugElement.query(By.css('img'));
      img.nativeElement.dispatchEvent(new Event('error'));
      fixture.detectChanges();
      
      const initialsDiv = fixture.debugElement.query(By.css('div > span'));
      expect(initialsDiv).toBeTruthy();
      expect(initialsDiv.nativeElement.textContent).toBe('JS');
    });
  });

  describe('Initials Generation', () => {
    it('should generate initials from first and last name', () => {
      component.name = 'John Doe';
      expect(component.displayInitials()).toBe('JD');
    });

    it('should handle single name', () => {
      component.name = 'Madonna';
      expect(component.displayInitials()).toBe('MA');
    });

    it('should handle multiple names', () => {
      component.name = 'John Paul Jones';
      expect(component.displayInitials()).toBe('JJ');
    });

    it('should handle empty name', () => {
      component.name = '';
      expect(component.displayInitials()).toBe('?');
    });

    it('should handle undefined name', () => {
      component.name = undefined;
      expect(component.displayInitials()).toBe('?');
    });

    it('should trim whitespace', () => {
      component.name = '  John Doe  ';
      expect(component.displayInitials()).toBe('JD');
    });
  });

  describe('Sizes', () => {
    it('should apply correct size classes', () => {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
      const expectedSizes = {
        xs: 'h-6 w-6',
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16'
      };
      
      sizes.forEach(size => {
        component.size = size;
        component.name = 'Test';
        fixture.detectChanges();
        
        const avatar = fixture.debugElement.query(By.css('div > div'));
        const classes = avatar.nativeElement.classList.toString();
        const [height, width] = expectedSizes[size].split(' ');
        
        expect(classes).toContain(height);
        expect(classes).toContain(width);
      });
    });

    it('should apply correct text sizes for initials', () => {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
      const expectedTextSizes = {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl'
      };
      
      sizes.forEach(size => {
        component.size = size;
        component.name = 'Test';
        fixture.detectChanges();
        
        const initials = fixture.debugElement.query(By.css('span'));
        expect(initials.nativeElement.classList.toString()).toContain(expectedTextSizes[size]);
      });
    });
  });

  describe('Shapes', () => {
    it('should apply circle shape by default', () => {
      component.name = 'Test';
      fixture.detectChanges();
      
      const avatar = fixture.debugElement.query(By.css('div > div'));
      expect(avatar.nativeElement.classList.toString()).toContain('rounded-full');
    });

    it('should apply square shape', () => {
      component.shape = 'square';
      component.name = 'Test';
      fixture.detectChanges();
      
      const avatar = fixture.debugElement.query(By.css('div > div'));
      expect(avatar.nativeElement.classList.toString()).toContain('rounded-lg');
    });
  });

  describe('Status Indicator', () => {
    it('should not show status indicator by default', () => {
      const status = fixture.debugElement.query(By.css('span[aria-label*="status"]'));
      expect(status).toBeFalsy();
    });

    it('should show status indicator when status is set', () => {
      component.status = 'online';
      fixture.detectChanges();
      
      const status = fixture.debugElement.query(By.css('span[aria-label="online status"]'));
      expect(status).toBeTruthy();
    });

    it('should apply correct status colors', () => {
      const statuses = ['online', 'offline', 'busy', 'away'] as const;
      const expectedColors = {
        online: 'bg-green-500',
        offline: 'bg-gray-400',
        busy: 'bg-red-500',
        away: 'bg-amber-500'
      };
      
      statuses.forEach(status => {
        component.status = status;
        fixture.detectChanges();
        
        const indicator = fixture.debugElement.query(By.css('span[aria-label*="status"]'));
        expect(indicator.nativeElement.classList.toString()).toContain(expectedColors[status]);
      });
    });

    it('should position status indicator correctly for different sizes', () => {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
      
      sizes.forEach(size => {
        component.size = size;
        component.status = 'online';
        fixture.detectChanges();
        
        const indicator = fixture.debugElement.query(By.css('span[aria-label*="status"]'));
        const classes = indicator.nativeElement.classList.toString();
        
        expect(classes).toContain('-bottom-');
        expect(classes).toContain('-right-');
      });
    });
  });

  describe('Custom Colors', () => {
    it('should apply custom background color', () => {
      component.bgColor = 'bg-purple-500';
      component.name = 'Test';
      fixture.detectChanges();
      
      const avatar = fixture.debugElement.query(By.css('div > div'));
      expect(avatar.nativeElement.classList.toString()).toContain('bg-purple-500');
    });

    it('should apply custom text color', () => {
      component.textColor = 'text-black';
      component.name = 'Test';
      fixture.detectChanges();
      
      const avatar = fixture.debugElement.query(By.css('div > div'));
      expect(avatar.nativeElement.classList.toString()).toContain('text-black');
    });

    it('should use default colors', () => {
      component.name = 'Test';
      fixture.detectChanges();
      
      const avatar = fixture.debugElement.query(By.css('div > div'));
      expect(avatar.nativeElement.classList.toString()).toContain('bg-orange-500');
      expect(avatar.nativeElement.classList.toString()).toContain('text-white');
    });
  });

  describe('Accessibility', () => {
    it('should have appropriate alt text for images', () => {
      component.src = 'avatar.jpg';
      component.alt = 'User profile picture';
      fixture.detectChanges();
      
      const img = fixture.debugElement.query(By.css('img'));
      expect(img.nativeElement.alt).toBe('User profile picture');
    });

    it('should use name as alt text fallback', () => {
      component.src = 'avatar.jpg';
      component.name = 'John Doe';
      fixture.detectChanges();
      
      const img = fixture.debugElement.query(By.css('img'));
      expect(img.nativeElement.alt).toBe('John Doe');
    });

    it('should use generic alt text when no name or alt provided', () => {
      component.src = 'avatar.jpg';
      fixture.detectChanges();
      
      const img = fixture.debugElement.query(By.css('img'));
      expect(img.nativeElement.alt).toBe('Avatar');
    });

    it('should have aria-label for status', () => {
      component.status = 'online';
      fixture.detectChanges();
      
      const status = fixture.debugElement.query(By.css('span[aria-label]'));
      expect(status.nativeElement.getAttribute('aria-label')).toBe('online status');
    });
  });

  describe('Styling', () => {
    it('should apply base classes', () => {
      component.name = 'Test';
      fixture.detectChanges();
      
      const avatar = fixture.debugElement.query(By.css('div > div'));
      const classes = avatar.nativeElement.classList.toString();
      
      expect(classes).toContain('inline-flex');
      expect(classes).toContain('items-center');
      expect(classes).toContain('justify-center');
      expect(classes).toContain('font-medium');
    });

    it('should have relative positioning on container', () => {
      const container = fixture.debugElement.query(By.css('div'));
      expect(container.nativeElement.classList.toString()).toContain('relative');
      expect(container.nativeElement.classList.toString()).toContain('inline-block');
    });
  });
});