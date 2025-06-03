import {
  Directive,
  Input,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewContainerRef,
  ComponentRef,
  ApplicationRef,
  Injector,
  createComponent,
  EnvironmentInjector,
  inject
} from '@angular/core';
import { TooltipComponent } from './tooltip.component';
import { TooltipService, TooltipPosition } from './tooltip.service';
import { DOCUMENT } from '@angular/common';

export type TooltipTrigger = 'hover' | 'click' | 'focus';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective implements OnDestroy {
  @Input('appTooltip') content: string = '';
  @Input() tooltipPosition: TooltipPosition = 'auto';
  @Input() tooltipTrigger: TooltipTrigger | TooltipTrigger[] = 'hover';
  @Input() tooltipDelay: number = 0;
  @Input() tooltipMaxWidth: number = 200;
  @Input() tooltipDisabled: boolean = false;
  @Input() tooltipAppendToBody: boolean = true;

  private tooltipRef: ComponentRef<TooltipComponent> | null = null;
  private delayTimeout: any;
  private isVisible = false;
  private clickListener?: () => void;
  private clickTimeout?: number;

  private readonly elementRef = inject(ElementRef);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly tooltipService = inject(TooltipService);
  private readonly appRef = inject(ApplicationRef);
  private readonly injector = inject(Injector);
  private readonly environmentInjector = inject(EnvironmentInjector);
  private readonly document = inject(DOCUMENT);

  ngOnDestroy() {
    // Clear timeout if pending
    if (this.clickTimeout) {
      clearTimeout(this.clickTimeout);
    }
    
    this.hideTooltip();
    this.removeTooltipElement();
    if (this.clickListener) {
      this.document.removeEventListener('click', this.clickListener);
    }
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    if (this.isTrigger('hover')) {
      this.showTooltip();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (this.isTrigger('hover')) {
      this.hideTooltip();
    }
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    if (this.isTrigger('click')) {
      event.stopPropagation();
      if (this.isVisible) {
        this.hideTooltip();
      } else {
        this.showTooltip();
        // Clear existing timeout if any
        if (this.clickTimeout) {
          clearTimeout(this.clickTimeout);
        }
        
        // Add document click listener to close on outside click
        this.clickTimeout = window.setTimeout(() => {
          this.clickListener = () => this.hideTooltip();
          this.document.addEventListener('click', this.clickListener);
        }, 100);
      }
    }
  }

  @HostListener('focus')
  onFocus() {
    if (this.isTrigger('focus')) {
      this.showTooltip();
    }
  }

  @HostListener('blur')
  onBlur() {
    if (this.isTrigger('focus')) {
      this.hideTooltip();
    }
  }

  private isTrigger(trigger: TooltipTrigger): boolean {
    const triggers = Array.isArray(this.tooltipTrigger) ? this.tooltipTrigger : [this.tooltipTrigger];
    return triggers.includes(trigger);
  }

  private showTooltip() {
    if (this.tooltipDisabled || !this.content || this.isVisible) {
      return;
    }

    this.clearDelay();

    if (this.tooltipDelay > 0) {
      this.delayTimeout = setTimeout(() => this.doShowTooltip(), this.tooltipDelay);
    } else {
      this.doShowTooltip();
    }
  }

  private doShowTooltip() {
    // Create tooltip component
    if (!this.tooltipRef) {
      this.tooltipRef = createComponent(TooltipComponent, {
        environmentInjector: this.environmentInjector,
        elementInjector: this.injector
      });

      // Set tooltip properties
      this.tooltipRef.instance.content = this.content;
      this.tooltipRef.instance.maxWidth = this.tooltipMaxWidth;

      // Attach to DOM
      if (this.tooltipAppendToBody) {
        this.document.body.appendChild(this.tooltipRef.location.nativeElement);
      } else {
        this.viewContainerRef.insert(this.tooltipRef.hostView);
      }

      // Manually trigger change detection
      this.appRef.attachView(this.tooltipRef.hostView);
      this.tooltipRef.changeDetectorRef.detectChanges();
    }

    // Position tooltip
    setTimeout(() => {
      if (this.tooltipRef) {
        const position = this.tooltipService.calculatePosition(
          this.elementRef,
          this.tooltipRef.location.nativeElement,
          this.tooltipPosition,
          this.tooltipAppendToBody
        );

        this.tooltipRef.instance.setPosition(position.x, position.y, position.arrowX, position.arrowY);
        this.tooltipRef.instance.setActualPosition(position.position);
        this.tooltipRef.instance.show();
        this.isVisible = true;
      }
    });
  }

  private hideTooltip() {
    this.clearDelay();

    if (this.tooltipRef && this.isVisible) {
      this.tooltipRef.instance.hide();
      this.isVisible = false;

      // Remove after animation completes
      setTimeout(() => {
        this.removeTooltipElement();
      }, 200);
    }

    // Clear click timeout if exists
    if (this.clickTimeout) {
      clearTimeout(this.clickTimeout);
      this.clickTimeout = undefined;
    }

    if (this.clickListener) {
      this.document.removeEventListener('click', this.clickListener);
      this.clickListener = undefined;
    }
  }

  private removeTooltipElement() {
    if (this.tooltipRef) {
      this.appRef.detachView(this.tooltipRef.hostView);
      this.tooltipRef.destroy();
      this.tooltipRef = null;
    }
  }

  private clearDelay() {
    if (this.delayTimeout) {
      clearTimeout(this.delayTimeout);
      this.delayTimeout = null;
    }
  }
}