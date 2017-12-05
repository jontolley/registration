import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User } from '../models/user';

@Component({
  selector: 'camp-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  busy = true;
  userProfile: User;

  constructor(public usersService: UsersService) { }

  ngOnInit() {
    if (this.usersService.userInfo) {
      this.userProfile = this.usersService.userInfo;
      this.busy = false;
    } else {
      this.usersService.getUser()
      .subscribe(
        data => {
          this.userProfile = data;
          this.busy = false;
        },
        error => {
          this.busy = false;
          console.error(error);
        }
      );
    }
  }

}
