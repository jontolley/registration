import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { AuthProfile } from '../models/auth-profile';

@Injectable()
export class UsersService {

  userInfo:User;

  constructor(private data:DataService) {
  }

  public getUser(): Observable<User> {
    return new Observable(observer => {
      if (this.userInfo) {
        observer.next(this.userInfo);
        observer.complete();
      } else {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          let errorMessage = 'User is not authenticated';
          observer.error(new Error(errorMessage));
        }
        
        this.data.getUser()
        .subscribe(
          data => {
            this.userInfo = data;
            observer.next(data);
          },
          error => {
            observer.error(error);
          },
          () => {
            observer.complete();
          }
        );
      }
    });
  }

  public saveUser(profile:AuthProfile): Observable<User> {
    return new Observable(observer => {
      this.data.getUser()
      .subscribe(
        data => {
          this.userInfo = data;
          observer.next(data);
        },
        error => {
          // Unable to get User from API so save new user
          let user = new User(
            profile.sub,
            profile.name,
            profile.nickname,
            profile.email,
            profile.picture
          );
          this.data.saveUser(user)
          .subscribe(
            data => {
              this.userInfo = data;
              observer.next(data);
            },
            error => {
              console.error(error);
              observer.error(error);
            },
            () => {
              console.log('User Post Complete');
              observer.complete();
            }
          );
        }
      );      
    });
  }

  // public mapProfileToUser(profile:Profile):User {
  //   return new User(
  //     profile.sub,
  //     profile.name,
  //     profile.nickname,
  //     profile.email,
  //     profile.picture
  //   );
  // }

  // public mapUserToProfile(user:User):Profile {
  //   return new Profile(
  //     user.subscriberId,
  //     user.name,
  //     user.email,
  //     user.nickname,
  //     user.pictureUrl,
  //     true
  //   );
  // }

}
