export interface RadioOption<T = any> {
  value: T;
  label: string;
  disabled?: boolean;
  helperText?: string;
}