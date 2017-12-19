import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import { AuthService } from '../services/auth.service';
import { AssignService } from '../services/assign.service';
import { UserWithSubgroups } from '../models/userWithSubgroups';
import { RegisterService } from '../services/register.service';
import { Group } from '../models/group';
import { PACKAGE_ROOT_URL } from '@angular/core/src/application_tokens';

@Component({
  selector: 'camp-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  errorMessage:string;
  busy:boolean = true;

  assignments:UserWithSubgroups;
  groups:Group[];

  constructor(private auth: AuthService, private router: Router,
    private assign:AssignService, private register:RegisterService) { }

  ngOnInit() {
    Observable.forkJoin(
      this.assign.getAssignments(),
      this.register.getGroups()
    )
    .subscribe(
      data => {
        this.assignments = data[0];
        if (this.assignments.numberOfSubgroups === 0) {
          this.router.navigate(['register','assign']);
          return;
        }
        this.groups = data[1];
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

}
