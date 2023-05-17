import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SERVER_API } from '@infrastructure/auth/interceptor';
import { KnowledgeService } from '@infrastructure/knowledge/knowledge.service';
import { LessonService } from '@infrastructure/knowledge/lesson.service';
import { LoadingOverlayService } from '@infrastructure/loading-overlay.service';
import { NavigationService } from '@infrastructure/navigation/navigation.service';
import { TestService } from '@infrastructure/test/test.service';
import { QuestionReviewHtml } from '@share-utils/data';
import { MockTestStatus } from '@share-utils/domain';

@Component({
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

  questions: QuestionReviewHtml[] = [];
  currentQuestion!: QuestionReviewHtml;
  currentQuestionIndex = 0;
  isLoading = true;
  mockTestId!: string;
  status: MockTestStatus = MockTestStatus.active;
  MockTestStatus = MockTestStatus;

  @ViewChild('scrollElm') scrollElm!: ElementRef;
  @ViewChild('scrollXsElm') scrollXsElm!: ElementRef;

  ngOnInit(): void {
    this.mockTestId = this.route.snapshot.paramMap.get('id') ?? '';
    let learningGoalId = this.route.snapshot.queryParamMap.get('learning_goal_id') ?? '';
    if (learningGoalId === '') {
      learningGoalId = this.knowledgeService.getSelectedLearningGoal().id;
    }
    this.testService.getMockTestReviewHtml(this.mockTestId, learningGoalId).subscribe({
      next: (result: any) => {
        console.log(result);
        this.questions = result.data;
        this.currentQuestion = this.questions[0];
        this.isLoading = false;
        //
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
    this._centerCurrentIndexXs();
  }
  scrollRight() {
    this.currentQuestionIndex++;
    this._centerCurrentIndexXs();
    this._centerCurrentIndex();
  }

  backToResult() {
    this.router.navigate([this.paths.mockTestResult.path.replace(':id', this.mockTestId)]);
  }

  _centerCurrentIndex() {
    const currentElm = this.scrollElm.nativeElement.querySelectorAll('button')[this.currentQuestionIndex];
    const currentElmLeft = currentElm.offsetLeft - this.scrollElm.nativeElement.offsetLeft;
    const currentElmWidth = currentElm.offsetWidth;
    const currentElmCenter = currentElmLeft + currentElmWidth / 2;
    const scrollElmWidth = this.scrollElm.nativeElement.offsetWidth;
    this.scrollElm.nativeElement.scrollLeft = currentElmCenter - scrollElmWidth / 2;
  }

  _centerCurrentIndexXs() {
    const currentElm = this.scrollXsElm.nativeElement.querySelectorAll('button')[this.currentQuestionIndex];
    const currentElmLeft = currentElm.offsetLeft - this.scrollXsElm.nativeElement.offsetLeft;
    const currentElmWidth = currentElm.offsetWidth;
    const currentElmCenter = currentElmLeft + currentElmWidth / 2;
    const scrollElmWidth = this.scrollXsElm.nativeElement.offsetWidth;
    this.scrollXsElm.nativeElement.scrollLeft = currentElmCenter - scrollElmWidth / 2;
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
