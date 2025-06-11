import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, ElementRef, signal, computed, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Time, TimeFormat, MinuteInterval } from './time-picker.types';
import { IconComponent } from '../../icons/icon.component';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { timePickerClasses } from '../../../core/design-system/component-classes/molecules.classes.static';

@Component({
  selector: 'pst-time-picker',
  standalone: true,
  imports: [CommonModule, IconComponent, ClickOutsideDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimePickerComponent),
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
          [value]="formattedTime()"
          [placeholder]="placeholder"
          [disabled]="disabled"
          (click)="toggle()"
          (focus)="markAsTouched()"
          (input)="handleInput($event)"
          (keydown)="handleKeydown($event)"
          class="w-full px-3 py-2 pr-10 border rounded-md transition-colors duration-200"
          [class]="inputClasses"
          [attr.aria-label]="placeholder || 'Select time'"
          [attr.aria-expanded]="isOpen()"
          [attr.aria-haspopup]="true"
          [attr.aria-invalid]="isInvalid()"
        />
        
        <button
          type="button"
          (click)="toggle()"
          [disabled]="disabled"
          class="absolute right-0 top-0 h-full px-3 flex items-center justify-center"
          [class]="buttonClasses"
          [attr.aria-label]="isOpen() ? 'Close time picker' : 'Open time picker'"
        >
          <pst-icon name="clock" size="sm" />
        </button>
      </div>
      
      <!-- Time Picker Dropdown -->
      @if (isOpen()) {
        <div 
          [class]="dropdownClasses()"
          style="transition: all 200ms ease-out"
        >
          <div class="flex items-center justify-center space-x-2">
            <!-- Hour Selector -->
            <div class="flex flex-col items-center">
              <button
                type="button"
                (click)="incrementHour()"
                [class]="getIncrementButtonClasses(!canIncrementHour())"
                [disabled]="!canIncrementHour()"
              >
                <pst-icon name="chevron-up" size="xs" />
              </button>
              
              <input
                type="text"
                [value]="displayHour()"
                (input)="handleHourInput($event)"
                (blur)="validateHourInput()"
                class="w-16 px-2 py-1 text-center text-2xl font-mono border rounded-md"
                [class]="getTimeInputClasses()"
                maxlength="2"
                placeholder="00"
              />
              
              <button
                type="button"
                (click)="decrementHour()"
                [class]="getIncrementButtonClasses(!canDecrementHour())"
                [disabled]="!canDecrementHour()"
              >
                <pst-icon name="chevron-down" size="xs" />
              </button>
            </div>
            
            <!-- Separator -->
            <span [class]="timePickerClasses.timeControl.separator">:</span>
            
            <!-- Minute Selector -->
            <div class="flex flex-col items-center">
              <button
                type="button"
                (click)="incrementMinute()"
                [class]="getIncrementButtonClasses(!canIncrementMinute())"
                [disabled]="!canIncrementMinute()"
              >
                <pst-icon name="chevron-up" size="xs" />
              </button>
              
              <input
                type="text"
                [value]="displayMinute()"
                (input)="handleMinuteInput($event)"
                (blur)="validateMinuteInput()"
                class="w-16 px-2 py-1 text-center text-2xl font-mono border rounded-md"
                [class]="getTimeInputClasses()"
                maxlength="2"
                placeholder="00"
              />
              
              <button
                type="button"
                (click)="decrementMinute()"
                [class]="getIncrementButtonClasses(!canDecrementMinute())"
                [disabled]="!canDecrementMinute()"
              >
                <pst-icon name="chevron-down" size="xs" />
              </button>
            </div>
            
            <!-- AM/PM Selector for 12-hour format -->
            @if (format() === '12') {
              <div class="flex flex-col space-y-1 ml-2">
                <button
                  type="button"
                  (click)="setAmPm('AM')"
                  class="px-3 py-1 text-sm font-medium rounded transition-colors"
                  [class]="getAmPmClasses('AM')"
                >
                  AM
                </button>
                <button
                  type="button"
                  (click)="setAmPm('PM')"
                  class="px-3 py-1 text-sm font-medium rounded transition-colors"
                  [class]="getAmPmClasses('PM')"
                >
                  PM
                </button>
              </div>
            }
          </div>
          
          <!-- Now Button -->
          <div [class]="timePickerClasses.nowButton.container">
            <button
              type="button"
              (click)="selectNow()"
              [class]="timePickerClasses.nowButton.button"
            >
              Now
            </button>
          </div>
        </div>
      }
    </div>
  `,
  styles: []
})
export class TimePickerComponent implements ControlValueAccessor {
  @Input() value = signal<Time | null>(null);
  @Input() format = signal<TimeFormat>('24');
  @Input() minuteInterval = signal<MinuteInterval>(1);
  @Input() min = signal<Time | undefined>(undefined);
  @Input() max = signal<Time | undefined>(undefined);
  @Input() placeholder = 'Select time';
  @Input() disabled = false;
  @Output() timeChange = new EventEmitter<Time | null>();

  @ViewChild('input') inputRef!: ElementRef<HTMLInputElement>;

  isOpen = signal(false);
  menuVisible = signal(false);
  isInvalid = signal(false);
  
  hours = signal(0);
  minutes = signal(0);
  amPm = signal<'AM' | 'PM'>('AM');

  // Reference to static classes for use in template
  timePickerClasses = timePickerClasses;

  private onChange: (value: Time | null) => void = () => {};
  private onTouched: () => void = () => {};

  formattedTime = computed(() => {
    const time = this.value();
    if (!time) return '';
    return this.formatTime(time, this.format());
  });

  displayHour = computed(() => {
    const h = this.hours();
    if (this.format() === '12') {
      if (h === 0) return '12';
      if (h > 12) return (h - 12).toString().padStart(2, '0');
    }
    return h.toString().padStart(2, '0');
  });

  displayMinute = computed(() => {
    return this.minutes().toString().padStart(2, '0');
  });

  // Computed class properties
  get inputClasses(): string {
    const baseClasses: string[] = [timePickerClasses.input.base, timePickerClasses.input.focus];
    
    if (this.disabled) {
      baseClasses.push(timePickerClasses.input.disabled);
    }
    
    if (this.isInvalid()) {
      baseClasses.push(timePickerClasses.input.invalid);
    }
    
    return baseClasses.join(' ');
  }

  get buttonClasses(): string {
    const baseClasses: string[] = [timePickerClasses.button.base];
    
    if (this.disabled) {
      baseClasses.push(timePickerClasses.button.disabled);
    }
    
    return baseClasses.join(' ');
  }

  dropdownClasses = computed(() => {
    const baseClasses: string[] = [timePickerClasses.dropdown.base];
    
    if (this.menuVisible()) {
      baseClasses.push(timePickerClasses.dropdown.transition.visible);
    } else {
      baseClasses.push(timePickerClasses.dropdown.transition.invisible);
    }
    
    return baseClasses.join(' ');
  });

  getIncrementButtonClasses(disabled: boolean): string {
    const baseClasses: string[] = [timePickerClasses.timeControl.incrementButton];
    
    if (disabled) {
      baseClasses.push(timePickerClasses.timeControl.incrementButtonDisabled);
    }
    
    return baseClasses.join(' ');
  }

  getTimeInputClasses(): string {
    const baseClasses: string[] = [timePickerClasses.timeControl.timeInput];
    
    if (this.isInvalid()) {
      baseClasses.push(timePickerClasses.timeControl.timeInputInvalid);
    }
    
    return baseClasses.join(' ');
  }

  getAmPmClasses(period: 'AM' | 'PM'): string {
    return this.amPm() === period 
      ? timePickerClasses.amPm.active 
      : timePickerClasses.amPm.inactive;
  }

  // ControlValueAccessor implementation
  writeValue(value: Time | null): void {
    this.value.set(value);
    if (value) {
      this.hours.set(value.hours);
      this.minutes.set(value.minutes);
      this.updateAmPm(value.hours);
    }
  }

  registerOnChange(fn: (value: Time | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Public method to handle touch events from template
  markAsTouched(): void {
    this.onTouched();
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
    
    // Initialize from current value
    const currentValue = this.value();
    if (currentValue) {
      this.hours.set(currentValue.hours);
      this.minutes.set(currentValue.minutes);
      this.updateAmPm(currentValue.hours);
    } else {
      // Default to current time
      const now = new Date();
      this.hours.set(now.getHours());
      this.minutes.set(now.getMinutes());
      this.updateAmPm(now.getHours());
    }
    
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

  incrementHour(): void {
    const newHour = (this.hours() + 1) % 24;
    if (this.isValidTime({ hours: newHour, minutes: this.minutes() })) {
      this.hours.set(newHour);
      this.updateAmPm(newHour);
      this.updateValue();
    }
  }

  decrementHour(): void {
    const newHour = this.hours() === 0 ? 23 : this.hours() - 1;
    if (this.isValidTime({ hours: newHour, minutes: this.minutes() })) {
      this.hours.set(newHour);
      this.updateAmPm(newHour);
      this.updateValue();
    }
  }

  incrementMinute(): void {
    const interval = this.minuteInterval();
    let newMinute = this.minutes() + interval;
    let newHour = this.hours();
    
    if (newMinute >= 60) {
      newMinute = newMinute % 60;
      newHour = (newHour + 1) % 24;
    }
    
    if (this.isValidTime({ hours: newHour, minutes: newMinute })) {
      this.minutes.set(newMinute);
      this.hours.set(newHour);
      this.updateAmPm(newHour);
      this.updateValue();
    }
  }

  decrementMinute(): void {
    const interval = this.minuteInterval();
    let newMinute = this.minutes() - interval;
    let newHour = this.hours();
    
    if (newMinute < 0) {
      newMinute = 60 + newMinute;
      newHour = newHour === 0 ? 23 : newHour - 1;
    }
    
    if (this.isValidTime({ hours: newHour, minutes: newMinute })) {
      this.minutes.set(newMinute);
      this.hours.set(newHour);
      this.updateAmPm(newHour);
      this.updateValue();
    }
  }

  canIncrementHour(): boolean {
    const newHour = (this.hours() + 1) % 24;
    return this.isValidTime({ hours: newHour, minutes: this.minutes() });
  }

  canDecrementHour(): boolean {
    const newHour = this.hours() === 0 ? 23 : this.hours() - 1;
    return this.isValidTime({ hours: newHour, minutes: this.minutes() });
  }

  canIncrementMinute(): boolean {
    const interval = this.minuteInterval();
    const newMinute = (this.minutes() + interval) % 60;
    const newHour = this.minutes() + interval >= 60 ? (this.hours() + 1) % 24 : this.hours();
    return this.isValidTime({ hours: newHour, minutes: newMinute });
  }

  canDecrementMinute(): boolean {
    const interval = this.minuteInterval();
    const newMinute = this.minutes() - interval < 0 ? 60 + (this.minutes() - interval) : this.minutes() - interval;
    const newHour = this.minutes() - interval < 0 ? (this.hours() === 0 ? 23 : this.hours() - 1) : this.hours();
    return this.isValidTime({ hours: newHour, minutes: newMinute });
  }

  setAmPm(period: 'AM' | 'PM'): void {
    this.amPm.set(period);
    const currentHour = this.hours();
    let newHour = currentHour;
    
    if (period === 'AM' && currentHour >= 12) {
      newHour = currentHour - 12;
    } else if (period === 'PM' && currentHour < 12) {
      newHour = currentHour + 12;
    }
    
    if (this.isValidTime({ hours: newHour, minutes: this.minutes() })) {
      this.hours.set(newHour);
      this.updateValue();
    }
  }

  selectNow(): void {
    const now = new Date();
    const time: Time = {
      hours: now.getHours(),
      minutes: now.getMinutes()
    };
    
    if (this.isValidTime(time)) {
      this.hours.set(time.hours);
      this.minutes.set(time.minutes);
      this.updateAmPm(time.hours);
      this.updateValue();
      this.close();
    }
  }

  handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (!value) {
      this.value.set(null);
      this.onChange(null);
      this.timeChange.emit(null);
      this.isInvalid.set(false);
      return;
    }

    const time = this.parseTime(value, this.format());
    if (time && this.isValidTime(time)) {
      this.value.set(time);
      this.hours.set(time.hours);
      this.minutes.set(time.minutes);
      this.updateAmPm(time.hours);
      this.onChange(time);
      this.timeChange.emit(time);
      this.isInvalid.set(false);
    } else {
      this.isInvalid.set(true);
    }
  }

  handleHourInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value, 10);
    
    if (!isNaN(value)) {
      let hour = value;
      if (this.format() === '12') {
        if (hour > 12) hour = 12;
        if (hour < 1) hour = 1;
        // Convert to 24-hour format
        if (this.amPm() === 'PM' && hour !== 12) {
          hour += 12;
        } else if (this.amPm() === 'AM' && hour === 12) {
          hour = 0;
        }
      } else {
        if (hour > 23) hour = 23;
        if (hour < 0) hour = 0;
      }
      
      if (this.isValidTime({ hours: hour, minutes: this.minutes() })) {
        this.hours.set(hour);
        this.updateValue();
      }
    }
  }

  handleMinuteInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value, 10);
    
    if (!isNaN(value)) {
      let minute = value;
      if (minute > 59) minute = 59;
      if (minute < 0) minute = 0;
      
      // Round to nearest interval
      const interval = this.minuteInterval();
      minute = Math.round(minute / interval) * interval;
      
      if (this.isValidTime({ hours: this.hours(), minutes: minute })) {
        this.minutes.set(minute);
        this.updateValue();
      }
    }
  }

  validateHourInput(): void {
    const input = this.inputRef.nativeElement.querySelector('input[type="text"]') as HTMLInputElement;
    if (input) {
      input.value = this.displayHour();
    }
  }

  validateMinuteInput(): void {
    const inputs = this.inputRef.nativeElement.querySelectorAll('input[type="text"]');
    if (inputs.length > 1) {
      (inputs[1] as HTMLInputElement).value = this.displayMinute();
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

  private updateValue(): void {
    const time: Time = {
      hours: this.hours(),
      minutes: this.minutes()
    };
    this.value.set(time);
    this.onChange(time);
    this.timeChange.emit(time);
  }

  private updateAmPm(hours: number): void {
    this.amPm.set(hours >= 12 ? 'PM' : 'AM');
  }

  private formatTime(time: Time, format: TimeFormat): string {
    let hours = time.hours;
    const minutes = time.minutes.toString().padStart(2, '0');
    
    if (format === '12') {
      const period = hours >= 12 ? 'PM' : 'AM';
      if (hours === 0) {
        hours = 12;
      } else if (hours > 12) {
        hours -= 12;
      }
      return `${hours.toString().padStart(2, '0')}:${minutes} ${period}`;
    }
    
    return `${hours.toString().padStart(2, '0')}:${minutes}`;
  }

  private parseTime(value: string, format: TimeFormat): Time | null {
    let match: RegExpMatchArray | null;
    
    if (format === '12') {
      match = value.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
      if (!match) return null;
      
      let hours = parseInt(match[1], 10);
      const minutes = parseInt(match[2], 10);
      const period = match[3].toUpperCase();
      
      if (hours < 1 || hours > 12 || minutes < 0 || minutes > 59) return null;
      
      // Convert to 24-hour format
      if (period === 'PM' && hours !== 12) {
        hours += 12;
      } else if (period === 'AM' && hours === 12) {
        hours = 0;
      }
      
      return { hours, minutes };
    } else {
      match = value.match(/^(\d{1,2}):(\d{2})$/);
      if (!match) return null;
      
      const hours = parseInt(match[1], 10);
      const minutes = parseInt(match[2], 10);
      
      if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;
      
      return { hours, minutes };
    }
  }

  private isValidTime(time: Time): boolean {
    const min = this.min();
    const max = this.max();
    
    if (min) {
      const minMinutes = min.hours * 60 + min.minutes;
      const timeMinutes = time.hours * 60 + time.minutes;
      if (timeMinutes < minMinutes) return false;
    }
    
    if (max) {
      const maxMinutes = max.hours * 60 + max.minutes;
      const timeMinutes = time.hours * 60 + time.minutes;
      if (timeMinutes > maxMinutes) return false;
    }
    
    return true;
  }
}