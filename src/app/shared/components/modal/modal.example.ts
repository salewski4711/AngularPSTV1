import { Component, signal } from '@angular/core';
import { ModalComponent } from './modal.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'pst-modal-example',
  standalone: true,
  imports: [ModalComponent, ButtonComponent],
  template: `
    <!-- Trigger Button -->
    <pst-button (click)="isModalOpen.set(true)">
      Open Modal
    </pst-button>

    <!-- Basic Modal -->
    <pst-modal
      [isOpen]="isModalOpen()"
      [title]="'Basic Modal'"
      (close)="isModalOpen.set(false)"
    >
      <div modal-body>
        <p class="text-gray-600 dark:text-gray-300">
          This is a basic modal with default settings. Click the close button, 
          backdrop, or press ESC to close.
        </p>
      </div>
    </pst-modal>

    <!-- Modal with Footer -->
    <pst-modal
      [isOpen]="isFooterModalOpen()"
      [title]="'Modal with Footer'"
      [size]="'lg'"
      (close)="isFooterModalOpen.set(false)"
    >
      <div modal-body>
        <p class="text-gray-600 dark:text-gray-300 mb-4">
          This modal includes a footer section with action buttons.
        </p>
        <p class="text-gray-600 dark:text-gray-300">
          The footer uses the modal-footer attribute to be placed in the correct slot.
        </p>
      </div>
      
      <div modal-footer class="px-6 py-4 border-t dark:border-gray-700 flex justify-end gap-3">
        <pst-button 
          variant="ghost" 
          (click)="isFooterModalOpen.set(false)"
        >
          Cancel
        </pst-button>
        <pst-button 
          variant="primary"
          (click)="handleSave()"
        >
          Save Changes
        </pst-button>
      </div>
    </pst-modal>

    <!-- Modal with Custom Settings -->
    <pst-modal
      [isOpen]="isCustomModalOpen()"
      [title]="'Custom Settings Modal'"
      [size]="'xl'"
      [closeOnBackdrop]="false"
      [closeOnEsc]="false"
      [showCloseButton]="false"
      (close)="isCustomModalOpen.set(false)"
    >
      <div modal-body>
        <p class="text-gray-600 dark:text-gray-300 mb-4">
          This modal has custom settings:
        </p>
        <ul class="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
          <li>Extra large size (xl)</li>
          <li>Cannot be closed by clicking backdrop</li>
          <li>Cannot be closed by pressing ESC</li>
          <li>No close button in header</li>
        </ul>
      </div>
      
      <div modal-footer class="px-6 py-4 border-t dark:border-gray-700 flex justify-center">
        <pst-button 
          variant="primary"
          (click)="isCustomModalOpen.set(false)"
        >
          Close Modal
        </pst-button>
      </div>
    </pst-modal>
  `
})
export class ModalExampleComponent {
  isModalOpen = signal(false);
  isFooterModalOpen = signal(false);
  isCustomModalOpen = signal(false);

  handleSave(): void {
    console.log('Saving changes...');
    this.isFooterModalOpen.set(false);
  }
}