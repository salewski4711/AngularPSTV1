import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarDay, CalendarWeek } from './date-picker.types';
import { IconComponent } from '../../icons/icon.component';
import { datePickerClasses } from '../../../core/design-system/component-classes/molecules.classes.static';

@Component({
  selector: 'pst-calendar',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="datePickerClasses.calendar.container">
      <!-- Month/Year Navigation -->
      <div class="flex items-center justify-between mb-4">
        <button
          type="button"
          (click)="previousMonth()"
          [class]="datePickerClasses.calendar.navigation.button"
          [attr.aria-label]="'Previous month'"
        >
          <pst-icon name="chevron-left" size="xs" />
        </button>
        
        <div class="flex items-center space-x-2">
          <select
            [value]="currentMonth()"
            (change)="changeMonth($event)"
            [class]="datePickerClasses.calendar.navigation.select"
          >
            @for (month of monthNames; track $index) {
              <option [value]="$index">{{ month }}</option>
            }
          </select>
          
          <select
            [value]="currentYear()"
            (change)="changeYear($event)"
            [class]="datePickerClasses.calendar.navigation.select"
          >
            @for (year of yearOptions(); track year) {
              <option [value]="year">{{ year }}</option>
            }
          </select>
        </div>
        
        <button
          type="button"
          (click)="nextMonth()"
          [class]="datePickerClasses.calendar.navigation.button"
          [attr.aria-label]="'Next month'"
        >
          <pst-icon name="chevron-right" size="xs" />
        </button>
      </div>
      
      <!-- Weekday Headers -->
      <div class="grid grid-cols-7 gap-1 mb-2">
        @for (day of weekDays; track day) {
          <div [class]="datePickerClasses.calendar.weekdayHeader">
            {{ day }}
          </div>
        }
      </div>
      
      <!-- Calendar Grid -->
      <div class="grid grid-cols-7 gap-1">
        @for (week of calendarWeeks(); track $index) {
          @for (day of week.days; track day.date.getTime()) {
            <button
              type="button"
              (click)="selectDate(day)"
              [disabled]="day.isDisabled"
              [class]="getDayClasses(day)"
              [attr.aria-label]="getDateAriaLabel(day)"
              [attr.aria-selected]="day.isSelected"
              [attr.aria-disabled]="day.isDisabled"
            >
              {{ day.day }}
            </button>
          }
        }
      </div>
      
      <!-- Today Button -->
      <div [class]="datePickerClasses.calendar.todayButton.container">
        <button
          type="button"
          (click)="selectToday()"
          [class]="datePickerClasses.calendar.todayButton.button"
        >
          Today
        </button>
      </div>
    </div>
  `,
  styles: []
})
export class CalendarComponent {
  @Input() value = signal<Date | null>(null);
  @Input() min = signal<Date | undefined>(undefined);
  @Input() max = signal<Date | undefined>(undefined);
  @Input() disabledDates = signal<Date[]>([]);
  @Output() dateSelect = new EventEmitter<Date>();

  currentMonth = signal(new Date().getMonth());
  currentYear = signal(new Date().getFullYear());

  monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  yearOptions = computed(() => {
    const currentYear = new Date().getFullYear();
    const years: number[] = [];
    for (let i = currentYear - 50; i <= currentYear + 50; i++) {
      years.push(i);
    }
    return years;
  });

  // Make datePickerClasses available to template
  datePickerClasses = datePickerClasses;

  calendarWeeks = computed((): CalendarWeek[] => {
    const year = this.currentYear();
    const month = this.currentMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const weeks: CalendarWeek[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const selectedDate = this.value();
    const minDate = this.min();
    const maxDate = this.max();
    const disabledDates = this.disabledDates().map(d => d.getTime());

    let currentDate = new Date(startDate);
    
    while (currentDate <= lastDay || currentDate.getDay() !== 0) {
      const week: CalendarWeek = { days: [] };
      
      for (let i = 0; i < 7; i++) {
        const date = new Date(currentDate);
        const isCurrentMonth = date.getMonth() === month;
        const isToday = date.getTime() === today.getTime();
        const isSelected = selectedDate ? this.isSameDate(date, selectedDate) : false;
        const isDisabled = this.isDateDisabled(date, minDate, maxDate, disabledDates);
        const isWeekend = date.getDay() === 0 || date.getDay() === 6;

        week.days.push({
          date,
          day: date.getDate(),
          isCurrentMonth,
          isToday,
          isSelected,
          isDisabled,
          isWeekend
        });

        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      weeks.push(week);
    }

    return weeks;
  });

  constructor() {
    // Update current month/year when value changes
    effect(() => {
      const value = this.value();
      if (value) {
        this.currentMonth.set(value.getMonth());
        this.currentYear.set(value.getFullYear());
      }
    });
  }

  previousMonth(): void {
    if (this.currentMonth() === 0) {
      this.currentMonth.set(11);
      this.currentYear.update(y => y - 1);
    } else {
      this.currentMonth.update(m => m - 1);
    }
  }

  nextMonth(): void {
    if (this.currentMonth() === 11) {
      this.currentMonth.set(0);
      this.currentYear.update(y => y + 1);
    } else {
      this.currentMonth.update(m => m + 1);
    }
  }

  changeMonth(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.currentMonth.set(parseInt(target.value, 10));
  }

  changeYear(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.currentYear.set(parseInt(target.value, 10));
  }

  selectDate(day: CalendarDay): void {
    if (!day.isDisabled) {
      this.dateSelect.emit(day.date);
    }
  }

  selectToday(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.dateSelect.emit(today);
  }

  getDayClasses(day: CalendarDay): string {
    const classes: string[] = [datePickerClasses.calendar.day.base];

    if (!day.isCurrentMonth) {
      classes.push(datePickerClasses.calendar.day.states.notCurrentMonth);
    } else if (day.isDisabled) {
      classes.push(datePickerClasses.calendar.day.states.disabled);
    } else if (day.isSelected) {
      classes.push(datePickerClasses.calendar.day.states.selected);
    } else if (day.isToday) {
      classes.push(datePickerClasses.calendar.day.states.today);
    } else if (day.isWeekend) {
      classes.push(datePickerClasses.calendar.day.states.weekend);
    } else {
      classes.push(datePickerClasses.calendar.day.states.default);
    }

    return classes.join(' ');
  }

  getDateAriaLabel(day: CalendarDay): string {
    const date = day.date;
    const dateStr = date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    const labels: string[] = [dateStr];
    
    if (day.isToday) labels.push('Today');
    if (day.isSelected) labels.push('Selected');
    if (day.isDisabled) labels.push('Unavailable');
    
    return labels.join(', ');
  }

  private isSameDate(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }

  private isDateDisabled(date: Date, min?: Date, max?: Date, disabledDates?: number[]): boolean {
    const dateTime = date.getTime();
    
    if (min && date < min) return true;
    if (max && date > max) return true;
    if (disabledDates && disabledDates.includes(dateTime)) return true;
    
    return false;
  }

}