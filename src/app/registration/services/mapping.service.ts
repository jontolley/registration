import { Injectable } from '@angular/core';
import { AuthInfo } from '../models/auth-info';
import { User } from '../models/user';

@Injectable()
export class MappingService {

  constructor() { }

  authInfoToUser(authInfo: AuthInfo): User {
    let user = new User();
    
    user.subscriberId = authInfo.sub;
    user.name = authInfo.name;
    user.nickname = authInfo.nickname;
    user.email = authInfo.email;
    user.pictureUrl = authInfo.picture;

    return user;
  }

}
