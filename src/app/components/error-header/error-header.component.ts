import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'camp-error-header',
  templateUrl: './error-header.component.html',
  styleUrls: ['./error-header.component.scss']
})
export class ErrorHeaderComponent implements OnInit {

  @Input() message:string;

  constructor() { }

  ngOnInit() {
  }

}
