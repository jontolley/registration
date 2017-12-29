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
import { SubgroupWithPin } from '../models/subgroupWithPin';
import { UsersService } from '../services/users.service';

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
    private router: Router, public authService: AuthService, private usersService:UsersService) {
      this.groups = [];
      this.subgroups = [];
      this.assignments = new UserWithSubgroups();
    }

  ngOnInit() {

    this.assign.getAssignments()
    .subscribe(
      data => {
        this.assignments = data;

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
      },
      error => {
        if (error.code !== 404) {
          console.error(error);
          this.router.navigate(['error']);
        }

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
      }
    );
  }
  
  groupSelected(group:Group): void {
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
  
  subgroupSelected(subgroup:Subgroup): void {
    this.selectedSubgroup = subgroup;
  }
  
  isGroupAssigned(group:Group): boolean {
    let assigned = false;
    this.assignments.subgroups.forEach(element => {
      if (group.id === element.groupId) assigned = true;
    });
    return assigned;
  }
    
  isSubgroupAssigned(subgroup:Subgroup): boolean {
    let assigned = false;    
    let x = this.assignments.subgroups;
    this.assignments.subgroups.forEach(element => {
      if (subgroup.id === element.id) assigned = true;
    });
    return assigned;
  }

  addSubgroup(subgroup:Subgroup, pin:string): void {

    let subgroupWithPin = new SubgroupWithPin();
    subgroupWithPin.id = subgroup.id;
    subgroupWithPin.pin = pin;
    this.assign.makeAssignment(subgroupWithPin)
    .subscribe(
      data => {
        this.assignments.subgroups.push(this.selectedSubgroup);
        console.log('new assignment', data);
        this.selectedSubgroup = undefined;
      },
      error => {
        this.selectedSubgroup = undefined;
        alert("Invalid Pin");
        console.error('no assignment', error);
      }
    );
    console.log('assign Subgroup', pin, subgroup);
  }

  removeSubgroup(subgroupId:number): void {
    this.assign.removeAssignment(subgroupId)
    .subscribe(
      data => {
        let position = this.assignments.subgroups.findIndex((value, index, obj) => {
          return value.id === subgroupId;
        });
        this.assignments.subgroups.splice(position, 1);
        console.log('removed assignment', subgroupId);
        this.selectedSubgroup = undefined;
      },
      error => {
        console.error('no assignment', error);
      }
    );
  }
}
