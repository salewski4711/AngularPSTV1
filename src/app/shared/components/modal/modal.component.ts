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

@Component({
  selector: 'pst-modal',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isOpen()) {
      <!-- Backdrop -->
      <div 
        class="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        [class.opacity-0]="!isVisible()"
        [class.opacity-100]="isVisible()"
        (click)="onBackdropClick()"
        [@fadeIn]="isVisible() ? 'visible' : 'hidden'"
      ></div>

      <!-- Modal Container -->
      <div 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300"
        [class.opacity-0]="!isVisible()"
        [class.opacity-100]="isVisible()"
        [class.scale-95]="!isVisible()"
        [class.scale-100]="isVisible()"
      >
        <!-- Modal -->
        <div
          #modalElement
          class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full transition-all duration-300"
          [class]="modalSizeClass()"
          [@modalScale]="isVisible() ? 'visible' : 'hidden'"
          role="dialog"
          [attr.aria-labelledby]="titleId"
          [attr.aria-modal]="true"
          (click)="$event.stopPropagation()"
        >
          <!-- Header -->
          <div class="px-6 py-4 border-b dark:border-gray-700 flex items-center justify-between">
            <h2 
              [id]="titleId"
              class="text-lg font-semibold text-gray-900 dark:text-white"
            >
              {{ title() || 'Modal' }}
            </h2>
            @if (showCloseButton()) {
              <button
                type="button"
                class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
                (click)="onClose()"
                aria-label="Close modal"
              >
                <pst-icon name="close" [size]="20" />
              </button>
            }
          </div>

          <!-- Body -->
          <div class="px-6 py-4">
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

  // Computed modal size class
  modalSizeClass = computed(() => {
    const sizeMap: Record<ModalSize, string> = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl'
    };
    return sizeMap[this.size()];
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