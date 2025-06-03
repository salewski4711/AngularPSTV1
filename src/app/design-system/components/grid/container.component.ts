import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="containerClasses">
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainerComponent {
  @Input() size: ContainerSize = 'xl';
  @Input() noPadding = false;
  @Input() centered = true;
  @Input() className = '';
  
  private sizeClasses: Record<ContainerSize, string> = {
    'sm': 'max-w-screen-sm',   // 640px
    'md': 'max-w-screen-md',   // 768px
    'lg': 'max-w-screen-lg',   // 1024px
    'xl': 'max-w-screen-xl',   // 1280px
    'full': 'max-w-full'       // 100%
  };
  
  get containerClasses(): string {
    const base = 'w-full';
    const size = this.sizeClasses[this.size];
    const center = this.centered ? 'mx-auto' : '';
    const padding = !this.noPadding ? 'px-4 sm:px-6 lg:px-8' : '';
    
    return `${base} ${size} ${center} ${padding} ${this.className}`.trim();
  }
}