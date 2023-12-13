import { Clipboard } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { KnowledgeService } from '@infrastructure/knowledge/knowledge.service';
import { LearningGoal, StudentLearningGoal } from '@infrastructure/knowledge/learning-goal';
import { LessonGroup } from '@infrastructure/knowledge/lesson';
import { LoadingOverlayService } from '@infrastructure/loading-overlay.service';
import { NavigationService } from '@infrastructure/navigation/navigation.service';
import { TestService } from '@infrastructure/test/test.service';
import { QuestionsProgressComponent, TestContentComponent } from '@share-components';
import { MockTestResult, Progress, Submission, TestContent } from '@share-utils/data';
import { MockTestStatus } from '@share-utils/domain';
import { Observable, fromEvent } from 'rxjs';

const TEST_DURATION = 90 * 60 * 1000;

@Component({
  standalone: true,
  imports: [TestContentComponent, CommonModule, QuestionsProgressComponent, MatTooltipModule, RouterModule],

  templateUrl: './mock-test-test.component.html',
  styleUrls: ['./mock-test-test.component.scss'],
})
export class MockTestTestComponent implements OnInit {
  paths = inject(NavigationService).paths;
  source!: Observable<KeyboardEvent>;
  elm = inject(ElementRef);
  route = inject(ActivatedRoute);
  router = inject(Router);
  testService = inject(TestService);
  loading = inject(LoadingOverlayService);
  knowledgeService = inject(KnowledgeService);
  clipboard = inject(Clipboard);

  learningGoal = LearningGoal.empty();
  studentLearningGoal = StudentLearningGoal.empty();
  testProgress = new Progress();
  isTitleHidden = false;
  testContent = TestContent.empty();
  testSubmission = new Submission();
  isTest = false;
  testResult: MockTestResult | undefined;
  reviewRenderObject: any[] = [];
  resultRenderObject: any[] = [];
  lessonGroup!: LessonGroup;
  userType = '';
  isSubmitting = false;
  currentTestIndex = 0;
  progressString = '';
  hasError = '';
  complete = false;
  testReviewRenderObject: any[] = [];
  testResultRenderObject: any[] = [];
  isSharing = false;
  shareLink = '';
  isCopied = false;
  isPending = true;
  counter = 0;
  counterStart = new Date(this.counter);
  counterTime = new Date(this.counter);
  Math = Math;
  showIncomplete = false;
  showHavingTime = false;
  ignoreIncomplete = false;
  ignoreHavingTime = false;
  mockTestId!: string;

  @ViewChild('testContentElm') testContentElm!: ElementRef;
  @ViewChild('scrollElm') scrollElm!: ElementRef;
  @ViewChild('scrollXsElm') scrollXsElm!: ElementRef;

  ngOnInit(): void {
    this.source = fromEvent<KeyboardEvent>(document, 'keyup');
    this.route.queryParams.subscribe(params => {
      this.isTest = params['test'] ? params['test'] === 'true' : false;
    });
    this.mockTestId = this.route.snapshot.paramMap.get('id') ?? '';
    this.learningGoal = this.knowledgeService.getSelectedLearningGoal();
    this.getMockTest();
  }

  // ngAfterViewInit(): void {
  //   if (!this.testContentElm) return;
  // }

  getMockTest() {
    this.loading.show();
    if (!this.isPending) return;
    this.testService.getMockTest(this.mockTestId).subscribe({
      next: value => {
        this.isPending = value.status == MockTestStatus.pending;
        if (this.isPending) {
          setTimeout(() => {
            this.getMockTest();
          }, 5000);
          return;
        }
        if (value.done == true) this.complete = true;
        this.testContent = value;
        this.testSubmission.testId = this.testContent.id;
        this.testProgress = Progress.from(0, value.questions.length);
        this.testService.getMockTestResult(this.mockTestId).subscribe({
          next: () => {
            this.counter = TEST_DURATION;
            this.counterStart = new Date();
            setInterval(() => {
              const now = new Date();
              this.counter = TEST_DURATION - (now.getTime() - this.counterStart.getTime());
              this.counterTime = new Date(this.counter);
              // Auto submit mocktest
              // if (this.counter < 0) {
              //   this.ignoreHavingTime = true;
              //   this.ignoreIncomplete = true;
              //   this.testComplete();
              // }
            }, 1000);
            this.loading.hide();
          },
        });
      },
      error: err => {
        this.hasError = err.error_code;
        this.loading.hide();
      },
      complete: () => {
        if (this.complete) {
          alert('Bài kiểm tra đã làm rồi');
          this.router.navigate([this.paths.mockTest.path]);
        }
      },
    });
  }

  updateProgress(nextProgress: Progress) {
    this.testProgress = nextProgress;
  }

  updateSubmission(nextSubmission: Submission) {
    this.testSubmission.submitData = nextSubmission.submitData;
  }

  round(value: number) {
    return Math.round(value);
  }

