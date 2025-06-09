import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShowcaseTemplateComponent } from '../../../shared/showcase-template.component';
import { CodeBlockComponent } from '../../../shared/components/code-block.component';
import { PropsTableComponent } from '../../../shared/components/props-table.component';
import { TimePickerComponent } from '../../../../../shared/components/time-picker/time-picker.component';
import { Time, TimeFormat, MinuteInterval } from '../../../../../shared/components/time-picker/time-picker.types';

@Component({
  selector: 'pst-time-picker-showcase',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ShowcaseTemplateComponent
  ],
  template: `
    <pst-showcase-template
      title="Time Picker"
      description="A time picker component for selecting time with intuitive controls."
      [sections]="sections"
      [props]="props"
      [bestPractices]="bestPractices"
    />
  `
})
export class TimePickerShowcaseComponent {
  // Demo state
  selectedTime1 = signal<Time | null>({ hours: 14, minutes: 30 });
  selectedTime2 = signal<Time | null>(null);
  selectedTime3 = signal<Time | null>(null);
  selectedTime4 = signal<Time | null>(null);
  selectedTime5 = signal<Time | null>(null);
  
  // Formats
  format24 = signal<TimeFormat>('24');
  format12 = signal<TimeFormat>('12');
  
  // Intervals
  interval1 = signal<MinuteInterval>(1);
  interval5 = signal<MinuteInterval>(5);
  interval15 = signal<MinuteInterval>(15);
  interval30 = signal<MinuteInterval>(30);
  
  // Min/Max times
  minTime = signal<Time>({ hours: 9, minutes: 0 });
  maxTime = signal<Time>({ hours: 17, minutes: 0 });

  sections = [
    {
      title: 'Basic Usage',
      description: 'A simple time picker with 24-hour format.',
      content: `
        <pst-time-picker
          [value]="selectedTime1"
          (timeChange)="onTimeChange1($event)"
          placeholder="Select time"
        />
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Selected: {{ formatTime(selectedTime1()) }}
        </p>
      `,
      code: `
// Component
selectedTime = signal<Time | null>({ hours: 14, minutes: 30 });

onTimeChange(time: Time | null) {
  console.log('Time changed:', time);
}

// Template
<pst-time-picker
  [value]="selectedTime"
  (timeChange)="onTimeChange($event)"
  placeholder="Select time"
/>`
    },
    {
      title: 'Time Formats',
      description: '12-hour and 24-hour format support.',
      content: `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">24-hour Format</label>
            <pst-time-picker
              [value]="selectedTime2"
              [format]="format24"
              placeholder="24-hour format"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">12-hour Format (AM/PM)</label>
            <pst-time-picker
              [value]="selectedTime3"
              [format]="format12"
              placeholder="12-hour format"
            />
          </div>
        </div>
      `,
      code: `
// 24-hour format (default)
<pst-time-picker
  [format]="signal('24')"
/>

// 12-hour format with AM/PM
<pst-time-picker
  [format]="signal('12')"
/>`
    },
    {
      title: 'Minute Intervals',
      description: 'Control the granularity of minute selection.',
      content: `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">5-minute intervals</label>
            <pst-time-picker
              [value]="selectedTime4"
              [minuteInterval]="interval5"
              placeholder="5-min intervals"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">15-minute intervals</label>
            <pst-time-picker
              [value]="selectedTime5"
              [minuteInterval]="interval15"
              placeholder="15-min intervals"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">30-minute intervals</label>
            <pst-time-picker
              [value]="selectedTime30"
              [minuteInterval]="interval30"
              placeholder="30-min intervals"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">1-minute intervals (default)</label>
            <pst-time-picker
              [value]="selectedTime1Min"
              [minuteInterval]="interval1"
              placeholder="1-min intervals"
            />
          </div>
        </div>
      `,
      code: `
// Different minute intervals
<pst-time-picker [minuteInterval]="signal(5)" />
<pst-time-picker [minuteInterval]="signal(15)" />
<pst-time-picker [minuteInterval]="signal(30)" />`
    },
    {
      title: 'Min/Max Time',
      description: 'Restrict time selection to business hours.',
      content: `
        <div class="space-y-4">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Only times between 9:00 AM and 5:00 PM can be selected.
          </p>
          <pst-time-picker
            [value]="selectedTimeRestricted"
            [min]="minTime"
            [max]="maxTime"
            placeholder="Business hours only"
          />
        </div>
      `,
      code: `
// Set min and max times
minTime = signal<Time>({ hours: 9, minutes: 0 });
maxTime = signal<Time>({ hours: 17, minutes: 0 });

// Template
<pst-time-picker
  [value]="selectedTime"
  [min]="minTime"
  [max]="maxTime"
/>`
    },
    {
      title: 'Disabled State',
      description: 'The time picker can be completely disabled.',
      content: `
        <pst-time-picker
          [value]="selectedTime1"
          [disabled]="true"
          placeholder="Disabled time picker"
        />
      `,
      code: `
<pst-time-picker
  [value]="selectedTime"
  [disabled]="true"
  placeholder="Disabled time picker"
/>`
    },
    {
      title: 'With Form Integration',
      description: 'Integrate with Angular forms for appointment scheduling.',
      content: `
        <form class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Meeting Start Time</label>
            <pst-time-picker
              [(ngModel)]="meetingStartTime"
              name="startTime"
              [format]="format12"
              [minuteInterval]="interval15"
              placeholder="Select start time"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">Meeting End Time</label>
            <pst-time-picker
              [(ngModel)]="meetingEndTime"
              name="endTime"
              [format]="format12"
              [minuteInterval]="interval15"
              [min]="minEndTime"
              placeholder="Select end time"
            />
          </div>
          
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Duration: {{ calculateDuration() }}
          </p>
        </form>
      `,
      code: `
// Component
meetingStartTime: Time | null = null;
meetingEndTime: Time | null = null;

get minEndTime() {
  return this.meetingStartTime ? signal(this.meetingStartTime) : undefined;
}

calculateDuration(): string {
  if (!this.meetingStartTime || !this.meetingEndTime) {
    return 'Not set';
  }
  // Calculate duration logic
}

// Template
<pst-time-picker
  [(ngModel)]="startTime"
  name="startTime"
  [format]="signal('12')"
  [minuteInterval]="signal(15)"
/>`
    }
  ];

