import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'camp-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  encampmentDays:any = [
    {
      date: new Date(2018, 8, 6),
      events: [
        {
          title: 'breakfast',
          time: '9:00 am'
        }
      ]
    },
    {
      date: new Date(2018, 8, 7),
      events: [
        {
          title: 'breakfast',
          time: '9:00 am'
        }
      ]
    },
    {
      date: new Date(2018, 8, 8),
      events: [
        {
          title: 'breakfast',
          time: '9:00 am'
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
