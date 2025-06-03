import { Directive, ElementRef, HostListener, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appRipple]',
  standalone: true
})
export class RippleDirective {
  @Input() appRipple: boolean = true;
  
  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    // Position relative setzen für absolute Positionierung der Ripples
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    this.renderer.setStyle(this.el.nativeElement, 'overflow', 'hidden');
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    // Nur ausführen wenn Ripple aktiviert ist
    if (!this.appRipple) {return;}
    
    const button = this.el.nativeElement;
    const rect = button.getBoundingClientRect();
    
    // Berechne Position relativ zum Button
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Erstelle Ripple-Element
    const ripple = this.renderer.createElement('span');
    
    // Berechne die maximale Distanz für die Ripple-Größe
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    // Bestimme die Ripple-Farbe basierend auf der Button-Variante
    const buttonClasses = button.className;
    let rippleColor = 'rgba(255, 255, 255, 0.5)'; // Standard für Primary/Secondary/Danger
    
    if (buttonClasses.includes('outline-primary') || buttonClasses.includes('tertiary') || buttonClasses.includes('ghost')) {
      // Für Outline/Tertiary/Ghost nutze die aktuelle Textfarbe
      rippleColor = 'currentColor';
      this.renderer.setStyle(ripple, 'opacity', '0.2');
    } else {
      this.renderer.setStyle(ripple, 'opacity', '0.3');
    }
    
    // Style das Ripple-Element
    this.renderer.setStyle(ripple, 'position', 'absolute');
    this.renderer.setStyle(ripple, 'left', `${x - radius}px`);
    this.renderer.setStyle(ripple, 'top', `${y - radius}px`);
    this.renderer.setStyle(ripple, 'width', `${diameter}px`);
    this.renderer.setStyle(ripple, 'height', `${diameter}px`);
    this.renderer.setStyle(ripple, 'border-radius', '50%');
    this.renderer.setStyle(ripple, 'background', rippleColor);
    this.renderer.setStyle(ripple, 'transform', 'scale(0)');
    this.renderer.setStyle(ripple, 'pointer-events', 'none');
    
    // Animation
    this.renderer.setStyle(ripple, 'animation', 'ripple-effect 0.6s ease-out');
    
    // Füge Ripple zum Button hinzu
    this.renderer.appendChild(button, ripple);
    
    // Entferne Ripple nach Animation
    setTimeout(() => {
      this.renderer.removeChild(button, ripple);
    }, 600);
  }
}
