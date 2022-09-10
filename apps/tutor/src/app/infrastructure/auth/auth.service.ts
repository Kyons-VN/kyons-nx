import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IAuth, IAuthCredential } from '../../domain/auth/auth';
import { DBHelper } from '../helper/helper';
import { UserService } from '../user.service';
import { SERVER_API } from './intercepter';

const TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_ROLE = 'role';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuth {
  constructor(private http: HttpClient, private userService: UserService) { }

  signIn(credential: IAuthCredential) {
    return this.http.post(SERVER_API + '/auth/sign_in', credential.toJson()).pipe(
      catchError(DBHelper.handleError('POST sign_in', null)),
      map((data: any) => {
        if (TOKEN_KEY in data && REFRESH_TOKEN_KEY in data) {
          if (data[USER_ROLE] !== environment.name) return {
            error: true,
            message: 'Domain specific error.',
          };
          this.setToken(data);
          this.userService.updateCurrentUser(data['sub'], data['email']);
        }
        else {
          data.error = true;
          data.message = data;
        }
        return data;
      })
    );
  }

  signOut() {
    window.sessionStorage.clear();
    window.localStorage.clear();
  };

  public getToken() {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public getRefreshToken() {
    return window.sessionStorage.getItem(REFRESH_TOKEN_KEY);
  }

  public setToken(data: any) {
    window.sessionStorage.setItem(TOKEN_KEY, data[TOKEN_KEY]);
    window.sessionStorage.setItem(REFRESH_TOKEN_KEY, data[REFRESH_TOKEN_KEY]);
  }

  public removeToken() {
    window.sessionStorage.removeItem(TOKEN_KEY);
  }

  refreshToken(refreshToken: string) {
    return this.http.post(SERVER_API + '/auth/refresh', {}, {
      headers: {
        'Authorization': 'Bearer ' + refreshToken
      }
    });
  }
}
