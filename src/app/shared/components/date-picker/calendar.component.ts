import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarDay, CalendarWeek } from './date-picker.types';
import { IconComponent } from '../../icons/icon.component';

@Component({
  selector: 'pst-calendar',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-80">
      <!-- Month/Year Navigation -->
      <div class="flex items-center justify-between mb-4">
        <button
          type="button"
          (click)="previousMonth()"
          class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          [attr.aria-label]="'Previous month'"
        >
          <pst-icon name="chevron-left" size="xs" />
        </button>
        
        <div class="flex items-center space-x-2">
          <select
            [value]="currentMonth()"
            (change)="changeMonth($event)"
            class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm font-medium"
          >
            @for (month of monthNames; track $index) {
              <option [value]="$index">{{ month }}</option>
            }
          </select>
          
          <select
            [value]="currentYear()"
            (change)="changeYear($event)"
            class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm font-medium"
          >
            @for (year of yearOptions(); track year) {
              <option [value]="year">{{ year }}</option>
            }
          </select>
        </div>
        
        <button
          type="button"
          (click)="nextMonth()"
          class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          [attr.aria-label]="'Next month'"
        >
          <pst-icon name="chevron-right" size="xs" />
        </button>
      </div>
      
      <!-- Weekday Headers -->
      <div class="grid grid-cols-7 gap-1 mb-2">
        @for (day of weekDays; track day) {
          <div class="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-2">
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
              class="p-2 text-sm rounded-lg transition-all duration-200"
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
      <div class="mt-4 pt-4 border-t dark:border-gray-700">
        <button
          type="button"
          (click)="selectToday()"
          class="w-full px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
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
    const classes: string[] = [];

    if (!day.isCurrentMonth) {
      classes.push('text-gray-400 dark:text-gray-600');
    } else if (day.isDisabled) {
      classes.push('text-gray-300 dark:text-gray-700 cursor-not-allowed');
    } else if (day.isSelected) {
      classes.push('bg-primary-500 text-white hover:bg-primary-600');
    } else if (day.isToday) {
      classes.push('bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 font-semibold hover:bg-primary-200 dark:hover:bg-primary-900/50');
    } else if (day.isWeekend) {
      classes.push('text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700');
    } else {
      classes.push('text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700');
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