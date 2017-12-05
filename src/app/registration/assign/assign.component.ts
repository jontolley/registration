import { Component, OnInit } from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import { AssignService } from '../services/assign.service';
import { RegisterService } from '../services/register.service';
import { UserWithSubgroups } from '../models/userWithSubgroups';
import { Group } from '../models/group';

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
  
  constructor(private assign:AssignService, private register:RegisterService) { }

  ngOnInit() {
    Observable.forkJoin(
      this.assign.getAssignments(),
      this.register.getGroups()
    )
    .subscribe(
      data => {
        this.assignments = data[0];
        this.groups = data[1];
        this.busy = false;
      },
      error => {
        console.error(error);
        this.errorMessage = error;
        this.busy = false;
      }
    );
  }
}
