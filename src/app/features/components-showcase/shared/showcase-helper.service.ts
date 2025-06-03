import { Injectable } from '@angular/core';
import { PlaygroundProp } from './components/playground.component';

/**
 * Helper service for showcase components
 * Follows Single Responsibility Principle
 */
@Injectable({
  providedIn: 'root'
})
export class ShowcaseHelperService {
  
  /**
   * Common playground prop configurations
   */
  readonly commonProps = {
    variant: (options: string[]): Partial<PlaygroundProp> => ({
      type: 'enum',
      options,
      description: 'Visual style variant'
    }),
    
    size: (options: string[] = ['sm', 'md', 'lg']): Partial<PlaygroundProp> => ({
      type: 'enum',
      options,
      description: 'Size of the component'
    }),
    
    color: (options: string[]): Partial<PlaygroundProp> => ({
      type: 'enum',
      options,
      description: 'Color theme'
    }),
    
    disabled: (): Partial<PlaygroundProp> => ({
      type: 'boolean',
      defaultValue: false,
      description: 'Disable the component'
    }),
    
    label: (): Partial<PlaygroundProp> => ({
      type: 'string',
      defaultValue: '',
      description: 'Label text'
    }),
    
    content: (defaultValue = 'Content'): Partial<PlaygroundProp> => ({
      type: 'string',
      defaultValue,
      description: 'Component content'
    })
  };
  
  /**
   * Create a playground prop with common defaults
   */
  createProp(name: string, partial: Partial<PlaygroundProp>): PlaygroundProp {
    return {
      name,
      type: 'string',
      defaultValue: '',
      ...partial
    };
  }
  
  /**
   * Generate clean component code
   * Follows Open/Closed Principle - extensible through options
   */
  generateComponentCode(options: {
    tag: string;
    props: any;
    defaults?: Record<string, any>;
    content?: string;
    contentProp?: string;
    booleanProps?: string[];
    numberProps?: string[];
    skipProps?: string[];
  }): string {
    const {
      tag,
      props,
      defaults = {},
      content = '',
      contentProp = 'content',
      booleanProps = [],
      numberProps = [],
      skipProps = []
    } = options;
    
    const attributes: string[] = [];
    
    Object.entries(props).forEach(([key, value]) => {
      // Skip specified props
      if (skipProps.includes(key)) {return;}
      
      // Skip content prop (handled separately)
      if (key === contentProp) {return;}
      
      // Skip default values
      if (value === defaults[key]) {return;}
      
      // Skip empty strings for non-required props
      if (value === '' && !['label', 'title'].includes(key)) {return;}
      
      // Format attribute
      let attribute: string;
      
      if (booleanProps.includes(key)) {
        if (value) {
          attribute = `[${key}]="true"`;
        } else {
          return; // Skip false boolean values
        }
      } else if (numberProps.includes(key)) {
        attribute = `[${key}]="${value}"`;
      } else if (typeof value === 'string' && value) {
        attribute = `${key}="${value}"`;
      } else {
        return;
      }
      
      attributes.push(attribute);
    });
    
    const attributeString = attributes.length > 0 
      ? '\n  ' + attributes.join('\n  ') 
      : '';
    
    const componentContent = props[contentProp] || content;
    
    if (!componentContent) {
      return `<${tag}${attributeString}></${tag}>`;
    }
    
    return `<${tag}${attributeString}>
  ${componentContent}
</${tag}>`;
  }
  
  /**
   * Parse TypeScript type to extract enum values
   */
  parseEnumType(typeString: string): string[] {
    const matches = typeString.match(/'([^']+)'/g);
    return matches ? matches.map(m => m.replace(/'/g, '')) : [];
  }
  
  /**
   * Convert camelCase to kebab-case
   */
  camelToKebab(str: string): string {
    return str.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
  }
}