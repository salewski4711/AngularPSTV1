export interface SelectOption<T = any> {
  value: T;
  label: string;
  disabled?: boolean;
  group?: string;
}

export interface SelectGroup<T = any> {
  label: string;
  options: SelectOption<T>[];
}

export type SelectSize = 'sm' | 'md' | 'lg';