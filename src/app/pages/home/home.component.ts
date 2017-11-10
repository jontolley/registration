import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'camp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  startDate:Date;

  constructor() {
    this.startDate = new Date(2018, 7, 6, 5, 0, 0);
    console.log('Encampment Start Date:', this.startDate);
  }

  ngOnInit() { }

}
