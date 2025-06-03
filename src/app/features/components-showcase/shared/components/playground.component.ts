import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  signal,
  computed,
  Type,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  effect, AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../../../../shared/icons/icon.component';

export interface PlaygroundProp {
  name: string;
  type: 'string' | 'boolean' | 'enum' | 'number' | 'color';
  defaultValue: any;
  description?: string;
  options?: any[]; // For enum type
  min?: number; // For number type
  max?: number; // For number type
  step?: number; // For number type
}

export interface PlaygroundConfig {
  component: Type<any>;
  props: PlaygroundProp[];
  code?: (props: any) => string; // Custom code generator
  previewClass?: string; // CSS classes for preview container
}

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <!-- Header -->
      <div class="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Interactive Playground
          </h3>
          <button
            (click)="resetToDefaults()"
            class="text-sm px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <app-icon name="arrow-left" [size]="16" class="inline mr-1"></app-icon>
            Reset to Defaults
          </button>
        </div>
      </div>

      <div class="grid lg:grid-cols-2 divide-x divide-gray-200 dark:divide-gray-700">
        <!-- Controls Panel -->
        <div class="p-6 space-y-4 max-h-[600px] overflow-y-auto">
          <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4">
            Component Properties
          </h4>
          
          @for (prop of config.props; track prop.name) {
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {{ prop.name }}
                @if (prop.description) {
                  <span class="text-xs text-gray-500 dark:text-gray-400 block mt-1">
                    {{ prop.description }}
                  </span>
                }
              </label>
              
              <!-- String Input -->
              @if (prop.type === 'string') {
                <input
                  type="text"
                  [(ngModel)]="propValues()[prop.name]"
                  (ngModelChange)="updateProp(prop.name, $event)"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-gray-100"
                  [placeholder]="'Enter ' + prop.name"
                />
              }
              
              <!-- Boolean Toggle -->
              @if (prop.type === 'boolean') {
                <div class="flex items-center">
                  <button
                    type="button"
                    [class.bg-primary]="propValues()[prop.name]"
                    [class.bg-gray-200]="!propValues()[prop.name]"
                    (click)="updateProp(prop.name, !propValues()[prop.name])"
                    class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    <span
                      [class.translate-x-5]="propValues()[prop.name]"
                      [class.translate-x-0]="!propValues()[prop.name]"
                      class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                    ></span>
                  </button>
                  <span class="ml-3 text-sm text-gray-600 dark:text-gray-400">
                    {{ propValues()[prop.name] ? 'Enabled' : 'Disabled' }}
                  </span>
                </div>
              }
              
              <!-- Enum Select -->
              @if (prop.type === 'enum' && prop.options) {
                <select
                  [(ngModel)]="propValues()[prop.name]"
                  (ngModelChange)="updateProp(prop.name, $event)"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-gray-100"
                >
                  @for (option of prop.options; track option) {
                    <option [value]="option">{{ option }}</option>
                  }
                </select>
              }
              
              <!-- Number Input -->
              @if (prop.type === 'number') {
                <div class="flex items-center space-x-2">
                  <input
                    type="range"
                    [(ngModel)]="propValues()[prop.name]"
                    (ngModelChange)="updateProp(prop.name, $event)"
                    [min]="prop.min || 0"
                    [max]="prop.max || 100"
                    [step]="prop.step || 1"
                    class="flex-1"
                  />
                  <input
                    type="number"
                    [(ngModel)]="propValues()[prop.name]"
                    (ngModelChange)="updateProp(prop.name, $event)"
                    [min]="prop.min || 0"
                    [max]="prop.max || 100"
                    [step]="prop.step || 1"
                    class="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-gray-100"
                  />
                </div>
              }
              
              <!-- Color Picker -->
              @if (prop.type === 'color') {
                <div class="flex items-center space-x-2">
                  <input
                    type="color"
                    [(ngModel)]="propValues()[prop.name]"
                    (ngModelChange)="updateProp(prop.name, $event)"
                    class="h-10 w-20 border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer"
                  />
                  <input
                    type="text"
                    [(ngModel)]="propValues()[prop.name]"
                    (ngModelChange)="updateProp(prop.name, $event)"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-gray-100"
                    placeholder="#000000"
                  />
                </div>
              }
            </div>
          }
        </div>

        <!-- Preview Panel -->
        <div class="p-6">
          <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4">
            Live Preview
          </h4>
          
          <!-- Preview Container -->
          <div [class]="config.previewClass || 'p-8 bg-gray-50 dark:bg-gray-900 rounded-lg min-h-[200px] flex items-center justify-center'">
            <div #previewContainer></div>
          </div>
          
          <!-- Generated Code -->
          <div class="mt-6">
            <div class="flex items-center justify-between mb-2">
              <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">
                Generated Code
              </h4>
              <button
                (click)="copyCode()"
                class="text-sm px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <app-icon name="copy" [size]="16" class="inline mr-1"></app-icon>
                {{ copySuccess() ? 'Copied!' : 'Copy' }}
              </button>
            </div>
            <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm"><code>{{ generatedCode() }}</code></pre>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    input[type="range"] {
      @apply appearance-none bg-gray-200 dark:bg-gray-700 rounded-full h-2 outline-none;
    }
    
    input[type="range"]::-webkit-slider-thumb {
      @apply appearance-none w-4 h-4 bg-primary rounded-full cursor-pointer transition-all hover:scale-110;
    }
    
    input[type="range"]::-moz-range-thumb {
      @apply w-4 h-4 bg-primary rounded-full cursor-pointer border-0 transition-all hover:scale-110;
    }
  `]
})
export class PlaygroundComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() config!: PlaygroundConfig;
  @Output() propsChange = new EventEmitter<any>();
  
  @ViewChild('previewContainer', { read: ViewContainerRef, static: false }) 
  previewContainer!: ViewContainerRef;
  
  propValues = signal<any>({});
  generatedCode = computed(() => this.generateCode());
  copySuccess = signal(false);
  
  private componentRef?: ComponentRef<any>;
  
  constructor() {
    // Update preview when prop values change
    effect(() => {
      const values = this.propValues();
      if (this.componentRef) {
        this.updateComponentProps();
      }
    });
  }
  
  ngOnInit() {
    this.initializeProps();
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['config']) {
      this.initializeProps();
      this.createPreviewComponent();
    }
  }
  
  ngAfterViewInit() {
    this.createPreviewComponent();
  }
  
  private initializeProps() {
    const values: any = {};
    this.config.props.forEach(prop => {
      values[prop.name] = prop.defaultValue;
    });
    this.propValues.set(values);
  }
  
  updateProp(name: string, value: any) {
    this.propValues.update(values => ({
      ...values,
      [name]: value
    }));
    this.propsChange.emit(this.propValues());
  }
  
  resetToDefaults() {
    this.initializeProps();
    this.propsChange.emit(this.propValues());
  }
  
  private createPreviewComponent() {
    if (!this.previewContainer) {return;}
    
    // Clear existing component
    this.previewContainer.clear();
    
    // Create new component instance
    this.componentRef = this.previewContainer.createComponent(this.config.component);
    this.updateComponentProps();
  }
  
  private updateComponentProps() {
    if (!this.componentRef) {return;}
    
    const values = this.propValues();
    Object.keys(values).forEach(key => {
      if (this.componentRef!.instance.hasOwnProperty(key)) {
        this.componentRef!.setInput(key, values[key]);
      }
    });
  }
  
  private generateCode(): string {
    if (this.config.code) {
      return this.config.code(this.propValues());
    }
    
    // Default code generation
    const componentName = this.config.component.name
      .replace(/Component$/, '')
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
      .replace(/^-/, '');
    
    const props = this.propValues();
    const attributes: string[] = [];
    
    Object.entries(props).forEach(([key, value]) => {
      const prop = this.config.props.find(p => p.name === key);
      if (!prop) {return;}
      
      if (prop.type === 'boolean') {
        if (value) {
          attributes.push(`[${key}]="true"`);
        }
      } else if (prop.type === 'string') {
        if (value !== prop.defaultValue) {
          attributes.push(`${key}="${value}"`);
        }
      } else if (prop.type === 'number') {
        attributes.push(`[${key}]="${value}"`);
      } else {
        attributes.push(`${key}="${value}"`);
      }
    });
    
    const attributesStr = attributes.length > 0 ? ' ' + attributes.join('\n  ') : '';
    
    return `<app-${componentName}${attributesStr}>
  Content here
</app-${componentName}>`;
  }
  
  async copyCode() {
    try {
      await navigator.clipboard.writeText(this.generatedCode());
      this.copySuccess.set(true);
      setTimeout(() => this.copySuccess.set(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  }
}