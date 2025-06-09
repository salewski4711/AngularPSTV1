import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShowcaseTemplateComponent } from '../../../shared/showcase-template.component';
import { StepperComponent, StepperStepComponent, StepChangeEvent } from '../../../../../shared/components/stepper';
import { InputComponent } from '../../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { FormFieldComponent } from '../../../../../shared/components/form-field/form-field.component';
import { IconComponent } from '../../../../../shared/icons/icon.component';
import { SpinnerComponent } from '../../../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'pst-stepper-showcase',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ShowcaseTemplateComponent,
    StepperComponent,
    StepperStepComponent,
    InputComponent,
    ButtonComponent,
    FormFieldComponent,
    IconComponent,
    SpinnerComponent
  ],
  template: `
    <div class="space-y-12">
      <!-- Header -->
      <header>
        <h1 class="text-3xl font-bold mb-4">Stepper</h1>
        <p class="text-gray-600 dark:text-gray-400">A stepper component for guiding users through multi-step processes with clear navigation and progress indication.</p>
      </header>
      
      <!-- Live Demos First! -->
      <section class="space-y-8">
        <h2 class="text-2xl font-semibold mb-6">Interactive Examples</h2>
        
        <!-- Basic Stepper Demo -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 class="text-lg font-medium mb-4">Basic Horizontal Stepper</h3>
          <pst-stepper 
            [linear]="true"
            (stepChange)="onStepChange($event)">
            
            <pst-stepper-step 
              label="Account Details" 
              description="Choose your account type"
              [completed]="step1Completed()">
              <div class="py-8 px-4">
                <h4 class="text-lg font-medium mb-4">Select Account Type</h4>
                <div class="space-y-4">
                  <label class="flex items-center">
                    <input type="radio" name="accountType" class="mr-2" />
                    <span>Personal Account</span>
                  </label>
                  <label class="flex items-center">
                    <input type="radio" name="accountType" class="mr-2" />
                    <span>Business Account</span>
                  </label>
                </div>
                <div class="mt-6">
                  <pst-button (click)="completeStep1()">Continue</pst-button>
                </div>
              </div>
            </pst-stepper-step>
            
            <pst-stepper-step 
              label="Personal Information" 
              description="Enter your details"
              [optional]="true">
              <div class="py-8 px-4">
                <h4 class="text-lg font-medium mb-4">Personal Information</h4>
                <div class="space-y-4 max-w-md">
                  <pst-form-field label="First Name">
                    <pst-input placeholder="John" />
                  </pst-form-field>
                  <pst-form-field label="Last Name">
                    <pst-input placeholder="Doe" />
                  </pst-form-field>
                  <pst-form-field label="Email">
                    <pst-input type="email" placeholder="john@example.com" />
                  </pst-form-field>
                </div>
              </div>
            </pst-stepper-step>
            
            <pst-stepper-step 
              label="Review & Submit" 
              description="Confirm your information">
              <div class="py-8 px-4">
                <h4 class="text-lg font-medium mb-4">Review Your Information</h4>
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p class="text-sm text-gray-600 dark:text-gray-300">
                    Please review your information before submitting.
                  </p>
                </div>
                <div class="mt-6">
                  <pst-button variant="primary">Submit</pst-button>
                </div>
              </div>
            </pst-stepper-step>
          </pst-stepper>
        </div>
        
        <!-- Vertical Stepper Demo -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 class="text-lg font-medium mb-4">Vertical Stepper</h3>
          <pst-stepper 
            orientation="vertical"
            [showStepNumbers]="false">
            
            <pst-stepper-step 
              label="Upload Documents" 
              icon="upload"
              [completed]="true">
              <div class="py-4 px-4">
                <p class="text-green-600">✓ Documents uploaded successfully</p>
              </div>
            </pst-stepper-step>
            
            <pst-stepper-step 
              label="Verification" 
              icon="shield-check"
              [error]="true">
              <div class="py-4 px-4">
                <p class="text-red-600">⚠ Verification failed. Please check your documents.</p>
              </div>
            </pst-stepper-step>
            
            <pst-stepper-step 
              label="Approval" 
              icon="check-circle"
              [disabled]="true">
              <div class="py-4 px-4">
                <p class="text-gray-500">Waiting for verification...</p>
              </div>
            </pst-stepper-step>
          </pst-stepper>
        </div>

        <!-- Non-Linear Stepper Demo -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 class="text-lg font-medium mb-4">Non-Linear Stepper (Click any step)</h3>
          <pst-stepper [linear]="false">
            <pst-stepper-step label="Step 1" description="First step">
              <div class="py-8 px-4">
                <p>This is a non-linear stepper. You can click on any step to navigate directly to it.</p>
              </div>
            </pst-stepper-step>
            
            <pst-stepper-step label="Step 2" description="Second step">
              <div class="py-8 px-4">
                <p>You jumped directly to step 2!</p>
              </div>
            </pst-stepper-step>
            
            <pst-stepper-step label="Step 3" description="Third step">
              <div class="py-8 px-4">
                <p>Final step - you can go back to any previous step.</p>
              </div>
            </pst-stepper-step>
          </pst-stepper>
        </div>

        <!-- Custom Styled Stepper Demo -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 class="text-lg font-medium mb-4">Stepper with Icons and States</h3>
          <pst-stepper orientation="horizontal" [showStepNumbers]="false">
            <pst-stepper-step 
              label="Design" 
              icon="palette"
              [completed]="true">
              <div class="py-8 px-4 text-center">
                <pst-icon name="check-circle" size="xl" class="text-green-500 mb-4" />
                <p class="text-green-600 font-medium">Design phase completed!</p>
              </div>
            </pst-stepper-step>
            
            <pst-stepper-step 
              label="Development" 
              icon="code">
              <div class="py-8 px-4 text-center">
                <pst-spinner size="lg" class="mb-4" />
                <p class="text-primary-600 font-medium">Development in progress...</p>
              </div>
            </pst-stepper-step>
            
            <pst-stepper-step 
              label="Testing" 
              icon="beaker"
              [disabled]="true">
              <div class="py-8 px-4 text-center">
                <pst-icon name="clock" size="xl" class="text-gray-400 mb-4" />
                <p class="text-gray-500">Waiting for development to complete</p>
              </div>
            </pst-stepper-step>
            
            <pst-stepper-step 
              label="Deploy" 
              icon="rocket"
              [disabled]="true">
              <div class="py-8 px-4 text-center">
                <pst-icon name="rocket" size="xl" class="text-gray-400 mb-4" />
                <p class="text-gray-500">Ready to launch when all steps are complete</p>
              </div>
            </pst-stepper-step>
          </pst-stepper>
        </div>
      </section>

      <!-- Documentation Section -->
      <pst-showcase-template
        [sections]="sections"
        [props]="props"
        [events]="events"
        [bestPractices]="bestPractices">
      </pst-showcase-template>
    </div>
  `
})
export class StepperShowcaseComponent {
  step1Completed = signal(false);
  currentStep = signal(0);
  
