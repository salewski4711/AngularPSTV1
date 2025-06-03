import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type GridCols = 1 | 2 | 3 | 4 | 6 | 12;
export type GridGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8;

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="gridClasses">
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent {
  @Input() cols: GridCols = 1;
  @Input() colsSm?: GridCols;
  @Input() colsMd?: GridCols;
  @Input() colsLg?: GridCols;
  @Input() gap: GridGap = 4;
  @Input() className = '';
  
  get gridClasses(): string {
    const base = 'grid';
    const gapClass = `gap-${this.gap}`;
    
    // Base cols
    const colsClass = `grid-cols-${this.cols}`;
    
    // Responsive cols
    const responsiveClasses = [
      this.colsSm ? `sm:grid-cols-${this.colsSm}` : '',
      this.colsMd ? `md:grid-cols-${this.colsMd}` : '',
      this.colsLg ? `lg:grid-cols-${this.colsLg}` : ''
    ].filter(Boolean).join(' ');
    
    return `${base} ${colsClass} ${responsiveClasses} ${gapClass} ${this.className}`.trim();
  }
}

// Grid Item Component für span control
@Component({
  selector: 'app-grid-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="itemClasses">
      <ng-content></ng-content>
    </div>
  `
})
export class GridItemComponent {
  @Input() span: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 = 1;
  @Input() spanSm?: number;
  @Input() spanMd?: number;
  @Input() spanLg?: number;
  @Input() className = '';
  
  get itemClasses(): string {
    const base = `col-span-${this.span}`;
    
    const responsiveClasses = [
      this.spanSm ? `sm:col-span-${this.spanSm}` : '',
      this.spanMd ? `md:col-span-${this.spanMd}` : '',
      this.spanLg ? `lg:col-span-${this.spanLg}` : ''
    ].filter(Boolean).join(' ');
    
    return `${base} ${responsiveClasses} ${this.className}`.trim();
  }
}