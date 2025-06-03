import { Component, Input, AfterContentInit, ContentChildren, QueryList, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

export type ButtonGroupOrientation = 'horizontal' | 'vertical';
export type ButtonGroupMode = 'default' | 'toggle' | 'toggle-multiple';

@Component({
  selector: 'app-button-group',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div 
      [class]="groupClasses"
      role="group"
      [attr.aria-label]="ariaLabel"
      [attr.aria-multiselectable]="mode === 'toggle-multiple' ? 'true' : null"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: inline-flex;
    }
    
    /* Group container styles */
    .button-group-horizontal {
      display: inline-flex;
      align-items: center;
    }
    
    .button-group-vertical {
      display: inline-flex;
      flex-direction: column;
    }
    
    /* Remove gaps between buttons */
    :host ::ng-deep app-button {
      display: contents;
    }
    
    /* Horizontal Group - Remove gaps and connect buttons */
    .button-group-horizontal ::ng-deep > button:not(:first-child) {
      margin-left: -1px;
    }
    
    /* Vertical Group - Remove gaps and connect buttons */
    .button-group-vertical ::ng-deep > button:not(:first-child) {
      margin-top: -1px;
    }
    
    /* Reset border radius for all buttons in group */
    :host ::ng-deep button {
      border-radius: 0 !important;
      position: relative;
    }
    
    /* Horizontal Group - First and last button radius */
    .button-group-horizontal ::ng-deep > button:first-child {
      @apply rounded-l-md;
    }
    
    .button-group-horizontal ::ng-deep > button:last-child {
      @apply rounded-r-md;
    }
    
    /* Vertical Group - First and last button radius */
    .button-group-vertical ::ng-deep > button:first-child {
      @apply rounded-t-md;
    }
    
    .button-group-vertical ::ng-deep > button:last-child {
      @apply rounded-b-md;
    }
    
    /* Vertical Group - Full width buttons */
    .button-group-vertical ::ng-deep > button {
      @apply w-full;
    }
    
    /* Focus state adjustments */
    :host ::ng-deep button:focus {
      @apply z-10;
    }
    
    /* Hover state adjustments */
    :host ::ng-deep button:hover {
      @apply z-[1];
    }
    
    /* Active/Toggle state using Tailwind classes */
    :host ::ng-deep button[aria-pressed="true"] {
      @apply bg-primary-50 border-primary text-primary z-[1];
    }
    
    :host ::ng-deep button[aria-pressed="true"]:hover {
      @apply bg-primary-100;
    }
    
    /* Dark mode toggle state */
    :host ::ng-deep .dark button[aria-pressed="true"] {
      @apply bg-primary/20 border-primary text-primary;
    }
    
    :host ::ng-deep .dark button[aria-pressed="true"]:hover {
      @apply bg-primary/30;
    }
  `]
})
export class ButtonGroupComponent implements AfterContentInit {
  @Input() orientation: ButtonGroupOrientation = 'horizontal';
  @Input() ariaLabel?: string;
  @Input() mode: ButtonGroupMode = 'default';
  @Input() value?: string | string[] | null; // For controlled mode
  @Output() valueChange = new EventEmitter<string | string[] | null>();
  
  @ContentChildren(ButtonComponent) buttons!: QueryList<ButtonComponent>;
  
  private activeButtons = new Set<string>();
  
  ngAfterContentInit() {
    if (this.mode !== 'default') {
      this.setupToggleMode();
      
      // Initialize active state from input value
      if (this.value !== null && this.value !== undefined) {
        const values = Array.isArray(this.value) ? this.value : [this.value];
        values.forEach(val => this.activeButtons.add(val));
        this.updateButtonStates();
      }
    }
  }
  
  private setupToggleMode() {
    this.buttons.forEach((button, index) => {
      const buttonId = this.getButtonId(button, index);
      
      // Add aria-pressed attribute
      const buttonElement = button['elementRef']?.nativeElement?.querySelector('button');
      if (buttonElement) {
        buttonElement.setAttribute('aria-pressed', this.activeButtons.has(buttonId) ? 'true' : 'false');
      }
      
      // Subscribe to button clicks
      button.clicked.subscribe(() => {
        this.handleButtonClick(buttonId, button);
      });
    });
  }
  
  private handleButtonClick(buttonId: string, button: ButtonComponent) {
    if (this.mode === 'toggle') {
      // Single selection mode
      const wasActive = this.activeButtons.has(buttonId);
      this.activeButtons.clear();
      
      if (!wasActive) {
        this.activeButtons.add(buttonId);
      }
      
      this.updateButtonStates();
      this.emitValue();
    } else if (this.mode === 'toggle-multiple') {
      // Multiple selection mode
      if (this.activeButtons.has(buttonId)) {
        this.activeButtons.delete(buttonId);
      } else {
        this.activeButtons.add(buttonId);
      }
      
      this.updateButtonStates();
      this.emitValue();
    }
  }
  
  private updateButtonStates() {
    this.buttons.forEach((button, index) => {
      const buttonId = this.getButtonId(button, index);
      const buttonElement = button['elementRef']?.nativeElement?.querySelector('button');
      
      if (buttonElement) {
        const isActive = this.activeButtons.has(buttonId);
        buttonElement.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        
        // Update variant for better visual feedback
        if (isActive && button.variant === 'tertiary') {
          // Keep original variant but let CSS handle the active state
        }
      }
    });
  }
  
  private getButtonId(button: ButtonComponent, index: number): string {
    // Try to get text content or use index
    const buttonElement = button['elementRef']?.nativeElement;
    const textContent = buttonElement?.textContent?.trim() || `button-${index}`;
    return textContent;
  }
  
  private emitValue() {
    const values = Array.from(this.activeButtons);
    const emitValue = this.mode === 'toggle' ? values[0] || null : values;
    this.valueChange.emit(emitValue);
  }
  
  get groupClasses(): string {
    const base = 'inline-flex';
    const orientationClass = `button-group-${this.orientation}`;
    
    return `${base} ${orientationClass}`;
  }
}