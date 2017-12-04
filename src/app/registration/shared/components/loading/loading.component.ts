import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'camp-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  @Input() busy:boolean;

  constructor() { }

  ngOnInit() {
  }

}
