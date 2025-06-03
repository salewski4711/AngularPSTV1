import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

/**
 * Directive that emits an event when a click occurs outside of the host element.
 * Useful for closing dropdowns, modals, and menus when clicking outside.
 * 
 * @example
 * <div appClickOutside (clickOutside)="closeMenu()">
 *   <!-- menu content -->
 * </div>
 */
@Directive({
  selector: '[appClickOutside]',
  standalone: true
})
export class ClickOutsideDirective {
  @Output() clickOutside = new EventEmitter<Event>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  @HostListener('document:touchstart', ['$event'])
  onClick(event: Event): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    
    if (!clickedInside) {
      this.clickOutside.emit(event);
    }
  }
}