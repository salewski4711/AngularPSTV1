import { Injectable } from '@angular/core';
import { DESIGN_TOKENS } from './design-tokens';

/**
 * TokenUtils - Zentrale Utility-Klasse für Design Token Zugriff
 * 
 * Diese Klasse bietet type-safe Methoden für:
 * - Farben-Tokens → Hex-Werte oder Tailwind-Klassen
 * - Spacing-Tokens → rem-Werte oder Tailwind-Klassen
 * - Typography-Tokens → Tailwind-Klassen
 * - Component-spezifische Token-Sets
 */
@Injectable({
  providedIn: 'root'
})
export class TokenUtils {
  
  /**
   * Holt einen Farbwert aus den Design Tokens
   * @param path Token-Pfad z.B. 'primary.500' oder 'neutral.white'
   * @returns Hex-Farbwert z.B. '#F99600'
   */
  static getColor(path: string): string {
    const parts = path.split('.');
    let value: any = DESIGN_TOKENS.colors;
    
    for (const part of parts) {
      value = value?.[part];
    }
    
    // Fallback für bekannte Shortcuts
    if (!value) {
      const shortcuts: Record<string, string> = {
        'primary': DESIGN_TOKENS.colors.primary[500],
        'secondary': DESIGN_TOKENS.colors.secondary[500],
        'white': '#FFFFFF',
        'black': '#000000',
        'transparent': 'transparent'
      };
      value = shortcuts[path];
    }
    
    return value || '#000000'; // Fallback
  }
  
  /**
   * Generiert Tailwind-Farbklassen
   * @param property CSS-Property (bg, text, border, etc.)
   * @param token Token-Name (primary.500, secondary, etc.)
   * @returns Tailwind-Klasse z.B. 'bg-primary'
   */
  static getColorClass(property: 'bg' | 'text' | 'border' | 'ring' | 'divide' | 'from' | 'to' | 'via', token: string): string {
    // Token zu Tailwind-Klassen Mapping
    const colorMap: Record<string, string> = {
      'primary.DEFAULT': 'primary',
      'primary.500': 'primary',
      'primary.600': 'primary-600',
      'primary.700': 'primary-700',
      'primary': 'primary',
      'secondary.DEFAULT': 'secondary',
      'secondary.500': 'secondary-500',
      'secondary.600': 'secondary-600',
      'secondary.700': 'secondary-700',
      'secondary': 'secondary',
      'neutral.white': 'white',
      'white': 'white',
      'neutral.black': 'black',
      'black': 'black',
      'neutral.50': 'gray-50',
      'neutral.100': 'gray-100',
      'neutral.200': 'gray-200',
      'neutral.300': 'gray-300',
      'neutral.400': 'gray-400',
      'neutral.500': 'gray-500',
      'neutral.600': 'gray-600',
      'neutral.700': 'gray-700',
      'neutral.800': 'gray-800',
      'neutral.900': 'gray-900',
      'success.500': 'green-500',
      'success.600': 'green-600',
      'error.500': 'red-500',
      'error.600': 'red-600',
      'error.700': 'red-700',
      'warning.500': 'amber-500',
      'warning.600': 'amber-600',
      'info.500': 'blue-500',
      'info.600': 'blue-600',
      'primary.50': 'primary-50',
      'primary.100': 'primary-100',
      'primary.900': 'primary-900',
      'transparent': 'transparent'
    };
    
    const tailwindColor = colorMap[token] || token;
    return `${property}-${tailwindColor}`;
  }
  
  /**
   * Holt einen Spacing-Wert aus den Design Tokens
   * @param size Token-Size (0, px, 1, 2, 3, etc.)
   * @returns Spacing-Wert z.B. '1rem'
   */
  static getSpacing(size: string | number): string {
    const spacing = DESIGN_TOKENS.spacing as any;
    return spacing[size] || `${size}rem`;
  }
  
