import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, ElementRef, HostListener, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownPositionDirective } from './dropdown.directive';
import { DropdownItem, DropdownPosition } from './dropdown.types';
import { IconComponent } from '../../icons/icon.component';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { dropdownClasses } from '../../../core/design-system/component-classes/molecules.classes.static';

@Component({
  selector: 'pst-dropdown',
  standalone: true,
  imports: [CommonModule, IconComponent, DropdownPositionDirective, ClickOutsideDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative inline-block">
      <!-- Trigger -->
      <div 
        #trigger
        (click)="toggle()"
        [class.pointer-events-none]="disabled"
        [class.opacity-50]="disabled"
        [attr.aria-expanded]="isOpen()"
        [attr.aria-haspopup]="true"
        [attr.aria-controls]="menuId"
      >
        <ng-content select="[trigger]"></ng-content>
      </div>

      <!-- Menu -->
      @if (isOpen()) {
        <div
          #menu
          [id]="menuId"
          [appDropdownPosition]="position"
          [triggerElement]="trigger"
          appClickOutside
          (clickOutside)="close()"
          [class]="menuClass"
          [class.opacity-0]="!menuVisible()"
          [class.opacity-100]="menuVisible()"
          [class.scale-95]="!menuVisible()"
          [class.scale-100]="menuVisible()"
          role="menu"
          [attr.aria-labelledby]="triggerId"
          (keydown)="handleKeydown($event)"
        >
          @for (item of items; track item.id || item.label; let i = $index) {
            @if (item.divider) {
              <div [class]="dividerClass"></div>
            } @else {
              <button
                type="button"
                (click)="selectItem(item)"
                [disabled]="item.disabled"
                [class]="getItemClass(item)"
                [attr.data-index]="i"
                role="menuitem"
                [attr.aria-disabled]="item.disabled"
              >
                @if (item.icon) {
                  <pst-icon 
                    [name]="item.icon" 
                    size="xs" 
                    class="inline-block mr-2"
                  />
                }
                {{ item.label }}
              </button>
            }
          }
        </div>
      }
    </div>
  `,
  styles: []
})
export class DropdownComponent {
  @Input() items: DropdownItem[] = [];
  @Input() position: DropdownPosition = 'bottom-start';
  @Input() closeOnSelect = true;
  @Input() disabled = false;
  @Output() itemClick = new EventEmitter<DropdownItem>();

  @ViewChild('trigger', { static: true }) triggerRef!: ElementRef<HTMLElement>;
  @ViewChild('menu') menuRef?: ElementRef<HTMLElement>;

  isOpen = signal(false);
  menuVisible = signal(false);
  focusedIndex = signal(-1);

  menuId = `dropdown-menu-${Math.random().toString(36).substr(2, 9)}`;
  triggerId = `dropdown-trigger-${Math.random().toString(36).substr(2, 9)}`;

  // Using static classes from molecules.classes.static.ts
  readonly menuClass = dropdownClasses.menu.base;
  readonly dividerClass = dropdownClasses.divider;

  getItemClass(item: DropdownItem): string {
    if (item.disabled) {
      return `${dropdownClasses.item.base} ${dropdownClasses.item.disabled}`;
    }
    return `${dropdownClasses.item.base} ${dropdownClasses.item.default}`;
  }

  toggle(): void {
    if (this.disabled) return;
    
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  open(): void {
    if (this.disabled || this.isOpen()) return;
    
    this.isOpen.set(true);
    // Delay to allow positioning before animation
    setTimeout(() => {
      this.menuVisible.set(true);
      this.focusFirstItem();
    }, 10);
  }

  close(): void {
    this.menuVisible.set(false);
    setTimeout(() => {
      this.isOpen.set(false);
      this.focusedIndex.set(-1);
    }, 200);
  }

  selectItem(item: DropdownItem): void {
    if (item.disabled) return;
    
    this.itemClick.emit(item);
    item.action?.();
    
    if (this.closeOnSelect) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isOpen()) {
      this.close();
      this.triggerRef.nativeElement.focus();
    }
  }

  handleKeydown(event: KeyboardEvent): void {
    const items = this.getSelectableItems();
    if (items.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.focusNextItem();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusPreviousItem();
        break;
      case 'Home':
        event.preventDefault();
        this.focusFirstItem();
        break;
      case 'End':
        event.preventDefault();
        this.focusLastItem();
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        const focusedItem = items[this.focusedIndex()];
        if (focusedItem) {
          this.selectItem(focusedItem);
        }
        break;
      case 'Tab':
        this.close();
        break;
    }
  }

  private getSelectableItems(): DropdownItem[] {
    return this.items.filter(item => !item.divider && !item.disabled);
  }

  private focusNextItem(): void {
    const items = this.getSelectableItems();
    const currentIndex = this.focusedIndex();
    const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
    this.focusItemAtIndex(nextIndex);
  }

  private focusPreviousItem(): void {
    const items = this.getSelectableItems();
    const currentIndex = this.focusedIndex();
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
    this.focusItemAtIndex(prevIndex);
  }

  private focusFirstItem(): void {
    this.focusItemAtIndex(0);
  }

  private focusLastItem(): void {
    const items = this.getSelectableItems();
    this.focusItemAtIndex(items.length - 1);
  }

  private focusItemAtIndex(index: number): void {
    this.focusedIndex.set(index);
    
    if (this.menuRef) {
      const items = this.menuRef.nativeElement.querySelectorAll('button[role="menuitem"]:not([disabled])');
      const item = items[index] as HTMLElement;
      item?.focus();
    }
  }
}