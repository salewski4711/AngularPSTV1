import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { TagComponent } from './tag.component';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <pst-tag 
      [variant]="variant"
      [color]="color"
      [size]="size"
      [shape]="shape"
      [leadingIcon]="leadingIcon"
      [trailingIcon]="trailingIcon"
      [removable]="removable"
      [disabled]="disabled"
      (remove)="onRemove()"
    >
      {{ content }}
    </pst-tag>
  `
})
class TestHostComponent {
  variant: 'filled' | 'outline' | 'subtle' = 'filled';
  color: 'gray' | 'primary' | 'success' | 'error' | 'warning' | 'info' = 'gray';
  size: 'xs' | 'sm' | 'md' | 'lg' = 'sm';
  shape: 'rounded' | 'pill' | 'square' = 'rounded';
  leadingIcon?: string;
  trailingIcon?: string;
  removable = false;
  disabled = false;
  content = 'Test Tag';
  removeCount = 0;

  onRemove(): void {
    this.removeCount++;
  }
}

describe('TagComponent', () => {
  let component: TagComponent;
  let fixture: ComponentFixture<TagComponent>;
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagComponent],
      declarations: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Props', () => {
    it('should apply correct variant classes', () => {
      const tagElement = hostFixture.debugElement.query(By.css('span')).nativeElement;
      
      // Default filled variant
      expect(tagElement.classList.toString()).toContain('bg-gray-100');
      
      // Outline variant
      hostComponent.variant = 'outline';
      hostFixture.detectChanges();
      expect(tagElement.classList.toString()).toContain('border');
      expect(tagElement.classList.toString()).toContain('bg-transparent');
      
      // Subtle variant
      hostComponent.variant = 'subtle';
      hostFixture.detectChanges();
      expect(tagElement.classList.toString()).toContain('bg-gray-700/10');
    });

    it('should apply correct color classes', () => {
      const tagElement = hostFixture.debugElement.query(By.css('span')).nativeElement;
      
      hostComponent.color = 'primary';
      hostFixture.detectChanges();
      expect(tagElement.classList.toString()).toContain('bg-primary');
      
      hostComponent.color = 'success';
      hostFixture.detectChanges();
      expect(tagElement.classList.toString()).toContain('bg-green-100');
    });

    it('should apply correct size classes', () => {
      const tagElement = hostFixture.debugElement.query(By.css('span')).nativeElement;
      
      hostComponent.size = 'xs';
      hostFixture.detectChanges();
      expect(tagElement.classList.toString()).toContain('h-5');
      expect(tagElement.classList.toString()).toContain('text-xs');
      
      hostComponent.size = 'lg';
      hostFixture.detectChanges();
      expect(tagElement.classList.toString()).toContain('h-8');
      expect(tagElement.classList.toString()).toContain('text-base');
    });

    it('should apply correct shape classes', () => {
      const tagElement = hostFixture.debugElement.query(By.css('span')).nativeElement;
      
      expect(tagElement.classList.toString()).toContain('rounded-md');
      
      hostComponent.shape = 'pill';
      hostFixture.detectChanges();
      expect(tagElement.classList.toString()).toContain('rounded-full');
      
      hostComponent.shape = 'square';
      hostFixture.detectChanges();
      expect(tagElement.classList.toString()).toContain('rounded-none');
    });
  });

  describe('Icons', () => {
    it('should render leading icon when provided', () => {
      hostComponent.leadingIcon = 'check';
      hostFixture.detectChanges();
      
      const iconElement = hostFixture.debugElement.query(By.css('pst-icon'));
      expect(iconElement).toBeTruthy();
      expect(iconElement.componentInstance.name).toBe('check');
    });

    it('should render trailing icon when provided', () => {
      hostComponent.trailingIcon = 'chevron-right';
      hostFixture.detectChanges();
      
      const iconElements = hostFixture.debugElement.queryAll(By.css('pst-icon'));
      const trailingIcon = iconElements.find(el => 
        el.nativeElement.classList.contains('ml-1.5')
      );
      expect(trailingIcon).toBeTruthy();
    });

    it('should render both icons when provided', () => {
      hostComponent.leadingIcon = 'info';
      hostComponent.trailingIcon = 'chevron-right';
      hostFixture.detectChanges();
      
      const iconElements = hostFixture.debugElement.queryAll(By.css('pst-icon'));
      expect(iconElements.length).toBe(2);
    });
  });

  describe('Removable', () => {
    it('should show remove button when removable is true', () => {
      hostComponent.removable = true;
      hostFixture.detectChanges();
      
      const removeButton = hostFixture.debugElement.query(By.css('button'));
      expect(removeButton).toBeTruthy();
    });

    it('should not show remove button when removable is false', () => {
      hostComponent.removable = false;
      hostFixture.detectChanges();
      
      const removeButton = hostFixture.debugElement.query(By.css('button'));
      expect(removeButton).toBeFalsy();
    });

    it('should emit remove event when remove button is clicked', () => {
      hostComponent.removable = true;
      hostFixture.detectChanges();
      
      const removeButton = hostFixture.debugElement.query(By.css('button'));
      removeButton.nativeElement.click();
      
      expect(hostComponent.removeCount).toBe(1);
    });

    it('should not emit remove event when disabled', () => {
      hostComponent.removable = true;
      hostComponent.disabled = true;
      hostFixture.detectChanges();
      
      const removeButton = hostFixture.debugElement.query(By.css('button'));
      removeButton.nativeElement.click();
      
      expect(hostComponent.removeCount).toBe(0);
    });
  });

  describe('Disabled state', () => {
    it('should apply disabled classes when disabled', () => {
      hostComponent.disabled = true;
      hostFixture.detectChanges();
      
      const tagElement = hostFixture.debugElement.query(By.css('span')).nativeElement;
      expect(tagElement.classList.toString()).toContain('opacity-50');
      expect(tagElement.classList.toString()).toContain('cursor-not-allowed');
    });
  });

  describe('Content', () => {
    it('should display tag content', () => {
      const tagElement = hostFixture.debugElement.query(By.css('.tag-content'));
      expect(tagElement.nativeElement.textContent.trim()).toBe('Test Tag');
      
      hostComponent.content = 'New Content';
      hostFixture.detectChanges();
      expect(tagElement.nativeElement.textContent.trim()).toBe('New Content');
    });
  });
});