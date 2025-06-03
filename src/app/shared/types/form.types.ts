export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
export type InputState = 'default' | 'hover' | 'focus' | 'disabled' | 'error' | 'success';
export type InputSize = 'sm' | 'md' | 'lg';

export interface FormFieldState {
  touched: boolean;
  dirty: boolean;
  errors: Record<string, any> | null;
}

export interface FormControlConfig {
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
}