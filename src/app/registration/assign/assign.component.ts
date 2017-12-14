import { Component, OnInit } from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import { AssignService } from '../services/assign.service';
import { RegisterService } from '../services/register.service';
import { UserWithSubgroups } from '../models/userWithSubgroups';
import { Group } from '../models/group';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'camp-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.scss']
})
export class AssignComponent implements OnInit {

  errorMessage:string;
  busy:boolean = true;

  assignments:UserWithSubgroups;
  groups:Group[];
  
  constructor(private assign:AssignService, private register:RegisterService,
    public authService: AuthService) { }

  ngOnInit() {
    this.register.getGroups()
    .subscribe(
      data => {
        this.groups = data;
        this.busy = false;
      },
      error => {
        console.error(error);
        this.errorMessage = error;
        this.busy = false;
      }
    );

    this.assign.getAssignments()
    .subscribe(
      data => {
        this.assignments = data;
        this.busy = false;
      },
      error => {
        if (error.code !== 404) {
          console.error(error);
          this.errorMessage = error;
        }
        this.busy = false;
      }
    );
  }
}
