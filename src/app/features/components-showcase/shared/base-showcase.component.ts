import { Component, Type } from '@angular/core';
import { PlaygroundConfig, PlaygroundProp } from './components/playground.component';

export interface ShowcaseProp {
  name: string;
  type: string;
  default: string;
  description: string;
}

export interface ShowcaseExample {
  title: string;
  code: string;
  description?: string;
}

/**
 * Abstract base class for all showcase components
 * Implements DRY principle and provides common functionality
 */
export abstract class BaseShowcaseComponent {
  // Component metadata
  abstract title: string;
  abstract description: string;
  abstract component: Type<any>;
  
  // Props documentation for the props table
  abstract props: ShowcaseProp[];
  
  // Examples for code blocks
  abstract examples: Record<string, string>;
  
  // Playground configuration - use getter to ensure lazy initialization
  private _playgroundConfig?: PlaygroundConfig;
  
  get playgroundConfig(): PlaygroundConfig {
    if (!this._playgroundConfig) {
      this._playgroundConfig = this.createPlaygroundConfig();
    }
    return this._playgroundConfig;
  }
  
  constructor() {
    // Properties are not yet initialized here
  }
  
  /**
   * Creates the playground configuration based on the component's props
   * Can be overridden for custom behavior
   */
  protected createPlaygroundConfig(): PlaygroundConfig {
    return {
      component: this.component,
      props: this.createPlaygroundProps(),
      code: this.generateCode.bind(this),
      previewClass: this.getPreviewClass()
    };
  }
  
  /**
   * Transforms showcase props to playground props
   * Override this method for custom prop transformations
   */
  protected createPlaygroundProps(): PlaygroundProp[] {
    return this.props.map(prop => this.transformPropToPlayground(prop));
  }
  
  /**
   * Transform a single prop to playground format
   * Override for specific prop type handling
   */
  protected transformPropToPlayground(prop: ShowcaseProp): PlaygroundProp {
    const playgroundProp: PlaygroundProp = {
      name: prop.name,
      type: 'string',
      defaultValue: this.parseDefaultValue(prop),
      description: prop.description
    };
    
    // Auto-detect prop types based on TypeScript types
    if (prop.type.includes('boolean')) {
      playgroundProp.type = 'boolean';
    } else if (prop.type.includes('number')) {
      playgroundProp.type = 'number';
    } else if (prop.type.includes('|')) {
      // Union types are likely enums
      playgroundProp.type = 'enum';
      playgroundProp.options = this.extractEnumOptions(prop.type);
    }
    
    return playgroundProp;
  }
  
  /**
   * Parse default value based on type
   */
  protected parseDefaultValue(prop: ShowcaseProp): any {
    if (prop.default === 'undefined' || prop.default === 'null') {
      return prop.type.includes('boolean') ? false : '';
    }
    
    if (prop.type.includes('boolean')) {
      return prop.default === 'true';
    }
    
    if (prop.type.includes('number')) {
      return parseInt(prop.default) || 0;
    }
    
    // Remove quotes from string defaults
    return prop.default.replace(/['"]/g, '');
  }
  
  /**
   * Extract enum options from union type string
   */
  protected extractEnumOptions(typeString: string): string[] {
    // Extract options from types like "'sm' | 'md' | 'lg'"
    const matches = typeString.match(/'([^']+)'/g);
    return matches ? matches.map(m => m.replace(/'/g, '')) : [];
  }
  
  /**
   * Generate code for the playground
   * Override this for custom code generation
   */
  protected generateCode(props: any): string {
    const componentTag = this.getComponentTag();
    const attributes = this.generateAttributes(props);
    const content = this.generateContent(props);
    
    if (!attributes) {
      return `<${componentTag}>${content}</${componentTag}>`;
    }
    
    return `<${componentTag}${attributes}>
${content}
</${componentTag}>`;
  }
  
  /**
   * Get the component tag name
   */
  protected getComponentTag(): string {
    return 'app-' + this.component.name
      .replace(/Component$/, '')
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
      .replace(/^-/, '');
  }
  
  /**
   * Generate attributes string for the component
   */
  protected generateAttributes(props: any): string {
    const attributes: string[] = [];
    
    Object.entries(props).forEach(([key, value]) => {
      const prop = this.props.find(p => p.name === key);
      if (!prop) {return;}
      
      // Skip default values to keep code clean
      if (this.isDefaultValue(prop, value)) {return;}
      
      // Skip content-related props
      if (this.isContentProp(key)) {return;}
      
      // Format attribute based on type
      const attribute = this.formatAttribute(key, value, prop);
      if (attribute) {attributes.push(attribute);}
    });
    
    return attributes.length > 0 ? '\n  ' + attributes.join('\n  ') : '';
  }
  
  /**
   * Check if value is the default
   */
  protected isDefaultValue(prop: ShowcaseProp, value: any): boolean {
    const defaultValue = this.parseDefaultValue(prop);
    return value === defaultValue || (!value && !defaultValue);
  }
  
  /**
   * Check if prop is content-related (handled separately)
   */
  protected isContentProp(propName: string): boolean {
    return ['content', 'label', 'text', 'children'].includes(propName);
  }
  
  /**
   * Format a single attribute
   */
  protected formatAttribute(key: string, value: any, prop: ShowcaseProp): string {
    if (typeof value === 'boolean') {
      return value ? `[${key}]="true"` : '';
    }
    
    if (typeof value === 'number') {
      return `[${key}]="${value}"`;
    }
    
    if (typeof value === 'string' && value) {
      // Use property binding for non-string types
      if (prop.type.includes('|') || prop.type.includes('[]')) {
        return `${key}="${value}"`;
      }
      return `${key}="${value}"`;
    }
    
    return '';
  }
  
  /**
   * Generate content for the component
   * Override for components with specific content needs
   */
  protected generateContent(props: any): string {
    return props.content || props.label || props.text || '';
  }
  
  /**
   * Get preview container classes
   * Override for custom preview styling
   */
  protected getPreviewClass(): string {
    return 'p-8 bg-gray-50 dark:bg-gray-900 rounded-lg min-h-[200px] flex items-center justify-center';
  }
}