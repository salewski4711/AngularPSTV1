import { Component, Input, HostBinding, ElementRef, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipPosition } from './tooltip.service';
import { TokenUtils } from '../../../core/design-system/token-utilities';

@Component({
  selector: 'pst-tooltip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tooltip-content" [style.max-width.px]="maxWidth">
      <ng-content></ng-content>
    </div>
    <div 
      class="tooltip-arrow" 
      [class.arrow-top]="actualPosition === 'bottom'"
      [class.arrow-bottom]="actualPosition === 'top'"
      [class.arrow-left]="actualPosition === 'right'"
      [class.arrow-right]="actualPosition === 'left'"
      [style.left.px]="arrowX"
      [style.top.px]="arrowY"
    ></div>
  `,
  styles: [`
    :host {
      position: fixed;
      z-index: 9999;
      pointer-events: none;
      opacity: 0;
      transform: scale(0.95);
      transition: opacity 200ms ease-in-out, transform 200ms ease-in-out;
    }

    :host.visible {
      opacity: 1;
      transform: scale(1);
    }

    .tooltip-content {
      background-color: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 0.5rem 0.75rem; /* spacing.2 spacing.3 */
      border-radius: 0.25rem; /* spacing.1 */
      font-size: 0.875rem; /* text-sm */
      line-height: 1.4;
      word-wrap: break-word;
    }

    .tooltip-arrow {
      position: absolute;
      width: 0;
      height: 0;
      border-style: solid;
    }

    .arrow-top {
      border-width: 0 0.375rem 0.375rem 0.375rem; /* spacing.1.5 */
      border-color: transparent transparent rgba(0, 0, 0, 0.9) transparent;
    }

    .arrow-bottom {
      border-width: 0.375rem 0.375rem 0 0.375rem; /* spacing.1.5 */
      border-color: rgba(0, 0, 0, 0.9) transparent transparent transparent;
    }

    .arrow-left {
      border-width: 0.375rem 0.375rem 0.375rem 0; /* spacing.1.5 */
      border-color: transparent rgba(0, 0, 0, 0.9) transparent transparent;
    }

    .arrow-right {
      border-width: 0.375rem 0 0.375rem 0.375rem; /* spacing.1.5 */
      border-color: transparent transparent transparent rgba(0, 0, 0, 0.9);
    }

    /* Dark theme adjustments */
    :host-context(.dark) .tooltip-content {
      background-color: rgba(255, 255, 255, 0.95);
      color: #171717; /* neutral.900 */
    }

    :host-context(.dark) .arrow-top {
      border-bottom-color: rgba(255, 255, 255, 0.95);
    }

    :host-context(.dark) .arrow-bottom {
      border-top-color: rgba(255, 255, 255, 0.95);
    }

    :host-context(.dark) .arrow-left {
      border-right-color: rgba(255, 255, 255, 0.95);
    }

    :host-context(.dark) .arrow-right {
      border-left-color: rgba(255, 255, 255, 0.95);
    }
  `]
})
export class TooltipComponent implements OnInit {
  @Input() content: string = '';
  @Input() maxWidth: number = 200;
  @Input() actualPosition: TooltipPosition = 'top';
  
  @HostBinding('class.visible') visible = false;
  @HostBinding('style.left.px') x = 0;
  @HostBinding('style.top.px') y = 0;

  arrowX = 0;
  arrowY = 0;

  constructor(
    public elementRef: ElementRef<HTMLElement>,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Ensure content is rendered
    this.cdr.detectChanges();
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

  setPosition(x: number, y: number, arrowX?: number, arrowY?: number) {
    this.x = x;
    this.y = y;
    if (arrowX !== undefined) {this.arrowX = arrowX;}
    if (arrowY !== undefined) {this.arrowY = arrowY;}
  }

  setActualPosition(position: TooltipPosition) {
    this.actualPosition = position;
  }
}