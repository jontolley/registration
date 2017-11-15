import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'camp-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  encampmentDays:any = [
    {
      id: 'mon',
      title: 'Monday',
      events: [
        { time:'7:00 am',title:'Camp Check-In Begins'},
        { time:'12:00 pm',title:'LUNCH / Pick up Food'},
        { time:'1:00 pm',title:'Camp-Wide Flag Ceremony & Opening'},
        { time:'2:00 pm',title:'OPEN: Activities / Merit Badge Midway / Trading Post'},
        { time:'5:00 pm',title:'CLOSE: Activities / Merit Badge Midway / Trading Post'},
        { time:'5:15 pm',title:'DINNER / Pick up Food'},
        { time:'7:00 pm',title:'Special Event'},
        { time:'8:00 pm',title:'Opening Ceremony'},
        { time:'10:00 pm',title:'Prepare for sleep'},
        { time:'11:00 pm',title:'Quiet'}
      ]
    },
    {
      id: 'tue-fri',
      title: 'Tuesday - Friday',
      events: [
        { time:'6:00 am',title:'Rise, Prepare for Day'},
        { time:'6:30 am',title:'Morning Spiritual Preparation'},
        { time:'6:30 am',title:'Stake Presidents meet at staff area'},
        { time:'7:15 am',title:'BREAKFAST / Pick up Food'},
        { time:'8:45 am',title:'Clean up and prepare for activities'},
        { time:'9:00 am',title:'OPEN: Activities / Merit Badge Midway / Trading Post/Service Outings'},
        { time:'12:00 pm',title:'CLOSE: Activities / Merit Badge Midway / Trading Post'},
        { time:'12:00 pm',title:'LUNCH / Pick up Food'},
        { time:'',title:'	Special Events'},
        { time:'1:30 pm',title:'OPEN: Activities / Merit Badge Midway / Trading Post/Service Outings'},
        { time:'5:00 pm',title:'CLOSE: Activities / Merit Badge Midway / Trading Post'},
        { time:'5:15 pm',title:'DINNER / Pick up Food'},
        { time:'7:15 pm',title:'Camp-Wide Flags'},
        { time:'8:00 pm',title:'T, W, TH: Evening Program with Stake or Ward --/-- FRIDAY: Closing Ceremony'},
        { time:'10:00 pm',title:'Prepare for sleep'},
        { time:'11:00 pm',title:'Quiet'}
      ]
    },
    {
      id: 'sat',
      title: 'Saturday',
      events: [
        { time:'6:00 am',title:'Rise, Prepare for Day'},
        { time:'6:30 am',title:'Scripture Study'},
        { time:'6:30 am',title:'Stake Presidents meet at staff area'},
        { time:'7:15 am',title:'BREAKFAST / Pick up Food'},
        { time:'8:00 am',title:'Clean up Campsite & Activity Stations & prepare to leave at scheduled time'},
        { time:'11:00 am',title:'Encampment Officially Closed'}
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
