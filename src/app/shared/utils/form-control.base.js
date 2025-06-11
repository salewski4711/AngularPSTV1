var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Directive, Input, computed, signal } from '@angular/core';
import { NgControl } from '@angular/forms';
let FormControlBase = class FormControlBase {
    injector;
    ngControl = null;
    label;
    placeholder;
    helperText;
    errorMessage;
    successMessage;
    required = false;
    disabled = false;
    readonly = false;
    touched = signal(false);
    focused = signal(false);
    value = signal(null);
    onChange = () => { };
    onTouched = () => { };
    constructor(injector) {
        this.injector = injector;
        // Delay the injection to avoid circular dependency
        setTimeout(() => {
            try {
                this.ngControl = this.injector.get(NgControl, null, { self: true, optional: true });
                if (this.ngControl) {
                    this.ngControl.valueAccessor = this;
                }
            }
            catch (err) {
                // NgControl not found, which is fine for standalone usage
            }
        });
    }
    writeValue(value) {
        this.value.set(value);
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    handleFocus() {
        this.focused.set(true);
    }
    handleBlur() {
        this.focused.set(false);
        if (!this.touched()) {
            this.touched.set(true);
            this.onTouched();
        }
    }
    updateValue(value) {
        this.value.set(value);
        this.onChange(value);
    }
    hasError = computed(() => {
        if (!this.ngControl) {
            return false;
        }
        return this.touched() && this.ngControl.invalid;
    });
    hasSuccess = computed(() => {
        if (!this.ngControl) {
            return false;
        }
        return this.touched() && this.ngControl.valid && this.value() !== null && this.value() !== '';
    });
    fieldState = computed(() => ({
        touched: this.touched(),
        dirty: this.ngControl?.dirty ?? false,
        errors: this.ngControl?.errors ?? null
    }));
};
__decorate([
    Input()
], FormControlBase.prototype, "label", void 0);
__decorate([
    Input()
], FormControlBase.prototype, "placeholder", void 0);
__decorate([
    Input()
], FormControlBase.prototype, "helperText", void 0);
__decorate([
    Input()
], FormControlBase.prototype, "errorMessage", void 0);
__decorate([
    Input()
], FormControlBase.prototype, "successMessage", void 0);
__decorate([
    Input()
], FormControlBase.prototype, "required", void 0);
__decorate([
    Input()
], FormControlBase.prototype, "disabled", void 0);
__decorate([
    Input()
], FormControlBase.prototype, "readonly", void 0);
FormControlBase = __decorate([
    Directive()
], FormControlBase);
export { FormControlBase };
