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
    console.log("scroll position", number);

    if (number > 100) {
      console.log("add shrink");
      this.renderer.addClass(this.el.nativeElement, 'shrink');
    } else {
      console.log("remove shrink");
      this.renderer.removeClass(this.el.nativeElement, 'shrink');
    }
  }
}