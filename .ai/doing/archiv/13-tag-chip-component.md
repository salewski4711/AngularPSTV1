# Task 13: Tag/Chip Component [WITH EXTRACTION]

## Status: 🟡 Ready for Development
**Can be done in parallel with:** Tasks 10-12, 14-16
**Estimated Time:** 2.5 hours
**Source:** `C:\Code\CRM_Chatgpt_WEB\component-validation\badges\`

## Extraction Available ✅
- **HTML:** `02-tailwind-demo.html` (Complete badge system)
- **Can be used as:** Tag/Chip component base

## Key Extractions

### 1. Size Variants
- XS: `h-5 px-1.5 py-0.5 text-xs`
- SM: `h-6 px-2 py-1 text-xs`
- MD: `h-7 px-2.5 py-1 text-sm`
- LG: `h-8 px-3 py-1.5 text-base`

### 2. Style Variants
- **Filled:** Background with text color
- **Outline:** Border with transparent bg
- **Subtle:** 10% opacity background

### 3. Features from HTML
- Removable badges (with X button)
- With icons (leading/trailing)
- Dot indicators (static/animated)
- Count badges
- Pill shape (rounded-full)

### 4. Colors
- Gray, Primary (#F99600), Success, Error, Warning, Info

## Implementation
1. Create Tag component based on badge HTML
2. Add TypeScript interfaces for variants
3. Implement remove functionality
4. Add icon support
5. Include all extracted examples

## Deliverables
- [ ] Tag component with all size/color variants
- [ ] Removable functionality
- [ ] Icon integration
- [ ] Shape variants (rounded/pill)
- [ ] Dark mode support
