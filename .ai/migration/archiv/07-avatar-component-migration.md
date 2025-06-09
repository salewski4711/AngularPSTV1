# Task 07: Avatar Component Migration

## Status: 🔴 Not Started
**Priority: LOW**  
**Estimated Time: 2 hours**

## Objective
Create Avatar component for user representation with image, initials, or icon fallbacks.

## Implementation
- Path: `src/app/shared/components/avatar/`
- File: avatar.component.ts

## Features
- [ ] Types: image, initials, icon
- [ ] Sizes: xs, sm, md, lg, xl
- [ ] Status indicator (online/offline/away)
- [ ] Fallback chain: image → initials → icon
- [ ] Group avatars support

## Tailwind Classes
```typescript
Base: 'relative inline-block rounded-full overflow-hidden bg-gray-200'
Sizes: {
  xs: 'h-6 w-6',
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16'
}
Status: 'absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white'
```

## Example
```html
<pst-avatar
  [src]="user.photoUrl"
  [name]="user.name"
  size="md"
  [showStatus]="true"
  status="online"
/>
```

## Testing
- [ ] Image loading/error handling
- [ ] Initials generation
- [ ] Status indicator positioning
- [ ] Responsive sizing
