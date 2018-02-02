import { Directive, ElementRef, HostListener, Inject, Renderer2  } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Directive({
  selector: '[campStrinkOnSroll]'
})
export class ShrinkOnScrollDirective {

  constructor(private el: ElementRef, @Inject(DOCUMENT) private document: Document, private renderer: Renderer2) {};

  @HostListener("window:scroll", [])
  onScroll() {
    let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (number > 100) {
      this.renderer.addClass(this.el.nativeElement, 'shrink');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'shrink');
    }
  }
}