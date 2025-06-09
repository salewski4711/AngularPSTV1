#!/bin/bash
# Atom Components Migration Setup Script

echo "🚀 Setting up Atom Components Migration..."

# Base paths
COMPONENT_PATH="src/app/shared/components"

# Create component directories
echo "📁 Creating component directories..."
mkdir -p "$COMPONENT_PATH/input"
mkdir -p "$COMPONENT_PATH/select"
mkdir -p "$COMPONENT_PATH/checkbox"
mkdir -p "$COMPONENT_PATH/radio"
mkdir -p "$COMPONENT_PATH/toggle"
mkdir -p "$COMPONENT_PATH/badge"
mkdir -p "$COMPONENT_PATH/avatar"

# Create shared types directory
mkdir -p "$COMPONENT_PATH/shared/types"

echo "✅ Directory structure created"

# Create base files
echo "📝 Creating base files..."

# Create shared form control base
cat > "$COMPONENT_PATH/shared/types/form-control.base.ts" << 'EOF'
import { Directive, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Directive()
export abstract class FormControlBase implements ControlValueAccessor {
  @Input() disabled = false;
  @Input() required = false;
  @Input() label?: string;
  @Input() error?: string;
  
  protected onChange: (value: any) => void = () => {};
  protected onTouched: () => void = () => {};
  
  writeValue(value: any): void {
    // Implement in derived class
  }
  
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
EOF

echo "✅ Base files created"
echo "🎉 Migration setup complete!"
echo ""
echo "Next steps:"
echo "1. Review tasks in .ai/migration/"
echo "2. Start with 01-input-component-migration.md"
echo "3. Update progress-tracker.md as you work"