  /**
   * Generiert Tailwind-Spacing-Klassen
   * @param property CSS-Property (p, m, px, py, etc.)
   * @param size Token-Size (sm, md, lg oder Zahl)
   * @returns Tailwind-Klasse z.B. 'p-4'
   */
  static getSpacingClass(property: string, size: string): string {
    // Semantische Größen zu Tailwind-Größen
    const sizeMap: Record<string, string> = {
      'none': '0',
      'xs': '1',    // 0.25rem
      'sm': '2',    // 0.5rem
      'md': '4',    // 1rem
      'lg': '6',    // 1.5rem
      'xl': '8',    // 2rem
      '2xl': '12',  // 3rem
      '3xl': '16',  // 4rem
    };
    
    const tailwindSize = sizeMap[size] || size;
    return `${property}-${tailwindSize}`;
  }
  
  /**
   * Generiert Tailwind-Text-Größen-Klassen
   * @param size Token-Size (xs, sm, base, lg, xl, etc.)
   * @returns Tailwind-Klasse z.B. 'text-lg'
   */
  static getTextSizeClass(size: string): string {
    return `text-${size}`;
  }
  
  /**
   * Generiert Tailwind-Font-Weight-Klassen
   * @param weight Token-Weight (light, normal, medium, semibold, bold)
   * @returns Tailwind-Klasse z.B. 'font-semibold'
   */
  static getFontWeightClass(weight: string): string {
    return `font-${weight}`;
  }
  
  /**
   * Generiert Tailwind-Border-Radius-Klassen
   * @param size Token-Size (none, sm, base, md, lg, xl, 2xl, 3xl, full)
   * @returns Tailwind-Klasse z.B. 'rounded-lg'
   */
  static getRadiusClass(size: string): string {
    if (size === 'base') return 'rounded';
    return `rounded-${size}`;
  }
  
  /**
   * Generiert Tailwind-Shadow-Klassen
   * @param size Token-Size (sm, base, md, lg, xl, 2xl, inner, none)
   * @returns Tailwind-Klasse z.B. 'shadow-lg'
   */
  static getShadowClass(size: string): string {
    if (size === 'base') return 'shadow';
    return `shadow-${size}`;
  }
  
  /**
   * Holt ein beliebiges Token aus dem Token-System
   * @param path Punkt-getrennter Pfad z.B. 'colors.primary.500'
   * @returns Token-Wert
   */
  static getToken(path: string): any {
    const parts = path.split('.');
    let value: any = DESIGN_TOKENS;
    
    for (const part of parts) {
      value = value?.[part];
    }
    
    return value;
  }
  
  /**
   * Generiert alle Klassen für eine Komponente basierend auf Props
   * @param component Komponenten-Name (button, input, card, etc.)
   * @param options Komponenten-Props (variant, size, state, etc.)
   * @returns Kombinierte Tailwind-Klassen
   */
  static getComponentClasses(component: string, options: {
    variant?: string;
    size?: string;
    state?: {
      disabled?: boolean;
      loading?: boolean;
      error?: boolean;
      success?: boolean;
      focused?: boolean;
      active?: boolean;
      fullWidth?: boolean;
      iconOnly?: boolean;
    };
  }): string {
    const classes: string[] = [];
    
    // Base-Klassen für Komponente
    const baseClasses = this.getComponentBaseClasses(component);
    classes.push(baseClasses);
    
    // Variant-spezifische Klassen
    if (options.variant) {
      const variantClasses = this.getComponentVariantClasses(component, options.variant);
      classes.push(variantClasses);
    }
    
    // Size-spezifische Klassen
    if (options.size) {
      // Spezielle Behandlung für icon-only buttons
      const sizeComponent = component === 'button' && options.state?.iconOnly ? 'button-icon' : component;
      const sizeClasses = this.getComponentSizeClasses(sizeComponent, options.size);
      classes.push(sizeClasses);
    }
    
    // State-spezifische Klassen
    if (options.state) {
      const stateClasses = this.getComponentStateClasses(component, options.state);
      classes.push(stateClasses);
    }
    
    return classes.filter(Boolean).join(' ');
  }
  
  /**
   * Private Helper-Methoden
   */
  