  props = [
    {
      name: 'value',
      type: 'signal<Time | null>',
      default: 'signal(null)',
      description: 'The selected time value'
    },
    {
      name: 'format',
      type: 'signal<TimeFormat>',
      default: 'signal("24")',
      description: 'Time format (12 or 24 hour)'
    },
    {
      name: 'minuteInterval',
      type: 'signal<MinuteInterval>',
      default: 'signal(1)',
      description: 'Interval for minute selection (1, 5, 10, 15, 30)'
    },
    {
      name: 'min',
      type: 'signal<Time | undefined>',
      default: 'signal(undefined)',
      description: 'Minimum selectable time'
    },
    {
      name: 'max',
      type: 'signal<Time | undefined>',
      default: 'signal(undefined)',
      description: 'Maximum selectable time'
    },
    {
      name: 'placeholder',
      type: 'string',
      default: 'Select time',
      description: 'Placeholder text when no time is selected'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the time picker is disabled'
    },
    {
      name: 'timeChange',
      type: 'EventEmitter<Time | null>',
      default: '-',
      description: 'Event emitted when time changes'
    }
  ];

  bestPractices = {
    do: [
      'Use 24-hour format for international applications',
      'Use 12-hour format for US-centric applications',
      'Choose appropriate minute intervals based on use case',
      'Set reasonable min/max times for business hours',
      'Provide keyboard navigation for accessibility',
      'Show "Now" button for current time selection',
      'Validate time ranges when using start/end times',
      'Consider timezone implications for global apps',
      'Use consistent time format across the application'
    ],
    dont: [
      'Mix time formats within the same form or workflow',
      'Use 1-minute intervals for appointment scheduling (use 15 or 30 minutes instead)',
      'Allow invalid time ranges (e.g., end time before start time)',
      'Forget to handle timezone conversions when saving to backend',
      'Disable keyboard input without providing an alternative',
      'Use time pickers for durations (use separate duration inputs instead)',
      'Ignore locale-specific time formatting preferences',
      'Set overly restrictive min/max times without clear indication'
    ]
  };

  // Additional demo state
  selectedTime30 = signal<Time | null>(null);
  selectedTime1Min = signal<Time | null>(null);
  selectedTimeRestricted = signal<Time | null>(null);
  meetingStartTime: Time | null = null;
  meetingEndTime: Time | null = null;

  get minEndTime() {
    return this.meetingStartTime ? signal(this.meetingStartTime) : undefined;
  }

  formatTime(time: Time | null): string {
    if (!time) return 'No time selected';
    const hours = time.hours.toString().padStart(2, '0');
    const minutes = time.minutes.toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  calculateDuration(): string {
    if (!this.meetingStartTime || !this.meetingEndTime) {
      return 'Not set';
    }
    
    const startMinutes = this.meetingStartTime.hours * 60 + this.meetingStartTime.minutes;
    const endMinutes = this.meetingEndTime.hours * 60 + this.meetingEndTime.minutes;
    const durationMinutes = endMinutes - startMinutes;
    
    if (durationMinutes < 0) {
      return 'Invalid range';
    }
    
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    
    if (hours > 0 && minutes > 0) {
      return `${hours}h ${minutes}min`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${minutes}min`;
    }
  }

  onTimeChange1(time: Time | null) {
    console.log('Time changed:', time);
  }
}