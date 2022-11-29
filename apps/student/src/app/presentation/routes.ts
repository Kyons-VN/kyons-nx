import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { DiagnosticTestDecisionComponent } from './pages/diagnostic-test-decision/diagnostic-test-decision.component';
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

class AppPath {
  home = '/';
  signIn = '/sign-in/';
  signOut = '/sign-out/';
  signUp = '/sign-up/';
  classProgram = '/mock-test/';
  test = '/test/';
  diagnosticTestDecision = '/diagnostic-test-decision/';
  diagnosticTest = '/diagnostic-test/';
  learningPath = '/learning-path/';
  lessonPage = '/learning-path/lesson-page/';
  diagnosticTestComplete = '/diagnostic-test/test-complete/';
  waitingForTutor = '/waiting-for-tutor/';
  profile = '/profile/';
  pageNotfound = '/page-not-found/';
  newLesson = '/new-lesson/';
  finalExam = '/final-exam/';
  resetPassword = '/reset-password/';
  account = '/account/';
  package = '/account/package/';
  mockTest = '/mock-test/';
  mockTestSelect = '/mock-test/:id/select/';
  mockTestTest = '/mock-test/:id/test/';
  mockTestShare = '/mock-test/:id/share/';
  newUser = '/new-user/';
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
          { path: 'share', component: MockTestShareComponent },

        ]
      },
      { path: 'select/:id', component: SelectTopicComponent },
      { path: 'test/:id', component: MockTestTestComponent },
      { path: 'share/:id', component: MockTestShareComponent },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'test',
    component: TestComponent,
  },
  {
    path: 'diagnostic-test-decision',
    component: DiagnosticTestDecisionComponent,
    canActivate: [AuthGuard],
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
    loadComponent: () => import('./pages/sign-up/sign-up.component').then(m => m.SignUpComponent)
  },
  {
    path: 'new-user',
    component: NewUserComponent,
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

export { routes, AppPath };

