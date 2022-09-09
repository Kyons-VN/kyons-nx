import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IAuth, IAuthCredential } from '../../domain/auth/auth';
import { DBHelper } from '../helper/helper';
import { KnowledgeService } from '../knowledge/knowledge.service';
import { TrackingService } from '../tracking.service';
import { UserService } from '../user/user.service';
import { SERVER_API } from './interceptor';

const TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_ROLE = 'role';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements IAuth {
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private trackingService: TrackingService,
    private knowledgeService: KnowledgeService
  ) {}

  signIn(credential: IAuthCredential) {
    return this.http
      .post(SERVER_API + '/auth/sign_in', credential.toJson())
      .pipe(
        catchError(DBHelper.handleError('POST sign_in', null)),
        map((data: any) => {
          if (TOKEN_KEY in data && REFRESH_TOKEN_KEY in data) {
            if (data[USER_ROLE] !== environment.name)
              return {
                error: true,
                message: 'Domain specific error.',
              };
            this.setToken(data);
            this.userService.updateCurrentUser(data['sub'], data['email']);
            this.trackingService.init();
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
    this.userService.removeCurrentUser();
    this.trackingService.removeTracking();
    this.knowledgeService.removeSelectedProgram();
  }

  public getToken() {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  public getRefreshToken() {
    return window.localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  public setToken(data: any) {
    window.localStorage.setItem(TOKEN_KEY, data[TOKEN_KEY]);
    window.localStorage.setItem(REFRESH_TOKEN_KEY, data[REFRESH_TOKEN_KEY]);
  }

  public removeToken() {
    window.localStorage.removeItem(TOKEN_KEY);
    // window.localStorage.removeItem(REFRESH_TOKEN_KEY);
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
}
