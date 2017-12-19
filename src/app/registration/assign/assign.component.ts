import { Component, OnInit } from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import { AssignService } from '../services/assign.service';
import { RegisterService } from '../services/register.service';
import { UserWithSubgroups } from '../models/userWithSubgroups';
import { Group } from '../models/group';
import { AuthService } from '../services/auth.service';
import { Subgroup } from '../models/subgroup';
import { Router } from '@angular/router';

@Component({
  selector: 'camp-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.scss']
})
export class AssignComponent implements OnInit {

  errorMessage:string;
  loadingGroups:boolean = true;
  loadingSubgroups: boolean = true;

  assignments:UserWithSubgroups;
  groups:Group[];
  subgroups:Subgroup[];
  selectedGroup:Group;
  selectedSubgroup:Subgroup;
  
  constructor(private assign:AssignService, private register:RegisterService,
    private router: Router, public authService: AuthService) {
      this.groups = [];
      this.subgroups = [];
    }

  ngOnInit() {
    this.register.getGroups()
    .subscribe(
      data => {
        this.groups = data;
        this.selectedGroup = data[0] || undefined;
        this.loadingGroups = false;
        if (this.selectedGroup) {
          this.groupSelected(this.selectedGroup);
        }
      },
      error => {
        console.error(error);
        this.loadingGroups = false;
        this.router.navigate(['error']);
      }
    );

    this.assign.getAssignments()
    .subscribe(
      data => {
        this.assignments = data;
      },
      error => {
        if (error.code !== 404) {
          console.error(error);
          this.router.navigate(['error']);
        }
      }
    );
  }
  
  groupSelected(group:Group) {
    this.selectedGroup = group;
    this.loadingSubgroups = true;

    this.register.getSubgroups(group.id)
    .subscribe(
      data => {
        this.subgroups = data;
      },
      error => {
        console.error(error);
        this.errorMessage = error;
      },
      () => {
        this.loadingSubgroups = false;
      }
    );
  }
  
  subgroupSelected(subgroup:Subgroup) {
    this.selectedSubgroup = subgroup;
  }

  addSubgroup(subgroup:Subgroup) {
    console.log('assign Subgroup', subgroup);
  }
}
