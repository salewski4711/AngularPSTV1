import {
  Component,
  Input,
  Output,
  EventEmitter,
  ContentChildren,
  QueryList,
  AfterContentInit,
  ChangeDetectionStrategy,
  signal,
  computed,
  effect
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperStepComponent } from './stepper-step.component';
import { 
  StepperOrientation, 
  StepperLabelPosition,
  StepperConfig,
  StepChangeEvent,
  StepperStep
} from './stepper.types';
import { IconComponent } from '../../icons/icon.component';
import { ButtonComponent } from '../button/button.component';
import { stepperClasses } from '../../../core/design-system/component-classes/organisms.classes';

@Component({
  selector: 'pst-stepper',
  standalone: true,
  imports: [CommonModule, IconComponent, ButtonComponent],
  template: `
    <div class="stepper" [class]="getContainerClasses()">
      <!-- Stepper Header -->
      <div [class]="getHeaderClasses()">
        @if (orientation === 'horizontal') {
          <!-- Horizontal layout with background line approach -->
          <div [class]="horizontalWrapperClasses">
            <!-- Background line that spans the full width -->
            <div [class]="lineBackgroundClasses"></div>
            
            <!-- Progress line showing completion status -->
            <div [class]="lineProgressClasses" [style.width.%]="getProgressWidth()"></div>
            
            <!-- Step indicators positioned on top -->
            @for (step of steps; track step.id; let i = $index; let isLast = $last; let isFirst = $first) {
              <div [class]="getStepContainerClass(isFirst, isLast)">
                <!-- Step Indicator -->
                <button
                  type="button"
                  [class]="getStepButtonClasses(i)"
                  [disabled]="!canNavigateToStep(i)"
                  (click)="goToStep(i)"
                  [attr.aria-label]="step.label"
                  [attr.aria-current]="currentStepIndex() === i ? 'step' : null">
                  
                  <!-- Step Number or Icon -->
                  <span [class]="stepIndicatorContentClasses">
                    @if (step.completed && !step.error) {
                      <pst-icon name="check" size="sm" />
                    } @else if (step.error) {
                      <pst-icon name="x" size="sm" />
                    } @else if (step.icon) {
                      <pst-icon [name]="step.icon" size="sm" />
                    } @else if (showStepNumbers) {
                      {{ i + 1 }}
                    }
                  </span>
                </button>
                
                <!-- Step Label -->
                <div [class]="getLabelContainerClasses()">
                  <div [class]="stepLabelClasses">
                    {{ step.label }}
                    @if (step.optional) {
                      <span [class]="optionalTextClasses">(Optional)</span>
                    }
                  </div>
                  @if (step.description) {
                    <div [class]="stepDescriptionClasses">{{ step.description }}</div>
                  }
                </div>
              </div>
            }
          </div>
        } @else {
          <!-- Vertical layout -->
          @for (step of steps; track step.id; let i = $index; let isLast = $last) {
            <div [class]="verticalStepWrapperClasses">
              <div 
                class="stepper-step-container"
                [class]="getStepContainerClasses(i)">
                
                <!-- Step Indicator -->
                <button
                  type="button"
                  [class]="getStepButtonClasses(i)"
                  [disabled]="!canNavigateToStep(i)"
                  (click)="goToStep(i)"
                  [attr.aria-label]="step.label"
                  [attr.aria-current]="currentStepIndex() === i ? 'step' : null">
                  
                  <!-- Step Number or Icon -->
                  <span [class]="stepIndicatorContentClasses">
                    @if (step.completed && !step.error) {
                      <pst-icon name="check" size="sm" />
                    } @else if (step.error) {
                      <pst-icon name="x" size="sm" />
                    } @else if (step.icon) {
                      <pst-icon [name]="step.icon" size="sm" />
                    } @else if (showStepNumbers) {
                      {{ i + 1 }}
                    }
                  </span>
                </button>
                
                <!-- Step Label -->
                <div [class]="getLabelContainerClasses()">
                  <div [class]="stepLabelClasses">
                    {{ step.label }}
                    @if (step.optional) {
                      <span [class]="optionalTextClasses">(Optional)</span>
                    }
                  </div>
                  @if (step.description) {
                    <div [class]="stepDescriptionClasses">{{ step.description }}</div>
                  }
                </div>
              </div>
              
              <!-- Vertical connector -->
              @if (!isLast) {
                <div [class]="getConnectorClasses(i)"></div>
              }
            </div>
          }
        }
      </div>
      
      <!-- Step Content -->
      <div [class]="contentClasses">
        <div [class]="panelClasses">
          <ng-content></ng-content>
        </div>
        
        <!-- Navigation Buttons -->
        @if (enableNavigation) {
          <div [class]="navigationClasses">
            <pst-button
              variant="secondary"
              [disabled]="!canGoPrevious()"
              (click)="previous()">
              <pst-icon name="chevron-left" size="sm" class="mr-1" />
              Previous
            </pst-button>
            
            <pst-button
              variant="primary"
              [disabled]="!canGoNext()"
              (click)="next()">
              Next
              <pst-icon name="chevron-right" size="sm" class="ml-1" />
            </pst-button>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepperComponent implements AfterContentInit {
  @Input() orientation: StepperOrientation = 'horizontal';
  @Input() labelPosition: StepperLabelPosition = 'bottom';
  @Input() linear = false;
  @Input() showStepNumbers = true;
  @Input() enableNavigation = true;
  @Input() animationDuration: 'none' | 'fast' | 'normal' | 'slow' = 'normal';
  
  @Output() stepChange = new EventEmitter<StepChangeEvent>();
  
  @ContentChildren(StepperStepComponent) stepComponents!: QueryList<StepperStepComponent>;
  
  currentStepIndex = signal(0);
  steps: StepperStep[] = [];
  
  // Static class getters
  readonly optionalTextClasses = stepperClasses.optionalText;
  readonly stepDescriptionClasses = stepperClasses.stepDescription;
  readonly horizontalWrapperClasses = stepperClasses.horizontalWrapper;
  readonly lineBackgroundClasses = stepperClasses.lineBackground;
  readonly lineProgressClasses = stepperClasses.lineProgress;
  readonly stepIndicatorContentClasses = stepperClasses.stepIndicatorContent;
  readonly stepLabelClasses = stepperClasses.stepLabel;
  readonly navigationClasses = stepperClasses.navigation;
  readonly contentClasses = stepperClasses.content;
  readonly panelClasses = stepperClasses.panel;
  readonly verticalStepWrapperClasses = stepperClasses.verticalStepWrapper;
  
  ngAfterContentInit() {
    this.initializeSteps();
    this.updateStepStates();
  }
  
  private initializeSteps() {
    this.steps = this.stepComponents.map((stepComp, index) => {
      stepComp.index = index;
      return {
        id: stepComp.id,
        label: stepComp.label,
        description: stepComp.description,
        icon: stepComp.icon,
        optional: stepComp.optional,
        disabled: stepComp.disabled,
        error: stepComp.error,
        completed: stepComp.completed
      };
    });
  }
  
  private updateStepStates() {
    this.stepComponents.forEach((step, index) => {
      step.isActive = index === this.currentStepIndex();
    });
  }
  
  canNavigateToStep(index: number): boolean {
    if (!this.enableNavigation) return false;
    if (this.steps[index]?.disabled) return false;
    
    if (this.linear) {
      // In linear mode, can only go to completed steps or the next step
      if (index < this.currentStepIndex()) {
        return this.steps[index].completed || false;
      }
      if (index === this.currentStepIndex() + 1) {
        return this.steps[this.currentStepIndex()].completed || false;
      }
      return index === this.currentStepIndex();
    }
    
    return true;
  }
  
  canGoPrevious(): boolean {
    return this.currentStepIndex() > 0 && this.canNavigateToStep(this.currentStepIndex() - 1);
  }
  
  canGoNext(): boolean {
    return this.currentStepIndex() < this.steps.length - 1 && 
           this.canNavigateToStep(this.currentStepIndex() + 1);
  }
  
  goToStep(index: number) {
    if (!this.canNavigateToStep(index)) return;
    
    const previousStep = this.currentStepIndex();
    this.currentStepIndex.set(index);
    this.updateStepStates();
    
    this.stepChange.emit({
      previousStep,
      currentStep: index,
      step: this.steps[index]
    });
  }
  
  next() {
    if (this.canGoNext()) {
      this.goToStep(this.currentStepIndex() + 1);
    }
  }
  
  previous() {
    if (this.canGoPrevious()) {
      this.goToStep(this.currentStepIndex() - 1);
    }
  }
  
  markStepCompleted(index: number) {
    if (index >= 0 && index < this.steps.length) {
      this.steps[index].completed = true;
      this.stepComponents.toArray()[index].completed = true;
    }
  }
  
  markStepError(index: number, error = true) {
    if (index >= 0 && index < this.steps.length) {
      this.steps[index].error = error;
      this.stepComponents.toArray()[index].error = error;
    }
  }
  
  // Calculate progress line width based on completed steps
  getProgressWidth(): number {
    if (this.steps.length <= 1) return 0;
    
    // Find the last completed step
    let lastCompletedIndex = -1;
    for (let i = 0; i < this.steps.length; i++) {
      if (this.steps[i].completed) {
        lastCompletedIndex = i;
      }
    }
    
    // If no steps are completed, return 0
    if (lastCompletedIndex === -1) return 0;
    
    // Calculate percentage based on step positions
    const stepWidth = 100 / (this.steps.length - 1);
    return stepWidth * lastCompletedIndex;
  }
  
  // Style utility methods
  getContainerClasses(): string {
    return this.orientation === 'vertical' 
      ? stepperClasses.container.vertical 
      : stepperClasses.container.horizontal;
  }
  
  getHeaderClasses(): string {
    const base = stepperClasses.header.base;
    const orientation = this.orientation === 'horizontal' 
      ? stepperClasses.header.horizontal 
      : stepperClasses.header.vertical;
    
    return `${base} ${orientation}`;
  }
  
  getStepContainerClasses(index: number): string {
    const base = stepperClasses.verticalStepContainer.base;
    const orientation = this.orientation === 'horizontal' 
      ? stepperClasses.verticalStepContainer.horizontal 
      : stepperClasses.verticalStepContainer.vertical;
    const active = this.currentStepIndex() === index ? 'stepper-active' : '';
    
    return `${base} ${orientation} ${active}`;
  }
  
  getStepButtonClasses(index: number): string {
    const base = stepperClasses.stepButton.base;
    const animation = stepperClasses.animation[this.animationDuration];
    
    const isActive = this.currentStepIndex() === index;
    const isCompleted = this.steps[index]?.completed;
    const isError = this.steps[index]?.error;
    const isDisabled = this.steps[index]?.disabled || !this.canNavigateToStep(index);
    
    let stateClasses = '';
    if (isError) {
      stateClasses = stepperClasses.stepButton.states.error;
    } else if (isActive) {
      stateClasses = stepperClasses.stepButton.states.active;
    } else if (isCompleted) {
      stateClasses = stepperClasses.stepButton.states.completed;
    } else if (isDisabled) {
      stateClasses = stepperClasses.stepButton.states.disabled;
    } else {
      stateClasses = stepperClasses.stepButton.states.default;
    }
    
    return [base, stateClasses, animation].join(' ');
  }
  
  getLabelContainerClasses(): string {
    const base = stepperClasses.labelContainer.base;
    const position = this.labelPosition === 'bottom' 
      ? stepperClasses.labelContainer.bottom 
      : stepperClasses.labelContainer.side;
    
    return `${base} ${position}`;
  }
  
  getConnectorColorClass(index: number): string {
    const isCompleted = this.steps[index]?.completed;
    const animation = stepperClasses.animation[this.animationDuration];
    return `${isCompleted ? 'connector-completed' : 'connector-pending'} ${animation}`;
  }
  
  getConnectorClasses(index: number): string {
    const base = stepperClasses.verticalConnector.base;
    const isCompleted = this.steps[index]?.completed;
    
    if (this.orientation === 'horizontal') {
      // Horizontal connectors are handled by background line
      return '';
    } else {
      // Vertical connector
      return isCompleted 
        ? `${base} ${stepperClasses.verticalConnector.completed}`
        : `${base} ${stepperClasses.verticalConnector.pending}`;
    }
  }
  
  getStepContainerClass(isFirst: boolean, isLast: boolean): string {
    const base = stepperClasses.stepContainer.base;
    const firstClass = isFirst ? stepperClasses.stepContainer.first : '';
    const lastClass = isLast ? stepperClasses.stepContainer.last : '';
    
    return [base, firstClass, lastClass].filter(Boolean).join(' ');
  }
}