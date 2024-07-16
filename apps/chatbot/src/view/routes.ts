import { Routes } from '@angular/router';
import { ChatbotComponent } from '../app/chatbot/chatbot.component';
import { AuthGuard } from './auth.guard';
import { LayoutFullComponent } from './layouts/full/layout-full.component';

/**
 * This routes will be used to genarate the app's sitemap.
 * For development build on Firebase we need the hash tag (#) to work with host like web.app/domain/
 * but for production we strip it out. That's why we have 2 app-routing.module files.
 */

class AppPaths {
  account = { name: '', path: '/account' };
  adminDashboard = { name: 'Admin Dashboard', path: '/admin/dashboard' };
  adminSignIn = { name: 'Admin Signin', path: '/admin/sign-in' };
  chat = { name: 'Chat', path: '/chat/:id' };
  // chat = { name: 'Chat', path: '/chatbot/chat/:id' };
  home = { name: 'Chatbot', path: '/' };
  // home = { name: 'Trang chủ', path: '/' };
  package = { name: '', path: '/account/package/' };
  pageNotfound = { name: '', path: '/page-not-found/' };
  profile = { name: '', path: '/profile/' };
  resendVerified = { name: 'Gửi lại email xác thực', path: '/sign-up/resend-verified/' };
  resetPassword = { name: '', path: '/reset-password/' };
  signIn = { name: 'Trang đăng nhập', path: '/sign-in/' };
  signOut = { name: 'Thoát', path: '/sign-out/' };
  signUp = { name: 'Trang đăng ký', path: '/sign-up/' };
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
        component: ChatbotComponent,
      },
      {
        path: 'chat/:id',
        component: ChatbotComponent,
      }
    ],
  },
  {
    path: 'admin/sign-in',
    loadComponent: () => import('../app/admin/sign-in/admin-sign-in.component').then(m => m.AdminSignInComponent),
  },
  { path: 'sign-in', loadComponent: () => import('../app/sign-in/sign-in.component').then(m => m.SignInComponent) },
  {
    path: 'sign-out',
    loadComponent: () => import('../app/sign-out/sign-out.component').then(m => m.SignOutComponent),
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
    path: 'test',
    loadComponent: () => import('../app/test/test.component').then(m => m.TestComponent),
  },
  {
    path: 'terms-of-service',
    loadComponent: () =>
      import('../app/terms-of-service/terms-of-service.component').then(m => m.TermsOfServiceComponent),
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

