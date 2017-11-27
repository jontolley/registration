import { Directive, ElementRef, Input, HostListener } from '@angular/core';

declare var $: any;

@Directive({
  selector: '[campCloseMenu]'
})
export class CloseMenuDirective {

  @Input()
  public menu: any;

  constructor(private element: ElementRef) { }

  @HostListener("click")
  private onClick() {
    $('.navbar-collapse').collapse('hide');
  }

}
