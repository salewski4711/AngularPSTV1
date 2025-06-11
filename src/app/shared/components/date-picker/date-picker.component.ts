import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, ElementRef, signal, computed, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CalendarComponent } from './calendar.component';
import { DateFormat } from './date-picker.types';
import { IconComponent } from '../../icons/icon.component';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { datePickerClasses } from '../../../core/design-system/component-classes/molecules.classes.static';

@Component({
  selector: 'pst-date-picker',
  standalone: true,
  imports: [CommonModule, CalendarComponent, IconComponent, ClickOutsideDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ],
  template: `
    <div class="relative" appClickOutside (clickOutside)="close()">
      <!-- Input Field -->
      <div class="relative">
        <input
          #input
          type="text"
          [value]="formattedDate()"
          [placeholder]="placeholder"
          [disabled]="disabled"
          (click)="toggle()"
          (focus)="onTouched()"
          (input)="handleInput($event)"
          (keydown)="handleKeydown($event)"
          [class]="getInputClasses()"
          [attr.aria-label]="placeholder || 'Select date'"
          [attr.aria-expanded]="isOpen()"
          [attr.aria-haspopup]="true"
          [attr.aria-invalid]="isInvalid()"
        />
        
        <button
          type="button"
          (click)="toggle()"
          [disabled]="disabled"
          [class]="getButtonClasses()"
          [attr.aria-label]="isOpen() ? 'Close calendar' : 'Open calendar'"
        >
          <pst-icon name="calendar" size="sm" />
        </button>
      </div>
      
      <!-- Calendar Dropdown -->
      @if (isOpen()) {
        <div 
          [class]="getDropdownClasses()"
          style="transition: all 200ms ease-out"
        >
          <pst-calendar
            [value]="value"
            [min]="min"
            [max]="max"
            [disabledDates]="disabledDates"
            (dateSelect)="selectDate($event)"
          />
        </div>
      }
    </div>
  `,
  styles: []
})
export class DatePickerComponent implements ControlValueAccessor {
  @Input() value = signal<Date | null>(null);
  @Input() min = signal<Date | undefined>(undefined);
  @Input() max = signal<Date | undefined>(undefined);
  @Input() disabledDates = signal<Date[]>([]);
  @Input() format = signal<DateFormat>('dd/MM/yyyy');
  @Input() placeholder = 'Select date';
  @Input() disabled = false;
  @Output() dateChange = new EventEmitter<Date | null>();

  @ViewChild('input') inputRef!: ElementRef<HTMLInputElement>;

  isOpen = signal(false);
  menuVisible = signal(false);
  isInvalid = signal(false);
  inputValue = signal('');

  private onChange: (value: Date | null) => void = () => {};
  private _onTouched: () => void = () => {};

  // Public method to handle touch events
  public onTouched(): void {
    this._onTouched();
  }

  formattedDate = computed(() => {
    const date = this.value();
    if (!date) return '';
    return this.formatDate(date, this.format());
  });

  getInputClasses(): string {
    const classes: string[] = [datePickerClasses.input.base, datePickerClasses.input.focus];
    
    if (this.disabled) {
      classes.push(datePickerClasses.input.disabled);
    }
    
    if (this.isInvalid()) {
      classes.push(datePickerClasses.input.invalid);
    }
    
    return classes.join(' ');
  }

  getButtonClasses(): string {
    const classes: string[] = [datePickerClasses.button.base];
    
    if (this.disabled) {
      classes.push(datePickerClasses.button.disabled);
    }
    
    return classes.join(' ');
  }

  getDropdownClasses(): string {
    const classes: string[] = [datePickerClasses.dropdown.wrapper];
    
    if (this.menuVisible()) {
      classes.push(datePickerClasses.dropdown.transition.visible);
    } else {
      classes.push(datePickerClasses.dropdown.transition.invisible);
    }
    
    return classes.join(' ');
  }

  // ControlValueAccessor implementation
  writeValue(value: Date | null): void {
    this.value.set(value);
    this.inputValue.set(value ? this.formatDate(value, this.format()) : '');
  }

  registerOnChange(fn: (value: Date | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
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
    setTimeout(() => {
      this.menuVisible.set(true);
    }, 10);
  }

  close(): void {
    this.menuVisible.set(false);
    setTimeout(() => {
      this.isOpen.set(false);
    }, 200);
  }

  selectDate(date: Date): void {
    this.value.set(date);
    this.inputValue.set(this.formatDate(date, this.format()));
    this.isInvalid.set(false);
    this.onChange(date);
    this.dateChange.emit(date);
    this.close();
  }

  handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.inputValue.set(value);

    if (!value) {
      this.value.set(null);
      this.onChange(null);
      this.dateChange.emit(null);
      this.isInvalid.set(false);
      return;
    }

    const parsedDate = this.parseDate(value, this.format());
    if (parsedDate && this.isValidDate(parsedDate)) {
      this.value.set(parsedDate);
      this.onChange(parsedDate);
      this.dateChange.emit(parsedDate);
      this.isInvalid.set(false);
    } else {
      this.isInvalid.set(true);
    }
  }

  handleKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
        if (this.isOpen()) {
          event.preventDefault();
          this.close();
        }
        break;
      case 'Escape':
        if (this.isOpen()) {
          event.preventDefault();
          this.close();
          this.inputRef.nativeElement.focus();
        }
        break;
      case 'ArrowDown':
        if (!this.isOpen()) {
          event.preventDefault();
          this.open();
        }
        break;
    }
  }

  private formatDate(date: Date, format: DateFormat): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    switch (format) {
      case 'dd/MM/yyyy':
        return `${day}/${month}/${year}`;
      case 'MM/dd/yyyy':
        return `${month}/${day}/${year}`;
      case 'yyyy-MM-dd':
        return `${year}-${month}-${day}`;
      case 'dd.MM.yyyy':
        return `${day}.${month}.${year}`;
      default:
        return `${day}/${month}/${year}`;
    }
  }

  private parseDate(value: string, format: DateFormat): Date | null {
    const parts = value.split(/[\/\-\.]/);
    if (parts.length !== 3) return null;

    let day: number, month: number, year: number;

    switch (format) {
      case 'dd/MM/yyyy':
      case 'dd.MM.yyyy':
        day = parseInt(parts[0], 10);
        month = parseInt(parts[1], 10) - 1;
        year = parseInt(parts[2], 10);
        break;
      case 'MM/dd/yyyy':
        month = parseInt(parts[0], 10) - 1;
        day = parseInt(parts[1], 10);
        year = parseInt(parts[2], 10);
        break;
      case 'yyyy-MM-dd':
        year = parseInt(parts[0], 10);
        month = parseInt(parts[1], 10) - 1;
        day = parseInt(parts[2], 10);
        break;
      default:
        return null;
    }

    const date = new Date(year, month, day);
    
    // Check if date is valid
    if (date.getDate() !== day || date.getMonth() !== month || date.getFullYear() !== year) {
      return null;
    }

    return date;
  }

  private isValidDate(date: Date): boolean {
    const min = this.min();
    const max = this.max();
    const disabledDates = this.disabledDates();

    if (min && date < min) return false;
    if (max && date > max) return false;
    
    const dateTime = date.getTime();
    if (disabledDates.some(d => d.getTime() === dateTime)) return false;

    return true;
  }
}