  sections = [
    {
      title: 'Basic Usage',
      description: 'A simple horizontal stepper with three steps.',
      code: `<pst-stepper>
  <pst-stepper-step label="Step 1" description="First step description">
    <!-- Step 1 content -->
  </pst-stepper-step>
  
  <pst-stepper-step label="Step 2" description="Second step description">
    <!-- Step 2 content -->
  </pst-stepper-step>
  
  <pst-stepper-step label="Step 3" description="Final step">
    <!-- Step 3 content -->
  </pst-stepper-step>
</pst-stepper>`
    },
    {
      title: 'Linear Stepper',
      description: 'Requires users to complete steps in order.',
      code: `<pst-stepper [linear]="true">
  <pst-stepper-step 
    label="Account Setup" 
    [completed]="accountComplete">
    <!-- Account setup form -->
  </pst-stepper-step>
  
  <pst-stepper-step 
    label="Profile Details" 
    [completed]="profileComplete">
    <!-- Profile form -->
  </pst-stepper-step>
  
  <pst-stepper-step label="Confirmation">
    <!-- Review and confirm -->
  </pst-stepper-step>
</pst-stepper>`
    },
    {
      title: 'Vertical Layout',
      description: 'Display steps vertically for better mobile experience or detailed content.',
      code: `<pst-stepper orientation="vertical">
  <pst-stepper-step label="Upload" icon="upload">
    <!-- Upload content -->
  </pst-stepper-step>
  
  <pst-stepper-step label="Process" icon="cog">
    <!-- Processing status -->
  </pst-stepper-step>
  
  <pst-stepper-step label="Complete" icon="check">
    <!-- Completion message -->
  </pst-stepper-step>
</pst-stepper>`
    },
    {
      title: 'Optional Steps',
      description: 'Mark steps as optional to allow users to skip them.',
      code: `<pst-stepper>
  <pst-stepper-step label="Required Info">
    <!-- Required fields -->
  </pst-stepper-step>
  
  <pst-stepper-step label="Additional Details" [optional]="true">
    <!-- Optional fields -->
  </pst-stepper-step>
  
  <pst-stepper-step label="Review">
    <!-- Review step -->
  </pst-stepper-step>
</pst-stepper>`
    },
    {
      title: 'Step States',
      description: 'Different states for steps: completed, error, disabled.',
      code: `<pst-stepper>
  <pst-stepper-step 
    label="Completed Step" 
    [completed]="true">
  </pst-stepper-step>
  
  <pst-stepper-step 
    label="Error Step" 
    [error]="true">
  </pst-stepper-step>
  
  <pst-stepper-step 
    label="Disabled Step" 
    [disabled]="true">
  </pst-stepper-step>
</pst-stepper>`
    },
    {
      title: 'Custom Navigation',
      description: 'Control navigation programmatically.',
      code: `<pst-stepper 
  [enableNavigation]="false"
  #stepper>
  
  <pst-stepper-step label="Step 1">
    <button (click)="stepper.next()">Next</button>
  </pst-stepper-step>
  
  <pst-stepper-step label="Step 2">
    <button (click)="stepper.previous()">Back</button>
    <button (click)="stepper.next()">Next</button>
  </pst-stepper-step>
</pst-stepper>`
    }
  ];
  
