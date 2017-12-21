import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { AuthInfo } from '../models/auth-info';
import { AuthHttp } from 'angular2-jwt';
import { ErrorsService } from './errors.service';
import { MappingService } from './mapping.service';
import { UserWithSubgroups } from '../models/userWithSubgroups';

@Injectable()
export class UsersService {
  
  user: User;
  
  private loadingUserObservable: Observable<User>;

  constructor(private authHttp: AuthHttp, private data: DataService,
    private errorsService: ErrorsService, private mapping: MappingService) {
  }

  public GetUser(): Observable<User> {
    if (this.loadingUserObservable) return this.loadingUserObservable;

    this.loadingUserObservable = new Observable(observer => {
      if (this.user) {
        observer.next(this.user);
        observer.complete();
      } else {
        this.authHttp.get(`${this.data.API_URL}/users/current`)
        .map(res => res.json())
        .subscribe(
          data => {
            this.user = data;
            observer.next(data);
          },
          error => {
            this.user = undefined;
            observer.error(this.errorsService.handleError(error));
            this.loadingUserObservable = undefined;
          },
          () => {
            observer.complete();
            this.loadingUserObservable = undefined;
          }
        );      
      }
    });

    return this.loadingUserObservable;
  }

  public updateUser(authInfo: AuthInfo): void {
    this.user = this.mapping.authInfoToUser(authInfo);
    
    this.authHttp.put(`${this.data.API_URL}/users/current`, this.user)
    .map(res => res.json())
    .subscribe(
      data => { },
      error => {
        this.user = undefined;
        this.errorsService.handleError(error);
      },
      () => {
        console.log('Updated User');
      }
    );
  }

  public createUser(authInfo: AuthInfo): void {
    let newUser = this.mapping.authInfoToUser(authInfo);

    this.authHttp.post(`${this.data.API_URL}/users/current`, newUser)
    .map(res => res.json())
    .subscribe(
      data => {
        this.user = data;
      },
      error => {
        this.user = undefined;
        this.errorsService.handleError(error);
      },
      () => {
        console.log('Created New User');
      }
    );
  }
}
