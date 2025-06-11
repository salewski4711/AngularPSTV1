import { Component, Input, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { avatarClasses as avatarClassDefs } from '../../../core/design-system/component-classes';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'square';
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';

@Component({
  selector: 'pst-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative inline-block">
      <!-- Image Avatar -->
      <img
        *ngIf="src && !imageError"
        [src]="src"
        [alt]="alt || name || 'Avatar'"
        [class]="avatarClasses()"
        (error)="handleImageError()"
      />
      
      <!-- Initials Avatar -->
      <div
        *ngIf="!src || imageError"
        [class]="avatarClasses()"
      >
        <span [class]="initialsClasses()">
          {{ displayInitials() }}
        </span>
      </div>
      
      <!-- Status Indicator -->
      <span
        *ngIf="status"
        [class]="statusClasses()"
        [attr.aria-label]="status + ' status'"
      ></span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent {
  @Input() src?: string;
  @Input() alt?: string;
  @Input() name?: string;
  @Input() size: AvatarSize = 'md';
  @Input() shape: AvatarShape = 'circle';
  @Input() status?: AvatarStatus;
  @Input() colorScheme: 'primary' | 'secondary' = 'primary';
  
  imageError = false;
  
  avatarClasses = computed(() => {
    const classes = [
      avatarClassDefs.base,
      avatarClassDefs.sizes[this.size],
      avatarClassDefs.shapes[this.shape]
    ];
    
    // Only add color classes if showing initials
    if (!this.src || this.imageError) {
      classes.push(avatarClassDefs.colors[this.colorScheme]);
    }
    
    return classes.join(' ');
  });
  
  initialsClasses = computed(() => {
    return avatarClassDefs.textSizes[this.size];
  });
  
  statusClasses = computed(() => {
    if (!this.status) return '';
    
    return [
      avatarClassDefs.status.base,
      avatarClassDefs.status.sizes[this.size],
      avatarClassDefs.status.positions[this.size],
      avatarClassDefs.status.colors[this.status]
    ].join(' ');
  });
  
  displayInitials(): string {
    if (!this.name) return '?';
    
    const parts = this.name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }
    
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  
  handleImageError(): void {
    this.imageError = true;
  }
}