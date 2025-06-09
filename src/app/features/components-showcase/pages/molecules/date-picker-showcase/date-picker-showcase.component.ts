import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcaseTemplateComponent } from '../../../shared/showcase-template.component';

@Component({
  selector: 'pst-date-picker-showcase',
  standalone: true,
  imports: [
    CommonModule,
    ShowcaseTemplateComponent
  ],
  template: `
    <pst-showcase-template
      title="Date Picker"
      description="A date picker component for selecting dates with calendar interface."
      [sections]="sections"
      [props]="props"
      [bestPractices]="bestPractices"
    />
  `
})
export class DatePickerShowcaseComponent {
  // Disabled dates (weekends for demo)
  disabledDates = signal(this.getWeekends());

  sections = [
    {
      title: 'Basic Usage',
      description: 'A simple date picker with default settings.',
      code: `// Component
selectedDate = signal<Date | null>(new Date());

onDateChange(date: Date | null) {
  console.log('Date changed:', date);
}

// Template
<pst-date-picker
  [value]="selectedDate"
  (dateChange)="onDateChange($event)"
  placeholder="Select date"
/>`
    },
    {
      title: 'Date Formats',
      description: 'Support for different date format conventions.',
      code: `// Different date formats
<pst-date-picker 
  [value]="selectedDate"
  [format]="signal('MM/dd/yyyy')" 
  placeholder="MM/dd/yyyy"
/>

<pst-date-picker 
  [value]="selectedDate"
  [format]="signal('dd/MM/yyyy')" 
  placeholder="dd/MM/yyyy"
/>

<pst-date-picker 
  [value]="selectedDate"
  [format]="signal('yyyy-MM-dd')" 
  placeholder="yyyy-MM-dd"
/>

<pst-date-picker 
  [value]="selectedDate"
  [format]="signal('dd.MM.yyyy')" 
  placeholder="dd.MM.yyyy"
/>`
    },
    {
      title: 'Min/Max Dates',
      description: 'Restrict date selection to a specific range.',
      code: `// Set min and max dates
minDate = signal(new Date(2024, 0, 1)); // Jan 1, 2024
maxDate = signal(new Date(2024, 11, 31)); // Dec 31, 2024

// Template
<pst-date-picker
  [value]="selectedDate"
  [min]="minDate"
  [max]="maxDate"
  placeholder="Select date"
/>`
    },
    {
      title: 'Disabled Dates',
      description: 'Disable specific dates (e.g., weekends, holidays).',
      code: `// Disable weekends
getWeekends(): Date[] {
  const weekends: Date[] = [];
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  
  for (let day = 1; day <= 31; day++) {
    const date = new Date(year, month, day);
    if (date.getMonth() !== month) break;
    
    if (date.getDay() === 0 || date.getDay() === 6) {
      weekends.push(date);
    }
  }
  
  return weekends;
}

disabledDates = signal(this.getWeekends());

// Template
<pst-date-picker
  [value]="selectedDate"
  [disabledDates]="disabledDates"
  placeholder="Select weekday"
/>`
    },
    {
      title: 'Disabled State',
      description: 'The date picker can be completely disabled.',
      code: `<pst-date-picker
  [value]="selectedDate"
  [disabled]="true"
  placeholder="Disabled date picker"
/>`
    },
    {
      title: 'With Form Integration',
      description: 'Integrate with Angular forms using ngModel.',
      code: `// Component
formStartDate: Date | null = null;
formEndDate: Date | null = null;

get minEndDate() {
  return this.formStartDate ? signal(this.formStartDate) : undefined;
}

// Template
<form>
  <div>
    <label class="block text-sm font-medium mb-1">Start Date</label>
    <pst-date-picker
      [(ngModel)]="formStartDate"
      name="startDate"
      placeholder="Select start date"
    />
  </div>
  
  <div>
    <label class="block text-sm font-medium mb-1">End Date</label>
    <pst-date-picker
      [(ngModel)]="formEndDate"
      name="endDate"
      [min]="minEndDate"
      placeholder="Select end date"
    />
  </div>
</form>`
    }
  ];

  props = [
    {
      name: 'value',
      type: 'signal<Date | null>',
      default: 'signal(null)',
      description: 'The selected date value'
    },
    {
      name: 'min',
      type: 'signal<Date | undefined>',
      default: 'signal(undefined)',
      description: 'Minimum selectable date'
    },
    {
      name: 'max',
      type: 'signal<Date | undefined>',
      default: 'signal(undefined)',
      description: 'Maximum selectable date'
    },
    {
      name: 'disabledDates',
      type: 'signal<Date[]>',
      default: 'signal([])',
      description: 'Array of dates that cannot be selected'
    },
    {
      name: 'format',
      type: 'signal<DateFormat>',
      default: 'signal("dd/MM/yyyy")',
      description: 'Date display format'
    },
    {
      name: 'placeholder',
      type: 'string',
      default: 'Select date',
      description: 'Placeholder text when no date is selected'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the date picker is disabled'
    },
    {
      name: 'dateChange',
      type: 'EventEmitter<Date | null>',
      default: '-',
      description: 'Event emitted when date changes'
    }
  ];

  bestPractices = {
    do: [
      'Use appropriate date formats for your locale',
      'Provide clear placeholders indicating the expected format',
      'Set reasonable min/max dates based on context',
      'Disable dates that are not applicable (e.g., past dates for future bookings)',
      'Provide keyboard navigation for accessibility',
      'Show the current date prominently in the calendar',
      'Consider using date ranges for period selection',
      'Validate dates on the server side as well',
      'Handle timezone considerations appropriately'
    ],
    dont: [
      'Don\'t use ambiguous date formats (e.g., 01/02/03)',
      'Avoid forcing users to type dates manually without a picker',
      'Don\'t disable dates without clear visual indication',
      'Avoid using date pickers for birth dates far in the past',
      'Don\'t ignore locale-specific date conventions',
      'Avoid making the calendar too small on mobile devices',
      'Don\'t forget to handle invalid date inputs gracefully',
      'Avoid confusing month/day order between regions'
    ]
  };

  private getWeekends(): Date[] {
    const weekends: Date[] = [];
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    
    for (let day = 1; day <= 31; day++) {
      const date = new Date(year, month, day);
      if (date.getMonth() !== month) break;
      
      if (date.getDay() === 0 || date.getDay() === 6) {
        weekends.push(date);
      }
    }
    
    return weekends;
  }
}