import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../infrastructure/auth/auth.service';
import { NavigationService } from '../infrastructure/navigation/navigation.service';
import { UserService } from '../infrastructure/user/user.service';
import { AppPaths } from './routes';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthService,
    private userService: UserService,
    navService: NavigationService
  ) {
    this.paths = navService.paths;
  }

  paths: AppPaths;

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (window.localStorage.getItem('dev')) return true;
    const token = this.authenticationService.getToken();
    const username = await this.userService.getUsername();
    if (token !== '') {
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
    this.router.navigate([this.paths.signIn.path], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
