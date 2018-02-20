import { Component, OnInit } from '@angular/core';

import {Observable} from 'rxjs/Observable';

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
  busy:boolean = true;
  loadingGroups:boolean = true;
  loadingSubgroups: boolean = true;

  assignments:UserWithSubgroups;
  groups:Group[];
  subgroups:Subgroup[];
  selectedGroup:Group;
  selectedSubgroup:Subgroup;
  
  growlMessages: any[] = [];
  growlStickyMessages: any[] = [];

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
        this.loadGroups();
      },
      error => {
        if (error.code !== 404) {
          console.error(error);
          this.router.navigate(['error']);
        }
        this.loadGroups();
      }
    );
  }

  loadGroups() {
    this.register.getGroups()
    .subscribe(
      data => {
        this.groups = data;
        this.loadingGroups = false;
        this.busy = false;
      },
      error => {
        console.error(error);
        this.loadingGroups = false;
        this.router.navigate(['error']);
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
        this.router.navigate(['error']);
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
        this.showGrowl('success', 'Unit successfuly added', `${this.selectedSubgroup.name}`);
        this.selectedSubgroup = undefined;
      },
      error => {
        this.selectedSubgroup = undefined;
        this.showGrowl('error', 'Invalid Pin', 'The pin was invalid.');
      }
    );
  }

  removeSubgroup(subgroupId:number): void {
    this.assign.removeAssignment(subgroupId)
    .subscribe(
      data => {
        let position = this.assignments.subgroups.findIndex((value, index, obj) => {
          return value.id === subgroupId;
        });
        if (position < 0) return;

        let removedSubgroupArray = this.assignments.subgroups.splice(position, 1);
        let removedSubgroup = removedSubgroupArray[0];
        this.selectedSubgroup = undefined;
        this.showGrowl('info', 'Unit successfuly removed', `${removedSubgroup.name}`);
      },
      error => {
        console.error('no assignment', error);
        this.router.navigate(['error']);
      }
    );
  }
  
  showGrowl(severity:string, summary:string, detail?:string) {
    this.growlMessages = [];
    this.growlMessages.push({severity:severity, summary:summary, detail:detail});
  }
    
  showStickyGrowl(severity:string, summary:string, detail?:string) {
    this.growlStickyMessages = [];
    this.growlStickyMessages.push({severity:severity, summary:summary, detail:detail});
  }
}
