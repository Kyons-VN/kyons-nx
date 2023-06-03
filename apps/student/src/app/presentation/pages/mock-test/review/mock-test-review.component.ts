import { CommonModule, Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SERVER_API } from '@infrastructure/auth/interceptor';
import { KnowledgeService } from '@infrastructure/knowledge/knowledge.service';
import { LessonService } from '@infrastructure/knowledge/lesson.service';
import { LoadingOverlayService } from '@infrastructure/loading-overlay.service';
import { NavigationService } from '@infrastructure/navigation/navigation.service';
import { TestService } from '@infrastructure/test/test.service';
import { TutorialService } from '@infrastructure/tutorials/tutorial-service';
import { TutorialComponent } from '@share-components';
import { QuestionReviewHtml } from '@share-utils/data';
import { MockTestStatus } from '@share-utils/domain';
import { SafeHtmlPipe } from 'dist/libs/share-pipes';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, SafeHtmlPipe, TutorialComponent],
  templateUrl: './mock-test-review.component.html',
  styleUrls: ['./mock-test-review.component.scss'],
})
export class MockTestReviewComponent implements OnInit {
  route = inject(ActivatedRoute);
  knowledgeService = inject(KnowledgeService);
  testService = inject(TestService);
  paths = inject(NavigationService).paths;
  router = inject(Router);
  lessonService = inject(LessonService);
  http = inject(HttpClient);
  loading = inject(LoadingOverlayService);
  location = inject(Location);
  tutorialService = inject(TutorialService);

  questions: QuestionReviewHtml[] = [];
  currentQuestion!: QuestionReviewHtml;
  currentQuestionIndex = 0;
  isLoading = true;
  mockTestId!: string;
  status: MockTestStatus = MockTestStatus.active;
  MockTestStatus = MockTestStatus;
  showTutorial = false;

  @ViewChild('scrollElm') scrollElm!: ElementRef;

  ngOnInit(): void {
    this.loading.show();
    this.mockTestId = this.route.snapshot.paramMap.get('id') ?? '';

    if (this.mockTestId === 'tutorial') {
      console.log('tutorial');
      this.showTutorial = true;
      const result = this.tutorialService.getMockTestReview();
      this.questions = result.data;
      this.currentQuestion = this.questions[0];
      this.status = this.tutorialService.getMockTestResult().status;
      this.loading.hide();
      this.isLoading = false;
      return;
    }

    // let learningGoalId = this.route.snapshot.queryParamMap.get('learning_goal_id') ?? '';
    // if (learningGoalId === '') {
    //   learningGoalId = this.knowledgeService.getSelectedLearningGoal().id;
    // }
    this.testService.getMockTestReviewHtml(this.mockTestId).subscribe({
      next: (result: any) => {
        this.questions = result.data;
        this.currentQuestion = this.questions[0];
        this.isLoading = false;
        this.loading.hide();
      },
      error: (e: any) => {
        //
      },
    });
    this.testService.getMockTestResultHtml(this.mockTestId).subscribe({
      next: result => {
        this.status = result.status;
        return;
      },
      error: e => {
        //
      },
    });
  }

  previousPage() {
    this.scrollElm.nativeElement.scrollLeft -= 400;
  }
  nextPage() {
    this.scrollElm.nativeElement.scrollLeft += 400;
  }

  scrollLeft() {
    this.currentQuestionIndex--;
    this._centerCurrentIndex();
  }
  scrollRight() {
    this.currentQuestionIndex++;
    this._centerCurrentIndex();
  }

  backToResult() {
    this.router.navigate([this.paths.mockTestResult.path.replace(':id', this.mockTestId)]);
  }

  _centerCurrentIndex() {
    if (this.scrollElm === undefined) return;
    const currentElm = this.scrollElm.nativeElement.querySelectorAll('button')[this.currentQuestionIndex];
    const currentElmLeft = currentElm.offsetLeft - this.scrollElm.nativeElement.offsetLeft;
    const currentElmWidth = currentElm.offsetWidth;
    const currentElmCenter = currentElmLeft + currentElmWidth / 2;
    const scrollElmWidth = this.scrollElm.nativeElement.offsetWidth;
    this.scrollElm.nativeElement.scrollLeft = currentElmCenter - scrollElmWidth / 2;
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

  goBack() {
    this.location.back();
  }

  emptyFunc = () => {
    //
  };

  nextTutorial = () => {
    this.router.navigate([this.paths.mockTestResult.path.replace(':id', 'tutorial2')]);
  };

  skip() {
    window.document.body.removeAttribute('style');
    this.showTutorial = false;
    this.router.navigate([this.paths.home.path], { replaceUrl: true });
  }
}
