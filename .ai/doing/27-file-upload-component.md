# Task 27: File Upload Component

## Status: 🟡 Ready for Development
**Can be done in parallel with:** Tasks 17-26
**Time:** 3 hours
**Dependencies:** None

## Objective
Create file upload component with drag & drop support.

## Component Features
- Drag & drop area
- Click to browse
- Multiple files
- File type validation
- Size limits
- Progress indication
- Preview (images)

## Files to Create
```
src/app/shared/components/file-upload/
├── file-upload.component.ts
├── file-upload.component.html
├── file-upload.service.ts
└── file-upload.component.spec.ts
```

## Showcase Location
```
pages/molecules/file-upload-showcase/
└── file-upload-showcase.component.ts
```

## Props
- accept?: string
- multiple?: boolean
- maxSize?: number
- maxFiles?: number
- showPreview?: boolean

## Acceptance Criteria
- [ ] Drag & drop working
- [ ] File validation
- [ ] Progress display
- [ ] Error handling
- [ ] Accessibility
