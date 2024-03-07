import { Routes } from '@angular/router';
import { ChatbotFindMeComponent } from '../app/find-me/find-me.component';
import { AuthGuard } from './auth.guard';
import { LayoutFullComponent } from './layouts/full/layout-full.component';

/**
 * This routes will be used to genarate the app's sitemap.
 * For development build on Firebase we need the hash tag (#) to work with host like web.app/domain/
 * but for production we strip it out. That's why we have 2 app-routing.module files.
 */

class AppPaths {
  home = { name: 'Trang chủ', path: '/' };
  signIn = { name: 'Trang đăng nhập', path: '/sign-in/' };
  signOut = { name: 'Thoát', path: '/sign-out/' };
  signUp = { name: 'Trang đăng ký', path: '/sign-up/' };
  resendVerified = { name: 'Gửi lại email xác thực', path: '/sign-up/resend-verified/' };
  profile = { name: '', path: '/profile/' };
  pageNotfound = { name: '', path: '/page-not-found/' };
  resetPassword = { name: '', path: '/reset-password/' };
  account = { name: '', path: '/account/' };
  package = { name: '', path: '/account/package/' };
  termsOfService = { name: '', path: '/terms-of-service' };
}

const routes: Routes = [
  {
    path: '',
    component: LayoutFullComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ChatbotFindMeComponent,
      },
    ],
  },
  { path: 'sign-in', loadComponent: () => import('../app/sign-in/sign-in.component').then(m => m.SignInComponent) },
  {
    path: 'sign-out',
    loadComponent: () => import('../app/sign-out/sign-out.component').then(m => m.SignOutComponent),
  },
  {
    path: 'reset-password',
    loadComponent: () => import('../app/reset-password/reset-password.component').then(m => m.ResetPasswordComponent),
  },
  {
    path: 'sign-up',
    children: [
      {
        path: '',
        loadComponent: () => import('../app/sign-up/sign-up.component').then(m => m.SignUpComponent),
      },
      {
        path: 'unverified-account',
        loadComponent: () =>
          import('../app/sign-up/unverified-account.component').then(m => m.UnverifiedAccountComponent),
      },
      {
        path: 'resend-verified',
        loadComponent: () => import('../app/sign-up/resend-verified.component').then(m => m.ResendVerifiedComponent),
      },
    ],
  },
  {
    path: 'email-verification',
    children: [
      {
        path: 'verify-success',
        loadComponent: () =>
          import('../app/email-verification/email-verification.component').then(m => m.EmailVerificationComponent),
      },
      {
        path: 'verify-fail',
        loadComponent: () =>
          import('../app/email-verification/email-verification.component').then(m => m.EmailVerificationComponent),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('../app/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent),
  },
  {
    path: 'page-not-found',
    loadComponent: () => import('../app/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent),
  },
];

export { AppPaths, routes };
