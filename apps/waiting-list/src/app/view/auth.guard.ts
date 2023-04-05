import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';

import { AuthService } from '../data/auth/auth.service';
import { NavigationService } from '../data/navigation/navigation.service';
import { AppPaths } from './app.routes';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthService,
    navService: NavigationService
  ) {
    this.paths = navService.paths;
  }

  paths: AppPaths;

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.authenticationService.getToken();
    const email = this.authenticationService.getEmail();
    if (token !== '' && email !== '') {
      // check if route is restricted by role
      // if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
      //     // role not authorised so redirect to home page
      //     this.router.navigate(['/']);
      //     return false;
      // }

      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate([this.paths.waitingList.path], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
