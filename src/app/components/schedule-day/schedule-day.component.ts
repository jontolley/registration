import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'camp-schedule-day',
  templateUrl: './schedule-day.component.html',
  styleUrls: ['./schedule-day.component.scss']
})
export class ScheduleDayComponent implements OnInit {
  @Input() schedule;
  
  constructor() { }

  ngOnInit() {
  }

}
