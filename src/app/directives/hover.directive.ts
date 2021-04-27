import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[hoverDirective]',
})
export class HoverDirective {
  constructor() {}
  @HostBinding('style.backgroundColor') backColor;
  @HostBinding('style.color') color;
  @HostBinding('style.transition') transition;
  @HostBinding('style.border') border;
  @Input() defaultColor;
  @Input() hoverColor;

  @HostListener('mouseenter') hover(eventData: Event) {
    this.backColor = this.hoverColor;
    this.color = 'black';
    this.transition = 'all 0.4s';
    this.border = '1px solid black';
  }
  @HostListener('mouseleave') leave(eventData: Event) {
    this.backColor = this.defaultColor;
    this.color = 'white';
    this.transition = 'all 0.4s';
    this.border = 'none';
  }
}
