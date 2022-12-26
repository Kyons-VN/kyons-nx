import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LeaveGuard } from './leave.guard';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { DiagnosticTestComponent } from './pages/diagnostic-test/diagnostic-test.component';
import { FinalExamComponent } from './pages/final-exam/final-exam.component';
import { HomeComponent } from './pages/home/home.component';
import { KnowledgeComponent } from './pages/knowledge/knowledge.component';
import { LearningPathComponent } from './pages/learning-path/learning-path.component';
import { LessonPageComponent } from './pages/lesson-page/lesson-page.component';
import { MockTestSelectProgramComponent } from './pages/mock-test/select-program/select-program.component';
import { SelectTopicComponent } from './pages/mock-test/select-topic/select-topic.component';
import { MockTestShareComponent } from './pages/mock-test/share/share.component';
import { MockTestTestComponent } from './pages/mock-test/test/mock-test-test.component';
import { NewLessonPageComponent } from './pages/new-lesson-page/new-lesson-page.component';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { PackagePageComponent } from './pages/package-page/package-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RatingTutorComponent } from './pages/rating-tutor/rating-tutor.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignOutComponent } from './pages/sign-out/sign-out.component';
import { TestComponent } from './pages/test/test.component';

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
  classProgram = { name: 'Trang chọn mục tiêu', path: '/mock-test/' };
  test = { name: 'Test', path: '/test/' };
  diagnosticTest = { name: '', path: '/diagnostic-test/' };
  learningPath = { name: '', path: '/learning-path/' };
  lessonPage = { name: '', path: '/learning-path/lesson-page/' };
  diagnosticTestComplete = { name: '', path: '/diagnostic-test/test-complete/' };
  waitingForTutor = { name: '', path: '/waiting-for-tutor/' };
  profile = { name: '', path: '/profile/' };
  pageNotfound = { name: '', path: '/page-not-found/' };
  newLesson = { name: '', path: '/new-lesson/' };
  finalExam = { name: '', path: '/final-exam/' };
  resetPassword = { name: '', path: '/reset-password/' };
  account = { name: '', path: '/account/' };
  package = { name: '', path: '/account/package/' };
  mockTest = { name: '', path: '/mock-test/' };
  mockTestSelect = { name: '', path: '/mock-test/:id/select/' };
  mockTestTest = { name: '', path: '/mock-test/:id/test/' };
  mockTestShare = { name: '', path: '/share-mocktest/:ref' };
  newUser = { name: '', path: '/new-user/' };
  termsOfService = { name: '', path: '/terms-of-service' };
}

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-out', component: SignOutComponent },
  {
    path: 'mock-test',
    children: [
      { path: '', component: MockTestSelectProgramComponent },
      {
        path: ':id', children: [
          { path: 'select', component: SelectTopicComponent },
          { path: 'test', component: MockTestTestComponent },
        ]
      },
      { path: 'select/:id', component: SelectTopicComponent },
      { path: 'test/:id', component: MockTestTestComponent },
      { path: 'share/:id', component: MockTestShareComponent },
    ],
    canActivate: [AuthGuard],
  },
  { path: 'share-mocktest/:ref', component: MockTestShareComponent },
  {
    path: 'test',
    component: TestComponent,
  },
  {
    path: 'diagnostic-test',
    component: DiagnosticTestComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'learning-path',
    children: [
      { path: '', component: LearningPathComponent },
      { path: 'lesson-page/:id', component: LessonPageComponent },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'knowledge',
    component: KnowledgeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'rating-tutor',
    component: RatingTutorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'new-lesson',
    component: NewLessonPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'final-exam/:programId',
    component: FinalExamComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'account',
    children: [
      { path: '', component: AccountPageComponent },
      { path: 'package', component: PackagePageComponent },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./pages/reset-password/reset-password.component').then(m => m.ResetPasswordComponent)
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./pages/sign-up/sign-up.component').then(m => m.SignUpComponent),
    canDeactivate: [LeaveGuard],
  },
  {
    path: 'new-user',
    component: NewUserComponent,
  },
  {
    path: 'terms-of-service',
    loadComponent: () => import('./pages/terms-of-service/terms-of-service.component').then(m => m.TermsOfServiceComponent)
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

export { routes, AppPaths };

