import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppPaths } from '@view/routes';
import { Observable, catchError, lastValueFrom, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NavigationService } from '../navigation/navigation.service';
import { AuthService } from './auth.service';

const TOKEN_HEADER_KEY = 'Authorization'; // for Spring Boot back-end
export const SERVER_API = environment.serverApi;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  paths: AppPaths;
  constructor(private auth: AuthService, private router: Router, navService: NavigationService) {
    this.paths = navService.paths;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.hasExpiredToken()) {
      this.auth.removeToken();
    }
    let authReq = req;
    const token = this.auth.getToken();
    const contentType = req.headers.get('Content-Type') ?? 'application/json';
    if (token !== '') {
      authReq = req.clone({
        headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token).set('Content-Type', contentType),
      });
    }
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          console.log('this is client side error');
          errorMsg = `Error: ${error.error.message}`;
        } else {
          console.log('this is server side error');
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          if (error.status === 401) {
            this.auth.removeToken();
            const refreshToken = this.auth.getRefreshToken();
            if (refreshToken && refreshToken !== 'undefined') {
              lastValueFrom(this.auth.refreshToken(refreshToken)).then(value => {
                console.log(value);
                this.auth.setToken(value);
                authReq = req.clone({
                  headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + value).set('Content-Type', contentType),
                });
                next.handle(authReq).subscribe({
                  error: e => {
                    console.log(e);
                    this.forceSignOut();
                  },
                });
              });
            } else {
              // this.forceSignOut();
              console.log('forceSignOut');
            }
          } // else this.redirectToHome();
        }
        console.log(errorMsg);
        return throwError(() => error.error);
      })
    );
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      if (error.status === 401) {
        const refreshToken = this.auth.getRefreshToken();
        if (refreshToken !== null) {
          const result = lastValueFrom(this.auth.refreshToken(refreshToken));
          console.log(result);
          if (result != null) this.auth.setToken(result);
          else this.forceSignOut();
        } else {
          this.forceSignOut();
        }
      }
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  forceSignOut() {
    this.auth.signOut();
    setTimeout(() => {
      this.router.navigate([this.paths.signIn.path]);
    }, 100);
  }

  private redirectToHome() {
    this.router.navigate([this.paths.home.path]);
  }
}

export const authInterceptorProviders = [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }];
