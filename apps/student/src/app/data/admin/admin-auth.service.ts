import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { Auth } from '@angular/fire/auth';
import { TOKEN_HEADER_KEY, serverApi } from '@data/auth/interceptor';
import { chatServerApi } from '@data/chat/chat.service';
import { DBHelper } from '@data/helper/helper';
import { IAuthCredential, IAuthService } from '@domain/auth/i-auth-service';
import { environment } from '@environments';
import { GoogleAuthProvider, browserPopupRedirectResolver, signInWithPopup } from 'firebase/auth';
import { catchError, firstValueFrom, map } from 'rxjs';
import { CURRENT_ADMIN } from './admin-service.service';

const TOKEN_KEY = 'flutter.access_token';
const REFRESH_TOKEN_KEY = 'flutter.refresh_token';
const USER_ROLE = 'role';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService implements IAuthService {
  // firebase = inject(FirebaseApp);
  afAuth = inject(Auth);
  constructor(
    private http: HttpClient,
    // private trackingService: TrackingService,
    // private knowledgeService: KnowledgeService,
    private backend: HttpBackend
  ) {
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        localStorage.setItem(CURRENT_ADMIN, JSON.stringify(user));
        // JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem(CURRENT_ADMIN, 'null');
        // JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  signIn(credential: IAuthCredential) {
    const hostName = serverApi();
    return this.http.post(`${hostName}/auth/sign_in`, credential.toJson()).pipe(
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
          // this.trackingService.init();
        } else {
          data['error'] = true;
          data['message'] = data;
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
    this.afAuth.signOut();
    this.removeToken();
    this.removeRefreshToken();
    // this.trackingService.resetTracking();
    // this.knowledgeService.removeSelectedProgram();
    // this.knowledgeService.removeSelectedLearningGoal();
  }

  public getToken(): string {
    if (window.localStorage.getItem(CURRENT_ADMIN) != null)
      return JSON.parse(window.localStorage.getItem(CURRENT_ADMIN)!).stsTokenManager.accessToken;
    return window.localStorage.getItem(TOKEN_KEY) ?? '';
  }

  public getRefreshToken() {
    return window.localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  public setToken(data: Record<string, string>) {
    window.localStorage.setItem(TOKEN_KEY, data[TOKEN_KEY]);
  }

  public setRefreshToken(data: Record<string, string>) {
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

  async googleSignIn(): Promise<boolean> {
    try {
      console.log('googleSignIn');
      // browserPopupRedirectResolver;
      await signInWithPopup(this.afAuth, new GoogleAuthProvider(), browserPopupRedirectResolver);
      // console.log(this.afAuth.currentUser);
      const adminToken = await this.afAuth.currentUser?.getIdToken();
      // console.log(adminToken);

      const http = new HttpClient(this.backend);
      const contentType = 'application/json';
      const options = {
        headers: new HttpHeaders().set(TOKEN_HEADER_KEY, `Bearer ${adminToken}`).set('Content-Type', contentType),
      };

      const isAdmin = await firstValueFrom(http.post(chatServerApi + '/isAdmin', null, options));
      console.log(isAdmin);

      // const user = userCred.user;
      // if (user) {
      //   return user;
      // } else {
      //   return null;
      // }

      // await getRedirectResult(this.afAuth, browserPopupRedirectResolver);
      console.log('googleSignIn end');
      return true;
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code;
        const errorMessage = error.message;
        // eslint-disable-next-line valid-typeof
        if (typeof error === 'object') {
          // console.log(error.email);
        }
        const credential = GoogleAuthProvider.credentialFromError(error);
        const email = credential != null ? credential!.signInMethod : '';
        console.log(errorCode, errorMessage, email, credential);
      }
      return false;
    }
  }
}
