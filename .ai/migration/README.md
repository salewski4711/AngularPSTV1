# Atom Components Migration Project

## Overview
This directory contains all migration tasks for implementing Atom components from the CRM_Chatgpt_WEB project into the Angular application.

## Structure
```
.ai/migration/
├── 00-migration-overview.md     # Project overview and timeline
├── 01-input-component-migration.md
├── 02-select-component-migration.md
├── 03-checkbox-component-migration.md
├── 04-radio-component-migration.md
├── 05-toggle-component-migration.md
├── 06-badge-component-migration.md
├── 07-avatar-component-migration.md
├── progress-tracker.md          # Daily progress tracking
└── README.md                    # This file
```

## Quick Start
1. Read `00-migration-overview.md` for the big picture
2. Pick a task based on priority
3. Follow the task checklist
4. Update `progress-tracker.md` daily

## Guidelines
- Each component must use Tailwind CSS only
- Follow Angular 17+ best practices
- Implement ControlValueAccessor for form components
- Ensure dark mode support from the start
- Write tests alongside implementation

## Resources
- Source: `C:\Code\CRM_Chatgpt_WEB\component-validation\` (nur 02-tailwind-demo.html verwenden!)
- Target: `C:\Code\AngularV1\src\app\shared\components\`
- Design System: ProSolarTec (Orange: #F99600, Blue: #1C3661)

## Questions?
Contact the tech lead or check the main project documentation.
