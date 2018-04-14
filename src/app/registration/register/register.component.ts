import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {Observable} from 'rxjs/Observable';

import { AuthService } from '../services/auth.service';
import { AssignService } from '../services/assign.service';
import { UserWithSubgroups } from '../models/userWithSubgroups';
import { RegisterService } from '../services/register.service';
import { Group } from '../models/group';
import { Attendee } from '../models/attendee';
import { PACKAGE_ROOT_URL } from '@angular/core/src/application_tokens';
import { Subgroup } from '../models/subgroup';
import { AnalyticsService } from '../services/analytics.service';

@Component({
  selector: 'camp-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  errorMessage:string;
  busy:boolean = true;
  loadingAttendees:boolean = false;
  loadingAttendee:boolean = false;

  assignments:UserWithSubgroups;
  selectedSubgroup:Subgroup;
  attendees:Attendee[] = [];
  selectedAttendee:Attendee;

  constructor(private auth: AuthService, private router: Router,
    private assign:AssignService, private register:RegisterService, private analytics:AnalyticsService) { }

  ngOnInit() {
    this.assign.getAssignments()
    .subscribe(
      data => {
        this.assignments = data;
        if (this.assignments.numberOfSubgroups === 0) {
          this.router.navigate(['register','assign']);
          return;
        }
        
        this.subgroupSelected(this.assignments.subgroups[0]);
        this.busy = false;
      },
      error => {
        console.error(error.code, error.message);
        this.errorMessage = error;
        this.busy = false;

        if(error.code === 404) {
          this.router.navigate(['register','assign']);
        } else {
          this.router.navigate(['error']);
        }
      }
    );
  } 
  
  subgroupSelected(subgroup:Subgroup): void {
    this.selectedSubgroup = subgroup;
    this.selectedAttendee = undefined;
    this.loadingAttendees = true;
    
    this.register.getAttendeeStubs(
      this.selectedSubgroup.groupId, this.selectedSubgroup.id)
      .subscribe(
        data => {
          this.attendees = data;
          this.loadingAttendees = false;
        },
        error => {
          if (error.code === 0) this.errorMessage = error.message;
          else this.errorMessage = error;
          this.loadingAttendees = false;
        }
      );
  }

  attendeeSelected(attendee:Attendee): void {
    this.selectedAttendee = attendee;

    this.loadingAttendee = true;
    this.register.getAttendee(this.selectedSubgroup.groupId, this.selectedSubgroup.id, attendee.id)
      .subscribe(
        data => {
          this.replaceAttendee(attendee, data);
          this.selectedAttendee = data;
          this.loadingAttendee = false;
        },
        error => {
          if (error.code === 0) this.errorMessage = error.message;
          else this.errorMessage = error;
          this.loadingAttendee = false;
        }
      );
  }

  addAttendee() {
    this.loadingAttendee = true;
    let attendee = new Attendee();
    attendee.subgroupId = this.selectedSubgroup.id;
    attendee.attendance = {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      daysAttending: 6
    }
    this.selectedAttendee = attendee;

    setTimeout(()=>{
      this.loadingAttendee = false;
    },50);
  }

  downloadList(id:number) {
    this.analytics.getSubgroupList(id);
  }

  downloadStakeList(id:number) {
    this.analytics.getGroupList(id);
  }

  selectedAttendeeInListOfAttendees(): boolean {
    if (this.selectedAttendee && !this.selectedAttendee.id) return true;

    var index = this.attendees.indexOf(this.selectedAttendee);
    return index > -1;
  }

  replaceAttendee(oldAttendee:Attendee, newAttendee:Attendee) {
    var index = this.attendees.indexOf(oldAttendee);
    if (index !== -1) {
      this.attendees[index] = newAttendee;
    }
  }

}
