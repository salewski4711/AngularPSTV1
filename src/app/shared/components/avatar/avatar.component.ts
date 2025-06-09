import { Component, Input, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../utils/tailwind.utils';

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
  @Input() bgColor = 'bg-primary';
  @Input() textColor = 'text-white';
  
  imageError = false;
  
  private sizeConfig = {
    xs: { avatar: 'h-6 w-6', text: 'text-xs', status: 'h-1.5 w-1.5', statusPosition: '-bottom-0 -right-0' },
    sm: { avatar: 'h-8 w-8', text: 'text-sm', status: 'h-2 w-2', statusPosition: '-bottom-0 -right-0' },
    md: { avatar: 'h-10 w-10', text: 'text-base', status: 'h-2.5 w-2.5', statusPosition: '-bottom-0.5 -right-0.5' },
    lg: { avatar: 'h-12 w-12', text: 'text-lg', status: 'h-3 w-3', statusPosition: '-bottom-0.5 -right-0.5' },
    xl: { avatar: 'h-16 w-16', text: 'text-xl', status: 'h-3.5 w-3.5', statusPosition: '-bottom-1 -right-1' }
  };
  
  private statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    busy: 'bg-red-500',
    away: 'bg-amber-500'
  };
  
  avatarClasses = computed(() => {
    const base = 'inline-flex items-center justify-center font-medium';
    const sizeClass = this.sizeConfig[this.size].avatar;
    const shapeClass = this.shape === 'circle' ? 'rounded-full' : 'rounded-lg';
    const colorClasses = (!this.src || this.imageError) 
      ? cn(this.bgColor, this.textColor) 
      : '';
    
    return cn(base, sizeClass, shapeClass, colorClasses);
  });
  
  initialsClasses = computed(() => {
    return this.sizeConfig[this.size].text;
  });
  
  statusClasses = computed(() => {
    if (!this.status) {return '';}
    
    const config = this.sizeConfig[this.size];
    const base = 'absolute block rounded-full ring-2 ring-white dark:ring-gray-800';
    const colorClass = this.statusColors[this.status];
    
    return cn(base, config.status, config.statusPosition, colorClass);
  });
  
  displayInitials(): string {
    if (!this.name) {return '?';}
    
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