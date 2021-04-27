import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appZoomin]',
})
export class ZoominDirective {
  @HostBinding('style.transform') scale: string;
  @HostBinding('style.transition') transition: string;

  constructor() {}
  @HostListener('mouseover') mouseover() {
    this.scale = 'scale(1.4)';
    this.transition = 'all 0.4s';
  }
  @HostListener('mouseleave') mouseleave() {
    this.scale = 'scale(1)';
    this.transition = 'all 0.4s';
  }
}
