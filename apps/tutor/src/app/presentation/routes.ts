import { AuthGuard } from "./auth.guard";
import { HomeComponent } from "./pages/home/home.component";
import { LatestTestsComponent } from "./pages/latest-tests/latest-tests.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { SignInComponent } from "./pages/sign-in/sign-in.component";
import { SignOutComponent } from "./pages/sign-out/sign-out.component";
import { TestResultComponent } from "./pages/test-result/test-result.component";
import { UpdateGoogleMeetComponent } from "./pages/update-google-meet/update-google-meet.component";
import { UpdateLearningPathComponent } from "./pages/update-learning-path/update-learning-path.component";

class AppPath {
  home = '/';
  signIn = '/sign-in/';
  signOut = '/sign-out/';
  latestTest = '/update-learning-path/'
  updateLearningPath = '/update-learning-path/update/';
  testResult = '/update-learning-path/test-result/';
  updateGoogleMeet = '/update-google-meet/';
}

/**
 * This routes will be used to genarate the app's sitemap.
 * For development build on Firebase we need the hash tag (#) to work with host like web.app/domain/
 * but for production we strip it out. That's why we have 2 tutor-routing.module files.
 */
const routes = [
  {
    path: '', component: HomeComponent,
    canActivate: [AuthGuard],
  },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-out', component: SignOutComponent },
  { path: 'update-google-meet', component: UpdateGoogleMeetComponent },
  {
    path: 'update-learning-path',
    children: [
      { path: '', component: LatestTestsComponent },
      { path: 'update/:studentId/:testId', component: UpdateLearningPathComponent },
      { path: 'test-result/:id', component: TestResultComponent }
    ],
    canActivate: [AuthGuard],
  },
  { path: '**', component: PageNotFoundComponent },
];

export { routes, AppPath };

