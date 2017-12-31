import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { NgForm }   from '@angular/forms';

import {SelectItem} from 'primeng/primeng';
import * as moment from 'moment';

import { Attendee } from '../models/attendee';
import { AttendeeService } from '../services/attendee.service';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';

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
  dob:any = {
    month: 0,
    day: '',
    year: ''
  }
  dobError:any = {
    day: false,
    year: false
  }

  attendeeTypes: SelectItem[];
  days: SelectItem[];
  selectedDays: string[] = [];
  triathlonChoices: SelectItem[];
  shirtSizeChoices: SelectItem[] = [];
  accommodationChoices: any[] = [];
  meritBadgeChoices: any[] = [];
  monthChoices: SelectItem[] = [
    { label: "January (1)", value: 1 },
    { label: "February (2)", value: 2 },
    { label: "March (3)", value: 3 },
    { label: "April (4)", value: 4 },
    { label: "May (5)", value: 5 },
    { label: "June (6)", value: 6 },
    { label: "July (7)", value: 7 },
    { label: "August (8)", value: 8 },
    { label: "September (9)", value: 9 },
    { label: "October (10)", value: 10 },
    { label: "November (11)", value: 11 },
    { label: "December (12)", value: 12 }
  ];

  constructor(private dataService: DataService, private attendeeService: AttendeeService) {
    this.attendeeTypes = [];
    this.attendeeTypes.push({label: 'Adult', value: true});
    this.attendeeTypes.push({label: 'Youth', value: false});

    this.days = [];
    this.days.push({label: 'Monday', value: 'monday'});
    this.days.push({label: 'Tuesday', value: 'tuesday'});
    this.days.push({label: 'Wednesday', value: 'wednesday'});
    this.days.push({label: 'Thursday', value: 'thursday'});
    this.days.push({label: 'Friday', value: 'friday'});
    this.days.push({label: 'Saturday', value: 'saturday'});
    
    this.triathlonChoices = [];
    this.triathlonChoices.push({label: 'Yes', value: true});
    this.triathlonChoices.push({label: 'No', value: false});

    this.model = new Attendee();
  }

  ngOnInit() {
    forkJoin([
      this.dataService.getShirtSizes(),
      this.dataService.getAccommodations(),
      this.dataService.getMeritbadges()
    ])
    .subscribe(
      results => {
        let shirtSizes = results[0];
        for (let size of shirtSizes) {
          this.shirtSizeChoices.push({label: size.size, value:size.size});
        }
        this.accommodationChoices = results[1];
        this.meritBadgeChoices = results[2];

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
    
    if (this.attendeeForm.invalid || !this.processAttendance()) {
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
          this.setFormPristine();
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
          this.setFormPristine();
          console.log('Attendee added');
          this.submitted = true;
          this.submiting = false;
        }
      );
    }
  }

  dateOfBirthChanged() {
    if (this.dob.day) {
      var parsed = parseInt(this.dob.day, 10);
      if (isNaN(parsed) || parsed < 1 || parsed > 31) {
        this.model.dateOfBirth = undefined;
        this.dobError.day = true;
      }
      else {
        this.dobError.day = false;
      }
    }

    if (this.dob.year) {
      var parsed = parseInt(this.dob.year, 10);
      if (isNaN(parsed) || parsed < 1900 || parsed > 2017) {
        this.dobError.year = true;
        this.model.dateOfBirth = undefined;
      }
      else {
        this.dobError.year = false;
      }
    }

    if (this.dob.month && this.dob.day && this.dob.year && !this.dobError.day && !this.dobError.year) {
      let birthDate = new Date(this.dob.year, (this.dob.month-1), this.dob.day);
      this.model.dateOfBirth = birthDate;
    }
  }

  processAttendance(): boolean {
    if (this.selectedDays.length === 0) return false;

    this.model.attendance.monday = false;
    this.model.attendance.tuesday = false;
    this.model.attendance.wednesday = false;
    this.model.attendance.thursday = false;
    this.model.attendance.friday = false;
    this.model.attendance.saturday = false;

    for (let day of this.selectedDays) {
      this.model.attendance[day] = true;
    }

    return true;
  }

  initializeVariables() {
    this.submitted = false;
    this.submitFailed = false;
    this.submiting = false;

    this.model = Object.assign({}, this.attendee);
    if (this.model.dateOfBirth) {
      this.dob.year = moment(this.model.dateOfBirth).format('YYYY');
      this.dob.month = moment(this.model.dateOfBirth).format('MM');
      this.dob.day = moment(this.model.dateOfBirth).format('D');
    }

    let insertedOn = moment.utc(this.model.insertedOn);
    let updatedOn = moment.utc(this.model.updatedOn);

    this.model.insertedOn = insertedOn.toDate();
    this.model.updatedOn = updatedOn.toDate();

    if (this.model.attendance.monday) this.selectedDays.push('monday');
    if (this.model.attendance.tuesday) this.selectedDays.push('tuesday');
    if (this.model.attendance.wednesday) this.selectedDays.push('wednesday');
    if (this.model.attendance.thursday) this.selectedDays.push('thursday');
    if (this.model.attendance.friday) this.selectedDays.push('friday');
    if (this.model.attendance.saturday) this.selectedDays.push('saturday');
  }

  setFormPristine() {
    this.attendeeForm.form.markAsPristine();
    this.attendeeForm.form.markAsUntouched();    
  }

  reset() {
    this.errorMessage = undefined;
    this.initializeVariables();
    this.setFormPristine();
  }

  private capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

}
