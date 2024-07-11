import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LayoutFullComponent } from './layouts/full/layout-full.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { ProfileComponent } from './pages/account-page/components/profile.component';
import { VerifyPage } from './pages/email-verification/email-verification.component';
import { GiftComponent } from './pages/gift/gift.component';
import { HomeComponent } from './pages/home/home.component';
import { LearningPathComponent } from './pages/learning-path/learning-path.component';
import { LessonPageComponent } from './pages/lesson-page/lesson-page.component';
import { LessonReviewPageComponent } from './pages/lesson-page/review/lesson-review-page.component';
import { MockTestResultComponent } from './pages/mock-test/result/mock-test-result.component';
import { MockTestReviewComponent } from './pages/mock-test/review/mock-test-review.component';
import { MockTestSelectProgramComponent } from './pages/mock-test/select-program/select-program.component';
import { SelectTopicComponent } from './pages/mock-test/select-topic/select-topic.component';
import { MockTestShareComponent } from './pages/mock-test/share/share.component';
import { MockTestTestComponent } from './pages/mock-test/test/mock-test-test.component';
// import { NewUserComponent } from './pages/new-user/new-user.component';
import { AdminAuthGuard } from './admin-auth.guard';
import { ChatbotComponent } from './pages/chatbot/chatbot.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { TestComponent } from './pages/test/test.component';
import { TutorialLessonComponent } from './share-components/tutorial/lesson/tutorial-lesson.component';
import { TutorialTestComponent } from './share-components/tutorial/test/tutorial-test.component';

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
  classProgram = { name: 'Trang chọn mục tiêu', path: '/mock-test/' };
  test = { name: 'Test', path: '/test/' };
  learningPath = { name: '', path: '/learning-path/' };
  lessonPage = { name: '', path: '/learning-path/lesson-page/:id' };
  lessonPageTutorial = { name: '', path: '/learning-path/lesson-page-tutorial' };
  lessonReviewPage = { name: '', path: '/learning-path/lesson-page/:id/review' };
  learningPathComplete = { name: '', path: '/learning-path/complete/' };
  profile = { name: '', path: '/profile/' };
  pageNotfound = { name: '', path: '/page-not-found/' };
  resetPassword = { name: '', path: '/reset-password/' };
  account = { name: '', path: '/account/' };
  package = { name: '', path: '/account/package/' };
  mockTest = { name: '', path: '/mock-test/' };
  mockTestResult = { name: '', path: '/mock-test/:id/result/' };
  mockTestReview = { name: '', path: '/mock-test/:id/review/' };
  mockTestSelect = { name: '', path: '/mock-test/:id/select/' };
  mockTestTest = { name: '', path: '/mock-test/:id/test/' };
  mockTestTestTutorial = { name: '', path: '/mock-test/tutorial/1' };
  mockTestShare = { name: '', path: '/share-mocktest/:ref' };
  gift = { name: '', path: '/promotions/:event' };
  newUser = { name: '', path: '/new-user/' };
  termsOfService = { name: '', path: '/terms-of-service' };
  chatbot = { name: 'Chatbot', path: '/chatbot' };
  chat = { name: 'Chat', path: '/chatbot/chat/:id' };
  files = { name: 'File Manager', path: '/chatbot/files/' };
  adminDashboard = { name: 'Admin Dashboard', path: '/admin/dashboard' };
  adminSignIn = { name: 'Admin Signin', path: '/admin/sign-in' };
  fileManager = { name: 'File Manager', path: '/file-manager' };
}