  props = [
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: 'Layout orientation of the stepper'
    },
    {
      name: 'linear',
      type: 'boolean',
      default: 'false',
      description: 'Require sequential step completion'
    },
    {
      name: 'showStepNumbers',
      type: 'boolean',
      default: 'true',
      description: 'Show step numbers in indicators'
    },
    {
      name: 'enableNavigation',
      type: 'boolean',
      default: 'true',
      description: 'Show built-in navigation buttons'
    },
    {
      name: 'labelPosition',
      type: "'bottom' | 'right'",
      default: "'bottom'",
      description: 'Position of step labels'
    },
    {
      name: 'animationDuration',
      type: "'none' | 'fast' | 'normal' | 'slow'",
      default: "'normal'",
      description: 'Animation speed for transitions'
    }
  ];
  
  events = [
    {
      name: 'stepChange',
      type: 'EventEmitter<StepChangeEvent>',
      description: 'Emitted when the active step changes'
    }
  ];
  
  bestPractices = {
    do: [
      'Use clear, concise labels for each step',
      'Provide descriptions for complex steps',
      'Show progress and current position clearly',
      'Allow users to review previous steps when possible',
      'Save progress automatically or provide save functionality',
      'Use linear mode for critical processes (payments, setup wizards)',
      'Provide visual feedback for completed and error states',
      'Include optional steps when appropriate'
    ],
    dont: [
      'Don\'t use too many steps (try to keep under 7)',
      'Avoid hiding the overall progress from users',
      'Don\'t disable navigation without clear reasons',
      'Don\'t lose user data when navigating between steps',
      'Avoid complex branching logic in steppers',
      'Don\'t use steppers for single-page forms',
      'Don\'t mix horizontal and vertical layouts',
      'Avoid auto-advancing without user action'
    ]
  };
  
  completeStep1() {
    this.step1Completed.set(true);
  }
  
  onStepChange(event: StepChangeEvent) {
    console.log('Step changed:', event);
    this.currentStep.set(event.currentStep);
  }
}