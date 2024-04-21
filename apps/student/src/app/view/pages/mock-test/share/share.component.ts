import { CommonModule } from '@angular/common';
import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '@data/auth/auth.service';
import { LearningGoal } from '@data/knowledge/learning-goal';
import { LoadingOverlayService } from '@data/loading-overlay.service';
import { NavigationService } from '@data/navigation/navigation.service';
import { TestService } from '@data/test/test.service';
import { AppPaths } from '@view/routes';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class MockTestShareComponent implements OnInit {
  paths: AppPaths
  constructor(private route: ActivatedRoute, navService: NavigationService, private testService: TestService,
    private loading: LoadingOverlayService, private authService: AuthService, private router: Router) {
    this.paths = navService.paths;
  }

  @HostBinding('class') class = 'h-full';

  fromUsername!: string;
  score!: number;
  learningGoal!: LearningGoal;
  ref!: string;
  showForLoggedInUser = false;

  ngOnInit(): void {
    this.ref = this.route.snapshot.paramMap.get('ref') ?? '';
    this.testService.getShareMockTestInfoFromRef(this.ref).subscribe({
      next: ({
        fromUsername,
        score,
        learningGoal,
      }) => {
        this.fromUsername = fromUsername;
        this.score = score;
        this.learningGoal = learningGoal;
      }
    })
  }

  acceptChalenge() {
    if (this.authService.getToken() == '') {
      this.router.navigate([this.paths.signUp.path], { queryParams: { ref: this.ref, mocktest: true } })
    }
    else {
      this.showForLoggedInUser = true;
    }
  }

  createNewLearningGoal() {
    if (this.authService.getToken() == '') {
      this.router.navigate([this.paths.signUp.path]);
    }
    else {
      this.router.navigate([this.paths.mockTest.path]);
    }
  }
}
