import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from '../../../../../shared/components/skeleton/skeleton.component';

@Component({
  selector: 'pst-skeleton-test',
  standalone: true,
  imports: [CommonModule, SkeletonComponent],
  template: `
    <div class="p-8">
      <h1 class="text-2xl font-bold mb-4">Skeleton Test</h1>
      
      <div class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold mb-2">Text Skeleton</h2>
          <pst-skeleton></pst-skeleton>
        </div>
        
        <div>
          <h2 class="text-lg font-semibold mb-2">Circular Skeleton</h2>
          <pst-skeleton variant="circular"></pst-skeleton>
        </div>
        
        <div>
          <h2 class="text-lg font-semibold mb-2">Rectangular Skeleton</h2>
          <pst-skeleton variant="rectangular" height="100px"></pst-skeleton>
        </div>
        
        <div>
          <h2 class="text-lg font-semibold mb-2">Button Skeleton</h2>
          <pst-skeleton variant="button"></pst-skeleton>
        </div>
      </div>
    </div>
  `
})
export class SkeletonTestComponent {}