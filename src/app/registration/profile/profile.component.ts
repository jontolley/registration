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
  user: User;

  constructor(public users: UsersService) { }

  ngOnInit() {
    if (this.users.user) {
      this.user = this.users.user;
      this.busy = false;
    } else {
      this.users.GetUser()
      .subscribe(
        data => {
          this.user = data;
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
