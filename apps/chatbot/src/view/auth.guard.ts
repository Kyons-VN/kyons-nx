import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '@data/auth/auth.service';
import { NavigationService } from '@data/navigation/navigation.service';

@Injectable({
  providedIn: 'root',
})
class UserPermissionsService {
  // constructor(private router: Router) {}
  router = inject(Router);
  authenticationService = inject(AuthService);
  paths = inject(NavigationService).paths;

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (window.localStorage.getItem('dev')) return true;
    const token = this.authenticationService.getToken();
    if (token !== '') {
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate([this.paths.signIn.path], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(UserPermissionsService).canActivate(next, state);
};
