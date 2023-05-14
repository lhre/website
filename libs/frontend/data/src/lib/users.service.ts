import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Users } from '../models/users.model';
import { Followers } from '../models/followers.model';
import { Followed } from '../models/followed.model';
import { UserCredits } from '../models/user-credits.model';
import { Runs } from '../models/runs.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers(options?: object): Observable<Users> {
    return this.http.get<Users>(environment.api + '/api/users', options || {});
  }

  getUser(userID: number, options?: object): Observable<User> {
    return this.http.get<User>(
      environment.api + '/api/users/' + userID,
      options || {}
    );
  }

  getFollowersOfUser(user: User): Observable<Followers> {
    return this.http.get<Followers>(
      environment.api + '/api/users/' + user.id + '/followers'
    );
  }

  getUserFollows(user: User): Observable<Followed> {
    return this.http.get<Followed>(
      environment.api + '/api/users/' + user.id + '/follows'
    );
  }

  getMapCredits(userID: number, options?: object): Observable<UserCredits> {
    return this.http.get<UserCredits>(
      `${environment.api}/api/users/${userID}/credits`,
      options || {}
    );
  }

  getRunHistory(userID: number, options?: object): Observable<Runs> {
    return this.http.get<Runs>(
      `${environment.api}/api/users/${userID}/runs`,
      options || {}
    );
  }
}
