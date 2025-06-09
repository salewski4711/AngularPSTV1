import { 
  Component, 
  Input, 
  TemplateRef, 
  ViewChild,
  ContentChild,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pst-stepper-step',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="stepper-step-content" [class.hidden]="!isActive">
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepperStepComponent {
  @Input() label!: string;
  @Input() description?: string;
  @Input() icon?: string;
  @Input() optional = false;
  @Input() disabled = false;
  @Input() error = false;
  @Input() completed = false;
  
  // Internal state
  isActive = false;
  index = 0;
  
  @ContentChild(TemplateRef) content!: TemplateRef<any>;
  
  get id(): string {
    return `step-${this.index}`;
  }
}