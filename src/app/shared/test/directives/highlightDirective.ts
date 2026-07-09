import { Directive, ElementRef } from '@angular/core';
@Directive({
  selector: '[appHighlight]'
})
export class Highlight {

  constructor(private el: ElementRef) {

    this.el.nativeElement.style.border = '2px solid red';

  }

}