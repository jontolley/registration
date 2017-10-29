import { Component, Inject, HostListener, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'camp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isSmallNav = false;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
  }

  @HostListener("window:scroll", [])
  onScroll() {
    let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    console.log("scroll position", number);

    this.isSmallNav = number > 0;
  }

}