const routes: Routes = [
  {
    path: '',
    component: LayoutFullComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'learning-path',
        children: [
          { path: '', component: LearningPathComponent },
          { path: 'lesson-page/:id', component: LessonPageComponent },
          { path: 'lesson-page/:id/review', component: LessonReviewPageComponent },
          { path: 'lesson-page-tutorial', component: TutorialLessonComponent },
          {
            path: 'complete',
            loadComponent: () =>
              import('./pages/learning-path/complete/leanring-path-complete.component').then(
                m => m.LearningPathCompleteComponent
              ),
          },
        ],
      },
      {
        path: 'mock-test',
        children: [
          { path: '', component: MockTestSelectProgramComponent },
          {
            path: ':id',
            children: [
              { path: 'select', component: SelectTopicComponent },
              { path: 'test', component: MockTestTestComponent },
              { path: 'result', component: MockTestResultComponent },
              { path: 'review', component: MockTestReviewComponent },
            ],
          },
          { path: 'select/:id', component: SelectTopicComponent },
          { path: 'test/:id', component: MockTestTestComponent },
          { path: 'share/:id', component: MockTestShareComponent },
          {
            path: 'tutorial/:id',
            component: TutorialTestComponent,
          },
        ],
      },
      { path: 'share-mocktest/:ref', component: MockTestShareComponent },
      { path: 'promotions/:event', component: GiftComponent },
      { path: 'file-manager', loadComponent: () => import('./pages/file-manager/file-manager.component').then(m => m.FileManagerComponent) },
    ],
  },
  {
    path: '',
    component: LayoutFullComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'account',
        children: [
          { path: '', component: AccountPageComponent },
        ],
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: 'test', component: TestComponent },
  {
    path: '',
    component: LayoutFullComponent,
    children: [
      { path: 'sign-in', loadComponent: () => import('./pages/sign-in/sign-in.component').then(m => m.SignInComponent) },]
  },
  {
    path: 'sign-out',
    loadComponent: () => import('./pages/sign-out/sign-out.component').then(m => m.SignOutComponent),
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./pages/reset-password/reset-password.component').then(m => m.ResetPasswordComponent),
  },
  {
    path: 'sign-up',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/sign-up/sign-up.component').then(m => m.SignUpComponent),
      },
      {
        path: 'unverified-account',
        loadComponent: () =>
          import('./pages/sign-up/unverified-account.component').then(m => m.UnverifiedAccountComponent),
      },
      {
        path: 'resend-verified',
        loadComponent: () => import('./pages/sign-up/resend-verified.component').then(m => m.ResendVerifiedComponent),
      },
    ],
  },
  {
    path: 'admin',
    component: LayoutFullComponent,
    canActivate: [AdminAuthGuard],
    children: [
      {
        path: '',
        component: ChatbotComponent,
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/admin/dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
      },
    ],
  },
  {
    path: 'admin/sign-in',
    loadComponent: () => import('./pages/admin/sign-in/admin-sign-in.component').then(m => m.AdminSignInComponent),
  },
  {
    path: 'admin/sign-out',
    loadComponent: () => import('./pages/admin/sign-out/sign-out.component').then(m => m.AdminSignOutComponent),
  },
  {
    path: 'email-verification',
    children: [
      {
        path: VerifyPage.verifySuccess,
        loadComponent: () =>
          import('./pages/email-verification/email-verification.component').then(m => m.EmailVerificationComponent),
      },
      {
        path: VerifyPage.verifyFail,
        loadComponent: () =>
          import('./pages/email-verification/email-verification.component').then(m => m.EmailVerificationComponent),
      },
    ],
  },
  {
    path: 'design',
    children: [
      { path: 'buttons', loadComponent: () => import('./pages/design/button.component').then(m => m.TestButtonComponent) },
      { path: 'icons', loadComponent: () => import('./pages/design/icon.component').then(m => m.TestIconComponent) },

    ],
  },
  {
    path: 'terms-of-service',
    loadComponent: () =>
      import('./pages/terms-of-service/terms-of-service.component').then(m => m.TermsOfServiceComponent),
  },
  {
    path: 'flashcard/:id',
    loadComponent: () => import('./pages/flashcard/flashcard.component').then(m => m.FlashcardComponent),
  },
  {
    path: 'event/math',
    loadComponent: () => import('./pages/event/event.component').then(m => m.EventComponent),
  },
  {
    path: 'chatbot',
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
      },
      {
        path: 'files',
        component: ChatbotComponent,
      },
    ],
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

export { AppPaths, routes };

