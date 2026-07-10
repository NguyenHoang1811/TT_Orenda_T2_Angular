import { Directive, ElementRef, HostListener } from '@angular/core';
@Directive({
  selector: '[appHighlight]'
})
export class Highlight {

  constructor(private el: ElementRef) {

    this.el.nativeElement.style.border = '2px solid red';

  }
  @HostListener('mouseenter')
  onMouseEnter() {
    this.el.nativeElement.style.border = '2px solid yellow';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.el.nativeElement.style.border = '2px solid red';
  }

}