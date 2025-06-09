# Modal Component

A flexible modal/dialog component with customizable size, backdrop behavior, and keyboard support.

## Features

- Multiple sizes (sm, md, lg, xl)
- Customizable header, body, and footer sections
- Backdrop click to close (configurable)
- ESC key support (configurable)
- Smooth fade-in/out animations
- Focus trap functionality
- Fully accessible with ARIA attributes
- Dark mode support

## Usage

```typescript
import { ModalComponent } from '@shared/components/modal';

@Component({
  selector: 'pst-example',
  standalone: true,
  imports: [ModalComponent, ButtonComponent],
  template: `
    <pst-button (click)="isModalOpen.set(true)">
      Open Modal
    </pst-button>

    <pst-modal
      [isOpen]="isModalOpen()"
      [title]="'Example Modal'"
      [size]="'md'"
      (close)="isModalOpen.set(false)"
    >
      <div modal-body>
        <p>This is the modal body content.</p>
      </div>
      
      <div modal-footer class="px-6 py-4 border-t dark:border-gray-700 flex justify-end gap-3">
        <pst-button variant="ghost" (click)="isModalOpen.set(false)">
          Cancel
        </pst-button>
        <pst-button variant="primary" (click)="handleSave()">
          Save
        </pst-button>
      </div>
    </pst-modal>
  `
})
export class ExampleComponent {
  isModalOpen = signal(false);
  
  handleSave(): void {
    // Handle save logic
    this.isModalOpen.set(false);
  }
}
```

## API

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `isOpen` | `boolean` | `false` | Controls modal visibility |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Modal size |
| `title` | `string` | `'Modal'` | Modal header title |
| `closeOnBackdrop` | `boolean` | `true` | Close modal when clicking backdrop |
| `closeOnEsc` | `boolean` | `true` | Close modal when pressing ESC key |
| `showCloseButton` | `boolean` | `true` | Show close button in header |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `close` | `EventEmitter<void>` | Emitted when modal should close |

### Content Projection

The modal uses Angular's content projection with named slots:

- `modal-body`: Required. The main content of the modal
- `modal-footer`: Optional. Footer content (typically action buttons)

## Size Classes

- **sm**: 400px max width
- **md**: 600px max width (default)
- **lg**: 800px max width
- **xl**: 1024px max width

## Examples

### Basic Modal

```html
<pst-modal
  [isOpen]="isOpen()"
  [title]="'Basic Modal'"
  (close)="isOpen.set(false)"
>
  <div modal-body>
    <p>Simple modal content</p>
  </div>
</pst-modal>
```

### Modal with Custom Settings

```html
<pst-modal
  [isOpen]="isOpen()"
  [title]="'Custom Settings'"
  [size]="'xl'"
  [closeOnBackdrop]="false"
  [closeOnEsc]="false"
  [showCloseButton]="false"
  (close)="isOpen.set(false)"
>
  <div modal-body>
    <p>This modal can only be closed programmatically</p>
  </div>
  
  <div modal-footer class="px-6 py-4 border-t dark:border-gray-700">
    <pst-button (click)="isOpen.set(false)">
      Close
    </pst-button>
  </div>
</pst-modal>
```

### Form Modal

```html
<pst-modal
  [isOpen]="isFormOpen()"
  [title]="'Edit User'"
  [size]="'lg'"
  (close)="handleClose()"
>
  <div modal-body>
    <form [formGroup]="userForm">
      <!-- Form fields here -->
    </form>
  </div>
  
  <div modal-footer class="px-6 py-4 border-t dark:border-gray-700 flex justify-end gap-3">
    <pst-button variant="ghost" (click)="handleClose()">
      Cancel
    </pst-button>
    <pst-button 
      variant="primary" 
      [disabled]="!userForm.valid"
      (click)="handleSubmit()"
    >
      Save Changes
    </pst-button>
  </div>
</pst-modal>
```

## Accessibility

The modal component is fully accessible:

- Proper ARIA attributes (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`)
- Focus trap to keep keyboard navigation within modal
- Focus restoration when modal closes
- ESC key support for closing
- Proper heading hierarchy

## Styling

The modal uses Tailwind CSS classes and supports dark mode out of the box:

- **Backdrop**: Semi-transparent black overlay
- **Modal**: White background in light mode, gray-800 in dark mode
- **Header**: Border bottom with title and optional close button
- **Body**: Padded content area
- **Footer**: Optional section with border top for action buttons

## Best Practices

1. Always provide a meaningful title for accessibility
2. Use appropriate modal sizes based on content
3. Include a clear way to close the modal (close button or cancel action)
4. Keep modal content focused and concise
5. Use footer for action buttons following a consistent pattern (secondary action left, primary action right)
6. Consider disabling backdrop/ESC close for critical actions that require confirmation