  testComplete() {
    if (this.isSubmitting) return;
    // for (const input of a) {
    //   console.log(input.checked);
    //   input.
    // }
    // a.map((input) => {});
    // const groupsOfFour = Array.from(records, record => {
    //   const group = [];
    //   for (let i = 0; i < 4; i++) {
    //     if (record) {
    //       group.push(record);
    //       // record = record.nextSibling;
    //     }
    //   }
    //   return group;
    // });

    // Print each group of 4 records
    // for (const group of groupsOfFour as any[]) {
    //   console.log(group);
    // }
    if (
      !this.ignoreIncomplete &&
      Object.keys(this.testSubmission.submitData).length < this.testContent.questions.length
    ) {
      this.showIncomplete = true;
      return;
    }
    if (!this.ignoreHavingTime && this.counter > 0) {
      this.showHavingTime = true;
      return;
    }
    if (this.isSubmitting) return;
    this.loading.show();
    this.isSubmitting = true;
    console.log(this.testSubmission.submitData);

    this.testSubmission.end = new Date();
    this.testService.submitTest(this.testSubmission).subscribe({
      next: (result: any) => {
        this.knowledgeService.selectLearningGoal(this.learningGoal);
        this.loading.hide();
        if (result.have_promotion == true) {
          this.router.navigate([this.paths.gift.path.replace(':event', 'mock_test_submitted')], {
            queryParams: { continue: this.paths.mockTestResult.path.replace(':id', this.mockTestId) },
          });
        } else {
          this.router.navigate([this.paths.mockTestResult.path.replace(':id', this.mockTestId)]);
        }
      },
      error: (err: any) => {
        // TODO: Define error resposes
        console.log(err);
        this.hasError = 'Có lỗi, vui lòng thử lại';
        this.loading.hide();
      },
    });
  }

  copy() {
    this.clipboard.copy(this.shareLink);
    this.isCopied = true;
    setTimeout(() => {
      this.isCopied = false;
    }, 1000);
  }

  previousPage() {
    this.scrollElm.nativeElement.scrollLeft -= 400;
  }

  nextPage() {
    this.scrollElm.nativeElement.scrollLeft += 400;
  }

  scrollLeft() {
    this.currentTestIndex--;
    this._centerCurrentIndexXs();
    this._centerCurrentIndex();
  }

  scrollRight() {
    this.currentTestIndex++;
    this._centerCurrentIndexXs();
    this._centerCurrentIndex();
  }

  goTo(index: number) {
    this.currentTestIndex = index;
    this._centerCurrentIndexXs();
    this._centerCurrentIndex();
  }

  _centerCurrentIndex() {
    const currentElm = this.scrollElm.nativeElement.querySelectorAll('button')[this.currentTestIndex];
    const currentElmLeft = currentElm.offsetLeft - this.scrollElm.nativeElement.offsetLeft;
    const currentElmWidth = currentElm.offsetWidth;
    const currentElmCenter = currentElmLeft + currentElmWidth / 2;
    const scrollElmWidth = this.scrollElm.nativeElement.offsetWidth;
    this.scrollElm.nativeElement.scrollLeft = currentElmCenter - scrollElmWidth / 2;
  }

  _centerCurrentIndexXs() {
    const currentElm = this.scrollXsElm.nativeElement.querySelectorAll('button')[this.currentTestIndex];
    const currentElmLeft = currentElm.offsetLeft - this.scrollXsElm.nativeElement.offsetLeft;
    const currentElmWidth = currentElm.offsetWidth;
    const currentElmCenter = currentElmLeft + currentElmWidth / 2;
    const scrollElmWidth = this.scrollXsElm.nativeElement.offsetWidth;
    this.scrollXsElm.nativeElement.scrollLeft = currentElmCenter - scrollElmWidth / 2;
  }

  submitIncomplete() {
    if (!this.ignoreHavingTime && this.counter > 0) {
      this.showHavingTime = true;
    } else {
      this.testComplete();
    }
    this.showIncomplete = false;
  }

  submitHavingTime() {
    if (
      !this.ignoreIncomplete &&
      Object.keys(this.testSubmission.submitData).length < this.testContent.questions.length
    ) {
      this.showIncomplete = true;
    } else {
      this.testComplete();
    }
    this.showHavingTime = false;
  }

  goToResult() {
    this.router.navigate([this.paths.mockTestReview.path.replace(':id', this.mockTestId)]);
  }

  goToReview() {
    this.router.navigate([this.paths.mockTestReview.path.replace(':id', this.mockTestId)]);
  }

  _getTopicNameFromId(topicId: string) {
    return this.lessonGroup.lessonCategories.filter(lC => lC.topic.id == topicId)[0].topic.name;
  }

  _getQuestionsFromIds(questionIds: string[]) {
    return this.testContent.questions.filter(q => questionIds.includes(q.id));
  }

  _getTestQuestionsFromIds(questionIds: string[]) {
    return this.testContent.questions.filter(q => questionIds.includes(q.id));
  }
}
