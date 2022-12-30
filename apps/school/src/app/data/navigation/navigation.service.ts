import { Injectable } from '@angular/core';
// import { RedirectAfterLogin } from '../../domain/navigation/i-redirect';
import { AppPaths } from '@view/routes';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  paths: AppPaths;
  constructor() {
    this.paths = new AppPaths();
  }

  getRouteAfterLogin(redirectString: string): string {
    switch (redirectString) {
      // case RedirectAfterLogin[RedirectAfterLogin.HomePage]:
      //   return this.paths.home.path;
      // case RedirectAfterLogin[RedirectAfterLogin.LearningPath]:
      //   return this.paths.learningPath.path;
      // case RedirectAfterLogin[RedirectAfterLogin.DiagnosticTest]:
      //   return this.paths.classProgram.path;
      // case RedirectAfterLogin[RedirectAfterLogin.MockTest]:
      //   return this.paths.mockTest.path;
      // case RedirectAfterLogin[RedirectAfterLogin.ReferralMockTest]:
      //   return this.paths.mockTestTest.path;
      default:
        return this.paths.home.path;
    }
  }
}
