/**
 * Utility types for better type safety
 */

// Make all properties required and non-nullable
export type Concrete<T> = {
  [P in keyof T]-?: NonNullable<T[P]>;
};

// Deep partial type
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Extract array element type
export type ArrayElement<T> = T extends readonly (infer U)[] ? U : never;

// Nullable type
export type Nullable<T> = T | null;

// Maybe type (nullable or undefined)
export type Maybe<T> = T | null | undefined;

// Keys of type that match certain value type
export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

// Omit multiple keys
export type OmitMultiple<T, K extends keyof T> = Pick<
  T,
  Exclude<keyof T, K>
>;

// Require at least one property
export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<OmitMultiple<T, K>>;
}[keyof T];

// Exclusive OR type
export type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

// Brand type for nominal typing
export type Brand<T, TBrand> = T & { __brand: TBrand };

// Example usage:
export type UserId = Brand<string, 'UserId'>;
export type ProjectId = Brand<string, 'ProjectId'>;

// Type predicate helpers
export function isNonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

export function hasProperty<T extends object, K extends PropertyKey>(
  obj: T,
  key: K
): obj is T & Record<K, unknown> {
  return key in obj;
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

export function isArray<T>(value: unknown): value is T[] {
  return Array.isArray(value);
}