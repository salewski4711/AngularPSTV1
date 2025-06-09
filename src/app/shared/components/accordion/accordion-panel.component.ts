import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  computed,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  effect
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../icons/icon.component';
import { AccordionPanel } from './accordion.types';

@Component({
  selector: 'pst-accordion-panel',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="border rounded-lg overflow-hidden" [class.opacity-50]="panel()?.disabled">
      <!-- Header -->
      <button
        type="button"
        class="w-full px-4 py-3 flex items-center justify-between text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 disabled:cursor-not-allowed"
        [disabled]="panel()?.disabled"
        (click)="toggle()"
        [attr.aria-expanded]="isExpanded()"
        [attr.aria-controls]="contentId"
      >
        <!-- Icon Left -->
        <pst-icon
          *ngIf="iconPosition() === 'left'"
          name="chevron-right"
          [size]="20"
          class="transition-transform duration-200 mr-3"
          [class.rotate-90]="isExpanded()"
        />
        
        <!-- Header Text -->
        <span class="flex-1 font-medium">{{ panel()?.header }}</span>
        
        <!-- Icon Right -->
        <pst-icon
          *ngIf="iconPosition() === 'right'"
          name="chevron-down"
          [size]="20"
          class="transition-transform duration-200 ml-3"
          [class.rotate-180]="isExpanded()"
        />
      </button>

      <!-- Content -->
      <div
        #contentWrapper
        [id]="contentId"
        class="overflow-hidden transition-all"
        [class.duration-300]="animated()"
        [style.max-height.px]="isExpanded() ? contentHeight() : 0"
      >
        <div #content class="px-4 py-3 border-t dark:border-gray-700">
          <ng-content></ng-content>
          <span *ngIf="panel()?.content">{{ panel()?.content }}</span>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccordionPanelComponent implements AfterViewInit {
  @Input() panel = signal<AccordionPanel | null>(null);
  @Input() animated = signal(true);
  @Input() iconPosition = signal<'left' | 'right'>('right');
  @Output() panelToggle = new EventEmitter<boolean>();

  @ViewChild('content', { read: ElementRef }) contentElement!: ElementRef<HTMLElement>;
  @ViewChild('contentWrapper', { read: ElementRef }) contentWrapper!: ElementRef<HTMLElement>;

  contentHeight = signal(0);
  isExpanded = computed(() => this.panel()?.expanded || false);
  contentId = `accordion-content-${Math.random().toString(36).substr(2, 9)}`;

  constructor() {
    // Update content height when expanded state changes
    effect(() => {
      if (this.isExpanded() && this.contentElement) {
        this.updateContentHeight();
      }
    });
  }

  ngAfterViewInit() {
    // Initial height calculation if expanded
    if (this.isExpanded()) {
      this.updateContentHeight();
    }

    // Observe content changes
    if (this.contentElement && typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver(() => {
        if (this.isExpanded()) {
          this.updateContentHeight();
        }
      });
      resizeObserver.observe(this.contentElement.nativeElement);
    }
  }

  toggle() {
    if (!this.panel()?.disabled) {
      this.panelToggle.emit(!this.isExpanded());
    }
  }

  private updateContentHeight() {
    if (this.contentElement) {
      const height = this.contentElement.nativeElement.scrollHeight;
      this.contentHeight.set(height);
    }
  }
}