import { CommonModule, Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { KnowledgeService } from '@data/knowledge/knowledge.service';
import { LessonService } from '@data/knowledge/lesson.service';
import { LoadingOverlayService } from '@data/loading-overlay.service';
import { NavigationService } from '@data/navigation/navigation.service';
import { TestService } from '@data/test/test.service';
import { TestReviewComponent } from '@share-components';
import { SafeHtmlPipe, SafeResourceUrlSAPipe } from '@share-pipes';
import { answerPrefixes, QuestionReview } from '@share-utils/data';
import { MockTestStatus } from '@share-utils/domain';
import { LoadingComponent } from '@view/share-components/loading/loading.component';
import { TopMenuComponent } from '@view/share-components/top-menu/top-menu.component';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, SafeHtmlPipe, LoadingComponent, TopMenuComponent, TestReviewComponent, LottieComponent, SafeResourceUrlSAPipe],
  templateUrl: './lesson-review-page.component.html',
})
export class LessonReviewPageComponent implements OnInit {
  route = inject(ActivatedRoute);
  knowledgeService = inject(KnowledgeService);
  testService = inject(TestService);
  paths = inject(NavigationService).paths;
  router = inject(Router);
  lessonService = inject(LessonService);
  http = inject(HttpClient);
  loading = inject(LoadingOverlayService);
  location = inject(Location);
  learningGoal = this.knowledgeService.getStudentLearningGoal();

  questions: QuestionReview[] = [];
  currentQuestion!: QuestionReview;
  currentQuestionIndex = 0;
  isLoading = true;
  mockTestId!: string;
  status: MockTestStatus = MockTestStatus.active;
  MockTestStatus = MockTestStatus;
  answerPrefixes = answerPrefixes;
  showLesson = false;
  options: AnimationOptions = {
    path: './assets/animations/loading-primary.json',
    loop: true,
    autoplay: true,
  };
  content = inject(LessonService).getContent();

  @ViewChild('scrollElm') scrollElm!: ElementRef;

  ngOnInit(): void {
    this.mockTestId = this.route.snapshot.paramMap.get('id') ?? '';
    this.lessonService.getReviewHtml(this.learningGoal.id, this.mockTestId).subscribe({
      next: (result: any) => {
        console.log(result);
        this.questions = result.data;
        this.currentQuestion = this.questions[0];
        this.isLoading = false;
        //
      },
      error: (err: any) => {
        console.log(err);
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

  _centerCurrentIndex() {
    const currentElm = this.scrollElm.nativeElement.querySelectorAll('button')[this.currentQuestionIndex];
    const currentElmLeft = currentElm.offsetLeft - this.scrollElm.nativeElement.offsetLeft;
    const currentElmWidth = currentElm.offsetWidth;
    const currentElmCenter = currentElmLeft + currentElmWidth / 2;
    const scrollElmWidth = this.scrollElm.nativeElement.offsetWidth;
    this.scrollElm.nativeElement.scrollLeft = currentElmCenter - scrollElmWidth / 2;
  }

  // activateLearningPath() {
  //   this.loading.show();
  //   this.http.get(`${serverApi()}/students/gifts/request_free_subscription`).subscribe({
  //     next: () => {
  //       this.lessonService.activateLearningPath(this.mockTestId).subscribe({
  //         next: () => {
  //           this.loading.hide();
  //           this.router.navigate([this.paths.home.path], { queryParams: { learning_goal_id: 1 } });
  //         },
  //         error: e => {
  //           console.log(e);
  //           this.loading.hide();
  //         },
  //       });
  //     },
  //     error: e => {
  //       console.log(e);
  //       this.lessonService.activateLearningPath(this.mockTestId).subscribe({
  //         next: () => {
  //           this.loading.hide();
  //           this.router.navigate([this.paths.home.path], { queryParams: { learning_goal_id: 1 } });
  //         },
  //         error: e => {
  //           console.log(e);
  //           this.loading.hide();
  //         },
  //       });
  //     },
  //   });
  // }
}