  private static getComponentBaseClasses(component: string): string {
    const baseClassMap: Record<string, string> = {
      'button': 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
      'input': 'w-full transition-colors focus:outline-none',
      'card': 'bg-white dark:bg-gray-800 rounded-lg',
      'badge': 'inline-flex items-center font-medium uppercase tracking-wider',
      'tag': 'inline-flex items-center font-medium uppercase tracking-wider transition-colors'
    };
    
    return baseClassMap[component] || '';
  }
  
  private static getComponentVariantClasses(component: string, variant: string): string {
    const variantMap: Record<string, Record<string, string>> = {
      'button': {
        'primary': 'bg-primary text-white hover:bg-primary-600 active:bg-primary-700 focus:ring-primary',
        'secondary': 'bg-secondary text-white hover:bg-secondary-600 active:bg-secondary-700 focus:ring-secondary',
        'outline-primary': 'bg-transparent border border-primary text-primary hover:bg-primary-50 dark:hover:bg-primary/10 active:bg-primary-100 dark:active:bg-primary/20 focus:ring-primary',
        'outline': 'bg-transparent border border-primary text-primary hover:bg-primary-50 dark:hover:bg-primary/10 focus:ring-primary',
        'tertiary': 'bg-transparent border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700 focus:ring-gray-500',
        'ghost': 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700 focus:ring-gray-500',
        'danger': 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-500'
      },
      'badge': {
        'filled': 'bg-gray-100 text-gray-700',
        'outline': 'bg-transparent border border-gray-400',
        'subtle': 'bg-gray-700/10 text-gray-700'
      }
    };
    
    return variantMap[component]?.[variant] || '';
  }
  
  private static getComponentSizeClasses(component: string, size: string): string {
    const sizeMap: Record<string, Record<string, string>> = {
      'button': {
        'xs': 'text-xs px-2.5 py-1.5 rounded',
        'sm': 'text-sm px-3 py-2 rounded-md',
        'md': 'text-base px-4 py-2.5 rounded-md',
        'lg': 'text-lg px-5 py-3 rounded-lg',
        'xl': 'text-xl px-6 py-3.5 rounded-lg'
      },
      'button-icon': {
        'xs': 'p-1 rounded',
        'sm': 'p-1.5 rounded',
        'md': 'p-2 rounded-md',
        'lg': 'p-2.5 rounded-md',
        'xl': 'p-3 rounded-lg'
      },
      'input': {
        'sm': 'h-8 px-2.5 py-1.5 text-sm rounded',
        'md': 'h-10 px-3 py-2 text-base rounded-md',
        'lg': 'h-12 px-4 py-3 text-lg rounded-lg'
      }
    };
    
    return sizeMap[component]?.[size] || '';
  }
  
  private static getComponentStateClasses(component: string, state: any): string {
    const classes: string[] = [];
    
    if (state.disabled) {
      classes.push('opacity-60 cursor-not-allowed');
    }
    
    if (state.loading) {
      classes.push('cursor-wait');
    }
    
    if (state.error) {
      classes.push('border-red-500 focus:ring-red-500');
    }
    
    if (state.success) {
      classes.push('border-green-500 focus:ring-green-500');
    }
    
    if (state.fullWidth) {
      classes.push('w-full');
    }
    
    return classes.join(' ');
  }
  
  /**
   * Holt Token-Wert für eine spezifische Komponente
   * @param component Komponenten-Name
   * @param path Token-Pfad innerhalb der Komponente
   * @returns Token-Wert
   */
  static getComponentToken(component: string, path: string): any {
    // Hier würden wir auf komponenten-spezifische Tokens zugreifen
    // Vorerst nutzen wir allgemeine Tokens
    return this.getToken(path);
  }

