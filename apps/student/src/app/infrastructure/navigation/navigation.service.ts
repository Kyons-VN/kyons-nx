import { Injectable } from '@angular/core';
import { RedirectAfterLogin } from '../../domain/navigation/i-redirect';
import { AppPath } from '../../presentation/routes';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  paths: AppPath;
  constructor() {
    this.paths = new AppPath();
  }

  getRouteAfterLogin(redirectString: string): string {
    switch (redirectString) {
      case RedirectAfterLogin[RedirectAfterLogin.HomePage]:
        return this.paths.home;
      case RedirectAfterLogin[RedirectAfterLogin.LearningPath]:
        return this.paths.learningPath;
      case RedirectAfterLogin[RedirectAfterLogin.DiagnosticTest]:
        return this.paths.classProgram;
      case RedirectAfterLogin[RedirectAfterLogin.MockTest]:
        return this.paths.mockTest;
      default:
        return this.paths.home;
    }
  }
}
