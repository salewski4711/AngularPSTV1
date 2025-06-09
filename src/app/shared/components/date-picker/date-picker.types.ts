export interface DatePickerConfig {
  value?: Date | null;
  min?: Date;
  max?: Date;
  disabledDates?: Date[];
  format?: string;
  placeholder?: string;
  disabled?: boolean;
}

export interface CalendarDay {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  isWeekend: boolean;
}

export interface CalendarWeek {
  days: CalendarDay[];
}

export type DateFormat = 'dd/MM/yyyy' | 'MM/dd/yyyy' | 'yyyy-MM-dd' | 'dd.MM.yyyy';