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
import { accordionClasses } from '../../../core/design-system/component-classes/molecules.classes.static';

@Component({
  selector: 'pst-accordion-panel',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div [class]="panelClasses()">
      <!-- Header -->
      <button
        type="button"
        [class]="headerButtonClasses()"
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
          [class]="iconLeftClasses()"
        />
        
        <!-- Header Text -->
        <span [class]="accordionClasses.header.text">{{ panel()?.header }}</span>
        
        <!-- Icon Right -->
        <pst-icon
          *ngIf="iconPosition() === 'right'"
          name="chevron-down"
          [size]="20"
          [class]="iconRightClasses()"
        />
      </button>

      <!-- Content -->
      <div
        #contentWrapper
        [id]="contentId"
        [class]="contentWrapperClasses()"
        [style.max-height.px]="isExpanded() ? contentHeight() : 0"
      >
        <div #content [class]="accordionClasses.content.inner">
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
  
  // Reference to static classes for template use
  readonly accordionClasses = accordionClasses;

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
  
  // Computed class properties
  panelClasses = computed(() => {
    const classes: string[] = [accordionClasses.panel.base];
    if (this.panel()?.disabled) {
      classes.push(accordionClasses.panel.disabled);
    }
    return classes.join(' ');
  });

  headerButtonClasses = computed(() => accordionClasses.header.button);

  contentWrapperClasses = computed(() => {
    const classes: string[] = [accordionClasses.content.wrapper];
    if (this.animated()) {
      classes.push(accordionClasses.content.animated);
    }
    return classes.join(' ');
  });

  iconLeftClasses = computed(() => {
    const classes: string[] = [accordionClasses.icon.base, accordionClasses.icon.left];
    if (this.isExpanded()) {
      classes.push(accordionClasses.icon.expanded.left);
    }
    return classes.join(' ');
  });

  iconRightClasses = computed(() => {
    const classes: string[] = [accordionClasses.icon.base, accordionClasses.icon.right];
    if (this.isExpanded()) {
      classes.push(accordionClasses.icon.expanded.right);
    }
    return classes.join(' ');
  });
}