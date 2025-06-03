# Input Component

A flexible and accessible input component with support for various types, states, and icons.

## Usage

```typescript
import { InputComponent } from '@shared/components/input/input.component';

@Component({
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule],
  template: `
    <app-input
      label="Email Address"
      type="email"
      placeholder="name@example.com"
      [formControl]="emailControl"
      helperText="We'll never share your email"
      errorMessage="Please enter a valid email"
      leadingIcon="fa fa-envelope"
      [required]="true"
    />
  `
})
export class MyComponent {
  emailControl = new FormControl('', [Validators.required, Validators.email]);
}
```

## API

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | `InputType` | `'text'` | Input type: text, email, password, number, tel, url, search |
| `size` | `InputSize` | `'md'` | Size variant: sm, md, lg |
| `label` | `string` | - | Field label |
| `placeholder` | `string` | - | Placeholder text |
| `helperText` | `string` | - | Helper text shown below input |
| `errorMessage` | `string` | - | Error message (shown when invalid) |
| `successMessage` | `string` | - | Success message (shown when valid) |
| `required` | `boolean` | `false` | Whether field is required |
| `disabled` | `boolean` | `false` | Disable the input |
| `readonly` | `boolean` | `false` | Make input read-only |
| `leadingIcon` | `string` | - | Icon class for leading icon |
| `trailingIcon` | `string` | - | Icon class for trailing icon |
| `trailingClickable` | `boolean` | `false` | Make trailing icon clickable |
| `loading` | `boolean` | `false` | Show loading spinner |
| `showStatusIcon` | `boolean` | `true` | Show status icons (error/success) |

## Examples

### Basic Input
```html
<app-input
  label="Name"
  placeholder="Enter your name"
  [formControl]="nameControl"
/>
```

### With Icons
```html
<app-input
  label="Search"
  type="search"
  placeholder="Search..."
  leadingIcon="fa fa-search"
  trailingIcon="fa fa-times"
  [trailingClickable]="true"
/>
```

### Password Input
```html
<app-input
  label="Password"
  type="password"
  placeholder="Enter password"
  helperText="Must be at least 8 characters"
  [formControl]="passwordControl"
/>
```

### Loading State
```html
<app-input
  label="Username"
  placeholder="Checking availability..."
  [loading]="true"
  [formControl]="usernameControl"
/>
```

## Accessibility

- Proper label association with `for` attribute
- ARIA attributes for screen readers
- Keyboard navigation support
- Focus management
- Error announcements

## Styling

The component uses Tailwind CSS classes and respects the ProSolarTec color scheme:
- Primary color (Orange): `#F99600`
- Focus rings and borders use the primary color
- Dark mode support included