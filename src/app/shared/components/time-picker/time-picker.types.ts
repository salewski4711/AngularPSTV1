export type TimeFormat = '12' | '24';
export type MinuteInterval = 1 | 5 | 10 | 15 | 30;

export interface Time {
  hours: number;
  minutes: number;
}

export interface TimePickerConfig {
  value?: Time | null;
  format?: TimeFormat;
  minuteInterval?: MinuteInterval;
  min?: Time;
  max?: Time;
  placeholder?: string;
  disabled?: boolean;
}