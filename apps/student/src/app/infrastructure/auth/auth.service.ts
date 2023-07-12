import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthCredential, IAuthService } from '@domain/auth/i-auth-service';
import { sandboxAccounts } from '@domain/auth/sandbox-account';
import { environment } from '@environments/environment';
import { DBHelper } from '@infrastructure/helper/helper';
import { catchError, map } from 'rxjs';
import { KnowledgeService } from '../knowledge/knowledge.service';
import { TrackingService } from '../tracking/tracking.service';
import { UserService } from '../user/user.service';
import { TOKEN_HEADER_KEY, serverApi } from './interceptor';

const TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_ROLE = 'role';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements IAuthService {
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private trackingService: TrackingService,
    private knowledgeService: KnowledgeService,
    private backend: HttpBackend
  ) {}

  signIn(credential: IAuthCredential) {
    if (sandboxAccounts.includes(credential.email)) {
      window.localStorage.setItem('dev', 'true');
    } else {
      window.localStorage.removeItem('dev');
    }
    return this.http.post(`${serverApi()}/auth/sign_in`, credential.toJson()).pipe(
      catchError(DBHelper.handleError('POST sign_in', Error('Server Error'))),
      map((data: any) => {
        if (TOKEN_KEY in data && REFRESH_TOKEN_KEY in data) {
          if (data[USER_ROLE] !== environment.name)
            return {
              error: true,
              message: 'Domain specific error.',
            };
          this.setToken(data);
          this.setRefreshToken(data);
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
    if (window.localStorage.getItem('dev') === 'true') {
      const request = this.http.get(`${serverApi()}/auth/sign_out`).subscribe({
        next: () => {
          request.unsubscribe();
        },
      });
    }
    this.removeToken();
    this.removeRefreshToken();
    this.userService.removeCurrentUser();
    this.trackingService.resetTracking();
    this.knowledgeService.removeSelectedProgram();
    this.knowledgeService.removeSelectedLearningGoal();
  }

  public getToken() {
    return window.localStorage.getItem(TOKEN_KEY) ?? '';
  }

  public getRefreshToken() {
    return window.localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  public setToken(data: any) {
    window.localStorage.setItem(TOKEN_KEY, data[TOKEN_KEY]);
  }

  public setRefreshToken(data: any) {
    window.localStorage.setItem(REFRESH_TOKEN_KEY, data[REFRESH_TOKEN_KEY]);
  }

  public removeToken() {
    window.localStorage.removeItem(TOKEN_KEY);
  }

  public removeRefreshToken() {
    window.localStorage.removeItem(REFRESH_TOKEN_KEY);
  }

  refreshToken(refreshToken: string) {
    const http = new HttpClient(this.backend);
    const contentType = 'application/json';
    const options = {
      headers: new HttpHeaders().set(TOKEN_HEADER_KEY, `Bearer ${refreshToken}`).set('Content-Type', contentType),
    };
    return http.post(`${serverApi()}/auth/refresh`, {}, options);
  }
}
