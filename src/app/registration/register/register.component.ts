import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import { AuthService } from '../services/auth.service';
import { AssignService } from '../services/assign.service';
import { UserWithSubgroups } from '../models/userWithSubgroups';
import { RegisterService } from '../services/register.service';
import { Group } from '../models/group';
import { Attendee } from '../models/attendee';
import { PACKAGE_ROOT_URL } from '@angular/core/src/application_tokens';
import { Subgroup } from '../models/subgroup';

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
  attendees:Attendee[];
  selectedAttendee:Attendee;

  constructor(private auth: AuthService, private router: Router,
    private assign:AssignService, private register:RegisterService) { }

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
          if (this.attendees && this.attendees.length > 0) {
            this.attendeeSelected(this.attendees[0]);
          }
          this.loadingAttendees = false;
        },
        error => {
          this.errorMessage = error;
          this.loadingAttendees = false;
        }
      );
  }

  attendeeSelected(attendee:Attendee): void {
    this.selectedAttendee = attendee;

    this.loadingAttendee = true;
    this.register.getAttendee(
      this.selectedSubgroup.groupId, this.selectedSubgroup.id, attendee.id)
      .subscribe(
        data => {
          this.selectedAttendee = data;
          this.loadingAttendee = false;
        },
        error => {
          this.errorMessage = error;
          this.loadingAttendee = false;
        }
      );
  }

}
