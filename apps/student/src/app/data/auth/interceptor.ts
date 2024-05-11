import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Router } from '@angular/router';
import { AppPaths } from '@view/routes';
import { Observable, catchError, switchMap, throwError, timeout } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NavigationService } from '../navigation/navigation.service';
import { AuthService } from './auth.service';

export const TOKEN_HEADER_KEY = 'Authorization'; // for Spring Boot back-end
export const serverApi = () => {
  if (window.localStorage.getItem('dev') === 'true') return 'https://us-central1-kyonsvn.cloudfunctions.net/v1';
  // if (window.localStorage.getItem('dev') === 'true') return 'http://127.0.0.1:5001/kyonsvn/us-central1/v1';
  return environment.serverApi;
};

export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  paths: AppPaths;
  constructor(
    private auth: AuthService,
    private router: Router,
    navService: NavigationService,
    @Inject(DEFAULT_TIMEOUT) protected defaultTimeout: number
  ) {
    this.paths = navService.paths;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.auth.getToken();
    const contentType = req.headers.get('Content-Type') ?? 'application/json';
    if (token !== '') {
      authReq = req.clone({
        headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token).set('Content-Type', contentType),
      });
    }
    const timeoutValue = req.headers.get('timeout') || this.defaultTimeout;
    const timeoutValueNumeric = Number(timeoutValue);
    return next
      .handle(authReq)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            console.log('this is client side error');
            return throwError(() => error.error);
          } else {
            console.log('this is server side error');
            if (error.status === 401) {
              return this.handleRefreshToken(authReq, req, next, contentType);
            }
            else {
              return throwError(() => error.error);
            }
          }
        })
      )
      .pipe(timeout(timeoutValueNumeric));
  }

  // handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead

  //     // TODO: better job of transforming error for user consumption
  //     console.log(`${operation} failed: ${error.message}`);
  //     // if (error.status === 401) {
  //     //   const refreshToken = this.auth.getRefreshToken();
  //     //   if (refreshToken !== null) {
  //     //     const result = lastValueFrom(this.auth.refreshToken(refreshToken));
  //     //     console.log(result);
  //     //     if (result != null) this.auth.setToken(result);
  //     //     else this.forceSignOut();
  //     //   } else {
  //     //     this.forceSignOut();
  //     //   }
  //     // }
  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }

  forceSignOut() {
    this.auth.signOut();
    setTimeout(() => {
      this.router.navigate([this.paths.signIn.path]);
    }, 100);
  }

  private redirectToHome() {
    this.router.navigate([this.paths.home.path]);
  }

  handleRefreshToken(authReq: HttpRequest<any>, req: HttpRequest<any>, next: HttpHandler, contentType: string) {
    const refreshToken = this.auth.getRefreshToken();
    if (refreshToken && refreshToken !== 'undefined') {
      return this.auth.refreshToken(refreshToken).pipe(
        switchMap((value: any) => {
          if (value.access_token === undefined || value.access_token === null || value.access_token === 'undefined') {
            this.forceSignOut();
            return throwError(() => 'Response no access_token');
          }
          this.auth.setToken(value);
          authReq = req.clone({
            headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + value.access_token).set('Content-Type', contentType),
          });
          return next.handle(authReq);
        }),
        catchError((e) => {
          console.log(e);
          this.forceSignOut();
          return throwError(() => 'Invalid refreshToken');
        })
      );
    } else {
      this.forceSignOut();
      return throwError(() => 'No refreshToken');
    }
  }
}

export const authInterceptorProviders = [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }];
