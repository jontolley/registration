import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { NgForm }   from '@angular/forms';

import {SelectItem} from 'primeng/primeng';

import { Attendee } from '../models/attendee';
import { AttendeeService } from '../services/attendee.service';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'camp-attendee-form',
  templateUrl: './attendee-form.component.html',
  styleUrls: ['./attendee-form.component.scss']
})
export class AttendeeFormComponent implements OnInit {

  @ViewChild('attendeeForm') public attendeeForm: NgForm;
  @Input() groupId:number;
  @Input() subgroupId:number;
  @Input() attendees:Attendee[];
  @Input() attendee:Attendee;
  
  errorMessage:string;
  busy:boolean = true;

  submitted:boolean;
  submitFailed:boolean;
  submiting:boolean;

  model:Attendee;

  attendeeTypes: SelectItem[];
  triathlonChoices: SelectItem[];
  shirtSizeChoices: SelectItem[] = [];

  constructor(private dataService: DataService, private attendeeService: AttendeeService) {
    this.attendeeTypes = [];
    this.attendeeTypes.push({label: 'Adult', value: true});
    this.attendeeTypes.push({label: 'Youth', value: false});
    
    this.triathlonChoices = [];
    this.triathlonChoices.push({label: 'Yes', value: true});
    this.triathlonChoices.push({label: 'No', value: false});

    this.model = new Attendee();
  }

  ngOnInit() {
    this.loadShirtSizes()
    .subscribe(
      data => {
        this.initializeVariables();
        this.busy = false;
      },
      error => {
        this.errorMessage = error;
        this.busy = false;
      }
    );
  }

  onSubmit() {
    
    if (this.attendeeForm.invalid) {
      this.submitFailed = true;
      return;
    }

    this.submiting = true;

    if (this.model.id) {
      // Current Attendee so update
      this.attendeeService.updateAttendee(this.groupId, this.subgroupId, this.model)
      .subscribe(
        data => {
          this.attendee = Object.assign(this.attendee, this.model);
        },
        error => {
          this.submiting = false;
          this.errorMessage = error;
        },
        () => {
          console.log('Attendee updated');
          this.submitted = true;
          this.submiting = false;
        }
      );
    } else {
      // New Attendee so add
      this.attendeeService.addAttendee(this.groupId, this.subgroupId, this.model)
      .subscribe(
        data => {
          this.model = data;
          this.attendee = Object.assign(this.attendee, this.model);
          this.attendees.push(this.attendee);
        },
        error => {
          this.submiting = false;
          this.errorMessage = error;
        },
        () => {
          console.log('Attendee added');
          this.submitted = true;
          this.submiting = false;
        }
      );
    }
  }

  loadShirtSizes(): Observable<any> {
    return new Observable(observer => {
      this.dataService.getShirtSizes()
      .subscribe(
        data => {
          for (let size of data) {
            this.shirtSizeChoices.push({label: size.size, value:size.size});
          }
          observer.next();
          observer.complete();
        },
        error => {
          observer.error(error);
        }
      );
    });
  }

  initializeVariables() {
    this.submitted = false;
    this.submitFailed = false;
    this.submiting = false;

    this.model = Object.assign({}, this.attendee);
  }

  reset() {
    this.errorMessage = undefined;
    this.initializeVariables();
  }

}
