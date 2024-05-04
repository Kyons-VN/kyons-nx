import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AdminAuthService } from '@data/admin/admin-auth.service';

import { NavigationService } from '@data/navigation/navigation.service';

// @Injectable({ providedIn: 'root' })
// export class AdminAuthGuard implements CanActivate {
//   platformId = inject(PLATFORM_ID);

//   constructor(private router: Router, private authenticationService: AuthService, navService: NavigationService) {
//     this.paths = navService.paths;
//   }

//   paths: AppPaths;

//   async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     if (window.localStorage.getItem('dev')) return true;
//     const token = this.authenticationService.getToken();

//     if (token !== '') {
//       // check if route is restricted by role
//       // if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
//       //     // role not authorised so redirect to home page
//       //     this.router.navigate(['/']);
//       //     return false;
//       // }

//       // authorised so return true
//       return true;
//     }

//     // not logged in so redirect to login page with the return url
//     this.router.navigate([this.paths.signIn.path], {
//       queryParams: { returnUrl: state.url },
//     });
//     return false;
//   }
// }

@Injectable({
  providedIn: 'root',
})
class AdminPermissionsService {
  // constructor(private router: Router) {}
  router = inject(Router);
  authenticationService = inject(AdminAuthService);
  paths = inject(NavigationService).paths;

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.authenticationService.getToken();

    if (token !== '') {
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate([this.paths.adminSignIn.path], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}

export const AdminAuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(AdminPermissionsService).canActivate(next, state);
};
