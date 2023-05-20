import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MockTestStatus } from '@domain/knowledge/i-mock-test';
import { SERVER_API } from '@infrastructure/auth/interceptor';
import { KnowledgeService } from '@infrastructure/knowledge/knowledge.service';
import { LessonService } from '@infrastructure/knowledge/lesson.service';
import { LoadingOverlayService } from '@infrastructure/loading-overlay.service';
import { NavigationService } from '@infrastructure/navigation/navigation.service';
import { TestService } from '@infrastructure/test/test.service';
import { MockTestResult } from '@share-utils/data';
import { Subscription, interval } from 'rxjs';

@Component({
  templateUrl: './mock-test-result.component.html',
  styleUrls: ['./mock-test-result.component.scss'],
})
export class MockTestResultComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  knowledgeService = inject(KnowledgeService);
  testService = inject(TestService);
  paths = inject(NavigationService).paths;
  testResult!: MockTestResult;
  loading = inject(LoadingOverlayService);
  lessonService = inject(LessonService);
  http = inject(HttpClient);

  mockTestId = this.route.snapshot.paramMap.get('id') ?? '';
  stats = ['Speed', 'Accuracy', 'Deligence', 'Quantity', 'Combo'];
  statsBW = this.stats.map(stat => stat + ' BW');
  over = new Array(this.stats.length).fill(false);
  activeStat = 0;
  probabilityIndex?: number;
  interval!: Subscription;
  learningGoalId!: string;
  MockTestStatus = MockTestStatus;

  ngOnInit(): void {
    this.loading.show();
    // const mockTestId = this.route.snapshot.paramMap.get('id') ?? '';
    this.learningGoalId = this.route.snapshot.queryParamMap.get('learning_goal_id') ?? '';
    if (this.learningGoalId === '') {
      this.learningGoalId = this.knowledgeService.getSelectedLearningGoal().id;
    }
    // this.testService.getMockTestResultHtml(this.mockTestId, this.learningGoalId).subscribe({
    //   next: result => {
    //     this.testResult = result;
    //     this.loading.hide();
    //     //
    //   },
    //   error: e => {
    //     //
    //   },
    // });
    this.testService.getProbabilityIndex({ testId: this.mockTestId }).subscribe({
      next: result => {
        this.probabilityIndex = result;
        //
      },
      error: e => {
        //
      },
    });
    const requestInterval = interval(5000);
    this._getMockTest();
    this.interval = requestInterval.subscribe(() => this._getMockTest());
  }

  _getMockTest() {
    this.testService.getMockTestResultHtml(this.mockTestId).subscribe({
      next: result => {
        // this.testResult = result;
        if (result.status !== MockTestStatus.mock_test_submitted) {
          this.interval.unsubscribe();
          this.testResult = result;
          this.loading.hide();
          return;
        }
      },
      error: e => {
        //
      },
    });
  }

  review() {
    this.router.navigate([this.paths.mockTestReview.path.replace(':id', this.mockTestId)]);
  }

  share() {
    this.router.navigate([this.paths.mockTestShare.path.replace(':ref', this.testResult.shareReferral ?? '')]);
  }

  activateLearningPath() {
    this.loading.show();
    this.http.get(SERVER_API + `/students/gifts/request_free_subscription`).subscribe({
      next: () => {
        this.lessonService.activateLearningPath(this.mockTestId).subscribe({
          next: () => {
            this.loading.hide();
            this.router.navigate([this.paths.home.path], { queryParams: { learning_goal_id: 1 } });
          },
          error: e => {
            console.log(e);
            this.loading.hide();
          },
        });
      },
      error: e => {
        console.log(e);
        this.lessonService.activateLearningPath(this.mockTestId).subscribe({
          next: () => {
            this.loading.hide();
            this.router.navigate([this.paths.home.path], { queryParams: { learning_goal_id: 1 } });
          },
          error: e => {
            console.log(e);
            this.loading.hide();
          },
        });
      },
    });
  }
}
