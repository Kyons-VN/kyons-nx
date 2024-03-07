/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAuthCredential, IAuthService } from '@domain/auth/i-auth-service';
import { User } from '@domain/user/user';
import { catchError, map } from 'rxjs';
import { DBHelper } from '../helper/helper';
import { SERVER_API } from './interceptor';

const TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const INTEGRATE_TOKEN_KEY = 'integrate_token';
// const INTEGRATE_REFRESH_TOKEN_KEY = 'integrate_refresh_token';
const EXPIRED_TIME = 'expired_time';
const USER_KEY = 'user';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements IAuthService {
  http: HttpClient;
  constructor() {
    this.http = inject(HttpClient);
  }

  signIn(credential: IAuthCredential) {
    return this.http.post(SERVER_API + '/student/sign_in', credential.toJson()).pipe(
      catchError(DBHelper.handleError('POST sign_in', Error('Server Error'))),
      map((data: any) => {
        if (TOKEN_KEY in data && REFRESH_TOKEN_KEY in data) {
          this.setToken(data);
        } else {
          data.error = true;
          data.message = data;
        }
        return User.fromJson(data['student_info']);
      })
    );
  }

  signOut() {
    this.removeToken();
  }

  public getToken() {
    return window.localStorage.getItem(TOKEN_KEY) ?? '';
  }
  public getIntegrateToken() {
    return window.localStorage.getItem(INTEGRATE_TOKEN_KEY) ?? '';
  }

  public getRefreshToken() {
    return window.localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  public setToken(data: any) {
    // window.localStorage.setItem(TOKEN_KEY, data[TOKEN_KEY]);
    // window.localStorage.setItem(REFRESH_TOKEN_KEY, data[REFRESH_TOKEN_KEY]);
    window.localStorage.setItem(INTEGRATE_TOKEN_KEY, data[INTEGRATE_TOKEN_KEY]);
    // window.localStorage.setItem(INTEGRATE_REFRESH_TOKEN_KEY, data[INTEGRATE_REFRESH_TOKEN_KEY]);
    window.localStorage.setItem(EXPIRED_TIME, data[EXPIRED_TIME]);
  }

  public removeToken() {
    // window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(INTEGRATE_TOKEN_KEY);
    // window.localStorage.removeItem(INTEGRATE_REFRESH_TOKEN_KEY);
    // window.localStorage.removeItem(REFRESH_TOKEN_KEY);
    window.localStorage.removeItem(EXPIRED_TIME);
  }

  refreshToken(refreshToken: string) {
    return this.http.post(
      SERVER_API + '/auth/refresh',
      {},
      {
        headers: {
          Authorization: 'Bearer ' + refreshToken,
        },
      }
    );
  }

  hasExpiredToken() {
    const expiredTimeStr = window.localStorage.getItem(EXPIRED_TIME) ?? '';
    const expiredTime = new Date(expiredTimeStr);
    if (isNaN(expiredTime.getTime())) return true;

    return expiredTime.getTime() < new Date().getTime();
  }

  setUser(user: User) {
    window.localStorage.setItem(USER_KEY, JSON.stringify(user.toJson()));
  }
  unsetUser() {
    window.localStorage.removeItem(USER_KEY);
  }
  getUser(): User {
    const user = JSON.parse(window.localStorage.getItem(USER_KEY) ?? 'null');
    return user ? User.fromJson(user) : User.empty();
  }

  isLoggedIn() {
    // return this.getToken() != '';
    return this.getExpiredTime() > new Date().getTime();
  }
  getExpiredTime() {
    const expiredTimeStr = window.localStorage.getItem(EXPIRED_TIME) ?? '';
    const expiredTime = new Date(expiredTimeStr);
    if (isNaN(expiredTime.getTime())) return 0;

    return expiredTime.getTime();
  }
}
