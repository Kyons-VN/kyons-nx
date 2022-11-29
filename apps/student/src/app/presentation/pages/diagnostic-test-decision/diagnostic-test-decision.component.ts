import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '@infrastructure/navigation/navigation.service';
import { TestService } from '@infrastructure/test/test.service';
import { AppPath } from '@presentation/routes';

@Component({
  selector: 'student-diagnostic-test-decision',
  templateUrl: './diagnostic-test-decision.component.html',
  styleUrls: ['./diagnostic-test-decision.component.scss'],
})
export class DiagnosticTestDecisionComponent {
  paths: AppPath;
  constructor(
    private router: Router,
    navService: NavigationService,
    private testService: TestService
  ) {
    this.paths = navService.paths;
  }

  @HostBinding('class') class = 'h-full';

  testKnowledge() {
    this.router.navigate([this.paths.diagnosticTest]);
  }

  defaultLearningPath() {
    this.testService.skipTest().subscribe({
      next: (value) => {
        if (value === true) this.router.navigate([this.paths.learningPath]);
      },
    });
  }
}
