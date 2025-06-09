import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShowcaseTemplateComponent } from '../../../shared/showcase-template.component';
import { ModalComponent } from '../../../../../shared/components/modal';
import { ButtonComponent } from '../../../../../shared/components/button';
import { InputComponent } from '../../../../../shared/components/input/input.component';

@Component({
  selector: 'pst-modal-showcase',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ShowcaseTemplateComponent,
    ModalComponent,
    ButtonComponent,
    InputComponent
  ],
  template: `
    <pst-showcase-template
      title="Modal"
      description="A flexible modal/dialog component with customizable size, backdrop behavior, and keyboard support."
      [sections]="getSections()"
      [props]="getProps()"
    >
      <!-- Basic Modal Example -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Basic Modal</h3>
        <pst-button (click)="basicModalOpen.set(true)">
          Open Basic Modal
        </pst-button>
        
        <pst-modal
          [isOpen]="basicModalOpen()"
          [title]="'Basic Modal'"
          (close)="basicModalOpen.set(false)"
        >
          <div modal-body>
            <p class="text-gray-600 dark:text-gray-300">
              This is a basic modal with default settings. Click the close button, 
              backdrop, or press ESC to close.
            </p>
          </div>
        </pst-modal>
      </div>

      <!-- Size Variations -->
      <div class="space-y-4 mt-8">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Size Variations</h3>
        <div class="flex flex-wrap gap-2">
          <pst-button (click)="openSizeModal('sm')">Small Modal</pst-button>
          <pst-button (click)="openSizeModal('md')">Medium Modal</pst-button>
          <pst-button (click)="openSizeModal('lg')">Large Modal</pst-button>
          <pst-button (click)="openSizeModal('xl')">Extra Large Modal</pst-button>
        </div>
        
        <pst-modal
          [isOpen]="sizeModalOpen()"
          [title]="'Modal Size: ' + currentSize()"
          [size]="currentSize()"
          (close)="sizeModalOpen.set(false)"
        >
          <div modal-body>
            <p class="text-gray-600 dark:text-gray-300">
              This modal is using the <strong>{{ currentSize() }}</strong> size.
            </p>
            <p class="text-gray-600 dark:text-gray-300 mt-2">
              Available sizes: sm (400px), md (600px), lg (800px), xl (1024px)
            </p>
          </div>
        </pst-modal>
      </div>

      <!-- Modal with Footer -->
      <div class="space-y-4 mt-8">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Modal with Footer</h3>
        <pst-button (click)="footerModalOpen.set(true)">
          Open Modal with Footer
        </pst-button>
        
        <pst-modal
          [isOpen]="footerModalOpen()"
          [title]="'Confirm Action'"
          [size]="'md'"
          (close)="footerModalOpen.set(false)"
        >
          <div modal-body>
            <p class="text-gray-600 dark:text-gray-300">
              Are you sure you want to proceed? This action cannot be undone.
            </p>
          </div>
          
          <div modal-footer class="px-6 py-4 border-t dark:border-gray-700 flex justify-end gap-3">
            <pst-button 
              variant="ghost" 
              (click)="footerModalOpen.set(false)"
            >
              Cancel
            </pst-button>
            <pst-button 
              variant="danger"
              (click)="handleConfirm()"
            >
              Confirm
            </pst-button>
          </div>
        </pst-modal>
      </div>

      <!-- Custom Settings Modal -->
      <div class="space-y-4 mt-8">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Custom Settings</h3>
        <pst-button (click)="customModalOpen.set(true)">
          Open Custom Modal
        </pst-button>
        
        <pst-modal
          [isOpen]="customModalOpen()"
          [title]="'Custom Settings Modal'"
          [size]="'lg'"
          [closeOnBackdrop]="false"
          [closeOnEsc]="false"
          [showCloseButton]="false"
          (close)="customModalOpen.set(false)"
        >
          <div modal-body>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              This modal has custom settings:
            </p>
            <ul class="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>Cannot be closed by clicking backdrop</li>
              <li>Cannot be closed by pressing ESC</li>
              <li>No close button in header</li>
              <li>Must use the button below to close</li>
            </ul>
          </div>
          
          <div modal-footer class="px-6 py-4 border-t dark:border-gray-700 flex justify-center">
            <pst-button 
              variant="primary"
              (click)="customModalOpen.set(false)"
            >
              Close Modal
            </pst-button>
          </div>
        </pst-modal>
      </div>

      <!-- Form Modal Example -->
      <div class="space-y-4 mt-8">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Form Modal</h3>
        <pst-button (click)="formModalOpen.set(true)">
          Open Form Modal
        </pst-button>
        
        <pst-modal
          [isOpen]="formModalOpen()"
          [title]="'Edit Profile'"
          [size]="'lg'"
          (close)="formModalOpen.set(false)"
        >
          <div modal-body>
            <form class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <pst-input 
                  [(ngModel)]="formData.name" 
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <pst-input 
                  [(ngModel)]="formData.email" 
                  type="email"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Bio
                </label>
                <textarea 
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  rows="3"
                  placeholder="Tell us about yourself"
                ></textarea>
              </div>
            </form>
          </div>
          
          <div modal-footer class="px-6 py-4 border-t dark:border-gray-700 flex justify-end gap-3">
            <pst-button 
              variant="ghost" 
              (click)="formModalOpen.set(false)"
            >
              Cancel
            </pst-button>
            <pst-button 
              variant="primary"
              (click)="handleSaveForm()"
            >
              Save Changes
            </pst-button>
          </div>
        </pst-modal>
      </div>
    </pst-showcase-template>
  `
})
export class ModalShowcaseComponent {
  // Modal states
  basicModalOpen = signal(false);
  sizeModalOpen = signal(false);
  footerModalOpen = signal(false);
  customModalOpen = signal(false);
  formModalOpen = signal(false);
  
