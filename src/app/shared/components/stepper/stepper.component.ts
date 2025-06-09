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
          <div class="stepper-horizontal">
            <!-- Background line that spans the full width -->
            <div class="stepper-line-background"></div>
            
            <!-- Progress line showing completion status -->
            <div class="stepper-line-progress" [style.width.%]="getProgressWidth()"></div>
            
            <!-- Step indicators positioned on top -->
            @for (step of steps; track step.id; let i = $index; let isLast = $last; let isFirst = $first) {
              <div class="stepper-step" [class.stepper-step-first]="isFirst" [class.stepper-step-last]="isLast">
                <!-- Step Indicator -->
                <button
                  type="button"
                  [class]="getStepButtonClasses(i)"
                  [disabled]="!canNavigateToStep(i)"
                  (click)="goToStep(i)"
                  [attr.aria-label]="step.label"
                  [attr.aria-current]="currentStepIndex() === i ? 'step' : null">
                  
                  <!-- Step Number or Icon -->
                  <span class="step-indicator-content">
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
                  <div class="step-label text-sm font-medium">
                    {{ step.label }}
                    @if (step.optional) {
                      <span class="text-xs text-gray-500 dark:text-gray-400">(Optional)</span>
                    }
                  </div>
                  @if (step.description) {
                    <div class="step-description text-xs text-gray-500 dark:text-gray-400">{{ step.description }}</div>
                  }
                </div>
              </div>
            }
          </div>
        } @else {
          <!-- Vertical layout -->
          @for (step of steps; track step.id; let i = $index; let isLast = $last) {
            <div class="stepper-step-wrapper">
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
                  <span class="step-indicator-content">
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
                  <div class="step-label text-sm font-medium">
                    {{ step.label }}
                    @if (step.optional) {
                      <span class="text-xs text-gray-500 dark:text-gray-400">(Optional)</span>
                    }
                  </div>
                  @if (step.description) {
                    <div class="step-description text-xs text-gray-500 dark:text-gray-400">{{ step.description }}</div>
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
      <div class="stepper-content">
        <div class="stepper-panel">
          <ng-content></ng-content>
        </div>
        
        <!-- Navigation Buttons -->
        @if (enableNavigation) {
          <div class="stepper-navigation flex justify-between items-center mt-6">
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
    
    /* Horizontal stepper layout with background line approach */
    .stepper-horizontal {
      position: relative;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      width: 100%;
      padding: 20px 0;
    }
    
    /* Background line that spans full width */
    .stepper-line-background {
      position: absolute;
      top: 40px;
      left: 20px;
      right: 20px;
      height: 2px;
      background-color: rgb(209 213 219);
      z-index: 0;
    }
    
    :host-context(.dark) .stepper-line-background {
      background-color: rgb(75 85 99);
    }
    
    /* Progress line showing completion */
    .stepper-line-progress {
      position: absolute;
      top: 40px;
      left: 20px;
      height: 2px;
      background-color: rgb(34 197 94);
      z-index: 1;
      transition: width 0.3s ease;
    }
    
    /* Step container */
    .stepper-step {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      z-index: 2;
    }
    
    /* First and last step don't expand */
    .stepper-step.stepper-step-first,
    .stepper-step.stepper-step-last {
      flex: 0 0 auto;
    }
    
    /* Ensure button is above lines */
    .step-indicator {
      position: relative;
      z-index: 10;
      background-color: white;
    }
    
    :host-context(.dark) .step-indicator {
      background-color: rgb(31 41 55);
    }
    
    /* Step indicator content - ensure numbers are visible */
    .step-indicator-content {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
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
  
  private animationClasses = {
    none: '',
    fast: 'transition-all duration-150',
    normal: 'transition-all duration-300',
    slow: 'transition-all duration-500'
  };
  
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
    return `${this.orientation === 'vertical' ? 'flex' : 'block'}`;
  }
  
  getHeaderClasses(): string {
    const base = 'stepper-header';
    const orientation = this.orientation === 'horizontal' 
      ? 'flex items-start w-full' 
      : 'flex flex-col';
    const padding = this.orientation === 'horizontal' ? 'pb-8 mb-8' : 'pr-8 mr-8';
    
    return `${base} ${orientation} ${padding} relative`;
  }
  
  getStepContainerClasses(index: number): string {
    const base = 'relative flex items-center';
    const orientation = this.orientation === 'horizontal' ? 'flex-col' : 'flex-row w-full';
    const active = this.currentStepIndex() === index ? 'stepper-active' : '';
    
    return `${base} ${orientation} ${active}`;
  }
  
  getStepButtonClasses(index: number): string {
    const base = 'step-indicator relative z-10 rounded-full flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';
    const size = 'w-10 h-10 text-sm';
    const animation = this.animationClasses[this.animationDuration];
    
    const isActive = this.currentStepIndex() === index;
    const isCompleted = this.steps[index]?.completed;
    const isError = this.steps[index]?.error;
    const isDisabled = this.steps[index]?.disabled || !this.canNavigateToStep(index);
    
    let colorClasses = '';
    if (isError) {
      colorClasses = 'bg-red-500 text-white ring-red-500';
    } else if (isActive) {
      colorClasses = 'bg-primary text-white ring-primary';
    } else if (isCompleted) {
      colorClasses = 'bg-green-500 text-white ring-green-500';
    } else if (isDisabled) {
      colorClasses = 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500';
    } else {
      colorClasses = 'bg-gray-300 text-gray-600 hover:bg-gray-400 cursor-pointer dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500';
    }
    
    return `${base} ${size} ${colorClasses} ${animation}`;
  }
  
  getLabelContainerClasses(): string {
    const base = 'mt-3';
    const position = this.labelPosition === 'bottom' ? 'text-center' : 'text-left ml-4';
    
    return `${base} ${position}`;
  }
  
  getConnectorColorClass(index: number): string {
    const isCompleted = this.steps[index]?.completed;
    const animation = this.animationClasses[this.animationDuration];
    return `${isCompleted ? 'connector-completed' : 'connector-pending'} ${animation}`;
  }
  
  getConnectorClasses(index: number): string {
    const base = 'step-connector';
    const animation = this.animationClasses[this.animationDuration];
    
    const isCompleted = this.steps[index]?.completed;
    const color = isCompleted ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600';
    
    if (this.orientation === 'horizontal') {
      // Horizontal connector line - positioned to connect step indicators
      return `${base} ${color} ${animation} h-0.5`;
    } else {
      // Vertical connector line
      return `${base} ${color} ${animation} w-0.5 h-12 ml-5`;
    }
  }
}