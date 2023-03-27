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
const INTEGRATE_REFRESH_TOKEN_KEY = 'integrate_refresh_token';
const USER_ROLE = 'role';
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
    return this.http.post(SERVER_API + '/student/sign_in', credential.toJson())
      .pipe(
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
    window.localStorage.setItem(TOKEN_KEY, data[TOKEN_KEY]);
    window.localStorage.setItem(REFRESH_TOKEN_KEY, data[REFRESH_TOKEN_KEY]);
    window.localStorage.setItem(INTEGRATE_TOKEN_KEY, data[INTEGRATE_TOKEN_KEY]);
    window.localStorage.setItem(INTEGRATE_REFRESH_TOKEN_KEY, data[INTEGRATE_REFRESH_TOKEN_KEY]);
  }

  public removeToken() {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(REFRESH_TOKEN_KEY);
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

  setUser(user: User) {
    window.localStorage.setItem(USER_KEY, JSON.stringify(user.toJson()));
  }
  getUser(): User {
    const user = JSON.parse(window.localStorage.getItem(USER_KEY) ?? '');
    return User.fromJson(user);
  }

  isLoggedIn() {
    return this.getToken() != '';
  };
}
