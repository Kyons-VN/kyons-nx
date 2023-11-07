import { Routes } from '@angular/router';
import { HomeComponent } from '@view/pages/home/home.component';
import { PageNotFoundComponent } from '@view/pages/page-not-found/page-not-found.component';
import { SignInComponent } from '@view/pages/sign-in/sign-in.component';
import { SignOutComponent } from '@view/pages/sign-out/sign-out.component';
import { authGuard } from './auth.guard';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';

/**
 * This routes will be used to genarate the app's sitemap.
 * For development build on Firebase we need the hash tag (#) to work with host like web.app/domain/
 * but for production we strip it out. That's why we have 2 app-routing.module files.
 */

class AppPaths {
  home = { name: 'Trang chủ', path: '/' };
  signIn = { name: 'Trang đăng nhập', path: '/sign-in/' };
  signOut = { name: 'Thoát', path: '/sign-out/' };
  resetPassword = { name: '', path: '/reset-password/' };
  changePassword = { name: '', path: '/change-password/' };
}

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [authGuard],
  },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-out', component: SignOutComponent },
  {
    path: 'reset-password',
    loadComponent: () => import('./pages/reset-password/reset-password.component').then(m => m.ResetPasswordComponent),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
  },
];

export { AppPaths, appRoutes };