  /**
   * Listet alle verfügbaren Tokens auf - für Entwickler-Hilfe
   * @returns Formatierte Liste aller Tokens
   */
  static listAvailableTokens(): string {
    const output: string[] = [];
    
    output.push('=== VERFÜGBARE DESIGN TOKENS ===\n');
    
    // Colors
    output.push('FARBEN:');
    output.push('  Primary (Orange): primary.500, primary.600, primary.700');
    output.push('  Secondary (Blau): secondary.500, secondary.600, secondary.700');
    output.push('  Neutral (Grau): neutral.white, neutral.100-900, neutral.black');
    output.push('  Status: success.500, error.500, warning.500, info.500\n');
    
    // Spacing
    output.push('SPACING (für padding, margin, gap):');
    output.push('  Tokens: 0, px, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24');
    output.push('  Beispiel: TokenUtils.getSpacing("4") = 1rem = 16px\n');
    
    // Typography
    output.push('TYPOGRAFIE:');
    output.push('  Größen: xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl');
    output.push('  Gewichte: thin, light, normal, medium, semibold, bold, extrabold\n');
    
    // Components
    output.push('KOMPONENTEN-KLASSEN:');
    output.push('  TokenUtils.getComponentClasses("button", { variant: "primary", size: "md" })');
    output.push('  Verfügbare Komponenten: button, badge, card, input\n');
    
    output.push('WICHTIG: NIEMALS neue Tokens selbst hinzufügen!');
    output.push('Bei Bedarf: Token-Request-Issue erstellen');
    
    return output.join('\n');
  }

  /**
   * Holt Transition-Klassen aus Tokens
   * @param duration Dauer: fast, base, slow, slower
   * @param property Property: all, colors, opacity, transform
   * @returns Tailwind transition classes
   */
  static getTransitionClass(duration: 'fast' | 'base' | 'slow' | 'slower' = 'base', property: 'all' | 'colors' | 'opacity' | 'transform' = 'all'): string {
    const durationMap = {
      fast: '150',
      base: '200',
      slow: '300',
      slower: '500'
    };
    
    const propertyMap = {
      all: 'transition-all',
      colors: 'transition-colors',
      opacity: 'transition-opacity',
      transform: 'transition-transform'
    };
    
    return `${propertyMap[property]} duration-${durationMap[duration]} ease-in-out`;
  }

  /**
   * Holt Animation-Klassen
   * @param animation Animation name
   * @returns Animation classes
   */
  static getAnimationClass(animation: 'spin' | 'ping' | 'pulse' | 'bounce' | 'fade-in' | 'fade-out' | 'slide-in' | 'slide-out'): string {
    const animationMap = {
      'spin': 'animate-spin',
      'ping': 'animate-ping',
      'pulse': 'animate-pulse',
      'bounce': 'animate-bounce',
      'fade-in': 'animate-fadeIn',
      'fade-out': 'animate-fadeOut',
      'slide-in': 'animate-slideIn',
      'slide-out': 'animate-slideOut'
    };
    
    return animationMap[animation] || '';
  }

  /**
   * Findet das nächstpassende Token für einen gegebenen Wert
   * @param value Hex-Farbe oder Pixel-Wert
   * @returns Empfohlenes Token oder null
   */
  static findClosestToken(value: string): { token: string; exact: boolean } | null {
    // Für Hex-Farben
    if (value.startsWith('#')) {
      const colorMap: Record<string, string> = {
        '#F99600': 'primary.500',
        '#f99600': 'primary.500',
        '#1C3661': 'secondary.500',
        '#1c3661': 'secondary.500',
        '#FFFFFF': 'neutral.white',
        '#ffffff': 'neutral.white',
        '#000000': 'neutral.black',
        '#000': 'neutral.black'
      };
      
      if (colorMap[value]) {
        return { token: colorMap[value], exact: true };
      }
      
      // Empfehle basierend auf Farbton
      const lower = value.toLowerCase();
      if (lower.includes('f9') || lower.includes('ff9') || lower.includes('fa')) {
        return { token: 'primary.500', exact: false };
      }
      if (lower.includes('1c') || lower.includes('36') || lower.includes('00')) {
        return { token: 'secondary.500', exact: false };
      }
      
      return { token: 'neutral.500', exact: false };
    }
    
    // Für Pixel-Werte
    if (value.endsWith('px')) {
      const pixelMap: Record<string, string> = {
        '4px': '1',
        '8px': '2',
        '12px': '3',
        '16px': '4',
        '20px': '5',
        '24px': '6',
        '32px': '8',
        '40px': '10',
        '48px': '12',
        '64px': '16'
      };
      
      if (pixelMap[value]) {
        return { token: pixelMap[value], exact: true };
      }
    }
    
    return null;
  }
}