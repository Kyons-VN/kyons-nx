import { CommonModule, Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { serverApi } from '@data/auth/interceptor';
import { KnowledgeService } from '@data/knowledge/knowledge.service';
import { LessonService } from '@data/knowledge/lesson.service';
import { LoadingOverlayService } from '@data/loading-overlay.service';
import { NavigationService } from '@data/navigation/navigation.service';
import { TestService } from '@data/test/test.service';
import { TutorialService } from '@data/tutorials/tutorial-service';
import { InputRadioComponent, LatexComponent, TutorialComponent } from '@share-components';
import { OrderBySAPipe, SafeHtmlPipe } from '@share-pipes';
import { answerPrefixes, QuestionReview } from '@share-utils/data';
import { MockTestStatus } from '@share-utils/domain';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, SafeHtmlPipe, TutorialComponent, LatexComponent, InputRadioComponent, OrderBySAPipe],
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


  answerPrefixes = answerPrefixes;
  questions: QuestionReview[] = [];
  currentQuestion!: QuestionReview;
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
      error: () => {
        //
      },
    });
    this.testService.getMockTestResult(this.mockTestId).subscribe({
      next: result => {
        this.status = result.status;
        return;
      },
      error: () => {
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
    this.http.get(`${serverApi()}/students/gifts/request_free_subscription`).subscribe({
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
