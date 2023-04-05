import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthCredential, IAuthService } from '@domain/auth/i-auth-service';
import { catchError, map } from 'rxjs';
import { DBHelper } from '../helper/helper';
import { SERVER_API } from './interceptor';

const TOKEN_KEY = 'access_token';
const EMAIL_KEY = 'email';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements IAuthService {
  constructor(
    private http: HttpClient,
  ) { }

  signIn(credential: IAuthCredential) {
    return this.http
      .post(SERVER_API + '/auth/sign_in', credential.toJson())
      .pipe(
        catchError(DBHelper.handleError('POST sign_in', Error('Server Error'))),
        map((data: any) => {
          if (TOKEN_KEY in data) {
            this.setToken(data);
          } else {
            data.error = true;
            data.message = data;
          }
          return data;
        })
      );
  }

  signOut() {
    this.removeToken();
  }

  public getToken() {
    return window.localStorage.getItem(TOKEN_KEY) ?? '';
  }

  public setToken(data: any) {
    window.localStorage.setItem(TOKEN_KEY, data[TOKEN_KEY]);
  }

  public removeToken() {
    window.localStorage.removeItem(TOKEN_KEY);
  }

  public setEmail(email: string) {
    window.localStorage.setItem(EMAIL_KEY, email);
  }

  public getEmail() {
    return window.localStorage.getItem(EMAIL_KEY);
  }
}
