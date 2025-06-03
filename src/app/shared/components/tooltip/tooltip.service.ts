import { Injectable, ElementRef } from '@angular/core';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right' | 'auto';

export interface TooltipPositionResult {
  position: TooltipPosition;
  x: number;
  y: number;
  arrowX?: number;
  arrowY?: number;
}

@Injectable({
  providedIn: 'root'
})
export class TooltipService {
  private readonly offset = 8; // Distance between tooltip and target
  private readonly arrowSize = 6;
  private readonly viewportPadding = 8;

  calculatePosition(
    targetElement: ElementRef<HTMLElement>,
    tooltipElement: HTMLElement,
    preferredPosition: TooltipPosition,
    appendToBody: boolean = false
  ): TooltipPositionResult {
    const target = targetElement.nativeElement;
    const targetRect = target.getBoundingClientRect();
    const tooltipRect = tooltipElement.getBoundingClientRect();
    
    // Get viewport dimensions
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    // Calculate available space in each direction
    const availableSpace = {
      top: targetRect.top - this.viewportPadding,
      bottom: viewport.height - targetRect.bottom - this.viewportPadding,
      left: targetRect.left - this.viewportPadding,
      right: viewport.width - targetRect.right - this.viewportPadding
    };

    // Determine actual position
    let actualPosition = preferredPosition;
    if (preferredPosition === 'auto') {
      actualPosition = this.determineAutoPosition(availableSpace, tooltipRect);
    } else if (!this.canFitInPosition(preferredPosition, availableSpace, tooltipRect)) {
      actualPosition = this.getFallbackPosition(preferredPosition, availableSpace, tooltipRect);
    }

    // Calculate coordinates based on position
    const result = this.getPositionCoordinates(targetRect, tooltipRect, actualPosition, appendToBody);
    
    // Ensure tooltip stays within viewport
    result.x = Math.max(this.viewportPadding, Math.min(result.x, viewport.width - tooltipRect.width - this.viewportPadding));
    result.y = Math.max(this.viewportPadding, Math.min(result.y, viewport.height - tooltipRect.height - this.viewportPadding));

    return result;
  }

  private determineAutoPosition(availableSpace: Record<string, number>, tooltipRect: DOMRect): TooltipPosition {
    // Prioritize positions with most available space
    const positions: TooltipPosition[] = ['top', 'bottom', 'left', 'right'];
    const spacedPositions = positions
      .map(pos => ({
        position: pos,
        space: availableSpace[pos],
        fits: this.canFitInPosition(pos, availableSpace, tooltipRect)
      }))
      .filter(item => item.fits)
      .sort((a, b) => b.space - a.space);

    return spacedPositions.length > 0 ? spacedPositions[0].position : 'top';
  }

  private canFitInPosition(position: TooltipPosition, availableSpace: Record<string, number>, tooltipRect: DOMRect): boolean {
    switch (position) {
      case 'top':
      case 'bottom':
        return availableSpace[position] >= tooltipRect.height + this.offset + this.arrowSize;
      case 'left':
      case 'right':
        return availableSpace[position] >= tooltipRect.width + this.offset + this.arrowSize;
      default:
        return false;
    }
  }

  private getFallbackPosition(preferredPosition: TooltipPosition, availableSpace: Record<string, number>, tooltipRect: DOMRect): TooltipPosition {
    // Define fallback order for each position
    const fallbackMap: Record<TooltipPosition, TooltipPosition[]> = {
      top: ['bottom', 'left', 'right'],
      bottom: ['top', 'left', 'right'],
      left: ['right', 'top', 'bottom'],
      right: ['left', 'top', 'bottom'],
      auto: ['top', 'bottom', 'left', 'right']
    };

    const fallbacks = fallbackMap[preferredPosition];
    for (const fallback of fallbacks) {
      if (this.canFitInPosition(fallback, availableSpace, tooltipRect)) {
        return fallback;
      }
    }

    return preferredPosition; // Return original if no fallback works
  }

  private getPositionCoordinates(
    targetRect: DOMRect,
    tooltipRect: DOMRect,
    position: TooltipPosition,
    appendToBody: boolean
  ): TooltipPositionResult {
    let x = 0;
    let y = 0;
    let arrowX = 0;
    let arrowY = 0;

    const totalOffset = this.offset + this.arrowSize;

    // Calculate base position
    switch (position) {
      case 'top':
        x = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
        y = targetRect.top - tooltipRect.height - totalOffset;
        arrowX = tooltipRect.width / 2;
        arrowY = tooltipRect.height;
        break;
      case 'bottom':
        x = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
        y = targetRect.bottom + totalOffset;
        arrowX = tooltipRect.width / 2;
        arrowY = -this.arrowSize;
        break;
      case 'left':
        x = targetRect.left - tooltipRect.width - totalOffset;
        y = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
        arrowX = tooltipRect.width;
        arrowY = tooltipRect.height / 2;
        break;
      case 'right':
        x = targetRect.right + totalOffset;
        y = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
        arrowX = -this.arrowSize;
        arrowY = tooltipRect.height / 2;
        break;
    }

    // Adjust for scroll position if not appending to body
    if (!appendToBody) {
      x += window.scrollX;
      y += window.scrollY;
    }

    return { position, x, y, arrowX, arrowY };
  }
}