import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { NgForm }   from '@angular/forms';
import { Attendee } from '../models/attendee';
import { AttendeeService } from '../services/attendee.service';

@Component({
  selector: 'camp-attendee-form',
  templateUrl: './attendee-form.component.html',
  styleUrls: ['./attendee-form.component.scss']
})
export class AttendeeFormComponent implements OnInit {

  @ViewChild('attendeeForm') public attendeeForm: NgForm;
  @Input() groupId:number;
  @Input() subgroupId:number;
  @Input() attendee:Attendee;
  
  errorMessage:string;

  submitted:boolean;
  submitFailed:boolean;
  submiting:boolean;

  model:Attendee;

  constructor(private dataService: AttendeeService) { }

  ngOnInit() {
    this.initializeVariables();
  }

  onSubmit() {
    
    if (this.attendeeForm.invalid) {
      this.submitFailed = true;
      return;
    }

    this.submiting = true;

    if (this.model.id) {
      // Current Attendee so update
      this.dataService.updateAttendee(this.groupId, this.subgroupId, this.model)
      .subscribe(
        data => { },
        error => {
          this.submiting = false;
          this.errorMessage = error;
          console.log(error);
        },
        () => {
          console.log('Attendee updated');
          this.submitted = true;
          this.submiting = false;
        }
      );
    } else {
      // New Attendee so add
      this.dataService.addAttendee(this.groupId, this.subgroupId, this.model)
      .subscribe(
        data => {
          this.model = data;
        },
        error => {
          this.submiting = false;
          this.errorMessage = error;
          console.log(error);
        },
        () => {
          console.log('Attendee added');
          this.submitted = true;
          this.submiting = false;
        }
      );
    }
  }

  initializeVariables() {
    this.submitted = false;
    this.submitFailed = false;
    this.submiting = false;
    this.model = this.attendee;
  }

  reset() {
    this.errorMessage = undefined;
    this.attendeeForm.reset();
    this.initializeVariables();
  }

}
