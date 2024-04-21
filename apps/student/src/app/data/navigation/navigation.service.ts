import { Injectable } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { AppPaths } from '@view/routes';
import { RedirectAfterLogin } from '../../domain/navigation/i-redirect';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  paths: AppPaths;
  constructor() {
    this.paths = new AppPaths();
  }

  getRouteAfterLogin(redirectString: string): [string, NavigationExtras | undefined] {
    switch (redirectString) {
      case RedirectAfterLogin[RedirectAfterLogin.HomePage]:
        return [this.paths.home.path, undefined];
      case RedirectAfterLogin[RedirectAfterLogin.LearningPath]:
        return [this.paths.learningPath.path, undefined];
      case RedirectAfterLogin[RedirectAfterLogin.DiagnosticTest]:
        return [this.paths.classProgram.path, undefined];
      case RedirectAfterLogin[RedirectAfterLogin.MockTest]:
        return [this.paths.mockTest.path, undefined];
      case RedirectAfterLogin[RedirectAfterLogin.ReferralMockTest]:
        return [this.paths.mockTestTest.path, undefined];
      case RedirectAfterLogin[RedirectAfterLogin.HomeAppTutorial]:
        return [this.paths.home.path, { queryParams: { tutorial: true } }];
      default:
        return [this.paths.home.path, undefined];
    }
  }
}
