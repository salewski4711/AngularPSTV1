import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { InputComponent } from '../../components/input/input.component';
import { SelectComponent } from '../../components/select/select.component';
import { CheckboxComponent } from '../../components/checkbox/checkbox.component';
import { RadioGroupComponent } from '../../components/radio/radio-group.component';
import { ToggleComponent } from '../../components/toggle/toggle.component';
import { BadgeComponent } from '../../components/badge/badge.component';
import { AvatarComponent } from '../../components/avatar/avatar.component';
import { ButtonComponent } from '../../components/button/button.component';
import { ButtonGroupComponent } from '../../components/button-group/button-group.component';

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputComponent,
    SelectComponent,
    CheckboxComponent,
    RadioGroupComponent,
    ToggleComponent,
    BadgeComponent,
    AvatarComponent,
    ButtonComponent,
    ButtonGroupComponent
  ],
  template: `
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8" [class.dark]="isDarkMode">
      <!-- Dark Mode Toggle -->
      <div class="fixed top-4 right-4 z-50">
        <button 
          (click)="toggleDarkMode()"
          class="p-2 rounded-md bg-white dark:bg-gray-800 shadow-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <i class="fas" [class.fa-moon]="!isDarkMode" [class.fa-sun]="isDarkMode" [class.text-gray-600]="!isDarkMode" [class.text-yellow-400]="isDarkMode"></i>
        </button>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Component Showcase - Beta
        </h1>
        
        <!-- Input Component -->
        <section class="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Input Component</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Basic Input -->
            <app-input
              label="Basic Input"
              placeholder="Enter text..."
              helperText="This is a helper text"
              [formControl]="inputControl"
            />
            
            <!-- Email with Icon -->
            <app-input
              label="Email Address"
              type="email"
              placeholder="name@example.com"
              leadingIcon="fa fa-envelope"
              [formControl]="emailControl"
              errorMessage="Please enter a valid email"
            />
            
            <!-- Password -->
            <app-input
              label="Password"
              type="password"
              placeholder="Enter password"
              helperText="Min 8 characters"
              [formControl]="passwordControl"
              [showStatusIcon]="true"
            />
            
            <!-- Search with Loading -->
            <app-input
              label="Search"
              type="search"
              placeholder="Search..."
              leadingIcon="fa fa-search"
              [loading]="isSearching"
              [formControl]="searchControl"
            />
            
            <!-- Disabled Input -->
            <app-input
              label="Disabled Input"
              placeholder="Cannot edit"
              [formControl]="disabledInputControl"
            />
            
            <!-- Success State -->
            <app-input
              label="Success State"
              placeholder="Valid input"
              [formControl]="successControl"
              successMessage="Looking good!"
            />
          </div>
          
          <!-- Input Sizes -->
          <div class="mt-6 space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Sizes</h3>
            <div class="flex gap-4 items-end">
              <app-input size="sm" placeholder="Small" />
              <app-input size="md" placeholder="Medium" />
              <app-input size="lg" placeholder="Large" />
            </div>
          </div>
        </section>
        
        <!-- Select Component -->
        <section class="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Select Component</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Basic Select -->
            <app-select
              label="Country"
              placeholder="Choose a country"
              [options]="countryOptions"
              [formControl]="selectControl"
              helperText="Select your country"
            />
            
            <!-- Grouped Select -->
            <app-select
              label="City"
              placeholder="Select a city"
              [options]="cityOptions"
              [formControl]="cityControl"
            />
            
            <!-- Required Select -->
            <app-select
              label="Department"
              [options]="departmentOptions"
              [formControl]="departmentControl"
              [required]="true"
              errorMessage="Please select a department"
            />
            
            <!-- Disabled Select -->
            <app-select
              label="Disabled Select"
              [options]="countryOptions"
              [formControl]="disabledSelectControl"
            />
          </div>
        </section>
        
        <!-- Checkbox Component -->
        <section class="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Checkbox Component</h2>
          
          <div class="space-y-4">
            <!-- Basic Checkbox -->
            <app-checkbox
              label="I agree to the terms and conditions"
              [formControl]="checkboxControl"
            />
            
            <!-- Required Checkbox -->
            <app-checkbox
              label="I accept the privacy policy"
              [required]="true"
              [formControl]="requiredCheckboxControl"
              [showHelperText]="true"
              errorMessage="You must accept the privacy policy"
            />
            
            <!-- Indeterminate -->
            <app-checkbox
              label="Select all items"
              [indeterminate]="true"
            />
            
            <!-- Disabled -->
            <app-checkbox
              label="Disabled checkbox"
              [formControl]="disabledCheckboxControl"
            />
            
            <!-- Sizes -->
            <div class="flex gap-6 items-center">
              <app-checkbox size="sm" label="Small" />
              <app-checkbox size="md" label="Medium" />
              <app-checkbox size="lg" label="Large" />
            </div>
          </div>
        </section>
        
        <!-- Radio Component -->
        <section class="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Radio Group Component</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Vertical Radio Group -->
            <app-radio-group
              label="Subscription Plan"
              [options]="subscriptionOptions"
              [formControl]="radioControl"
              helperText="Choose your subscription plan"
            />
            
            <!-- Horizontal Radio Group -->
            <app-radio-group
              label="Preferred Contact"
              [options]="contactOptions"
              [formControl]="contactControl"
              orientation="horizontal"
            />
          </div>
        </section>
        
        <!-- Toggle Component -->
        <section class="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Toggle Component</h2>
          
          <div class="space-y-6">
            <!-- Basic Toggles -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <app-toggle
                label="Email notifications"
                [formControl]="toggleControl"
              />
              
              <app-toggle
                label="Dark mode"
                labelPosition="left"
                [formControl]="darkModeControl"
              />
            </div>
            
            <!-- With Helper Text -->
            <app-toggle
              label="Marketing emails"
              [showHelperText]="true"
              helperText="Receive updates about new features and promotions"
              [formControl]="marketingControl"
            />
            
            <!-- Sizes -->
            <div class="flex gap-6 items-center">
              <app-toggle size="sm" label="Small" />
              <app-toggle size="md" label="Medium" />
              <app-toggle size="lg" label="Large" />
            </div>
            
            <!-- Disabled -->
            <app-toggle
              label="Disabled toggle"
              [formControl]="disabledToggleControl"
            />
          </div>
        </section>
        
        <!-- Button Component -->
        <section class="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Button Component (Beta)</h2>
          
          <!-- Variants -->
          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Variants</h3>
              <div class="flex flex-wrap gap-3">
                <app-button variant="primary">Primary</app-button>
                <app-button variant="secondary">Secondary</app-button>
                <app-button variant="outline-primary">Outline Primary</app-button>
                <app-button variant="tertiary">Tertiary</app-button>
                <app-button variant="ghost">Ghost</app-button>
                <app-button variant="danger">Danger</app-button>
              </div>
            </div>
            
            <!-- Sizes -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Sizes</h3>
              <div class="flex items-center gap-3">
                <app-button size="xs" variant="primary">XS</app-button>
                <app-button size="sm" variant="primary">Small</app-button>
                <app-button size="md" variant="primary">Medium</app-button>
                <app-button size="lg" variant="primary">Large</app-button>
                <app-button size="xl" variant="primary">XL</app-button>
              </div>
            </div>
            
            <!-- With Icons -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">With Icons</h3>
              <div class="flex flex-wrap gap-3">
                <app-button variant="primary" icon="save">Save</app-button>
                <app-button variant="secondary" icon="download">Download</app-button>
                <app-button variant="outline-primary" icon="edit" iconPosition="right">Edit</app-button>
                <app-button variant="danger" icon="trash">Delete</app-button>
              </div>
            </div>
            
            <!-- Icon Only -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Icon Only</h3>
              <div class="flex items-center gap-3">
                <app-button size="xs" variant="primary" icon="plus" [iconOnly]="true" ariaLabel="Add"></app-button>
                <app-button size="sm" variant="primary" icon="edit" [iconOnly]="true" ariaLabel="Edit"></app-button>
                <app-button size="md" variant="primary" icon="save" [iconOnly]="true" ariaLabel="Save"></app-button>
                <app-button size="lg" variant="primary" icon="download" [iconOnly]="true" ariaLabel="Download"></app-button>
                <app-button size="xl" variant="primary" icon="settings" [iconOnly]="true" ariaLabel="Settings"></app-button>
              </div>
            </div>
            
            <!-- States -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">States</h3>
              <div class="flex flex-wrap gap-3">
                <app-button variant="primary">Normal</app-button>
                <app-button variant="primary" [disabled]="true">Disabled</app-button>
                <app-button variant="primary" [loading]="true">Loading</app-button>
                <app-button variant="primary" [loading]="true" loadingText="Saving...">Loading with Text</app-button>
              </div>
            </div>
            
            <!-- Full Width -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Full Width</h3>
              <app-button variant="primary" [fullWidth]="true">Full Width Button</app-button>
            </div>
            
            <!-- With Ripple Effect -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">With Ripple Effect</h3>
              <div class="flex flex-wrap gap-3">
                <app-button variant="primary" [ripple]="true">Ripple Primary</app-button>
                <app-button variant="secondary" [ripple]="true">Ripple Secondary</app-button>
                <app-button variant="outline-primary" [ripple]="true">Ripple Outline</app-button>
              </div>
            </div>
            
            <!-- Different Spinner Types -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Loading with Different Spinners</h3>
              <div class="flex flex-wrap gap-3">
                <app-button variant="primary" [loading]="true" spinnerType="circle">Circle</app-button>
                <app-button variant="secondary" [loading]="true" spinnerType="dots">Dots</app-button>
                <app-button variant="tertiary" [loading]="true" spinnerType="bars">Bars</app-button>
              </div>
            </div>
            
            <!-- Interactive Demo -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Interactive Demo</h3>
              <div class="space-y-3">
                <app-button 
                  variant="primary" 
                  [loading]="isButtonLoading"
                  [disabled]="isButtonDisabled"
                  loadingText="Processing..."
                  (clicked)="handleButtonClick()"
                >
                  Click Me
                </app-button>
                
                <div class="flex gap-3">
                  <label class="flex items-center">
                    <input 
                      type="checkbox" 
                      [(ngModel)]="isButtonLoading"
                      class="mr-2"
                    >
                    Loading
                  </label>
                  <label class="flex items-center">
                    <input 
                      type="checkbox" 
                      [(ngModel)]="isButtonDisabled"
                      class="mr-2"
                    >
                    Disabled
                  </label>
                </div>
                
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Clicks: {{ clickCount }}
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <!-- Button Group Component -->
        <section class="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Button Group Component (Beta)</h2>
          
          <div class="space-y-6">
            <!-- Horizontal Button Groups -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Horizontal Groups</h3>
              <div class="space-y-4">
                <!-- Primary Group -->
                <app-button-group>
                  <app-button variant="primary" size="sm">Left</app-button>
                  <app-button variant="primary" size="sm">Center</app-button>
                  <app-button variant="primary" size="sm">Right</app-button>
                </app-button-group>
                
                <!-- Secondary Group -->
                <app-button-group>
                  <app-button variant="secondary">First</app-button>
                  <app-button variant="secondary">Second</app-button>
                  <app-button variant="secondary">Third</app-button>
                  <app-button variant="secondary">Fourth</app-button>
                </app-button-group>
                
                <!-- Outline Group -->
                <app-button-group>
                  <app-button variant="outline-primary" icon="list" [iconOnly]="true" ariaLabel="List view"></app-button>
                  <app-button variant="outline-primary" icon="grid" [iconOnly]="true" ariaLabel="Grid view"></app-button>
                  <app-button variant="outline-primary" icon="calendar" [iconOnly]="true" ariaLabel="Calendar view"></app-button>
                </app-button-group>
              </div>
            </div>
            
            <!-- Vertical Button Groups -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Vertical Groups</h3>
              <app-button-group orientation="vertical">
                <app-button variant="tertiary" icon="home" iconPosition="left">Home</app-button>
                <app-button variant="tertiary" icon="users" iconPosition="left">Users</app-button>
                <app-button variant="tertiary" icon="settings" iconPosition="left">Settings</app-button>
                <app-button variant="tertiary" icon="logout" iconPosition="left">Logout</app-button>
              </app-button-group>
            </div>
            
            <!-- Mixed Sizes (Not Recommended) -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Different Variants in Group</h3>
              <app-button-group>
                <app-button variant="primary">Save</app-button>
                <app-button variant="outline-primary">Save As</app-button>
                <app-button variant="danger" icon="trash" [iconOnly]="true" ariaLabel="Delete"></app-button>
              </app-button-group>
            </div>
          </div>
        </section>
        
        <!-- Badge Component -->
        <section class="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Badge Component</h2>
          
          <!-- Variants -->
          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Filled Variants</h3>
              <div class="flex flex-wrap gap-3">
                <app-badge color="gray">Gray</app-badge>
                <app-badge color="primary">Primary</app-badge>
                <app-badge color="success">Success</app-badge>
                <app-badge color="error">Error</app-badge>
                <app-badge color="warning">Warning</app-badge>
                <app-badge color="info">Info</app-badge>
              </div>
            </div>
            
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Outline Variants</h3>
              <div class="flex flex-wrap gap-3">
                <app-badge variant="outline" color="gray">Gray</app-badge>
                <app-badge variant="outline" color="primary">Primary</app-badge>
                <app-badge variant="outline" color="success">Success</app-badge>
                <app-badge variant="outline" color="error">Error</app-badge>
                <app-badge variant="outline" color="warning">Warning</app-badge>
                <app-badge variant="outline" color="info">Info</app-badge>
              </div>
            </div>
            
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Subtle Variants</h3>
              <div class="flex flex-wrap gap-3">
                <app-badge variant="subtle" color="gray">Gray</app-badge>
                <app-badge variant="subtle" color="primary">Primary</app-badge>
                <app-badge variant="subtle" color="success">Success</app-badge>
                <app-badge variant="subtle" color="error">Error</app-badge>
                <app-badge variant="subtle" color="warning">Warning</app-badge>
                <app-badge variant="subtle" color="info">Info</app-badge>
              </div>
            </div>
            
            <!-- Sizes -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Sizes</h3>
              <div class="flex items-center gap-3">
                <app-badge size="xs" color="primary">XS</app-badge>
                <app-badge size="sm" color="primary">Small</app-badge>
                <app-badge size="md" color="primary">Medium</app-badge>
                <app-badge size="lg" color="primary">Large</app-badge>
              </div>
            </div>
            
            <!-- Shapes -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Shapes</h3>
              <div class="flex gap-3">
                <app-badge shape="square" color="primary">Square</app-badge>
                <app-badge shape="rounded" color="primary">Rounded</app-badge>
                <app-badge shape="pill" color="primary">Pill</app-badge>
              </div>
            </div>
            
            <!-- With Icons -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">With Icons</h3>
              <div class="flex flex-wrap gap-3">
                <app-badge color="success" leadingIcon="fa fa-check">Active</app-badge>
                <app-badge color="error" trailingIcon="fa fa-exclamation-triangle">Urgent</app-badge>
              </div>
            </div>
            
            <!-- Removable -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Removable</h3>
              <div class="flex flex-wrap gap-3">
                <app-badge 
                  *ngFor="let tag of tags" 
                  [removable]="true"
                  (remove)="removeTag(tag)"
                  color="primary"
                >
                  {{ tag }}
                </app-badge>
              </div>
            </div>
          </div>
        </section>
        
        <!-- Avatar Component -->
        <section class="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Avatar Component</h2>
          
          <div class="space-y-6">
            <!-- Sizes -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Sizes</h3>
              <div class="flex items-center gap-4">
                <app-avatar size="xs" name="John Doe" />
                <app-avatar size="sm" name="John Doe" />
                <app-avatar size="md" name="John Doe" />
                <app-avatar size="lg" name="John Doe" />
                <app-avatar size="xl" name="John Doe" />
              </div>
            </div>
            
            <!-- With Images -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">With Images</h3>
              <div class="flex items-center gap-4">
                <app-avatar 
                  size="md" 
                  src="https://i.pravatar.cc/150?img=1"
                  alt="User 1"
                />
                <app-avatar 
                  size="md" 
                  src="https://i.pravatar.cc/150?img=2"
                  alt="User 2"
                />
                <app-avatar 
                  size="md" 
                  src="https://i.pravatar.cc/150?img=3"
                  alt="User 3"
                />
              </div>
            </div>
            
            <!-- Shapes -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Shapes</h3>
              <div class="flex items-center gap-4">
                <app-avatar shape="circle" name="Circle Shape" />
                <app-avatar shape="square" name="Square Shape" />
              </div>
            </div>
            
            <!-- With Status -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">With Status</h3>
              <div class="flex items-center gap-4">
                <app-avatar name="Online" status="online" />
                <app-avatar name="Away" status="away" />
                <app-avatar name="Busy" status="busy" />
                <app-avatar name="Offline" status="offline" />
              </div>
            </div>
            
            <!-- Custom Colors -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Custom Colors</h3>
              <div class="flex items-center gap-4">
                <app-avatar name="Purple" bgColor="bg-purple-500" />
                <app-avatar name="Green" bgColor="bg-green-500" />
                <app-avatar name="Blue" bgColor="bg-blue-500" />
                <app-avatar name="Red" bgColor="bg-red-500" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowcaseComponent {
  // Form Controls
  inputControl = new FormControl('');
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  searchControl = new FormControl('');
  successControl = new FormControl('Valid input');
  disabledInputControl = new FormControl({ value: 'Disabled value', disabled: true });
  
  selectControl = new FormControl('');
  cityControl = new FormControl('');
  departmentControl = new FormControl('', Validators.required);
  disabledSelectControl = new FormControl({ value: 'de', disabled: true });
  
  checkboxControl = new FormControl(false);
  requiredCheckboxControl = new FormControl(false, Validators.requiredTrue);
  disabledCheckboxControl = new FormControl({ value: true, disabled: true });
  
  radioControl = new FormControl('');
  contactControl = new FormControl('email');
  
  toggleControl = new FormControl(true);
  darkModeControl = new FormControl(false);
  marketingControl = new FormControl(false);
  disabledToggleControl = new FormControl({ value: true, disabled: true });
  
  // Data
  isSearching = false;
  isDarkMode = false;
  tags = ['Angular', 'TypeScript', 'Tailwind', 'RxJS'];
  
  // Button Demo
  isButtonLoading = false;
  isButtonDisabled = false;
  clickCount = 0;
  
  countryOptions = [
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' }
  ];
  
  cityOptions = [
    { value: 'berlin', label: 'Berlin', group: 'Germany' },
    { value: 'munich', label: 'Munich', group: 'Germany' },
    { value: 'paris', label: 'Paris', group: 'France' },
    { value: 'lyon', label: 'Lyon', group: 'France' },
    { value: 'nyc', label: 'New York', group: 'USA' },
    { value: 'la', label: 'Los Angeles', group: 'USA' }
  ];
  
  departmentOptions = [
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'hr', label: 'Human Resources' }
  ];
  
  subscriptionOptions = [
    { value: 'free', label: 'Free', helperText: 'Basic features' },
    { value: 'pro', label: 'Pro', helperText: '$9.99/month' },
    { value: 'enterprise', label: 'Enterprise', helperText: 'Contact sales', disabled: true }
  ];
  
  contactOptions = [
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
    { value: 'sms', label: 'SMS' }
  ];
  
  constructor() {
    // Initialize success control as valid
    this.successControl.markAsTouched();
  }
  
  removeTag(tag: string): void {
    this.tags = this.tags.filter(t => t !== tag);
  }
  
  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    // Toggle dark class on document element for global dark mode
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
  
  handleButtonClick(): void {
    if (!this.isButtonLoading && !this.isButtonDisabled) {
      this.clickCount++;
    }
  }
}