import { inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DESIGN_TOKENS } from './design-tokens';

/**
 * Utility functions for working with design tokens
 */
export class TokenUtils {
  private static document = inject(DOCUMENT);
  
  /**
   * Get CSS variable value
   */
  static getCSSVariable(name: string): string {
    return getComputedStyle(this.document.documentElement)
      .getPropertyValue(name)
      .trim();
  }
  
  /**
   * Set CSS variable value
   */
  static setCSSVariable(name: string, value: string): void {
    this.document.documentElement.style.setProperty(name, value);
  }
  
  /**
   * Generate Tailwind-compatible color classes
   */
  static generateColorClasses(
    property: 'bg' | 'text' | 'border',
    color: keyof typeof DESIGN_TOKENS.colors,
    shade: string
  ): string {
    return `${property}-${color}-${shade}`;
  }
  
  /**
   * Convert spacing token to Tailwind class
   */
  static getSpacingClass(
    property: 'p' | 'm' | 'px' | 'py' | 'mx' | 'my' | 'mt' | 'mb' | 'ml' | 'mr',
    size: keyof typeof DESIGN_TOKENS.spacing
  ): string {
    return `${property}-${size}`;
  }
}