import {
  Component,
  input,
  output,
  effect,
  ChangeDetectionStrategy,
  HostListener,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  inject,
  signal,
  computed
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../icons/icon.component';
import { ModalSize } from './modal.types';
import { modalClasses } from '../../../core/design-system/component-classes/molecules.classes.static';

@Component({
  selector: 'pst-modal',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isOpen()) {
      <!-- Backdrop -->
      <div 
        [class]="backdropClass"
        [class.opacity-0]="!isVisible()"
        [class.opacity-100]="isVisible()"
        (click)="onBackdropClick()"
        [@fadeIn]="isVisible() ? 'visible' : 'hidden'"
      ></div>

      <!-- Modal Container -->
      <div 
        [class]="wrapperClass"
        [class.opacity-0]="!isVisible()"
        [class.opacity-100]="isVisible()"
        [class.scale-95]="!isVisible()"
        [class.scale-100]="isVisible()"
      >
        <!-- Modal -->
        <div
          #modalElement
          [class]="modalClass()"
          [@modalScale]="isVisible() ? 'visible' : 'hidden'"
          role="dialog"
          [attr.aria-labelledby]="titleId"
          [attr.aria-modal]="true"
          (click)="$event.stopPropagation()"
        >
          <!-- Header -->
          <div [class]="headerClass">
            <h2 
              [id]="titleId"
              [class]="titleClass"
            >
              {{ title() || 'Modal' }}
            </h2>
            @if (showCloseButton()) {
              <button
                type="button"
                [class]="closeButtonClass"
                (click)="onClose()"
                aria-label="Close modal"
              >
                <pst-icon name="close" [size]="20" />
              </button>
            }
          </div>

          <!-- Body -->
          <div [class]="bodyClass">
            <ng-content select="[modal-body]"></ng-content>
          </div>

          <!-- Footer (optional) -->
          <ng-content select="[modal-footer]"></ng-content>
        </div>
      </div>
    }
  `,
  animations: [
    // Note: Angular animations would be defined here
    // For now, we're using Tailwind classes for transitions
  ]
})
export class ModalComponent implements AfterViewInit, OnDestroy {
  private elementRef = inject(ElementRef);
  private previouslyFocusedElement: HTMLElement | null = null;
  private focusableElements: HTMLElement[] = [];
  
  // Inputs
  isOpen = input<boolean>(false);
  size = input<ModalSize>('md');
  title = input<string>();
  closeOnBackdrop = input<boolean>(true);
  closeOnEsc = input<boolean>(true);
  showCloseButton = input<boolean>(true);

  // Outputs
  close = output<void>();

  // Internal state
  isVisible = signal(false);
  titleId = `modal-title-${Math.random().toString(36).substr(2, 9)}`;

  // Using static classes from molecules.classes.static.ts
  readonly backdropClass = modalClasses.backdrop;
  readonly wrapperClass = `${modalClasses.wrapper} transition-opacity transition-transform duration-300`;
  readonly headerClass = modalClasses.header.base;
  readonly titleClass = modalClasses.header.title;
  readonly closeButtonClass = modalClasses.header.closeButton;
  readonly bodyClass = modalClasses.body;

  // Computed modal size class
  modalSizeClass = computed(() => {
    // Map component size prop to static class size
    const sizeMap: Record<ModalSize, keyof typeof modalClasses.modal.sizes> = {
      sm: 'sm',
      md: 'md',
      lg: 'lg',
      xl: 'xl'
    };
    return modalClasses.modal.sizes[sizeMap[this.size()]];
  });

  // Computed modal class
  modalClass = computed(() => {
    return `${modalClasses.modal.base} ${this.modalSizeClass()}`;
  });

  constructor() {
    // Watch for isOpen changes
    effect(() => {
      if (this.isOpen()) {
        this.open();
      } else {
        this.closeModal();
      }
    });
  }

  ngAfterViewInit(): void {
    // Set up focus trap when modal opens
    if (this.isOpen()) {
      this.setupFocusTrap();
    }
  }

  ngOnDestroy(): void {
    // Restore focus when component is destroyed
    if (this.previouslyFocusedElement) {
      this.previouslyFocusedElement.focus();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.closeOnEsc() && this.isOpen()) {
      this.onClose();
    }
  }

  private open(): void {
    // Store currently focused element
    this.previouslyFocusedElement = document.activeElement as HTMLElement;
    
    // Show modal with animation
    setTimeout(() => {
      this.isVisible.set(true);
      this.setupFocusTrap();
    }, 10);
  }

  private closeModal(): void {
    this.isVisible.set(false);
    
    // Wait for animation to complete
    setTimeout(() => {
      // Restore focus to previously focused element
      if (this.previouslyFocusedElement) {
        this.previouslyFocusedElement.focus();
        this.previouslyFocusedElement = null;
      }
    }, 300);
  }

  private setupFocusTrap(): void {
    const modalElement = this.elementRef.nativeElement.querySelector('[role="dialog"]');
    if (!modalElement) return;

    // Get all focusable elements
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ];

    this.focusableElements = Array.from(
      modalElement.querySelectorAll(focusableSelectors.join(','))
    );

    // Focus first focusable element or modal itself
    if (this.focusableElements.length > 0) {
      this.focusableElements[0].focus();
    } else {
      modalElement.focus();
    }

    // Add keyboard navigation
    modalElement.addEventListener('keydown', this.handleTabKey);
  }

  private handleTabKey = (event: KeyboardEvent): void => {
    if (event.key !== 'Tab' || this.focusableElements.length === 0) return;

    const firstElement = this.focusableElements[0];
    const lastElement = this.focusableElements[this.focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  onBackdropClick(): void {
    if (this.closeOnBackdrop()) {
      this.onClose();
    }
  }

  onClose(): void {
    this.close.emit();
  }
}