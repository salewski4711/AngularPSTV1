import { Directive, ElementRef, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { DropdownPosition } from './dropdown.types';

@Directive({
  selector: '[appDropdownPosition]',
  standalone: true
})
export class DropdownPositionDirective implements OnInit, OnDestroy {
  @Input() appDropdownPosition: DropdownPosition = 'bottom-start';
  @Input() triggerElement?: HTMLElement;
  @Input() offset = 8;

  private resizeObserver?: ResizeObserver;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this.updatePosition();
    
    // Watch for window resize
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('scroll', this.handleResize, true);

    // Watch for trigger element size changes
    if (this.triggerElement && 'ResizeObserver' in window) {
      this.resizeObserver = new ResizeObserver(() => this.updatePosition());
      this.resizeObserver.observe(this.triggerElement);
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('scroll', this.handleResize, true);
    this.resizeObserver?.disconnect();
  }

  private handleResize = (): void => {
    this.updatePosition();
  };

  updatePosition(): void {
    if (!this.triggerElement) return;

    const menu = this.elementRef.nativeElement;
    const trigger = this.triggerElement;
    const triggerRect = trigger.getBoundingClientRect();
    const menuRect = menu.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    let top = 0;
    let left = 0;

    // Calculate position based on placement
    switch (this.appDropdownPosition) {
      case 'bottom-start':
        top = triggerRect.bottom + this.offset;
        left = triggerRect.left;
        break;
      case 'bottom-end':
        top = triggerRect.bottom + this.offset;
        left = triggerRect.right - menuRect.width;
        break;
      case 'top-start':
        top = triggerRect.top - menuRect.height - this.offset;
        left = triggerRect.left;
        break;
      case 'top-end':
        top = triggerRect.top - menuRect.height - this.offset;
        left = triggerRect.right - menuRect.width;
        break;
      case 'left':
        top = triggerRect.top + (triggerRect.height - menuRect.height) / 2;
        left = triggerRect.left - menuRect.width - this.offset;
        break;
      case 'right':
        top = triggerRect.top + (triggerRect.height - menuRect.height) / 2;
        left = triggerRect.right + this.offset;
        break;
    }

    // Adjust if menu goes outside viewport
    if (left + menuRect.width > viewport.width) {
      left = viewport.width - menuRect.width - this.offset;
    }
    if (left < this.offset) {
      left = this.offset;
    }
    if (top + menuRect.height > viewport.height) {
      top = viewport.height - menuRect.height - this.offset;
    }
    if (top < this.offset) {
      top = this.offset;
    }

    // Apply position
    menu.style.position = 'fixed';
    menu.style.top = `${top}px`;
    menu.style.left = `${left}px`;
    menu.style.zIndex = '40';
  }
}