  currentSize = signal<'sm' | 'md' | 'lg' | 'xl'>('md');
  
  formData = {
    name: '',
    email: '',
    bio: ''
  };

  openSizeModal(size: 'sm' | 'md' | 'lg' | 'xl'): void {
    this.currentSize.set(size);
    this.sizeModalOpen.set(true);
  }

  handleConfirm(): void {
    console.log('Action confirmed');
    this.footerModalOpen.set(false);
  }

  handleSaveForm(): void {
    console.log('Form data:', this.formData);
    this.formModalOpen.set(false);
  }

  getSections() {
    return [
      {
        title: 'Basic Usage',
        code: `<pst-modal
  [isOpen]="isModalOpen()"
  [title]="'Modal Title'"
  (close)="isModalOpen.set(false)"
>
  <div modal-body>
    <p>Modal content goes here</p>
  </div>
</pst-modal>`,
        description: 'A simple modal with default settings. Click the close button, backdrop, or press ESC to close.'
      },
      {
        title: 'Modal with Footer',
        code: `<pst-modal
  [isOpen]="isOpen()"
  [title]="'Confirm Action'"
  (close)="isOpen.set(false)"
>
  <div modal-body>
    <p>Are you sure you want to proceed?</p>
  </div>
  
  <div modal-footer class="px-6 py-4 border-t dark:border-gray-700 flex justify-end gap-3">
    <pst-button variant="ghost" (click)="isOpen.set(false)">
      Cancel
    </pst-button>
    <pst-button variant="primary" (click)="handleConfirm()">
      Confirm
    </pst-button>
  </div>
</pst-modal>`,
        description: 'Modal with custom footer containing action buttons.'
      },
      {
        title: 'Custom Settings',
        code: `<pst-modal
  [isOpen]="isOpen()"
  [title]="'Custom Modal'"
  [size]="'xl'"
  [closeOnBackdrop]="false"
  [closeOnEsc]="false"
  [showCloseButton]="false"
  (close)="isOpen.set(false)"
>
  <div modal-body>
    <p>This modal can only be closed programmatically</p>
  </div>
</pst-modal>`,
        description: 'Modal with custom settings: no backdrop close, no ESC key close, and no close button.'
      }
    ];
  }

  getProps() {
    return [
      {
        name: 'isOpen',
        type: 'boolean',
        default: 'false',
        description: 'Controls modal visibility'
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'Modal size'
      },
      {
        name: 'title',
        type: 'string',
        default: "'Modal'",
        description: 'Modal header title'
      },
      {
        name: 'closeOnBackdrop',
        type: 'boolean',
        default: 'true',
        description: 'Close modal when clicking backdrop'
      },
      {
        name: 'closeOnEsc',
        type: 'boolean',
        default: 'true',
        description: 'Close modal when pressing ESC key'
      },
      {
        name: 'showCloseButton',
        type: 'boolean',
        default: 'true',
        description: 'Show close button in header'
      },
      {
        name: 'close',
        type: 'EventEmitter<void>',
        default: '-',
        description: 'Emitted when modal should close'
      }
    ];
  }
}