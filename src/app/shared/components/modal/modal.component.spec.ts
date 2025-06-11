import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Visibility', () => {
    it('should not render when isOpen is false', () => {
      fixture.componentRef.setInput('isOpen', false);
      fixture.detectChanges();
      
      const backdrop = fixture.nativeElement.querySelector('.fixed.inset-0.z-50.bg-black');
      expect(backdrop).toBeNull();
    });

    it('should render when isOpen is true', (done) => {
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();
      
      // Wait for animation delay
      setTimeout(() => {
        fixture.detectChanges();
        const backdrop = fixture.nativeElement.querySelector('.fixed.inset-0.z-50.bg-black');
        const modal = fixture.nativeElement.querySelector('[role="dialog"]');
        
        expect(backdrop).toBeTruthy();
        expect(modal).toBeTruthy();
        done();
      }, 20);
    });
  });

  describe('Content', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();
    });

    it('should display the correct title', (done) => {
      fixture.componentRef.setInput('title', 'Custom Title');
      fixture.detectChanges();
      
      setTimeout(() => {
        fixture.detectChanges();
        const titleElement = fixture.nativeElement.querySelector('h2');
        expect(titleElement?.textContent.trim()).toBe('Custom Title');
        done();
      }, 20);
    });

    it('should display default title when no title provided', (done) => {
      fixture.componentRef.setInput('title', undefined);
      fixture.detectChanges();
      
      setTimeout(() => {
        fixture.detectChanges();
        const titleElement = fixture.nativeElement.querySelector('h2');
        expect(titleElement?.textContent.trim()).toBe('Modal');
        done();
      }, 20);
    });
  });

  describe('Sizes', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('isOpen', true);
    });

    it('should apply sm size class', (done) => {
      fixture.componentRef.setInput('size', 'sm');
      fixture.detectChanges();
      
      setTimeout(() => {
        fixture.detectChanges();
        const modal = fixture.nativeElement.querySelector('[role="dialog"]');
        expect(modal?.classList.contains('max-w-md')).toBeTruthy();
        done();
      }, 20);
    });

    it('should apply md size class by default', (done) => {
      fixture.detectChanges();
      
      setTimeout(() => {
        fixture.detectChanges();
        const modal = fixture.nativeElement.querySelector('[role="dialog"]');
        expect(modal?.classList.contains('max-w-lg')).toBeTruthy();
        done();
      }, 20);
    });

    it('should apply lg size class', (done) => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();
      
      setTimeout(() => {
        fixture.detectChanges();
        const modal = fixture.nativeElement.querySelector('[role="dialog"]');
        expect(modal?.classList.contains('max-w-2xl')).toBeTruthy();
        done();
      }, 20);
    });

    it('should apply xl size class', (done) => {
      fixture.componentRef.setInput('size', 'xl');
      fixture.detectChanges();
      
      setTimeout(() => {
        fixture.detectChanges();
        const modal = fixture.nativeElement.querySelector('[role="dialog"]');
        expect(modal?.classList.contains('max-w-4xl')).toBeTruthy();
        done();
      }, 20);
    });
  });

  describe('Close Button', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('isOpen', true);
    });

    it('should show close button by default', (done) => {
      fixture.detectChanges();
      
      setTimeout(() => {
        fixture.detectChanges();
        const closeButton = fixture.nativeElement.querySelector('button[aria-label="Close modal"]');
        expect(closeButton).toBeTruthy();
        done();
      }, 20);
    });

    it('should hide close button when showCloseButton is false', (done) => {
      fixture.componentRef.setInput('showCloseButton', false);
      fixture.detectChanges();
      
      setTimeout(() => {
        fixture.detectChanges();
        const closeButton = fixture.nativeElement.querySelector('button[aria-label="Close modal"]');
        expect(closeButton).toBeNull();
        done();
      }, 20);
    });

    it('should emit close event when close button is clicked', (done) => {
      let closeEmitted = false;
      component.close.subscribe(() => {
        closeEmitted = true;
      });
      
      fixture.detectChanges();
      
      setTimeout(() => {
        fixture.detectChanges();
        const closeButton = fixture.nativeElement.querySelector('button[aria-label="Close modal"]');
        closeButton?.click();
        
        expect(closeEmitted).toBeTruthy();
        done();
      }, 20);
    });
  });

  describe('Backdrop Behavior', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('isOpen', true);
    });

    it('should emit close event when backdrop is clicked by default', (done) => {
      let closeEmitted = false;
      component.close.subscribe(() => {
        closeEmitted = true;
      });
      
      fixture.detectChanges();
      
      setTimeout(() => {
        fixture.detectChanges();
        const backdrop = fixture.nativeElement.querySelector('.fixed.inset-0.z-50.bg-black');
        backdrop?.click();
        
        expect(closeEmitted).toBeTruthy();
        done();
      }, 20);
    });

    it('should not emit close event when backdrop is clicked if closeOnBackdrop is false', (done) => {
      let closeEmitted = false;
      component.close.subscribe(() => {
        closeEmitted = true;
      });
      
      fixture.componentRef.setInput('closeOnBackdrop', false);
      fixture.detectChanges();
      
      setTimeout(() => {
        fixture.detectChanges();
        const backdrop = fixture.nativeElement.querySelector('.fixed.inset-0.z-50.bg-black');
        backdrop?.click();
        
        expect(closeEmitted).toBeFalsy();
        done();
      }, 20);
    });
  });

  describe('ESC Key Behavior', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('isOpen', true);
    });

    it('should emit close event on ESC key by default', (done) => {
      let closeEmitted = false;
      component.close.subscribe(() => {
        closeEmitted = true;
      });
      
      fixture.detectChanges();
      
      setTimeout(() => {
        fixture.detectChanges();
        const event = new KeyboardEvent('keydown', { key: 'Escape' });
        document.dispatchEvent(event);
        
        expect(closeEmitted).toBeTruthy();
        done();
      }, 20);
    });

    it('should not emit close event on ESC key if closeOnEsc is false', (done) => {
      let closeEmitted = false;
      component.close.subscribe(() => {
        closeEmitted = true;
      });
      
      fixture.componentRef.setInput('closeOnEsc', false);
      fixture.detectChanges();
      
      setTimeout(() => {
        fixture.detectChanges();
        const event = new KeyboardEvent('keydown', { key: 'Escape' });
        document.dispatchEvent(event);
        
        expect(closeEmitted).toBeFalsy();
        done();
      }, 20);
    });
  });

  describe('ARIA Attributes', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('isOpen', true);
    });

    it('should have proper ARIA attributes', (done) => {
      fixture.componentRef.setInput('title', 'Test Modal');
      fixture.detectChanges();
      
      setTimeout(() => {
        fixture.detectChanges();
        const modal = fixture.nativeElement.querySelector('[role="dialog"]');
        
        expect(modal?.getAttribute('role')).toBe('dialog');
        expect(modal?.getAttribute('aria-modal')).toBe('true');
        expect(modal?.getAttribute('aria-labelledby')).toBeTruthy();
        
        const title = fixture.nativeElement.querySelector('h2');
        expect(title?.id).toBe(modal?.getAttribute('aria-labelledby'));
        done();
      }, 20);
    });
  });

  describe('Click Propagation', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('isOpen', true);
    });

    it('should not close modal when clicking inside the modal', (done) => {
      let closeEmitted = false;
      component.close.subscribe(() => {
        closeEmitted = true;
      });
      
      fixture.detectChanges();
      
      setTimeout(() => {
        fixture.detectChanges();
        const modal = fixture.nativeElement.querySelector('[role="dialog"]');
        modal?.click();
        
        expect(closeEmitted).toBeFalsy();
        done();
      }, 20);
    });
  });
});