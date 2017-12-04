import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'camp-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  busy = true;
  profile: any;

  constructor(public usersService: UsersService) { }

  ngOnInit() {
    if (this.usersService.userProfile) {
      this.profile = this.usersService.userProfile;
      this.busy = false;
    } else {
      this.usersService.getUserInfo()
      .subscribe(
        data => {
          this.profile = data;
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
