import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";

@Component({
  selector: 'camp-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy  {
  
  @Input() CountdownTo: Date;
  private subscription: Subscription;

  days:number;
  hours:number;
  minutes:number;
  seconds:number;

  hideComponent:string;

  constructor() { }

  ngOnInit() {
    let timer = TimerObservable.create(0, 1000);
    this.subscription = timer.subscribe(t => {
      let now = new Date();
      let ticks = this.CountdownTo.valueOf() - now.valueOf();

      if (ticks < 0) {
        this.days = 0;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        
        this.hideComponent = 'boom';
        this.subscription.unsubscribe();
      }

      this.days = Math.trunc(ticks / (1000*60*60*24));
      ticks = ticks - (this.days * (1000*60*60*24));

      this.hours = Math.trunc(ticks / (1000*60*60));
      ticks = ticks - (this.hours * (1000*60*60));

      this.minutes = Math.trunc(ticks / (1000*60));
      ticks = ticks - (this.minutes * (1000*60));

      this.seconds = Math.trunc(ticks / (1000));
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
