export interface StepperStep {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  optional?: boolean;
  disabled?: boolean;
  error?: boolean;
  completed?: boolean;
}

export type StepperOrientation = 'horizontal' | 'vertical';
export type StepperLabelPosition = 'bottom' | 'right';
export type StepperAnimationDuration = 'none' | 'fast' | 'normal' | 'slow';

export interface StepperConfig {
  linear?: boolean; // Require sequential completion
  showStepNumbers?: boolean;
  enableNavigation?: boolean;
  animationDuration?: StepperAnimationDuration;
}

export interface StepChangeEvent {
  previousStep: number;
  currentStep: number;
  step: StepperStep;
}

export interface StepperState {
  currentStep: number;
  steps: StepperStep[];
  canGoNext: boolean;
  canGoPrevious: boolean;
}