import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Injector, OnInit, effect, inject, runInInjectionContext } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { KnowledgeService } from '@data/knowledge/knowledge.service';
import { StudentLearningGoal } from '@data/knowledge/learning-goal';
import { LessonService } from '@data/knowledge/lesson.service';
import { LoadingOverlayService } from '@data/loading-overlay.service';
import { NavigationService } from '@data/navigation/navigation.service';
import { TestService } from '@data/test/test.service';
import { ThemeService } from '@data/theme/theme.service';
import { TutorialService } from '@data/tutorials/tutorial-service';
import { MockTestStatus } from '@domain/knowledge/i-mock-test';
import { TutorialComponent } from '@share-components';
import { MockTest } from '@share-utils/data';
import { TopMenuComponent } from '@view/share-components/top-menu/top-menu.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { Subscription, interval } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, TutorialComponent, NgCircleProgressModule, TopMenuComponent],
  templateUrl: './mock-test-result.component.html',
  styleUrls: ['./mock-test-result.component.scss'],
})
export class MockTestResultComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  knowledgeService = inject(KnowledgeService);
  testService = inject(TestService);
  paths = inject(NavigationService).paths;
  testResult!: MockTest;
  loading = inject(LoadingOverlayService);
  lessonService = inject(LessonService);
  http = inject(HttpClient);
  tutorialService = inject(TutorialService);
  themeService = inject(ThemeService);
  injector = inject(Injector);

  mockTestId = this.route.snapshot.paramMap.get('id') ?? '';
  stats = ['Speed', 'Accuracy', 'Deligence', 'Quantity', 'Combo'];
  statsBW = this.stats.map(stat => stat + ' BW');
  over = new Array(this.stats.length).fill(false);
  activeStat = 0;
  probabilityIndex?: number;
  interval!: Subscription;
  learningGoalId!: string;
  MockTestStatus = MockTestStatus;
  showTutorial = false;
  tutorialPart = 0;
  theme = this.themeService.getTheme();

  ngOnInit(): void {
    this.loading.show();
    // const mockTestId = this.route.snapshot.paramMap.get('id') ?? '';
    if (this.mockTestId === 'tutorial1' || this.mockTestId === 'tutorial2') {
      console.log('tutorial');
      this.learningGoalId = this.tutorialService.getSelectedLearningGoal().id;
      this.probabilityIndex = this.tutorialService.getProbabilityIndex();
      this.testResult = this.tutorialService.getMockTestResult();
      this.showTutorial = true;
      if (this.mockTestId === 'tutorial1') {
        this.tutorialPart = 1;
      } else if (this.mockTestId === 'tutorial2') {
        this.tutorialPart = 2;
      }
      this.loading.hide();
      return;
    }
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
    // this.testService.getProbabilityIndex({ testId: this.mockTestId }).subscribe({
    //   next: result => {
    //     this.probabilityIndex = result;
    //     //
    //   },
    //   error: () => {
    //     //
    //   },
    // });
    const requestInterval = interval(5000);
    this._getMockTest();
    this.interval = requestInterval.subscribe(() => this._getMockTest());
    runInInjectionContext(this.injector, () => {
      effect(() => {
        this.theme = this.themeService.themeStore();
      });
    });
  }

  _getMockTest() {
    this.testService.getMockTest(this.mockTestId).subscribe({
      next: result => {
        // this.testResult = result;
        if (result.status != MockTestStatus.new && result.status != MockTestStatus.pending) {
          this.interval.unsubscribe();
          this.testResult = result;
          this.loading.hide();
          return;
        }
      },
      error: () => {
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
    // this.http.get(`${serverApi()}/students/gifts/request_free_subscription`).subscribe({
    //   next: () => {
    this.lessonService.activateLearningPath(this.mockTestId).subscribe({
      next: (learningGoal: StudentLearningGoal) => {
        this.knowledgeService.selectStudentLearningGoal(learningGoal);
        this.loading.hide();
        this.router.navigate([this.paths.learningPath.path]);
      },
      error: e => {
        console.log(e);
        this.loading.hide();
      },
    });
    //   },
    //   error: e => {
    //     console.log(e);
    //     this.lessonService.activateLearningPath(this.mockTestId).subscribe({
    //       next: () => {
    //         this.loading.hide();
    //         this.router.navigate([this.paths.home.path], { queryParams: { learning_goal_id: 1 } });
    //       },
    //       error: e => {
    //         console.log(e);
    //         this.loading.hide();
    //       },
    //     });
    //   },
    // });
  }

  nextTutorial1 = () => {
    this.router.navigate([this.paths.mockTestReview.path.replace(':id', 'tutorial')]);
  };

  nextTutorial2 = () => {
    this.router.navigate([this.paths.learningPath.path], { queryParams: { tutorial: 1 } });
  };

  skip() {
    window.document.body.removeAttribute('style');
    this.showTutorial = false;
    this.router.navigate([this.paths.home.path], { replaceUrl: true });
  }
}